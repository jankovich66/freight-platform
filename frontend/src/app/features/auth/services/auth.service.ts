import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { RegisterRequest } from "../models/register/register-request.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private authUrl = 'http://localhost:3000/auth';

    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<any> {
        const credentials = { email, password };

        return this.http.post<any>(`${ this.authUrl }/login`, credentials)
            .pipe(
                tap(response => {
                    if(response && response.accessToken) {
                        localStorage.setItem('accessToken', response.accessToken);
                    }
                })
            )
        }

    register(userData: RegisterRequest): Observable<any> {
        return this.http.post<any>(`${ this.authUrl }/register`, userData)
            .pipe(
                tap(response => {
                    if(response && response.accessToken) {
                        localStorage.setItem('accessToken', response.accessToken);
                    }
                })
            )
    }
}
