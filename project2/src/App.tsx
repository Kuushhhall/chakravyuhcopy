import { ErrorBoundary } from 'react-error-boundary';
import AITutorPage from './pages/AITutorPage';

function ErrorFallback({error}: {error: Error}) {
  return (
    <div className="bg-red-500 p-8 text-white text-2xl">
      Error: {error.message}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen">
        <AITutorPage />
      </div>
    </ErrorBoundary>
  );
}

export default App;
