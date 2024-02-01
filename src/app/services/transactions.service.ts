import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';
import { catchError, lastValueFrom, map, of, take } from 'rxjs';
import { MoneyTransaction } from '../models/MoneyTransaction';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class TransactionsService {
    private apiUrl = environment.apiUrl;

    private transactionPath = '/moneyTransaction';
    private categoriesPath = '/category';
    private recipientsPath = '/recipient';

    textResponseHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'text/plain', // O retorno é um text
    });

    getAllClientTransacitons() {
        const clientId = this.authService.getClient()?.id;

        if (clientId == null) {
            this.taostrService.error(
                'Houve um erro ao buscar os dados, tente recarregar a página!',
            );
            return;
        }

        return this.http.get<any>(
            this.apiUrl + this.transactionPath + '/client?id=' + clientId,
        );
    }

    getAllClientCategories() {
        const clientId = this.authService.getClient()?.id;

        if (clientId == null) {
            this.taostrService.error(
                'Houve um erro ao buscar os dados, tente recarregar a página!',
            );
            return;
        }

        return this.http.get<any>(
            this.apiUrl + this.categoriesPath + '/client?id=' + clientId,
        );
    }

    getAllClientRecipients() {
        const clientId = this.authService.getClient()?.id;

        if (clientId == null) {
            this.taostrService.error(
                'Houve um erro ao buscar os dados, tente recarregar a página!',
            );
            return;
        }

        return this.http.get(
            this.apiUrl + this.recipientsPath + '/client?id=' + clientId,
        );
    }

    async saveTransaction(data: MoneyTransaction): Promise<any> {
        if (data.id) {
            //Update

            const request$ = this.http
                .put(
                    this.apiUrl + this.transactionPath + `?update=${data.id}`,
                    data,
                    { headers: this.textResponseHeader, responseType: 'text' },
                )
                .pipe(take(1));

            return await lastValueFrom<any>(request$);
        } else {
            //Save

            const clientId = this.authService.getClient()?.id;

            if (!clientId) {
                return false;
            }

            const dataClientId = { ...data, client_id: clientId };

            const request$ = this.http
                .post(this.apiUrl + this.transactionPath, dataClientId, {
                    headers: this.textResponseHeader,
                    responseType: 'text',
                })
                .pipe(take(1));

            return await lastValueFrom<any>(request$);
        }
    }

    async deleteTransaction(id: number): Promise<any> {
        const request$ = this.http
            .delete(this.apiUrl + this.transactionPath + `?delete=${id}`, {
                headers: this.textResponseHeader,
                responseType: 'text',
            })
            .pipe(take(1));

        return await lastValueFrom<any>(request$);
    }

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private taostrService: ToastrService,
    ) {}
}
