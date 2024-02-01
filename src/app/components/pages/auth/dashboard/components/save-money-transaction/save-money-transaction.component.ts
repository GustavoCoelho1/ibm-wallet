import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../../../../models/Category';
import { Recipient } from '../../../../../../models/Recipient';
import { ToastrService } from 'ngx-toastr';
import { TransactionsService } from '../../../../../../services/transactions.service';
import {
    TransactionFormSubmitted,
    TransactionActionData,
    TransactionLargeScaleData,
} from '../../types';
import { objectHasInvalid } from '../../../../../../lib/utils';

@Component({
    selector: 'app-save-money-transaction',
    templateUrl: './save-money-transaction.component.html',
    styleUrl: '../modal-content.scss',
})
export class SaveMoneyTransactionComponent {
    @Input()
    modalData: TransactionActionData = {
        value: 0,
        category_id: 0,
        recipient_id: 0,
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
        const inputsData = this.modalData;

        if (!inputsData || !objectHasInvalid(inputsData)) {
            this.toastrService.error(
                'Preencha todos os campos para atualizar o registro!',
            );

            return;
        }

        const newTransaction = inputsData as TransactionActionData;

        this.isLoading = true;

        await this.transactionService
            .saveTransaction(newTransaction)
            .catch((err) => {
                console.log(err);
                return false;
            })
            .then((res) => {
                if (res != false) {
                    this.formSubmitted.emit({
                        operation: 'save',
                        success: true,
                        message: 'O registro foi salvo com sucesso!',
                    });
                } else {
                    this.formSubmitted.emit({
                        operation: 'save',
                        success: false,
                        message: 'Houve um erro ao salvar o registro!',
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
