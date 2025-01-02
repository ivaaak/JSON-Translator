import { Request } from 'express';

export interface TranslationRequest extends Request {
  body: {
    messages: Array<{
      role: 'user';
      content: string;
    }>;
    language: string;
  };
}