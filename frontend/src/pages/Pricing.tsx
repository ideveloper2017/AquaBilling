import React from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Check } from 'lucide-react'

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals and small projects",
    features: [
      "Unlimited public projects",
      "Basic collaboration tools",
      "Community support"
    ]
  },
  {
    name: "Pro",
    price: "$19",
    description: "For professionals and teams",
    features: [
      "Everything in Free",
      "Unlimited private projects",
      "Advanced collaboration tools",
      "Priority support"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "Dedicated account manager",
      "24/7 phone support"
    ]
  }
]

const Pricing: React.FC = () => {
  return (
    <div className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <h1 className="mb-12 text-4xl font-bold text-center">Simple, Transparent Pricing</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card key={index} className={index === 1 ? "border-primary" : ""}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">{plan.price === "Custom" ? "Contact Sales" : "Get Started"}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pricing
