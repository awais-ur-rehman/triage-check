import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { Activity } from 'lucide-react';

interface SymptomFormProps {
    onSubmit: (symptoms: string) => void;
    isLoading: boolean;
}

export function SymptomForm({ onSubmit, isLoading }: SymptomFormProps) {
    const [symptoms, setSymptoms] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(symptoms);
    };

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-lg border-t-4 border-t-blue-600">
            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-blue-100 rounded-full">
                        <Activity className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl">Symptom Checker</CardTitle>
                </div>
                <p className="text-gray-500">
                    Describe your symptoms in detail to get an AI-powered triage assessment.
                </p>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <Textarea
                        label="Describe your symptoms"
                        placeholder="E.g., I have a severe headache, sensitivity to light, and nausea..."
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        className="min-h-[150px] text-base"
                        required
                    />
                </CardContent>
                <CardFooter className="bg-gray-50 border-t border-gray-100 rounded-b-xl">
                    <Button
                        type="submit"
                        className="w-full text-lg py-6"
                        isLoading={isLoading}
                        disabled={!symptoms.trim()}
                    >
                        {isLoading ? 'Analyzing Symptoms...' : 'Analyze Symptoms'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
