import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import {AccountsService} from './accounts.service';
import { UserAccount, Role } from '../models';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    userAccounts;
    constructor(private injector:Injector){
        this.userAccounts = this.injector.get(AccountsService);
    }
    // users: UserAccount[] = [
    //     { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    //     { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
    // ];

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
        const roleString = isLoggedIn && authHeader.split('.')[1];
        const role = roleString ? Role[roleString] : null;

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate - public
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                console.log(request.body);
                console.log(this.userAccounts.getUserAccounts);
                console.log("am trecut")
                const user = this.userAccounts.getUserAccounts.find(x => x.username == request.body.username && x.password == request.body.password);
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
                const currentUser = this.userAccounts.getUserAccounts.find(x => x.role === role);
                if (id !== currentUser.id && role !== Role.Admin) return unauthorised();

                const user = this.userAccounts.getUserAccounts.find(x => x.id === id);
                return ok(user);
            }

            // get all users (admin only)
            if (request.url.endsWith('/users') && request.method === 'GET') {
                if (role !== Role.Admin) return unauthorised();
                return ok(this.userAccounts.getUserAccounts);
            }

            if(request.url.endsWith('/users/register') && request.method ==='POST'){
                let user:UserAccount = request.body;
                // console.log(this.userAccounts.getUserAccounts)
                let users = this.userAccounts.getUserAccounts;
                if (users.find(x => x.username === user.username)) {
                    return error('Username "' + user.username + '" is already taken')
                }
                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
                user.role = Role.User;
                // this.userAccounts.setUserAccounts(user);
                users.push(user)
                // localStorage.setItem('users', JSON.stringify(this.users));
                console.log(this.userAccounts.getUserAccounts);
                return ok(user);
                }

                // pass through any requests not handled above
                return next.handle(request);
        }))
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());

        // private helper functions

        // function register(body) {
        //     let user:UserAccount = body;
        //     console.log(this.userAccounts.getUserAccounts)
        //     let users = this.userAccounts.getUserAccounts;
        //     if (users.find(x => x.username === user.username)) {
        //         return error('Username "' + user.username + '" is already taken')
        //     }
        //     user.id = this.users.length ? Math.max(...this.users.map(x => x.id)) + 1 : 1;
        //     user.role = Role.User;
        //     console.log("trece?")
        //     this.userAccounts.setUserAccounts(user);
        //     // localStorage.setItem('users', JSON.stringify(this.users));
        //     console.log(this.userAccounts.getUserAccounts);
        //     return ok(user);
        // }

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
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};