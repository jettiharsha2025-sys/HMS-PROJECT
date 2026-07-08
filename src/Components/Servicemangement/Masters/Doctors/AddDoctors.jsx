import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Save, X, User, Phone, Mail,
  MapPin, Calendar, Briefcase, FileText,
  Star, Clock, Lock, ShieldCheck,
} from 'lucide-react'

const inputBase   = { width: '100%', padding: '9px 12px 9px 36px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', color: '#374151', outline: 'none', backgroundColor: '#fff', boxSizing: 'border-box' }
const labelStyle  = { fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }
const iconWrap    = { position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }
const sectionCard = { backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '20px' }
const sectionTitle= { fontSize: '14px', fontWeight: '700', color: '#1f2937', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }
const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }
const grid3 = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }

const REQUIRED = ['firstName','lastName','empId','gender','phone','email','department','specialty','qualification','experience','joiningDate','shift','status','password','confirmPassword']

const AddDoctors = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '', lastName: '', empId: '', dob: '', gender: '',
    phone: '', email: '', address: '', city: '', state: '',
    department: '', specialty: '', qualification: '', subSpecialty: '',
    experience: '', joiningDate: '', shift: '', consultFee: '',
    licenseNo: '', designation: '', status: 'Active',
    bio: '', awards: '',
    password: '', confirmPassword: '',
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
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter valid email'
    if (form.phone && !/^\d{10}$/.test(form.phone)) errs.phone = 'Enter valid 10-digit number'
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    return errs
  }

  const handleSubmit = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    console.log('Doctor Data:', form)
    navigate('/v/doctors')
  }

  const handleReset = () => {
    setForm({ firstName: '', lastName: '', empId: '', dob: '', gender: '', phone: '', email: '', address: '', city: '', state: '', department: '', specialty: '', qualification: '', subSpecialty: '', experience: '', joiningDate: '', shift: '', consultFee: '', licenseNo: '', designation: '', status: 'Active', bio: '', awards: '', password: '', confirmPassword: '' })
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

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate(-1)} style={{ width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #e5e7eb', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={16} color="#374151" />
          </button>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>Add Doctor</h1>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0' }}>Register a new doctor into the system</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', backgroundColor: '#fff', fontSize: '13px', fontWeight: '600', color: '#6b7280', cursor: 'pointer' }}>
            <X size={15} /> Reset
          </button>
          <button onClick={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: '10px', border: 'none', backgroundColor: '#2563eb', fontSize: '13px', fontWeight: '600', color: '#fff', cursor: 'pointer' }}>
            <Save size={15} /> Save Doctor
          </button>
        </div>
      </div>

      {/* ── Section 1: Personal Info ── */}
      <div style={sectionCard}>
        <div style={sectionTitle}><User size={16} color="#2563eb" /> Personal Information</div>
        <div style={{ ...grid3, marginBottom: '16px' }}>
          <Field label="First Name"    name="firstName" icon={User}     placeholder="e.g. Arun" />
          <Field label="Last Name"     name="lastName"  icon={User}     placeholder="e.g. Kumar" />
          <Field label="Employee ID"   name="empId"     icon={ShieldCheck} placeholder="e.g. DOC-013" />
        </div>
        <div style={grid3}>
          <Field label="Date of Birth" name="dob"    type="date" icon={Calendar} />
          <Field label="Gender"        name="gender" icon={User} options={['Male','Female','Other']} />
          <Field label="Status"        name="status" icon={User} options={['Active','On Leave','Inactive']} />
        </div>
      </div>

      {/* ── Section 2: Contact Info ── */}
      <div style={sectionCard}>
        <div style={sectionTitle}><Phone size={16} color="#2563eb" /> Contact Information</div>
        <div style={{ ...grid2, marginBottom: '16px' }}>
          <Field label="Phone Number"  name="phone" icon={Phone} placeholder="e.g. 9876543210" />
          <Field label="Email Address" name="email" type="email" icon={Mail} placeholder="e.g. arun@medicare.com" />
        </div>
        <div style={grid3}>
          <Field label="Address" name="address" icon={MapPin} placeholder="Street / Area" />
          <Field label="City"    name="city"    icon={MapPin} placeholder="e.g. Hyderabad" />
          <Field label="State"   name="state"   icon={MapPin} placeholder="e.g. Telangana" />
        </div>
      </div>

      {/* ── Section 3: Professional Info ── */}
      <div style={sectionCard}>
        <div style={sectionTitle}><Briefcase size={16} color="#2563eb" /> Professional Information</div>
        <div style={{ ...grid3, marginBottom: '16px' }}>
          <Field label="Department" name="department" icon={Briefcase}
            options={['Cardiology','Neurology','Orthopedics','Gynecology','Pediatrics','Dermatology','Pulmonology','Gastrology','Endocrinology','ENT','General','Psychiatry','Radiology','Urology']} />
          <Field label="Specialization"     name="specialty"    icon={Star}      placeholder="e.g. Interventional Cardiology" />
          <Field label="Sub Specialization" name="subSpecialty" icon={Star}      placeholder="e.g. Heart Failure (optional)" />
        </div>
        <div style={{ ...grid3, marginBottom: '16px' }}>
          <Field label="Qualification"  name="qualification" icon={FileText}  placeholder="e.g. MBBS, MD, DM" />
          <Field label="License No."    name="licenseNo"     icon={ShieldCheck} placeholder="e.g. MCI-2024-1234" />
          <Field label="Designation"    name="designation"   icon={Briefcase} placeholder="e.g. Senior Cardiologist" />
        </div>
        <div style={grid3}>
          <Field label="Experience (yrs)" name="experience"  icon={Briefcase} placeholder="e.g. 14" />
          <Field label="Joining Date"     name="joiningDate" type="date" icon={Calendar} />
          <Field label="Shift"            name="shift"       icon={Clock} options={['Morning','Evening','Night']} />
        </div>
      </div>

      {/* ── Section 4: Consultation ── */}
      <div style={sectionCard}>
        <div style={sectionTitle}><Star size={16} color="#2563eb" /> Consultation & Bio</div>
        <div style={{ ...grid2, marginBottom: '16px' }}>
          <Field label="Consultation Fee (₹)" name="consultFee" icon={FileText} placeholder="e.g. 500" />
        </div>
        <div style={grid2}>
          <Field label="Bio / About"  name="bio"    type="textarea" icon={FileText} placeholder="Brief doctor profile and expertise..." />
          <Field label="Awards & Achievements" name="awards" type="textarea" icon={Star} placeholder="e.g. Best Cardiologist Award 2022..." />
        </div>
      </div>

      {/* ── Section 5: Account Credentials ── */}
      <div style={sectionCard}>
        <div style={sectionTitle}><Lock size={16} color="#2563eb" /> Account Credentials</div>
        <div style={grid2}>
          <Field label="Password"         name="password"        type="password" icon={Lock} placeholder="Min. 8 characters" />
          <Field label="Confirm Password" name="confirmPassword" type="password" icon={Lock} placeholder="Re-enter password" />
        </div>
      </div>

      {/* ── Bottom Action Bar ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px' }}>
        <button onClick={() => navigate(-1)} style={{ padding: '9px 20px', borderRadius: '10px', border: '1px solid #e5e7eb', backgroundColor: '#fff', fontSize: '13px', fontWeight: '600', color: '#6b7280', cursor: 'pointer' }}>Cancel</button>
        <button onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 20px', borderRadius: '10px', border: '1px solid #e5e7eb', backgroundColor: '#fff', fontSize: '13px', fontWeight: '600', color: '#6b7280', cursor: 'pointer' }}><X size={15} /> Reset Form</button>
        <button onClick={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 22px', borderRadius: '10px', border: 'none', backgroundColor: '#2563eb', fontSize: '13px', fontWeight: '600', color: '#fff', cursor: 'pointer' }}><Save size={15} /> Save Doctor</button>
      </div>

    </div>
  )
}

export default AddDoctors