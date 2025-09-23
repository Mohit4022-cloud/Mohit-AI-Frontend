"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  FileText,
  MessageSquare,
  Video,
  ArrowRight,
  BookOpen,
  Calendar,
  HelpCircle,
  Download,
  PlayCircle,
  Search,
  Users,
  Clock,
  TrendingUp,
  Calculator,
  FileCheck,
  BarChart3,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Star,
  Zap,
} from "lucide-react";
import "@/app/resources-page-styles.css";

// Resource types
type ResourceType = "all" | "blog" | "case-study" | "guide" | "template" | "webinar" | "report";

interface Resource {
  id: string;
  type: ResourceType;
  category: string;
  title: string;
  description: string;
  readTime?: string;
  date?: string;
  author?: string;
  featured?: boolean;
  downloadable?: boolean;
  link: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Mock resources data
const resources: Resource[] = [
  // Blog Posts
  {
    id: "1",
    type: "blog",
    category: "Blog",
    title: "The Science of Lead Response Time: Why Every Second Counts",
    description: "MIT research shows responding within 5 minutes increases conversion by 391%. Dive deep into the psychology of buyer urgency and learn how top sales teams are leveraging sub-60 second response times.",
    readTime: "7 min read",
    date: "Jul 5, 2025",
    author: "Sarah Chen",
    featured: true,
    link: "#",
    icon: FileText,
  },
  {
    id: "2",
    type: "blog",
    category: "Blog",
    title: "AI vs Human SDRs: The $2.4M Performance Study",
    description: "Analyzing 50,000+ sales calls across 100 companies. See how AI SDRs achieve 24/7 availability, perfect recall, and 3x faster qualification while reducing costs by 70%.",
    readTime: "5 min read",
    date: "Jul 3, 2025",
    author: "Mike Rodriguez",
    link: "#",
    icon: FileText,
  },
  {
    id: "3",
    type: "blog",
    category: "Blog",
    title: "Multi-Channel Lead Engagement: The 87% Success Formula",
    description: "Learn the exact sequence that increased qualified meetings by 87%. Discover how to orchestrate voice, email, SMS, and LinkedIn touches for maximum engagement.",
    readTime: "6 min read",
    date: "Jul 1, 2025",
    author: "Emma Wilson",
    link: "#",
    icon: FileText,
  },
  {
    id: "4",
    type: "blog",
    category: "Blog",
    title: "CRM Integration Deep Dive: Salesforce, HubSpot & Pipedrive",
    description: "Step-by-step guide to seamlessly integrate Mohit AI with your existing CRM. Includes automation recipes, field mapping, and workflow optimization tips.",
    readTime: "8 min read",
    date: "Jun 28, 2025",
    author: "Alex Kumar",
    link: "#",
    icon: FileText,
  },
  {
    id: "5",
    type: "blog",
    category: "Blog",
    title: "Voice AI That Sounds Human: The Technology Behind Natural Conversations",
    description: "Explore how our AI achieves human-like voice interactions with 0.8s response latency, natural speech patterns, and contextual understanding.",
    readTime: "6 min read",
    date: "Jun 25, 2025",
    author: "Dr. Rachel Park",
    link: "#",
    icon: FileText,
  },
  // Case Studies
  {
    id: "6",
    type: "case-study",
    category: "Case Study",
    title: "TechFlow: From 40% Missed Leads to 100% Capture in 30 Days",
    description: "How TechFlow eliminated missed leads and increased pipeline by 3x. They went from 18-hour average response time to 47 seconds, resulting in $2.4M additional pipeline.",
    readTime: "10 min read",
    featured: true,
    link: "#",
    icon: MessageSquare,
  },
  {
    id: "7",
    type: "case-study",
    category: "Case Study",
    title: "GrowthLab: $5,000/Month Savings While 3x-ing Qualified Leads",
    description: "Learn how GrowthLab replaced 3 full-time SDRs with Mohit AI, reducing costs by 70% while tripling their qualified lead volume through 24/7 coverage.",
    readTime: "8 min read",
    link: "#",
    icon: MessageSquare,
  },
  {
    id: "8",
    type: "case-study",
    category: "Case Study",
    title: "CloudFirst: 391% Increase in Demo Bookings",
    description: "CloudFirst's journey from manual lead routing to AI-powered instant response. See their exact playbook for scaling from 50 to 200 demos per month.",
    readTime: "12 min read",
    link: "#",
    icon: MessageSquare,
  },
  // Guides
  {
    id: "9",
    type: "guide",
    category: "Guide",
    title: "The Complete Guide to AI SDR Implementation",
    description: "Everything you need to launch AI SDRs successfully. From stakeholder buy-in to technical setup, training, and optimization. Includes 30-day rollout plan.",
    readTime: "15 min read",
    date: "Jun 20, 2025",
    link: "#",
    icon: BookOpen,
  },
  {
    id: "10",
    type: "guide",
    category: "Guide",
    title: "Lead Scoring & Qualification Mastery",
    description: "Build a predictive lead scoring model that increases sales efficiency by 40%. Includes BANT, MEDDIC, and custom qualification frameworks.",
    readTime: "10 min read",
    date: "Jun 15, 2025",
    link: "#",
    icon: BookOpen,
  },
  // Templates & Tools
  {
    id: "11",
    type: "template",
    category: "Tool",
    title: "Lead Response ROI Calculator",
    description: "Calculate your potential revenue gain from faster lead response. Input your lead volume, conversion rate, and ACV to see personalized projections.",
    downloadable: true,
    link: "#",
    icon: Calculator,
  },
  {
    id: "12",
    type: "template",
    category: "Template",
    title: "BANT Qualification Script Template",
    description: "Battle-tested conversation framework used by top performers. Includes objection handling, discovery questions, and next-step scripts.",
    downloadable: true,
    link: "#",
    icon: FileCheck,
  },
  {
    id: "13",
    type: "template",
    category: "Template",
    title: "Multi-Touch Cadence Builder",
    description: "Design the perfect 14-day outreach sequence. Includes email templates, call scripts, and SMS messages that convert at 3x industry average.",
    downloadable: true,
    link: "#",
    icon: FileCheck,
  },
  {
    id: "14",
    type: "template",
    category: "Template",
    title: "CRM Migration Checklist",
    description: "Comprehensive checklist for migrating to Mohit AI. Covers data cleaning, field mapping, workflow setup, and team training.",
    downloadable: true,
    link: "#",
    icon: FileCheck,
  },
  // Reports
  {
    id: "15",
    type: "report",
    category: "Report",
    title: "State of Inbound Lead Response 2025",
    description: "Industry-defining research on lead response trends. Analysis of 10M+ leads reveals optimal response times, channel preferences, and conversion benchmarks by industry.",
    readTime: "20 min read",
    featured: true,
    downloadable: true,
    link: "#",
    icon: BarChart3,
  },
  {
    id: "16",
    type: "report",
    category: "Report",
    title: "SMB Sales Technology Stack Report",
    description: "What tools are winning SMB sales teams using in 2025? Comprehensive analysis of tech stacks, integrations, and ROI across 500+ companies.",
    readTime: "18 min read",
    downloadable: true,
    link: "#",
    icon: BarChart3,
  },
  {
    id: "17",
    type: "report",
    category: "Report",
    title: "AI SDR Adoption Study: Early Movers Win Big",
    description: "Companies using AI SDRs see 3.5x higher growth rates. Explore adoption trends, implementation challenges, and success factors.",
    readTime: "15 min read",
    downloadable: true,
    link: "#",
    icon: BarChart3,
  },
  // Webinars
  {
    id: "18",
    type: "webinar",
    category: "Webinar",
    title: "Getting Started with Mohit AI: From Zero to Hero in 5 Minutes",
    description: "Live walkthrough of setting up your first AI SDR campaign. Learn best practices for voice training, lead routing, and CRM integration.",
    date: "Jul 25, 2025",
    link: "#",
    icon: Video,
  },
  {
    id: "19",
    type: "webinar",
    category: "Webinar",
    title: "Advanced AI Optimization: Double Your Conversion Rate",
    description: "Deep dive into conversation analytics, A/B testing scripts, and fine-tuning AI responses for maximum qualification rates.",
    date: "Jul 18, 2025",
    link: "#",
    icon: Video,
  },
  {
    id: "20",
    type: "webinar",
    category: "Webinar",
    title: "Building a 24/7 Sales Machine with AI",
    description: "Learn how top teams use AI SDRs for round-the-clock coverage. Includes timezone strategies, handoff protocols, and escalation workflows.",
    date: "On-demand",
    link: "#",
    icon: Video,
  },
];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ResourceType>("all");

  // Filter resources based on search and category
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === "all" || resource.type === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const featuredResources = resources.filter(r => r.featured);

  return (
    <>
      {/* Fixed Navigation - Consistent with product and pricing pages */}
      <nav className="navbar-fixed">
        <div className="navbar-container">
          <Link href="/" className="navbar-brand">
            Mohit AI
          </Link>

          <div className="navbar-menu">
            <Link href="/product" className="navbar-link">
              Product
            </Link>
            <Link href="/pricing" className="navbar-link">
              Pricing
            </Link>

            {/* Solutions Dropdown */}
            <div className="navbar-dropdown">
              <button className="navbar-dropdown-toggle">
                Solutions
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="navbar-dropdown-menu">
                <Link href="/solutions" className="navbar-dropdown-item">
                  Overview
                </Link>
                <Link href="/solutions/for-sdrs" className="navbar-dropdown-item">
                  For SDRs
                </Link>
                <Link href="/solutions/for-managers" className="navbar-dropdown-item">
                  For Sales Managers
                </Link>
                <Link href="/solutions/enterprise" className="navbar-dropdown-item">
                  Enterprise
                </Link>
                <Link href="/solutions/small-business" className="navbar-dropdown-item">
                  Small Business
                </Link>
              </div>
            </div>

            <Link href="/resources" className="navbar-link navbar-link-active">
              Resources
            </Link>
            <Link href="/security" className="navbar-link">
              Security
            </Link>
          </div>

          <div className="navbar-actions">
            <Link href="https://platform.mohit-ai.com" target="_blank" rel="noopener noreferrer" className="navbar-btn-secondary">
              Check out the platform
            </Link>
            <Link href="https://platform.mohit-ai.com" target="_blank" rel="noopener noreferrer" className="navbar-btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="resources-hero pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-pink-500" />
              <span className="text-sm font-semibold text-pink-500 uppercase tracking-wider">
                Resources Hub
              </span>
              <Sparkles className="w-5 h-5 text-pink-500" />
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Resources to Master
              </span>{" "}
              <span className="text-gray-900">
                Inbound Lead Response
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to convert more leads, faster. From best practices to industry insights.
              Join 500+ teams who trust our expertise.
            </p>
          </div>

          {/* Search Bar */}
          <div className="resource-search">
            <input
              type="text"
              placeholder="Search resources..."
              className="resource-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="resource-search-icon" />
          </div>

          {/* Filter Tags */}
          <div className="filter-tags">
            <button
              className={`filter-tag ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All Resources
            </button>
            <button
              className={`filter-tag ${activeFilter === "blog" ? "active" : ""}`}
              onClick={() => setActiveFilter("blog")}
            >
              Blog
            </button>
            <button
              className={`filter-tag ${activeFilter === "case-study" ? "active" : ""}`}
              onClick={() => setActiveFilter("case-study")}
            >
              Case Studies
            </button>
            <button
              className={`filter-tag ${activeFilter === "guide" ? "active" : ""}`}
              onClick={() => setActiveFilter("guide")}
            >
              Guides
            </button>
            <button
              className={`filter-tag ${activeFilter === "template" ? "active" : ""}`}
              onClick={() => setActiveFilter("template")}
            >
              Templates
            </button>
            <button
              className={`filter-tag ${activeFilter === "webinar" ? "active" : ""}`}
              onClick={() => setActiveFilter("webinar")}
            >
              Webinars
            </button>
            <button
              className={`filter-tag ${activeFilter === "report" ? "active" : ""}`}
              onClick={() => setActiveFilter("report")}
            >
              Reports
            </button>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="featured-section py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="featured-badge">
              <Star className="w-4 h-4" />
              Featured Resources
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mt-4">
              Start with Our Most Popular Resources
            </h2>
          </div>

          <div className="resource-grid">
            {featuredResources.map((resource) => (
              <div key={resource.id} className="resource-card">
                <div className="resource-icon-wrapper">
                  <resource.icon className="resource-icon" />
                </div>
                <div className="resource-category">{resource.category}</div>
                <h3 className="resource-title">{resource.title}</h3>
                <p className="resource-description">{resource.description}</p>
                <div className="resource-meta">
                  {resource.readTime && (
                    <div className="resource-meta-item">
                      <Clock className="w-4 h-4" />
                      <span>{resource.readTime}</span>
                    </div>
                  )}
                  {resource.date && (
                    <div className="resource-meta-item">
                      <Calendar className="w-4 h-4" />
                      <span>{resource.date}</span>
                    </div>
                  )}
                  {resource.downloadable && (
                    <div className="resource-meta-item">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </div>
                  )}
                </div>
                <Link href={resource.link} className="resource-link">
                  {resource.type === "webinar" ? "Register Now" : "Read More"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {activeFilter === "all" ? "All Resources" : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Resources`}
          </h2>
          
          <div className="resource-grid">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <div key={resource.id} className="resource-card">
                  <div className="resource-icon-wrapper">
                    <resource.icon className="resource-icon" />
                  </div>
                  <div className="resource-category">{resource.category}</div>
                  <h3 className="resource-title">{resource.title}</h3>
                  <p className="resource-description">{resource.description}</p>
                  <div className="resource-meta">
                    {resource.readTime && (
                      <div className="resource-meta-item">
                        <Clock className="w-4 h-4" />
                        <span>{resource.readTime}</span>
                      </div>
                    )}
                    {resource.date && (
                      <div className="resource-meta-item">
                        <Calendar className="w-4 h-4" />
                        <span>{resource.date}</span>
                      </div>
                    )}
                    {resource.downloadable && (
                      <div className="resource-meta-item">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </div>
                    )}
                  </div>
                  <Link href={resource.link} className="resource-link">
                    {resource.type === "webinar" ? "Register Now" : 
                     resource.downloadable ? "Download Now" : "Read More"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No resources found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Interactive Tools & Calculators
            </h2>
            <p className="text-xl text-gray-600">
              Get instant insights with our suite of interactive tools
            </p>
          </div>

          <div className="tools-grid">
            <div className="tool-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">ROI Calculator</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Calculate your potential ROI from faster lead response times
              </p>
              <a href="#" className="resource-cta">
                Calculate ROI
                <Zap className="w-4 h-4" />
              </a>
            </div>

            <div className="tool-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Response Time Analyzer</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Benchmark your current lead response performance
              </p>
              <a href="#" className="resource-cta">
                Analyze Performance
                <Zap className="w-4 h-4" />
              </a>
            </div>

            <div className="tool-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Team Size Calculator</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Find out how many SDRs you need based on lead volume
              </p>
              <a href="#" className="resource-cta">
                Calculate Team Size
                <Zap className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mohit AI University */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-pink-500" />
              <span className="text-lg font-semibold text-pink-500">Mohit AI University</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Master AI-Powered Sales Development
            </h2>
            <p className="text-xl text-gray-600">
              Free online courses to help you get the most out of Mohit AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl border border-pink-100">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Zap className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h3>
              <p className="text-gray-600 mb-6">
                Learn the basics of Mohit AI and set up your first campaign in under 5 minutes.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">4 lessons • 2 hours</span>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                  Start Course
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Techniques</h3>
              <p className="text-gray-600 mb-6">
                Master advanced features and optimization strategies for maximum conversion.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">6 lessons • 3 hours</span>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                  Start Course
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl border border-pink-100">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Star className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Sales Mastery</h3>
              <p className="text-gray-600 mb-6">
                Become an expert in AI-powered sales development and lead the industry.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">8 lessons • 4 hours</span>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                  Start Course
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            500+ teams trust our insights
          </h3>
          <div className="trust-logos">
            {/* Company logos - replace with actual logos */}
            <div className="text-gray-400 font-semibold">TechFlow</div>
            <div className="text-gray-400 font-semibold">GrowthLab</div>
            <div className="text-gray-400 font-semibold">CloudFirst</div>
            <div className="text-gray-400 font-semibold">ScaleUp</div>
            <div className="text-gray-400 font-semibold">InnovateCo</div>
            <div className="text-gray-400 font-semibold">DataDrive</div>
            <div className="text-gray-400 font-semibold">NextGen</div>
            <div className="text-gray-400 font-semibold">Velocity</div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section py-20 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Stay Updated
              </span>
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Get the Latest AI Sales Insights
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Join 10,000+ sales leaders receiving weekly insights on AI-powered lead conversion
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
              >
                Subscribe
              </Button>
            </form>
            <p className="text-sm text-white/60 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Never Miss Another Lead?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join hundreds of teams using Mohit AI to respond to every lead in under 60 seconds
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Book Demo
              <PlayCircle className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}