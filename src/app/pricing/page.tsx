import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - Mohit AI',
  description: 'Mohit AI - Your AI SDR That Never Sleeps',
}

export default function PricingPage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: `&lt;nav className="fixed w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-50"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="flex justify-between h-20"&gt;
                &lt;div className="flex items-center"&gt;
                    &lt;a href="/" className="text-2xl font-bold text-white"&gt;Mohit AI&lt;/a&gt;
                &lt;/div&gt;
                &lt;div className="hidden md:flex items-center space-x-8"&gt;
                    &lt;a href="/product" className="text-gray-300 hover:text-white transition-colors"&gt;Product&lt;/a&gt;
                    &lt;a href="/pricing" className="text-white font-semibold transition-colors"&gt;Pricing&lt;/a&gt;
                    &lt;div className="relative group"&gt;
                        &lt;button className="text-gray-300 hover:text-white transition-colors flex items-center"&gt;
                            Solutions
                            &lt;svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"&gt;
                                &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"  /&gt;
                            &lt;/svg&gt;
                        &lt;/button&gt;
                        &lt;div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg hover:shadow-primary/20 bg-gray-900 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"&gt;
                            &lt;div className="py-1"&gt;
                                &lt;a href="/solutions" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-100"&gt;By Industry&lt;/a&gt;
                                &lt;a href="/for-sdrs" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-100"&gt;For SDRs&lt;/a&gt;
                                &lt;a href="/for-managers" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-100"&gt;For Managers&lt;/a&gt;
                                &lt;a href="/enterprise" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-100"&gt;Enterprise&lt;/a&gt;
                                &lt;a href="/small-business" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-100"&gt;Small Business&lt;/a&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;a href="/resources" className="text-gray-300 hover:text-white transition-colors"&gt;Resources&lt;/a&gt;
                    &lt;a href="/security" className="text-gray-300 hover:text-white transition-colors"&gt;Security&lt;/a&gt;
                    &lt;a href="/dashboard" className="inline-flex items-center px-6 py-2.5 border border-white text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/20 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-200"&gt;
                        Login
                    &lt;/a&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/nav&gt;

    
    &lt;section className="pt-32 pb-20 bg-gray-900"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"&gt;
            &lt;h1 className="text-5xl font-bold text-white mb-6"&gt;Simple, Transparent Pricing&lt;/h1&gt;
            &lt;p className="text-xl text-gray-300 mb-8"&gt;Choose the plan that fits your team's needs. All plans include a 14-day free trial.&lt;/p&gt;
            &lt;div className="flex justify-center gap-4 text-sm text-gray-300"&gt;
                &lt;div className="flex items-center gap-2"&gt;
                    &lt;span className="font-semibold"&gt;14-Day&lt;/span&gt; Free Trial
                &lt;/div&gt;
                &lt;div className="flex items-center gap-2"&gt;
                    &lt;span className="font-semibold"&gt;No&lt;/span&gt; Credit Card Required
                &lt;/div&gt;
                &lt;div className="flex items-center gap-2"&gt;
                    &lt;span className="font-semibold"&gt;Cancel&lt;/span&gt; Anytime
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gray-800"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-3 gap-8"&gt;
                
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;div className="text-center mb-8"&gt;
                        &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Starter&lt;/h3&gt;
                        &lt;div className="mb-4"&gt;
                            &lt;span className="text-4xl font-bold"&gt;$49&lt;/span&gt;
                            &lt;span className="text-gray-300"&gt;/user/month&lt;/span&gt;
                        &lt;/div&gt;
                        &lt;p className="text-gray-300"&gt;Perfect for small sales teams getting started with AI&lt;/p&gt;
                    &lt;/div&gt;
                    &lt;ul className="space-y-4 mb-8"&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Up to 1,000 monitored contacts
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Basic lead scoring
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Email tracking and automation
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            CRM integration (1 platform)
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Real-time alerts
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Basic analytics dashboard
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Email support
                        &lt;/li&gt;
                    &lt;/ul&gt;
                    &lt;a href="/dashboard" className="block w-full text-center px-6 py-3 border border-white text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/20 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-200"&gt;
                        Login to Dashboard
                    &lt;/a&gt;
                &lt;/div&gt;

                
                &lt;div className="bg-gray-900 p-8 rounded-2xl border-2 border-accent shadow-xl relative"&gt;
                    &lt;div className="absolute -top-4 left-1/2 transform -translate-x-1/2"&gt;
                        &lt;span className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium"&gt;Most Popular&lt;/span&gt;
                    &lt;/div&gt;
                    &lt;div className="text-center mb-8"&gt;
                        &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Professional&lt;/h3&gt;
                        &lt;div className="mb-4"&gt;
                            &lt;span className="text-4xl font-bold"&gt;$99&lt;/span&gt;
                            &lt;span className="text-gray-300"&gt;/user/month&lt;/span&gt;
                        &lt;/div&gt;
                        &lt;p className="text-gray-300"&gt;Advanced features for growing sales teams&lt;/p&gt;
                    &lt;/div&gt;
                    &lt;ul className="space-y-4 mb-8"&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Up to 10,000 monitored contacts
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            AI-powered lead scoring
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Advanced email automation
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Multiple CRM integrations
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Intent data and buying signals
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Custom workflows
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Team collaboration tools
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Advanced analytics
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Priority support
                        &lt;/li&gt;
                    &lt;/ul&gt;
                    &lt;a href="/dashboard" className="block w-full text-center px-6 py-3 bg-gradient-primary text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200"&gt;
                        Login to Dashboard
                    &lt;/a&gt;
                &lt;/div&gt;

                
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;div className="text-center mb-8"&gt;
                        &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Enterprise&lt;/h3&gt;
                        &lt;div className="mb-4"&gt;
                            &lt;span className="text-4xl font-bold"&gt;Custom&lt;/span&gt;
                        &lt;/div&gt;
                        &lt;p className="text-gray-300"&gt;Tailored solutions for large organizations&lt;/p&gt;
                    &lt;/div&gt;
                    &lt;ul className="space-y-4 mb-8"&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Unlimited monitored contacts
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Custom AI models
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            White-label options
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Unlimited integrations
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Advanced security features
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Custom data retention
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            Dedicated success manager
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            SLA guarantees
                        &lt;/li&gt;
                        &lt;li className="flex items-center text-gray-300"&gt;
                            &lt;div className="w-2 h-2 bg-accent rounded-full mr-3"&gt;&lt;/div&gt;
                            On-premise deployment option
                        &lt;/li&gt;
                    &lt;/ul&gt;
                    &lt;a href="/dashboard" className="block w-full text-center px-6 py-3 border border-white text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/20 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-200"&gt;
                        Login to Dashboard
                    &lt;/a&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gray-900"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;h2 className="text-4xl font-bold text-white text-center mb-16"&gt;Frequently Asked Questions&lt;/h2&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-2 gap-8"&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800"&gt;
                    &lt;h4 className="text-xl font-bold text-white mb-4"&gt;Can I change plans anytime?&lt;/h4&gt;
                    &lt;p className="text-gray-300"&gt;Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.&lt;/p&gt;
                &lt;/div&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800"&gt;
                    &lt;h4 className="text-xl font-bold text-white mb-4"&gt;Do you offer discounts for annual billing?&lt;/h4&gt;
                    &lt;p className="text-gray-300"&gt;Yes, we offer a 20% discount when you pay annually. Contact our sales team for more details.&lt;/p&gt;
                &lt;/div&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800"&gt;
                    &lt;h4 className="text-xl font-bold text-white mb-4"&gt;What happens to my data if I cancel?&lt;/h4&gt;
                    &lt;p className="text-gray-300"&gt;You can export all your data before cancellation. We retain your data for 30 days after cancellation.&lt;/p&gt;
                &lt;/div&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800"&gt;
                    &lt;h4 className="text-xl font-bold text-white mb-4"&gt;Is there a setup fee?&lt;/h4&gt;
                    &lt;p className="text-gray-300"&gt;No, there are no setup fees for any of our plans. Enterprise customers may opt for paid onboarding services.&lt;/p&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gradient-to-r from-primary to-accent text-white"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"&gt;
            &lt;h2 className="text-4xl font-bold mb-6"&gt;Ready to Get Started?&lt;/h2&gt;
            &lt;p className="text-xl text-gray-300 mb-12"&gt;Join thousands of sales teams already using Mohit AI&lt;/p&gt;
            &lt;div className="flex flex-col sm:flex-row justify-center gap-4"&gt;
                &lt;a href="/dashboard" className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-200"&gt;
                    Login to Dashboard
                &lt;/a&gt;
                &lt;a href="/demo" className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"&gt;
                    View Demo
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
