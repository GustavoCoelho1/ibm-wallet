import { MoneyTransaction } from './MoneyTransaction';

export class Client {
    name?: string;
    email?: string;
    password?: string;

    transactions?: MoneyTransaction[];

    constructor(name?: string, email?: string, password?: string) {
        (this.name = name), (this.email = email), (this.password = password);
    }
}
