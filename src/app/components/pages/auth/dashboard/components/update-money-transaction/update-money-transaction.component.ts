import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransactionActionData, TransactionFormSubmitted } from '../../types';
import { Category } from '../../../../../../models/Category';
import { Recipient } from '../../../../../../models/Recipient';
import { objectHasInvalid } from '../../../../../../lib/utils';
import { TransactionsService } from '../../../../../../services/transactions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-update-money-transaction',
    templateUrl: './update-money-transaction.component.html',
    styleUrl: '../modal-content.scss',
})
export class UpdateMoneyTransactionComponent {
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

        console.log(inputsData.date);

        if (typeof inputsData.date === 'number') {
            //Se vim como number o usuário não definiu uma data
            this.toastrService.error('Preencha o campo de data!');
            return;
        }

        const newTransaction = inputsData;

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
                        message: 'O registro foi atulizado com sucesso!',
                    });
                } else {
                    this.formSubmitted.emit({
                        operation: 'save',
                        success: false,
                        message: 'Houve um erro ao atualizar o registro!',
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
