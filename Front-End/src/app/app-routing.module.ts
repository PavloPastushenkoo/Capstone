import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { GuestComponent } from './components/guest/guest.component';
import { DetagliFisiciComponent } from './components/detagli-fisici/detagli-fisici.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProgressoComponent } from './components/progresso/progresso.component';
import { RegistraAttivitaComponent } from './components/registra-attivita/registra-attivita.component';
import { EsercizioComponent } from './components/esercizio/esercizio.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'guest', component: GuestComponent },
    { path: 'detagli-fisici', component: DetagliFisiciComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'progresso', component: ProgressoComponent },
    { path: 'registra-attivita', component: RegistraAttivitaComponent },
    { path: 'esercizio/:id', component: EsercizioComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
