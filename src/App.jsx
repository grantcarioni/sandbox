import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, FileCheck, ChevronLeft, Layout, Building2, UserCircle2, Briefcase, Settings, Globe, ShieldQuestion } from 'lucide-react';
import TemplateSelector from './components/TemplateSelector';
import OfferForm from './components/OfferForm';
import LivePreview from './components/LivePreview';
import AdminPortal from './components/AdminPortal';
import { initialTemplates, regions, contractTerms, workSchedules, categories } from './data/templates';

function App() {
  const [theme, setTheme] = useState('light');
  const [templates, setTemplates] = useState(initialTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1); 
  const [isAdmin, setIsAdmin] = useState(false);

  // Filters
  const [selectedRegion, setSelectedRegion] = useState('hq');
  const [selectedCountry, setSelectedCountry] = useState('Canada');
  const [selectedTerm, setSelectedTerm] = useState('Open Ended');
  const [selectedSchedule, setSelectedSchedule] = useState('Full-Time');
  const [selectedCategory, setSelectedCategory] = useState('Standard');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    const initialData = {};
    template.fields.forEach(field => {
      initialData[field.id] = field.defaultValue || '';
    });
    setFormData(initialData);
    setStep(2);
  };

  const filteredTemplates = templates.filter(t => {
    if (selectedCategory === 'Standard') {
        return t.category === 'Standard' && t.country === selectedCountry;
    }
    return t.category === selectedCategory;
  });

  return (
    <div className="app-wrapper">
      <header className="site-header no-print">
        <div className="container">
          <div className="header-inner">
            <div className="brand-logo" style={{ cursor: 'pointer' }} onClick={() => setStep(1)}>
              <div style={{
                background: 'var(--primary)',
                padding: '10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <FileCheck size={28} />
              </div>
              <div className="brand-text">
                <span className="org">Nutrition International</span>
                <span className="app">Offer Letter Generator</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button 
                onClick={() => setIsAdmin(!isAdmin)} 
                className={`btn-ghost ${isAdmin ? 'active' : ''}`}
                style={{ 
                   display: 'flex', 
                   alignItems: 'center', 
                   gap: '0.5rem', 
                   padding: '0.6rem 1rem', 
                   fontSize: '0.8rem',
                   color: 'white',
                   borderColor: isAdmin ? 'var(--primary)' : 'rgba(255,255,255,0.2)'
                }}
              >
                <Settings size={16} /> Admin Mode
              </button>
              <button 
                onClick={toggleTheme}
                className="theme-toggle"
                style={{ 
                  background: 'transparent', 
                  border: '1.5px solid rgba(255,255,255,0.2)', 
                  color: 'white',
                  padding: '0.6rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container" style={{ paddingBottom: '4rem' }}>
        <AnimatePresence mode="wait">
          {isAdmin ? (
            <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AdminPortal templates={templates} onSave={setTemplates} onCancel={() => setIsAdmin(false)} />
            </motion.div>
          ) : step === 1 ? (
            <motion.div
              key="select-step"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ maxWidth: '1000px', margin: '3rem auto' }}
            >
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--navy)' }}>Global Offer Generator</h2>
                <p style={{ color: 'var(--text-muted)' }}>Generate authorized contracts for all NI global offices.</p>
              </div>

              {/* Advanced Filtering UI */}
              <div className="glass" style={{ padding: '2rem', marginBottom: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', background: 'var(--surface)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)' }}><Globe size={14} style={{ display: 'inline', marginRight: '4px' }}/> Region</label>
                    <select className="input-field" value={selectedRegion} onChange={(e) => {
                         const reg = regions.find(r => r.id === e.target.value);
                         setSelectedRegion(e.target.value);
                         setSelectedCountry(reg.countries[0]);
                    }}>
                        {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                    </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)' }}>Country Office</label>
                    <select className="input-field" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                        {regions.find(r => r.id === selectedRegion)?.countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)' }}>Category</label>
                    <select className="input-field" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)' }}>Contract Term</label>
                    <select className="input-field" value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)}>
                        {contractTerms.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
              </div>

              {filteredTemplates.length > 0 ? (
                <TemplateSelector 
                    templates={filteredTemplates} 
                    selectedId={selectedTemplate?.id} 
                    onSelect={handleTemplateSelect} 
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.6 }}>
                    <ShieldQuestion size={48} style={{ margin: '0 auto 1rem' }}/>
                    <p>No templates found for this specific combination in the {selectedCountry} office.</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="edit-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <div className="no-print" style={{ margin: '2rem 0' }}>
                <button onClick={() => setStep(1)} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ChevronLeft size={18} /> Back to Filters
                </button>
              </div>
              <div className="grid-layout">
                <div className="no-print glass" style={{ padding: '2rem', height: 'fit-content', position: 'sticky', top: '100px' }}>
                  <div style={{ marginBottom: '2rem', borderBottom: '1.5px solid var(--border)', paddingBottom: '1rem' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--navy)' }}>Personalize authorized Offer</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedTemplate.name} • {selectedCountry}</p>
                  </div>
                  <OfferForm fields={selectedTemplate.fields} formData={formData} onChange={setFormData} />
                </div>
                <div>
                  <LivePreview template={selectedTemplate} formData={formData} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
