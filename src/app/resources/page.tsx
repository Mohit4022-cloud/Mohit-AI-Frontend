import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources - Mohit AI',
  description: 'Mohit AI - Your AI SDR That Never Sleeps',
}

export default function ResourcesPage() {
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
                                &lt;a href="/for-sdrs" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-100"&gt;For SDRs&lt;/a&gt;
                                &lt;a href="/for-managers" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-100"&gt;For Managers&lt;/a&gt;
                                &lt;a href="/enterprise" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-100"&gt;Enterprise&lt;/a&gt;
                                &lt;a href="/small-business" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-100"&gt;Small Business&lt;/a&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;a href="/security" className="text-gray-300 hover:text-white transition-colors"&gt;Security&lt;/a&gt;
                    &lt;a href="/signup" className="inline-flex items-center px-6 py-2.5 border border-black text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/20 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-200"&gt;
                        Get Started
                    &lt;/a&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/nav&gt;

    
    &lt;section className="pt-32 pb-20 bg-gray-900"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="text-center max-w-3xl mx-auto mb-16"&gt;
                &lt;h1 className="text-5xl font-bold text-white mb-6"&gt;Resources&lt;/h1&gt;
                &lt;p className="text-xl text-gray-300"&gt;Everything you need to succeed with Mohit AI. Explore our blog, customer stories, webinars, and more.&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gray-800"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-3 gap-8"&gt;
                
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6"&gt;
                        &lt;svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                            &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" /&gt;
                        &lt;/svg&gt;
                    &lt;/div&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Blog&lt;/h3&gt;
                    &lt;p className="text-gray-300 mb-6"&gt;Latest insights, tips, and best practices for AI-powered sales development.&lt;/p&gt;
                    &lt;div className="space-y-4"&gt;
                        &lt;a href="#" className="block"&gt;
                            &lt;div className="bg-gray-800 rounded-lg p-4"&gt;
                                &lt;h4 className="font-semibold text-white mb-2"&gt;10 Ways AI is Transforming Sales Development&lt;/h4&gt;
                                &lt;p className="text-sm text-gray-300"&gt;5 min read&lt;/p&gt;
                            &lt;/div&gt;
                        &lt;/a&gt;
                        &lt;a href="#" className="block"&gt;
                            &lt;div className="bg-gray-800 rounded-lg p-4"&gt;
                                &lt;h4 className="font-semibold text-white mb-2"&gt;The Future of Cold Calling: AI vs Human&lt;/h4&gt;
                                &lt;p className="text-sm text-gray-300"&gt;7 min read&lt;/p&gt;
                            &lt;/div&gt;
                        &lt;/a&gt;
                    &lt;/div&gt;
                    &lt;a href="#" className="inline-flex items-center mt-6 text-accent hover:text-white transition-colors"&gt;
                        View all posts
                        &lt;svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                            &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /&gt;
                        &lt;/svg&gt;
                    &lt;/a&gt;
                &lt;/div&gt;

                
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6"&gt;
                        &lt;svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                            &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /&gt;
                        &lt;/svg&gt;
                    &lt;/div&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Customer Stories&lt;/h3&gt;
                    &lt;p className="text-gray-300 mb-6"&gt;See how leading companies are using Mohit AI to transform their sales process.&lt;/p&gt;
                    &lt;div className="space-y-4"&gt;
                        &lt;a href="#" className="block"&gt;
                            &lt;div className="bg-gray-800 rounded-lg p-4"&gt;
                                &lt;h4 className="font-semibold text-white mb-2"&gt;How TechCorp 3x'd Their Pipeline&lt;/h4&gt;
                                &lt;p className="text-sm text-gray-300"&gt;Case Study • 5 min read&lt;/p&gt;
                            &lt;/div&gt;
                        &lt;/a&gt;
                        &lt;a href="#" className="block"&gt;
                            &lt;div className="bg-gray-800 rounded-lg p-4"&gt;
                                &lt;h4 className="font-semibold text-white mb-2"&gt;SaaS Co's Journey to 10k Leads&lt;/h4&gt;
                                &lt;p className="text-sm text-gray-300"&gt;Case Study • 4 min read&lt;/p&gt;
                            &lt;/div&gt;
                        &lt;/a&gt;
                    &lt;/div&gt;
                    &lt;a href="#" className="inline-flex items-center mt-6 text-accent hover:text-white transition-colors"&gt;
                        View all stories
                        &lt;svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                            &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /&gt;
                        &lt;/svg&gt;
                    &lt;/a&gt;
                &lt;/div&gt;

                
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6"&gt;
                        &lt;svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                            &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /&gt;
                        &lt;/svg&gt;
                    &lt;/div&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Webinars&lt;/h3&gt;
                    &lt;p className="text-gray-300 mb-6"&gt;Join live sessions or watch recordings to learn from our experts.&lt;/p&gt;
                    &lt;div className="space-y-4"&gt;
                        &lt;a href="#" className="block"&gt;
                            &lt;div className="bg-gray-800 rounded-lg p-4"&gt;
                                &lt;h4 className="font-semibold text-white mb-2"&gt;Getting Started with Mohit AI&lt;/h4&gt;
                                &lt;p className="text-sm text-gray-300"&gt;Live • June 25, 2024&lt;/p&gt;
                            &lt;/div&gt;
                        &lt;/a&gt;
                        &lt;a href="#" className="block"&gt;
                            &lt;div className="bg-gray-800 rounded-lg p-4"&gt;
                                &lt;h4 className="font-semibold text-white mb-2"&gt;Advanced AI Sales Techniques&lt;/h4&gt;
                                &lt;p className="text-sm text-gray-300"&gt;On-demand • Watch now&lt;/p&gt;
                            &lt;/div&gt;
                        &lt;/a&gt;
                    &lt;/div&gt;
                    &lt;a href="#" className="inline-flex items-center mt-6 text-accent hover:text-white transition-colors"&gt;
                        View all webinars
                        &lt;svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                            &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /&gt;
                        &lt;/svg&gt;
                    &lt;/a&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gray-900"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"&gt;
                
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-xl font-bold text-white mb-4"&gt;Glossary&lt;/h3&gt;
                    &lt;p className="text-gray-300 mb-6"&gt;Comprehensive guide to AI sales development terms and concepts.&lt;/p&gt;
                    &lt;a href="#" className="inline-flex items-center text-accent hover:text-white transition-colors"&gt;
                        Learn more
                        &lt;svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                            &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /&gt;
                        &lt;/svg&gt;
                    &lt;/a&gt;
                &lt;/div&gt;

                
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-xl font-bold text-white mb-4"&gt;Recipes&lt;/h3&gt;
                    &lt;p className="text-gray-300 mb-6"&gt;Step-by-step guides for common sales development workflows.&lt;/p&gt;
                    &lt;a href="#" className="inline-flex items-center text-accent hover:text-white transition-colors"&gt;
                        View recipes
                        &lt;svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                            &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /&gt;
                        &lt;/svg&gt;
                    &lt;/a&gt;
                &lt;/div&gt;

                
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-xl font-bold text-white mb-4"&gt;Events&lt;/h3&gt;
                    &lt;p className="text-gray-300 mb-6"&gt;Join us at conferences, meetups, and online events.&lt;/p&gt;
                    &lt;a href="#" className="inline-flex items-center text-accent hover:text-white transition-colors"&gt;
                        See events
                        &lt;svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                            &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /&gt;
                        &lt;/svg&gt;
                    &lt;/a&gt;
                &lt;/div&gt;

                
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-xl font-bold text-white mb-4"&gt;Help Center&lt;/h3&gt;
                    &lt;p className="text-gray-300 mb-6"&gt;Get support, browse FAQs, and find detailed documentation.&lt;/p&gt;
                    &lt;a href="#" className="inline-flex items-center text-accent hover:text-white transition-colors"&gt;
                        Get help
                        &lt;svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                            &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /&gt;
                        &lt;/svg&gt;
                    &lt;/a&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gray-800"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="text-center max-w-3xl mx-auto mb-16"&gt;
                &lt;h2 className="text-4xl font-bold text-white mb-6"&gt;Mohit AI University&lt;/h2&gt;
                &lt;p className="text-xl text-gray-300"&gt;Free online courses to help you master AI-powered sales development.&lt;/p&gt;
            &lt;/div&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-3 gap-8"&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-xl font-bold text-white mb-4"&gt;Getting Started&lt;/h3&gt;
                    &lt;p className="text-gray-300 mb-6"&gt;Learn the basics of Mohit AI and set up your first campaign.&lt;/p&gt;
                    &lt;span className="text-sm text-gray-400"&gt;4 lessons • 2 hours&lt;/span&gt;
                &lt;/div&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-xl font-bold text-white mb-4"&gt;Advanced Techniques&lt;/h3&gt;
                    &lt;p className="text-gray-300 mb-6"&gt;Master advanced features and optimization strategies.&lt;/p&gt;
                    &lt;span className="text-sm text-gray-400"&gt;6 lessons • 3 hours&lt;/span&gt;
                &lt;/div&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-xl font-bold text-white mb-4"&gt;AI Sales Mastery&lt;/h3&gt;
                    &lt;p className="text-gray-300 mb-6"&gt;Become an expert in AI-powered sales development.&lt;/p&gt;
                    &lt;span className="text-sm text-gray-400"&gt;8 lessons • 4 hours&lt;/span&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gradient-to-r from-primary to-accent text-white"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="max-w-2xl mx-auto text-center"&gt;
                &lt;h2 className="text-3xl font-bold mb-6"&gt;Stay Updated&lt;/h2&gt;
                &lt;p className="text-gray-300 mb-8"&gt;Get the latest Mohit AI news, tips, and resources delivered to your inbox.&lt;/p&gt;
                &lt;form className="flex gap-4"&gt;
                    &lt;input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg bg-gray-900 text-white"&gt;
                    &lt;button type="submit" className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"&gt;
                        Subscribe
                    &lt;/button&gt;
                &lt;/form&gt;
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
