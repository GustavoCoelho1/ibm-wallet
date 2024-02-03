export type RecipientFormSubmitted = {
    operation: 'save' | 'update' | 'delete';
    success: boolean;
    message: string;
};

export type RecipientActionData = {
    id?: number;
    name: string;
};

export type RecipientDeleteData = {
    id: number;
    name: string;
};
