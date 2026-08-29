import React, { useState } from 'react';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError(null);

    const payload = {
      ...formData,
      access_key: "bfe80316-38d8-4190-a6a0-1ced2791c960",
      from_name: "Vidyate Tech Contact Hub",
      subject_line: `New Tech Inquiry: ${formData.subject}`
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
         },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setSubmitError("Failed to send message. Please try again later.");
      }
    } catch (error) {
      setSubmitError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      title: 'Email Support',
      value: 'vidyatetechhub@gmail.com',
      icon: 'alternate_email',
      color: 'var(--text-main)',
      description: 'Central academic help desk for all engineering courses or textbook queries.'
    },
    {
      title: 'Headquarters',
      value: 'Bihar, India',
      icon: 'location_on',
      color: '#525252',
      description: 'Our digital education content development and validation hub.'
    }
  ];

  const inputClasses = "w-full glass rounded-xl p-4 transition-all focus:outline-none focus:ring-2 focus:ring-neutral-400 border-slate-500/10 focus:border-neutral-500 text-xs font-medium";

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-scale-up">
        <SEO title="Message Sent Successfully" />
        <div className="glass p-12 md:p-20 rounded-3xl border shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-black dark:bg-white"></div>
          <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-8 border">
            <span className="material-symbols-rounded text-4xl">mark_email_read</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter" style={{ color: 'var(--text-main)' }}>Inquiry Sent.</h2>
          <p className="opacity-60 text-xs md:text-sm max-w-md mx-auto leading-relaxed font-medium mb-10" style={{ color: 'var(--text-main)' }}>
            Thank you for writing. The Vidyate Tech academic support team will review your submission and get back to your email inbox within 12-24 hours.
          </p>
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', email: '', subject: '', message: '' });
            }}
            className="px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black font-black rounded-xl text-xs uppercase tracking-widest hover:shadow-lg active:scale-95 transition-all"
          >
            Submit New Ticket
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 animate-subtle-fade">
      <SEO 
        title="Contact Vidyate Tech Hub | Student Support" 
        description="Connect with Vidyate Tech Hub academics team for textbook orders, study PDF folders, or licensing inquiries. We assist Indian engineering students 24/7."
        keywords="Vidyate Contact, CS Help, engineering preparation support, textbook delivery queries, India"
      />
      {/* Hero Header */}
      <div className="text-center mb-16">
    
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter" style={{ color: 'var(--text-main)' }}>
          Write to Our <span>Academic</span> Board.
        </h1>
        <p className="opacity-50 text-xs md:text-base max-w-2xl mx-auto leading-relaxed font-medium" style={{ color: 'var(--text-main)' }}>
          Have questions about programming files, microprocessor kits, CAD assembly projects, or bulk university reference textbooks? Drop us a line.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {contactInfo.map((info, idx) => (
              <div 
                key={idx}
                className="glass p-8 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl group"
                style={{ borderColor: 'var(--glass-border)' }}
              >
                <div className="flex items-start gap-5">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110 bg-neutral-100 dark:bg-neutral-900 border"
                  >
                    <span className="material-symbols-rounded text-2xl">{info.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1" style={{ color: 'var(--text-main)' }}>{info.title}</h3>
                    <p className="text-base md:text-lg font-black mb-2 tracking-tight" style={{ color: 'var(--text-main)' }}>{info.value}</p>
                    <p className="text-xs opacity-50 leading-relaxed font-medium" style={{ color: 'var(--text-main)' }}>{info.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <form 
            onSubmit={handleSubmit}
            className="glass p-8 md:p-12 rounded-3xl border shadow-xl space-y-6 animate-subtle-fade"
            style={{ borderColor: 'var(--glass-border)' }}
          >
            {submitError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-bold flex items-center gap-3">
                <span className="material-symbols-rounded">error_outline</span>
                {submitError}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1" style={{ color: 'var(--text-main)' }}>Full Name</label>
                <input 
                  type="text"
                  name="name"
                  required
                  placeholder="Jane Doe"
                  className={inputClasses}
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{ color: 'var(--text-main)', backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1" style={{ color: 'var(--text-main)' }}>Email Address</label>
                <input 
                  type="email"
                  name="email"
                  required
                  placeholder="vidyatetechhub@gmail.com"
                  className={inputClasses}
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{ color: 'var(--text-main)', backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1" style={{ color: 'var(--text-main)' }}>Subject</label>
              <input 
                type="text"
                name="subject"
                required
                placeholder="How can we help?"
                className={inputClasses}
                value={formData.subject}
                onChange={handleInputChange}
                style={{ color: 'var(--text-main)', backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1" style={{ color: 'var(--text-main)' }}>Your Message</label>
              <textarea 
                name="message"
                required
                rows={5}
                placeholder="Tell us about your inquiry..."
                className={`${inputClasses} resize-none`}
                value={formData.message}
                onChange={handleInputChange}
                style={{ color: 'var(--text-main)', backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-black rounded-xl text-xs uppercase tracking-widest shadow-lg hover:scale-[1.01] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  Send Message
                  <span className="material-symbols-rounded text-lg">send</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
