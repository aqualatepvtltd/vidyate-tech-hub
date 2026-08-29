import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20 animate-subtle-fade">
      <SEO 
        title="Terms & Conditions | Vidyate Tech Hub" 
        description="Review the Terms and Conditions for using Vidyate Tech Hub's academic platform, textbooks store, and evaluation systems."
        keywords="Terms of Service, Usage Policy, Academic Disclaimer, Vidyate Rules, Student Agreement"
      />
      <Link to="/" className="inline-flex items-center gap-2 text-theme-muted hover:text-black transition-all font-black text-[10px] uppercase tracking-widest mb-8">
        <span className="material-symbols-rounded text-sm">home</span>
        Back to Home
      </Link>

      <div className="glass p-8 md:p-12 rounded-2xl border" style={{ borderColor: 'var(--glass-border)' }}>
        <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tighter" style={{ color: 'var(--text-main)' }}>
          Terms and Conditions
        </h1>

        <div className="prose prose-sm md:prose-base prose-invert max-w-none mt-6 space-y-6 text-xs md:text-sm font-medium opacity-85 leading-relaxed" style={{ color: 'var(--text-main)' }}>
          <section className="space-y-2">
            <h2 className="text-base font-black text-black underline decoration-1">1. Acceptance of Terms</h2>
            <p>By accessing or using the Vidyate Tech Hub website (the "Service"), you agree to be bound by these Terms and Conditions ("Terms"). These Terms apply to all visitors, users, and others who access or use the Service. If you disagree with any part of the terms, then you may not access the Service.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-black underline decoration-1">2. Use of Academic Resources</h2>
            <p>All study materials, programming templates, microprocessor code notebooks, and engineering curriculum checksheets ("Materials") provided on Vidyate are for your personal, non-commercial, and educational use only. These resources are intended to supplement, not replace, official college textbook directories or university lecture slides. You may not sell, distribute, or copy these Materials for profit without express written permission.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-black underline decoration-1">3. Disclaimer of Professional Engineering Advice</h2>
            <div className="p-4 rounded-xl border border-neutral-500/30 bg-neutral-500/5 text-neutral-800 text-xs">
              <p className="font-bold text-black">
                The codebase implementations, electronic circuit configurations, and mechanical system parameters (such as thermodynamic equations and microcontroller schemas) presented on Vidyate Tech Hub are for educational and classroom instruction purposes only. They do not constitute professional software development consultation, production code architecture, hardware design approvals, or safety-critical engineering advice. Always verify with certified professional engineers before implementing code or hardware configurations on physical systems.
              </p>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-black underline decoration-1">4. Textbook Store & Logistics</h2>
            <p>
              Vidyate Tech Hub operates a reference academic bookstore. Orders initiated via our checkout forms represent validation requests. Direct coordinates and transactions are confirmed manually. Shipments take 3-5 working days within India. We are not responsible for postal delays resulting from faulty shipping coordinates provided during checkout.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-black underline decoration-1">5. Certification Proctoring Consent</h2>
            <p>
              By joining proctored certification evaluations, you grant the browser permission to access camera, microphone, and signal latency feeds. This metadata is validated server-side to guarantee authentic, cheat-free scoring. Passing credentials are issued within 24 hours.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-neutral-200">
            <h2 className="text-base font-black text-black underline decoration-1">6. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at <a href="mailto:vidyatetechhub@gmail.com" className="hover:underline font-black">vidyatetechhub@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
