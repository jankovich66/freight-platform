import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AlertMessage } from "../models/alert-message.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AlertService {
    private alertSubject = new BehaviorSubject<AlertMessage | null>(null);
    alert$ = this.alertSubject.asObservable();

    show(type: AlertMessage['type'], text: string, duration = 5000) {
        this.alertSubject.next({ type, text });

        setTimeout(() => {
            this.clear();
        }, duration);
    }

    clear() {
        this.alertSubject.next(null);
    }

    showAndNavigate(type: AlertMessage['type'], text: string, router: Router, url: string, duration = 5000) {
        this.alertSubject.next({ type, text });

        setTimeout(() => {
            this.clear();
            router.navigate([`${ url }`]);
        }, duration);
    }
}
