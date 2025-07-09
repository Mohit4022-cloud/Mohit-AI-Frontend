import Link from "next/link";
import {
  Mail,
  Linkedin,
  Github,
  ArrowRight,
  Shield,
  Globe,
  ChevronDown,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              Mohit AI
            </Link>
            <p className="footer-tagline">
              Never miss another lead. AI-powered response platform that works
              across voice, chat, email, and SMS.
            </p>
            
            {/* Newsletter Signup */}
            <div className="footer-newsletter">
              <h4>Stay Updated</h4>
              <p>Get the latest updates on AI sales automation</p>
              <form className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-button">
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
          
          {/* Navigation Columns */}
          <div className="footer-nav">
            <div className="footer-column">
              <h4>Product</h4>
              <Link href="/product">Features</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/solutions">Solutions</Link>
              <Link href="/demo">Watch Demo</Link>
              <Link href="/roi-calculator">ROI Calculator</Link>
              <Link href="/integrations">Integrations</Link>
            </div>
            
            <div className="footer-column">
              <h4>Solutions</h4>
              <Link href="/solutions">By Industry</Link>
              <Link href="/solutions/for-sdrs">For SDRs</Link>
              <Link href="/solutions/for-managers">For Managers</Link>
              <Link href="/solutions/enterprise">Enterprise</Link>
              <Link href="/solutions/small-business">Small Business</Link>
              <Link href="/solutions/startups">Startups</Link>
            </div>
            
            <div className="footer-column">
              <h4>Resources</h4>
              <Link href="/docs">Documentation</Link>
              <Link href="/api">API Reference</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/case-studies">Case Studies</Link>
              <Link href="/webinars">Webinars</Link>
              <Link href="/guides">Guides</Link>
            </div>
            
            <div className="footer-column">
              <h4>Company</h4>
              <Link href="/about">About Us</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/press">Press</Link>
              <Link href="/partners">Partners</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/security">Security</Link>
            </div>
            
            <div className="footer-column">
              <h4>Support</h4>
              <Link href="/help">Help Center</Link>
              <Link href="/community">Community</Link>
              <Link href="/status">System Status</Link>
              <Link href="/changelog">Changelog</Link>
              <Link href="/contact-sales">Contact Sales</Link>
              <Link href="/support">Support Ticket</Link>
            </div>
          </div>
        </div>
        
        {/* Middle Section - Trust Badges */}
        <div className="footer-trust">
          <div className="trust-item">
            <Shield className="w-5 h-5" />
            <span>SOC 2 Type II Certified</span>
          </div>
          <div className="trust-item">
            <Shield className="w-5 h-5" />
            <span>GDPR Compliant</span>
          </div>
          <div className="trust-item">
            <Shield className="w-5 h-5" />
            <span>CCPA Compliant</span>
          </div>
          <div className="trust-item">
            <Shield className="w-5 h-5" />
            <span>HIPAA Compliant</span>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-legal">
            <Link href="/privacy">Privacy Policy</Link>
            <span className="footer-separator">•</span>
            <Link href="/terms">Terms of Service</Link>
            <span className="footer-separator">•</span>
            <Link href="/cookies">Cookie Policy</Link>
            <span className="footer-separator">•</span>
            <Link href="/acceptable-use">Acceptable Use</Link>
            <span className="footer-separator">•</span>
            <Link href="/sitemap">Sitemap</Link>
          </div>
          
          <div className="footer-copyright">
            <span>© 2025 Mohit AI. All rights reserved.</span>
          </div>
          
          {/* Social Links */}
          <div className="footer-social">
            <a
              href="https://www.linkedin.com/in/mtiwari11"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="social-link"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Mohit4022-cloud"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="social-link"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:mohittiwari4022@gmail.com"
              aria-label="Email"
              className="social-link"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        {/* Language/Region Selector */}
        <div className="footer-region">
          <button className="region-selector">
            <Globe className="w-4 h-4" />
            <span>English (US)</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}