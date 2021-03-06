import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/UserService/authentication.service';
import{AppComponent} from 'src/app/app.component';

@Component({selector: 'app-login',
            templateUrl: 'login.component.html',
            styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private appComp:AppComponent
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    showRegisterModal(){
        this.appComp.closeLoginModal();
        this.appComp.registerModal=true;
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    async onSubmit() {
        this.submitted = true;
        
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        
        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                response =>{
                    this.appComp.userLogged=true;
                    this.appComp.closeLoginModal();
                    this.appComp.successMessage=`Welcome ${response.username}!`;
                    this.appComp.showSuccessMessage();
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
