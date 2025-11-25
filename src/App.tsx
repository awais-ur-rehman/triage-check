import { useTriage } from './hooks/useTriage';
import { SymptomForm } from './components/SymptomForm';
import { TriageResult } from './components/TriageResult';
import { Activity } from 'lucide-react';

function App() {
  const { result, loading, error, analyzeSymptoms, reset } = useTriage();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">TriageCheck</span>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            AI-Powered Assessment
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
          {error && (
            <div className="w-full max-w-2xl mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          {!result ? (
            <SymptomForm onSubmit={analyzeSymptoms} isLoading={loading} />
          ) : (
            <TriageResult result={result} onReset={reset} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} TriageCheck. For demonstration purposes only.</p>
          <p className="mt-1 text-xs text-gray-400">Not a substitute for professional medical advice.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
