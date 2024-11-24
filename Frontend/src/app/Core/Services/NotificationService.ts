import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
    })
    export class NotificationService {
    constructor(private snackBar: MatSnackBar) {}

    showNotification(message: string, duration: number = 3000) {
        this.snackBar.open(message, 'Fermer', {
        duration: duration,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        });
    }
}