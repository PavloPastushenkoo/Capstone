import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    QueryList,
    ViewChildren,
    ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseService } from 'src/app/service/exercise.service';
import { Exercise } from 'src/app/interface/exercise.interface';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-registra-attivita',
    templateUrl: './registra-attivita.component.html',
    styleUrls: ['./registra-attivita.component.scss'],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(-10px)' }),
                animate(
                    '300ms ease-out',
                    style({ opacity: 1, transform: 'translateY(0)' })
                ),
            ]),
        ]),
        trigger('fadeInSlide', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateX(-20px)' }),
                animate(
                    '800ms ease-out',
                    style({ opacity: 1, transform: 'translateX(0)' })
                ),
            ]),
        ]),
    ],
})
export class RegistraAttivitaComponent implements OnInit, AfterViewInit {
    exercises: Exercise[] = [];
    criteria = ['equipment', 'bodyPart', 'target'];
    equipment = [
        'assisted',
        'band',
        'barbell',
        'body weight',
        'bosu ball',
        'cable',
        'dumbbell',
        'elliptical machine',
        'ez barbell',
        'hammer',
        'kettlebell',
        'leverage machine',
        'medicine ball',
        'olympic barbell',
        'resistance band',
        'roller',
        'rope',
        'skierg machine',
        'sled machine',
        'smith machine',
        'stability ball',
        'stationary bike',
        'stepmill machine',
        'tire',
        'trap bar',
        'upper body ergometer',
        'weighted',
        'wheel roller',
    ];
    bodyParts = [
        'back',
        'cardio',
        'chest',
        'lower arms',
        'lower legs',
        'neck',
        'shoulders',
        'upper arms',
        'upper legs',
        'waist',
    ];
    targets = [
        'abductors',
        'abs',
        'adductors',
        'biceps',
        'calves',
        'cardiovascular system',
        'delts',
        'forearms',
        'glutes',
        'hamstrings',
        'lats',
        'levator scapulae',
        'pectorals',
        'quads',
        'serratus anterior',
        'spine',
        'traps',
        'triceps',
        'upper back',
    ];
    selectedCriteria = '';
    selectedOption = '';
    isLoading = false;

    @ViewChild('nextButton', { static: true }) nextButton!: ElementRef;
    @ViewChild('prevButton', { static: true }) prevButton!: ElementRef;
    @ViewChild('carousel', { static: true }) carousel!: ElementRef;
    @ViewChild('listHTML', { static: true }) listHTML!: ElementRef;
    @ViewChildren('seeMoreButtons') seeMoreButtons!: QueryList<ElementRef>;
    @ViewChild('backButton', { static: true }) backButton!: ElementRef;

    body: HTMLElement | undefined;
    contentWrapper: HTMLElement | null | undefined;

    constructor(
        private exerciseService: ExerciseService,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.body = document.querySelector('body') as HTMLElement;
        this.contentWrapper = document.getElementById(
            'registerContentWrapper'
        ) as HTMLElement;
    }

    ngAfterViewInit(): void {
        this.nextButton.nativeElement.onclick = () => this.showSlider('next');
        this.prevButton.nativeElement.onclick = () => this.showSlider('prev');

        this.backButton.nativeElement.onclick = () => {
            this.carousel.nativeElement.classList.remove('showDetail');
        };
    }

    onCriteriaChange(event: any): void {
        this.selectedCriteria = event.target.value;
        this.selectedOption = '';
        this.exercises = [];
    }

    onOptionChange(event: any): void {
        this.selectedOption = event.target.value;
        this.loadExercises(this.selectedCriteria, this.selectedOption);
    }

    loadExercises(criteria: string, option: string): void {
        this.isLoading = true;
        this.exercises = []; // Clear the exercises array while loading
        this.exerciseService.getExercisesByCriteria(criteria, option).subscribe(
            (data) => {
                console.log(data);
                setTimeout(() => {
                    this.exercises = data;
                    this.isLoading = false;
                    this.changeDetectorRef.detectChanges();
                    this.resetCarousel();
                }, 2000); // 2 seconds loading animation
            },
            (error) => {
                console.error('Error loading exercises:', error);
                this.isLoading = false;
            }
        );
    }

    showSlider(type: string): void {
        this.nextButton.nativeElement.style.pointerEvents = 'none';
        this.prevButton.nativeElement.style.pointerEvents = 'none';

        const items = this.listHTML.nativeElement.querySelectorAll('.item');
        if (type === 'next') {
            this.listHTML.nativeElement.appendChild(items[0]);
            this.carousel.nativeElement.classList.add('next');
        } else {
            this.listHTML.nativeElement.prepend(items[items.length - 1]);
            this.carousel.nativeElement.classList.add('prev');
        }

        setTimeout(() => {
            this.carousel.nativeElement.classList.remove('next', 'prev');
            this.nextButton.nativeElement.style.pointerEvents = 'auto';
            this.prevButton.nativeElement.style.pointerEvents = 'auto';
        }, 500);
    }

    resetCarousel(): void {
        this.carousel.nativeElement.scrollTo(0, 0);
    }

    navigateToExercise(exerciseId: string): void {
        this.router.navigate(['/esercizio', exerciseId]);
    }
}
