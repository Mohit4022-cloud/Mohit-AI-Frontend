import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Phone, Mail, MessageSquare, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Mohit AI</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/features" className="hover:text-primary">Features</Link>
            <Link href="/pricing" className="hover:text-primary">Pricing</Link>
            <Link href="/about" className="hover:text-primary">About</Link>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Never Miss Another <span className="gradient-text">Inbound Lead</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Mohit AI responds to every inbound lead in under 5 minutes, qualifying them 24/7 
            so your sales team can focus on closing deals.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/register">
              <Button size="lg" className="group">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </Link>
          </div>
          
          {/* Key Metrics */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{"<"}1 min</div>
              <p className="text-muted-foreground">Average Response Time</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">391%</div>
              <p className="text-muted-foreground">Higher Conversion Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Always Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-secondary/20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Multi-Channel Response System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Phone className="h-8 w-8" />}
              title="Voice Calls"
              description="AI-powered voice conversations that sound natural and qualify leads effectively"
            />
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8" />}
              title="Live Chat"
              description="Instant website visitor engagement with intelligent chat responses"
            />
            <FeatureCard
              icon={<Mail className="h-8 w-8" />}
              title="Email"
              description="Personalized email responses that nurture leads automatically"
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8" />}
              title="SMS"
              description="Quick text responses for mobile-first lead engagement"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to 10x Your Lead Response?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of businesses that never miss an opportunity
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}