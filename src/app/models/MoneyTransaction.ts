import { Category } from './Category';
import { Recipient } from './Recipient';

export class MoneyTransaction {
    id?: number;
    value?: number;
    category_id?: number;
    recipient_id?: number;
    date?: number;

    category?: Category;
    recipient?: Recipient;

    constructor(
        id?: number,
        value?: number,
        category_id?: number,
        recipient_id?: number,
        category?: Category,
        recipient?: Recipient,
        date?: number,
    ) {
        (this.id = id),
            (this.value = value),
            (this.category = category),
            (this.recipient = recipient),
            (this.date = date),
            (this.category_id = category_id),
            (this.recipient_id = recipient_id);
    }
}
