import { Component } from '@angular/core';
import { Category } from '../../../../models/Category';
import { CategoriesService } from '../../../../services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryActionData, CategoryFormSubmitted } from './types';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
    categories = [
        { id: 1, name: 'Alimentação' },
        { id: 1, name: 'Alimentação' },
        { id: 1, name: 'Alimentação' },
    ] as Category[];

    constructor(
        private categoriesService: CategoriesService,
        private toastrService: ToastrService,
    ) {}

    isTableLoading = true;
    isModalLoading = false;

    currentModal?: {
        action: 'save' | 'update' | 'delete' | 'largeScaleSave' | 'clearAll';
        data: any;
    } | null;

    ngOnInit() {
        this.isTableLoading = true;
        this.getCategories();
    }

    receiveCloseModal(data: { id: string; show: boolean }) {
        this.currentModal = null;
    }

    receiveFormSubmitted(data: CategoryFormSubmitted) {
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

    getCategories() {
        this.categoriesService.getAllClientCategories()?.subscribe((res) => {
            const categories = res as Category[];
            this.categories = categories;

            console.log(this.categories);
        });
    }

    onClickUpdate(item: Category) {
        this.currentModal = {
            action: 'update',
            data: {
                id: item.id,
                name: item.name,
            },
        };
    }

    onClickDelete(item: Category) {
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
        this.categories = [];
        this.getCategories();
    }
}
