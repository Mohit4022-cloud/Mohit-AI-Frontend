import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security - Mohit AI',
  description: 'Mohit AI - Your AI SDR That Never Sleeps',
}

export default function SecurityPage() {
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
                    &lt;a href="/security" className="text-white font-semibold transition-colors"&gt;Security&lt;/a&gt;
                    &lt;a href="#" className="inline-flex items-center px-6 py-2.5 border border-black text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/20 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-200"&gt;
                        Get Started
                    &lt;/a&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/nav&gt;

    
    &lt;section className="pt-32 pb-20 bg-gray-900"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="text-center max-w-3xl mx-auto"&gt;
                &lt;h1 className="text-5xl font-bold text-white mb-8"&gt;Enterprise-Grade Security&lt;/h1&gt;
                &lt;p className="text-xl text-gray-300 mb-12"&gt;
                    Mohit AI is built with security-first architecture and maintains the highest standards of data protection and compliance.
                &lt;/p&gt;
                &lt;div className="flex justify-center gap-8 text-sm text-gray-300"&gt;
                    &lt;div className="flex items-center gap-2"&gt;
                        &lt;span className="font-semibold"&gt;SOC 2&lt;/span&gt; Compliant
                    &lt;/div&gt;
                    &lt;div className="flex items-center gap-2"&gt;
                        &lt;span className="font-semibold"&gt;GDPR&lt;/span&gt; Compliant
                    &lt;/div&gt;
                    &lt;div className="flex items-center gap-2"&gt;
                        &lt;span className="font-semibold"&gt;ISO 27001&lt;/span&gt; Certified
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gray-800"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-3 gap-8"&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Data Encryption&lt;/h3&gt;
                    &lt;p className="text-gray-300"&gt;All data is encrypted at rest and in transit using industry-standard AES-256 encryption and TLS 1.3 protocols.&lt;/p&gt;
                &lt;/div&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Access Control&lt;/h3&gt;
                    &lt;p className="text-gray-300"&gt;Role-based access control, SSO integration, and multi-factor authentication ensure secure user access.&lt;/p&gt;
                &lt;/div&gt;
                &lt;div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300"&gt;
                    &lt;h3 className="text-2xl font-bold text-white mb-4"&gt;Compliance&lt;/h3&gt;
                    &lt;p className="text-gray-300"&gt;Maintain compliance with SOC 2, GDPR, CCPA, and other major security and privacy regulations.&lt;/p&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gray-900"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="grid grid-cols-1 lg:grid-cols-2 gap-16"&gt;
                &lt;div&gt;
                    &lt;h2 className="text-4xl font-bold text-white mb-8"&gt;Our Security Measures&lt;/h2&gt;
                    &lt;div className="space-y-8"&gt;
                        &lt;div className="flex items-start space-x-4"&gt;
                            &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white"&gt;
                                &lt;svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                                    &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"  /&gt;
                                &lt;/svg&gt;
                            &lt;/div&gt;
                            &lt;div&gt;
                                &lt;h3 className="text-lg font-semibold text-white mb-2"&gt;Infrastructure Security&lt;/h3&gt;
                                &lt;ul className="space-y-2 text-gray-300"&gt;
                                    &lt;li&gt;• Regular security audits and penetration testing&lt;/li&gt;
                                    &lt;li&gt;• 24/7 infrastructure monitoring&lt;/li&gt;
                                    &lt;li&gt;• Automated vulnerability scanning&lt;/li&gt;
                                    &lt;li&gt;• DDoS protection and mitigation&lt;/li&gt;
                                &lt;/ul&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                        &lt;div className="flex items-start space-x-4"&gt;
                            &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white"&gt;
                                &lt;svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                                    &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"  /&gt;
                                &lt;/svg&gt;
                            &lt;/div&gt;
                            &lt;div&gt;
                                &lt;h3 className="text-lg font-semibold text-white mb-2"&gt;Data Protection&lt;/h3&gt;
                                &lt;ul className="space-y-2 text-gray-300"&gt;
                                    &lt;li&gt;• End-to-end encryption for all data&lt;/li&gt;
                                    &lt;li&gt;• Regular backup and disaster recovery&lt;/li&gt;
                                    &lt;li&gt;• Data retention and deletion policies&lt;/li&gt;
                                    &lt;li&gt;• Secure data transfer protocols&lt;/li&gt;
                                &lt;/ul&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                        &lt;div className="flex items-start space-x-4"&gt;
                            &lt;div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white"&gt;
                                &lt;svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                                    &lt;path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"  /&gt;
                                &lt;/svg&gt;
                            &lt;/div&gt;
                            &lt;div&gt;
                                &lt;h3 className="text-lg font-semibold text-white mb-2"&gt;Compliance &amp; Certifications&lt;/h3&gt;
                                &lt;ul className="space-y-2 text-gray-300"&gt;
                                    &lt;li&gt;• SOC 2 Type II certified&lt;/li&gt;
                                    &lt;li&gt;• GDPR and CCPA compliant&lt;/li&gt;
                                    &lt;li&gt;• ISO 27001 certified&lt;/li&gt;
                                    &lt;li&gt;• Regular compliance audits&lt;/li&gt;
                                &lt;/ul&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="lg:mt-0 mt-12"&gt;
                    &lt;div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-800"&gt;
                        &lt;h3 className="text-2xl font-bold text-white mb-8"&gt;Security Documentation&lt;/h3&gt;
                        &lt;div className="space-y-6"&gt;
                            &lt;a href="#" className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-100 transition-all duration-200"&gt;
                                &lt;h4 className="text-lg font-semibold text-white mb-2"&gt;Security Whitepaper&lt;/h4&gt;
                                &lt;p className="text-gray-300"&gt;Detailed overview of our security architecture and practices&lt;/p&gt;
                            &lt;/a&gt;
                            &lt;a href="#" className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-100 transition-all duration-200"&gt;
                                &lt;h4 className="text-lg font-semibold text-white mb-2"&gt;Compliance Reports&lt;/h4&gt;
                                &lt;p className="text-gray-300"&gt;Access our latest compliance certifications and reports&lt;/p&gt;
                            &lt;/a&gt;
                            &lt;a href="#" className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-100 transition-all duration-200"&gt;
                                &lt;h4 className="text-lg font-semibold text-white mb-2"&gt;Privacy Policy&lt;/h4&gt;
                                &lt;p className="text-gray-300"&gt;Learn about our data privacy practices and policies&lt;/p&gt;
                            &lt;/a&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/section&gt;

    
    &lt;section className="py-20 bg-gradient-to-r from-primary to-accent text-white"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"&gt;
            &lt;h2 className="text-4xl font-bold mb-6"&gt;Ready to Learn More About Our Security?&lt;/h2&gt;
            &lt;p className="text-xl text-gray-300 mb-12"&gt;Schedule a call with our security team to discuss your specific requirements&lt;/p&gt;
            &lt;div className="flex flex-col sm:flex-row justify-center gap-4"&gt;
                &lt;a href="#" className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-200"&gt;
                    Schedule Security Review
                &lt;/a&gt;
                &lt;a href="#" className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"&gt;
                    Download Security Whitepaper
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
                &lt;div&gt;` }} />
    </>
  )
}
