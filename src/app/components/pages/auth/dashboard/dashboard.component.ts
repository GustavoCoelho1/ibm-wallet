import { Component, OnInit } from '@angular/core';
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

    isLoading = true;
    currentModal?: {
        action: 'save' | 'update' | 'delete';
        data: any;
    } | null;

    transactions: MoneyTransaction[] = [];
    categories: Category[] = [];
    recipients: Recipient[] = [];

    ngOnInit() {
        this.isLoading = true;
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
        this.isLoading = true;
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

            this.isLoading = false;
            this.transactions = responseMapped;
        });
    }

    onClickUpdate(item: MoneyTransaction) {
        if (!item.created_at) {
            return;
        }
        this.currentModal = {
            action: 'update',
            data: {
                id: item.id,
                value: item.value,
                category_id: Number(item.category_id),
                recipient_id: Number(item.recipient_id),
                created_at: item.created_at,
            },
        };
    }

    onClickDelete(item: MoneyTransaction) {
        if (!item.created_at) {
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
            data: {},
        };
    }

    async onClickModalSave() {
        const inputsData = this.currentModal?.data;

        if (
            !inputsData ||
            inputsData.recipient_id == null ||
            inputsData.category_id == null ||
            inputsData.value == null ||
            inputsData.value == 0 ||
            inputsData.created_at == null ||
            inputsData.created_at == ''
        ) {
            this.toastrService.error(
                'Preencha todos os campos para salvar o registro!',
            );
        } else {
            let inputsDataDateArr: string[] = [];

            try {
                inputsDataDateArr = inputsData.created_at.split('-');
            } catch {
                this.toastrService.error('Preencha o campo de data!');
                return;
            }

            const newTransactionDate = new Date(
                Number(inputsDataDateArr[0]),
                Number(inputsDataDateArr[1]),
                Number(inputsDataDateArr[2]),
            );

            const newTransactionTimestamp = newTransactionDate.getTime();

            const newTransaction = {
                ...inputsData,
                created_at: newTransactionTimestamp,
            };

            await this.transactionService
                .saveTransaction(newTransaction)
                .catch((err) => {
                    console.log(err);
                    return false;
                })
                .then((res) => {
                    if (res != false) {
                        this.toastrService.success(
                            'O registro foi deletado com sucesso!',
                        );
                        this.onChangesRefresh();
                    } else {
                        this.toastrService.error(
                            'Houve um erro ao deletar o registro!',
                        );
                        this.currentModal = null;
                    }
                });
        }
    }

    async onClickModalUpdate() {
        const inputsData = this.currentModal?.data;

        if (
            !inputsData ||
            inputsData.id == null ||
            inputsData.recipient_id == null ||
            inputsData.category_id == null ||
            inputsData.value == null ||
            inputsData.value == 0 ||
            inputsData.created_at == null ||
            inputsData.created_at == ''
        ) {
            this.toastrService.error(
                'Preencha todos os campos para atualizar o registro!',
            );
        } else {
            let inputsDataDateArr: string[] = [];

            try {
                inputsDataDateArr = inputsData.created_at.split('-');
            } catch {
                this.toastrService.error('Preencha o campo de data!');
                return;
            }

            const newTransactionDate = new Date(
                Number(inputsDataDateArr[0]),
                Number(inputsDataDateArr[1]),
                Number(inputsDataDateArr[2]),
            );

            const newTransactionTimestamp = newTransactionDate.getTime();

            const newTransaction = {
                ...inputsData,
                created_at: newTransactionTimestamp,
            };

            await this.transactionService
                .saveTransaction(newTransaction)
                .catch((err) => {
                    console.log(err);
                    return false;
                })
                .then((res) => {
                    if (res != false) {
                        this.toastrService.success(
                            'O registro foi deletado com sucesso!',
                        );
                        this.onChangesRefresh();
                    } else {
                        this.toastrService.error(
                            'Houve um erro ao deletar o registro!',
                        );
                        this.currentModal = null;
                    }
                });
        }
    }

    async onClickModalDelete() {
        const deleteId: number = this.currentModal?.data.id;

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
    }

    onChangesRefresh() {
        this.currentModal = null;
        this.transactions = [];
        this.getTransactions();
    }
}
