import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, type Language } from '../context/LanguageContext';

export function LanguageSelector() {
    const { language, setLanguage, languageNames, isRTL } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const languages: Language[] = ['en', 'ur', 'ps', 'pa', 'sd'];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Select language"
            >
                <Globe className="w-6 h-6 text-gray-700" />
            </button>

            {isOpen && (
                <div
                    className={`absolute top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[140px] z-50 ${isRTL ? 'left-0' : 'right-0'
                        }`}
                >
                    {languages.map((lang) => (
                        <button
                            key={lang}
                            onClick={() => {
                                setLanguage(lang);
                                setIsOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${language === lang ? 'font-semibold text-blue-600' : 'text-gray-700'
                                } ${lang !== 'en' && lang !== 'pa' ? 'text-right' : ''}`}
                            dir={lang !== 'en' && lang !== 'pa' ? 'rtl' : 'ltr'}
                        >
                            {languageNames[lang]}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

