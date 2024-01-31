import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    //ELe valida se está autenticado, e libera ou não a passagem para o url em questão
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    canActivate(): boolean {
        const token = localStorage.getItem('token');

        if (token && this.authService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
