import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Phone, Bot, BarChart3, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mohit AI - AI-Powered SDR Automation',
  description: 'Mohit AI - Your AI SDR That Never Sleeps',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Mohit AI Inbound SDR
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Never miss another inbound lead. Our AI-powered SDR responds instantly, qualifies leads, and books meetings 24/7.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6">
            <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Instant Response</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Respond to leads within seconds, 24/7
            </p>
          </div>
          <div className="text-center p-6">
            <Bot className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Intelligent conversations that qualify and convert
            </p>
          </div>
          <div className="text-center p-6">
            <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track performance and optimize your sales process
            </p>
          </div>
          <div className="text-center p-6">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Team Ready</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Seamless handoff to human reps when needed
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to scale your sales?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join companies using Mohit AI to convert more leads into customers
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
