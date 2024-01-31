import { HttpClient } from '@angular/common/http';
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

    private transactionGetPath = '/moneyTransaction/client?id=';
    private transactionPath = '/moneyTransaction';

    private categoriesPath = '/category';
    private recipientsPath = '/recipient';

    getAllClientTransacitons() {
        const clientId = this.authService.getClient()?.id;

        if (clientId == null) {
            this.taostrService.error(
                'Houve um erro ao buscar os dados, tente recarregar a página!',
            );
            return;
        }

        return this.http.get<any>(
            this.apiUrl + this.transactionGetPath + clientId,
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

        return this.http.get<any>(this.apiUrl + this.categoriesPath);
    }

    getAllClientRecipients() {
        const clientId = this.authService.getClient()?.id;

        if (clientId == null) {
            this.taostrService.error(
                'Houve um erro ao buscar os dados, tente recarregar a página!',
            );
            return;
        }

        return this.http.get<any>(this.apiUrl + this.recipientsPath);
    }

    async saveTransaction(data: MoneyTransaction): Promise<any> {
        if (data.id) {
            //Update

            const request$ = this.http
                .put<any>(
                    this.apiUrl + this.transactionPath + `?update=${data.id}`,
                    data,
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
                .post<any>(this.apiUrl + this.transactionPath, dataClientId)
                .pipe(take(1));

            return await lastValueFrom<any>(request$);
        }
    }

    async deleteTransaction(id: number): Promise<any> {
        const request$ = this.http
            .delete<any>(this.apiUrl + this.transactionPath + `?delete=${id}`)
            .pipe(take(1));

        return await lastValueFrom<any>(request$);
    }

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private taostrService: ToastrService,
    ) {}
}
