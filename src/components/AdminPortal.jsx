import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Save, X, Code } from 'lucide-react';

const AdminPortal = ({ templates, onSave, onCancel }) => {
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [localTemplates, setLocalTemplates] = useState(templates);

  const handleEdit = (template) => {
    setEditingTemplate({ ...template });
  };

  const handleCreate = () => {
    setEditingTemplate({
      id: `new-${Date.now()}`,
      name: 'New Template',
      category: 'Standard',
      description: 'Template description goes here.',
      content: 'Hello [Candidate Name], [Date]',
      fields: [
        { id: 'date', label: 'Date', type: 'date', defaultValue: new Date().toLocaleDateString() },
        { id: 'candidateName', label: 'Candidate Name', type: 'text' },
      ]
    });
  };

  const handleSaveEdit = () => {
    const updated = localTemplates.map(t => t.id === editingTemplate.id ? editingTemplate : t);
    const final = updated.some(t => t.id === editingTemplate.id) ? updated : [...updated, editingTemplate];
    setLocalTemplates(final);
    onSave(final);
    setEditingTemplate(null);
  };

  return (
    <div className="admin-portal glass" style={{ padding: '2.5rem', marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--navy)' }}>System Administrator Portal</h2>
          <p style={{ color: 'var(--text-muted)' }}>Manage Global Offer Letter Templates and Fields.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleCreate} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Add Template
          </button>
          <button onClick={onCancel} className="btn-ghost" style={{ padding: '0.5rem 1rem' }}>Close Portal</button>
        </div>
      </div>

      {!editingTemplate ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
          {localTemplates.map((template) => (
            <div 
              key={template.id} 
              className="glass" 
              style={{ 
                padding: '1.25rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: 'var(--surface)'
              }}
            >
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>{template.category}</span>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--navy)' }}>{template.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{template.description}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => handleEdit(template)} className="btn-ghost" style={{ padding: '0.5rem' }}><Edit2 size={16} /></button>
                <button 
                  onClick={() => setLocalTemplates(localTemplates.filter(t => t.id !== template.id))} 
                  className="btn-ghost" 
                  style={{ padding: '0.5rem', borderColor: '#fee2e2', color: '#ef4444' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass" style={{ padding: '2rem', background: 'var(--surface-2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
             <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)' }}>Editing Template: {editingTemplate.name}</h3>
             <div style={{ display: 'flex', gap: '1rem' }}>
               <button onClick={handleSaveEdit} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Save size={18}/> Save Changes</button>
               <button onClick={() => setEditingTemplate(null)} className="btn-ghost"><X size={18}/></button>
             </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>Template Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={editingTemplate.name} 
                  onChange={(e) => setEditingTemplate({...editingTemplate, name: e.target.value})} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>Category</label>
                <select 
                   className="input-field" 
                   value={editingTemplate.category} 
                   onChange={(e) => setEditingTemplate({...editingTemplate, category: e.target.value})}
                >
                  <option value="Standard">Standard</option>
                  <option value="Consultancy">Consultancy</option>
                  <option value="Expat">Expat</option>
                  <option value="Field Staff">Field Staff Direct Hire</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                 <label style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>Description</label>
                 <textarea 
                    className="input-field" 
                    value={editingTemplate.description} 
                    onChange={(e) => setEditingTemplate({...editingTemplate, description: e.target.value})} 
                 />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Code size={14}/> Template Content (Use [Label] for placeholders)
              </label>
              <textarea 
                className="input-field" 
                style={{ minHeight: '300px', fontFamily: 'monospace', fontSize: '13px' }} 
                value={editingTemplate.content} 
                onChange={(e) => setEditingTemplate({...editingTemplate, content: e.target.value})} 
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminPortal;
