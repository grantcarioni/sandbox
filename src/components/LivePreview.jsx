import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Printer, ShieldCheck, FileText, ChevronDown, Check } from 'lucide-react';
import { Document, Paragraph, TextRun, Packer, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

const LivePreview = ({ template, formData }) => {
  const [showExportMenu, setShowExportMenu] = useState(false);

  const getPopulatedContent = () => {
    let content = template.content;
    template.fields.forEach(field => {
      const placeholder = `[${field.label}]`;
      const value = formData[field.id] || `______`;
      content = content.replaceAll(placeholder, value);
    });
    return content;
  };

  const handlePrint = () => {
    window.print();
  };

  const generateDocx = async () => {
    const content = getPopulatedContent();
    const paragraphs = content.split('\n').map(line => {
      return new Paragraph({
        children: [
          new TextRun({
            text: line,
            font: "Calibri",
            size: 22, // 11pt
          }),
        ],
        spacing: { after: 200 },
      });
    });

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
             alignment: AlignmentType.RIGHT,
             children: [
                 new TextRun({
                     text: "Nutrition International - Authorized Offer",
                     bold: true,
                     color: "001E44",
                     font: "Arial"
                 })
             ]
          }),
          ...paragraphs
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `NI_Offer_${formData.candidateName || 'Candidate'}.docx`);
    setShowExportMenu(false);
  };

  return (
    <div className="preview-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
          <ShieldCheck size={20} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--navy)' }}>Authorized Preview</h2>
        </div>
        <div className="no-print" style={{ display: 'flex', gap: '0.75rem', position: 'relative' }}>
          <button 
            onClick={handlePrint}
            className="btn-ghost"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', fontSize: '0.85rem' }}
          >
            <Printer size={18} /> Print
          </button>
          
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', fontSize: '0.85rem' }}
            >
              <Download size={18} /> Download <ChevronDown size={14} />
            </button>
            
            <AnimatePresence>
              {showExportMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="glass" 
                  style={{ 
                    position: 'absolute', 
                    top: '100%', 
                    right: 0, 
                    zIndex: 200, 
                    marginTop: '0.5rem', 
                    background: 'var(--surface)',
                    width: '180px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                  }}
                >
                  <button onClick={handlePrint} className="export-option" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', border: 'none', background: 'none' }}>
                    <FileText size={16} /> PDF (.pdf)
                  </button>
                  <button onClick={generateDocx} className="export-option" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', border: 'none', background: 'none' }}>
                    <FileText size={16} /> Word (.docx)
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <motion.div layoutId="letter-preview" className="paper" style={{ background: 'white', position: 'relative', border: '1px solid #eee' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem' }}>
          <div>
             <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>Nutrition International</div>
             <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)' }}>Nourishing life</div>
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '11pt', color: '#1a1a1b', lineHeight: '1.8' }}>
          {getPopulatedContent()}
        </div>
        <div style={{ marginTop: '6rem', borderTop: '1px solid #eee', paddingTop: '2rem', fontSize: '0.7rem', color: '#888', fontStyle: 'italic' }}>
          This offer letter is generated by the official Nutrition International Talent Acquisition System. 
          All terms are subject to final board approval.
        </div>
      </motion.div>
    </div>
  );
};

export default LivePreview;
