import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, X, User, Stethoscope, FileText, Calendar, Plus, Trash2, Pill } from 'lucide-react'

const inputBase   = { width: '100%', padding: '9px 12px 9px 36px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', color: '#374151', outline: 'none', backgroundColor: '#fff', boxSizing: 'border-box' }
const plainInput  = { width: '100%', padding: '9px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', color: '#374151', outline: 'none', backgroundColor: '#fff', boxSizing: 'border-box' }
const labelStyle  = { fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }
const iconWrap    = { position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }
const sectionCard = { backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '20px' }
const sectionTitle= { fontSize: '14px', fontWeight: '700', color: '#1f2937', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }
const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }
const grid3 = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }

const REQUIRED = ['patientName', 'patientId', 'doctorName', 'department', 'date', 'diagnosis', 'status']

const emptyMedicine = { name: '', dosage: '', frequency: '', duration: '' }

const AddPrescription = () => {
  const navigate = useNavigate()
  const { id }   = useParams()
  const isEdit   = !!id

  const [form, setForm] = useState({
    patientName: '', patientId: '', doctorName: '', department: '',
    date: '', diagnosis: '', notes: '', status: 'Active',
  })
  const [medicines, setMedicines] = useState([{ ...emptyMedicine }])
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleMedicineChange = (index, field, value) => {
    setMedicines(prev => prev.map((m, i) => i === index ? { ...m, [field]: value } : m))
  }

  const addMedicineRow = () => setMedicines(prev => [...prev, { ...emptyMedicine }])
  const removeMedicineRow = (index) => setMedicines(prev => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev)

  const validate = () => {
    const errs = {}
    REQUIRED.forEach(f => { if (!form[f]?.trim()) errs[f] = 'This field is required' })
    return errs
  }

  const handleSubmit = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    console.log('Prescription Data:', { ...form, medicines })
    navigate('/v/prescription')
  }

  const handleReset = () => {
    setForm({ patientName: '', patientId: '', doctorName: '', department: '', date: '', diagnosis: '', notes: '', status: 'Active' })
    setMedicines([{ ...emptyMedicine }])
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
            <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>{isEdit ? 'Edit Prescription' : 'Add Prescription'}</h1>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0' }}>{isEdit ? 'Update prescription details' : 'Create a new patient prescription'}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', backgroundColor: '#fff', fontSize: '13px', fontWeight: '600', color: '#6b7280', cursor: 'pointer' }}><X size={15} /> Reset</button>
          <button onClick={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: '10px', border: 'none', backgroundColor: '#2563eb', fontSize: '13px', fontWeight: '600', color: '#fff', cursor: 'pointer' }}><Save size={15} /> {isEdit ? 'Update' : 'Save'} Prescription</button>
        </div>
      </div>

      {/* Patient & Doctor Info */}
      <div style={sectionCard}>
        <div style={sectionTitle}><User size={16} color="#2563eb" /> Patient & Doctor Information</div>
        <div style={{ ...grid3, marginBottom: '16px' }}>
          <Field label="Patient Name" name="patientName" icon={User}        placeholder="e.g. Ravi Kumar" />
          <Field label="Patient ID"   name="patientId"   icon={User}        placeholder="e.g. PT-1042" />
          <Field label="Date"         name="date"         type="date" icon={Calendar} />
        </div>
        <div style={grid3}>
          <Field label="Doctor Name" name="doctorName" icon={Stethoscope} placeholder="e.g. Dr. Arun Kumar" />
          <Field label="Department"  name="department"  icon={Stethoscope}
            options={['Cardiology','Neurology','Orthopedics','Pediatrics','Dermatology','Gynecology','Pulmonology','Gastroenterology','Endocrinology','ENT','Radiology','General Medicine']} />
          <Field label="Status" name="status" icon={FileText} options={['Active', 'Completed', 'Cancelled']} />
        </div>
      </div>

      {/* Diagnosis */}
      <div style={sectionCard}>
        <div style={sectionTitle}><FileText size={16} color="#2563eb" /> Diagnosis & Notes</div>
        <div style={{ marginBottom: '16px' }}>
          <Field label="Diagnosis" name="diagnosis" icon={FileText} placeholder="e.g. Hypertension" />
        </div>
        <Field label="Notes" name="notes" type="textarea" icon={FileText} placeholder="Additional instructions or follow-up notes..." />
      </div>

      {/* Medicines */}
      <div style={sectionCard}>
        <div style={{ ...sectionTitle, justifyContent: 'space-between', display: 'flex' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Pill size={16} color="#2563eb" /> Medicines</span>
          <button onClick={addMedicineRow} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', border: '1px solid #bfdbfe', backgroundColor: '#eff6ff', fontSize: '12px', fontWeight: '600', color: '#2563eb', cursor: 'pointer' }}>
            <Plus size={13} /> Add Medicine
          </button>
        </div>

        {medicines.map((med, index) => (
          <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '12px', marginBottom: '12px', alignItems: 'flex-end' }}>
            <div>
              <label style={{ ...labelStyle, fontSize: '11px' }}>Medicine Name</label>
              <input value={med.name} onChange={e => handleMedicineChange(index, 'name', e.target.value)} placeholder="e.g. Paracetamol" style={plainInput} />
            </div>
            <div>
              <label style={{ ...labelStyle, fontSize: '11px' }}>Dosage</label>
              <input value={med.dosage} onChange={e => handleMedicineChange(index, 'dosage', e.target.value)} placeholder="e.g. 500mg" style={plainInput} />
            </div>
            <div>
              <label style={{ ...labelStyle, fontSize: '11px' }}>Frequency</label>
              <input value={med.frequency} onChange={e => handleMedicineChange(index, 'frequency', e.target.value)} placeholder="e.g. Twice daily" style={plainInput} />
            </div>
            <div>
              <label style={{ ...labelStyle, fontSize: '11px' }}>Duration</label>
              <input value={med.duration} onChange={e => handleMedicineChange(index, 'duration', e.target.value)} placeholder="e.g. 7 days" style={plainInput} />
            </div>
            <button onClick={() => removeMedicineRow(index)} style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#fef2f2', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <Trash2 size={14} color="#dc2626" />
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px' }}>
        <button onClick={() => navigate(-1)} style={{ padding: '9px 20px', borderRadius: '10px', border: '1px solid #e5e7eb', backgroundColor: '#fff', fontSize: '13px', fontWeight: '600', color: '#6b7280', cursor: 'pointer' }}>Cancel</button>
        <button onClick={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 22px', borderRadius: '10px', border: 'none', backgroundColor: '#2563eb', fontSize: '13px', fontWeight: '600', color: '#fff', cursor: 'pointer' }}><Save size={15} /> {isEdit ? 'Update' : 'Save'} Prescription</button>
      </div>
    </div>
  )
}

export default AddPrescription