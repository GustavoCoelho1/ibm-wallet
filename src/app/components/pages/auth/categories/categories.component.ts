import { Component } from '@angular/core';

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
    ];
}
