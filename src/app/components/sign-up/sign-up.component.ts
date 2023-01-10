import {Component, OnInit} from '@angular/core';
import {LoginFirebaseService} from '../../services/login-firebase.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    email?: string;
    password?: string;

    constructor(public loginFirebase: LoginFirebaseService) {
    }

    ngOnInit(): void {
    }

    onSignUp() {
        // your implementation for signup
        if (this.email && this.password) {
            this.loginFirebase.signUp(this.email, this.password).then(r => console.log(r)).catch(err=>console.log(err));
        }else{
            console.log("Mostrar un mensaje de error")
        }
    }

}
