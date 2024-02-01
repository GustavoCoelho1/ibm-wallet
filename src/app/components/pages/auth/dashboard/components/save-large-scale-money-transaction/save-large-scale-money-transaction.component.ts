import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    TransactionFormSubmitted,
    TransactionLargeScaleData,
} from '../../types';
import { Category } from '../../../../../../models/Category';
import { Recipient } from '../../../../../../models/Recipient';

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

    validateLargeScaleDate(date: string) {
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

        if (dateArr[1].length != 2 || monthNaN) {
            //Campo de mês, mês deve ter 2 dígitos e deve ser um número
            return false;
        }

        if (dateArr[2].length != 2 || dateNaN) {
            //Campo de dia, dia deve ter 2 dígitos e deve ser um número
            return false;
        }

        return true;
    }

    validateLargeScaleCategory(categoryName: string) {
        const categoryExists =
            this.categories.filter((cat) => cat.name === categoryName).length >
            0;

        return categoryExists;
    }

    validateLargeScaleRecipient(recipientName: string) {
        const recipientExists =
            this.recipients.filter((rec) => rec.name === recipientName).length >
            0;

        return recipientExists;
    }

    validateLargeScaleRegister(register: string[]) {
        const transactionArr = register;

        const transactionDate = transactionArr[0];
        const transactionValue = transactionArr[1];
        const transactionCategoryName = transactionArr[2];
        const transactionRecipientName = transactionArr[3];

        const validatedDate = this.validateLargeScaleDate(transactionDate);
        const validatedValue = !Number.isNaN(transactionValue);
        const validatedCategory = this.validateLargeScaleCategory(
            transactionCategoryName,
        );
        const validatedRecipient = this.validateLargeScaleRecipient(
            transactionRecipientName,
        );

        return [
            validatedDate,
            validatedValue,
            validatedCategory,
            validatedRecipient,
        ].every((validation) => validation === true);
    }

    validateLargeScaleList(list: string[]): boolean {
        let validList = false;
        let idx = 1;

        let error = [];

        for (let x = 0; x < list.length; x++) {
            const row = list[x];
            const transactionArr = row.split(',');

            console.log(row);
            console.log(transactionArr.length);

            if (transactionArr.length !== 4) {
                //Se quando separar a string por "," não houver 4 strings independentes, quer dizer que essa linha não está formatada do modo correto (<data>,<valor>,<categoria>,<destinario/remetente>)
                validList = false;
                break;
            }

            const transactionDate = transactionArr[0];
            const transactionValue = transactionArr[1];
            const transactionCategoryName = transactionArr[2];
            const transactionRecipientName = transactionArr[3];

            const validatedDate = this.validateLargeScaleDate(transactionDate);
            const validatedValue = !Number.isNaN(transactionValue);
            const validatedCategory = this.validateLargeScaleCategory(
                transactionCategoryName,
            );
            const validatedRecipient = this.validateLargeScaleRecipient(
                transactionRecipientName,
            );

            if (!validatedDate) {
                error.push('Data inválida no registro/linha: ' + idx);
            }

            if (!validatedValue) {
                error.push(
                    'Valor de transação inválido no registro/linha: ' + idx,
                );
            }

            if (!validatedCategory) {
                error.push(
                    'Categoria não resgistrada no registro/linha: ' + idx,
                );
            }

            if (!validatedRecipient) {
                error.push(
                    'Destinatário não registrado no registro/linha: ' + idx,
                );
            }

            if (error.length > 0) {
                validList = false;
                break;
            }

            validList = true;

            idx++;
        }

        console.log(error);

        return validList;
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

            let validList = this.validateLargeScaleList(contentList);

            if (validList) {
                console.log('OK');
            } else {
                console.log('No');
            }
        } else if (
            contentData.includes(',') &&
            contentData.split(',').length === 4
        ) {
            //Inserindo apenas uma linha

            const contentRegister = contentData.split(',');

            let validRegister =
                this.validateLargeScaleRegister(contentRegister);

            if (validRegister) {
                console.log('OK');
            } else {
                console.log('No');
            }
        } else {
            console.log('No');
        }
    }
}
