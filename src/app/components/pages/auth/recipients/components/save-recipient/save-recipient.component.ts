import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecipientActionData, RecipientFormSubmitted } from '../../types';
import { objectHasInvalid } from '../../../../../../lib/utils';
import { RecipientsService } from '../../../../../../services/recipients.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-save-recipient',
    templateUrl: './save-recipient.component.html',
    styleUrl: '../modal-content.scss',
})
export class SaveRecipientComponent {
    @Input()
    modalData: RecipientActionData = {
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
        private recipientsService: RecipientsService,
        private toastrService: ToastrService,
    ) {}
}
