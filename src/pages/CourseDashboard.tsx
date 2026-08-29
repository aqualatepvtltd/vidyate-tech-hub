import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { COURSES } from '../data/courses';
import { Subject, Textbook } from '../types';

const CourseDashboard: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const course = courseId ? COURSES[courseId] : null;

  const [activeSubject, setActiveSubject] = useState<Subject | null>(
    course && course.subjects.length > 0 ? course.subjects[0] : null
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Textbook | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!course) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <span className="material-symbols-rounded text-6xl text-neutral-400 mb-4">error_outline</span>
        <h2 className="text-3xl font-black mb-2" style={{ color: 'var(--text-main)' }}>Pathway Not Found</h2>
        <p className="opacity-60 mb-6">The engineering pathway you are trying to access does not exist or has been relocated.</p>
        <Link to="/" className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold transition-all hover:scale-105">
          Back to Home Hub
        </Link>
      </div>
    );
  }

  // Filter subjects based on search query
  const filteredSubjects = course.subjects.filter(sub =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookPurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerEmail || !buyerName || !selectedBook) return;

    setIsSubmitting(true);
    
    try {
      // Real submission using Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: buyerEmail,
          access_key: "bfe80316-38d8-4190-a6a0-1ced2791c960",
          subject: `Reference Book Order Request - ${selectedBook.title}`,
          from_name: "Vidyate Bookstore System",
          message: `Book Order Details:\nBook Name: ${selectedBook.title}\nPrice: ₹${selectedBook.price}\nBuyer Name: ${buyerName}\nBuyer Email: ${buyerEmail}`
        }),
      });

      const result = await response.json();
      if (result.success) {
        setPurchaseSuccess(true);
        setTimeout(() => {
          setSelectedBook(null);
          setPurchaseSuccess(false);
          setBuyerEmail('');
          setBuyerName('');
        }, 3000);
      } else {
        alert("Failed to submit request. Please try again later.");
      }
    } catch (error) {
      alert("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate high-potency SEO keywords dynamically based on subjects
  const dynamicKeywords = [
    course.name,
    `${course.name} notes PDF`,
    `${course.name} syllabus`,
    `${course.name} study material`,
    ...course.subjects.slice(0, 6).map(sub => sub.name),
    "Vidyate Tech Hub",
    "Engineering Education India",
    "Computer Science study guide"
  ].join(', ');

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 animate-subtle-fade">
      <SEO 
        title={`${course.name} Study Hub`}
        description={`Access comprehensive, double-checked study resources, lab manuals, and chapter-wise guides for ${course.name}. ${course.description}`}
        keywords={dynamicKeywords}
      />

      {/* Back button */}
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-theme-muted hover:text-black dark:hover:text-white transition-all font-black text-xs uppercase tracking-widest mb-6"
      >
        <span className="material-symbols-rounded text-sm">arrow_back</span>
        <span>Back to Home</span>
      </Link>

      {/* Header section */}
      <div className="relative glass p-8 md:p-12 rounded-3xl border mb-12 overflow-hidden animate-subtle-fade" style={{ borderColor: 'var(--glass-border)' }}>
        <div 
          className="absolute -right-20 -top-20 w-80 h-80 blur-[100px] rounded-full -z-10 opacity-25"
          style={{ backgroundColor: 'var(--text-main)' }}
        ></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800"
            >
              <span className="material-symbols-rounded text-sm">{course.icon}</span>
              <span>PATHWAY ACTIVE</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3" style={{ color: 'var(--text-main)' }}>
              {course.name}
            </h1>
            <p className="opacity-60 text-sm md:text-base max-w-2xl font-medium leading-relaxed">
              {course.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://drive.google.com/drive/folders/16LpL4C79F3fQzO7R_pY60p8g9V_rGshZ?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-rounded text-lg">folder_shared</span>
              <span>All Drive Folders</span>
            </a>
            <Link
              to="/get-certified"
              className="px-6 py-3.5 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-100 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-rounded text-lg">verified</span>
              <span>Get Certified</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Column: Subject Selection list */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass p-6 rounded-2xl border animate-subtle-fade" style={{ borderColor: 'var(--glass-border)' }}>
            <h3 className="text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
              <span className="material-symbols-rounded">library_books</span>
              Subjects Catalogue
            </h3>

            {/* Search Input */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Filter subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 pl-9 pr-4 rounded-xl glass border text-xs font-medium focus:outline-none focus:border-neutral-400"
                style={{ borderColor: 'var(--glass-border)', color: 'var(--text-main)' }}
              />
              <span className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-40">
                search
              </span>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
              {filteredSubjects.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubject(sub)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold transition-all flex items-start justify-between gap-3 ${
                    activeSubject?.id === sub.id
                      ? 'border-black dark:border-white bg-black/5 dark:bg-white/5 shadow-sm'
                      : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <div>
                    <p style={{ color: 'var(--text-main)' }}>{sub.name}</p>
                    <p className="opacity-40 font-mono mt-1 text-[10px]">{sub.code}</p>
                  </div>
                  {sub.semester && (
                    <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[9px] opacity-70 font-black tracking-wider uppercase">
                      {sub.semester}
                    </span>
                  )}
                </button>
              ))}
              {filteredSubjects.length === 0 && (
                <div className="text-center py-6 opacity-40 text-xs">No subjects match your filter.</div>
              )}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-5 rounded-2xl border text-center" style={{ borderColor: 'var(--glass-border)' }}>
              <span className="material-symbols-rounded text-2xl mb-2">verified_user</span>
              <p className="text-2xl font-black" style={{ color: 'var(--text-main)' }}>100%</p>
              <p className="text-[10px] opacity-50 uppercase font-black tracking-wider">Expert Reviewed</p>
            </div>
            <div className="glass p-5 rounded-2xl border text-center" style={{ borderColor: 'var(--glass-border)' }}>
              <span className="material-symbols-rounded text-2xl mb-2">history_edu</span>
              <p className="text-2xl font-black" style={{ color: 'var(--text-main)' }}>IIT / University</p>
              <p className="text-[10px] opacity-50 uppercase font-black tracking-wider">Aligned Curriculum</p>
            </div>
          </div>
        </div>

        {/* Right Column: Subject details panel */}
        <div className="lg:col-span-8">
          {activeSubject ? (
            <div className="glass p-8 rounded-2xl border h-full flex flex-col justify-between" style={{ borderColor: 'var(--glass-border)' }}>
              <div>
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono opacity-50 block uppercase tracking-wider mb-1">
                      {activeSubject.code} • {activeSubject.semester || 'Syllabus Core'}
                    </span>
                    <h2 className="text-2xl font-black" style={{ color: 'var(--text-main)' }}>
                      {activeSubject.name}
                    </h2>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-black dark:text-white">
                    <span className="material-symbols-rounded text-xl">menu_book</span>
                  </div>
                </div>

                <p className="opacity-60 text-sm leading-relaxed mb-6 font-medium">
                  {activeSubject.description}
                </p>

                {/* Chapter Checklist */}
                <div className="mb-8">
                  <h4 className="text-xs font-black uppercase tracking-wider mb-3 text-neutral-500 dark:text-neutral-400">
                    Curriculum Chapters & Concepts
                  </h4>
                  <div className="space-y-2.5">
                    {activeSubject.chapters.map((chap, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs font-medium">
                        <span className="material-symbols-rounded text-base flex-shrink-0">
                          check_circle
                        </span>
                        <span className="opacity-80" style={{ color: 'var(--text-main)' }}>{chap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Download Buttons Section */}
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row gap-3">
                <a
                  href={activeSubject.notesLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-5 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider text-white dark:text-black bg-black dark:bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-rounded text-base">download</span>
                  <span>Download Core Notes</span>
                </a>
                <a
                  href={activeSubject.questionBankLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-5 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider text-white bg-neutral-800 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-rounded text-base">quiz</span>
                  <span>Question Bank</span>
                </a>
                <a
                  href={activeSubject.pastPapersLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider text-black dark:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all border border-neutral-200 dark:border-neutral-800 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-rounded text-base">history</span>
                  <span>Past Papers</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="glass p-8 rounded-2xl border text-center h-full flex flex-col items-center justify-center animate-subtle-fade" style={{ borderColor: 'var(--glass-border)' }}>
              <span className="material-symbols-rounded text-5xl opacity-25 mb-3">menu_book</span>
              <h3 className="text-xl font-black" style={{ color: 'var(--text-main)' }}>Select a Subject</h3>
              <p className="opacity-50 mt-1 max-w-xs text-xs">Choose any subject from the catalogue list to explore notes, exam guides, and papers.</p>
            </div>
          )}
        </div>
      </div>

      {/* Career Pathways Recommendations Section */}
      <div className="glass p-8 md:p-12 rounded-3xl border mb-12 overflow-hidden animate-subtle-fade" style={{ borderColor: 'var(--glass-border)' }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
          <span className="material-symbols-rounded text-sm">trending_up</span>
          Market Intelligence
        </div>
        <h2 className="text-2xl md:text-3xl font-black mb-2 tracking-tight" style={{ color: 'var(--text-main)' }}>
          High-Growth Career Paths
        </h2>
        <p className="opacity-60 text-sm max-w-xl mb-8 leading-relaxed font-medium">
          Align your study material milestones with real-world professional requirements. Check standard salary budgets, skills demand, and paths.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {course.careers.map((career, idx) => (
            <div key={idx} className="glass p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-black text-lg" style={{ color: 'var(--text-main)' }}>{career.title}</h4>
                  <span className="px-2 py-0.5 bg-black dark:bg-white text-white dark:text-black text-[9px] font-black rounded uppercase">
                    {career.demand}
                  </span>
                </div>
                <p className="opacity-60 text-xs leading-relaxed mb-4 font-medium">{career.description}</p>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
                <div>
                  <p className="text-[10px] opacity-40 font-black uppercase tracking-wider">Salary Range</p>
                  <p className="text-sm font-black" style={{ color: 'var(--text-main)' }}>{career.salary}</p>
                </div>
                <div>
                  <p className="text-[10px] opacity-40 font-black uppercase tracking-wider mb-1.5">Required Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {career.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 border border-neutral-200 dark:border-neutral-800 text-[9px] font-bold opacity-85">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering Textbook Store Section */}
      <div className="glass p-8 md:p-12 rounded-3xl border mb-6 overflow-hidden animate-subtle-fade" style={{ borderColor: 'var(--glass-border)' }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
          <span className="material-symbols-rounded text-sm">shopping_bag</span>
          Reference Bookstore
        </div>
        <h2 className="text-2xl md:text-3xl font-black mb-2 tracking-tight" style={{ color: 'var(--text-main)' }}>
          Discounted Academic Textbooks
        </h2>
        <p className="opacity-60 text-sm max-w-xl mb-8 leading-relaxed font-medium">
          Secure authentic reference publications recommended by university toppers. Delivery within 3-5 working days.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {course.books.map((book) => (
            <div key={book.id} className="glass p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row gap-5 hover:border-black/20 dark:hover:border-white/20 transition-all">
              <img 
                src={book.image} 
                alt={book.title} 
                className="w-full sm:w-28 h-40 object-cover rounded-xl bg-black/10 dark:bg-white/10 flex-shrink-0 border border-neutral-200 dark:border-neutral-800 shadow-sm"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h4 className="font-black text-base" style={{ color: 'var(--text-main)' }}>{book.title}</h4>
                  <p className="text-xs opacity-50 mt-1">Author: {book.author}</p>
                  <p className="text-xs opacity-60 mt-2 font-medium line-clamp-2 leading-relaxed">{book.description}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-lg font-black" style={{ color: 'var(--text-main)' }}>₹{book.price}</span>
                    <span className="text-xs opacity-40 line-through ml-2">₹{book.originalPrice}</span>
                  </div>
                  <button
                    onClick={() => setSelectedBook(book)}
                    className="px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                  >
                    <span className="material-symbols-rounded text-sm">shopping_cart</span>
                    <span>Order Book</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Purchase Modal dialog */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-scale-up">
          <div className="glass w-full max-w-md p-6 rounded-3xl border text-left relative overflow-hidden" style={{ borderColor: 'var(--glass-border)' }}>
            <button 
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 text-theme-muted hover:text-black dark:hover:text-white transition-all"
            >
              <span className="material-symbols-rounded">close</span>
            </button>

            {purchaseSuccess ? (
              <div className="py-8 text-center animate-subtle-fade">
                <span className="material-symbols-rounded text-5xl text-neutral-800 dark:text-neutral-200 mb-4 animate-bounce">check_circle</span>
                <h3 className="text-xl font-black mb-2" style={{ color: 'var(--text-main)' }}>Order Submitted!</h3>
                <p className="opacity-60 text-xs px-6 leading-relaxed">
                  We have registered your book request. A validation link with coordinate invoice has been dispatched directly to <strong>{buyerEmail}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookPurchase} className="space-y-4 pt-4">
                <div className="flex gap-4 items-start pb-4 border-b border-neutral-200 dark:border-neutral-800">
                  <img src={selectedBook.image} alt={selectedBook.title} className="w-16 h-24 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-black text-lg leading-tight" style={{ color: 'var(--text-main)' }}>{selectedBook.title}</h3>
                    <p className="text-xs opacity-50 mt-1">Author: {selectedBook.author}</p>
                    <p className="text-sm font-black mt-2" style={{ color: 'var(--text-main)' }}>₹{selectedBook.price}</p>
                  </div>
                </div>

                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mt-4">Order Checkout Form</h4>

                <div className="space-y-3">
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest opacity-40 block mb-1">Your Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jane Doe"
                      className="w-full glass p-3 rounded-xl border text-xs focus:outline-none focus:border-neutral-400"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest opacity-40 block mb-1">Your Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="vidyatetechhub@gmail.com"
                      className="w-full glass p-3 rounded-xl border text-xs focus:outline-none focus:border-neutral-400"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                    />
                  </div>
                </div>

                <p className="text-[10px] opacity-40 leading-relaxed pt-2">
                  ✓ Form coordinates and textbook purchase logs are forwarded securely to the help desk.
                </p>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black font-black rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>
                      Confirm Book Order
                      <span className="material-symbols-rounded text-sm">rocket_launch</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDashboard;
