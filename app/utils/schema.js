import { Schema, arrayOf } from 'normalizr';

export const message = new Schema('messages', { idAttribute: 'uuid' });
export const messages = new arrayOf(message);
export const conversation = new Schema('conversations');
export const conversations = new arrayOf(conversation);
export const client = new Schema('clients', { idAttribute: 'user_id' });
