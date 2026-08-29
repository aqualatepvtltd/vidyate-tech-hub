import React from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';

const TestPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as { testLink?: string } | null;
  const testLink = state?.testLink || 'https://forms.gle/guK5eFywtFd9mCQx7';

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20 animate-subtle-fade">
      <SEO
        title="Certification Test"
        description="Take the Vidyate certification test. Read the instructions, follow the rules, and complete the Google Form test securely."
        keywords="Vidyate test page, certification exam, test guidelines, online exam form"
      />

      <div className="mb-8 text-center">
      
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: 'var(--text-main)' }}>
          Certification Test
        </h1>
        <p className="max-w-2xl mx-auto text-sm md:text-base opacity-70 leading-relaxed font-medium" style={{ color: 'var(--text-main)' }}>
          Complete the test honestly and within the given time. Please read the instructions carefully before starting.
        </p>
      </div>

      <div className="glass border rounded-3xl p-6 md:p-8 mb-8" style={{ borderColor: 'var(--glass-border)' }}>
        <h2 className="text-lg md:text-xl font-black mb-4" style={{ color: 'var(--text-main)' }}>
          Test Guidelines
        </h2>
        <ul className="space-y-3 text-sm opacity-80 list-disc pl-5 leading-relaxed font-medium" style={{ color: 'var(--text-main)' }}>
          <li>Do not cheat, copy answers, or use external help during the test.</li>
          <li>Complete the test by yourself and submit only your own response.</li>
          <li>Use a stable internet connection and avoid refreshing the page during the exam.</li>
          <li>Read each question carefully before answering.</li>
          <li>Submit the form only after checking your answers.</li>
        </ul>
      </div>

      <div className="glass border rounded-3xl overflow-hidden" style={{ borderColor: 'var(--glass-border)' }}>
        <iframe
          title="Certification Test Form"
          src={testLink}
          className="w-full min-h-[1000px]"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="fullscreen"
        />
      </div>
    </div>
  );
};

export default TestPage;
