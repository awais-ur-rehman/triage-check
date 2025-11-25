import { useState } from 'react';
import type { TriageResponse, TriageState } from '../types/triage';
import { triageSymptoms } from '../utils/gemini';

export function useTriage() {
    const [state, setState] = useState<TriageState>({
        result: null,
        loading: false,
        error: null,
    });

    const analyzeSymptoms = async (symptoms: string) => {
        if (!symptoms.trim()) {
            setState(prev => ({ ...prev, error: 'Please enter symptoms.' }));
            return;
        }

        setState({ result: null, loading: true, error: null });

        try {
            const result = await triageSymptoms(symptoms);
            setState({ result, loading: false, error: null });
        } catch (err) {
            setState({
                result: null,
                loading: false,
                error: err instanceof Error ? err.message : 'An unexpected error occurred',
            });
        }
    };

    const reset = () => {
        setState({ result: null, loading: false, error: null });
    };

    return {
        ...state,
        analyzeSymptoms,
        reset,
    };
}
