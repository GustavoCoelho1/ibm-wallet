export type CategoryFormSubmitted = {
    operation: 'save' | 'update' | 'delete';
    success: boolean;
    message: string;
};

export type CategoryActionData = {
    id?: number;
    name: string;
};

export type CategoryDeleteData = {
    id: number;
    name: string;
};
