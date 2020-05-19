import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '../../services/UserService';
import { AppComponent } from 'src/app/app.component';

@Component({selector: 'app-register',
            templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    showMyMessage: boolean;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private userService: UserService,
        private alertService: AlertService,
        private appComp: AppComponent
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            email: ['',[Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$")]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            retypePassword: ['',Validators.required]
        },{ validator: this.checkPasswords });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { 
        // console.log(this.registerForm.controls)
        return this.registerForm.controls; 
    }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        let pass = group.get('password').value;
        let confirmPass = group.get('retypePassword').value;

        return pass === confirmPass ? null : { notSame: true }     
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        
        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                response => {
                    this.router.navigate([this.returnUrl]);
                    this.appComp.closeRegisterModal();
                    this.appComp.successMessage="Registration successful!";
                    this.appComp.showSuccessMessage();
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
