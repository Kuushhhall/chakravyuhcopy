
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function Cookies() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-12">
          <PageHeader 
            title="Cookie Policy" 
            description="Last updated: August 15, 2023"
          />
          
          <div className="prose prose-lg dark:prose-invert max-w-4xl">
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">1. What Are Cookies</h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
              <p className="mt-4">
                At Chakravyuh, we use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver personalized content.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">2. Types of Cookies We Use</h2>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">2.1 Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function properly. They enable core functionality such as security, account authentication, and remembering your preferences. You cannot opt out of these cookies.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">2.2 Performance Cookies</h3>
              <p>
                These cookies collect information about how you use our website, such as which pages you visit most often and if you experience any errors. This helps us improve how our website works and understand which areas are of most interest to our users.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">2.3 Functionality Cookies</h3>
              <p>
                These cookies allow the website to remember choices you make (such as your username, language preference, or the region you are in) and provide enhanced, more personal features.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">2.4 Targeting/Advertising Cookies</h3>
              <p>
                These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">3. Third-Party Cookies</h2>
              <p>
                We may allow third-party service providers to place cookies on our website to perform various functions. These third parties may collect your information for their own purposes.
              </p>
              <p className="mt-4">
                We use services from the following third parties that may place cookies on your device:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Google Analytics (web analytics)</li>
                <li>Hotjar (user behavior analytics)</li>
                <li>Facebook Pixel (advertising)</li>
                <li>Intercom (customer messaging)</li>
              </ul>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">4. Managing Cookies</h2>
              <p>
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Delete all cookies from your browser</li>
                <li>Block all cookies by activating settings on your browser</li>
                <li>Block specific cookies from particular sites</li>
                <li>Set your browser to notify you when you receive a cookie</li>
              </ul>
              <p className="mt-4">
                Please note that if you choose to block or delete cookies, you may not be able to access certain areas or features of our website, and some services may not function properly.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section>
              <h2 className="text-xl font-bold mb-4">5. Changes to Our Cookie Policy</h2>
              <p>
                We may update our Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
              <p className="mt-4">
                If you have any questions about our Cookie Policy, please contact us at privacy@chakravyuh.edu.
              </p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
