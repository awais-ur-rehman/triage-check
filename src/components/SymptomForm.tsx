import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface SymptomFormProps {
    onSubmit: (symptoms: string, language: string) => void;
    isLoading: boolean;
}

export function SymptomForm({ onSubmit, isLoading }: SymptomFormProps) {
    const [symptoms, setSymptoms] = useState('');
    const { t, isRTL, language } = useLanguage();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(symptoms, language);
    };

    return (
        <div
            className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl p-6"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <div className={`flex items-center justify-between mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h1 className="text-lg font-bold text-gray-900">{t.appTitle}</h1>
                <LanguageSelector />
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.heading}</h2>
                <p className="text-gray-500">{t.subheading}</p>
            </div>

            <form onSubmit={handleSubmit}>
                <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder={t.placeholder}
                    required
                    className="w-full min-h-[140px] p-4 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder:text-gray-400"
                    dir={isRTL ? 'rtl' : 'ltr'}
                />

                <button
                    type="submit"
                    disabled={!symptoms.trim() || isLoading}
                    className="w-full mt-4 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold rounded-2xl transition-colors"
                >
                    {isLoading ? t.loadingButton : t.submitButton}
                </button>
            </form>
        </div>
    );
}
