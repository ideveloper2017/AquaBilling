import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Zap, Globe, Lock, Cpu, Cloud, Code, Share, Rocket } from 'lucide-react'

const features = [
  {
    title: "Instant Development",
    description: "Start coding immediately with our lightning-fast IDE. No setup required.",
    icon: Zap
  },
  {
    title: "Collaborate Anywhere",
    description: "Share your projects with a single link and code together in real-time.",
    icon: Globe
  },
  {
    title: "Secure by Default",
    description: "Your code is always private and secure. We never store it on our servers.",
    icon: Lock
  },
  {
    title: "Powerful Integrations",
    description: "Seamlessly integrate with GitHub, NPM, and other popular developer tools.",
    icon: Cpu
  },
  {
    title: "Cloud-Powered",
    description: "Leverage the power of the cloud for faster builds and deployments.",
    icon: Cloud
  },
  {
    title: "Multi-Language Support",
    description: "Work with a wide range of programming languages and frameworks.",
    icon: Code
  },
  {
    title: "Easy Sharing",
    description: "Share your work with a single click, perfect for demos and tutorials.",
    icon: Share
  },
  {
    title: "Rapid Prototyping",
    description: "Turn your ideas into working prototypes in record time.",
    icon: Rocket
  }
]

const Features: React.FC = () => {
  return (
    <div className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <h1 className="mb-12 text-4xl font-bold text-center">StackBlitz Features</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-10 h-10 mb-4 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
