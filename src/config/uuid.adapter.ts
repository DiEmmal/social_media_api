import { randomUUID } from 'crypto';

export const getUUID = (): string => {
    return randomUUID();
};