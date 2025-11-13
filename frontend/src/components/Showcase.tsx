import React from 'react'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const Showcase: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">See StackBlitz in Action</h2>
        <Tabs defaultValue="react" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="react">React</TabsTrigger>
            <TabsTrigger value="angular">Angular</TabsTrigger>
            <TabsTrigger value="vue">Vue</TabsTrigger>
          </TabsList>
          <TabsContent value="react" className="mt-6">
            <div className="overflow-hidden rounded-lg border bg-background shadow-xl">
              <div className="flex items-center justify-between border-b bg-muted px-4 py-2">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-muted-foreground">react.stackblitz.com</span>
              </div>
              <div className="p-4">
                <pre className="text-sm"><code>{`import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <h1>Hello from StackBlitz!</h1>;
}

ReactDOM.render(<App />, document.getElementById('root'));`}</code></pre>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Button>Try React on StackBlitz</Button>
            </div>
          </TabsContent>
          <TabsContent value="angular" className="mt-6">
            {/* Similar structure for Angular */}
          </TabsContent>
          <TabsContent value="vue" className="mt-6">
            {/* Similar structure for Vue */}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default Showcase
