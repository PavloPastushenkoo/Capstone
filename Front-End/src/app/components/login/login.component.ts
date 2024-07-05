import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import {
    trigger,
    style,
    animate,
    transition,
    keyframes,
} from '@angular/animations';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [
        trigger('fadeInScale', [
            transition(':enter', [
                animate(
                    '800ms ease-out',
                    keyframes([
                        style({
                            opacity: 0,
                            transform: 'scale(0.8)',
                            offset: 0,
                        }),
                        style({
                            opacity: 0.5,
                            transform: 'scale(1.05)',
                            offset: 0.7,
                        }),
                        style({ opacity: 1, transform: 'scale(1)', offset: 1 }),
                    ])
                ),
            ]),
        ]),
    ],
})
export class LoginComponent implements OnInit {
    email: string = '';
    password: string = '';

    body!: HTMLElement;
    contentWrapper!: HTMLElement;

    constructor(private authSrv: AuthService, private router: Router) {}

    ngOnInit() {
        this.body = document.querySelector('body') as HTMLElement;
        this.contentWrapper = document.getElementById(
            'loginContentWrapper'
        ) as HTMLElement;

        this.showAnimation();
    }

    showAnimation() {
        // Aggiunge la classe show-animate per far partire l'animazione
        if (this.contentWrapper) {
            this.contentWrapper.classList.add('show-animate');
        }
    }

    onSubmit() {
        const loginData = {
            email: this.email,
            password: this.password,
        };

        this.authSrv.login(loginData).subscribe(
            (data) => {
                if (data) {
                    alert('Login successful');
                    this.router.navigate(['/']);
                } else {
                    alert('Invalid Email or Password');
                }
            },
            (error) => {
                alert(error);
            }
        );
    }
}
