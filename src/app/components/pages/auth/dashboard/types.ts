import { Category } from '../../../../models/Category';
import { Recipient } from '../../../../models/Recipient';

export type TransactionActionData = {
    id?: number;
    value: number;
    category_id: number;
    recipient_id: number;
    date: any;
}; //Modelo que as actions Save e Update usam

export type TransactionDeleteData = {
    id: number;
    value: number;
    category: Category;
    recipient: Recipient;
    date: any;
};

export type TransactionLargeScaleData = {
    content: string; //Modelo que a operação em massa usa
};

export type TransactionFormSubmitted = {
    operation: 'save' | 'update' | 'delete' | 'largeScaleSave';
    success: boolean;
    message: string;
};
