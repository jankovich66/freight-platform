import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ProfileService {
    private apiUrl = 'http://localhost:3000/auth/profile';

    constructor(private http: HttpClient) {}

    updateProfile(data: any) {
        return this.http.patch<any>(`${ this.apiUrl }`, data);
    }
}