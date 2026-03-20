import { useState } from 'react';
import emailjs from '@emailjs/browser';

export const useEmail = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sendEmail = async (data) => {
    setIsSubmitting(true);
    setShowSuccess(false);
    setErrorMessage('');
    try {
      await emailjs.send(
        'service_lvvgut5',
        'template_jzsl8ha',
        data,
        '1peIaKL7OaR0TBd0f'
      );
      setIsSubmitting(false);
      setShowSuccess(true);
    } catch (error) {
      setIsSubmitting(false);
      setErrorMessage('Failed to send message. Please check your connection and try again.');
      console.error('Email send error:', error);
    }
  };

  return { sendEmail, isSubmitting, showSuccess, setShowSuccess, errorMessage };
};