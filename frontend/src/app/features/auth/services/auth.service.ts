import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { RegisterRequest } from "../models/register-request.model";
import { AuthResponse } from "../models/auth-response.model";
import { jwtDecode } from "jwt-decode";
import { User } from "../../../core/models/user.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private authUrl = 'http://localhost:3000/auth';

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    login(email: string, password: string): Observable<AuthResponse> {
        const credentials = { email, password };

        return this.http.post<AuthResponse>(`${ this.authUrl }/login`, credentials)
            .pipe(
                tap(response => {
                    if(response && response.accessToken) {
                        localStorage.setItem('accessToken', response.accessToken);
                        if(response.user.role === 'SHIPPER') {
                            this.router.navigate(['loads/my']);
                        }
                        else if(response.user.role === 'CARRIER') {
                            this.router.navigate(['loads/open']);
                        }
                        else if(response.user.role === 'ADMIN') {
                            this.router.navigate(['admin/dashboard']);
                        }
                    }
                })
            )
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

    getCurrentUser(): Observable<User> {
        return this.http.get<User>(`${ this.authUrl }/profile`)
            .pipe(
                tap(response => {
                    if(response) {
                        // console.log(response);
                    }
                })
            )
    }

    getToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    isLoggedIn(): boolean {
        const token = this.getToken();
        if(!token) return false;

        return !this.isTokenExpired(token);
    }

    private isTokenExpired(token: string): boolean {
        try {
            const decoded: any = jwtDecode(token);

            if(!decoded.exp) return true;

            const expirationDate = decoded.exp * 1000;
            return expirationDate < Date.now();
        }
        catch {
            return true;
        }
    }

    logout() {
        localStorage.removeItem('accessToken');
        this.router.navigate(['auth/login']);
    }
}
