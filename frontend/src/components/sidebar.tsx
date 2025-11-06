import {
  Home,
  Layers,
  Palette,
  Layout,
  Type,
  Box,
  Table,
  FileInput,
  MessageSquare,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'buttons', label: 'Buttons & Actions', icon: Layers },
  { id: 'forms', label: 'Forms & Inputs', icon: FileInput },
  { id: 'data', label: 'Data Display', icon: Table },
  { id: 'feedback', label: 'Feedback', icon: MessageSquare },
  { id: 'overlays', label: 'Overlays', icon: Box },
  { id: 'navigation', label: 'Navigation', icon: Layout },
  { id: 'typography', label: 'Typography', icon: Type },
  { id: 'layout', label: 'Layout', icon: Palette },
  { id: 'charts', label: 'Charts', icon: BarChart3 },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-64 border-r bg-background">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">Component Library</h2>
        <p className="text-sm text-muted-foreground">shadcn/ui Showcase</p>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="p-4 space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Button
                key={section.id}
                variant={activeSection === section.id ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  activeSection === section.id && 'bg-secondary'
                )}
                onClick={() => onSectionChange(section.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {section.label}
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
