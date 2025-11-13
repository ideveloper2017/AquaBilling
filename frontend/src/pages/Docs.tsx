import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

const docSections = [
  {
    title: "Getting Started",
    description: "Learn the basics of StackBlitz and set up your first project.",
    links: ["Quick Start Guide", "Creating a New Project", "StackBlitz UI Overview"]
  },
  {
    title: "Core Concepts",
    description: "Understand the fundamental concepts behind StackBlitz.",
    links: ["WebContainers", "Project Structure", "Dependency Management"]
  },
  {
    title: "Features",
    description: "Explore the powerful features that StackBlitz offers.",
    links: ["Real-time Collaboration", "GitHub Integration", "Deployment Options"]
  },
  {
    title: "Integrations",
    description: "Learn how to integrate StackBlitz with other tools and services.",
    links: ["VS Code Extension", "Embedding Projects", "API Reference"]
  }
]

const Docs: React.FC = () => {
  return (
    <div className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <h1 className="mb-12 text-4xl font-bold text-center">Documentation</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {docSections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-primary hover:underline">{link}</a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Docs
