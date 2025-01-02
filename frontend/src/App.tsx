import React, { useState, ChangeEvent } from 'react';
import { TranslationContent, TargetLanguage, TranslationResponse } from './types';
import styles from './App.module.css';

const App: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [jsonContent, setJsonContent] = useState<TranslationContent | null>(null);
    const [targetLanguage, setTargetLanguage] = useState<TargetLanguage>('german');
    const [translatedContent, setTranslatedContent] = useState<TranslationContent | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                try {
                    const content = e.target?.result as string;
                    const parsed = JSON.parse(content) as TranslationContent;
                    setJsonContent(parsed);
                    setSelectedFile(file.name);
                } catch (error) {
                    alert('Error parsing JSON file. Please make sure it\'s valid JSON.');
                }
            };
            reader.readAsText(file);
        }
    };

    const translateContent = async (): Promise<void> => {
        if (!jsonContent) return;

        setIsLoading(true);
        try {
            const messages = [{
                role: 'user' as const,
                content: `Translate the following phrases to ${targetLanguage}. Return only the JSON with translated values. Keep the keys exactly the same: ${JSON.stringify(jsonContent)}`
            }];

            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages,
                    language: targetLanguage
                }),
            });

            if (!response.ok) {
                throw new Error('Translation request failed');
            }

            const data = await response.json() as TranslationResponse;
            setTranslatedContent(data.translations);
        } catch (error) {
            alert('Error during translation. Please try again.');
            console.error('Translation error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const downloadTranslation = (): void => {
        if (!translatedContent || !selectedFile) return;

        const blob = new Blob([JSON.stringify(translatedContent, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `translated_${selectedFile}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setTargetLanguage(event.target.value as TargetLanguage);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>JSON Translation App</h1>

            <div className={styles.uploadSection}>
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className={styles.fileInput}
                    id="fileInput"
                />
                <label htmlFor="fileInput" className={styles.fileLabel}>
                    Choose JSON File
                </label>
                {selectedFile && <p className={styles.fileName}>{selectedFile}</p>}
            </div>

            <div className={styles.languageSection}>
                <select
                    value={targetLanguage}
                    onChange={handleLanguageChange}
                    className={styles.select}
                >
                    <option value="german">German</option>
                    <option value="spanish">Spanish</option>
                </select>
            </div>

            <button
                onClick={translateContent}
                disabled={!jsonContent || isLoading}
                className={styles.button}
            >
                {isLoading ? 'Translating...' : 'Translate'}
            </button>

            {translatedContent && (
                <div className={styles.resultSection}>
                    <h2>Translation Result:</h2>
                    <pre className={styles.jsonDisplay}>
                        {JSON.stringify(translatedContent, null, 2)}
                    </pre>
                    <button
                        onClick={downloadTranslation}
                        className={styles.downloadButton}
                    >
                        Download Translation
                    </button>
                </div>
            )}
        </div>
    );
};

export default App
