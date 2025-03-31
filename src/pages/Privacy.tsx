
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function Privacy() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-12">
          <PageHeader 
            title="Privacy Policy" 
            description="Last updated: August 15, 2023"
          />
          
          <div className="prose prose-lg dark:prose-invert max-w-4xl">
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
              <p>
                At Chakravyuh, we are committed to protecting your privacy and ensuring you have a positive experience on our website. This privacy policy applies to the Chakravyuh website and learning platform ("Services") and governs our data collection, processing, and usage practices.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">2. Information We Collect</h2>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">2.1 Personal Information</h3>
              <p>
                When you register for Chakravyuh, we collect information that identifies you, such as your name, email address, and phone number. We may also collect additional information you provide when setting up your profile, such as your educational background, learning goals, and preferences.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">2.2 Usage Data</h3>
              <p>
                We automatically collect information about how you interact with our Services, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Study patterns and time spent on different topics</li>
                <li>Test scores and performance data</li>
                <li>Features and pages you access</li>
                <li>Device information (browser type, operating system, device type)</li>
                <li>IP address and geographical location</li>
              </ul>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">3. How We Use Your Information</h2>
              <p>
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Provide personalized learning experiences</li>
                <li>Improve our teaching methodologies and content</li>
                <li>Analyze performance trends to enhance our adaptive learning algorithms</li>
                <li>Communicate with you about your account and service updates</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Ensure the security and integrity of our Services</li>
              </ul>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">4. Data Sharing and Disclosure</h2>
              <p>
                We do not sell, rent, or trade your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Service providers who help us operate our platform</li>
                <li>Educational partners who provide content or services through our platform</li>
                <li>When required by law or to protect our legal rights</li>
              </ul>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">5. Your Rights and Choices</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate data</li>
                <li>Deletion of your data (subject to certain limitations)</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at privacy@chakravyuh.edu.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section>
              <h2 className="text-xl font-bold mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4">
                <p>Chakravyuh Learning Pvt. Ltd.</p>
                <p>123 Education Street, Tech Park</p>
                <p>Bangalore, Karnataka 560001</p>
                <p>India</p>
                <p>Email: privacy@chakravyuh.edu</p>
              </div>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
