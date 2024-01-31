import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';
import { catchError, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TransactionsService {
    private apiUrl = environment.apiUrl;

    private transactionPath = '/moneyTransaction/client?id=';
    private categoriesPath = '/category';
    private recipientsPath = '/recipient';

    clientId = this.authService.getClient()?.id;

    getAllClientTransacitons() {
        if (this.clientId == 0) {
            console.error(
                'Houve um erro ao buscar os dados, faça login novamente ou tente mais tarde!',
            );
            return;
        }

        return this.http.get<any>(
            this.apiUrl + this.transactionPath + this.clientId,
        );
    }

    getAllClientCategories() {
        if (this.clientId == 0) {
            console.error(
                'Houve um erro ao buscar os dados, faça login novamente ou tente mais tarde!',
            );
            return;
        }

        return this.http.get<any>(this.apiUrl + this.categoriesPath);
    }

    getAllClientRecipients() {
        if (this.clientId == 0) {
            console.error(
                'Houve um erro ao buscar os dados, faça login novamente ou tente mais tarde!',
            );
            return;
        }

        return this.http.get<any>(this.apiUrl + this.recipientsPath);
    }

    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) {}
}
