import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/interface/user.interface';
import {
    trigger,
    transition,
    style,
    animate,
    keyframes,
} from '@angular/animations';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
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
export class ProfileComponent implements OnInit {
    user!: User;
    selectedFile!: File;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.user$.subscribe((authData) => {
            if (authData) {
                this.user = authData.user;
                console.log(this.user);
            }
        });
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    onUpload() {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        if (!this.user.idUtente) return;
        // Implement the upload logic in AuthService or a dedicated service
        this.authService.uploadAvatar(formData, this.user.idUtente).subscribe(
            (response) => {
                // Update user avatar URL
                this.user.avatar = response.avatar;
            },
            (error) => {
                console.error('Error uploading avatar:', error);
            }
        );
    }

    logout() {
        this.authService.logout();
    }
}
