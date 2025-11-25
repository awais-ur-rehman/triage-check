import type { TriageResponse } from '../types/triage';

const WORKER_URL = 'https://triage-check-api.symptom-checker.workers.dev';

const languageMap: Record<string, string> = {
    en: 'English',
    ur: 'Urdu',
    ps: 'Pashto',
    pa: 'Punjabi',
    sd: 'Sindhi',
};

export async function triageSymptoms(symptoms: string, language: string): Promise<TriageResponse> {
    const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms, language: languageMap[language] || 'English' }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze symptoms');
    }

    return data as TriageResponse;
}
