import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sidebar } from '@/components/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { OverviewSection } from '@/components/sections/overview';
import { ButtonsSection } from '@/components/sections/buttons';
import { FormsSection } from '@/components/sections/forms';
import { DataSection } from '@/components/sections/data';
import { FeedbackSection } from '@/components/sections/feedback';
import { OverlaysSection } from '@/components/sections/overlays';
import { NavigationSection } from '@/components/sections/navigation';
import { LayoutSection } from '@/components/sections/layout';
import { ChartsSection } from '@/components/sections/charts';

function App() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'buttons':
        return <ButtonsSection />;
      case 'forms':
        return <FormsSection />;
      case 'data':
        return <DataSection />;
      case 'feedback':
        return <FeedbackSection />;
      case 'overlays':
        return <OverlaysSection />;
      case 'navigation':
        return <NavigationSection />;
      case 'layout':
        return <LayoutSection />;
      case 'charts':
        return <ChartsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="flex h-screen bg-background">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="border-b">
            <div className="flex h-16 items-center px-6 justify-between">
              <div>
                <h1 className="text-xl font-bold">shadcn/ui Starter Kit</h1>
                <p className="text-sm text-muted-foreground">Complete component showcase</p>
              </div>
              <ThemeToggle />
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="container py-6">
              {renderSection()}
            </div>
          </main>
        </div>
      </div>

      <Toaster />
      <SonnerToaster />
    </ThemeProvider>
  );
}

export default App;
