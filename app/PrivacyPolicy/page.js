import Footer from '@/Components/FooterA11y';
import Header from '@/Components/Header';
import Image from 'next/image';

export default function PrivacyPolicy() {
  return (
    <>
    <Header />
    <main id="main-content" tabIndex={-1}>
    
    <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative w-full h-[20vh] sm:h-[20vh] md:h-[20vh] lg:h-[40vh] overflow-hidden">
                  <Image
                    src="/images/pic5.jpg" // make sure this path is correct
                    alt=""
                    aria-hidden="true"
                    fill
                    className="object-cover object-top z-0"
                    priority
                  />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-black text-center px-4 sm:px-8 lg:px-20 z-10">
                    {/* Heading with animated underline */}
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                     Privacy Policy
                    </h1>
                    <p>Last updated: July 03, 2025</p>
                </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-8">
            <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Overview of the Privacy Policy:
                </h2>
            
                <div className="text-gray-700 leading-relaxed space-y-6">
                    <p>Welcome to www.sproutresearch.in (the “Website”), owned by Sprout Research (“Sprout Research,” “we,” “us,” or “our”), whose Proprietor is Shikha Kapur. We respect the privacy of our users (“user” or “you”). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Website, www.sproutresearch.in. Please read this Privacy Policy carefully. If you do not agree with its terms, please do not access the Website</p>
                    <p>We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about changes by updating the “Last Updated” date of this Privacy Policy. Any changes or modifications will be effective immediately upon posting the updated Privacy Policy on the Website, and you waive the right to receive specific notice of each change or modification. You are encouraged to periodically review this Privacy Policy to stay informed of updates. Your continued use of the Website after the revised Privacy Policy is posted constitutes your awareness of, and acceptance of, the changes</p>                
                </div>

               <div className="text-gray-700 leading-relaxed space-y-6">
                <ul className='list-decimal pl-6'>
                    <li><p className='font-bold'>Collection and Use of Personal Information</p>
                        <p>We may collect information about you in various ways. The information we may collect on the Website includes:</p>
                        <ul className='list-disc pl-6'>
                            <li>Personally Identifiable Information: This includes your name, shipping address, email address, mobile number, telephone number, and demographic information such as your age/date of birth, gender, country of birth, country of residence, employment status, income, source of wealth, Permanent Account Number (PAN), GSTIN, and interests that you voluntarily provide when registering with the Website.</li>
                            <li>Participation in Website Activities: Information you provide when participating in activities related to the Website, such as giving feedback or when you or your organization offer to provide services to us</li>
                            <li>Third-Party Sources: In some cases, we collect personal data from third-party sources, such as your organization, other organizations with which you have dealings, government agencies, credit reporting agencies, fraud prevention agencies, financial crime agencies, or publicly available records.</li>
                            <li>Voluntary Submission: You are under no obligation to provide personal information, but refusal to do so may prevent you from using certain Website features. We may use personal information for internal purposes, such as auditing, data analysis, and research to improve Sprout Research’s products, services, and customer communications</li>
                            <li>Automatically Collected Information: Our servers automatically collect data when you access the Website, including your IP address, browser type, operating system, access times, and the pages you viewed directly before and after accessing the Website</li>
                            <li>Financial Information: We may collect data related to your payment method (e.g., valid credit card number, card brand, expiration date) when you purchase, order, return, exchange, or request information about our services. We store only limited financial information, if any. Most financial information is stored by our payment processor. You are encouraged to review their privacy policy and contact them directly with any questions</li>
                            <li>Aggregated Data: We may collect information about customer activities on our Website and from our other products and services. This information may be aggregated and used to provide more useful information to our customers and to understand which parts of our Website, products, and services are of most interest. Aggregated data is considered non-personal information for the purposes of this Privacy Policy. If non-personal information is combined with personal information, the combined information will be treated as personal information for as long as it remains combined</li>
                            <li>Cookies: www.sproutresearch.in uses cookies (small files sent by the Website to your computer or other access device), which we can access during future visits. Cookies enable you to browse the Website and use its features. We use cookies to measure and analyze how customers use the Website, allowing us to improve the Website and your experience. Cookies also remember your preferences (e.g., username, language, or location) to make your browsing experience simpler, easier, and more personalized. Additionally, cookies help deliver relevant advertisements, limit the frequency of ads you see, and measure the effectiveness of advertising campaigns. By using the Website, you agree that we may place these cookies on your device and access them during future visits. To delete cookies already on your computer, refer to the help and support section of your internet browser for instructions</li>
                            <li>Consent to Communications: By submitting your contact information (e.g., email, phone number, name), you agree to receive news, offers, and other promotional material from Sprout Research. You consent to Sprout Research, its affiliates, and service providers processing your personal data for these purposes as described in this Privacy Policy. You may withdraw your consent at any time.</li>
                        </ul>
                    </li>
                    <li><p className='font-bold'>Use of Your Information</p>
                        <p>Having accurate information about you enables us to provide a smooth, efficient, and customized experience. We may use information collected via the Website to:</p>
                         <ul className='list-disc pl-6'>
                           <li>Assist law enforcement agencies;</li>
                           <li>Compile anonymous statistical data and analysis for use internally or with third parties;</li>
                           <li>Create and manage your account</li>
                           <li>Process your application to use our services and to provide you with the requested services</li>
                           <li>Comply with our obligations arising from any contracts entered into between you and us and to provide with the information, products and services that you requested from us</li>
                           <li>Protect your information and prevent unauthorized access;</li>
                           <li>Address queries, complaints, or problems you report;</li>
                           <li>Email you regarding your account or order;</li>
                           <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Website;</li>
                           <li>Generate a personal profile to make future visits to the Website more personalized;</li>
                           <li>Increase the efficiency and operation of the Website;</li>
                           <li>Monitor and analyze usage and trends to improve your experience;</li>
                           <li>Notify you of Website updates;</li>
                           <li>Offer new products, services, and/or recommendations;</li>
                           <li>Perform other business activities as needed;</li>
                           <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity;</li>
                           <li>Process payments and refunds;</li>
                           <li>Request feedback and contact you about your use of the Website;</li>
                           <li>Resolve disputes and troubleshoot problems;</li>
                           <li>Respond to product and customer service requests;</li>
                           <li>Send you a newsletter.</li>
                        </ul>
                    </li>
                    <li>
                        <p className='font-bold'>Disclosure of Your Information</p>
                        <p>We may share your information if we believe it is necessary to respond to legal processes, investigate or remedy potential violations of our policies, or protect the rights, property, and safety of others, as permitted or required by applicable law, rule, or regulation. This includes exchanging information with other entities for fraud protection and credit risk reduction.</p>
                    </li>
                    <li>
                        <p className='font-bold'>Third-Party Service Providers</p>
                        <p>We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</p>
                    </li>
                    <li>
                        <p className='font-bold'>Marketing Communications</p>
                        <p>With your consent, or with an opportunity to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.</p>
                    </li>
                    <li>
                        <p className='font-bold'>Third-Party Advertising</p>
                        <p>We may use third-party advertising companies to serve ads when you visit the Website. These companies may use information about your visits to the Website and other websites, contained in web cookies, to provide advertisements about goods and services of interest to you.</p>
                    </li>
                    <li>
                        <p className='font-bold'>Business Analysis</p>
                        <p>We may share your information with advertisers and investors for general business analysis. We may also share information with our appointed auditors, accountants, lawyers, and other professional advisers (e.g., compliance consultants) to the extent necessary for them to advise us.</p>
                    </li>
                    <li>
                        <p className='font-bold'>Security of Your Information</p>
                        <p>The security of your personal information is important to us. Sprout Research takes precautions, including administrative, technical, procedural, and physical measures, to safeguard your personal information against loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>
                    </li>
                    <li>
                        <p className='font-bold'>Updates to the Privacy Policy</p>
                        <p>www.sproutresearch.in reserves the right to amend this Privacy Policy at any time. Modified policies will be updated on the Website, and we will notify you by updating the “Last Updated” date. We encourage you to review this Privacy Policy whenever you visit our Website to understand how your personal information is used.</p>
                    </li>
                    <li>
                        <p className='font-bold'>Legal Disclosure</p>
                        <p>www.sproutresearch.in reserves the right to disclose your personally identifiable information as required by law or when we believe disclosure is necessary to protect our rights and/or comply with a judicial proceeding, court order, or legal process.</p>
                    </li>
                    <li>
                        <p className='font-bold'> Opting Out of Communications</p>
                        <p>The Website provides the opportunity to stop receiving communications from Sprout Research. To do so, please send an email to sproutresearch.equity@gmail.com .</p>
                    </li>
                    <li>
                        <p className='font-bold'>Contact Us</p>
                        <p>If you have questions about this Privacy Policy, the Website, or your dealings with the Website, please contact a Sprout Research representative by emailing sproutresearch.equity@gmail.com </p>
                    </li>
                </ul>
            </div>

            </div>
        </div>

        

    </div>

    </main>
    <Footer />
    </>
  );
}

