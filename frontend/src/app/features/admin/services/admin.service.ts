import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../../../core/models/user.model";
import { Load } from "../../loads/models/load.model";
import { map } from "rxjs";
import { LoadApplication } from "../../load-applications/models/load-application.model";

@Injectable({ providedIn: 'root' })
export class AdminService {
    private usersApiUrl = 'http://localhost:3000/users';
    private loadsApiUrl = 'http://localhost:3000/loads';
    private applicationsApiUrl = 'http://localhost:3000/load-applications';

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
        return this.http.delete<any>(`${ this.usersApiUrl }`, { body: { email: userEmail }});
    }

    getAllLoads() {
        return this.http.get<{ data: Load[] }>(`${ this.loadsApiUrl }`).pipe(map(response => response.data));
    }

    getAllApplications() {
        return this.http.get<{ data: LoadApplication[] }>(`${ this.applicationsApiUrl }`).pipe(map(response => response.data));
    }
}
