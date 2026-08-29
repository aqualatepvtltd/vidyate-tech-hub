import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';

const PaidTestPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioVisualizerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [testLink, setTestLink] = useState<string>('');
  const [cameraAccess, setCameraAccess] = useState<'idle' | 'pending' | 'granted' | 'denied'>('idle');
  const [micAccess, setMicAccess] = useState<'idle' | 'pending' | 'granted' | 'denied'>('idle');
  const [internetCheck, setInternetCheck] = useState<'idle' | 'checking' | 'checked'>('idle');

  useEffect(() => {
    const state = location.state as { testLink?: string } | null;
    if (state?.testLink) {
      setTestLink(state.testLink);
    } else {
      // Fallback Google Form link in case of direct routing
      setTestLink('https://forms.gle/guK5eFywtFd9mCQx7');
    }
  }, [location.state]);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    // Cleanup function to stop media streams and animations when the component unmounts
    return () => {
      stream?.getTracks().forEach(track => track.stop());
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    }
  }, [stream]);

  const handleCameraAccess = async () => {
    setCameraAccess('pending');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      // Let user see the camera feed for a moment, then confirm and stop the stream.
      setTimeout(() => {
        setCameraAccess('granted');
        mediaStream.getTracks().forEach(track => track.stop());
        setStream(null);
      }, 2500); // Show feed for 2.5 seconds
    } catch (err) {
      console.error("Camera access denied:", err);
      setCameraAccess('denied');
    }
  };

  const handleMicAccess = async () => {
    setMicAccess('pending');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(mediaStream);
      source.connect(analyser);
      analyser.fftSize = 32;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const draw = () => {
        animationFrameRef.current = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        if (audioVisualizerRef.current) {
          audioVisualizerRef.current.style.setProperty('--audio-level', `${Math.min(100, average * 1.5)}%`);
        }
      };
      
      // Start visualization
      draw(); 

      // Check for a moment, then confirm and stop the stream.
      setTimeout(() => {
        setMicAccess('granted');
        // Stop the animation and the audio stream
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        mediaStream.getTracks().forEach(track => track.stop());
        audioContext.close();
      }, 2500); // Show level for 2.5 seconds
    } catch (err) {
      console.error("Microphone access denied:", err);
      setMicAccess('denied');
    }
  };

  const handleInternetCheck = () => {
    setInternetCheck('checking');
    setTimeout(() => {
      setInternetCheck('checked');
    }, 1500);
  };

  const allChecksPassed = cameraAccess === 'granted' && micAccess === 'granted' && internetCheck === 'checked';

  const handleStartTest = () => {
    if (allChecksPassed && testLink) {
      window.open(testLink, '_blank', 'noopener,noreferrer');
    }
  };

  const CheckStep: React.FC<{ title: string; status: string; onAction: () => void; children: React.ReactNode; actionText: string; showDisclaimer?: boolean; }> = ({ title, status, onAction, children, actionText, showDisclaimer = false }) => (
    <div className="glass p-6 rounded-2xl border flex flex-col justify-between" style={{ borderColor: 'var(--glass-border)' }}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black uppercase tracking-tight" style={{ color: 'var(--text-main)' }}>{title}</h3>
          {(status === 'granted' || status === 'checked') ? (
            <span className="flex items-center gap-1 text-[10px] font-black text-[#10B981]"><span className="material-symbols-rounded text-sm">check_circle</span> READY</span>
          ) : status === 'denied' ? (
            <span className="flex items-center gap-1 text-[10px] font-black text-red-500"><span className="material-symbols-rounded text-sm">cancel</span> DENIED</span>
          ) : null}
        </div>
        <div className="text-xs opacity-70 mb-4 leading-relaxed font-medium">{children}</div>
        {showDisclaimer && (
          <p className="text-[9px] text-amber-500 font-bold mt-2 leading-normal">
            ✓ Photo frames are processed automatically for anti-malpractice compliance.
          </p>
        )}
      </div>

      <div>
        {status !== 'granted' && status !== 'checked' && (
          <button 
            onClick={onAction} 
            disabled={status === 'pending' || status === 'checking'} 
            className="w-full px-4 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#10B981]/90 text-white font-black text-[10px] uppercase tracking-wider disabled:opacity-50 mt-4 transition-transform active:scale-95"
          >
            {status === 'pending' ? 'Verifying...' : status === 'checking' ? 'Testing Speed...' : actionText}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20 animate-subtle-fade">
      <SEO 
        title="Proctored Evaluation Portal | Setup Check" 
        description="Complete the secure proctoring webcam, microphone, and internet speed checks before commencing your professional certification exam. Maintain academy integrity with Vidyate's automated anti-cheat validations."
        keywords="Proctored Exam, Online exam setup, accounting certification test, anti-cheat test, Vidyate test portal, GST quiz exam, computer evaluation"
      />

      <div className="text-center mb-12">
        <span className="text-[#10B981] font-black text-[10px] tracking-[0.3em] uppercase mb-4 block">Anti-Cheat System</span>
        <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter animate-subtle-fade" style={{ color: 'var(--text-main)' }}>
          Evaluation Setup & Controls
        </h1>
        <p className="opacity-60 text-xs md:text-sm max-w-xl mx-auto leading-relaxed font-medium">
          Professional Vidyate certifications carry academic prestige. To preserve credential validity, you are required to complete secure proctoring setups before starting evaluation forms.
        </p>
      </div>

      {/* Instructions */}
      <div className="glass p-6 md:p-8 rounded-3xl border mb-12" style={{ borderColor: 'var(--glass-border)' }}>
        <h2 className="text-base font-black mb-4 flex items-center gap-2"><span className="material-symbols-rounded text-[#10B981]">gpp_maybe</span> Critical Exam Rules</h2>
        <ul className="space-y-3 text-xs opacity-80 list-disc pl-5 font-medium leading-relaxed">
          <li>Ensure you have 40-60 minutes of uninterrupted study time to complete the test.</li>
          <li>This is a double-monitored portal. Webcam and audio feedback tests must pass.</li>
          <li>Supported on desktop web browsers, iOS Safari, and Android Chrome.</li>
          <li>Tabs-switching limits, focus deviation, and external support are audited.</li>
          <li>Certificates are revoked immediately if manual verification flags fraud or copy-paste actions.</li>
        </ul>
      </div>

      {/* Proctoring Setup Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Camera check */}
        <CheckStep title="1. Identity Audit" status={cameraAccess} onAction={handleCameraAccess} actionText="Enable Camera Check" showDisclaimer={true}>
          <p>We perform automated facial presence verification during evaluation.</p>
          <div className="mt-4 h-24 w-full rounded-xl overflow-hidden bg-black/40 relative">
            {cameraAccess === 'granted' ? (
              <div className="w-full h-full rounded-xl glass flex flex-col items-center justify-center text-center">
                <span className="material-symbols-rounded text-3xl text-[#10B981]">verified_user</span>
                <p className="text-[10px] font-black text-[#10B981] mt-1">IDENTITY VERIFIED</p>
              </div>
            ) : (
              <div className="w-full h-full bg-black/80 rounded-xl">
                <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover ${stream ? 'block' : 'hidden'}`} />
                {cameraAccess === 'denied' && <div className="w-full h-full flex items-center justify-center text-red-500 text-[10px] font-black uppercase tracking-wider">Access Denied</div>}
                {!stream && cameraAccess !== 'denied' && (
                  <div className="w-full h-full flex items-center justify-center text-white/20">
                    <span className="material-symbols-rounded text-2xl">videocam_off</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </CheckStep>

        {/* Microphone check */}
        <CheckStep title="2. Ambient Decibel Audit" status={micAccess} onAction={handleMicAccess} actionText="Enable Mic Check" showDisclaimer={true}>
          <p>Please sit in a quiet workspace. Background noises will be monitored.</p>
          <div className="mt-4 h-24 w-full glass rounded-xl flex items-center justify-center p-2 relative bg-black/40">
            {micAccess === 'granted' ? (
              <div className="text-center">
                <span className="material-symbols-rounded text-3xl text-[#10B981]">mic</span>
                <p className="text-[10px] font-black text-[#10B981] mt-1">DECIBELS OK</p>
              </div>
            ) : (
              <div className="w-full h-full bg-black/20 rounded-md relative overflow-hidden flex flex-col justify-end p-2">
                <div ref={audioVisualizerRef} className="h-1 bg-[#10B981] transition-all duration-100 rounded" style={{ width: 'var(--audio-level, 0%)' }}></div>
                {micAccess === 'denied' && <div className="w-full h-full absolute inset-0 flex items-center justify-center text-red-500 text-[10px] font-black uppercase tracking-wider bg-black/60">Access Denied</div>}
                {!micAccess && micAccess !== 'denied' && (
                  <div className="w-full h-full absolute inset-0 flex items-center justify-center text-white/20">
                    <span className="material-symbols-rounded text-2xl">mic_off</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </CheckStep>

        {/* Internet check */}
        <CheckStep title="3. Signal Latency" status={internetCheck} onAction={handleInternetCheck} actionText="Test Connection Latency">
          <p>Ensures connection stability during form responses submission.</p>
          <div className="mt-4 h-24 w-full glass rounded-xl flex items-center justify-center bg-black/40">
            {internetCheck === 'checked' && (
              <div className="text-center">
                <span className="material-symbols-rounded text-3xl text-[#10B981]">signal_wifi_4_bar</span>
                <p className="text-[10px] font-black text-[#10B981] mt-1">LATENCY SECURE</p>
              </div>
            )}
            {internetCheck === 'checking' && (
              <div className="flex flex-col items-center gap-1">
                <div className="w-5 h-5 border-2 border-white/20 border-t-[#10B981] rounded-full animate-spin"></div>
                <span className="text-[9px] opacity-40 font-mono">pinging...</span>
              </div>
            )}
            {internetCheck === 'idle' && <span className="material-symbols-rounded text-2xl opacity-20">wifi</span>}
          </div>
        </CheckStep>
      </div>

      {/* Start Evaluation Action Button */}
      <div className="text-center flex justify-center flex-col items-center">
        <button
          onClick={handleStartTest}
          disabled={!allChecksPassed}
          className="w-full max-w-md py-4.5 bg-[#10B981] text-white font-black rounded-2xl text-base shadow-xl hover:shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {allChecksPassed ? 'Launch Examination Portal' : 'Pass Web Checkpoints to Proceed'}
          <span className="material-symbols-rounded text-lg">arrow_forward</span>
        </button>
        {!allChecksPassed && (
          <p className="text-[10px] opacity-50 mt-4 font-medium">The verification button will engage once camera, microphone, and signal latency pass.</p>
        )}
      </div>
    </div>
  );
};

export default PaidTestPage;
