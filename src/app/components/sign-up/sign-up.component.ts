import {Component, OnInit} from '@angular/core';
import {LoginFirebaseService} from '../../services/login-firebase.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    email?: string;
    password?: string;
    userName?: string;

    constructor(public loginFirebase: LoginFirebaseService, public router:Router) {
    }

    ngOnInit(): void {
    }

    onSignUp() {
        // your implementation for signup
        if (this.email && this.password && this.userName) {
            this.loginFirebase.signUp(this.email, this.password,this.userName).then(r =>{
                if(r==undefined){
                    alert("Usuario creado correctamente, se enviará un correo para verificar su usuario")
                    this.router.navigate(["/login"])
                }
            }).catch(err => console.log(err));
        } else {
            console.log('Mostrar un mensaje de error');
        }
    }

}
