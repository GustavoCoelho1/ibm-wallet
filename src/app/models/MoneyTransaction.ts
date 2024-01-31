import { Category } from './Category';
import { Recipient } from './Recipient';

export class MoneyTransaction {
    id?: number;
    value?: number;
    category_id?: number;
    recipient_id?: number;
    category?: Category;
    recipient?: Recipient;
    created_at?: string;
    date?: Date;

    constructor(
        id?: number,
        value?: number,
        category_id?: number,
        recipient_id?: number,
        category?: Category,
        recipient?: Recipient,
        created_at?: string,
    ) {
        (this.id = id),
            (this.value = value),
            (this.category = category),
            (this.recipient = recipient),
            (this.created_at = created_at),
            (this.category_id = category_id),
            (this.recipient_id = recipient_id);
    }
}
