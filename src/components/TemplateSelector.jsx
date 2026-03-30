import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Briefcase, Award, GraduationCap, Users } from 'lucide-react';

const TemplateSelector = ({ templates, selectedId, onSelect }) => {
  return (
    <div className="template-selector">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(template)}
            className={`glass template-card`}
            style={{
              padding: '2.5rem 2rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '1.5rem',
              background: 'var(--surface)',
              border: selectedId === template.id ? '2px solid var(--primary)' : '1.5px solid var(--border)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {selectedId === template.id && (
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'var(--primary)',
                color: 'white',
                padding: '0.25rem 1rem',
                fontSize: '0.65rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                borderBottomLeftRadius: '8px'
              }}>
                Selected
              </div>
            )}
            
            <div style={{
              background: template.id === 'executive-offer' ? 'var(--navy)' : 'var(--primary)',
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
            }}>
              {template.id === 'executive-offer' ? <Award size={32} /> : <Users size={32} />}
            </div>
            
            <div>
              <h3 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '1.25rem', 
                fontWeight: 700, 
                color: 'var(--navy)',
                marginBottom: '0.75rem' 
              }}>
                {template.name}
              </h3>
              <p style={{ 
                fontSize: '0.9rem', 
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                margin: '0 auto',
                maxWidth: '22ch'
              }}>
                {template.description}
              </p>
            </div>

            <button className="btn-primary" style={{ marginTop: 'auto', width: '100%', fontSize: '0.85rem' }}>
              Select Template
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
