import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Exercise } from 'src/app/interface/exercise.interface';

@Injectable({
    providedIn: 'root',
})
export class ExerciseService {
    private apiUrl = 'https://exercisedb.p.rapidapi.com/exercises';
    private headers = new HttpHeaders({
        //   'x-rapidapi-key': '660d4466c8mshedc2dfaef32069cp1834eejsned2523105991',
        //  'x-rapidapi-key': 'ceaabfe900mshd70f6b10576f920p12ef7cjsnbaf182462ef7',
        'x-rapidapi-key': '4b2d811bd6msh2673e810e67aadap147337jsn88e5c0383840',

        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
    });

    constructor(private http: HttpClient) {}

    getExercisesByCriteria(
        criteria: string,
        option: string
    ): Observable<Exercise[]> {
        const url = `${this.apiUrl}/${criteria}/${option}`;
        return this.http.get<Exercise[]>(url, { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Error fetching exercises:', error);
                return throwError(() => new Error('Failed to fetch exercises'));
            })
        );
    }
    saveExercise(data: any) {
        return this.http.post<number>(`http://localhost:8080/esercizi`, data);
    }

    getExerciseById(id: string): Observable<Exercise> {
        const url = `${this.apiUrl}/exercise/${id}`;
        return this.http.get<Exercise>(url, { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Error fetching exercise by ID:', error);
                return throwError(() => new Error('Failed to fetch exercise'));
            })
        );
    }

    getEserciziByUserId(id: number) {
        return this.http.get<any[]>(
            `http://localhost:8080/esercizi/user/${id}`
        );
    }
}
