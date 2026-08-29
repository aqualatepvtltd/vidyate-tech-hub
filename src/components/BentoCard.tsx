import React from 'react';
import { motion } from 'motion/react';

interface BentoCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  onClick: () => void;
  footer?: React.ReactNode;
}

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  description,
  icon,
  color,
  onClick,
  footer
}) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 0.99 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="glass p-6 md:p-8 rounded-3xl border cursor-pointer relative overflow-hidden group flex flex-col justify-between min-h-[220px]"
      style={{ borderColor: 'var(--glass-border)' }}
    >
      {/* Dynamic background gradient glow based on prop color */}
      <div
        className="absolute -right-12 -top-12 w-32 h-32 blur-[40px] rounded-full opacity-15 transition-opacity group-hover:opacity-30"
        style={{ backgroundColor: color }}
      ></div>

      <div>
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
          style={{ backgroundColor: `${color}15`, color }}
        >
          <span className="material-symbols-rounded text-2xl">{icon}</span>
        </div>

        <h3 className="text-xl md:text-2xl font-black mb-3 tracking-tight" style={{ color: 'var(--text-main)' }}>
          {title}
        </h3>

        <p className="opacity-60 text-sm md:text-base leading-relaxed font-medium mb-6">
          {description}
        </p>
      </div>

      {footer && <div className="mt-auto pt-4 border-t border-white/5">{footer}</div>}
    </motion.div>
  );
};

export default BentoCard;
