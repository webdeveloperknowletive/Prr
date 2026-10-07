"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, Loader2, UploadCloud, FileText } from 'lucide-react';
import Link from 'next/link';

export function PitchProjectForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    projectName: '',
    location: '',
    projectType: '',
    units: '',
    configurations: '',
    stage: '',
    launchDate: '',
    possessionTimeline: '',
    priceRange: '',
    inventory: '',
    monthlySales: '',
    salesTeamSize: '',
    marketingBudget: '',
    cpNetwork: '',
    leadSources: '',
    services: [] as string[],
    additionalNotes: ''
  });

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const servicesList = [
    "Project Planning", "Market Research", "Competitor Analysis",
    "Pricing Support", "Project Positioning", "Digital Marketing",
    "Lead Generation", "CP Activation", "Site Visit Generation",
    "Sales Support", "Mandate Sales", "Exclusive Inventory Sales",
    "Launch Strategy", "Sustenance Strategy"
  ];

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxToggle = (service: string) => {
    setFormData(prev => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists ? prev.services.filter(s => s !== service) : [...prev.services, service]
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName.trim() || !formData.contactPerson.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.projectName.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required developer and project fields.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 900));
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('Submission failed. Please check your connection and try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      companyName: '',
      contactPerson: '',
      phone: '',
      email: '',
      projectName: '',
      location: '',
      projectType: '',
      units: '',
      configurations: '',
      stage: '',
      launchDate: '',
      possessionTimeline: '',
      priceRange: '',
      inventory: '',
      monthlySales: '',
      salesTeamSize: '',
      marketingBudget: '',
      cpNetwork: '',
      leadSources: '',
      services: [],
      additionalNotes: ''
    });
    setFiles([]);
    setStatus('idle');
    setErrorMessage('');
  };

  if (status === 'success') {
    return (
      <div className="bg-white p-10 md:p-16 rounded-2xl shadow-sm border border-gray-100 text-center py-20 animate-fade-in-up">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-prr-primary mb-4">Project Pitch Submitted</h2>
        <p className="text-gray-600 max-w-lg mx-auto mb-8 text-lg leading-relaxed">
          Thank you, <span className="font-semibold text-prr-primary">{formData.contactPerson}</span>. We have received the details for <span className="font-semibold text-prr-primary">{formData.projectName}</span> ({formData.companyName}). Our real estate sales and mandate advisory team will review the details and reach out within 24–48 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleReset} variant="outline" className="border-prr-accent text-prr-accent hover:bg-prr-accent/10 px-8 py-6">
            Submit Another Project
          </Button>
          <Button asChild className="bg-prr-primary hover:bg-[#0B2748] text-white px-8 py-6">
            <Link href="/projects">Explore Current Mandates</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
      {status === 'error' && (
        <div className="mb-8 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* SECTION 1: Builder Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-prr-primary border-b pb-2">1. Builder / Developer Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Company Name *</label>
              <input 
                type="text" 
                name="companyName"
                value={formData.companyName}
                onChange={handleTextChange}
                required
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
                placeholder="Developer / Company Name" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Contact Person *</label>
              <input 
                type="text" 
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleTextChange}
                required
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
                placeholder="Your Full Name" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number *</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleTextChange}
                required
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
                placeholder="Mobile Number" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address *</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleTextChange}
                required
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
                placeholder="Work Email" 
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Project Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-prr-primary border-b pb-2">2. Project Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Project Name *</label>
              <input 
                type="text" 
                name="projectName"
                value={formData.projectName}
                onChange={handleTextChange}
                required
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
                placeholder="Name of your project" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Location *</label>
              <input 
                type="text" 
                name="location"
                value={formData.location}
                onChange={handleTextChange}
                required
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
                placeholder="Micro-market / Area in Pune" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Project Type</label>
              <select 
                name="projectType"
                value={formData.projectType}
                onChange={handleTextChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent bg-white"
              >
                <option value="">Select Project Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Plots">Plots</option>
                <option value="Mixed Use">Mixed Use</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Number of Units</label>
              <input 
                type="number" 
                name="units"
                value={formData.units}
                onChange={handleTextChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
                placeholder="Total inventory size" 
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Configurations</label>
              <input 
                type="text" 
                name="configurations"
                value={formData.configurations}
                onChange={handleTextChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
                placeholder="e.g., 2 BHK, 3 BHK, Retail Shops" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Current Project Stage</label>
              <select 
                name="stage"
                value={formData.stage}
                onChange={handleTextChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent bg-white"
              >
                <option value="">Select Stage</option>
                <option value="Planning">Planning</option>
                <option value="Pre-launch">Pre-launch</option>
                <option value="Launch">Launch</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Ready Possession">Ready Possession</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Expected / Actual Launch Date</label>
              <input 
                type="text" 
                name="launchDate"
                value={formData.launchDate}
                onChange={handleTextChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
                placeholder="e.g., Q3 2026" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Possession Timeline</label>
              <input 
                type="text" 
                name="possessionTimeline"
                value={formData.possessionTimeline}
                onChange={handleTextChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
                placeholder="e.g., Dec 2028" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Approximate Price Range</label>
              <input 
                type="text" 
                name="priceRange"
                value={formData.priceRange}
                onChange={handleTextChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
                placeholder="e.g., 60L - 1.2Cr" 
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Business Status */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-prr-primary border-b pb-2">3. Business Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Current Inventory Available</label>
              <input 
                type="number" 
                name="inventory"
                value={formData.inventory}
                onChange={handleTextChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
                placeholder="Unsold units" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Average Monthly Sales (Units)</label>
              <input 
                type="number" 
                name="monthlySales"
                value={formData.monthlySales}
                onChange={handleTextChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
                placeholder="Current velocity" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Sales Team Size</label>
              <input 
                type="number" 
                name="salesTeamSize"
                value={formData.salesTeamSize}
                onChange={handleTextChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
                placeholder="Number of closers" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Approximate Marketing Budget</label>
              <input 
                type="text" 
                name="marketingBudget"
                value={formData.marketingBudget}
                onChange={handleTextChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
                placeholder="Monthly marketing budget" 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Current CP Network Size</label>
              <input 
                type="text" 
                name="cpNetwork"
                value={formData.cpNetwork}
                onChange={handleTextChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
                placeholder="e.g., Working with 50 active CPs" 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Existing Lead Sources</label>
              <input 
                type="text" 
                name="leadSources"
                value={formData.leadSources}
                onChange={handleTextChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent" 
                placeholder="e.g., Google Ads, Portals, Offline" 
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: Support Required */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-prr-primary border-b pb-2">4. Support Required</h3>
          <p className="text-sm text-gray-500 mb-4">Select the areas where you need Prop Range Realty's expertise:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {servicesList.map((service) => (
              <label 
                key={service} 
                className={`flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                  formData.services.includes(service) ? 'border-prr-accent bg-amber-50/20' : 'border-gray-100'
                }`}
              >
                <input 
                  type="checkbox" 
                  checked={formData.services.includes(service)}
                  onChange={() => handleCheckboxToggle(service)}
                  className="w-4 h-4 text-prr-accent border-gray-300 rounded focus:ring-prr-accent" 
                />
                <span className="text-sm font-medium text-gray-700">{service}</span>
              </label>
            ))}
          </div>
        </div>

        {/* SECTION 5: Files */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-prr-primary border-b pb-2">5. Project Documents (Optional)</h3>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Upload Project Brochure, Price Sheet, Floor Plan, or Presentation</label>
            <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer block">
              <div className="text-gray-500 flex flex-col items-center">
                <UploadCloud className="w-8 h-8 mb-3 text-prr-accent" />
                <span className="font-medium text-prr-primary">Click to select files</span>
                <span className="text-xs mt-1 text-gray-400">(Max size: 10MB per file, PDF, DOC, PPT, PNG, JPG)</span>
              </div>
              <input 
                type="file" 
                onChange={handleFileChange}
                className="hidden" 
                multiple 
                accept=".pdf,.ppt,.pptx,.doc,.docx,.jpg,.jpeg,.png" 
              />
            </label>
            {files.length > 0 && (
              <div className="space-y-2 mt-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Selected Files ({files.length}):</p>
                <div className="flex flex-wrap gap-2">
                  {files.map((file, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium border border-gray-200">
                      <FileText className="w-3.5 h-3.5 text-prr-accent" />
                      {file.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 6: Challenge */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-prr-primary border-b pb-2">6. Additional Details</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Tell us about your project and current sales challenge.</label>
            <textarea 
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleTextChange}
              rows={6} 
              className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-prr-accent focus:ring-1 focus:ring-prr-accent resize-none" 
              placeholder="What are the main roadblocks you are facing?"
            ></textarea>
          </div>
        </div>

        <div className="pt-8">
          <Button 
            type="submit" 
            disabled={status === 'submitting'}
            size="lg" 
            variant="accent" 
            className="w-full md:w-auto px-12 py-6 text-lg font-bold flex items-center justify-center gap-2"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting Project Details...</span>
              </>
            ) : (
              <span>SUBMIT PROJECT FOR REVIEW</span>
            )}
          </Button>
          <p className="text-sm text-gray-500 mt-4 text-center md:text-left">
            By submitting this form, you agree to our <Link href="/privacy-policy" className="text-prr-accent hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </form>
    </div>
  );
}
