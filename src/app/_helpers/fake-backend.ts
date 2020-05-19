import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { UserAccount, Role } from '../models';
import { UsersOrders } from '../components/orders/orders.component';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    position: number;
    username: string;
    products: number;
    total: string;

    users: UserAccount[] = [
        { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
        { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
    ];

    // usersOrders=[
    //     {id:1, username:"user", orderProducts:[{position:1,product:"softX", value:20},
    //                                     {position:2,product:"softY", value:10}] }
    // ]
    usersOrders=[]

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
        const roleString = isLoggedIn && authHeader.split('.')[1];
        const role = roleString ? Role[roleString] : null;

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            // authenticate - public
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                const user = this.users.find(x => x.username === request.body.username && x.password === request.body.password);
                console.log(user);
                if (!user) {
                    return error('Username or password is incorrect');
                }
                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    token: `fake-jwt-token.${user.role}`
                });
            }

            // get user by id - admin or user (user can only access their own record)
            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
                if (!isLoggedIn) return unauthorised();

                // get id from request url
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);

                // only allow normal users access to their own record
                const currentUser = this.users.find(x => x.role === role);
                if (id !== currentUser.id && role !== Role.Admin) return unauthorised();

                const user = this.users.find(x => x.id === id);
                return ok(user);
            }

            // get all users (admin only)
            if (request.url.endsWith('/users') && request.method === 'GET') {
                if (role !== Role.Admin) return unauthorised();
                return ok(this.users);
            }

            //register new user
            if(request.url.endsWith('/users/register') && request.method ==='POST'){
                let user:UserAccount = request.body;
                if (this.users.find(x => x.username === user.username)) {
                    return error('Username "' + user.username + '" is already taken')
                }
                user.id = this.users.length ? Math.max(...this.users.map(x => x.id)) + 1 : 1;
                user.role = Role.User;
                this.users.push(user)
                localStorage.setItem('users', JSON.stringify(this.users));
                console.log(this.users)
                return ok(user);
            }

            if (request.url.endsWith('/user/order') && request.method === 'POST') {
                if (role !== Role.Admin) return unauthorised();
                const orderProducts = this.usersOrders.filter(order => order.id===request.body)
                                                        .map(order => order.orderProducts);
                if(!orderProducts){return}
                let products = [].concat.apply([], orderProducts);
                return ok(products);
            }

            if (request.url.endsWith('/save/order') && request.method === 'POST'){
                let userOrder = request.body;
                let generatedId = this.orderIdAutoGenerator();
                userOrder.id = generatedId;
                this.usersOrders.push(userOrder)
                return ok(null);
            }

            if (request.url.endsWith('/orders') && request.method === 'GET'){
                return ok(this.usersOrders);
            }
                // pass through any requests not handled above
                return next.handle(request);
        }))
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());

        // private helper functions
        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorised() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }
    }

    orderIdAutoGenerator = () =>{
        let orderIdGenerated:number;
        if(this.usersOrders.length == 0){
            orderIdGenerated = 1;
            return orderIdGenerated;
        }
        orderIdGenerated = this.usersOrders[this.usersOrders.length-1].id + 1;
        return orderIdGenerated;
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};