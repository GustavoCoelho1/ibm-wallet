import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    showLogin: boolean = false;
    showCadastro: boolean = false;

    constructor(private router: Router) {}

    receiveCloseModal(data: { id: string; show: boolean }) {
        if (data.id == 'login') {
            this.showLogin = false;
        } else if (data.id == 'cadastro') {
            this.showCadastro = false;
        }
    }

    onClickGoDashboard() {
        const userLogged = false;

        if (!userLogged) {
            this.router.navigate(['/login']);
        }
    }
}
