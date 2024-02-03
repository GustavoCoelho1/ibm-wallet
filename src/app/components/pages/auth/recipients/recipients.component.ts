import { Component } from '@angular/core';
import { Recipient } from '../../../../models/Recipient';
import { RecipientFormSubmitted } from './types';
import { ToastrService } from 'ngx-toastr';
import { RecipientsService } from '../../../../services/recipients.service';

@Component({
    selector: 'app-recipients',
    templateUrl: './recipients.component.html',
    styleUrl: './recipients.component.scss',
})
export class RecipientsComponent {
    recipients = [] as Recipient[];

    isTableLoading = true;
    isModalLoading = false;

    currentModal?: {
        action: 'save' | 'update' | 'delete' | 'largeScaleSave' | 'clearAll';
        data: any;
    } | null;

    ngOnInit() {
        this.isTableLoading = true;
        this.getRecipients();
    }

    receiveCloseModal(data: { id: string; show: boolean }) {
        this.currentModal = null;
    }

    receiveFormSubmitted(data: RecipientFormSubmitted) {
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

    getRecipients() {
        this.recipientsService.getAllClientRecipients()?.subscribe((res) => {
            const recipients = res as Recipient[];
            this.recipients = recipients;

            this.isTableLoading = false;
        });
    }

    onClickUpdate(item: Recipient) {
        this.currentModal = {
            action: 'update',
            data: {
                id: item.id,
                name: item.name,
            },
        };
    }

    onClickDelete(item: Recipient) {
        this.currentModal = {
            action: 'delete',
            data: item,
        };
    }

    onClickNew() {
        this.currentModal = {
            action: 'save',
            data: {
                name: '',
            },
        };
    }

    onClickClearAll() {
        this.currentModal = {
            action: 'clearAll',
            data: {
                name: '',
            },
        };
    }

    onChangesRefresh() {
        this.currentModal = null;
        this.recipients = [];
        this.getRecipients();
    }

    constructor(
        private recipientsService: RecipientsService,
        private toastrService: ToastrService,
    ) {}
}
