import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Mohit AI</span>
          </Link>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center max-w-2xl">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          <div className="bg-secondary/20 rounded-lg p-12">
            <p className="text-xl text-muted-foreground mb-8">
              Learn more about Mohit AI and our mission to revolutionize inbound lead response. 
              Our story is coming soon!
            </p>
            <Link href="/">
              <Button size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}