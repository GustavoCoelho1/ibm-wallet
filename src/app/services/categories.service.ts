import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../models/Category';
import { lastValueFrom, take } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class CategoriesService {
    private apiUrl = environment.apiUrl;

    private categoriesPath = '/category';

    textResponseHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'text/plain', // O retorno é um text
    });

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

    async saveCategory(data: Category): Promise<any> {
        if (data.id) {
            //Update

            const request$ = this.http
                .put(
                    this.apiUrl + this.categoriesPath + `?update=${data.id}`,
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
                .post(this.apiUrl + this.categoriesPath, dataClientId, {
                    headers: this.textResponseHeader,
                    responseType: 'text',
                })
                .pipe(take(1));

            return await lastValueFrom<any>(request$);
        }
    }

    async deleteCategory(id: number): Promise<any> {
        const request$ = this.http
            .delete(this.apiUrl + this.categoriesPath + `?delete=${id}`, {
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
