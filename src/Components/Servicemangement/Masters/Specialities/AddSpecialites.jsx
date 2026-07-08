import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, X, Activity, Users, Stethoscope, FileText, Star, ShieldCheck } from 'lucide-react'

const inputBase   = { width: '100%', padding: '9px 12px 9px 36px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', color: '#374151', outline: 'none', backgroundColor: '#fff', boxSizing: 'border-box' }
const labelStyle  = { fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }
const iconWrap    = { position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }
const sectionCard = { backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '20px' }
const sectionTitle= { fontSize: '14px', fontWeight: '700', color: '#1f2937', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }
const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }
const grid3 = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }

const REQUIRED = ['name', 'code', 'headDoctor', 'department', 'status']

const AddSpecialites = () => {
  const navigate = useNavigate()
  const { id }   = useParams()
  const isEdit   = !!id

  const [form, setForm] = useState({
    name: '', code: '', headDoctor: '', department: '',
    totalDoctors: '', totalNurses: '', totalBeds: '',
    consultFee: '', status: 'Active', description: '',
    services: '', equipment: '', workingHours: '', workingDays: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    REQUIRED.forEach(f => { if (!form[f]?.trim()) errs[f] = 'This field is required' })
    return errs
  }

  const handleSubmit = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    console.log('Speciality Data:', form)
    navigate('/v/specialities')
  }

  const handleReset = () => {
    setForm({ name: '', code: '', headDoctor: '', department: '', totalDoctors: '', totalNurses: '', totalBeds: '', consultFee: '', status: 'Active', description: '', services: '', equipment: '', workingHours: '', workingDays: '' })
    setErrors({})
  }

  const Field = ({ label, name, type = 'text', icon: Icon, placeholder, options }) => {
    const isReq = REQUIRED.includes(name)
    const hasErr = !!errors[name]
    return (
      <div>
        <label style={labelStyle}>{label}{isReq && <span style={{ color: '#dc2626', marginLeft: '2px' }}>*</span>}</label>
        <div style={{ position: 'relative' }}>
          {Icon && <span style={iconWrap}><Icon size={14} color="#9ca3af" /></span>}
          {options ? (
            <select name={name} value={form[name]} onChange={handleChange} style={{ ...inputBase, paddingLeft: Icon ? '36px' : '12px', borderColor: hasErr ? '#fca5a5' : '#e5e7eb', cursor: 'pointer' }}>
              <option value="">Select {label}</option>
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : type === 'textarea' ? (
            <textarea name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} rows={3}
              style={{ ...inputBase, paddingLeft: Icon ? '36px' : '12px', paddingTop: '9px', resize: 'vertical', borderColor: hasErr ? '#fca5a5' : '#e5e7eb' }} />
          ) : (
            <input type={type} name={name} value={form[name]} onChange={handleChange} placeholder={placeholder}
              style={{ ...inputBase, paddingLeft: Icon ? '36px' : '12px', borderColor: hasErr ? '#fca5a5' : '#e5e7eb' }}
              onFocus={e => e.target.style.borderColor = '#2563eb'}
              onBlur={e => e.target.style.borderColor = hasErr ? '#fca5a5' : '#e5e7eb'}
            />
          )}
        </div>
        {hasErr && <p style={{ fontSize: '11px', color: '#dc2626', marginTop: '4px', marginBottom: 0 }}>{errors[name]}</p>}
      </div>
    )
  }

  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate(-1)} style={{ width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #e5e7eb', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ArrowLeft size={16} color="#374151" /></button>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>{isEdit ? 'Edit Speciality' : 'Add Speciality'}</h1>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0' }}>{isEdit ? 'Update speciality details' : 'Register a new hospital speciality'}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', backgroundColor: '#fff', fontSize: '13px', fontWeight: '600', color: '#6b7280', cursor: 'pointer' }}><X size={15} /> Reset</button>
          <button onClick={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: '10px', border: 'none', backgroundColor: '#2563eb', fontSize: '13px', fontWeight: '600', color: '#fff', cursor: 'pointer' }}><Save size={15} /> {isEdit ? 'Update' : 'Save'} Speciality</button>
        </div>
      </div>

      {/* Basic Info */}
      <div style={sectionCard}>
        <div style={sectionTitle}><Activity size={16} color="#2563eb" /> Basic Information</div>
        <div style={{ ...grid3, marginBottom: '16px' }}>
          <Field label="Speciality Name" name="name"       icon={Activity}    placeholder="e.g. Cardiology" />
          <Field label="Code"            name="code"       icon={ShieldCheck} placeholder="e.g. CARD" />
          <Field label="Status"          name="status"     icon={ShieldCheck} options={['Active', 'Inactive']} />
        </div>
        <div style={grid2}>
          <Field label="Head Doctor"  name="headDoctor"  icon={Stethoscope} placeholder="e.g. Dr. Arun Kumar" />
          <Field label="Department"   name="department"  icon={Activity}
            options={['Cardiology','Neurology','Orthopedics','Pediatrics','Dermatology','Gynecology','Pulmonology','Gastroenterology','Endocrinology','ENT','Radiology','General Medicine','Psychiatry','Urology','Nephrology']} />
        </div>
      </div>

      {/* Capacity */}
      <div style={sectionCard}>
        <div style={sectionTitle}><Users size={16} color="#2563eb" /> Capacity & Resources</div>
        <div style={grid3}>
          <Field label="Total Doctors"   name="totalDoctors" icon={Stethoscope} placeholder="e.g. 6" />
          <Field label="Total Nurses"    name="totalNurses"  icon={Users}       placeholder="e.g. 8" />
          <Field label="Total Beds"      name="totalBeds"    icon={Users}       placeholder="e.g. 20" />
          <Field label="Consult Fee (₹)" name="consultFee"   icon={Star}        placeholder="e.g. 500" />
          <Field label="Working Hours"   name="workingHours" icon={Activity}    placeholder="e.g. 8:00 AM – 8:00 PM" />
          <Field label="Working Days"    name="workingDays"  icon={Activity}
            options={['Mon – Fri','Mon – Sat','Mon – Sun','24/7']} />
        </div>
      </div>

      {/* Details */}
      <div style={sectionCard}>
        <div style={sectionTitle}><FileText size={16} color="#2563eb" /> Description & Services</div>
        <div style={{ ...grid2, marginBottom: '16px' }}>
          <Field label="Description" name="description" type="textarea" icon={FileText} placeholder="Brief description of the speciality..." />
          <Field label="Services Offered" name="services" type="textarea" icon={Star} placeholder="e.g. ECG, Echo, Angiography, Bypass Surgery..." />
        </div>
        <Field label="Equipment & Facilities" name="equipment" type="textarea" icon={ShieldCheck} placeholder="e.g. Cath Lab, ICU, Ventilators, Defibrillators..." />
      </div>

      {/* Bottom Bar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px' }}>
        <button onClick={() => navigate(-1)} style={{ padding: '9px 20px', borderRadius: '10px', border: '1px solid #e5e7eb', backgroundColor: '#fff', fontSize: '13px', fontWeight: '600', color: '#6b7280', cursor: 'pointer' }}>Cancel</button>
        <button onClick={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 22px', borderRadius: '10px', border: 'none', backgroundColor: '#2563eb', fontSize: '13px', fontWeight: '600', color: '#fff', cursor: 'pointer' }}><Save size={15} /> {isEdit ? 'Update' : 'Save'} Speciality</button>
      </div>
    </div>
  )
}

export default AddSpecialites