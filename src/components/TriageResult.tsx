import React from 'react';
import type { TriageResponse } from '../types/triage';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { AlertTriangle, Home, Hospital, Stethoscope, Info } from 'lucide-react';
import { cn } from '../utils/cn';

interface TriageResultProps {
    result: TriageResponse;
    onReset: () => void;
}

export function TriageResult({ result, onReset }: TriageResultProps) {
    const { triage, explanation, red_flags_detected, disclaimer } = result;

    const getCategoryStyles = (category: string) => {
        switch (category) {
            case 'Emergency':
                return {
                    color: 'text-red-700',
                    bg: 'bg-red-50',
                    border: 'border-red-200',
                    icon: <AlertTriangle className="w-12 h-12 text-red-600" />,
                    badge: 'destructive' as const,
                };
            case 'OPD':
                return {
                    color: 'text-yellow-700',
                    bg: 'bg-yellow-50',
                    border: 'border-yellow-200',
                    icon: <Hospital className="w-12 h-12 text-yellow-600" />,
                    badge: 'warning' as const,
                };
            case 'Home Care':
                return {
                    color: 'text-green-700',
                    bg: 'bg-green-50',
                    border: 'border-green-200',
                    icon: <Home className="w-12 h-12 text-green-600" />,
                    badge: 'success' as const,
                };
            default:
                return {
                    color: 'text-gray-700',
                    bg: 'bg-gray-50',
                    border: 'border-gray-200',
                    icon: <Stethoscope className="w-12 h-12 text-gray-600" />,
                    badge: 'default' as const,
                };
        }
    };

    const styles = getCategoryStyles(triage);

    return (
        <div className="space-y-6 w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className={cn('border-2 shadow-lg overflow-hidden', styles.border)}>
                <div className={cn('p-6 flex flex-col items-center text-center space-y-4', styles.bg)}>
                    <div className="p-4 bg-white rounded-full shadow-sm">{styles.icon}</div>
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">Recommended Action</h2>
                        <h1 className={cn('text-4xl font-bold', styles.color)}>{triage}</h1>
                    </div>
                </div>

                <CardContent className="space-y-6 p-6">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Info className="w-5 h-5 text-blue-500" />
                            Analysis
                        </h3>
                        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                            {explanation}
                        </p>
                    </div>

                    {red_flags_detected && red_flags_detected.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-red-600 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5" />
                                Red Flags Detected
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {red_flags_detected.map((flag, index) => (
                                    <Badge key={index} variant="destructive" className="text-sm py-1 px-3">
                                        {flag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="border-t pt-4 mt-6">
                        <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 text-sm text-orange-800 flex gap-3 items-start">
                            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                            <p className="font-medium">{disclaimer}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="text-center">
                <button
                    onClick={onReset}
                    className="text-gray-500 hover:text-gray-900 underline underline-offset-4 text-sm font-medium transition-colors"
                >
                    Check another symptom
                </button>
            </div>
        </div>
    );
}
