"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  Users,
  Zap,
  BarChart3,
  Calendar,
  Star,
  Trophy,
  DollarSign,
  Brain,
  Rocket,
  Shield,
  MessageSquare,
  Phone,
  Mail,
  Smartphone,
  Coffee,
  Timer,
  Award,
  ChevronRight,
  Briefcase,
  LineChart,
} from "lucide-react";
import { useState } from "react";

export default function ForSDRsPage() {
  const [selectedDay, setSelectedDay] = useState<"without" | "with">("without");
  const [roiInputs, setRoiInputs] = useState({
    monthlyQuota: 50,
    avgDealSize: 10000,
    currentConversion: 2,
  });

  const calculateROI = () => {
    const improvedConversion = roiInputs.currentConversion * 3.91; // 391% improvement
    const additionalDeals = (roiInputs.monthlyQuota * (improvedConversion - roiInputs.currentConversion) / 100);
    const additionalRevenue = additionalDeals * roiInputs.avgDealSize;
    const timeSaved = 32; // hours per week
    const earningsIncrease = ((improvedConversion / roiInputs.currentConversion) - 1) * 100;

    return {
      additionalDeals: Math.round(additionalDeals),
      additionalRevenue,
      timeSaved,
      earningsIncrease: Math.round(earningsIncrease),
    };
  };

  const roi = calculateROI();

  return (
    <>

      {/* Fixed Navigation */}
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
                  By Industry
                </Link>
                <Link href="/solutions/for-sdrs" className="navbar-dropdown-item">
                  For SDRs
                </Link>
                <Link href="/solutions/for-managers" className="navbar-dropdown-item">
                  For Managers
                </Link>
                <Link href="/solutions/enterprise" className="navbar-dropdown-item">
                  Enterprise
                </Link>
                <Link href="/solutions/small-business" className="navbar-dropdown-item">
                  Small Business
                </Link>
              </div>
            </div>

            <Link href="/resources" className="navbar-link">
              Resources
            </Link>
            <Link href="/security" className="navbar-link">
              Security
            </Link>
          </div>

          <div className="navbar-actions">
            <Link href="/dashboard" className="btn btn-outline">
              Check out the platform
            </Link>
            <Link href="/register" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main id="main">
        {/* Hero Section */}
        <section className="hero-section sdr-hero">
          <div className="hero-container">
            <div className="sdr-hero-content">
              <div className="section-badge">
                <Trophy className="w-4 h-4" />
                <span>For Top-Performing SDRs</span>
              </div>
              
              <h1 className="hero-heading">
                Finally, an AI assistant that makes<br />
                <span className="text-pink">SDRs more successful, not obsolete</span>
              </h1>
              
              <p className="hero-description">
                While others worry about AI replacing them, smart SDRs use Mohit AI to 
                3x their pipeline, hit quota faster, and accelerate their career growth. 
                Work smarter, not harder.
              </p>
              
              <div className="sdr-stats-preview">
                <div className="stat-preview">
                  <div className="stat-icon">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="stat-value">391%</div>
                    <div className="stat-label">Higher Conversion</div>
                  </div>
                </div>
                <div className="stat-preview">
                  <div className="stat-icon">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="stat-value">24/7</div>
                    <div className="stat-label">Lead Coverage</div>
                  </div>
                </div>
                <div className="stat-preview">
                  <div className="stat-icon">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="stat-value">3x</div>
                    <div className="stat-label">More Meetings</div>
                  </div>
                </div>
              </div>
              
              <div className="hero-buttons">
                <Link href="/register" className="btn btn-secondary">
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#roi-calculator" className="btn btn-outline">
                  <DollarSign className="w-5 h-5" />
                  <span>Calculate Your Earnings</span>
                </Link>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="sdr-hero-illustration">
              <div className="illustration-card floating">
                <div className="card-header">
                  <Trophy className="w-5 h-5 text-pink" />
                  <span>Top Performer</span>
                </div>
                <div className="achievement-badge">
                  <Award className="w-12 h-12 text-pink" />
                  <div>
                    <div className="achievement-label">Quota Attainment</div>
                    <div className="achievement-value">156%</div>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '156%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="pain-points-section">
          <div className="solutions-container">
            <div className="section-header">
              <h2 className="section-heading">
                Sound Familiar?<br />
                <span className="text-pink">We've Been There Too</span>
              </h2>
            </div>

            <div className="pain-points-grid">
              <div className="pain-point-card">
                <div className="pain-icon">
                  <Clock className="w-8 h-8" />
                </div>
                <h3>Missing Leads After Hours</h3>
                <p>
                  That hot lead that came in at 6:47 PM Friday? By Monday morning, 
                  they've already signed with your competitor.
                </p>
              </div>

              <div className="pain-point-card">
                <div className="pain-icon">
                  <Timer className="w-8 h-8" />
                </div>
                <h3>Drowning in Repetitive Tasks</h3>
                <p>
                  Spending 60% of your day on data entry, follow-ups, and admin work 
                  instead of actually selling.
                </p>
              </div>

              <div className="pain-point-card">
                <div className="pain-icon">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <h3>Inconsistent Pipeline</h3>
                <p>
                  One week you're crushing it, the next you're scrambling. The feast 
                  or famine cycle never ends.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Day in the Life Comparison */}
        <section className="day-comparison-section">
          <div className="solutions-container">
            <div className="section-header">
              <h2 className="section-heading">
                A Day in Your Life<br />
                <span className="text-pink">The Difference AI Makes</span>
              </h2>
            </div>

            <div className="day-selector">
              <button
                className={`day-tab ${selectedDay === "without" ? "active" : ""}`}
                onClick={() => setSelectedDay("without")}
              >
                <Coffee className="w-5 h-5" />
                Without Mohit AI
              </button>
              <button
                className={`day-tab ${selectedDay === "with" ? "active" : ""}`}
                onClick={() => setSelectedDay("with")}
              >
                <Rocket className="w-5 h-5" />
                With Mohit AI
              </button>
            </div>

            <div className="timeline-container">
              {selectedDay === "without" ? (
                <div className="timeline">
                  <div className="timeline-item stress">
                    <div className="timeline-time">8:00 AM</div>
                    <div className="timeline-content">
                      <h4>Morning Scramble</h4>
                      <p>Check CRM for overnight leads. 12 came in - 3 already went cold.</p>
                    </div>
                  </div>
                  <div className="timeline-item stress">
                    <div className="timeline-time">9:30 AM</div>
                    <div className="timeline-content">
                      <h4>Manual Outreach</h4>
                      <p>Copy-paste the same email template 50 times. Fingers crossed for responses.</p>
                    </div>
                  </div>
                  <div className="timeline-item stress">
                    <div className="timeline-time">11:00 AM</div>
                    <div className="timeline-content">
                      <h4>Data Entry Hell</h4>
                      <p>Update 30+ records in CRM. Miss a follow-up because you forgot to set a reminder.</p>
                    </div>
                  </div>
                  <div className="timeline-item stress">
                    <div className="timeline-time">2:00 PM</div>
                    <div className="timeline-content">
                      <h4>Cold Calling Blues</h4>
                      <p>47 dials, 2 conversations, 0 meetings. Your ears hurt from "not interested."</p>
                    </div>
                  </div>
                  <div className="timeline-item stress">
                    <div className="timeline-time">5:00 PM</div>
                    <div className="timeline-content">
                      <h4>Missed Opportunity</h4>
                      <p>Hot lead comes in. You're burnt out. "I'll get to it tomorrow."</p>
                    </div>
                  </div>
                  <div className="timeline-result negative">
                    <Trophy className="w-6 h-6" />
                    <div>
                      <strong>Daily Result:</strong> 2 meetings booked, 6 opportunities missed, stressed and exhausted
                    </div>
                  </div>
                </div>
              ) : (
                <div className="timeline">
                  <div className="timeline-item success">
                    <div className="timeline-time">8:00 AM</div>
                    <div className="timeline-content">
                      <h4>Perfect Start</h4>
                      <p>Check dashboard: AI handled 8 overnight leads, booked 3 meetings, all data synced.</p>
                    </div>
                  </div>
                  <div className="timeline-item success">
                    <div className="timeline-time">9:30 AM</div>
                    <div className="timeline-content">
                      <h4>High-Value Activities</h4>
                      <p>Focus on 5 qualified leads AI identified. Personalized outreach that actually works.</p>
                    </div>
                  </div>
                  <div className="timeline-item success">
                    <div className="timeline-time">11:00 AM</div>
                    <div className="timeline-content">
                      <h4>Strategic Selling</h4>
                      <p>Deep dive on key accounts. AI handles follow-ups and qualification in the background.</p>
                    </div>
                  </div>
                  <div className="timeline-item success">
                    <div className="timeline-time">2:00 PM</div>
                    <div className="timeline-content">
                      <h4>Relationship Building</h4>
                      <p>Coffee with a warm prospect. AI books 2 more meetings while you're out.</p>
                    </div>
                  </div>
                  <div className="timeline-item success">
                    <div className="timeline-time">5:00 PM</div>
                    <div className="timeline-content">
                      <h4>Ahead of Quota</h4>
                      <p>Review AI insights, plan tomorrow. Leave on time knowing leads are covered 24/7.</p>
                    </div>
                  </div>
                  <div className="timeline-result positive">
                    <Trophy className="w-6 h-6" />
                    <div>
                      <strong>Daily Result:</strong> 7 meetings booked, 0 opportunities missed, energized and crushing quota
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="success-metrics-section">
          <div className="solutions-container">
            <div className="section-header">
              <h2 className="section-heading">
                The Numbers Don't Lie<br />
                <span className="text-pink">SDRs Using Mohit AI Win</span>
              </h2>
            </div>

            <div className="metrics-showcase">
              <div className="metric-card">
                <div className="metric-icon">
                  <Trophy className="w-8 h-8" />
                </div>
                <div className="metric-value">156%</div>
                <div className="metric-label">Average Quota Attainment</div>
                <div className="metric-detail">vs 67% industry average</div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">
                  <Clock className="w-8 h-8" />
                </div>
                <div className="metric-value">32hrs</div>
                <div className="metric-label">Saved Per Week</div>
                <div className="metric-detail">More time for selling</div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">
                  <DollarSign className="w-8 h-8" />
                </div>
                <div className="metric-value">$18k</div>
                <div className="metric-label">Higher Annual Earnings</div>
                <div className="metric-detail">From commissions alone</div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">
                  <Rocket className="w-8 h-8" />
                </div>
                <div className="metric-value">8mo</div>
                <div className="metric-label">Faster Promotion</div>
                <div className="metric-detail">To AE or Team Lead</div>
              </div>
            </div>
          </div>
        </section>

        {/* How SDRs Use Mohit AI */}
        <section className="workflow-section">
          <div className="solutions-container">
            <div className="section-header">
              <h2 className="section-heading">
                How Top SDRs Use<br />
                <span className="text-pink">Mohit AI</span>
              </h2>
              <p className="section-description">
                Your AI assistant handles the grind while you focus on what humans do best - 
                building relationships and closing deals.
              </p>
            </div>

            <div className="workflow-grid">
              <div className="workflow-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <div className="step-icon">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3>Instant Lead Response</h3>
                  <p>AI responds to every inbound lead in 47 seconds, 24/7/365</p>
                  <ul className="step-features">
                    <li><CheckCircle className="w-4 h-4" /> Qualify based on your criteria</li>
                    <li><CheckCircle className="w-4 h-4" /> Book meetings automatically</li>
                    <li><CheckCircle className="w-4 h-4" /> Route hot leads to you instantly</li>
                  </ul>
                </div>
              </div>

              <div className="workflow-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <div className="step-icon">
                    <Brain className="w-6 h-6" />
                  </div>
                  <h3>Smart Qualification</h3>
                  <p>AI asks the right questions and gathers key intel</p>
                  <ul className="step-features">
                    <li><CheckCircle className="w-4 h-4" /> BANT qualification</li>
                    <li><CheckCircle className="w-4 h-4" /> Identify decision makers</li>
                    <li><CheckCircle className="w-4 h-4" /> Uncover pain points</li>
                  </ul>
                </div>
              </div>

              <div className="workflow-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <div className="step-icon">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3>Multi-Channel Outreach</h3>
                  <p>Engage prospects wherever they prefer to communicate</p>
                  <ul className="step-features">
                    <li><CheckCircle className="w-4 h-4" /> Phone, email, SMS, chat</li>
                    <li><CheckCircle className="w-4 h-4" /> Personalized messaging</li>
                    <li><CheckCircle className="w-4 h-4" /> Perfect timing</li>
                  </ul>
                </div>
              </div>

              <div className="workflow-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <div className="step-icon">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3>Automated Follow-Up</h3>
                  <p>Never drop the ball on a potential opportunity</p>
                  <ul className="step-features">
                    <li><CheckCircle className="w-4 h-4" /> Intelligent sequences</li>
                    <li><CheckCircle className="w-4 h-4" /> Perfect persistence</li>
                    <li><CheckCircle className="w-4 h-4" /> Re-engagement campaigns</li>
                  </ul>
                </div>
              </div>

              <div className="workflow-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <div className="step-icon">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h3>CRM Auto-Sync</h3>
                  <p>All data flows seamlessly into your systems</p>
                  <ul className="step-features">
                    <li><CheckCircle className="w-4 h-4" /> Real-time updates</li>
                    <li><CheckCircle className="w-4 h-4" /> Complete activity logs</li>
                    <li><CheckCircle className="w-4 h-4" /> Zero manual entry</li>
                  </ul>
                </div>
              </div>

              <div className="workflow-step">
                <div className="step-number">6</div>
                <div className="step-content">
                  <div className="step-icon">
                    <LineChart className="w-6 h-6" />
                  </div>
                  <h3>Performance Analytics</h3>
                  <p>Track your success and optimize your approach</p>
                  <ul className="step-features">
                    <li><CheckCircle className="w-4 h-4" /> Conversion metrics</li>
                    <li><CheckCircle className="w-4 h-4" /> Best practices insights</li>
                    <li><CheckCircle className="w-4 h-4" /> Commission tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials-section sdr-testimonials">
          <div className="solutions-container">
            <div className="section-header">
              <h2 className="section-heading">
                SDRs Love<br />
                <span className="text-pink">Mohit AI</span>
              </h2>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card featured">
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-pink fill-current" />
                  ))}
                </div>
                <p className="testimonial-quote">
                  "I went from struggling to hit 80% of quota to consistently hitting 
                  150%+. Mohit AI is like having a tireless assistant who never drops 
                  the ball. My manager asked what changed!"
                </p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <p className="author-name">Jessica Martinez</p>
                    <p className="author-role">Senior SDR at TechCorp</p>
                  </div>
                  <div className="author-metric">
                    <Trophy className="w-5 h-5 text-pink" />
                    <span>Top Performer</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-pink fill-current" />
                  ))}
                </div>
                <p className="testimonial-quote">
                  "No more staying late to hit call quotas. AI handles the volume 
                  while I focus on quality conversations. Got promoted to AE in 
                  just 8 months!"
                </p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <p className="author-name">Michael Chen</p>
                    <p className="author-role">Account Executive (Former SDR)</p>
                  </div>
                  <div className="author-metric">
                    <Rocket className="w-5 h-5 text-pink" />
                    <span>Fast Track</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-pink fill-current" />
                  ))}
                </div>
                <p className="testimonial-quote">
                  "My commission checks have literally doubled. The AI books meetings 
                  while I sleep. It's unfair how much of an advantage this gives me."
                </p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <p className="author-name">Ryan Thompson</p>
                    <p className="author-role">SDR at CloudScale</p>
                  </div>
                  <div className="author-metric">
                    <DollarSign className="w-5 h-5 text-pink" />
                    <span>2x Earnings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Career Growth Section */}
        <section className="career-growth-section">
          <div className="solutions-container">
            <div className="section-header">
              <h2 className="section-heading">
                Level Up Your Career<br />
                <span className="text-pink">Faster Than Ever</span>
              </h2>
              <p className="section-description">
                While others grind, you'll be learning from AI's successful conversations, 
                mastering advanced sales techniques, and fast-tracking to AE.
              </p>
            </div>

            <div className="growth-grid">
              <div className="growth-card">
                <div className="growth-icon">
                  <Brain className="w-8 h-8" />
                </div>
                <h3>Learn From AI</h3>
                <p>
                  Study successful AI conversations to improve your own pitch. 
                  See what messaging works and why.
                </p>
              </div>

              <div className="growth-card">
                <div className="growth-icon">
                  <Target className="w-8 h-8" />
                </div>
                <h3>Focus on Strategy</h3>
                <p>
                  With AI handling routine tasks, develop strategic thinking 
                  and account planning skills.
                </p>
              </div>

              <div className="growth-card">
                <div className="growth-icon">
                  <Users className="w-8 h-8" />
                </div>
                <h3>Build Relationships</h3>
                <p>
                  Spend time actually talking to prospects and building the 
                  relationships that close deals.
                </p>
              </div>

              <div className="growth-card">
                <div className="growth-icon">
                  <Rocket className="w-8 h-8" />
                </div>
                <h3>Get Promoted Faster</h3>
                <p>
                  SDRs using Mohit AI get promoted 8 months faster on average. 
                  Outstanding performance gets noticed.
                </p>
                <div className="promotion-timeline">
                  <div className="timeline-bar">
                    <div className="timeline-progress"></div>
                    <div className="timeline-marker" style={{ left: '33%' }}>
                      <span>8 months</span>
                      <label>With AI</label>
                    </div>
                    <div className="timeline-marker" style={{ left: '66%' }}>
                      <span>16 months</span>
                      <label>Industry Avg</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section id="roi-calculator" className="roi-calculator-section">
          <div className="solutions-container">
            <div className="roi-calculator-card">
              <div className="calculator-header">
                <h2 className="calculator-heading">
                  Calculate Your<br />
                  <span className="text-pink">Earnings Increase</span>
                </h2>
                <p className="calculator-description">
                  See how much more you could be earning with Mohit AI
                </p>
              </div>

              <div className="calculator-content">
                <div className="calculator-inputs">
                  <div className="input-group">
                    <label>Monthly Meeting Quota</label>
                    <input
                      type="number"
                      value={roiInputs.monthlyQuota}
                      onChange={(e) => setRoiInputs({
                        ...roiInputs,
                        monthlyQuota: parseInt(e.target.value) || 0
                      })}
                      className="roi-input"
                    />
                  </div>

                  <div className="input-group">
                    <label>Average Deal Size</label>
                    <div className="input-with-prefix">
                      <span>$</span>
                      <input
                        type="number"
                        value={roiInputs.avgDealSize}
                        onChange={(e) => setRoiInputs({
                          ...roiInputs,
                          avgDealSize: parseInt(e.target.value) || 0
                        })}
                        className="roi-input"
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Current Conversion Rate</label>
                    <div className="input-with-suffix">
                      <input
                        type="number"
                        value={roiInputs.currentConversion}
                        onChange={(e) => setRoiInputs({
                          ...roiInputs,
                          currentConversion: parseInt(e.target.value) || 0
                        })}
                        className="roi-input"
                      />
                      <span>%</span>
                    </div>
                  </div>
                </div>

                <div className="calculator-results">
                  <div className="result-card primary">
                    <DollarSign className="w-8 h-8 text-pink" />
                    <div>
                      <div className="result-value">
                        ${roi.additionalRevenue.toLocaleString()}
                      </div>
                      <div className="result-label">Additional Revenue/Month</div>
                    </div>
                  </div>

                  <div className="result-card">
                    <Trophy className="w-6 h-6 text-pink" />
                    <div>
                      <div className="result-value">+{roi.additionalDeals}</div>
                      <div className="result-label">More Deals/Month</div>
                    </div>
                  </div>

                  <div className="result-card">
                    <Clock className="w-6 h-6 text-pink" />
                    <div>
                      <div className="result-value">{roi.timeSaved}hrs</div>
                      <div className="result-label">Saved/Week</div>
                    </div>
                  </div>

                  <div className="result-card">
                    <TrendingUp className="w-6 h-6 text-pink" />
                    <div>
                      <div className="result-value">{roi.earningsIncrease}%</div>
                      <div className="result-label">Earnings Increase</div>
                    </div>
                  </div>
                </div>

                <div className="calculator-cta">
                  <Link href="/register" className="btn btn-secondary">
                    <span>Start Earning More Today</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section sdr-faq">
          <div className="faq-container">
            <div className="faq-header">
              <h2 className="faq-heading">
                Questions SDRs<br />
                <span className="text-pink">Actually Ask</span>
              </h2>
            </div>
            
            <div className="faq-grid">
              <div className="faq-item">
                <h3 className="faq-question">
                  <ChevronRight className="w-5 h-5" />
                  Will this make me lazy or hurt my skills?
                </h3>
                <p className="faq-answer">
                  Actually the opposite! By eliminating grunt work, you'll have more 
                  time to develop advanced skills like strategic account planning, 
                  relationship building, and complex deal navigation. Our most successful 
                  users get promoted faster because they level up quicker.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-question">
                  <ChevronRight className="w-5 h-5" />
                  How do I explain this to my manager?
                </h3>
                <p className="faq-answer">
                  Simple: "I found a tool that will help me book 3x more meetings and 
                  hit 150% of quota." Most managers are thrilled. We even have a 
                  manager presentation deck you can use. Many teams end up adopting 
                  Mohit AI company-wide after seeing one SDR's results.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-question">
                  <ChevronRight className="w-5 h-5" />
                  What if my company already has sales tools?
                </h3>
                <p className="faq-answer">
                  Mohit AI complements your existing stack. It integrates with Salesforce, 
                  HubSpot, Outreach, Salesloft, and 100+ other tools. Think of it as 
                  your personal assistant that makes all your other tools work better 
                  together.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-question">
                  <ChevronRight className="w-5 h-5" />
                  Can I really use this for just $75/month?
                </h3>
                <p className="faq-answer">
                  Yes! We believe every SDR should have access to AI, not just enterprise 
                  reps. For less than your monthly coffee budget, you get an AI assistant 
                  that works 24/7. Most users see ROI in the first week from just one 
                  extra meeting booked.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-question">
                  <ChevronRight className="w-5 h-5" />
                  How quickly will I see results?
                </h3>
                <p className="faq-answer">
                  Most SDRs book their first AI-assisted meeting within 48 hours. 
                  Within 30 days, you'll see 3x more meetings, 391% higher conversion 
                  rates, and significantly less stress. The best part? It gets better 
                  over time as the AI learns your style.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-question">
                  <ChevronRight className="w-5 h-5" />
                  Is the AI going to sound robotic?
                </h3>
                <p className="faq-answer">
                  Not at all! Mohit AI uses the most advanced conversational AI available. 
                  It adapts to each prospect's communication style, asks intelligent 
                  follow-up questions, and even handles objections naturally. Most 
                  prospects have no idea they're talking to AI.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section sdr-cta">
          <div className="stats-container">
            <div className="cta-container">
              <div className="cta-badge">
                <Rocket className="w-5 h-5" />
                <span>Limited Time: 30-Day Free Trial</span>
              </div>
              
              <div className="cta-content">
                <h2 className="cta-heading">
                  Ready to Crush Your Quota?
                </h2>
                <p className="cta-description">
                  Join thousands of top-performing SDRs who use Mohit AI to work 
                  smarter, earn more, and accelerate their careers. No credit card required.
                </p>
              </div>
              
              <div className="cta-buttons">
                <Link href="/register" className="btn">
                  <Sparkles className="w-5 h-5" />
                  Start Free Trial
                </Link>
                <Link href="/demo" className="btn">
                  Watch 5-Min Demo
                </Link>
              </div>
              
              <div className="cta-trust">
                <Shield className="w-5 h-5" />
                <span>No credit card • Cancel anytime • 5-minute setup</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        /* SDR Page Specific Styles */
        .sdr-hero {
          background: #FF6EC7;
          position: relative;
          overflow: hidden;
        }

        .sdr-hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 800px;
          height: 800px;
          background: #FF6EC7;
          animation: float 20s ease-in-out infinite;
        }

        .sdr-hero-content {
          max-width: 720px;
          animation: fadeInUp 0.8s ease-out;
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 110, 199, 0.1);
          border: 1px solid rgba(255, 110, 199, 0.2);
          border-radius: 100px;
          color: var(--accent-pink);
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .sdr-stats-preview {
          display: flex;
          gap: 32px;
          margin: 40px 0;
        }

        .stat-preview {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-preview .stat-icon {
          width: 48px;
          height: 48px;
          background: var(--accent-pink-subtle);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-pink);
        }

        .stat-preview .stat-value {
          font-size: 32px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }

        .stat-preview .stat-label {
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        /* Hero Illustration */
        .sdr-hero-illustration {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 440px;
        }

        .illustration-card {
          background: white;
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
        }

        .illustration-card.floating {
          animation: float 6s ease-in-out infinite;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .achievement-badge {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: var(--accent-pink-subtle);
          border-radius: 16px;
          margin-bottom: 24px;
        }

        .achievement-label {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .achievement-value {
          font-size: 36px;
          font-weight: 800;
          color: var(--accent-pink);
        }

        .progress-bar {
          height: 8px;
          background: #E5E7EB;
          border-radius: 100px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #FF6EC7;
          border-radius: 100px;
          max-width: 100%;
        }

        /* Pain Points Section */
        .pain-points-section {
          padding: 100px 0;
          background: white;
        }

        .pain-points-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 60px;
        }

        .pain-point-card {
          text-align: center;
          padding: 40px;
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          background: var(--background-secondary);
          transition: all 0.3s ease;
        }

        .pain-point-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          border-color: rgba(255, 110, 199, 0.2);
        }

        .pain-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          background: white;
          border: 2px solid var(--border-subtle);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
        }

        .pain-point-card h3 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .pain-point-card p {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Day Comparison */
        .day-comparison-section {
          padding: 100px 0;
          background: var(--background-secondary);
        }

        .day-selector {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin: 40px 0;
        }

        .day-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          background: white;
          border: 2px solid var(--border-subtle);
          border-radius: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .day-tab:hover {
          border-color: var(--accent-pink);
          color: var(--accent-pink);
        }

        .day-tab.active {
          background: #FF6EC7;
          border-color: transparent;
          color: white;
        }

        .timeline-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .timeline {
          position: relative;
          padding-left: 40px;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 8px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--border-subtle);
        }

        .timeline-item {
          position: relative;
          padding-bottom: 40px;
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: -32px;
          top: 8px;
          width: 16px;
          height: 16px;
          background: white;
          border: 3px solid var(--border-subtle);
          border-radius: 50%;
        }

        .timeline-item.stress::before {
          border-color: #EF4444;
          background: #FEE2E2;
        }

        .timeline-item.success::before {
          border-color: var(--accent-pink);
          background: var(--accent-pink-subtle);
        }

        .timeline-time {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .timeline-content h4 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .timeline-content p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .timeline-result {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          border-radius: 16px;
          margin-top: 20px;
        }

        .timeline-result.negative {
          background: #FEE2E2;
          color: #991B1B;
        }

        .timeline-result.positive {
          background: var(--accent-pink-subtle);
          color: var(--accent-pink);
        }

        /* Success Metrics */
        .success-metrics-section {
          padding: 100px 0;
          background: white;
        }

        .metrics-showcase {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          margin-top: 60px;
        }

        .metric-card {
          text-align: center;
          padding: 40px;
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          background: white;
          transition: all 0.3s ease;
        }

        .metric-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
        }


        .metric-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 24px;
          background: var(--accent-pink-subtle);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-pink);
        }

        .metric-value {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 8px;
          line-height: 1;
        }

        .metric-label {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .metric-detail {
          font-size: 14px;
          color: var(--text-secondary);
        }

        /* Workflow Section */
        .workflow-section {
          padding: 100px 0;
          background: var(--background-secondary);
        }

        .workflow-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 60px;
        }

        .workflow-step {
          position: relative;
        }

        .step-number {
          position: absolute;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          background: #FF6EC7;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          z-index: 2;
        }

        .step-content {
          background: white;
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          padding: 40px;
          padding-top: 60px;
          transition: all 0.3s ease;
        }

        .step-content:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          border-color: rgba(255, 110, 199, 0.2);
        }

        .step-icon {
          width: 48px;
          height: 48px;
          background: var(--accent-pink-subtle);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-pink);
          margin-bottom: 20px;
        }

        .step-content h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .step-content p {
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .step-features {
          list-style: none;
          padding: 0;
        }

        .step-features li {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 0;
          color: var(--text-secondary);
          font-size: 14px;
        }

        .step-features svg {
          color: var(--accent-pink);
        }

        /* Testimonials */
        .sdr-testimonials {
          background: white;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 60px;
        }

        .testimonial-card {
          background: var(--background-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          padding: 40px;
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          border-color: rgba(255, 110, 199, 0.2);
        }

        .testimonial-card.featured {
          background: white;
          border: 2px solid var(--accent-pink);
        }

        .testimonial-rating {
          display: flex;
          gap: 4px;
          margin-bottom: 20px;
        }

        .testimonial-quote {
          font-size: 18px;
          line-height: 1.6;
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .testimonial-author {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 24px;
          border-top: 1px solid var(--border-subtle);
        }

        .author-name {
          font-weight: 700;
          color: var(--text-primary);
        }

        .author-role {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .author-metric {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: var(--accent-pink-subtle);
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          color: var(--accent-pink);
        }

        /* Career Growth */
        .career-growth-section {
          padding: 100px 0;
          background: var(--background-secondary);
        }

        .growth-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          margin-top: 60px;
        }

        .growth-card {
          background: white;
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          padding: 40px;
          transition: all 0.3s ease;
        }

        .growth-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          border-color: rgba(255, 110, 199, 0.2);
        }

        .growth-card:last-child {
          grid-column: span 2;
        }

        .growth-icon {
          width: 64px;
          height: 64px;
          background: var(--accent-pink-subtle);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-pink);
          margin-bottom: 24px;
        }


        .growth-card h3 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .growth-card p {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .promotion-timeline {
          margin-top: 32px;
        }

        .timeline-bar {
          position: relative;
          height: 8px;
          background: var(--border-subtle);
          border-radius: 100px;
          margin: 80px 0 40px;
        }

        .timeline-progress {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 66%;
          background: var(--accent-pink);
          border-radius: 100px;
        }

        .timeline-marker {
          position: absolute;
          top: -60px;
          transform: translateX(-50%);
          text-align: center;
          background: white;
          padding: 12px 20px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 2px solid var(--border-subtle);
          min-width: 100px;
        }

        .timeline-marker:first-of-type {
          border-color: var(--accent-pink);
          background: var(--accent-pink-subtle);
        }

        .timeline-marker span {
          display: block;
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 4px;
          color: var(--text-primary);
        }

        .timeline-marker:first-of-type span {
          color: var(--accent-pink);
        }

        .timeline-marker label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* ROI Calculator */
        .roi-calculator-section {
          padding: 100px 0;
          background: white;
        }

        .roi-calculator-card {
          max-width: 1000px;
          margin: 0 auto;
          background: white;
          border: 1px solid var(--border-subtle);
          border-radius: 32px;
          padding: 60px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
        }

        .calculator-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .calculator-heading {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 16px;
          line-height: 1.2;
          color: var(--text-primary);
        }

        .calculator-description {
          font-size: 20px;
          color: var(--text-secondary);
        }

        .calculator-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 60px;
          align-items: start;
        }

        .calculator-inputs {
          background: var(--background-secondary);
          border-radius: 20px;
          padding: 32px;
        }

        .input-group {
          margin-bottom: 24px;
        }

        .input-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .roi-input {
          width: 100%;
          padding: 12px 16px;
          background: white;
          border: 2px solid var(--border-subtle);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 18px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .roi-input:focus {
          border-color: var(--accent-pink);
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 110, 199, 0.1);
        }

        .roi-input::placeholder {
          color: var(--text-secondary);
        }

        .input-with-prefix,
        .input-with-suffix {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .input-with-prefix span,
        .input-with-suffix span {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .calculator-results {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .result-card {
          background: var(--background-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.3s ease;
        }

        .result-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .result-card.primary {
          grid-column: span 2;
          border: 2px solid rgba(255, 110, 199, 0.2);
          background: var(--accent-pink-subtle);
        }

        .result-value {
          font-size: 32px;
          font-weight: 800;
          line-height: 1;
          color: var(--text-primary);
        }

        .result-label {
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .calculator-cta {
          grid-column: span 2;
          text-align: center;
          margin-top: 40px;
        }

        .calculator-cta .btn {
          background: var(--accent-pink);
          color: white;
        }

        .calculator-cta .btn:hover {
          background: var(--accent-pink-dark);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 110, 199, 0.3);
        }

        /* FAQ Section */
        .sdr-faq {
          background: var(--background-secondary);
        }

        .sdr-faq .faq-heading {
          font-size: 56px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 60px;
          text-align: center;
          background: #FF6EC7;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .sdr-faq .faq-heading .text-pink {
          background: #FF6EC7;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .sdr-faq .faq-item {
          background: white;
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 16px;
          transition: all 0.3s ease;
        }

        .sdr-faq .faq-item:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          border-color: rgba(255, 110, 199, 0.2);
        }

        .sdr-faq .faq-question {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .sdr-faq .faq-answer {
          color: var(--text-secondary);
          line-height: 1.6;
          padding-left: 32px;
        }

        /* CTA Section */
        .sdr-cta {
          background: #FF6EC7;
          padding: 120px 0;
          position: relative;
          overflow: hidden;
        }

        .sdr-cta::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: #FF6EC7;
          border-radius: 50%;
        }

        .sdr-cta .cta-container {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .sdr-cta .cta-heading {
          font-size: 72px;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 24px;
          background: #FF6EC7;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
        }

        .sdr-cta .cta-description {
          font-size: 20px;
          line-height: 1.6;
          color: #6B7280;
          max-width: 600px;
          margin: 0 auto 40px;
        }

        .sdr-cta .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 32px;
        }

        .sdr-cta .cta-buttons .btn {
          padding: 16px 32px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .sdr-cta .cta-buttons .btn:first-child {
          background: #FF6EC7;
          color: white;
          border: 2px solid #FF6EC7;
        }

        .sdr-cta .cta-buttons .btn:first-child:hover {
          background: #E94B9B;
          border-color: #E94B9B;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 110, 199, 0.3);
        }

        .sdr-cta .cta-buttons .btn:last-child {
          background: white;
          color: #1F2937;
          border: 2px solid #E5E7EB;
        }

        .sdr-cta .cta-buttons .btn:last-child:hover {
          border-color: #FF6EC7;
          color: #FF6EC7;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #FFF0FA;
          border: 2px solid #FF6EC7;
          border-radius: 100px;
          color: #FF6EC7;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 32px;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 110, 199, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(255, 110, 199, 0);
          }
        }

        .cta-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #6B7280;
          font-size: 14px;
          font-weight: 500;
        }

        .cta-trust svg {
          color: #10B981;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .sdr-hero-illustration {
            display: none;
          }

          .pain-points-grid,
          .metrics-showcase,
          .workflow-grid,
          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .growth-grid {
            grid-template-columns: 1fr;
          }

          .growth-card.featured {
            grid-column: span 1;
          }

          .calculator-content {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .sdr-stats-preview {
            flex-direction: column;
            gap: 16px;
          }

          .day-selector {
            flex-direction: column;
          }

          .day-tab {
            width: 100%;
            justify-content: center;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(1deg);
          }
          75% {
            transform: translateY(20px) rotate(-1deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}