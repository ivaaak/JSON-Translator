export interface TranslationContent {
    [key: string]: string;
}

export interface TranslationResponse {
    translations: TranslationContent;
}

export type TargetLanguage = 'german' | 'spanish';
