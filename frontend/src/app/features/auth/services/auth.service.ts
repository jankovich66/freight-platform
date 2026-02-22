import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { RegisterRequest } from "../models/register-request.model";
import { AuthResponse } from "../models/auth-response.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private authUrl = 'http://localhost:3000/auth';

    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<AuthResponse> {
        const credentials = { email, password };

        return this.http.post<AuthResponse>(`${ this.authUrl }/login`, credentials)
            /*.pipe(
                tap(response => {
                    if(response && response.accessToken) {
                        console.log(response.user);
                        localStorage.setItem('accessToken', response.accessToken);
                    }
                })
            )*/
    }

    registerCarrier(userData: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${ this.authUrl }/register/carrier`, userData)
            .pipe(
                tap(response => {
                    if(response && response.accessToken) {
                        localStorage.setItem('accessToken', response.accessToken);
                    }
                })
            )
    }

    registerShipper(userData: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${ this.authUrl }/register/shipper`, userData)
            .pipe(
                tap(response => {
                    if(response && response.accessToken) {
                        localStorage.setItem('accessToken', response.accessToken);
                    }
                })
            )
    }

    public getToken(): string | null {
        return localStorage.getItem('accessToken');
    }
}
