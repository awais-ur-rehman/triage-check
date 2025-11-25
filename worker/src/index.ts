export interface Env {
    GEMINI_API_KEY: string;
    ALLOWED_ORIGIN: string;
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const corsHeaders = (origin: string) => ({
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
});

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const origin = request.headers.get('Origin') || '';
        const allowedOrigins = [env.ALLOWED_ORIGIN, 'http://localhost:5173', 'http://localhost:3000'];
        const isAllowed = allowedOrigins.some(o => origin.startsWith(o) || origin.includes('vercel.app'));

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders(isAllowed ? origin : '') });
        }

        if (request.method !== 'POST') {
            return new Response(JSON.stringify({ error: 'Method not allowed' }), {
                status: 405,
                headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
            });
        }

        if (!isAllowed) {
            return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        try {
            const { symptoms, language = 'English' } = await request.json() as { symptoms: string; language?: string };

            if (!symptoms || typeof symptoms !== 'string') {
                return new Response(JSON.stringify({ error: 'Symptoms are required' }), {
                    status: 400,
                    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
                });
            }

            const prompt = `
        You are an expert medical triage assistant. Your goal is to analyze the patient's symptoms and categorize them into one of three categories:
        1. Emergency: Immediate medical attention required (e.g., chest pain, severe bleeding, difficulty breathing, stroke signs, trauma).
        2. OPD: Outpatient Department visit recommended (e.g., persistent pain, infection signs, non-life-threatening issues).
        3. Home Care: Can be managed at home (e.g., mild cold, minor cuts, fatigue).

        IMPORTANT LANGUAGE INSTRUCTION:
        - The user has selected "${language}" as their preferred language.
        - You MUST respond in ${language} language.
        - The "explanation" and "disclaimer" fields MUST be written in ${language}.
        - The "triage" field should always be in English (Emergency, OPD, or Home Care).
        - The "red_flags_detected" array items should be in ${language}.

        Safety Rules:
        - If ANY red-flag symptom is present (chest pain, shortness of breath, severe bleeding, unconsciousness, etc.), classify as "Emergency".
        - Do NOT provide a diagnosis.
        - Do NOT suggest specific medications.
        - ALWAYS include a disclaimer in ${language}.

        Analyze the following symptoms: "${symptoms}"

        Return the result strictly in the following JSON format:
        {
          "triage": "Emergency" | "OPD" | "Home Care",
          "explanation": "A short explanation in ${language} of why this category was chosen.",
          "red_flags_detected": ["List of any red flags found in ${language}, or empty array"],
          "disclaimer": "Disclaimer in ${language} stating this is an AI-based assessment and NOT a medical diagnosis. Please consult a doctor."
        }
      `;

            const response = await fetch(`${GEMINI_API_URL}?key=${env.GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return new Response(JSON.stringify({ error: (errorData as any).error?.message || 'Gemini API error' }), {
                    status: response.status,
                    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
                });
            }

            const data = await response.json();
            const textResponse = (data as any).candidates?.[0]?.content?.parts?.[0]?.text;

            if (!textResponse) {
                return new Response(JSON.stringify({ error: 'Invalid response from Gemini' }), {
                    status: 500,
                    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
                });
            }

            const jsonString = textResponse.replace(/```json\n?|\n?```/g, '').trim();
            const result = JSON.parse(jsonString);

            return new Response(JSON.stringify(result), {
                headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
            });
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Internal server error' }), {
                status: 500,
                headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
            });
        }
    },
};
