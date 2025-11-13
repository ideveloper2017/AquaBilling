import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'

const blogPosts = [
  {
    title: "Introducing WebContainers: Run Node.js in Your Browser",
    description: "Learn about our groundbreaking technology that allows you to run Node.js directly in your browser.",
    date: "May 15, 2023",
    author: "Jane Doe"
  },
  {
    title: "5 Tips for Efficient Collaborative Coding",
    description: "Discover best practices for working together on coding projects using StackBlitz's collaboration features.",
    date: "June 2, 2023",
    author: "John Smith"
  },
  {
    title: "StackBlitz vs Traditional IDEs: A Comparison",
    description: "We compare StackBlitz to traditional desktop IDEs and highlight the advantages of cloud-based development.",
    date: "June 20, 2023",
    author: "Alice Johnson"
  },
  {
    title: "Announcing StackBlitz Enterprise: Secure, Scalable Development",
    description: "Introducing our new enterprise-grade solution for large organizations and development teams.",
    date: "July 5, 2023",
    author: "Bob Williams"
  }
]

const Blog: React.FC = () => {
  return (
    <div className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <h1 className="mb-12 text-4xl font-bold text-center">StackBlitz Blog</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {blogPosts.map((post, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.date} | By {post.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{post.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog
