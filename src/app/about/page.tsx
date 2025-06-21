import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Mohit AI',
  description: 'Mohit AI - Your AI SDR That Never Sleeps',
}

export default function AboutPage() {
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
                        &lt;div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"&gt;
                            &lt;div className="py-1"&gt;
                                &lt;a href="/solutions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"&gt;By Industry&lt;/a&gt;
                                &lt;a href="/for-sdrs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"&gt;For SDRs&lt;/a&gt;
                                &lt;a href="/for-managers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"&gt;For Managers&lt;/a&gt;
                                &lt;a href="/enterprise" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"&gt;Enterprise&lt;/a&gt;
                                &lt;a href="/small-business" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"&gt;Small Business&lt;/a&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;a href="/resources" className="text-gray-300 hover:text-white transition-colors"&gt;Resources&lt;/a&gt;
                    &lt;a href="/security" className="text-gray-300 hover:text-white transition-colors"&gt;Security&lt;/a&gt;
                    &lt;a href="/about" className="text-white font-semibold transition-colors"&gt;About&lt;/a&gt;
                    &lt;a href="/dashboard" className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/50 transform hover:scale-105 transition-all duration-200"&gt;
                        Login
                    &lt;/a&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/nav&gt;

    
    &lt;section className="pt-32 pb-20 bg-white"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"&gt;
            &lt;h1 className="text-5xl font-bold text-black mb-6"&gt;Empowering Sales Teams with AI&lt;/h1&gt;
            &lt;p className="text-xl text-gray-600 mb-8"&gt;We're on a mission to revolutionize how sales teams work by harnessing the power of artificial intelligence.&lt;/p&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gray-50"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"&gt;
                &lt;div&gt;
                    &lt;h2 className="text-3xl font-bold text-black mb-6"&gt;Our Mission&lt;/h2&gt;
                    &lt;p className="text-lg text-gray-600 mb-6"&gt;At Mohit AI, we believe in transforming the way sales teams operate. Our mission is to empower sales professionals with cutting-edge AI tools that enhance productivity, improve decision-making, and drive better results.&lt;/p&gt;
                    &lt;p className="text-lg text-gray-600"&gt;We're committed to innovation, excellence, and providing solutions that make a real difference in the sales industry.&lt;/p&gt;
                &lt;/div&gt;
                &lt;div className="grid grid-cols-2 gap-6"&gt;
                    &lt;div className="bg-white p-6 rounded-xl shadow-sm"&gt;
                        &lt;h3 className="text-xl font-semibold text-black mb-3"&gt;Innovation&lt;/h3&gt;
                        &lt;p className="text-gray-600"&gt;Pushing boundaries with cutting-edge AI technology&lt;/p&gt;
                    &lt;/div&gt;
                    &lt;div className="bg-white p-6 rounded-xl shadow-sm"&gt;
                        &lt;h3 className="text-xl font-semibold text-black mb-3"&gt;Excellence&lt;/h3&gt;
                        &lt;p className="text-gray-600"&gt;Delivering outstanding results for our clients&lt;/p&gt;
                    &lt;/div&gt;
                    &lt;div className="bg-white p-6 rounded-xl shadow-sm"&gt;
                        &lt;h3 className="text-xl font-semibold text-black mb-3"&gt;Trust&lt;/h3&gt;
                        &lt;p className="text-gray-600"&gt;Building lasting relationships through reliability&lt;/p&gt;
                    &lt;/div&gt;
                    &lt;div className="bg-white p-6 rounded-xl shadow-sm"&gt;
                        &lt;h3 className="text-xl font-semibold text-black mb-3"&gt;Impact&lt;/h3&gt;
                        &lt;p className="text-gray-600"&gt;Making a real difference in sales success&lt;/p&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-white"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;h2 className="text-3xl font-bold text-black text-center mb-16"&gt;Meet Our Leadership Team&lt;/h2&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-3 gap-12"&gt;
                
                &lt;div className="text-center"&gt;
                    &lt;div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200"&gt;&lt;/div&gt;
                    &lt;h3 className="text-xl font-semibold text-black mb-2"&gt;Sarah Johnson&lt;/h3&gt;
                    &lt;p className="text-gray-600 mb-4"&gt;Chief Executive Officer&lt;/p&gt;
                    &lt;p className="text-gray-600"&gt;Leading Mohit AI's mission to transform sales through artificial intelligence.&lt;/p&gt;
                &lt;/div&gt;
                
                &lt;div className="text-center"&gt;
                    &lt;div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200"&gt;&lt;/div&gt;
                    &lt;h3 className="text-xl font-semibold text-black mb-2"&gt;Michael Chen&lt;/h3&gt;
                    &lt;p className="text-gray-600 mb-4"&gt;Chief Technology Officer&lt;/p&gt;
                    &lt;p className="text-gray-600"&gt;Driving innovation in AI and machine learning for sales optimization.&lt;/p&gt;
                &lt;/div&gt;
                
                &lt;div className="text-center"&gt;
                    &lt;div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200"&gt;&lt;/div&gt;
                    &lt;h3 className="text-xl font-semibold text-black mb-2"&gt;Emily Rodriguez&lt;/h3&gt;
                    &lt;p className="text-gray-600 mb-4"&gt;Head of Product&lt;/p&gt;
                    &lt;p className="text-gray-600"&gt;Shaping the future of sales technology through user-centric design.&lt;/p&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gray-50"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"&gt;
                &lt;div&gt;
                    &lt;div className="text-4xl font-bold text-black mb-2"&gt;500+&lt;/div&gt;
                    &lt;p className="text-gray-600"&gt;Companies Served&lt;/p&gt;
                &lt;/div&gt;
                &lt;div&gt;
                    &lt;div className="text-4xl font-bold text-black mb-2"&gt;50k+&lt;/div&gt;
                    &lt;p className="text-gray-600"&gt;Sales Professionals&lt;/p&gt;
                &lt;/div&gt;
                &lt;div&gt;
                    &lt;div className="text-4xl font-bold text-black mb-2"&gt;98%&lt;/div&gt;
                    &lt;p className="text-gray-600"&gt;Customer Satisfaction&lt;/p&gt;
                &lt;/div&gt;
                &lt;div&gt;
                    &lt;div className="text-4xl font-bold text-black mb-2"&gt;24/7&lt;/div&gt;
                    &lt;p className="text-gray-600"&gt;Support Available&lt;/p&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-black text-white"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"&gt;
            &lt;h2 className="text-4xl font-bold mb-6"&gt;Join Our Mission&lt;/h2&gt;
            &lt;p className="text-xl text-gray-300 mb-12"&gt;Be part of the future of AI-powered sales&lt;/p&gt;
            &lt;div className="flex flex-col sm:flex-row justify-center gap-4"&gt;
                &lt;a href="/careers" className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300"&gt;
                    View Careers
                &lt;/a&gt;
                &lt;a href="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"&gt;
                    Contact Us
                &lt;/a&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;footer className="bg-white border-t border-gray-100"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"&gt;
            &lt;div className="grid grid-cols-2 md:grid-cols-4 gap-8"&gt;
                &lt;div&gt;
                    &lt;h4 className="text-white font-semibold mb-4"&gt;Product&lt;/h4&gt;
                    &lt;ul className="space-y-3"&gt;
                        &lt;li&gt;&lt;a href="/features" className="text-gray-600 hover:text-black transition-colors"&gt;Features&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="/pricing" className="text-gray-600 hover:text-black transition-colors"&gt;Pricing&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-600 hover:text-black transition-colors"&gt;Integrations&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-600 hover:text-black transition-colors"&gt;API&lt;/a&gt;&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;
                &lt;div&gt;
                    &lt;h4 className="text-white font-semibold mb-4"&gt;Solutions&lt;/h4&gt;
                    &lt;ul className="space-y-3"&gt;
                        &lt;li&gt;&lt;a href="/for-sdrs" className="text-gray-600 hover:text-black transition-colors"&gt;For SDRs&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="/for-managers" className="text-gray-600 hover:text-black transition-colors"&gt;For Managers&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="/enterprise" className="text-gray-600 hover:text-black transition-colors"&gt;Enterprise&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="/small-business" className="text-gray-600 hover:text-black transition-colors"&gt;Small Business&lt;/a&gt;&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;
                &lt;div&gt;
                    &lt;h4 className="text-white font-semibold mb-4"&gt;Company&lt;/h4&gt;
                    &lt;ul className="space-y-3"&gt;
                        &lt;li&gt;&lt;a href="/about" className="text-gray-600 hover:text-black transition-colors"&gt;About&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-600 hover:text-black transition-colors"&gt;Blog&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-600 hover:text-black transition-colors"&gt;Careers&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="/contact" className="text-gray-600 hover:text-black transition-colors"&gt;Contact&lt;/a&gt;&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;
                &lt;div&gt;
                    &lt;h4 className="text-white font-semibold mb-4"&gt;Resources&lt;/h4&gt;
                    &lt;ul className="space-y-3"&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-600 hover:text-black transition-colors"&gt;Documentation&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-600 hover:text-black transition-colors"&gt;Support&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="/security" className="text-gray-600 hover:text-black transition-colors"&gt;Security&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-600 hover:text-black transition-colors"&gt;Privacy Policy&lt;/a&gt;&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;div className="mt-16 pt-8 border-t border-gray-100"&gt;
                &lt;p className="text-gray-600 text-center"&gt;&amp;copy; 2024 Mohit AI. All rights reserved.&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/footer&gt;` }} />
    </>
  )
}
