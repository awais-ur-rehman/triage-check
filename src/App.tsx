import { useTriage } from './hooks/useTriage';
import { SymptomForm } from './components/SymptomForm';
import { TriageResult } from './components/TriageResult';
import { LanguageProvider } from './context/LanguageContext';

function AppContent() {
  const { result, loading, error, analyzeSymptoms, reset } = useTriage();

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm">
            {error}
          </div>
        )}

        <SymptomForm onSubmit={analyzeSymptoms} isLoading={loading} />

        {result && <TriageResult result={result} onReset={reset} />}
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
