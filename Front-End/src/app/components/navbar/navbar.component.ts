import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    menuIcon!: HTMLElement;
    navbar!: HTMLElement;
    header!: HTMLElement;
    footer!: HTMLElement;
    sections!: NodeListOf<HTMLElement>;
    navLinks!: NodeListOf<HTMLElement>;
    certificateModal!: HTMLElement;
    contentWrapper!: HTMLElement;
    body!: HTMLElement;
    toggle!: HTMLElement;
    isLoggedIn: boolean = false;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.menuIcon = document.querySelector('#menu-icon') as HTMLElement;
        this.navbar = document.querySelector('.navbar') as HTMLElement;
        this.header = document.querySelector('header') as HTMLElement;
        this.footer = document.querySelector('footer') as HTMLElement;
        this.sections = document.querySelectorAll(
            'section'
        ) as NodeListOf<HTMLElement>;
        this.navLinks = document.querySelectorAll(
            '.navbar a'
        ) as NodeListOf<HTMLElement>;
        this.certificateModal = document.getElementById(
            'certificateModal'
        ) as HTMLElement;
        this.contentWrapper = document.getElementById(
            'contentWrapper'
        ) as HTMLElement;
        this.body = document.querySelector('body') as HTMLElement;
        this.toggle = document.getElementById('toggle') as HTMLElement;

        this.menuIcon.onclick = () => {
            this.menuIcon.classList.toggle('bx-x');
            this.navbar.classList.toggle('active');
        };

        this.authService.user$.subscribe((user) => {
            this.isLoggedIn = !!user;
        });

        this.setupEducationContentListeners();
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        this.handleScroll();
        this.updateActiveNavLink();
    }

    handleScroll() {
        if (this.header) {
            this.header.classList.toggle('sticky', window.scrollY > 100);
        }

        if (this.menuIcon && this.navbar) {
            this.menuIcon.classList.remove('bx-x');
            this.navbar.classList.remove('active');
        }

        if (this.footer) {
            this.footer.classList.toggle(
                'show-animate',
                window.innerHeight + window.scrollY >=
                    document.documentElement.scrollHeight
            );
        }
    }

    updateActiveNavLink() {
        let top = window.scrollY;

        this.sections.forEach((sec) => {
            let offset = sec.offsetTop - 100;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                this.navLinks.forEach((link) => {
                    link.classList.remove('active');
                });
                const activeLink = document.querySelector(
                    `.navbar a[href="#${id}"]`
                );
                if (activeLink) {
                    activeLink.classList.add('active');
                }

                sec.classList.add('show-animate');
            } else {
                sec.classList.remove('show-animate');
            }
        });
    }

    setupEducationContentListeners() {
        const educationContents = document.querySelectorAll(
            '.education-content'
        ) as NodeListOf<HTMLElement>;

        educationContents.forEach((content) => {
            content.addEventListener('click', () => {
                const certificateImageSrc = content.getAttribute('data-src');
                const certificateImage = document.getElementById(
                    'certificateImage'
                ) as HTMLImageElement;
                if (certificateImageSrc) {
                    certificateImage.src = certificateImageSrc;
                }
                this.certificateModal.style.display = 'flex';

                this.contentWrapper.classList.add('blur-background');
            });
        });

        window.onclick = (event) => {
            if (event.target === this.certificateModal) {
                this.certificateModal.style.display = 'none';
                this.contentWrapper.classList.remove('blur-background');
            }
        };
    }

    toggleTheme() {
        this.toggle.classList.toggle('active');
        if (this.body.getAttribute('data-theme') === 'dark') {
            this.body.setAttribute('data-theme', 'light');
        } else {
            this.body.setAttribute('data-theme', 'dark');
        }
    }
}
