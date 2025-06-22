import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Solutions - Mohit AI",
  description: "Mohit AI - Your AI SDR That Never Sleeps",
};

export default function EnterprisePage() {
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
                        Enterprise-Grade AI Sales Intelligence
                    &lt;/h1&gt;
                    &lt;p className="text-xl text-gray-300 mb-12"&gt;
                        Scale your sales operations with Mohit AI's enterprise solution. Custom-built for large organizations with complex sales processes and multiple teams.
                    &lt;/p&gt;
                    &lt;div className="flex gap-4 mb-12"&gt;
                        &lt;a href="#" className="inline-flex items-center px-8 py-3 bg-gradient-primary text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200"&gt;
                            Request Enterprise Demo
                        &lt;/a&gt;
                        &lt;a href="#" className="inline-flex items-center px-8 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-all duration-200"&gt;
                            Contact Sales
                        &lt;/a&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="lg:mt-0 mt-12"&gt;
                    &lt;div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-800"&gt;
                        &lt;h3 className="text-2xl font-bold text-white mb-8"&gt;Enterprise Features&lt;/h3&gt;
                        &lt;ul className="space-y-6"&gt;
                            &lt;li className="flex items-start space-x-4"&gt;
                                &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white"&gt;
                                    &lt;svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                                        &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"  /&gt;
                                    &lt;/svg&gt;
                                &lt;/div&gt;
                                &lt;div&gt;
                                    &lt;h4 className="text-lg font-semibold text-white mb-2"&gt;Custom Deployment Options&lt;/h4&gt;
                                    &lt;p className="text-gray-300"&gt;On-premise or private cloud deployment with dedicated infrastructure&lt;/p&gt;
                                &lt;/div&gt;
                            &lt;/li&gt;
                            &lt;li className="flex items-start space-x-4"&gt;
                                &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white"&gt;
                                    &lt;svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                                        &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"  /&gt;
                                    &lt;/svg&gt;
                                &lt;/div&gt;
                                &lt;div&gt;
                                    &lt;h4 className="text-lg font-semibold text-white mb-2"&gt;Advanced Security&lt;/h4&gt;
                                    &lt;p className="text-gray-300"&gt;SOC 2 Type II compliance, custom security policies, and encryption&lt;/p&gt;
                                &lt;/div&gt;
                            &lt;/li&gt;
                            &lt;li className="flex items-start space-x-4"&gt;
                                &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white"&gt;
                                    &lt;svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                                        &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"  /&gt;
                                    &lt;/svg&gt;
                                &lt;/div&gt;
                                &lt;div&gt;
                                    &lt;h4 className="text-lg font-semibold text-white mb-2"&gt;Dedicated Support&lt;/h4&gt;
                                    &lt;p className="text-gray-300"&gt;24/7 priority support with dedicated customer success manager&lt;/p&gt;
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
                &lt;h2 className="text-4xl font-bold text-white mb-6"&gt;Built for Enterprise Scale&lt;/h2&gt;
                &lt;p className="text-xl text-gray-300"&gt;Powerful features designed for large organizations with complex needs&lt;/p&gt;
            &lt;/div&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-3 gap-8"&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Custom Integration&lt;/h3&gt;
                    &lt;p className="text-gray-300"&gt;Seamlessly integrate with your existing tech stack and workflows. Custom API access and dedicated integration support.&lt;/p&gt;
                &lt;/div&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Team Management&lt;/h3&gt;
                    &lt;p className="text-gray-300"&gt;Advanced roles and permissions, team hierarchies, and custom approval workflows for enterprise organizations.&lt;/p&gt;
                &lt;/div&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Custom Training&lt;/h3&gt;
                    &lt;p className="text-gray-300"&gt;Personalized onboarding and training programs for your teams. Regular check-ins and optimization reviews.&lt;/p&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gray-900"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="grid grid-cols-1 lg:grid-cols-2 gap-16"&gt;
                &lt;div&gt;
                    &lt;h2 className="text-4xl font-bold text-white mb-8"&gt;Why Choose Enterprise?&lt;/h2&gt;
                    &lt;div className="space-y-8"&gt;
                        &lt;div className="flex items-start space-x-4"&gt;
                            &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold"&gt;
                                1
                            &lt;/div&gt;
                            &lt;div&gt;
                                &lt;h3 className="text-lg font-semibold text-white mb-2"&gt;Scalable Infrastructure&lt;/h3&gt;
                                &lt;p className="text-gray-300"&gt;Dedicated resources that grow with your organization. Handle millions of interactions without performance impact.&lt;/p&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                        &lt;div className="flex items-start space-x-4"&gt;
                            &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold"&gt;
                                2
                            &lt;/div&gt;
                            &lt;div&gt;
                                &lt;h3 className="text-lg font-semibold text-white mb-2"&gt;Enhanced Security&lt;/h3&gt;
                                &lt;p className="text-gray-300"&gt;Enterprise-grade security features including SSO, custom security policies, and advanced encryption.&lt;/p&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                        &lt;div className="flex items-start space-x-4"&gt;
                            &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold"&gt;
                                3
                            &lt;/div&gt;
                            &lt;div&gt;
                                &lt;h3 className="text-lg font-semibold text-white mb-2"&gt;Priority Support&lt;/h3&gt;
                                &lt;p className="text-gray-300"&gt;24/7 dedicated support team, regular business reviews, and proactive monitoring.&lt;/p&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="lg:mt-0 mt-12"&gt;
                    &lt;div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-800"&gt;
                        &lt;h3 className="text-2xl font-bold text-white mb-8 text-center"&gt;Request Enterprise Demo&lt;/h3&gt;
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
                            &lt;div&gt;
                                &lt;label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="message"&gt;Message&lt;/label&gt;
                                &lt;textarea id="message" rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"&gt;&lt;/textarea&gt;
                            &lt;/div&gt;
                            &lt;button type="submit" className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition-all duration-200 font-medium"&gt;
                                Request Demo
                            &lt;/button&gt;
                        &lt;/form&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gradient-to-r from-primary to-accent text-white"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"&gt;
            &lt;h2 className="text-4xl font-bold mb-6"&gt;Ready to Scale Your Sales Operations?&lt;/h2&gt;
            &lt;p className="text-xl text-gray-300 mb-12"&gt;Get in touch with our enterprise sales team to learn how Mohit AI can transform your sales process&lt;/p&gt;
            &lt;div className="flex flex-col sm:flex-row justify-center gap-4"&gt;
                &lt;a href="#" className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-200"&gt;
                    Schedule Enterprise Demo
                &lt;/a&gt;
                &lt;a href="#" className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"&gt;
                    Contact Sales Team
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
    &lt;/footer&gt;`,
        }}
      />
    </>
  );
}
