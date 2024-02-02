import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryActionData, CategoryFormSubmitted } from '../../types';
import { objectHasInvalid } from '../../../../../../lib/utils';
import { CategoriesService } from '../../../../../../services/categories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-update-category',
    templateUrl: './update-category.component.html',
    styleUrl: './update-category.component.scss',
})
export class UpdateCategoryComponent {
    @Input()
    modalData: CategoryActionData = {
        id: 0,
        name: '',
    };

    @Output()
    formSubmitted = new EventEmitter<CategoryFormSubmitted>();

    isLoading = false;

    async onClickSubmit() {
        const inputsData = this.modalData;

        if (!inputsData || !objectHasInvalid(inputsData)) {
            this.toastrService.error(
                'Preencha todos os campos para atualizar o registro!',
            );

            return;
        }

        const newCategory = inputsData as CategoryActionData;

        this.isLoading = true;

        await this.categoriesService
            .saveCategory(newCategory)
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
        private categoriesService: CategoriesService,
        private toastrService: ToastrService,
    ) {}
}
