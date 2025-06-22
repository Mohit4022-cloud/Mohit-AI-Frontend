import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Demo - Mohit AI",
  description: "Mohit AI - Your AI SDR That Never Sleeps",
};

export default function DemoPage() {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: `&lt;nav className="fixed w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-50"&gt;
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
                    &lt;a href="/signup" className="inline-flex items-center px-6 py-2.5 border border-black text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/20 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-200"&gt;
                        Get Started
                    &lt;/a&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/nav&gt;

    
    &lt;section className="pt-32 pb-20"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="text-center mb-16"&gt;
                &lt;h1 className="text-4xl font-bold text-white mb-6"&gt;Watch Mohit AI in Action&lt;/h1&gt;
                &lt;p className="text-xl text-gray-300 max-w-3xl mx-auto"&gt;See how Mohit AI handles cold outreach, qualifies leads, and books meetings automatically.&lt;/p&gt;
            &lt;/div&gt;
            
            &lt;div className="grid grid-cols-1 lg:grid-cols-2 gap-16"&gt;
                
                &lt;div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-800"&gt;
                    &lt;div className="aspect-w-16 aspect-h-9 mb-8"&gt;
                        &lt;div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center"&gt;
                            &lt;p className="text-gray-400"&gt;Demo Video Coming Soon&lt;/p&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;AI-Powered Cold Calling&lt;/h3&gt;
                    &lt;p className="text-gray-300 mb-6"&gt;Watch Mohit AI make personalized calls, handle objections, and book meetings in real-time.&lt;/p&gt;
                    &lt;div className="space-y-4"&gt;
                        &lt;div className="flex items-start space-x-3"&gt;
                            &lt;div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white"&gt;✓&lt;/div&gt;
                            &lt;p className="text-gray-300"&gt;Natural voice AI technology&lt;/p&gt;
                        &lt;/div&gt;
                        &lt;div className="flex items-start space-x-3"&gt;
                            &lt;div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white"&gt;✓&lt;/div&gt;
                            &lt;p className="text-gray-300"&gt;Real-time objection handling&lt;/p&gt;
                        &lt;/div&gt;
                        &lt;div className="flex items-start space-x-3"&gt;
                            &lt;div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white"&gt;✓&lt;/div&gt;
                            &lt;p className="text-gray-300"&gt;Automatic meeting scheduling&lt;/p&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;

                
                &lt;div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-800"&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-6"&gt;Schedule a Live Demo&lt;/h3&gt;
                    &lt;form id="demo-form" className="space-y-6" onsubmit="return handleDemoSubmit(event)"&gt;
                        &lt;div&gt;
                            &lt;label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="name"&gt;Full name&lt;/label&gt;
                            &lt;input type="text" id="name" name="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all" required&gt;
                        &lt;/div&gt;
                        &lt;div&gt;
                            &lt;label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="email"&gt;Work email&lt;/label&gt;
                            &lt;input type="email" id="email" name="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all" required&gt;
                        &lt;/div&gt;
                        &lt;div&gt;
                            &lt;label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="company"&gt;Company name&lt;/label&gt;
                            &lt;input type="text" id="company" name="company" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all" required&gt;
                        &lt;/div&gt;
                        &lt;div&gt;
                            &lt;label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="phone"&gt;Phone number&lt;/label&gt;
                            &lt;input type="tel" id="phone" name="phone" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all" required&gt;
                        &lt;/div&gt;
                        &lt;div&gt;
                            &lt;label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="message"&gt;What would you like to see in the demo?&lt;/label&gt;
                            &lt;textarea id="message" name="message" rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all" required&gt;&lt;/textarea&gt;
                        &lt;/div&gt;
                        &lt;button type="submit" className="w-full bg-gradient-primary text-white py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-200 font-medium"&gt;
                            Schedule Demo
                        &lt;/button&gt;
                    &lt;/form&gt;
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
    &lt;/footer&gt;`,
        }}
      />
    </>
  );
}
