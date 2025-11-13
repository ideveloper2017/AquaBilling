import React from 'react'
import { Button } from './ui/button'

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container px-4 mx-auto text-center">
        <h2 className="mb-4 text-3xl font-bold">Ready to Supercharge Your Development?</h2>
        <p className="mb-8 text-lg">Join thousands of developers who are already using StackBlitz to build faster and smarter.</p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" variant="secondary">
            Sign Up for Free
          </Button>
          <Button size="lg" variant="outline">
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
