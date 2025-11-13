import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    company: "TechCorp",
    avatar: "SJ",
    content: "StackBlitz has revolutionized my workflow. I can prototype ideas and share them with my team in minutes. It's an indispensable tool for modern web development."
  },
  {
    name: "Michael Chen",
    role: "Full Stack Engineer",
    company: "StartupX",
    avatar: "MC",
    content: "The ability to instantly spin up a development environment and collaborate in real-time has been a game-changer for our remote team. StackBlitz is our go-to for rapid prototyping and pair programming."
  },
  {
    name: "Emily Rodriguez",
    role: "Open Source Contributor",
    company: "OpenDev Foundation",
    avatar: "ER",
    content: "StackBlitz has made contributing to open source projects so much easier. I can quickly reproduce issues and test fixes without setting up a local environment. It's fantastic!"
  }
]

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">What Developers Are Saying</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${testimonial.avatar}`} />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{testimonial.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
