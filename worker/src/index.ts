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
            const { symptoms } = await request.json() as { symptoms: string };

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

        LANGUAGE SUPPORT:
        - You MUST detect the language of the user's input (English, Urdu, Punjabi, Pashto, or Sindhi).
        - You MUST respond in the SAME language as the user's input.
        - If the user writes in Urdu/Punjabi/Pashto/Sindhi, your explanation and disclaimer MUST be in that language.
        - The "triage" field should always be in English (Emergency, OPD, or Home Care).

        Safety Rules:
        - If ANY red-flag symptom is present (chest pain, shortness of breath, severe bleeding, unconsciousness, etc.), classify as "Emergency".
        - Do NOT provide a diagnosis.
        - Do NOT suggest specific medications.
        - ALWAYS include a disclaimer in the user's language.

        Analyze the following symptoms: "${symptoms}"

        Return the result strictly in the following JSON format:
        {
          "triage": "Emergency" | "OPD" | "Home Care",
          "explanation": "A short explanation in the USER'S LANGUAGE of why this category was chosen.",
          "red_flags_detected": ["List of any red flags found in USER'S LANGUAGE, or empty array"],
          "disclaimer": "Disclaimer in USER'S LANGUAGE stating this is an AI-based assessment and NOT a medical diagnosis. Please consult a doctor."
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

