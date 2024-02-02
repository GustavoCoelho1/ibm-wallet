import { Component, EventEmitter, Output } from '@angular/core';
import { TransactionFormSubmitted } from '../../types';
import { TransactionsService } from '../../../../../../services/transactions.service';

@Component({
    selector: 'app-clear-all-money-transaction',
    templateUrl: './clear-all-money-transaction.component.html',
    styleUrl: '../modal-content.scss',
})
export class ClearAllMoneyTransactionComponent {
    @Output()
    formSubmitted = new EventEmitter<TransactionFormSubmitted>();

    isLoading = false;

    async onClickSubmit() {
        this.isLoading = true;

        await this.transactionService
            .clearAllTransactions()
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

    constructor(private transactionService: TransactionsService) {}
}
