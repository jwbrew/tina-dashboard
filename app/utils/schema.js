import { Schema, arrayOf } from 'normalizr';
export const client = new Schema('clients', { idAttribute: 'user_id' });
