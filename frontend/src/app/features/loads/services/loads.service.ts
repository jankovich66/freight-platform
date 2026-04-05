import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Load } from "../models/load.model";
import { CreateLoad } from "../models/create-load.model";
import { PaginatedResponse } from "../../../core/models/paginated-response.model";

@Injectable({ providedIn: 'root' })
export class LoadsService {
    private readonly apiUrl = 'http://localhost:3000/loads';

    constructor(private http: HttpClient) {}

    getAllLoads(): Observable<Load[]> {
        return this.http.get<{ data: Load[] }>(this.apiUrl).pipe(map(response => response.data));
    }

    getMyLoads(params: any): Observable<PaginatedResponse<Load>> {
        return this.http.get<PaginatedResponse<Load>/*{ data: Load[] }*/>(`${ this.apiUrl }/my`, { params })/*.pipe(map(response => response.data))*/;
    }

    getOpenLoads(params: any): Observable<PaginatedResponse<Load>> {
        return this.http.get<PaginatedResponse<Load>/*{ data: Load[] }*/>(`${ this.apiUrl }/open`, { params })/*.pipe(map(response => response.data))*/;
    }

    getLoadDetails(loadId: number): Observable<Load> {
        return this.http.get<Load>(`${ this.apiUrl }/${ loadId }`);
    }

    createLoad(createLoadModel: CreateLoad) {
        return this.http.post<Load>(`${ this.apiUrl }`, createLoadModel);
    }

    changeStatus(load: Load) {
        return this.http.patch<Load>(`${ this.apiUrl }/${ load.id }/status`, load);
    }

    deleteLoad(loadId: number) {
        return this.http.delete<any>(`${ this.apiUrl }/${ loadId }`);
    }
}
