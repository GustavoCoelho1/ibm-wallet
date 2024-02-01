export function objectHasInvalid(object: Record<string, any>): boolean {
    for (const key in object) {
        if (object[key] === null || object[key] === '' || object[key] === 0) {
            return false;
        }
    }
    return true;
}
