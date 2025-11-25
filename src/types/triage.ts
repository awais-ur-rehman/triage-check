export type TriageCategory = 'Emergency' | 'OPD' | 'Home Care';

export interface TriageResponse {
    triage: TriageCategory;
    explanation: string;
    red_flags_detected: string[];
    disclaimer: string;
}

export interface TriageState {
    result: TriageResponse | null;
    loading: boolean;
    error: string | null;
}
