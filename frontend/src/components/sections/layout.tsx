import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export function LayoutSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Layout</h2>
        <p className="text-muted-foreground mt-2">
          Components for organizing page structure
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cards</CardTitle>
          <CardDescription>Flexible container component</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">This is the card content area.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Another Card</CardTitle>
              <CardDescription>With different content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Cards can contain any type of content.</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scroll Area</CardTitle>
          <CardDescription>Scrollable content container</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-72 w-full rounded-md border p-4">
            <div className="space-y-2">
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={i}>
                  <div className="text-sm">
                    Item {i + 1}
                  </div>
                  {i < 49 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Aspect Ratio</CardTitle>
          <CardDescription>Maintain image aspect ratio</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium mb-2">16:9 Ratio</p>
            <AspectRatio ratio={16 / 9}>
              <img
                src="https://images.pexels.com/photos/1420440/pexels-photo-1420440.jpeg?w=800"
                alt="Landscape"
                className="rounded-md object-cover w-full h-full"
              />
            </AspectRatio>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">1:1 Ratio</p>
            <AspectRatio ratio={1}>
              <img
                src="https://images.pexels.com/photos/1144687/pexels-photo-1144687.jpeg?w=800"
                alt="Square"
                className="rounded-md object-cover w-full h-full"
              />
            </AspectRatio>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resizable Panels</CardTitle>
          <CardDescription>Drag to resize panels</CardDescription>
        </CardHeader>
        <CardContent>
          <ResizablePanelGroup direction="horizontal" className="min-h-[200px] rounded-lg border">
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Left Panel</span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Right Panel</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </CardContent>
      </Card>
    </div>
  );
}
