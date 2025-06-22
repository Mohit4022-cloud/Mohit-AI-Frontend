import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product - Mohit AI",
  description: "Mohit AI - Your AI SDR That Never Sleeps",
};

export default function ProductPage() {
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
                    &lt;a href="/product" className="text-white font-semibold transition-colors"&gt;Product&lt;/a&gt;
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
                                &lt;a href="/for-sdrs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"&gt;For SDRs&lt;/a&gt;
                                &lt;a href="/for-managers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"&gt;For Managers&lt;/a&gt;
                                &lt;a href="/enterprise" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"&gt;Enterprise&lt;/a&gt;
                                &lt;a href="/small-business" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"&gt;Small Business&lt;/a&gt;
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

    
    &lt;section className="pt-32 pb-20 bg-white"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="text-center max-w-3xl mx-auto mb-16"&gt;
                &lt;h1 className="text-5xl font-bold text-black mb-6"&gt;One Platform for All Your Sales Outreach&lt;/h1&gt;
                &lt;p className="text-xl text-gray-600"&gt;Mohit AI combines AI-powered calling, intelligent messaging, and advanced analytics to automate your entire sales development process.&lt;/p&gt;
            &lt;/div&gt;
            &lt;div className="relative"&gt;
                &lt;div className="bg-gray-100 rounded-2xl p-8 aspect-video flex items-center justify-center"&gt;
                    &lt;p className="text-gray-500"&gt;Platform Demo Video Coming Soon&lt;/p&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gray-50"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-3 gap-8"&gt;
                
                &lt;div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6"&gt;
                        &lt;svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                            &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /&gt;
                        &lt;/svg&gt;
                    &lt;/div&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;AI Calling&lt;/h3&gt;
                    &lt;p className="text-gray-600 mb-6"&gt;Make hundreds of personalized calls daily using natural voice AI. Our system handles objections, qualifies prospects, and books meetings automatically.&lt;/p&gt;
                    &lt;ul className="space-y-4"&gt;
                        &lt;li className="flex items-start"&gt;
                            &lt;div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm"&gt;✓&lt;/div&gt;
                            &lt;span className="ml-3 text-gray-600"&gt;Natural voice conversations&lt;/span&gt;
                        &lt;/li&gt;
                        &lt;li className="flex items-start"&gt;
                            &lt;div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm"&gt;✓&lt;/div&gt;
                            &lt;span className="ml-3 text-gray-600"&gt;Real-time objection handling&lt;/span&gt;
                        &lt;/li&gt;
                        &lt;li className="flex items-start"&gt;
                            &lt;div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm"&gt;✓&lt;/div&gt;
                            &lt;span className="ml-3 text-gray-600"&gt;Automatic meeting scheduling&lt;/span&gt;
                        &lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;

                
                &lt;div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6"&gt;
                        &lt;svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                            &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /&gt;
                        &lt;/svg&gt;
                    &lt;/div&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;AI Messaging&lt;/h3&gt;
                    &lt;p className="text-gray-600 mb-6"&gt;Send personalized emails, LinkedIn messages, and SMS based on prospect research and buying signals. Follow up automatically until you get a response.&lt;/p&gt;
                    &lt;ul className="space-y-4"&gt;
                        &lt;li className="flex items-start"&gt;
                            &lt;div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm"&gt;✓&lt;/div&gt;
                            &lt;span className="ml-3 text-gray-600"&gt;Multi-channel outreach&lt;/span&gt;
                        &lt;/li&gt;
                        &lt;li className="flex items-start"&gt;
                            &lt;div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm"&gt;✓&lt;/div&gt;
                            &lt;span className="ml-3 text-gray-600"&gt;Personalized messaging&lt;/span&gt;
                        &lt;/li&gt;
                        &lt;li className="flex items-start"&gt;
                            &lt;div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm"&gt;✓&lt;/div&gt;
                            &lt;span className="ml-3 text-gray-600"&gt;Smart follow-up sequences&lt;/span&gt;
                        &lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;

                
                &lt;div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6"&gt;
                        &lt;svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                            &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /&gt;
                        &lt;/svg&gt;
                    &lt;/div&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Platform&lt;/h3&gt;
                    &lt;p className="text-gray-600 mb-6"&gt;A comprehensive platform that integrates with your existing tools and provides powerful analytics to optimize your sales process.&lt;/p&gt;
                    &lt;ul className="space-y-4"&gt;
                        &lt;li className="flex items-start"&gt;
                            &lt;div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm"&gt;✓&lt;/div&gt;
                            &lt;span className="ml-3 text-gray-600"&gt;CRM integration&lt;/span&gt;
                        &lt;/li&gt;
                        &lt;li className="flex items-start"&gt;
                            &lt;div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm"&gt;✓&lt;/div&gt;
                            &lt;span className="ml-3 text-gray-600"&gt;Advanced analytics&lt;/span&gt;
                        &lt;/li&gt;
                        &lt;li className="flex items-start"&gt;
                            &lt;div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm"&gt;✓&lt;/div&gt;
                            &lt;span className="ml-3 text-gray-600"&gt;Custom workflows&lt;/span&gt;
                        &lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-white"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="text-center max-w-3xl mx-auto mb-16"&gt;
                &lt;h2 className="text-4xl font-bold text-black mb-6"&gt;Everything You Need in One Place&lt;/h2&gt;
                &lt;p className="text-xl text-gray-600"&gt;Mohit AI combines powerful features to streamline your sales development process.&lt;/p&gt;
            &lt;/div&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-2 gap-16"&gt;
                
                &lt;div className="space-y-12"&gt;
                    &lt;div&gt;
                        &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Intelligent Lead Generation&lt;/h3&gt;
                        &lt;p className="text-gray-600"&gt;Our AI analyzes millions of data points to find and prioritize the best prospects for your business.&lt;/p&gt;
                    &lt;/div&gt;
                    &lt;div&gt;
                        &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Smart Engagement&lt;/h3&gt;
                        &lt;p className="text-gray-600"&gt;Automatically engage prospects across multiple channels with personalized messaging that gets responses.&lt;/p&gt;
                    &lt;/div&gt;
                    &lt;div&gt;
                        &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Meeting Scheduling&lt;/h3&gt;
                        &lt;p className="text-gray-600"&gt;When prospects show interest, Mohit AI automatically schedules meetings with your sales team.&lt;/p&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
                
                &lt;div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center"&gt;
                    &lt;p className="text-gray-500"&gt;Platform Screenshot Coming Soon&lt;/p&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gray-50"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="text-center max-w-3xl mx-auto mb-16"&gt;
                &lt;h2 className="text-4xl font-bold text-black mb-6"&gt;Works With Your Existing Tools&lt;/h2&gt;
                &lt;p className="text-xl text-gray-600"&gt;Mohit AI integrates seamlessly with your favorite CRM and sales tools.&lt;/p&gt;
            &lt;/div&gt;
            &lt;div className="grid grid-cols-2 md:grid-cols-4 gap-8"&gt;
                &lt;div className="bg-white p-8 rounded-2xl border border-gray-100 flex items-center justify-center"&gt;
                    &lt;span className="text-gray-400"&gt;Salesforce&lt;/span&gt;
                &lt;/div&gt;
                &lt;div className="bg-white p-8 rounded-2xl border border-gray-100 flex items-center justify-center"&gt;
                    &lt;span className="text-gray-400"&gt;HubSpot&lt;/span&gt;
                &lt;/div&gt;
                &lt;div className="bg-white p-8 rounded-2xl border border-gray-100 flex items-center justify-center"&gt;
                    &lt;span className="text-gray-400"&gt;Outreach&lt;/span&gt;
                &lt;/div&gt;
                &lt;div className="bg-white p-8 rounded-2xl border border-gray-100 flex items-center justify-center"&gt;
                    &lt;span className="text-gray-400"&gt;SalesLoft&lt;/span&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-black text-white"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"&gt;
            &lt;h2 className="text-4xl font-bold mb-6"&gt;Ready to Transform Your Sales Process?&lt;/h2&gt;
            &lt;p className="text-xl text-gray-300 mb-12"&gt;Join thousands of companies using Mohit AI to automate their sales development.&lt;/p&gt;
            &lt;div className="flex flex-col sm:flex-row justify-center gap-4"&gt;
                &lt;a href="/dashboard" className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300"&gt;
                    Login to Dashboard
                &lt;/a&gt;
                &lt;a href="/demo" className="inline-flex items-center justify-center px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"&gt;
                    Watch Demo
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
                        &lt;li&gt;&lt;a href="#" className="text-gray-600 hover:text-black transition-colors"&gt;About&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-600 hover:text-black transition-colors"&gt;Blog&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-600 hover:text-black transition-colors"&gt;Careers&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a href="#" className="text-gray-600 hover:text-black transition-colors"&gt;Contact&lt;/a&gt;&lt;/li&gt;
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
    &lt;/footer&gt;`,
        }}
      />
    </>
  );
}
