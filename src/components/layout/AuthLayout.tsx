import React from 'react';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';

export const AuthLayout = ({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--background)] p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--primary)] opacity-5 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--secondary)] opacity-5 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="h2 mb-2 logo-text">Zota Nail Supply</h1>
          <h2 className="h3 text-[var(--foreground)]">{title}</h2>
          <p className="text-[var(--muted-foreground)] mt-2">{subtitle}</p>
        </div>
        
        <Card className="backdrop-blur-sm bg-[var(--card)]/90 border-opacity-50">
          {children}
        </Card>
      </motion.div>
    </div>
  );
};
