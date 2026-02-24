import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Load } from "../models/load.model";

@Injectable({ providedIn: 'root' })
export class LoadsService {
    private readonly apiUrl = 'http://localhost:3000/loads';

    constructor(private http: HttpClient) {}

    getAllLoads(): Observable<Load[]> {
        return this.http.get<{ data: Load[] }>(this.apiUrl).pipe(map(response => response.data));
    }

    getMyLoads(): Observable<Load[]> {
        return this.http.get<{ data: Load[] }>(`${ this.apiUrl }/my`).pipe(map(response => response.data));
    }

    getOpenLoads(): Observable<Load[]> {
        return this.http.get<{ data: Load[] }>(`${ this.apiUrl }/open`).pipe(map(response => response.data));
    }

    getLoadDetails(loadId: number): Observable<Load> {
        return this.http.get<Load>(`${ this.apiUrl }/${ loadId }`);
    }
}
