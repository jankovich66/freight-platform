import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { LoadAssignment } from "../models/load-assignment.model";
import { map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LoadAssignmentsService {
    private apiUrl = 'http://localhost:3000/load-assignments';

    private http = inject(HttpClient);

    getMy() {
        return this.http.get<{ data: LoadAssignment[] }>(`${ this.apiUrl }/my`).pipe(map(response => response.data));
    }

    getById(id: number) {
        return this.http.get<LoadAssignment>(`${ this.apiUrl }/${ id }`);
    }
}
