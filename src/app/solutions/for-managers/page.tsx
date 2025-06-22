import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Sales Managers - Mohit AI",
  description: "Mohit AI - Your AI SDR That Never Sleeps",
};

export default function ManagersPage() {
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
                        Empower Your Sales Team with AI-Driven Insights
                    &lt;/h1&gt;
                    &lt;p className="text-xl text-gray-300 mb-12"&gt;
                        Get complete visibility into your team's performance, automate routine tasks, and coach your reps to success with Mohit AI's manager tools.
                    &lt;/p&gt;
                    &lt;div className="flex gap-4 mb-12"&gt;
                        &lt;a href="#" className="inline-flex items-center px-8 py-3 bg-gradient-primary text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200"&gt;
                            Start Free Trial
                        &lt;/a&gt;
                        &lt;a href="#" className="inline-flex items-center px-8 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-all duration-200"&gt;
                            View Demo
                        &lt;/a&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="lg:mt-0 mt-12"&gt;
                    &lt;div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-800"&gt;
                        &lt;h3 className="text-2xl font-bold text-white mb-8"&gt;Manager Dashboard Overview&lt;/h3&gt;
                        &lt;ul className="space-y-6"&gt;
                            &lt;li className="flex items-start space-x-4"&gt;
                                &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white"&gt;
                                    &lt;svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                                        &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"  /&gt;
                                    &lt;/svg&gt;
                                &lt;/div&gt;
                                &lt;div&gt;
                                    &lt;h4 className="text-lg font-semibold text-white mb-2"&gt;Real-Time Analytics&lt;/h4&gt;
                                    &lt;p className="text-gray-300"&gt;Monitor team performance and track key metrics in real-time&lt;/p&gt;
                                &lt;/div&gt;
                            &lt;/li&gt;
                            &lt;li className="flex items-start space-x-4"&gt;
                                &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white"&gt;
                                    &lt;svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                                        &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"  /&gt;
                                    &lt;/svg&gt;
                                &lt;/div&gt;
                                &lt;div&gt;
                                    &lt;h4 className="text-lg font-semibold text-white mb-2"&gt;AI-Powered Coaching&lt;/h4&gt;
                                    &lt;p className="text-gray-300"&gt;Get AI-generated insights and coaching recommendations&lt;/p&gt;
                                &lt;/div&gt;
                            &lt;/li&gt;
                            &lt;li className="flex items-start space-x-4"&gt;
                                &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white"&gt;
                                    &lt;svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                                        &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"  /&gt;
                                    &lt;/svg&gt;
                                &lt;/div&gt;
                                &lt;div&gt;
                                    &lt;h4 className="text-lg font-semibold text-white mb-2"&gt;Automated Reporting&lt;/h4&gt;
                                    &lt;p className="text-gray-300"&gt;Customizable reports delivered automatically to your inbox&lt;/p&gt;
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
                &lt;h2 className="text-4xl font-bold text-white mb-6"&gt;Tools Built for Sales Leaders&lt;/h2&gt;
                &lt;p className="text-xl text-gray-300"&gt;Everything you need to manage, coach, and scale your sales team&lt;/p&gt;
            &lt;/div&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-3 gap-8"&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Performance Analytics&lt;/h3&gt;
                    &lt;p className="text-gray-300"&gt;Track individual and team performance metrics, identify trends, and spot opportunities for improvement.&lt;/p&gt;
                &lt;/div&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Call Coaching&lt;/h3&gt;
                    &lt;p className="text-gray-300"&gt;AI-powered call analysis provides insights and coaching recommendations for every conversation.&lt;/p&gt;
                &lt;/div&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Pipeline Management&lt;/h3&gt;
                    &lt;p className="text-gray-300"&gt;Get a clear view of your team's pipeline with AI-driven forecasting and risk analysis.&lt;/p&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gray-900"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="grid grid-cols-1 lg:grid-cols-2 gap-16"&gt;
                &lt;div&gt;
                    &lt;h2 className="text-4xl font-bold text-white mb-8"&gt;Transform Your Sales Leadership&lt;/h2&gt;
                    &lt;div className="space-y-8"&gt;
                        &lt;div className="flex items-start space-x-4"&gt;
                            &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold"&gt;
                                1
                            &lt;/div&gt;
                            &lt;div&gt;
                                &lt;h3 className="text-lg font-semibold text-white mb-2"&gt;Data-Driven Decisions&lt;/h3&gt;
                                &lt;p className="text-gray-300"&gt;Make informed decisions with real-time data and AI-powered insights into your team's performance.&lt;/p&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                        &lt;div className="flex items-start space-x-4"&gt;
                            &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold"&gt;
                                2
                            &lt;/div&gt;
                            &lt;div&gt;
                                &lt;h3 className="text-lg font-semibold text-white mb-2"&gt;Efficient Coaching&lt;/h3&gt;
                                &lt;p className="text-gray-300"&gt;Scale your coaching efforts with AI-generated insights and recommendations for each team member.&lt;/p&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                        &lt;div className="flex items-start space-x-4"&gt;
                            &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold"&gt;
                                3
                            &lt;/div&gt;
                            &lt;div&gt;
                                &lt;h3 className="text-lg font-semibold text-white mb-2"&gt;Increased Productivity&lt;/h3&gt;
                                &lt;p className="text-gray-300"&gt;Automate routine tasks and reporting to focus on strategic initiatives and team development.&lt;/p&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="lg:mt-0 mt-12"&gt;
                    &lt;div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-800"&gt;
                        &lt;h3 className="text-2xl font-bold text-white mb-8 text-center"&gt;Schedule a Demo&lt;/h3&gt;
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
                                &lt;label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="team-size"&gt;Team size&lt;/label&gt;
                                &lt;select id="team-size" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"&gt;
                                    &lt;option value=""&gt;Select team size&lt;/option&gt;
                                    &lt;option value="1-5"&gt;1-5 SDRs&lt;/option&gt;
                                    &lt;option value="6-15"&gt;6-15 SDRs&lt;/option&gt;
                                    &lt;option value="16-30"&gt;16-30 SDRs&lt;/option&gt;
                                    &lt;option value="31+"&gt;31+ SDRs&lt;/option&gt;
                                &lt;/select&gt;
                            &lt;/div&gt;
                            &lt;button type="submit" className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition-all duration-200 font-medium"&gt;
                                Schedule Demo
                            &lt;/button&gt;
                        &lt;/form&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gradient-to-r from-primary to-accent text-white"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"&gt;
            &lt;h2 className="text-4xl font-bold mb-6"&gt;Ready to Transform Your Sales Team?&lt;/h2&gt;
            &lt;p className="text-xl text-gray-300 mb-12"&gt;Join hundreds of sales leaders who use Mohit AI to drive better results&lt;/p&gt;
            &lt;div className="flex flex-col sm:flex-row justify-center gap-4"&gt;
                &lt;a href="#" className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-200"&gt;
                    Start Free Trial
                &lt;/a&gt;
                &lt;a href="#" className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"&gt;
                    Schedule Demo
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
