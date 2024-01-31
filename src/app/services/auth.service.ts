import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Client } from '../models/Client';
import { Observable, catchError, map, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
        const token = localStorage.getItem('token');
        if (token) {
            this.client = this.getClientFromToken(token);
        }
    }

    private apiUrl = environment.apiUrl;
    private clientPath = '/client';
    private loginPath = '/client/login';
    private client?: { id: number; email: string; name: string };

    private tokenKey = 'token';

    signIn({ email, password }: Client): Observable<boolean> {
        const body = {
            email,
            password,
        };

        return this.http.post<String>(this.apiUrl + this.loginPath, body).pipe(
            map((res: any) => {
                console.log(res);
                localStorage.setItem('token', res);
                this.client = this.getClientFromToken(res);
                return true;
            }),
            catchError((err) => {
                console.log(err);
                return of(false);
            }),
        );
    }

    signUp({ name, email, password }: Client): Observable<boolean> {
        const body = {
            name,
            email,
            password,
        };

        console.log(body);

        return this.http.post<String>(this.apiUrl + this.clientPath, body).pipe(
            map((res: any) => {
                console.log(res);
                return true;
            }),
            catchError((err) => {
                console.log(err);
                return of(false);
            }),
        );
    }

    validateToken(token: string): boolean {
        try {
            const decodededJwt = jwtDecode(token);

            //Verificar se o token tá válido;
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodededJwt.exp && decodededJwt.exp < currentTime) {
                console.log('Token expirado');
                return false;
            }
            return true;
        } catch (error) {
            console.log('Erro ao decodificar o token:', error);
            return false;
        }
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem(this.tokenKey);

        if (token == undefined || token == null) {
            return false;
        }

        return this.validateToken(token);
    }

    getClientFromToken(token: string) {
        const validToken = this.validateToken(token);

        if (validToken) {
            const decodededJwt = jwtDecode(token) as any;

            return {
                id: decodededJwt.client_id,
                name: decodededJwt.sub,
                email: decodededJwt.email,
            };
        } else {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
            return;
        }
    }

    getClient() {
        return this.client;
    }
}
