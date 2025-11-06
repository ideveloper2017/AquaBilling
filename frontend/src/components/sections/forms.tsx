import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

export function FormsSection() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Forms & Inputs</h2>
        <p className="text-muted-foreground mt-2">
          Form elements for collecting user input
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Input Fields</CardTitle>
          <CardDescription>Text input with labels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled">Disabled Input</Label>
            <Input id="disabled" disabled placeholder="Disabled input" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Textarea</CardTitle>
          <CardDescription>Multi-line text input</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea placeholder="Type your message here..." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Select</CardTitle>
          <CardDescription>Dropdown selection menu</CardDescription>
        </CardHeader>
        <CardContent>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="vue">Vue</SelectItem>
              <SelectItem value="angular">Angular</SelectItem>
              <SelectItem value="svelte">Svelte</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Checkboxes</CardTitle>
          <CardDescription>Multiple selection options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms1" />
            <Label htmlFor="terms1" className="text-sm font-normal">
              Accept terms and conditions
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms2" />
            <Label htmlFor="terms2" className="text-sm font-normal">
              Subscribe to newsletter
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms3" disabled />
            <Label htmlFor="terms3" className="text-sm font-normal">
              Disabled checkbox
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Radio Group</CardTitle>
          <CardDescription>Single selection from options</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Option Two</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-three" id="option-three" />
              <Label htmlFor="option-three">Option Three</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Switch</CardTitle>
          <CardDescription>Toggle switch for on/off states</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="notifications" defaultChecked />
            <Label htmlFor="notifications">Enable notifications</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Slider</CardTitle>
          <CardDescription>Range selection slider</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider defaultValue={[50]} max={100} step={1} />
          <Slider defaultValue={[25, 75]} max={100} step={1} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>Date picker calendar</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>
    </div>
  );
}
