
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function Terms() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-12">
          <PageHeader 
            title="Terms of Service" 
            description="Last updated: August 15, 2023"
          />
          
          <div className="prose prose-lg dark:prose-invert max-w-4xl">
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Chakravyuh website and learning platform ("Services"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">2. Description of Services</h2>
              <p>
                Chakravyuh provides an AI-powered adaptive learning platform for JEE preparation. Our Services include study materials, practice questions, performance tracking, personalized learning paths, and other educational tools.
              </p>
              <p className="mt-4">
                We reserve the right to modify, suspend, or discontinue any part of the Services at any time without prior notice. We will not be liable to you or any third party for any such modification, suspension, or discontinuation.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">3. User Accounts</h2>
              <p>
                To access certain features of our Services, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p className="mt-4">
                You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">4. Content and Intellectual Property</h2>
              <p>
                All content provided through our Services, including text, graphics, logos, images, videos, and software, is owned by Chakravyuh or its licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="mt-4">
                We grant you a limited, non-exclusive, non-transferable, and revocable license to use our Services and content for personal, non-commercial educational purposes only. You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information or content obtained from our Services.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">5. Prohibited Conduct</h2>
              <p>
                You agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Use our Services for any illegal purpose</li>
                <li>Attempt to gain unauthorized access to any part of our Services</li>
                <li>Interfere with or disrupt the Services or servers</li>
                <li>Share your account credentials with others</li>
                <li>Engage in any automated use of the system</li>
                <li>Use the Services to send unsolicited communications</li>
                <li>Attempt to bypass any measures designed to prevent or restrict access</li>
              </ul>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">6. Disclaimers and Limitations of Liability</h2>
              <p>
                Our Services are provided "as is" without warranties of any kind, either express or implied. We do not guarantee that our Services will be uninterrupted, secure, or error-free.
              </p>
              <p className="mt-4">
                To the maximum extent permitted by law, Chakravyuh shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the Services.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section>
              <h2 className="text-xl font-bold mb-4">7. Changes to Terms</h2>
              <p>
                We may update these Terms of Service from time to time. We will notify you of any changes by posting the new Terms on this page. Your continued use of the Services after such changes constitutes your acceptance of the new Terms.
              </p>
              <p className="mt-4">
                If you have any questions about these Terms, please contact us at legal@chakravyuh.edu.
              </p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
