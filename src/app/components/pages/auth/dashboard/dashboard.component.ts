import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../../../services/transactions.service';
import { Category } from '../../../../models/Category';
import { Recipient } from '../../../../models/Recipient';
import { MoneyTransaction } from '../../../../models/MoneyTransaction';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    constructor(private transactionService: TransactionsService) {}

    isLoading = true;
    currentModal?: {
        action: 'save' | 'update' | 'delete';
        data: MoneyTransaction & {
            category_name: string;
            recipient_name: string;
        };
    } | null;

    transactions = [
        {
            id: 1,
            value: -20.0,
            category: { name: 'Alimentação' },
            recipient: { name: 'iFood' },
        },
        {
            id: 2,
            value: -20.0,
            category: { name: 'Alimentação' },
            recipient: { name: 'iFood' },
        },
        {
            id: 3,
            value: -20.0,
            category: { name: 'Alimentação' },
            recipient: { name: 'iFood' },
        },
    ] as MoneyTransaction[];
    categories: Category[] = [];
    recipients: Recipient[] = [];

    ngOnInit() {
        this.getRecipientsName();
        this.getCategoriesName();
        this.getTransactions();
    }

    receiveCloseModal(data: { id: string; show: boolean }) {
        this.currentModal = null;
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

    getTransactions() {
        this.transactionService.getAllClientTransacitons()?.subscribe((res) => {
            const responseMapped = res.map((transaction: MoneyTransaction) => {
                const category = this.categories.find(
                    (cat) => cat.id === transaction.category_id,
                );

                const recipient = this.recipients.find(
                    (rec) => rec.id === transaction.recipient_id,
                );

                return { ...transaction, category, recipient };
            });

            this.transactions = responseMapped;
        });
    }

    onClickUpdate(item: MoneyTransaction) {
        if (item.category?.name && item.recipient?.name) {
            this.currentModal = {
                action: 'update',
                data: {
                    ...item,
                    category_name: item.category?.name,
                    recipient_name: item.recipient?.name,
                },
            };
        }
    }

    onClickDelete(item: MoneyTransaction) {
        if (item.category?.name && item.recipient?.name) {
            this.currentModal = {
                action: 'delete',
                data: {
                    ...item,
                    category_name: item.category?.name,
                    recipient_name: item.recipient?.name,
                },
            };
        }
    }

    onClickModalUpdate() {
        console.log(this.currentModal);
    }

    onClickModalDelete() {
        console.log(this.currentModal);
    }
}
