import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { CERTIFICATION_COURSES } from '../data/courses';
import { CertificationCourse } from '../types';

const GetCertified: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'advance' | 'basic' | 'quiz'>('advance');

  const filters = [
    { id: 'advance', label: 'Advance Programs', color: 'var(--text-main)' },
    { id: 'basic', label: 'Basic Foundations', color: '#525252' },
    { id: 'quiz', label: 'National Quizzes', color: '#a3a3a3' },
  ];

  const { coursesToShow, suggestion } = useMemo(() => {
    const getCoursesByFilter = (f: typeof filter) => {
      switch (f) {
        case 'advance': return CERTIFICATION_COURSES.filter(c => c.isPaid);
        case 'basic': return CERTIFICATION_COURSES.filter(c => !c.isPaid && !c.quiz);
        case 'quiz': return CERTIFICATION_COURSES.filter(c => c.quiz);
        default: return [];
      }
    };

    if (searchQuery.trim() === '') {
      return { coursesToShow: getCoursesByFilter(filter), suggestion: null };
    }

    const allMatchingCourses = CERTIFICATION_COURSES.filter(course =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (allMatchingCourses.length === 0) {
      return { coursesToShow: [], suggestion: { type: 'not_found' as const } };
    }

    const coursesInCurrentFilter = allMatchingCourses.filter(course => {
      const currentFilterCourses = getCoursesByFilter(filter);
      return currentFilterCourses.some(c => c.id === course.id);
    });

    if (coursesInCurrentFilter.length > 0) {
      return { coursesToShow: coursesInCurrentFilter, suggestion: null };
    }

    // If not in current filter, find which filter it belongs to
    const firstMatch = allMatchingCourses[0];
    let targetFilter: 'advance' | 'basic' | 'quiz' | null = null;
    if (firstMatch.isPaid) targetFilter = 'advance';
    else if (firstMatch.quiz) targetFilter = 'quiz';
    else if (!firstMatch.isPaid && !firstMatch.quiz) targetFilter = 'basic';

    if (targetFilter && targetFilter !== filter) {
      return { coursesToShow: [], suggestion: { type: 'switch_filter' as const, target: targetFilter } };
    }

    return { coursesToShow: [], suggestion: { type: 'not_found' as const } };
  }, [filter, searchQuery]);

  const steps = [
    {
      number: 1,
      title: 'Study Course Materials',
      description: 'Access digital manuals, coding cheat sheets, and engineering reference sheets.'
    },
    {
      number: 2,
      title: 'Clear Proctoring Checks',
      description: 'Run automated microphone, webcam, and signal checks.'
    },
    {
      number: 3,
      title: 'Claim Certification',
      description: 'Score over 60% on evaluation to get your verified certificate.'
    }
  ];

  const handleDownloadMaterial = (course: CertificationCourse) => {
    if (course.materialLink) {
      window.open(course.materialLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleAttemptTest = (course: CertificationCourse) => {
    navigate(`/paid-certification-test/${course.id}`, { state: { testLink: course.testLink } });
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="Get Certified - Professional Engineering Credentials"
        description="Earn professional certificates in Full-Stack web development, Deep Learning, AWS Cloud systems, and Embedded Robotics. Gain industry-ready engineering credentials with Vidyate Tech Hub."
        keywords="Engineering certification, programming certificate, cloud systems exam, computer architecture credentials, robot operating system, Vidyate certification, software engineering courses"
      />
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-16">

          <h1
            className="text-4xl md:text-6xl font-black tracking-tight mb-4"
            style={{ color: 'var(--text-main)' }}
          >
            Get <span>Certified</span>
          </h1>
          <p className="text-sm md:text-lg opacity-60 max-w-2xl mx-auto font-medium" style={{ color: 'var(--text-main)' }}>
            Validate your expertise in software algorithms, neural network tuning, high-scale cloud routing, and embedded microcontroller systems.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="relative p-6 md:p-8 rounded-2xl glass border transition-all duration-300 hover:scale-95"
              style={{
                borderColor: 'var(--glass-border)',
                backgroundColor: 'var(--glass-bg)'
              }}
            >
              {/* Step Number Circle */}
              <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center font-black text-white dark:text-black text-base left-1/2 transform -translate-x-1/2">
                {step.number}
              </div>

              {/* Arrow between steps (visible on md and above) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-7 top-1/2 transform -translate-y-1/2 z-10">
                  <span className="material-symbols-rounded text-3xl opacity-35">arrow_forward</span>
                </div>
              )}

              <div className="pt-4 text-center">
                <h3 className="text-lg font-black mb-2" style={{ color: 'var(--text-main)' }}>
                  {step.title}
                </h3>
                <p className="text-xs opacity-60 font-medium" style={{ color: 'var(--text-main)' }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-0.5 bg-neutral-200 dark:bg-neutral-800 mb-12 md:mb-16"></div>

        {/* Available Courses */}
        <div className="mb-12">
          <h2
            className="text-2xl md:text-3xl font-black tracking-tight mb-8"
            style={{ color: 'var(--text-main)' }}
          >
            Available Professional Programs
          </h2>

          {/* Search Bar */}
          <div className="mb-8 relative">
            <input
              type="text"
              placeholder="Search by keyword (e.g. DSA, AWS, Robotics, Git)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pl-12 pr-12 rounded-xl glass border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-neutral-400"
              style={{ borderColor: 'var(--glass-border)', color: 'var(--text-main)' }}
            />
            <span className="material-symbols-rounded absolute left-4 top-1/2 -translate-y-1/2 opacity-40 text-lg" style={{ color: 'var(--text-main)' }}>
              search
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute top-1/2 right-4 -translate-y-1/2 opacity-30 hover:opacity-80 transition-opacity"
                aria-label="Clear search"
              >
                <span className="material-symbols-rounded text-lg" style={{ color: 'var(--text-main)' }}>close</span>
              </button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center items-center gap-2 mb-8 p-1.5 rounded-xl glass border" style={{ borderColor: 'var(--glass-border)' }}>
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`flex-1 px-4 py-2.5 rounded-lg font-black text-[10px] md:text-xs uppercase tracking-wider transition-all duration-300 ${filter === f.id
                    ? 'text-white dark:text-black shadow-lg bg-black dark:bg-white' // Active state
                    : 'opacity-60 hover:opacity-100' // Inactive state
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {suggestion?.type === 'not_found' && (
            <div className="text-center py-12 glass rounded-2xl border border-dashed" style={{ borderColor: 'var(--glass-border)' }}>
              <span className="material-symbols-rounded text-5xl opacity-20 mb-4">search_off</span>
              <h3 className="text-xl font-black" style={{ color: 'var(--text-main)' }}>No Courses Found</h3>
              <p className="opacity-50 mt-1 text-xs" style={{ color: 'var(--text-main)' }}>Try a different search term or check other categories.</p>
            </div>
          )}

          {suggestion?.type === 'switch_filter' && (
            <div className="text-center py-12 glass rounded-2xl border" style={{ borderColor: 'var(--glass-border)' }}>
              <span className="material-symbols-rounded text-5xl opacity-20 mb-4">move_item</span>
              <h3 className="text-lg font-black" style={{ color: 'var(--text-main)' }}>Course found in another category!</h3>
              <p className="opacity-50 mt-2 mb-6 text-xs" style={{ color: 'var(--text-main)' }}>Click below to switch to the '{suggestion.target}' tab.</p>
              <button
                onClick={() => setFilter(suggestion.target)}
                className="px-8 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-widest hover:shadow-lg active:scale-95 transition-all"
              >
                Switch to {suggestion.target}
              </button>
            </div>
          )}

          {coursesToShow.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coursesToShow.map((course) => (
                <div
                  key={course.id}
                  className="group p-6 md:p-8 rounded-2xl glass border transition-all duration-300 animate-subtle-fade flex flex-col justify-between"
                  style={{
                    borderColor: 'var(--glass-border)',
                    backgroundColor: 'var(--glass-bg)'
                  }}
                >
                  <div>
                    <div className="flex items-start justify-between mb-3 gap-4">
                      <h3 className="text-lg md:text-xl font-black group-hover:underline transition-all leading-snug" style={{ color: 'var(--text-main)' }}>
                        {course.name}
                      </h3>
                      <div className="flex-shrink-0 flex items-center gap-2">
                        {course.isPaid && (
                          <span className="px-2 py-1 bg-black text-white dark:bg-white dark:text-black text-[9px] font-black uppercase tracking-wider rounded-md">
                            Advance
                          </span>
                        )}
                        {!course.isPaid && course.quiz && (
                          <span className="px-2 py-1 bg-neutral-600 text-white dark:bg-neutral-400 dark:text-black text-[9px] font-black uppercase tracking-wider rounded-md">
                            QUIZ
                          </span>
                        )}
                        {!course.isPaid && !course.quiz && (
                          <span className="px-2 py-1 bg-neutral-800 text-white dark:bg-neutral-200 dark:text-black text-[9px] font-black uppercase tracking-wider rounded-md">
                            Basic
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="opacity-60 text-xs leading-relaxed font-medium mb-4">{course.description}</p>

                    <div className="flex items-center gap-4 text-xs opacity-60 mb-6" style={{ color: 'var(--text-main)' }}>
                      
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-rounded text-base">verified</span>
                        <span>Official Certification</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {!course.quiz && (
                      <button
                        onClick={() => handleDownloadMaterial(course)}
                        className="flex-1 px-4 py-3 rounded-xl font-black text-xs text-white dark:text-black bg-neutral-800 dark:bg-neutral-200 transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-rounded text-base">download</span>
                        <span>Study Material</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleAttemptTest(course)}
                      className={`px-4 py-3 rounded-xl font-black text-xs text-white dark:text-black transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 ${course.quiz ? 'flex-1 bg-neutral-700 dark:bg-neutral-300' : 'flex-1 bg-black dark:bg-white'}`}
                    >
                      <span className="material-symbols-rounded text-base">assignment</span>
                      <span>{course.quiz ? 'Join National Quiz' : 'Begin Evaluation'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="glass rounded-2xl p-6 md:p-8 border" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <span className="material-symbols-rounded text-3xl">info</span>
            </div>
            <div>
              <h4 className="font-black mb-2" style={{ color: 'var(--text-main)' }}>
                Certification Guidelines & Logistics
              </h4>
              <ul className="space-y-2 text-xs md:text-sm opacity-75 list-disc pl-4" style={{ color: 'var(--text-main)' }}>
                <li>Work through digital coding sheets and hardware guides completely at your own pace before attempting tests.</li>
                <li>Clear proctoring checkpoints (camera + mic validations) to open advanced exam systems.</li>
                <li>Reach a passing tier of 60% or higher.</li>
                <li>An official, securely signed digital certificate will be dispatched directly to your primary email address within 24 hours.</li>
                <li>Share your achievements directly on LinkedIn or append verified credentials to your resumes.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetCertified;
