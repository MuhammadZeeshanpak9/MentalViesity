import { useEffect, useState } from 'react';
import gsap from 'gsap';

interface ToastProps {
  message: string;
  onDismiss: () => void;
}

export default function Toast({ message, onDismiss }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  useEffect(() => {
    if (visible) {
      gsap.fromTo(
        '.toast-container',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    } else {
      gsap.to('.toast-container', { y: -20, opacity: 0, duration: 0.3 });
    }
  }, [visible]);

  return (
    <div
      className="toast-container"
      style={{
        position: 'fixed',
        top: '90px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        background: 'rgba(124, 92, 255, 0.9)',
        color: '#F8F9FF',
        borderRadius: '8px',
        padding: '12px 24px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        backdropFilter: 'blur(10px)',
      }}
    >
      {message}
    </div>
  );
}
