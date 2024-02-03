import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecipientsService } from '../../../../../../services/recipients.service';
import { RecipientDeleteData, RecipientFormSubmitted } from '../../types';

@Component({
    selector: 'app-delete-recipient',
    templateUrl: './delete-recipient.component.html',
    styleUrl: '../modal-content.scss',
})
export class DeleteRecipientComponent {
    @Input()
    modalData: RecipientDeleteData = {
        id: 0,
        name: '',
    };

    @Output()
    formSubmitted = new EventEmitter<RecipientFormSubmitted>();

    isLoading = false;

    async onClickSubmit() {
        const deleteId: number = this.modalData.id;

        this.isLoading = true;

        await this.recipientsService
            .deleteRecipient(deleteId)
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

    constructor(private recipientsService: RecipientsService) {}
}
