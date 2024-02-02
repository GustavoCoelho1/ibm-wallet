import { Component, OnInit, input } from '@angular/core';
import { TransactionsService } from '../../../../services/transactions.service';
import { Category } from '../../../../models/Category';
import { Recipient } from '../../../../models/Recipient';
import { MoneyTransaction } from '../../../../models/MoneyTransaction';
import { ToastrService } from 'ngx-toastr';
import { TransactionFormSubmitted } from './types';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    constructor(
        private transactionService: TransactionsService,
        private toastrService: ToastrService,
    ) {}

    isTableLoading = true;
    isModalLoading = false;

    currentModal?: {
        action: 'save' | 'update' | 'delete' | 'largeScaleSave' | 'clearAll';
        data: any;
    } | null;

    transactions: MoneyTransaction[] = [];
    categories: Category[] = [];
    recipients: Recipient[] = [];

    ngOnInit() {
        this.isTableLoading = true;
        this.getRecipientsName();
        this.getCategoriesName();
        this.getTransactions();
    }

    receiveCloseModal(data: { id: string; show: boolean }) {
        this.currentModal = null;
    }

    receiveFormSubmitted(data: TransactionFormSubmitted) {
        if (data.operation === 'save') {
            if (data.success) {
                this.toastrService.success(data.message);
                this.onChangesRefresh();
            } else {
                this.toastrService.error(data.message);
                this.currentModal = null;
            }
        }
    }

    getCategoriesName() {
        this.transactionService.getAllClientCategories()?.subscribe((res) => {
            const categories = res as Category[];
            this.categories = categories;

            console.log(this.categories);
        });
    }

    getRecipientsName() {
        this.transactionService.getAllClientRecipients()?.subscribe((res) => {
            const recipients = res as Recipient[];
            this.recipients = recipients;

            console.log(this.recipients);
        });
    }

    timestampToDate(timestamp: number) {
        const rawDate = new Date(timestamp);

        let day = rawDate.getUTCDate().toString();
        day = Number(day) < 10 ? '0' + day : day; //Formata no modelo "dd/mm/yyyy"

        let month = (rawDate.getUTCMonth() + 1).toString();
        month = Number(month) < 10 ? '0' + month : month; //Formata no modelo "dd/mm/yyyy"

        let year = rawDate.getUTCFullYear();

        return day + '/' + month + '/' + year;
    }

    getTransactions() {
        this.isTableLoading = true;
        this.transactionService.getAllClientTransacitons()?.subscribe((res) => {
            const responseMapped = res.map((transaction: MoneyTransaction) => {
                const category = this.categories.find(
                    (cat) => cat.id === transaction.category_id,
                );

                const recipient = this.recipients.find(
                    (rec) => rec.id === transaction.recipient_id,
                );

                if (!transaction.date) {
                    return { ...transaction, category, recipient };
                }

                const date = this.timestampToDate(transaction.date);

                return { ...transaction, category, recipient, date };
            });

            this.isTableLoading = false;
            this.transactions = responseMapped;
        });
    }

    rawDateToInputDateFormat(rawDate: string) {
        //Pega o formato de data "dd/mm/aaaa" e transforma em "aaaa-mm-dd"

        const rawDateArr = rawDate.split('/');

        return rawDateArr[2] + '-' + rawDateArr[1] + '-' + rawDateArr[0];
    }

    onClickUpdate(item: any) {
        if (!item.date) {
            return;
        }

        this.currentModal = {
            action: 'update',
            data: {
                id: item.id,
                value: item.value,
                category_id: Number(item.category_id),
                recipient_id: Number(item.recipient_id),
                date: this.rawDateToInputDateFormat(item.date.toString()),
            },
        };
    }

    onClickLargeScale() {
        this.currentModal = {
            action: 'largeScaleSave',
            data: {
                content:
                    '2022-02-01,-18.00,alimentacao,iFood;\n2022-02-02,-18.00,alimentacao,iFood',
            },
        };
    }

    onClickDelete(item: MoneyTransaction) {
        if (!item.date) {
            return;
        }

        this.currentModal = {
            action: 'delete',
            data: item,
        };
    }

    onClickNew() {
        this.currentModal = {
            action: 'save',
            data: {
                value: null,
                category_id: null,
                recipient_id: null,
                date: null,
            },
        };
    }

    onClickClearAll() {
        this.currentModal = {
            action: 'clearAll',
            data: {
                value: null,
                category_id: null,
                recipient_id: null,
                date: null,
            },
        };
    }

    onChangesRefresh() {
        this.currentModal = null;
        this.transactions = [];
        this.getTransactions();
    }
}
