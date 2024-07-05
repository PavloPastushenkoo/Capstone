import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    steps = [
        {
            number: 1,
            title: 'Register',
            details: [
                'Click on the "Register" button on the top right corner.',
                'Fill in your personal details including name, email, and password.',
                'Verify your email address by clicking on the verification link sent to your inbox.',
                'Login to your account using the credentials you just created.',
            ],
        },
        {
            number: 2,
            title: 'Login',
            details: [
                'Click on the "Login" button on the top right corner.',
                'Enter your email and password.',
                'Click "Submit" to access your account dashboard.',
                'If you forgot your password, use the "Forgot Password" link to reset it.',
            ],
        },
        {
            number: 3,
            title: 'Activities',
            details: [
                'Navigate to the "Activities" section from the main menu.',
                'Browse through the list of available exercises.',
                'Use filters to find exercises based on equipment, body part, or target area.',
                'Select exercises to add them to your personal list.',
            ],
        },
        {
            number: 4,
            title: 'Exercise Information',
            details: [
                'Click on an exercise to view detailed information.',
                'Review the primary muscles worked and the equipment needed.',
                'Watch the instructional video or GIF to understand the proper form.',
                'Fill in the form with your repetitions, sets, weight used, and rest time.',
            ],
        },
        {
            number: 5,
            title: 'Add to Dashboard',
            details: [
                'After filling in the exercise details, click "Add to Dashboard".',
                'The exercise will now appear in your personal Dashboard.',
                'You can edit or remove exercises from the Dashboard as needed.',
                'Track your progress over time with your exercise history.',
            ],
        },
        {
            number: 6,
            title: 'Dashboard',
            details: [
                'Navigate to the "Dashboard" from the main menu.',
                'View all the exercises you have added.',
                'Click "Analyze" to get insights on your workout intensity and target areas.',
                'Receive personalized messages and recommendations based on your input.',
            ],
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}
