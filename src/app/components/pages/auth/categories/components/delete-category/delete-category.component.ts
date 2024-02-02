import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoriesService } from '../../../../../../services/categories.service';
import { ToastrService } from 'ngx-toastr';
import {
    CategoryActionData,
    CategoryDeleteData,
    CategoryFormSubmitted,
} from '../../types';
import { objectHasInvalid } from '../../../../../../lib/utils';

@Component({
    selector: 'app-delete-category',
    templateUrl: './delete-category.component.html',
    styleUrl: './delete-category.component.scss',
})
export class DeleteCategoryComponent {
    @Input()
    modalData: CategoryDeleteData = {
        id: 0,
        name: '',
    };

    @Output()
    formSubmitted = new EventEmitter<CategoryFormSubmitted>();

    isLoading = false;

    async onClickSubmit() {
        const deleteId: number = this.modalData.id;

        this.isLoading = true;

        await this.categoriesService
            .deleteCategory(deleteId)
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

    constructor(private categoriesService: CategoriesService) {}
}
