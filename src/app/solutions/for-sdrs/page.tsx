import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'For SDRs - Mohit AI',
  description: 'Mohit AI - Your AI SDR That Never Sleeps',
}

export default function SdrsPage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: `&lt;nav className="fixed w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-50"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="flex justify-between h-20"&gt;
                &lt;div className="flex items-center"&gt;
                    &lt;a href="/" className="text-2xl font-bold text-white"&gt;Mohit AI&lt;/a&gt;
                &lt;/div&gt;
                &lt;div className="hidden md:flex items-center space-x-8"&gt;
                    &lt;a href="/features" className="text-gray-300 hover:text-white transition-colors"&gt;Features&lt;/a&gt;
                    &lt;a href="/pricing" className="text-gray-300 hover:text-white transition-colors"&gt;Pricing&lt;/a&gt;
                    &lt;div className="relative group"&gt;
                        &lt;button className="text-white font-semibold transition-colors flex items-center"&gt;
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
                    &lt;a href="#" className="inline-flex items-center px-6 py-2.5 border border-black text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/20 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-200"&gt;
                        Get Started
                    &lt;/a&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/nav&gt;

    
    &lt;section className="pt-32 pb-20 bg-gray-900"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="grid grid-cols-1 lg:grid-cols-2 gap-16"&gt;
                &lt;div&gt;
                    &lt;h1 className="text-5xl font-bold text-white leading-tight mb-8"&gt;
                        Double Your Meetings Booked with AI-Powered Outreach
                    &lt;/h1&gt;
                    &lt;p className="text-xl text-gray-300 mb-12"&gt;
                        Let Mohit AI handle cold outreach while you focus on building relationships and closing deals. Our AI assistant works 24/7 to find and engage perfect-fit prospects.
                    &lt;/p&gt;
                    &lt;div className="flex gap-4 mb-12"&gt;
                        &lt;a href="#" className="inline-flex items-center px-8 py-3 bg-gradient-primary text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200"&gt;
                            Start Free Trial
                        &lt;/a&gt;
                        &lt;a href="#" className="inline-flex items-center px-8 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-all duration-200"&gt;
                            Watch Demo
                        &lt;/a&gt;
                    &lt;/div&gt;
                    &lt;div className="flex items-center gap-8 text-sm text-gray-300"&gt;
                        &lt;div className="flex items-center gap-2"&gt;
                            &lt;span className="font-semibold"&gt;3x&lt;/span&gt; More Meetings
                        &lt;/div&gt;
                        &lt;div className="flex items-center gap-2"&gt;
                            &lt;span className="font-semibold"&gt;80%&lt;/span&gt; Less Cold Calling
                        &lt;/div&gt;
                        &lt;div className="flex items-center gap-2"&gt;
                            &lt;span className="font-semibold"&gt;24/7&lt;/span&gt; Outreach
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="lg:mt-0 mt-12"&gt;
                    &lt;div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-800"&gt;
                        &lt;h3 className="text-2xl font-bold text-white mb-8"&gt;How Mohit AI Helps SDRs&lt;/h3&gt;
                        &lt;ul className="space-y-6"&gt;
                            &lt;li className="flex items-start space-x-4"&gt;
                                &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white"&gt;
                                    &lt;svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                                        &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"  /&gt;
                                    &lt;/svg&gt;
                                &lt;/div&gt;
                                &lt;div&gt;
                                    &lt;h4 className="text-lg font-semibold text-white mb-2"&gt;Automated Prospecting&lt;/h4&gt;
                                    &lt;p className="text-gray-300"&gt;AI finds and engages perfect-fit prospects 24/7&lt;/p&gt;
                                &lt;/div&gt;
                            &lt;/li&gt;
                            &lt;li className="flex items-start space-x-4"&gt;
                                &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white"&gt;
                                    &lt;svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                                        &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"  /&gt;
                                    &lt;/svg&gt;
                                &lt;/div&gt;
                                &lt;div&gt;
                                    &lt;h4 className="text-lg font-semibold text-white mb-2"&gt;Smart Follow-ups&lt;/h4&gt;
                                    &lt;p className="text-gray-300"&gt;Never miss a follow-up with AI-powered sequencing&lt;/p&gt;
                                &lt;/div&gt;
                            &lt;/li&gt;
                            &lt;li className="flex items-start space-x-4"&gt;
                                &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white"&gt;
                                    &lt;svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                                        &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"  /&gt;
                                    &lt;/svg&gt;
                                &lt;/div&gt;
                                &lt;div&gt;
                                    &lt;h4 className="text-lg font-semibold text-white mb-2"&gt;Meeting Scheduling&lt;/h4&gt;
                                    &lt;p className="text-gray-300"&gt;AI handles scheduling and calendar coordination&lt;/p&gt;
                                &lt;/div&gt;
                            &lt;/li&gt;
                        &lt;/ul&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gray-800"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="text-center max-w-3xl mx-auto mb-16"&gt;
                &lt;h2 className="text-4xl font-bold text-white mb-6"&gt;Tools Built for Modern SDRs&lt;/h2&gt;
                &lt;p className="text-xl text-gray-300"&gt;Everything you need to exceed your quota without the grind&lt;/p&gt;
            &lt;/div&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-3 gap-8"&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;AI Prospecting&lt;/h3&gt;
                    &lt;p className="text-gray-300"&gt;Mohit AI analyzes millions of companies to find your ideal prospects and engages them with personalized outreach.&lt;/p&gt;
                &lt;/div&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Smart Sequences&lt;/h3&gt;
                    &lt;p className="text-gray-300"&gt;AI creates and executes personalized multi-channel sequences that adapt based on prospect engagement.&lt;/p&gt;
                &lt;/div&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Meeting Booking&lt;/h3&gt;
                    &lt;p className="text-gray-300"&gt;Automatically qualify prospects, handle objections, and book meetings directly into your calendar.&lt;/p&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gray-900"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="grid grid-cols-1 lg:grid-cols-2 gap-16"&gt;
                &lt;div&gt;
                    &lt;h2 className="text-4xl font-bold text-white mb-8"&gt;Real Results for SDRs&lt;/h2&gt;
                    &lt;div className="space-y-8"&gt;
                        &lt;div className="flex items-start space-x-4"&gt;
                            &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold"&gt;
                                1
                            &lt;/div&gt;
                            &lt;div&gt;
                                &lt;h3 className="text-lg font-semibold text-white mb-2"&gt;More Quality Meetings&lt;/h3&gt;
                                &lt;p className="text-gray-300"&gt;Book 3x more meetings with qualified prospects who are ready to buy.&lt;/p&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                        &lt;div className="flex items-start space-x-4"&gt;
                            &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold"&gt;
                                2
                            &lt;/div&gt;
                            &lt;div&gt;
                                &lt;h3 className="text-lg font-semibold text-white mb-2"&gt;Less Busy Work&lt;/h3&gt;
                                &lt;p className="text-gray-300"&gt;Eliminate manual prospecting and follow-up tasks to focus on building relationships.&lt;/p&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                        &lt;div className="flex items-start space-x-4"&gt;
                            &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold"&gt;
                                3
                            &lt;/div&gt;
                            &lt;div&gt;
                                &lt;h3 className="text-lg font-semibold text-white mb-2"&gt;Consistent Pipeline&lt;/h3&gt;
                                &lt;p className="text-gray-300"&gt;Maintain a steady flow of qualified opportunities with 24/7 AI-powered outreach.&lt;/p&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="lg:mt-0 mt-12"&gt;
                    &lt;div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-800"&gt;
                        &lt;h3 className="text-2xl font-bold text-white mb-8 text-center"&gt;Start Your Free Trial&lt;/h3&gt;
                        &lt;form className="space-y-6"&gt;
                            &lt;div&gt;
                                &lt;label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="name"&gt;Full name&lt;/label&gt;
                                &lt;input type="text" id="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"&gt;
                            &lt;/div&gt;
                            &lt;div&gt;
                                &lt;label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="email"&gt;Work email&lt;/label&gt;
                                &lt;input type="email" id="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"&gt;
                            &lt;/div&gt;
                            &lt;div&gt;
                                &lt;label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="company"&gt;Company name&lt;/label&gt;
                                &lt;input type="text" id="company" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"&gt;
                            &lt;/div&gt;
                            &lt;button type="submit" className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition-all duration-200 font-medium"&gt;
                                Start Free Trial
                            &lt;/button&gt;
                            &lt;p className="text-xs text-gray-400 text-center"&gt;
                                No credit card required. 14-day free trial.
                            &lt;/p&gt;
                        &lt;/form&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gradient-to-r from-primary to-accent text-white"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"&gt;
            &lt;h2 className="text-4xl font-bold mb-6"&gt;Ready to Hit Your Numbers?&lt;/h2&gt;
            &lt;p className="text-xl text-gray-300 mb-12"&gt;Join thousands of SDRs who use Mohit AI to exceed their quotas&lt;/p&gt;
            &lt;div className="flex flex-col sm:flex-row justify-center gap-4"&gt;
                &lt;a href="#" className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-200"&gt;
                    Start Free Trial
                &lt;/a&gt;
                &lt;a href="#" className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"&gt;
                    Watch Demo
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
