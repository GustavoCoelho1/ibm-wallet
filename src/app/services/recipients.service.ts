import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Recipient } from '../models/Recipient';
import { lastValueFrom, take } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class RecipientsService {
    private apiUrl = environment.apiUrl;

    private recipientsPath = '/recipient';

    textResponseHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'text/plain', // O retorno é um text
    });

    getAllClientRecipients() {
        const clientId = this.authService.getClient()?.id;

        if (clientId == null) {
            this.taostrService.error(
                'Houve um erro ao buscar os dados, tente recarregar a página!',
            );
            return;
        }

        return this.http.get<any>(
            this.apiUrl + this.recipientsPath + '/client?id=' + clientId,
        );
    }

    async saveRecipient(data: Recipient): Promise<any> {
        if (data.id) {
            //Update

            const request$ = this.http
                .put(
                    this.apiUrl + this.recipientsPath + `?update=${data.id}`,
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
                .post(this.apiUrl + this.recipientsPath, dataClientId, {
                    headers: this.textResponseHeader,
                    responseType: 'text',
                })
                .pipe(take(1));

            return await lastValueFrom<any>(request$);
        }
    }

    async deleteRecipient(id: number): Promise<any> {
        const request$ = this.http
            .delete(this.apiUrl + this.recipientsPath + `?delete=${id}`, {
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
