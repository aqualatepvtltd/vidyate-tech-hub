import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [activeWhyVidyateTab, setActiveWhyVidyateTab] = useState(0);

  const whyVidyateTabs = [
    {
      title: 'Double-Checked Standards',
      icon: 'check_circle',
      color: '#404040',
      content: 'Every code solution, circuit schematic, and thermodynamic formula sheet is curated by department toppers and experienced industry engineers. Study only what is accurate and aligned with modern engineering curriculums.'
    },
    {
      title: 'One-Tap Downloads',
      icon: 'download_done',
      color: '#525252',
      content: 'No more scouring miscellaneous forums for reference materials. Download complete semester lab manuals, GATE prep question sheets, and engineering textbook solutions in seconds with optimized, mobile-safe PDF archives.'
    },
    {
      title: 'Industry Career Sync',
      icon: 'hub',
      color: '#171717',
      content: 'Vidyate Tech Hub goes beyond simple semester scores. We connect code repositories, hardware designs, and robotics principles with high-scale professional career tracks, bridging academic courses with market standards.'
    }
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          access_key: "bfe80316-38d8-4190-a6a0-1ced2791c960",
          subject: "New Newsletter Subscription - Vidyate Tech Hub",
          from_name: "Vidyate Tech Ecosystem",
          message: `New engineering student subscription request from: ${email}`
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubscribed(true);
        setEmail('');
      } else {
        setSubmitError("Subscription failed. Please try again later.");
      }
    } catch (error) {
      setSubmitError("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <SEO 
        title="Vidyate Tech Hub - Premium Academic Resources for Engineering Students" 
        description="Vidyate Tech Hub is India's premier academic platform for Computer Science, Electronics, and Mechanical Engineering students. Access double-checked study materials, gate prep question banks, and textbook solutions."
        keywords="Engineering Education, Computer Science Notes, DSA guides, OS solutions, DBMS textbooks, Electronics study materials, Microprocessors assembly, Mechanical Thermodynamics, Fluid Mechanics, Vidyate Tech Hub, India"
      />
      
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center text-center relative overflow-visible pt-16 pb-12 md:py-0">
        

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 md:mb-6 leading-[1.08]" 
          style={{ color: 'var(--text-main)' }}
        >
          Accelerate Your Engineering Journey
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="opacity-60 text-sm md:text-lg max-w-xl mb-8 md:mb-10 font-medium leading-relaxed px-2" 
          style={{ color: 'var(--text-main)' }}
        >
          The ultimate digital academic ecosystem for engineering students. Access expert-verified DSA scripts, microprocessor assembly sheets, board exam lab manuals, and thermodynamics maps.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <Link
            to="/get-certified"
            className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 rounded-xl bg-black text-white font-black text-xs md:text-sm hover:shadow-lg hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2 border border-transparent"
            style={{ textDecoration: 'none' }}
          >
            <span className="material-symbols-rounded text-base">verified</span>
            <span>Get Certified</span>
          </Link>
        </motion.div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-20 hidden md:block">
          <span className="material-symbols-rounded text-2xl">keyboard_double_arrow_down</span>
        </div>
      </section>

      {/* Get Certified Highlight Section */}
      <section className="py-16 md:py-20">
        <div className="glass p-8 md:p-12 rounded-3xl border text-center relative overflow-hidden" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neutral-500/5 blur-[100px] rounded-full -z-10"></div>
          <div className="relative z-10">
            
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter" style={{ color: 'var(--text-main)' }}>
              Get <span className="opacity-70">Certified</span>, Build Authority.
            </h2>
            <p className="opacity-60 text-sm md:text-lg max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
              Equip your portfolio with industry-verified professional achievements. Master Advanced Full-Stack Web architectures, Deep Learning algorithms, and Embedded Microcontrollers.
            </p>
            <Link 
              to="/get-certified"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-xl font-black text-xs md:text-sm hover:shadow-lg hover:-translate-y-1 transition-all active:scale-95"
            >
              <span>Explore Certification Programs</span>
              <span className="material-symbols-rounded group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Vidyate? Section */}
      <section className="py-16 md:py-20">
        <div className="text-center mb-10 md:mb-12">
          
          <h2 className="text-3xl md:text-5xl font-black" style={{ color: 'var(--text-main)' }}>Why Vidyate?</h2>
          <p className="opacity-60 text-sm md:text-lg max-w-xl mx-auto font-medium leading-relaxed">
            We are more than a repository of study notes. We provide a full-stack, hyper-organized, and double-checked engineering learning landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {whyVidyateTabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveWhyVidyateTab(index)}
              className={`p-6 text-left glass rounded-2xl border transition-all duration-300 group ${activeWhyVidyateTab === index ? 'shadow-xl -translate-y-1' : 'hover:shadow-lg'}`}
              style={{ borderColor: activeWhyVidyateTab === index ? 'var(--text-main)' : 'var(--glass-border)' }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                  style={{ backgroundColor: `${tab.color}15`, color: tab.color }}
                >
                  <span className="material-symbols-rounded text-xl">{tab.icon}</span>
                </div>
                <h3 className="text-base font-black" style={{ color: 'var(--text-main)' }}>{tab.title}</h3>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 relative">
          {whyVidyateTabs.map((tab, index) => (
            <div
              key={index}
              className={`glass p-8 md:p-10 rounded-2xl border transition-all duration-500 ${activeWhyVidyateTab === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 absolute top-0 left-0 w-full pointer-events-none'}`}
              style={{ borderColor: 'var(--glass-border)' }}
            >
              <p className="text-sm md:text-base leading-relaxed font-medium opacity-75" style={{ color: 'var(--text-main)' }}>
                {tab.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About Spotlight section */}
      <section className="py-16 md:py-24">
        <div className="glass p-8 md:p-12 rounded-3xl border flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-neutral-500/5 blur-[80px] rounded-full -z-10"></div>
          <div className="relative z-10 text-center lg:text-left">
            
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight leading-[1.15]" style={{ color: 'var(--text-main)' }}>
              Engineering Wisdom, <br/> Digitally Perfected.
            </h2>
            <p className="opacity-50 text-xs md:text-sm font-medium leading-relaxed mb-8 max-w-xl">
              Vidyate Tech Hub simplifies coding principles, hardware configurations, and thermodynamics equations. We compile trusted resources to help students build strong collegiate and professional credentials.
            </p>
            <Link 
              to="/about"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-xl font-black text-xs md:text-sm hover:shadow-lg hover:-translate-y-1 transition-all active:scale-95"
            >
              <span>Discover Our Mission</span>
              <span className="material-symbols-rounded group-hover:translate-x-1 transition-transform text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="relative z-10 hidden lg:block">
            <div className="w-48 h-48 glass rounded-full flex items-center justify-center border-dashed border-2 opacity-30 border-neutral-500">
              <span className="material-symbols-rounded text-7xl text-neutral-600 dark:text-neutral-300 animate-pulse">terminal</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter signup */}
      <section className="py-12 md:py-20">
        <div className="relative glass rounded-3xl p-6 md:p-12 border overflow-hidden text-center md:text-left shadow-xl" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-neutral-500/5 via-transparent to-transparent opacity-60"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="max-w-lg">
              
              <h2 className="text-2xl md:text-4xl font-black mb-4 md:mb-6 leading-[1.1]" style={{ color: 'var(--text-main)' }}>Subscribe Newsletter</h2>
              <p className="opacity-50 text-xs md:text-base font-medium" style={{ color: 'var(--text-main)' }}>
                Receive essential coding cheat sheets, university semester dates, and career guidance briefs straight to your inbox.
              </p>
            </div>

            <div className="w-full max-w-sm">
              {subscribed ? (
                <div className="p-8 md:p-10 glass border-neutral-500/20 rounded-2xl text-center animate-fade-in bg-neutral-500/5">
                  <span className="material-symbols-rounded text-4xl md:text-5xl text-black mb-4 md:mb-5">verified</span>
                  <h3 className="text-lg md:text-xl font-black mb-2" style={{ color: 'var(--text-main)' }}>Welcome Aboard!</h3>
                  <p className="opacity-50 text-xs font-medium" style={{ color: 'var(--text-main)' }}>Your first engineering cheat sheet is on the way.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  {submitError && (
                    <div className="p-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-[10px] font-bold">
                      {submitError}
                    </div>
                  )}
                  <div className="relative flex flex-col gap-3">
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      className="w-full glass border rounded-xl py-4 px-5 placeholder-slate-400 focus:outline-none focus:border-neutral-500/50 focus:ring-4 focus:ring-neutral-500/5 transition-all text-xs md:text-sm font-medium"
                      style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--text-main)' }}
                    />
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3.5 rounded-xl md:absolute md:right-1.5 md:top-1.5 md:w-auto md:py-2.5 bg-black text-white font-black text-xs transition-all hover:shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      ) : (
                        <>
                          Join Now
                          <span className="material-symbols-rounded text-xs">rocket_launch</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;
