import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadApplication } from "../models/load-application.model";
import { CreateLoadApplication } from "../models/create-load-application.model";
import { map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LoadApplicationsService {
    private readonly apiUrl = 'http://localhost:3000/load-applications';

    constructor(private http: HttpClient) {}

    apply(createLoadApplication: CreateLoadApplication) {
        return this.http.post<LoadApplication>(`${ this.apiUrl }/${ createLoadApplication.loadId }/apply`, createLoadApplication);
    }

    findByLoad(loadId: number) {
        return this.http.get<{ data: LoadApplication[] }>(`${ this.apiUrl }/by-load/${ loadId }`).pipe(map(response => response.data));
    }

    findByCarrier() {
        return this.http.get<{ data: LoadApplication[] }>(`${ this.apiUrl }/my`).pipe(map(response => response.data));
    }

    accept(applicationId: number) {
        return this.http.patch<any>(`${ this.apiUrl }/${ applicationId }/accept`, null);
    }

    getApplication(applicationId: number) {
        return this.http.get<LoadApplication>(`${ this.apiUrl }/${ applicationId }`);
    }
}
