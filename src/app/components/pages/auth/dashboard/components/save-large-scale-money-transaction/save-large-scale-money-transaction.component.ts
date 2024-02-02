import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    TransactionFormSubmitted,
    TransactionLargeScaleData,
} from '../../types';
import { Category } from '../../../../../../models/Category';
import { Recipient } from '../../../../../../models/Recipient';
import { TransactionsService } from '../../../../../../services/transactions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-save-large-scale-money-transaction',
    templateUrl: './save-large-scale-money-transaction.component.html',
    styleUrl: '../modal-content.scss',
})
export class SaveLargeScaleMoneyTransactionComponent {
    @Input()
    modalData: TransactionLargeScaleData = {
        content: '',
    };

    @Input()
    categories: Category[] = [];

    @Input()
    recipients: Recipient[] = [];

    @Output()
    formSubmitted = new EventEmitter<TransactionFormSubmitted>();

    isLoading = false;

    isValidDate(date: string) {
        const dateArr = date.split('-');

        if (dateArr.length != 3) {
            return false;
        }

        const yearNaN = Number.isNaN(Number(dateArr[0]));
        const monthNaN = Number.isNaN(Number(dateArr[1]));
        const dateNaN = Number.isNaN(Number(dateArr[2]));

        if (dateArr[0].length != 4 || yearNaN) {
            //Campo de ano, ano deve ter 4 dígitos e deve ser um número
            return false;
        }

        if (
            dateArr[1].length != 2 ||
            monthNaN ||
            Number(dateArr[1]) < 1 ||
            Number(dateArr[1]) > 12
        ) {
            //Campo de mês, mês deve ter 2 dígitos, deve ser um número e deve estar entre 1 e 12
            return false;
        }

        if (
            dateArr[2].length != 2 ||
            dateNaN ||
            Number(dateArr[2]) < 1 ||
            Number(dateArr[2]) > 31
        ) {
            //Campo de dia, dia deve ter 2 dígitos e deve ser um número e deve estar entre 1 e 31
            return false;
        }

        return true;
    }

    isValidCategory(categoryName: string) {
        const categoryExists =
            this.categories.filter((cat) => cat.name === categoryName).length >
            0;

        return categoryExists;
    }

    isValidRecipient(recipientName: string) {
        const recipientExists =
            this.recipients.filter((rec) => rec.name === recipientName).length >
            0;

        return recipientExists;
    }

    isValidRegister(register: string[]) {
        const transactionArr = register;

        const transactionDate = transactionArr[0];
        const transactionValue = transactionArr[1];
        const transactionCategoryName = transactionArr[2];
        const transactionRecipientName = transactionArr[3];

        const validatedDate = this.isValidDate(transactionDate);
        const validatedValue = !Number.isNaN(transactionValue);
        const validatedCategory = this.isValidCategory(transactionCategoryName);
        const validatedRecipient = this.isValidRecipient(
            transactionRecipientName,
        );

        return [
            validatedDate,
            validatedValue,
            validatedCategory,
            validatedRecipient,
        ].every((validation) => validation === true);
    }

    mapTransactionList(list: string[]): Array<string[]> | null {
        //Valida e converte as linhas da lista de "2022-02-1,10.0,alimentacao,ifood" para ["2022-02-1", "10.0", "alimentacao", "ifood"]
        let validList = true;
        let idx = 1;

        let newList = [];

        for (let x = 0; x < list.length; x++) {
            const row = list[x];
            const transactionArr = row.split(',');

            if (transactionArr.length !== 4) {
                //Se quando separar a string por "," não houver 4 strings independentes, quer dizer que essa linha não está formatada do modo correto (<data>,<valor>,<categoria>,<destinario/remetente>)
                validList = false;
                break;
            }

            const date = transactionArr[0];
            const value = transactionArr[1];
            const categoryName = transactionArr[2];
            const recipientName = transactionArr[3];

            if (
                !this.isValidDate(date) ||
                Number.isNaN(value) ||
                !this.isValidCategory(categoryName) ||
                !this.isValidRecipient(recipientName)
            ) {
                this.toastrService.error(
                    'Dados inválidos no registro/linha: ' + idx,
                );
                console.log(
                    this.isValidDate(date),
                    Number.isNaN(value),
                    this.isValidCategory(categoryName),
                    this.isValidRecipient(recipientName),
                );
                validList = false;
                break;
            }

            newList.push([date, value, categoryName, recipientName]);

            idx++;
        }

        if (validList && newList.length === list.length) {
            return newList;
        }

        return null;
    }

    removeLastSemicolon(str: string) {
        const stringLastChar = str[str.length - 1];

        if (stringLastChar === ';') {
            return str.slice(0, -1);
        }
        return str;
    }

    async onClickSubmit() {
        let contentData = this.modalData.content as string;

        contentData = this.removeLastSemicolon(contentData); //Retirando ponto e vírgula do final da lista, caso haja, porque atrapalharia na validação.

        if (contentData.includes(';')) {
            //Inserindo múltiplas linhas
            if (contentData.includes('\n')) {
                contentData = contentData.replace('\n', ''); //Retirando os backspaces
            }

            const contentList = contentData.split(';'); //Dividindo os registros pelos ponto e vírgula

            const mappedList = this.mapTransactionList(contentList);

            if (mappedList) {
                this.isLoading = true;

                await this.transactionService
                    .largeScaleSaveTransaction(mappedList)
                    .catch((err) => {
                        console.log(err);
                        return false;
                    })
                    .then((res) => {
                        if (res != false) {
                            this.formSubmitted.emit({
                                operation: 'save',
                                success: true,
                                message:
                                    'Os registros foram salvo com sucesso!',
                            });
                        } else {
                            this.formSubmitted.emit({
                                operation: 'save',
                                success: false,
                                message:
                                    'Houve um erro ao salvar os registros!',
                            });
                        }
                    });

                this.isLoading = false;
            }
        } else if (
            contentData.includes(',') &&
            contentData.split(',').length === 4
        ) {
            //Inserindo apenas uma linha

            const contentRegister = contentData.split(',');

            if (this.isValidRegister(contentRegister)) {
                console.log('OK');
            } else {
                console.log('No');
            }
        } else {
            console.log('No');
        }
    }

    constructor(
        private transactionService: TransactionsService,
        private toastrService: ToastrService,
    ) {}
}
