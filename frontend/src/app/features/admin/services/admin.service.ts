import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../../../core/models/user.model";

@Injectable({ providedIn: 'root' })
export class AdminService {
    private usersApiUrl = 'http://localhost:3000/users';
    private loadsApiUrl = 'http://localhost:3000/loads';

    private http = inject(HttpClient);

    numberOfUsers() {
        return this.http.get<number>(`${ this.usersApiUrl }/number`).pipe();
    }

    numberOfLoads() {
        return this.http.get<number>(`${ this.loadsApiUrl }/number-of-loads`).pipe();
    }

    numberOfActiveLoads() {
        return this.http.get<number>(`${ this.loadsApiUrl }/number-of-active`).pipe();
    }

    getUsers() {
        return this.http.get<User[]>(`${ this.usersApiUrl }`);
    }

    deleteUser(userEmail: string) {
        return this.http.delete(`${ this.usersApiUrl }`, { body: userEmail });
    }
}
