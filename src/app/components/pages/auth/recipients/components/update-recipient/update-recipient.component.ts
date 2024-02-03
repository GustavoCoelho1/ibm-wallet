import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecipientsService } from '../../../../../../services/recipients.service';
import { ToastrService } from 'ngx-toastr';
import { RecipientActionData, RecipientFormSubmitted } from '../../types';
import { objectHasInvalid } from '../../../../../../lib/utils';

@Component({
    selector: 'app-update-recipient',
    templateUrl: './update-recipient.component.html',
    styleUrl: '../modal-content.scss',
})
export class UpdateRecipientComponent {
    @Input()
    modalData: RecipientActionData = {
        id: 0,
        name: '',
    };

    @Output()
    formSubmitted = new EventEmitter<RecipientFormSubmitted>();

    isLoading = false;

    async onClickSubmit() {
        const inputsData = this.modalData;

        if (!inputsData || !objectHasInvalid(inputsData)) {
            this.toastrService.error(
                'Preencha todos os campos para atualizar o registro!',
            );

            return;
        }

        const newRecipient = inputsData as RecipientActionData;

        this.isLoading = true;

        await this.recipientsService
            .saveRecipient(newRecipient)
            .catch((err) => {
                console.log(err);
                return false;
            })
            .then((res) => {
                if (res != false) {
                    this.formSubmitted.emit({
                        operation: 'save',
                        success: true,
                        message: 'O registro foi atualizado com sucesso!',
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
        private recipientsService: RecipientsService,
        private toastrService: ToastrService,
    ) {}
}
