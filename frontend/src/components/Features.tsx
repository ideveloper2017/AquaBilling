import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Zap, Globe, Lock, Cpu } from 'lucide-react'

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
  }
]

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">Why Choose StackBlitz?</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
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
    </section>
  )
}

export default Features
