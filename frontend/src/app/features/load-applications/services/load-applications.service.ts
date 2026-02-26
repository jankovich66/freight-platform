import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadApplication } from "../models/load-application.model";
import { CreateLoadApplication } from "../models/create-load-application.model";

@Injectable({ providedIn: 'root' })
export class LoadApplicationsService {
    private readonly apiUrl = 'http://localhost:3000/load-applications';

    constructor(private http: HttpClient) {}

    apply(createLoadApplication: CreateLoadApplication) {
        return this.http.post<LoadApplication>(`${ this.apiUrl }/${ createLoadApplication.loadId }/apply`, createLoadApplication);
    }
}