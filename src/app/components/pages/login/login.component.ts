import { Component, TemplateRef, forwardRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Client } from '../../../models/Client';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    client = new Client();

    constructor(
        private authService: AuthService,
        private toastrService: ToastrService,
        private router: Router,
    ) {}

    onClickSubmit() {
        this.authService.signIn(this.client).subscribe((result) => {
            if (result) {
                this.toastrService.success('Usuário autenticado com sucesso!');
                this.router.navigate(['auth/dashboard']);
            } else {
                this.toastrService.error(
                    'Houve um erro ao autenticar usuário!',
                );
            }
        });
    }
}
