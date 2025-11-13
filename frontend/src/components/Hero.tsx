import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 py-32 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-40">
      <div className="flex flex-col w-full mb-12 text-center">
        <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
          <br className="hidden lg:block" />
          Develop faster than ever before.
        </h1>
        <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-center text-gray-500">
          StackBlitz is an online IDE where you can create Angular & React
          projects that are immediately online & shareable via link in just one
          click.
        </p>
        <div className="flex items-center justify-center mt-10">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="px-8 py-3 text-lg font-medium">
                Get Started
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sign up</DialogTitle>
                <DialogDescription>
                  Create a new account to get started.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-3 mx-4 text-lg font-medium"
            onClick={() => navigate('/features')}
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
