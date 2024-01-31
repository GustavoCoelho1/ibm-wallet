import { Component } from '@angular/core';
import { Client } from './models/Client';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    client = new Client('teste', '', '');
    title = 'ibm-wallet';
}
