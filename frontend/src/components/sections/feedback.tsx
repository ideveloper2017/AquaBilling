import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Terminal, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast as sonnerToast } from 'sonner';

export function FeedbackSection() {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Feedback</h2>
        <p className="text-muted-foreground mt-2">
          Components for user notifications and feedback
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
          <CardDescription>Static notification messages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the CLI.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Toast Notifications</CardTitle>
          <CardDescription>Temporary notification messages</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: "Notification",
                description: "This is a simple toast notification.",
              });
            }}
          >
            Show Toast
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: "Success",
                description: "Your changes have been saved successfully.",
              });
            }}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Success Toast
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong. Please try again.",
              });
            }}
          >
            <AlertCircle className="mr-2 h-4 w-4" />
            Error Toast
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sonner Toasts</CardTitle>
          <CardDescription>Alternative toast notifications with Sonner</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            onClick={() => sonnerToast.success('Success', {
              description: 'Your action was successful!',
            })}
          >
            Success
          </Button>

          <Button
            variant="outline"
            onClick={() => sonnerToast.error('Error', {
              description: 'Something went wrong!',
            })}
          >
            Error
          </Button>

          <Button
            variant="outline"
            onClick={() => sonnerToast.info('Info', {
              description: 'This is an informational message.',
            })}
          >
            Info
          </Button>

          <Button
            variant="outline"
            onClick={() => sonnerToast.warning('Warning', {
              description: 'Please be careful!',
            })}
          >
            Warning
          </Button>

          <Button
            variant="outline"
            onClick={() => sonnerToast.loading('Loading...', {
              description: 'Please wait while we process your request.',
            })}
          >
            Loading
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
