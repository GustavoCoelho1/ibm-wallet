import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    TransactionActionData,
    TransactionDeleteData,
    TransactionFormSubmitted,
} from '../../types';
import { Category } from '../../../../../../models/Category';
import { Recipient } from '../../../../../../models/Recipient';
import { TransactionsService } from '../../../../../../services/transactions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-delete-money-transaction',
    templateUrl: './delete-money-transaction.component.html',
    styleUrl: '../modal-content.scss',
})
export class DeleteMoneyTransactionComponent {
    @Input()
    modalData: TransactionDeleteData = {
        id: 0,
        value: 0.0,
        category: {
            id: 0,
            name: '',
        },
        recipient: {
            id: 0,
            name: '',
        },
        date: new Date().toDateString(),
    };

    @Input()
    categories: Category[] = [];

    @Input()
    recipients: Recipient[] = [];

    @Output()
    formSubmitted = new EventEmitter<TransactionFormSubmitted>();

    isLoading = false;

    async onClickSubmit() {
        const deleteId: number = this.modalData.id;

        this.isLoading = true;

        await this.transactionService
            .deleteTransaction(deleteId)
            .catch((err) => {
                console.log(err);
                return false;
            })
            .then((res) => {
                if (res != false) {
                    this.formSubmitted.emit({
                        operation: 'save',
                        success: true,
                        message: 'O registro foi deletado com sucesso!',
                    });
                } else {
                    this.formSubmitted.emit({
                        operation: 'save',
                        success: false,
                        message: 'Houve um erro ao deletar o registro!',
                    });
                }
            });

        this.isLoading = false;
    }

    constructor(
        private transactionService: TransactionsService,
        private toastrService: ToastrService,
    ) {}
}
