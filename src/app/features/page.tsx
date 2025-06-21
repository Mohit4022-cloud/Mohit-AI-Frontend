import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Features - Mohit AI',
  description: 'Mohit AI - Your AI SDR That Never Sleeps',
}

export default function FeaturesPage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: `&lt;nav className="fixed w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-50"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="flex justify-between h-20"&gt;
                &lt;div className="flex items-center"&gt;
                    &lt;a href="/" className="text-2xl font-bold text-white"&gt;Mohit AI&lt;/a&gt;
                &lt;/div&gt;
                &lt;div className="hidden md:flex items-center space-x-8"&gt;
                    &lt;a href="/features" className="text-white font-semibold transition-colors"&gt;Features&lt;/a&gt;
                    &lt;a href="/pricing" className="text-gray-300 hover:text-white transition-colors"&gt;Pricing&lt;/a&gt;
                    &lt;div className="relative group"&gt;
                        &lt;button className="text-gray-300 hover:text-white transition-colors flex items-center"&gt;
                            Solutions
                            &lt;svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"&gt;
                                &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"  /&gt;
                            &lt;/svg&gt;
                        &lt;/button&gt;
                        &lt;div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg hover:shadow-primary/20 bg-gray-900 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"&gt;
                            &lt;div className="py-1"&gt;
                                &lt;a href="/for-sdrs" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-100"&gt;For SDRs&lt;/a&gt;
                                &lt;a href="/for-managers" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-100"&gt;For Managers&lt;/a&gt;
                                &lt;a href="/enterprise" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-100"&gt;Enterprise&lt;/a&gt;
                                &lt;a href="/small-business" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-100"&gt;Small Business&lt;/a&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;a href="/security" className="text-gray-300 hover:text-white transition-colors"&gt;Security&lt;/a&gt;
                    &lt;a href="/dashboard" className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/50 transform hover:scale-105 transition-all duration-200"&gt;
                        Login
                    &lt;/a&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/nav&gt;

    
    &lt;section className="pt-32 pb-20 bg-gray-900"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="text-center max-w-3xl mx-auto mb-16"&gt;
                &lt;h1 className="text-4xl font-bold text-white mb-6"&gt;Powerful Features for Modern Sales Teams&lt;/h1&gt;
                &lt;p className="text-xl text-gray-300"&gt;Everything you need to identify, engage, and close deals faster&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gray-800"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-2 gap-12"&gt;
                
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-6"&gt;Real-Time Prospect Monitoring&lt;/h3&gt;
                    &lt;p className="text-gray-300 mb-6"&gt;Never miss a buying signal again. Mohit AI monitors your prospects across multiple channels and alerts you instantly when they:&lt;/p&gt;
                    &lt;ul className="space-y-4 text-gray-300"&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Visit your website or pricing page
                        &lt;/li&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Engage with your content or emails
                        &lt;/li&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Mention your company on social media
                        &lt;/li&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Experience leadership changes or funding events
                        &lt;/li&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Show increased product usage or engagement
                        &lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;

                
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-6"&gt;AI-Powered Lead Scoring&lt;/h3&gt;
                    &lt;p className="text-gray-300 mb-6"&gt;Our machine learning algorithms analyze hundreds of data points to score and prioritize your leads:&lt;/p&gt;
                    &lt;ul className="space-y-4 text-gray-300"&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Behavioral scoring based on engagement patterns
                        &lt;/li&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Firmographic fit analysis
                        &lt;/li&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Intent data from first and third-party sources
                        &lt;/li&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Predictive modeling for conversion likelihood
                        &lt;/li&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Dynamic scoring that updates in real-time
                        &lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;

                
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-6"&gt;Intelligent Email Automation&lt;/h3&gt;
                    &lt;p className="text-gray-300 mb-6"&gt;Engage prospects at scale without losing the personal touch:&lt;/p&gt;
                    &lt;ul className="space-y-4 text-gray-300"&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            AI-generated personalized email content
                        &lt;/li&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Optimal send time prediction
                        &lt;/li&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Multi-touch campaign automation
                        &lt;/li&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            A/B testing and optimization
                        &lt;/li&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Response detection and routing
                        &lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;

                
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-6"&gt;Advanced Analytics &amp; Reporting&lt;/h3&gt;
                    &lt;p className="text-gray-300 mb-6"&gt;Make data-driven decisions with comprehensive insights:&lt;/p&gt;
                    &lt;ul className="space-y-4 text-gray-300"&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Pipeline velocity and conversion metrics
                        &lt;/li&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Team and individual performance dashboards
                        &lt;/li&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Revenue forecasting and predictions
                        &lt;/li&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Campaign ROI analysis
                        &lt;/li&gt;
                        &lt;li className="flex items-center"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Custom reports and data exports
                        &lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gray-900"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;h2 className="text-3xl font-bold text-white text-center mb-16"&gt;More Features to Accelerate Your Sales&lt;/h2&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-3 gap-8"&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-xl font-bold text-white mb-4"&gt;Mobile App&lt;/h3&gt;
                    &lt;p className="text-gray-300"&gt;Access Mohit AI on the go with our iOS and Android apps&lt;/p&gt;
                &lt;/div&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-xl font-bold text-white mb-4"&gt;Chrome Extension&lt;/h3&gt;
                    &lt;p className="text-gray-300"&gt;Get insights directly in LinkedIn, Gmail, and your CRM&lt;/p&gt;
                &lt;/div&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-xl font-bold text-white mb-4"&gt;Data Enrichment&lt;/h3&gt;
                    &lt;p className="text-gray-300"&gt;Automatically enrich leads with accurate contact and company data&lt;/p&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gradient-to-r from-primary to-accent text-white"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"&gt;
            &lt;h2 className="text-4xl font-bold mb-6"&gt;Ready to Transform Your Sales Process?&lt;/h2&gt;
            &lt;p className="text-xl text-gray-300 mb-12"&gt;See how Mohit AI's features can revolutionize your sales team's performance&lt;/p&gt;
            &lt;div className="flex flex-col sm:flex-row justify-center gap-4"&gt;
                &lt;a href="/dashboard" className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-200"&gt;
                    Login to Dashboard
                &lt;/a&gt;
                &lt;a href="#" className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"&gt;
                    Schedule a Demo
                &lt;/a&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;footer className="bg-gray-700 border-t border-gray-800"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"&gt;
            &lt;div className="grid grid-cols-2 md:grid-cols-4 gap-8"&gt;
                &lt;div&gt;
                    &lt;h4 className="text-white font-semibold mb-4"&gt;Product&lt;/h4&gt;
                    &lt;ul className="space-y-3"&gt;
                        &lt;li&gt;&lt;a href="/features" className="text-gray-300 hover:text-white transition-colors"&gt;Features&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="/pricing" className="text-gray-300 hover:text-white transition-colors"&gt;Pricing&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-300 hover:text-white transition-colors"&gt;Integrations&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-300 hover:text-white transition-colors"&gt;API&lt;/a&gt;&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;
                &lt;div&gt;
                    &lt;h4 className="text-white font-semibold mb-4"&gt;Solutions&lt;/h4&gt;
                    &lt;ul className="space-y-3"&gt;
                        &lt;li&gt;&lt;a href="/for-sdrs" className="text-gray-300 hover:text-white transition-colors"&gt;For SDRs&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="/for-managers" className="text-gray-300 hover:text-white transition-colors"&gt;For Managers&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="/enterprise" className="text-gray-300 hover:text-white transition-colors"&gt;Enterprise&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="/small-business" className="text-gray-300 hover:text-white transition-colors"&gt;Small Business&lt;/a&gt;&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;
                &lt;div&gt;
                    &lt;h4 className="text-white font-semibold mb-4"&gt;Company&lt;/h4&gt;
                    &lt;ul className="space-y-3"&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-300 hover:text-white transition-colors"&gt;About&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-300 hover:text-white transition-colors"&gt;Blog&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-300 hover:text-white transition-colors"&gt;Careers&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-300 hover:text-white transition-colors"&gt;Contact&lt;/a&gt;&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;
                &lt;div&gt;
                    &lt;h4 className="text-white font-semibold mb-4"&gt;Resources&lt;/h4&gt;
                    &lt;ul className="space-y-3"&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-300 hover:text-white transition-colors"&gt;Documentation&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-300 hover:text-white transition-colors"&gt;Support&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="/security" className="text-gray-300 hover:text-white transition-colors"&gt;Security&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-300 hover:text-white transition-colors"&gt;Privacy Policy&lt;/a&gt;&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;div className="mt-16 pt-8 border-t border-gray-800"&gt;
                &lt;p className="text-gray-300 text-center"&gt;&amp;copy; 2024 Mohit AI. All rights reserved.&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/footer&gt;` }} />
    </>
  )
}
