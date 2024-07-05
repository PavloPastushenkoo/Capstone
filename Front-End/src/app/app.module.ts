import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { GuestComponent } from './components/guest/guest.component';
import { DetagliFisiciComponent } from './components/detagli-fisici/detagli-fisici.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProgressoComponent } from './components/progresso/progresso.component';
import { RegistraAttivitaComponent } from './components/registra-attivita/registra-attivita.component';
import { EsercizioComponent } from './components/esercizio/esercizio.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './components/loading/loading.component';
import { TokenInterceptor } from './interceptor/token.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        RegisterComponent,
        LoginComponent,
        GuestComponent,
        DetagliFisiciComponent,
        FooterComponent,
        ProfileComponent,
        NavbarComponent,
        ProgressoComponent,
        RegistraAttivitaComponent,
        EsercizioComponent,
        LoadingComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        BrowserAnimationsModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
