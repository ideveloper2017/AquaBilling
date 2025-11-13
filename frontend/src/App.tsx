import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/context/auth-context';
import { LoginForm } from '@/components/auth/LoginForm';

// A component to protect routes that require authentication
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Public routes that don't require authentication
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0 bg-white border-r">
        {/* Sidebar content will go here */}
        <div className="p-4">
          <h2 className="text-xl font-semibold">AquaBilling</h2>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-3 flex justify-between items-center">
            <h1 className="text-lg font-medium">Dashboard</h1>
            {/* User menu will go here */}
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard content will go here */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Welcome to AquaBilling</h2>
              <p>This is your dashboard. More content will be added here.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900">AquaBilling</h1>
                  <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
                </div>
                <LoginForm />
              </div>
            </div>
          </PublicRoute>
        }
      />
      
      {/* Protected routes */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      />
      
      {/* Default route */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* 404 route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="light" storageKey="aquabilling-theme">
        <AuthProvider>
          <AppContent />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
