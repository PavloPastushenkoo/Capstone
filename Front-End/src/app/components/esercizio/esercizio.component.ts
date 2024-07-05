import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from 'src/app/service/exercise.service';
import { Exercise } from 'src/app/interface/exercise.interface';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/interface/user.interface';

@Component({
    selector: 'app-esercizio',
    templateUrl: './esercizio.component.html',
    styleUrls: ['./esercizio.component.scss'],
    animations: [
        trigger('fadeInSlide', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(-20px)' }),
                animate(
                    '800ms ease-out',
                    style({ opacity: 1, transform: 'translateY(0)' })
                ),
            ]),
        ]),
    ],
})
export class EsercizioComponent implements OnInit {
    exercise!: Exercise;
    loading: boolean = true;
    showForm: boolean = false;
    user: User | undefined;
    esercizioId!: string | null;

    constructor(
        private route: ActivatedRoute,
        private exerciseService: ExerciseService,
        private authSrv: AuthService
    ) {}

    ngOnInit(): void {
        this.authSrv.user$.subscribe((data) => {
            this.user = data?.user;
        });
        this.route.paramMap.subscribe((params) => {
            const exerciseId = params.get('id');
            this.esercizioId = exerciseId;
            if (exerciseId) {
                this.loadExercise(exerciseId);
            }
        });
    }

    loadExercise(id: string): void {
        this.exerciseService.getExerciseById(id).subscribe(
            (exercise) => {
                console.log(exercise); // Aggiungi un log per verificare i dati
                setTimeout(() => {
                    this.exercise = exercise;
                    this.loading = false;
                }, 3000); // Imposta un ritardo di 3 secondi
            },
            (error) => {
                console.error('Error loading exercise:', error);
                this.loading = false;
            }
        );
    }

    toggleForm(): void {
        this.showForm = !this.showForm;
    }

    submitForm(formValues: any): void {
        formValues.userId = this.user?.idUtente;
        formValues.esercizioId= this.esercizioId;
        this.exerciseService.saveExercise(formValues).subscribe((data) => {
            alert('Esercizio salvato con Id ' + data);
        });
        console.log('Form submitted:', formValues);
    }
}
