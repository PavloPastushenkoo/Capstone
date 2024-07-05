import { Component, OnInit } from '@angular/core';
import {
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes,
} from '@angular/animations';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
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
export class RegisterComponent implements OnInit {
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    nome: string = '';
    cognome: string = '';
    dateOfBirth: string = '';
    gender: string = '';
    height: number = 0;
    weight: number = 0;
    age: number = 0;

    body!: HTMLElement;
    contentWrapper!: HTMLElement;
    isLoggedIn: boolean = false;

    constructor(private authSrv: AuthService, private router: Router) {}

    ngOnInit() {
        this.body = document.querySelector('body') as HTMLElement;
        this.contentWrapper = document.getElementById(
            'registerContentWrapper'
        ) as HTMLElement;

        this.showAnimation();
    }

    showAnimation() {
        if (this.contentWrapper) {
            this.contentWrapper.classList.add('show-animate');
        }
    }

    onSubmitRegister(form: NgForm) {
        try {
            let value = {
                password: form.value.passwordRegister,
                email: form.value.emailRegister,
                nome: form.value.nomeRegister,
                cognome: form.value.cognomeRegister,
                eta: this.calculateAge(form.value.dateOfBirthRegister), // eta come numero
                genere: form.value.genderRegister,
                height: form.value.heightRegister,
                peso: form.value.weightRegister,
                dataDiNascita: form.value.dateOfBirthRegister, // data di nascita come stringa
            };

            this.authSrv.register(value).subscribe((data) => {
                window.alert('Registrazione effettuata. Effettua il login');
                this.router.navigate(['/login']);
            });
        } catch (error) {
            console.error(error);
        }
    }

    calculateAge(dateOfBirth: string): number {
        // Calcola l'età in base alla data di nascita
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    }
}
