import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AlertMessage } from "../models/alert-message.model";
import { Router } from "@angular/router";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'

@Injectable({ providedIn: 'root' })
export class AlertService {
    private snackBar = inject(MatSnackBar);

    show(type: AlertMessage['type'], text: string, duration = 4000) {
        const config: MatSnackBarConfig = {
            duration: duration,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: [type === 'success' ? 'snack-success' : 'snack-warning']
        }
        this.snackBar.open(text, 'Close', config);
    }

    showAndNavigate(type: AlertMessage['type'], text: string, router: Router, url: string, duration = 3000) {
        this.show(type, text, duration);

        setTimeout(() => {
            router.navigate([url]);
        }, duration - 500);
    }

}
