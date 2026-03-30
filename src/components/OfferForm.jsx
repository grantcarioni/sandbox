import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';

const OfferForm = ({ fields, formData, onChange }) => {
  const handleInputChange = (id, value) => {
    onChange({ ...formData, [id]: value });
  };

  return (
    <div className="offer-form">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {fields.map((field) => (
          <div 
            key={field.id} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.4rem',
              gridColumn: field.type === 'textarea' ? 'span 2' : 'auto'
            }}
          >
            <label style={{ 
              fontSize: '0.75rem', 
              fontWeight: 800, 
              color: 'var(--text-muted)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em' 
            }}>
              {field.label}
            </label>
            
            {field.type === 'text' || field.type === 'number' ? (
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="input-field"
              />
            ) : field.type === 'textarea' ? (
              <textarea
                placeholder={field.placeholder}
                value={formData[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="input-field"
                style={{
                  minHeight: '100px',
                  resize: 'vertical',
                }}
              />
            ) : field.type === 'date' ? (
              <DatePicker
                selected={formData[field.id] ? new Date(formData[field.id]) : null}
                onChange={(date) => handleInputChange(field.id, date ? date.toLocaleDateString() : '')}
                dateFormat="MMMM d, yyyy"
                className="input-field"
                customInput={
                  <input
                    className="input-field"
                  />
                }
              />
            ) : field.type === 'select' ? (
              <select
                value={formData[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="input-field"
                style={{ appearance: 'none', background: 'var(--surface)' }}
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferForm;
