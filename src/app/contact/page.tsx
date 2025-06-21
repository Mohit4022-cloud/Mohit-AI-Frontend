import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - Mohit AI',
  description: 'Mohit AI - Your AI SDR That Never Sleeps',
}

export default function ContactPage() {
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
                    &lt;a href="/about" className="text-gray-300 hover:text-white transition-colors"&gt;About&lt;/a&gt;
                    &lt;a href="/signup" className="inline-flex items-center px-6 py-2.5 border border-black text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/20 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-200"&gt;
                        Get Started
                    &lt;/a&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/nav&gt;

    
    &lt;section className="pt-32 pb-20 bg-gray-900"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"&gt;
            &lt;h1 className="text-5xl font-bold text-white mb-6"&gt;Get in Touch&lt;/h1&gt;
            &lt;p className="text-xl text-gray-300 mb-8"&gt;Have questions? We're here to help.&lt;/p&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gray-800"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-2 gap-16"&gt;
                
                &lt;div className="bg-gray-900 p-8 rounded-2xl shadow-sm"&gt;
                    &lt;h2 className="text-2xl font-bold text-white mb-8"&gt;Send us a message&lt;/h2&gt;
                    &lt;form id="contactForm" className="space-y-6"&gt;
                        &lt;div className="relative"&gt;
                            &lt;label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1"&gt;Full Name &lt;span className="text-red-500"&gt;*&lt;/span&gt;&lt;/label&gt;
                            &lt;input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors" required&gt;
                            &lt;div className="error-message hidden mt-1 text-sm text-red-500 transition-all duration-200 opacity-0 transform"&gt;&lt;/div&gt;
                        &lt;/div&gt;
                        &lt;div className="relative"&gt;
                            &lt;label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1"&gt;Email Address &lt;span className="text-red-500"&gt;*&lt;/span&gt;&lt;/label&gt;
                            &lt;input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors" required&gt;
                            &lt;div className="error-message hidden mt-1 text-sm text-red-500 transition-all duration-200 opacity-0 transform"&gt;&lt;/div&gt;
                        &lt;/div&gt;
                        &lt;div className="relative"&gt;
                            &lt;label htmlFor="company" className="block text-sm font-medium text-gray-200 mb-1"&gt;Company Name&lt;/label&gt;
                            &lt;input type="text" id="company" name="company" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"&gt;
                            &lt;div className="error-message hidden mt-1 text-sm text-red-500 transition-all duration-200 opacity-0 transform"&gt;&lt;/div&gt;
                        &lt;/div&gt;
                        &lt;div className="relative"&gt;
                            &lt;label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1"&gt;Message &lt;span className="text-red-500"&gt;*&lt;/span&gt;&lt;/label&gt;
                            &lt;textarea id="message" name="message" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors" required&gt;&lt;/textarea&gt;
                            &lt;div className="error-message hidden mt-1 text-sm text-red-500 transition-all duration-200 opacity-0 transform"&gt;&lt;/div&gt;
                        &lt;/div&gt;
                        &lt;button type="submit" className="w-full px-6 py-3 bg-gradient-primary text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200"&gt;
                            Send Message
                        &lt;/button&gt;
                    &lt;/form&gt;
                &lt;/div&gt;

                
                &lt;div className="space-y-12"&gt;
                    &lt;div&gt;
                        &lt;h2 className="text-2xl font-bold text-white mb-6"&gt;Other Ways to Connect&lt;/h2&gt;
                        &lt;div className="space-y-6"&gt;
                            &lt;div&gt;
                                &lt;h3 className="text-lg font-semibold text-white mb-2"&gt;Sales Inquiries&lt;/h3&gt;
                                &lt;p className="text-gray-300"&gt;Email: sales@mohitai.com&lt;/p&gt;
                                &lt;p className="text-gray-300"&gt;Phone: +1 (555) 123-4567&lt;/p&gt;
                            &lt;/div&gt;
                            &lt;div&gt;
                                &lt;h3 className="text-lg font-semibold text-white mb-2"&gt;Support&lt;/h3&gt;
                                &lt;p className="text-gray-300"&gt;Email: support@mohitai.com&lt;/p&gt;
                                &lt;p className="text-gray-300"&gt;Phone: +1 (555) 987-6543&lt;/p&gt;
                            &lt;/div&gt;
                            &lt;div&gt;
                                &lt;h3 className="text-lg font-semibold text-white mb-2"&gt;Office Location&lt;/h3&gt;
                                &lt;p className="text-gray-300"&gt;123 AI Boulevard&lt;/p&gt;
                                &lt;p className="text-gray-300"&gt;San Francisco, CA 94105&lt;/p&gt;
                                &lt;p className="text-gray-300"&gt;United States&lt;/p&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;

                    &lt;div&gt;
                        &lt;h2 className="text-2xl font-bold text-white mb-6"&gt;FAQ&lt;/h2&gt;
                        &lt;div className="space-y-6"&gt;
                            &lt;div&gt;
                                &lt;h3 className="text-lg font-semibold text-white mb-2"&gt;What are your support hours?&lt;/h3&gt;
                                &lt;p className="text-gray-300"&gt;Our support team is available 24/7 to assist you with any questions or concerns.&lt;/p&gt;
                            &lt;/div&gt;
                            &lt;div&gt;
                                &lt;h3 className="text-lg font-semibold text-white mb-2"&gt;How quickly do you respond?&lt;/h3&gt;
                                &lt;p className="text-gray-300"&gt;We typically respond to all inquiries within 1 business day.&lt;/p&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
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
                        &lt;li&gt;&lt;a href="/about" className="text-gray-300 hover:text-white transition-colors"&gt;About&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-300 hover:text-white transition-colors"&gt;Blog&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-300 hover:text-white transition-colors"&gt;Careers&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="/contact" className="text-gray-300 hover:text-white transition-colors"&gt;Contact&lt;/a&gt;&lt;/li&gt;
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
