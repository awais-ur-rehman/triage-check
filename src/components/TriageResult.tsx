import type { TriageResponse } from '../types/triage';
import { useLanguage } from '../context/LanguageContext';

interface TriageResultProps {
    result: TriageResponse;
    onReset: () => void;
}

export function TriageResult({ result, onReset }: TriageResultProps) {
    const { triage, explanation } = result;
    const { t, isRTL } = useLanguage();

    const getStyles = (category: string) => {
        switch (category) {
            case 'Emergency':
                return {
                    bg: 'bg-red-50',
                    border: 'border-l-red-500',
                    title: 'text-red-600',
                    label: t.emergency,
                };
            case 'OPD':
                return {
                    bg: 'bg-amber-50',
                    border: 'border-l-amber-500',
                    title: 'text-amber-600',
                    label: t.opd,
                };
            case 'Home Care':
                return {
                    bg: 'bg-green-50',
                    border: 'border-l-green-500',
                    title: 'text-green-600',
                    label: t.homeCare,
                };
            default:
                return {
                    bg: 'bg-gray-50',
                    border: 'border-l-gray-500',
                    title: 'text-gray-600',
                    label: category,
                };
        }
    };

    const styles = getStyles(triage);

    return (
        <div className="w-full max-w-md mx-auto mt-6" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="border-t border-gray-200 pt-6">
                <div
                    className={`${styles.bg} ${isRTL ? 'border-r-4 border-l-0' : 'border-l-4'} ${isRTL ? 'border-r-' + styles.border.replace('border-l-', '') : styles.border} rounded-2xl p-5`}
                    style={{
                        borderLeftWidth: isRTL ? 0 : 4,
                        borderRightWidth: isRTL ? 4 : 0,
                        borderLeftColor: !isRTL ? (triage === 'Emergency' ? '#ef4444' : triage === 'OPD' ? '#f59e0b' : '#22c55e') : undefined,
                        borderRightColor: isRTL ? (triage === 'Emergency' ? '#ef4444' : triage === 'OPD' ? '#f59e0b' : '#22c55e') : undefined,
                    }}
                >
                    <h3 className={`text-xl font-bold mb-2 ${styles.title}`}>{styles.label}</h3>
                    <p className="text-gray-700 leading-relaxed">{explanation}</p>
                </div>

                <p className="text-gray-400 text-sm mt-4">{t.disclaimer}</p>

                <button
                    onClick={onReset}
                    className="w-full mt-4 py-3 text-gray-500 hover:text-gray-700 font-medium transition-colors"
                >
                    {t.checkAnother}
                </button>
            </div>
        </div>
    );
}
