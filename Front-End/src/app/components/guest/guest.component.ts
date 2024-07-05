import { Component, OnInit } from '@angular/core';
import {
    trigger,
    transition,
    style,
    animate,
    keyframes,
} from '@angular/animations';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/service/auth.service';
import { ExerciseService } from 'src/app/service/exercise.service';

@Component({
    selector: 'app-guest',
    templateUrl: './guest.component.html',
    styleUrls: ['./guest.component.scss'],
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
export class GuestComponent implements OnInit {
    user: User | undefined;
    esercizi: any[] = [];
    elaboratedIndexes: Set<number> = new Set();

    constructor(
        private authSrv: AuthService,
        private esercizioSrv: ExerciseService
    ) {}

    ngOnInit(): void {
        this.authSrv.user$.subscribe((data) => {
            this.user = data?.user;
            if (this.user?.idUtente) {
                this.esercizioSrv
                    .getEserciziByUserId(this.user.idUtente)
                    .subscribe((data: any[]) => {
                        this.esercizi = data;
                        this.esercizi.forEach((esercizio, index) => {
                            this.esercizioSrv
                                .getExerciseById(esercizio.esercizioId)
                                .subscribe(
                                    (exercise) => {
                                        this.esercizi[index].exercise =
                                            exercise;
                                    },
                                    (error) => {
                                        console.error(
                                            'Error loading exercise:',
                                            error
                                        );
                                    }
                                );
                        });
                    });
            }
        });
    }

    calculateIntensity(esercizio: any): number {
        const {
            numberOfReps = 0,
            numberOfSets = 0,
            usedWeight = 0,
            restBetweenSets = 1,
        } = esercizio;
        if (restBetweenSets === 0) {
            return usedWeight * numberOfReps * numberOfSets;
        }
        return (usedWeight * numberOfReps * numberOfSets) / restBetweenSets;
    }

    toggleElaborate(index: number) {
        if (this.elaboratedIndexes.has(index)) {
            this.elaboratedIndexes.delete(index);
        } else {
            this.esercizi[index].intensity = this.calculateIntensity(
                this.esercizi[index]
            );
            this.elaboratedIndexes.add(index);
        }
    }

    getIntensityMessage(intensity: number): string {
        if (intensity <= 10) {
            return 'Very low intensity. Consider increasing the weight or number of reps for a more effective workout.';
        } else if (intensity <= 20) {
            return 'Low intensity. You can push a bit more to achieve better results.';
        } else if (intensity <= 30) {
            return 'Moderate intensity. Good job! Keep pushing for even better results.';
        } else if (intensity <= 40) {
            return "Moderate-high intensity. You're doing well, keep it up!";
        } else if (intensity <= 50) {
            return 'High intensity. Excellent work! You are really pushing your limits.';
        } else if (intensity <= 60) {
            return "Very high intensity. Outstanding performance! You're reaching peak levels.";
        } else if (intensity <= 70) {
            return "Extremely high intensity. Incredible effort, you're at the top of your game!";
        } else if (intensity <= 80) {
            return "Elite intensity. You're performing at an elite level, fantastic job!";
        } else {
            return "Maximum intensity. You're at the pinnacle of physical fitness, truly remarkable!";
        }
    }

    getTargetType(
        numberOfReps: number,
        numberOfSets: number,
        restBetweenSets: number
    ): string {
        if (numberOfReps >= 20 && restBetweenSets <= 30) {
            return 'Target: Extreme Endurance';
        } else if (
            numberOfReps >= 15 &&
            numberOfReps < 20 &&
            restBetweenSets <= 30
        ) {
            return 'Target: High Endurance';
        } else if (
            numberOfReps >= 12 &&
            numberOfReps < 15 &&
            restBetweenSets <= 60
        ) {
            return 'Target: Endurance';
        } else if (
            numberOfReps >= 8 &&
            numberOfReps < 12 &&
            restBetweenSets > 60 &&
            restBetweenSets <= 90
        ) {
            return 'Target: Hypertrophy (Muscle Growth)';
        } else if (
            numberOfReps >= 6 &&
            numberOfReps < 8 &&
            restBetweenSets > 90 &&
            restBetweenSets <= 120
        ) {
            return 'Target: Hypertrophy/Strength';
        } else if (
            numberOfReps >= 4 &&
            numberOfReps < 6 &&
            restBetweenSets > 120 &&
            restBetweenSets <= 180
        ) {
            return 'Target: Strength';
        } else if (
            numberOfReps < 4 &&
            numberOfSets >= 4 &&
            restBetweenSets > 180
        ) {
            return 'Target: Max Strength';
        } else if (
            numberOfReps >= 15 &&
            numberOfSets >= 3 &&
            restBetweenSets <= 45
        ) {
            return 'Target: Stamina';
        } else if (
            numberOfReps >= 10 &&
            numberOfReps < 15 &&
            numberOfSets >= 3 &&
            restBetweenSets <= 60
        ) {
            return 'Target: Muscular Endurance';
        } else {
            return 'General Fitness';
        }
    }
}
