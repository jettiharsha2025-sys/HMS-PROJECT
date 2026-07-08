import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Save, X, User, Phone, Mail,
  MapPin, Calendar, Heart, FileText,
  AlertTriangle, Briefcase, Users,
} from 'lucide-react'

const inputBase = {
  width: '100%', padding: '9px 12px 9px 36px',
  border: '1px solid #e5e7eb', borderRadius: '8px',
  fontSize: '13px', color: '#374151', outline: 'none',
  backgroundColor: '#fff', boxSizing: 'border-box',
}
const labelStyle  = { fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }
const iconWrap    = { position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }
const sectionCard = { backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '20px' }
const sectionTitle= { fontSize: '14px', fontWeight: '700', color: '#1f2937', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }
const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }
const grid3 = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }

const REQUIRED = ['firstName','lastName','dob','gender','phone','email','bloodGroup','address','city','doctor','department','admitType']

const AddPatients = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '', lastName: '', dob: '', gender: '', bloodGroup: '',
    phone: '', email: '', address: '', city: '', state: '', pincode: '',
    emergencyName: '', emergencyPhone: '', emergencyRelation: '',
    doctor: '', department: '', admitDate: '', admitType: '', wardNo: '', bedNo: '',
    issue: '', symptoms: '', allergies: '', medHistory: '',
    insuranceProvider: '', policyNo: '', status: 'Admitted', notes: '',
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
    if (form.phone && !/^\d{10}$/.test(form.phone)) errs.phone = 'Enter valid 10-digit number'
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter valid email'
    return errs
  }

  const handleSubmit = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    console.log('Patient Data:', form)
    navigate('/v/patients')
  }

  const handleReset = () => {
    setForm({
      firstName: '', lastName: '', dob: '', gender: '', bloodGroup: '',
      phone: '', email: '', address: '', city: '', state: '', pincode: '',
      emergencyName: '', emergencyPhone: '', emergencyRelation: '',
      doctor: '', department: '', admitDate: '', admitType: '', wardNo: '', bedNo: '',
      issue: '', symptoms: '', allergies: '', medHistory: '',
      insuranceProvider: '', policyNo: '', status: 'Admitted', notes: '',
    })
    setErrors({})
  }

  const Field = ({ label, name, type = 'text', icon: Icon, placeholder, options }) => {
    const isReq = REQUIRED.includes(name)
    const hasErr = !!errors[name]
    return (
      <div>
        <label style={labelStyle}>
          {label}{isReq && <span style={{ color: '#dc2626', marginLeft: '2px' }}>*</span>}
        </label>
        <div style={{ position: 'relative' }}>
          {Icon && <span style={iconWrap}><Icon size={14} color="#9ca3af" /></span>}
          {options ? (
            <select name={name} value={form[name]} onChange={handleChange}
              style={{ ...inputBase, paddingLeft: Icon ? '36px' : '12px', borderColor: hasErr ? '#fca5a5' : '#e5e7eb', cursor: 'pointer' }}>
              <option value="">Select {label}</option>
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : type === 'textarea' ? (
            <textarea name={name} value={form[name]} onChange={handleChange}
              placeholder={placeholder} rows={3}
              style={{ ...inputBase, paddingLeft: Icon ? '36px' : '12px', paddingTop: '9px', resize: 'vertical', borderColor: hasErr ? '#fca5a5' : '#e5e7eb' }} />
          ) : (
            <input type={type} name={name} value={form[name]} onChange={handleChange}
              placeholder={placeholder}
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

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate(-1)} style={{
            width: '36px', height: '36px', borderRadius: '10px',
            border: '1px solid #e5e7eb', backgroundColor: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}><ArrowLeft size={16} color="#374151" /></button>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>Add Patient</h1>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0' }}>Register a new patient into the system</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleReset} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '9px 16px', borderRadius: '10px',
            border: '1px solid #e5e7eb', backgroundColor: '#fff',
            fontSize: '13px', fontWeight: '600', color: '#6b7280', cursor: 'pointer',
          }}><X size={15} /> Reset</button>
          <button onClick={handleSubmit} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '9px 18px', borderRadius: '10px',
            border: 'none', backgroundColor: '#2563eb',
            fontSize: '13px', fontWeight: '600', color: '#fff', cursor: 'pointer',
          }}><Save size={15} /> Save Patient</button>
        </div>
      </div>

      {/* ── Section 1: Personal Info ── */}
      <div style={sectionCard}>
        <div style={sectionTitle}><User size={16} color="#2563eb" /> Personal Information</div>
        <div style={{ ...grid3, marginBottom: '16px' }}>
          <Field label="First Name"   name="firstName"  icon={User}     placeholder="e.g. Rahul" />
          <Field label="Last Name"    name="lastName"   icon={User}     placeholder="e.g. Sharma" />
          <Field label="Date of Birth" name="dob"       type="date"     icon={Calendar} />
        </div>
        <div style={grid3}>
          <Field label="Gender"       name="gender"     icon={User}     options={['Male','Female','Other']} />
          <Field label="Blood Group"  name="bloodGroup" icon={Heart}    options={['A+','A-','B+','B-','O+','O-','AB+','AB-']} />
          <Field label="Status"       name="status"     icon={User}     options={['Admitted','Outpatient','Discharged']} />
        </div>
      </div>

      {/* ── Section 2: Contact Info ── */}
      <div style={sectionCard}>
        <div style={sectionTitle}><Phone size={16} color="#2563eb" /> Contact Information</div>
        <div style={{ ...grid2, marginBottom: '16px' }}>
          <Field label="Phone Number"  name="phone" icon={Phone} placeholder="e.g. 9876543210" />
          <Field label="Email Address" name="email" type="email" icon={Mail}  placeholder="e.g. rahul@email.com" />
        </div>
        <div style={grid3}>
          <Field label="Address" name="address" icon={MapPin} placeholder="Street / Area" />
          <Field label="City"    name="city"    icon={MapPin} placeholder="e.g. Hyderabad" />
          <Field label="State"   name="state"   icon={MapPin} placeholder="e.g. Telangana" />
        </div>
      </div>

      {/* ── Section 3: Emergency Contact ── */}
      <div style={sectionCard}>
        <div style={sectionTitle}><AlertTriangle size={16} color="#dc2626" /> Emergency Contact</div>
        <div style={grid3}>
          <Field label="Contact Name"     name="emergencyName"     icon={User}  placeholder="e.g. Sita Sharma" />
          <Field label="Contact Phone"    name="emergencyPhone"    icon={Phone} placeholder="e.g. 9876543200" />
          <Field label="Relation"         name="emergencyRelation" icon={Users}
            options={['Father','Mother','Spouse','Sibling','Friend','Guardian','Other']} />
        </div>
      </div>

      {/* ── Section 4: Admission Details ── */}
      <div style={sectionCard}>
        <div style={sectionTitle}><Briefcase size={16} color="#2563eb" /> Admission Details</div>
        <div style={{ ...grid3, marginBottom: '16px' }}>
          <Field label="Doctor Name"    name="doctor"     icon={User}
            options={['Dr. Arun Kumar','Dr. Sneha Rao','Dr. Ramesh Babu','Dr. Kavya Reddy','Dr. Vijay Sharma']} />
          <Field label="Department"     name="department" icon={Briefcase}
            options={['Cardiology','Neurology','Orthopedics','Gastrology','Dermatology','Pulmonology','Endocrinology','ENT','General','Pediatrics','Gynecology']} />
          <Field label="Admission Type" name="admitType"  icon={Briefcase}
            options={['Emergency','Planned','Outpatient','ICU','Surgery']} />
        </div>
        <div style={grid3}>
          <Field label="Admission Date" name="admitDate" type="date" icon={Calendar} />
          <Field label="Ward No."       name="wardNo"    icon={Briefcase} placeholder="e.g. Ward A" />
          <Field label="Bed No."        name="bedNo"     icon={Briefcase} placeholder="e.g. B-12" />
        </div>
      </div>

      {/* ── Section 5: Medical History ── */}
      <div style={sectionCard}>
        <div style={sectionTitle}><Heart size={16} color="#dc2626" /> Medical Information</div>
        <div style={{ ...grid2, marginBottom: '16px' }}>
          <Field label="Primary Issue / Diagnosis" name="issue"     icon={FileText}     placeholder="e.g. Chest Pain, Diabetes" />
          <Field label="Symptoms"                  name="symptoms"  icon={AlertTriangle} placeholder="e.g. Headache, fever, dizziness" />
        </div>
        <div style={grid2}>
          <Field label="Known Allergies"    name="allergies"   type="textarea" icon={AlertTriangle} placeholder="e.g. Penicillin, Dust, Pollen..." />
          <Field label="Medical History"    name="medHistory"  type="textarea" icon={FileText}      placeholder="e.g. Hypertension since 2018, Diabetes..." />
        </div>
      </div>

      {/* ── Section 6: Insurance & Notes ── */}
      <div style={sectionCard}>
        <div style={sectionTitle}><FileText size={16} color="#2563eb" /> Insurance & Notes</div>
        <div style={{ ...grid3, marginBottom: '16px' }}>
          <Field label="Insurance Provider" name="insuranceProvider" icon={FileText} placeholder="e.g. Star Health" />
          <Field label="Policy Number"      name="policyNo"          icon={FileText} placeholder="e.g. SH-2024-001" />
        </div>
        <Field label="Additional Notes" name="notes" type="textarea" icon={FileText} placeholder="Any additional notes for the patient..." />
      </div>

      {/* ── Bottom Action Bar ── */}
      <div style={{
        display: 'flex', justifyContent: 'flex-end', gap: '10px',
        backgroundColor: '#fff', border: '1px solid #e5e7eb',
        borderRadius: '12px', padding: '16px',
      }}>
        <button onClick={() => navigate(-1)} style={{
          padding: '9px 20px', borderRadius: '10px',
          border: '1px solid #e5e7eb', backgroundColor: '#fff',
          fontSize: '13px', fontWeight: '600', color: '#6b7280', cursor: 'pointer',
        }}>Cancel</button>
        <button onClick={handleReset} style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '9px 20px', borderRadius: '10px',
          border: '1px solid #e5e7eb', backgroundColor: '#fff',
          fontSize: '13px', fontWeight: '600', color: '#6b7280', cursor: 'pointer',
        }}><X size={15} /> Reset Form</button>
        <button onClick={handleSubmit} style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '9px 22px', borderRadius: '10px',
          border: 'none', backgroundColor: '#2563eb',
          fontSize: '13px', fontWeight: '600', color: '#fff', cursor: 'pointer',
        }}><Save size={15} /> Save Patient</button>
      </div>

    </div>
  )
}

export default AddPatients