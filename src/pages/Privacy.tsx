import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20 animate-subtle-fade">
      <SEO 
        title="Privacy Policy | Vidyate Tech Hub" 
        description="Read Vidyate's Privacy Policy to understand how we collect, use, and protect your personal information and engineering academic data."
        keywords="Privacy Policy, Data Protection, Student Data Privacy, Vidyate Terms, Information Security"
      />
      <Link to="/" className="inline-flex items-center gap-2 text-theme-muted hover:text-black transition-all font-black text-[10px] uppercase tracking-widest mb-8">
        <span className="material-symbols-rounded text-sm">home</span>
        Back to Home
      </Link>

      <div className="glass p-8 md:p-12 rounded-2xl border" style={{ borderColor: 'var(--glass-border)' }}>
        <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tighter" style={{ color: 'var(--text-main)' }}>
          Privacy Policy
        </h1>

        <div className="prose prose-sm md:prose-base prose-invert max-w-none mt-6 space-y-6 text-xs md:text-sm font-medium opacity-85 leading-relaxed" style={{ color: 'var(--text-main)' }}>
          <p>Vidyate Tech Hub ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services (collectively, the "Services"). Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>

          <section className="space-y-2">
            <h2 className="text-base font-black text-black underline decoration-1">1. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the Service includes:</p>
            <h3 className="font-bold text-black">Personal Data</h3>
            <p>Personally identifiable information, such as your name, email address, and billing metadata, that you voluntarily give to us when you subscribe to our newsletters, check out reference textbook orders, or register support inquiries.</p>
            <h3 className="font-bold text-black">Derivative Data</h3>
            <p>Information our servers automatically collect when you access the Services, such as your IP address, browser type, operating system, and access times. This data helps us monitor geographic performance in India and refine database loading times.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-black underline decoration-1">2. Use of Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Services to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Process textbook order shipments and handle invoice correspondence.</li>
              <li>Send engineering alerts, programming worksheets, lecture syllabus modules, and date-sheet changes.</li>
              <li>Address service tickets, technical bugs, or proctoring access hurdles.</li>
              <li>Audit system abuse, prevent duplicate submissions, and block malicious traffic.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-black underline decoration-1">3. Third-Party Service Providers</h2>
            <p>We do not share, sell, or lease your private coordinates with commercial agencies. We leverage reliable external SDKs strictly for system operations:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Web3Forms:</strong> Handles academic and contact form transmissions securely.</li>
              <li><strong>Google Drive API:</strong> Coordinates study notes folders downloads.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-black underline decoration-1">4. Data Retention</h2>
            <p>We retain subscriber credentials and book receipt logs only for as long as necessary to complete book shipments, resolve billing disputes, or fulfill academic service obligations.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-black underline decoration-1">5. Children's Privacy</h2>
            <p>Vidyate Tech Hub does not actively collect personally identifiable info from individuals under 13. If we discover an underage registration, we instantly scrub the database profile logs.</p>
          </section>

          <section className="space-y-2 pt-4 border-t border-neutral-200">
            <h2 className="text-base font-black text-black underline decoration-1">6. Contact Us</h2>
            <p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <a href="mailto:vidyatetechhub@gmail.com" className="hover:underline font-black">vidyatetechhub@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
