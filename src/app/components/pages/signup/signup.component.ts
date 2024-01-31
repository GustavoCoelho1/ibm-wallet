import { Component, TemplateRef } from '@angular/core';
import { Client } from '../../../models/Client';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
})
export class SignupComponent {
    client = new Client();
    title = '';

    constructor(
        private authService: AuthService,
        private toastrService: ToastrService,
        private router: Router,
    ) {}

    onClickSubmit() {
        this.authService.signUp(this.client).subscribe((res) => {
            if (res) {
                this.toastrService.success('Usuário cadastrado com sucesso!');
                this.router.navigate(['/login']);
            } else {
                this.toastrService.error('Houve um erro ao cadastrar usuário!');
            }
        });
    }
}
