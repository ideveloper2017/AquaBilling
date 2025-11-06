import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Palette, Zap, Shield } from 'lucide-react';

export function OverviewSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">shadcn/ui Component Library</h1>
        <p className="text-lg text-muted-foreground mt-2">
          A comprehensive collection of beautifully designed, accessible components built with Radix UI and Tailwind CSS.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <Sparkles className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>45+ Components</CardTitle>
            <CardDescription>
              Production-ready UI components for your projects
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Palette className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Dark Mode</CardTitle>
            <CardDescription>
              Full dark mode support with system preference detection
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Fully Responsive</CardTitle>
            <CardDescription>
              Works seamlessly across all device sizes
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Accessible</CardTitle>
            <CardDescription>
              Built with accessibility best practices in mind
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Components</CardTitle>
          <CardDescription>All components are ready to use in your application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              'Accordion', 'Alert', 'Alert Dialog', 'Avatar', 'Badge', 'Button',
              'Calendar', 'Card', 'Carousel', 'Chart', 'Checkbox', 'Collapsible',
              'Command', 'Context Menu', 'Dialog', 'Drawer', 'Dropdown Menu', 'Form',
              'Hover Card', 'Input', 'Input OTP', 'Label', 'Menubar', 'Navigation Menu',
              'Pagination', 'Popover', 'Progress', 'Radio Group', 'Resizable', 'Scroll Area',
              'Select', 'Separator', 'Sheet', 'Skeleton', 'Slider', 'Sonner', 'Switch',
              'Table', 'Tabs', 'Textarea', 'Toast', 'Toggle', 'Tooltip'
            ].map((component) => (
              <Badge key={component} variant="secondary">{component}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>Start using components in your project</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">1. Import Components</h3>
            <code className="bg-muted px-2 py-1 rounded text-sm">
              import &#123; Button &#125; from '@/components/ui/button'
            </code>
          </div>
          <div>
            <h3 className="font-semibold mb-2">2. Use in Your App</h3>
            <code className="bg-muted px-2 py-1 rounded text-sm">
              &lt;Button variant="default"&gt;Click me&lt;/Button&gt;
            </code>
          </div>
          <div>
            <h3 className="font-semibold mb-2">3. Customize with Tailwind</h3>
            <code className="bg-muted px-2 py-1 rounded text-sm">
              &lt;Button className="w-full"&gt;Full width&lt;/Button&gt;
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
