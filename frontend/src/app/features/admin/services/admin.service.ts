import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../../../core/models/user.model";
import { Load } from "../../loads/models/load.model";
import { map } from "rxjs";
import { LoadApplication } from "../../load-applications/models/load-application.model";
import { CarrierWithAssignment } from "../models/carrier-with-assignment.model";
import { LoadAssignment } from "../../load-assignments/models/load-assignment.model";

@Injectable({ providedIn: 'root' })
export class AdminService {
    private usersApiUrl = 'http://localhost:3000/users';
    private loadsApiUrl = 'http://localhost:3000/loads';
    private applicationsApiUrl = 'http://localhost:3000/load-applications';
    private assignmentsApiUrl = 'http://localhost:3000/load-assignments';

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

    getCarriersWithAssignments() {
        return this.http.get<{ data: CarrierWithAssignment[] }>(`${ this.assignmentsApiUrl }/carriers-with-assignments`).pipe(map(response => response.data));
    }

    getAssignmentsForCarrier(carrierId: number) {
        return this.http.get<{ data: LoadAssignment[] }>(`${ this.assignmentsApiUrl }/assignments-for-carrier/${ carrierId }`).pipe(map(response => response.data));
    }

    getCarriersWithApplications() {
        return this.http.get<{ data: CarrierWithAssignment[] }>(`${ this.applicationsApiUrl }/carriers-with-applications`).pipe(map(response => response.data));
    }

    getApplicationsForCarrier(carrierId: number) {
        return this.http.get<{ data: LoadApplication[] }>(`${ this.applicationsApiUrl }/applications-for-carrier/${ carrierId }`).pipe(map(response => response.data));
    }
}
