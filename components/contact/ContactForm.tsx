"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    enquiryType: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email, and phone number.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          phone: formData.phone,
          email: formData.email,
          enquiryType: formData.enquiryType,
          message: formData.message,
          source: 'Contact Page Form'
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit enquiry.');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again or reach out to us directly.'
      );
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: '',
      enquiryType: '',
      message: ''
    });
    setStatus('idle');
    setErrorMessage('');
  };

  if (status === 'success') {
    return (
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center py-16 animate-fade-in-up">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-prr-primary mb-3">Enquiry Received</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
          Thank you, <span className="font-semibold text-prr-primary">{formData.name}</span>. Our strategic advisory team has received your message and will get in touch with you within 24 hours.
        </p>
        <Button onClick={handleReset} variant="outline" className="border-prr-accent text-prr-accent hover:bg-prr-accent/10">
          Send Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-2xl font-bold text-prr-primary mb-6">Send an Enquiry</h3>
      
      {status === 'error' && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Name *</label>
            <input 
              type="text" 
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
              placeholder="Your name" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Company</label>
            <input 
              type="text" 
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
              placeholder="Your company" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Phone *</label>
            <input 
              type="tel" 
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
              placeholder="Your phone number" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email *</label>
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
              placeholder="Your email address" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Enquiry Type</label>
          <select 
            name="enquiryType"
            value={formData.enquiryType}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent bg-white"
          >
            <option value="">Select an option</option>
            <option value="builder-partnership">Builder Partnership</option>
            <option value="mandate-discussion">Mandate Discussion</option>
            <option value="project-marketing">Project Marketing</option>
            <option value="sales-support">Sales Support</option>
            <option value="cp-partnership">Channel Partner Partnership</option>
            <option value="general">General Enquiry</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Message</label>
          <textarea 
            name="message"
            rows={4} 
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent resize-none" 
            placeholder="How can we help you?"
          ></textarea>
        </div>

        <Button 
          type="submit" 
          disabled={status === 'submitting'}
          variant="accent" 
          size="lg" 
          className="w-full font-bold flex items-center justify-center gap-2"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending Enquiry...</span>
            </>
          ) : (
            <span>Send Message</span>
          )}
        </Button>
      </form>
    </div>
  );
}
