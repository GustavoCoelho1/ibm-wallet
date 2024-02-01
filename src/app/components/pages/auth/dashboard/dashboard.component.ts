import { Component, OnInit, input } from '@angular/core';
import { TransactionsService } from '../../../../services/transactions.service';
import { Category } from '../../../../models/Category';
import { Recipient } from '../../../../models/Recipient';
import { MoneyTransaction } from '../../../../models/MoneyTransaction';
import { ToastrService } from 'ngx-toastr';

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
        action: 'save' | 'update' | 'delete' | 'largeScaleSave';
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

        console.log(rawDate);

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

    objectHasInvalid(object: Record<string, any>): boolean {
        for (const key in object) {
            if (
                object[key] === null ||
                object[key] === '' ||
                object[key] === 0
            ) {
                return false;
            }
        }
        return true;
    }

    async onClickModalSave() {
        const inputsData = this.currentModal?.data;

        if (!inputsData || !this.objectHasInvalid(inputsData)) {
            this.toastrService.error(
                'Preencha todos os campos para atualizar o registro!',
            );

            return;
        }

        const newTransaction = inputsData;

        this.isModalLoading = true;

        await this.transactionService
            .saveTransaction(newTransaction)
            .catch((err) => {
                console.log(err);
                return false;
            })
            .then((res) => {
                if (res != false) {
                    this.toastrService.success(
                        'O registro foi salvo com sucesso!',
                    );
                    this.onChangesRefresh();
                } else {
                    this.toastrService.error(
                        'Houve um erro ao salvar o registro!',
                    );
                    this.currentModal = null;
                }
            });

        this.isModalLoading = false;
    }

    validateLargeScaleDate(date: string) {
        const dateArr = date.split('-');

        if (dateArr.length != 3) {
            return false;
        }

        console.log(dateArr);

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

    async onClickModalLargeScaleSave() {
        let contentData = this.currentModal?.data.content as string;

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

    async onClickModalUpdate() {
        const inputsData = this.currentModal?.data;

        if (!inputsData || !this.objectHasInvalid(inputsData)) {
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

        this.isModalLoading = true;

        await this.transactionService
            .saveTransaction(newTransaction)
            .catch((err) => {
                console.log(err);
                return false;
            })
            .then((res) => {
                if (res != false) {
                    this.toastrService.success(
                        'O registro foi alterado com sucesso!',
                    );
                    this.onChangesRefresh();
                } else {
                    this.toastrService.error(
                        'Houve um erro ao alterar o registro!',
                    );
                    this.currentModal = null;
                }
            });

        this.isModalLoading = false;
    }

    async onClickModalDelete() {
        const deleteId: number = this.currentModal?.data.id;

        this.isModalLoading = true;

        await this.transactionService
            .deleteTransaction(deleteId)
            .catch((err) => {
                console.log(err);
                return false;
            })
            .then((res) => {
                if (res != false) {
                    this.toastrService.success(
                        'O registro foi atualizado com sucesso!',
                    );
                    this.onChangesRefresh();
                } else {
                    this.toastrService.error(
                        'Houve um erro ao atualizar o registro!',
                    );
                    this.currentModal = null;
                }
            });

        this.isModalLoading = false;
    }

    onChangesRefresh() {
        this.currentModal = null;
        this.transactions = [];
        this.getTransactions();
    }
}
