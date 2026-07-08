import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, Pencil, Trash2, User, Phone, Mail,
  MapPin, Briefcase, Calendar, Star, Clock,
  Activity, FileText, ShieldCheck, Users,
  ClipboardList, Heart,
} from 'lucide-react'

// ── Shared doctorsData — same array as AllDoctors.jsx ──
// In a real project, move this to a separate file: data/doctorsData.js
// and import it in both AllDoctors.jsx and ViewDoctors.jsx
const doctorsData = [
  { id: 1,  name: 'Dr. Arun Kumar',   empId: 'DOC-001', dept: 'Cardiology',    specialty: 'Interventional Cardiology', phone: '9876541001', email: 'arun@medicare.com',   experience: 14, patients: 48, rating: 4.9, status: 'Active',   shift: 'Morning', gender: 'Male',   qualification: 'MBBS, MD, DM',   avatar: 'AK', address: '45-B, Jubilee Hills',  city: 'Hyderabad', state: 'Telangana', dob: '10 June 1985',    designation: 'Senior Cardiologist',    licenseNo: 'MCI-2010-4521', joiningDate: '01 March 2010',   consultFee: '₹800',  subSpecialty: 'Heart Failure Management',  surgeries: 320, consultations: 980,  bio: 'Dr. Arun Kumar is a highly experienced Interventional Cardiologist with over 14 years of expertise in complex cardiac procedures.', awards: 'Best Cardiologist Award 2022 — Apollo Healthcare.' },
  { id: 2,  name: 'Dr. Sneha Rao',    empId: 'DOC-002', dept: 'Neurology',     specialty: 'Clinical Neurology',        phone: '9876541002', email: 'sneha@medicare.com',   experience: 10, patients: 42, rating: 4.8, status: 'Active',   shift: 'Evening', gender: 'Female', qualification: 'MBBS, MD, DM',   avatar: 'SR', address: '22, Banjara Hills',     city: 'Hyderabad', state: 'Telangana', dob: '05 Aug 1990',     designation: 'Neurologist',            licenseNo: 'MCI-2014-7823', joiningDate: '15 Jan 2014',     consultFee: '₹700',  subSpecialty: 'Stroke Management',         surgeries: 80,  consultations: 750,  bio: 'Dr. Sneha Rao is a dedicated Clinical Neurologist with 10 years of experience in diagnosing and treating neurological disorders.', awards: 'Excellence in Neurology 2021 — IMA.' },
  { id: 3,  name: 'Dr. Ramesh Babu',  empId: 'DOC-003', dept: 'Orthopedics',   specialty: 'Joint Replacement',         phone: '9876541003', email: 'ramesh@medicare.com',  experience: 18, patients: 55, rating: 4.7, status: 'Active',   shift: 'Morning', gender: 'Male',   qualification: 'MBBS, MS',       avatar: 'RB', address: '7, Film Nagar',         city: 'Hyderabad', state: 'Telangana', dob: '14 Feb 1979',     designation: 'Orthopedic Surgeon',     licenseNo: 'MCI-2006-3312', joiningDate: '01 June 2006',    consultFee: '₹900',  subSpecialty: 'Knee & Hip Surgery',        surgeries: 520, consultations: 1100, bio: 'Dr. Ramesh Babu is a senior orthopedic surgeon specializing in complex joint replacement surgeries with 18 years of experience.', awards: 'Best Orthopedic Surgeon 2020 — State Medical Council.' },
  { id: 4,  name: 'Dr. Kavya Reddy',  empId: 'DOC-004', dept: 'Gynecology',    specialty: 'Obstetrics & Gynecology',   phone: '9876541004', email: 'kavya@medicare.com',   experience: 9,  patients: 38, rating: 4.7, status: 'Active',   shift: 'Morning', gender: 'Female', qualification: 'MBBS, MS',       avatar: 'KR', address: '19, Madhapur',          city: 'Hyderabad', state: 'Telangana', dob: '22 Nov 1991',     designation: 'Gynecologist',           licenseNo: 'MCI-2015-9834', joiningDate: '01 April 2015',   consultFee: '₹600',  subSpecialty: 'High Risk Pregnancy',       surgeries: 240, consultations: 820,  bio: 'Dr. Kavya Reddy specializes in high-risk pregnancies and gynecological surgeries, with a compassionate patient-care approach.', awards: 'Young Achiever Award 2022 — FOGSI.' },
  { id: 5,  name: 'Dr. Vijay Sharma', empId: 'DOC-005', dept: 'Cardiology',    specialty: 'Cardiac Surgery',           phone: '9876541005', email: 'vijay@medicare.com',   experience: 20, patients: 35, rating: 4.6, status: 'On Leave', shift: 'Night',   gender: 'Male',   qualification: 'MBBS, MD, MCh',  avatar: 'VS', address: '3, Kondapur',           city: 'Hyderabad', state: 'Telangana', dob: '08 March 1977',   designation: 'Cardiac Surgeon',        licenseNo: 'MCI-2004-2211', joiningDate: '01 Jan 2004',     consultFee: '₹1200', subSpecialty: 'Bypass & Valve Surgery',    surgeries: 610, consultations: 540,  bio: 'Dr. Vijay Sharma is one of the most experienced cardiac surgeons with 20+ years in open-heart surgery and cardiac bypass procedures.', awards: 'Lifetime Achievement — Cardiac Surgery 2023.' },
  { id: 6,  name: 'Dr. Priya Nair',   empId: 'DOC-006', dept: 'Pediatrics',    specialty: 'Neonatology',               phone: '9876541006', email: 'priya@medicare.com',   experience: 8,  patients: 60, rating: 4.8, status: 'Active',   shift: 'Morning', gender: 'Female', qualification: 'MBBS, MD',       avatar: 'PN', address: '15, Gachibowli',        city: 'Hyderabad', state: 'Telangana', dob: '30 July 1992',    designation: 'Pediatric Specialist',   licenseNo: 'MCI-2016-5671', joiningDate: '01 Aug 2016',     consultFee: '₹500',  subSpecialty: 'Newborn Intensive Care',     surgeries: 0,   consultations: 1400, bio: 'Dr. Priya Nair is a dedicated pediatrician focused on neonatal care and child health with 8 years of clinical experience.', awards: 'Best Pediatrician 2022 — IAP Telangana.' },
  { id: 7,  name: 'Dr. Suresh Gupta', empId: 'DOC-007', dept: 'Dermatology',   specialty: 'Cosmetic Dermatology',      phone: '9876541007', email: 'suresh@medicare.com',  experience: 12, patients: 44, rating: 4.5, status: 'Active',   shift: 'Evening', gender: 'Male',   qualification: 'MBBS, MD',       avatar: 'SG', address: '88, Hitech City',       city: 'Hyderabad', state: 'Telangana', dob: '17 April 1984',   designation: 'Dermatologist',          licenseNo: 'MCI-2012-8890', joiningDate: '01 March 2012',   consultFee: '₹600',  subSpecialty: 'Laser & Aesthetic Treatments', surgeries: 0, consultations: 960,  bio: 'Dr. Suresh Gupta is an experienced dermatologist with expertise in cosmetic procedures, laser treatments and skin disorders.', awards: '' },
  { id: 8,  name: 'Dr. Anita Mehta',  empId: 'DOC-008', dept: 'Pulmonology',   specialty: 'Respiratory Medicine',      phone: '9876541008', email: 'anita@medicare.com',   experience: 11, patients: 39, rating: 4.6, status: 'Inactive', shift: 'Morning', gender: 'Female', qualification: 'MBBS, MD',       avatar: 'AM', address: '34, Kukatpally',        city: 'Hyderabad', state: 'Telangana', dob: '12 Dec 1985',     designation: 'Pulmonologist',          licenseNo: 'MCI-2013-4432', joiningDate: '15 June 2013',    consultFee: '₹650',  subSpecialty: 'Asthma & COPD Management',  surgeries: 0,   consultations: 720,  bio: 'Dr. Anita Mehta is a specialist in respiratory medicine with 11 years of experience treating asthma, COPD and pulmonary diseases.', awards: '' },
  { id: 9,  name: 'Dr. Kiran Rao',    empId: 'DOC-009', dept: 'Gastrology',    specialty: 'Hepatology',                phone: '9876541009', email: 'kiran@medicare.com',   experience: 15, patients: 50, rating: 4.7, status: 'Active',   shift: 'Morning', gender: 'Male',   qualification: 'MBBS, MD, DM',   avatar: 'KR', address: '56, Secunderabad',      city: 'Hyderabad', state: 'Telangana', dob: '25 Jan 1982',     designation: 'Gastroenterologist',     licenseNo: 'MCI-2009-3310', joiningDate: '01 Sept 2009',    consultFee: '₹750',  subSpecialty: 'Liver Diseases & Endoscopy', surgeries: 190, consultations: 880,  bio: 'Dr. Kiran Rao is a leading hepatologist and gastroenterologist with expertise in liver diseases and advanced endoscopic procedures.', awards: 'Best Gastroenterologist 2021 — ISGCON.' },
  { id: 10, name: 'Dr. Meena Joshi',  empId: 'DOC-010', dept: 'Endocrinology', specialty: 'Diabetes & Metabolism',     phone: '9876541010', email: 'meena@medicare.com',   experience: 7,  patients: 52, rating: 4.6, status: 'Active',   shift: 'Evening', gender: 'Female', qualification: 'MBBS, MD',       avatar: 'MJ', address: '11, Ameerpet',          city: 'Hyderabad', state: 'Telangana', dob: '18 June 1994',    designation: 'Endocrinologist',        licenseNo: 'MCI-2017-6621', joiningDate: '15 Feb 2017',     consultFee: '₹550',  subSpecialty: 'Thyroid & Obesity',         surgeries: 0,   consultations: 1020, bio: 'Dr. Meena Joshi specializes in diabetes management, thyroid disorders and metabolic diseases with a holistic treatment approach.', awards: '' },
  { id: 11, name: 'Dr. Ravi Teja',    empId: 'DOC-011', dept: 'Neurology',     specialty: 'Epilepsy & Stroke',         phone: '9876541011', email: 'ravi@medicare.com',    experience: 6,  patients: 33, rating: 4.4, status: 'Active',   shift: 'Night',   gender: 'Male',   qualification: 'MBBS, MD',       avatar: 'RT', address: '77, LB Nagar',          city: 'Hyderabad', state: 'Telangana', dob: '03 Sept 1996',    designation: 'Neurologist',            licenseNo: 'MCI-2018-7730', joiningDate: '01 July 2018',    consultFee: '₹500',  subSpecialty: 'Epilepsy Management',       surgeries: 0,   consultations: 560,  bio: 'Dr. Ravi Teja is a neurologist with 6 years of experience focusing on epilepsy, stroke management and movement disorders.', awards: '' },
  { id: 12, name: 'Dr. Lakshmi Devi', empId: 'DOC-012', dept: 'ENT',           specialty: 'Otolaryngology',            phone: '9876541012', email: 'lakshmi@medicare.com', experience: 13, patients: 47, rating: 4.5, status: 'On Leave', shift: 'Morning', gender: 'Female', qualification: 'MBBS, MS',       avatar: 'LD', address: '29, Dilsukhnagar',      city: 'Hyderabad', state: 'Telangana', dob: '20 Oct 1983',     designation: 'ENT Specialist',         licenseNo: 'MCI-2011-5512', joiningDate: '01 Dec 2011',     consultFee: '₹550',  subSpecialty: 'Head & Neck Surgery',       surgeries: 280, consultations: 790,  bio: 'Dr. Lakshmi Devi is an experienced ENT specialist with 13 years of practice in ear, nose, throat and head & neck surgeries.', awards: 'Excellence in ENT Surgery 2020 — AOI.' },
]

// ── Styles ──
const statusStyle = {
  Active:     { background: '#dcfce7', color: '#15803d' },
  'On Leave': { background: '#fef9c3', color: '#a16207' },
  Inactive:   { background: '#fee2e2', color: '#dc2626' },
}
const shiftStyle = {
  Morning: { background: '#dbeafe', color: '#1d4ed8' },
  Evening: { background: '#f3e8ff', color: '#7e22ce' },
  Night:   { background: '#1e293b', color: '#94a3b8' },
}
const patientStatusStyle = {
  Admitted:   { background: '#dbeafe', color: '#1d4ed8' },
  Discharged: { background: '#dcfce7', color: '#15803d' },
}

const sectionCard  = { backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }
const sectionTitle = { fontSize: '14px', fontWeight: '700', color: '#1f2937', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }

const InfoRow = ({ icon: Icon, label, value }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon size={15} color="#2563eb" />
    </div>
    <div>
      <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>{label}</div>
      <div style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>{value || '—'}</div>
    </div>
  </div>
)

const ViewDoctors = () => {
  const navigate    = useNavigate()
  const { id }      = useParams()

  // ── KEY FIX: Find doctor dynamically by id from URL ──
  const d = doctorsData.find(doc => doc.id === parseInt(id))

  // ── Handle doctor not found ──
  if (!d) {
    return (
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '16px' }}>
        <ShieldCheck size={48} color="#e5e7eb" />
        <div style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>Doctor Not Found</div>
        <div style={{ fontSize: '14px', color: '#9ca3af' }}>No doctor found with ID: {id}</div>
        <button onClick={() => navigate('/v/doctors')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '10px', border: 'none', backgroundColor: '#2563eb', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
          <ArrowLeft size={15} /> Back to Doctors
        </button>
      </div>
    )
  }

  // ── Generate avatar initials from name ──
  const avatarInitials = d.avatar || d.name.split(' ').slice(1).map(n => n[0]).join('').slice(0, 2)

  // ── Mock schedule based on doctor shift ──
  const schedule = {
    Morning: [
      { day: 'Monday',    time: '9:00 AM – 1:00 PM',  slots: 12, booked: Math.floor(Math.random() * 5) + 7 },
      { day: 'Wednesday', time: '9:00 AM – 1:00 PM',  slots: 12, booked: Math.floor(Math.random() * 5) + 6 },
      { day: 'Friday',    time: '9:00 AM – 1:00 PM',  slots: 12, booked: Math.floor(Math.random() * 5) + 8 },
      { day: 'Saturday',  time: '10:00 AM – 1:00 PM', slots: 8,  booked: Math.floor(Math.random() * 4) + 4 },
    ],
    Evening: [
      { day: 'Tuesday',   time: '2:00 PM – 6:00 PM',  slots: 10, booked: Math.floor(Math.random() * 4) + 5 },
      { day: 'Thursday',  time: '2:00 PM – 6:00 PM',  slots: 10, booked: Math.floor(Math.random() * 4) + 6 },
      { day: 'Saturday',  time: '3:00 PM – 6:00 PM',  slots: 8,  booked: Math.floor(Math.random() * 3) + 4 },
    ],
    Night: [
      { day: 'Monday',    time: '8:00 PM – 12:00 AM', slots: 8,  booked: Math.floor(Math.random() * 3) + 3 },
      { day: 'Wednesday', time: '8:00 PM – 12:00 AM', slots: 8,  booked: Math.floor(Math.random() * 3) + 4 },
      { day: 'Friday',    time: '8:00 PM – 12:00 AM', slots: 8,  booked: Math.floor(Math.random() * 3) + 5 },
    ],
  }[d.shift] || []

  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate(-1)} style={{ width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #e5e7eb', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={16} color="#374151" />
          </button>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>Doctor Profile</h1>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0' }}>{d.name} · {d.dept} · {d.empId}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate(`/v/doctors/editdoctor/${d.id}`)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', backgroundColor: '#fff', fontSize: '13px', fontWeight: '600', color: '#374151', cursor: 'pointer' }}>
            <Pencil size={14} /> Edit
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '10px', border: 'none', backgroundColor: '#fee2e2', fontSize: '13px', fontWeight: '600', color: '#dc2626', cursor: 'pointer' }}>
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '290px 1fr', gap: '20px', alignItems: 'start' }}>

        {/* ══ LEFT COLUMN ══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Profile Card */}
          <div style={{ ...sectionCard, textAlign: 'center' }}>
            <div style={{
              width: '76px', height: '76px', borderRadius: '50%',
              backgroundColor: d.gender === 'Female' ? '#fce7f3' : '#dbeafe',
              color: d.gender === 'Female' ? '#be185d' : '#2563eb',
              fontSize: '24px', fontWeight: '700',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
            }}>
              {avatarInitials}
            </div>
            <div style={{ fontSize: '17px', fontWeight: '700', color: '#1f2937' }}>{d.name}</div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>{d.designation || d.specialty}</div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>{d.empId} · {d.dept}</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 12px', borderRadius: '999px', ...statusStyle[d.status] }}>{d.status}</span>
              <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 12px', borderRadius: '999px', ...shiftStyle[d.shift] }}>{d.shift}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginTop: '14px', padding: '10px', backgroundColor: '#fefce8', borderRadius: '10px' }}>
              <Star size={15} color="#f59e0b" fill="#f59e0b" />
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#92400e' }}>{d.rating}</span>
              <span style={{ fontSize: '12px', color: '#a16207' }}>/ 5.0 Rating</span>
            </div>
            <div style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: '#f9fafb', borderRadius: '8px', fontSize: '12px', color: '#6b7280' }}>
              Consult Fee: <strong style={{ color: '#1f2937' }}>{d.consultFee || 'N/A'}</strong>
            </div>
          </div>

          {/* Stats */}
          <div style={sectionCard}>
            <div style={sectionTitle}><Activity size={15} color="#2563eb" /> Performance Stats</div>
            {[
              { label: 'Total Patients',  value: d.patients,      icon: Users,         color: '#2563eb', bg: '#dbeafe' },
              { label: 'Surgeries',       value: d.surgeries ?? 0, icon: Heart,        color: '#dc2626', bg: '#fee2e2' },
              { label: 'Consultations',   value: d.consultations ?? 0, icon: ClipboardList, color: '#16a34a', bg: '#dcfce7' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: '10px', backgroundColor: s.bg, marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <s.icon size={15} color={s.color} />
                  <span style={{ fontSize: '12px', fontWeight: '600', color: s.color }}>{s.label}</span>
                </div>
                <span style={{ fontSize: '16px', fontWeight: '700', color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* Bio */}
          {d.bio && (
            <div style={sectionCard}>
              <div style={sectionTitle}><FileText size={15} color="#2563eb" /> About</div>
              <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>{d.bio}</p>
              {d.awards && (
                <>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#374151', margin: '12px 0 6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Star size={13} color="#f59e0b" /> Awards
                  </div>
                  <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.7, margin: 0 }}>{d.awards}</p>
                </>
              )}
            </div>
          )}
        </div>

        {/* ══ RIGHT COLUMN ══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Personal Info */}
          <div style={sectionCard}>
            <div style={sectionTitle}><User size={15} color="#2563eb" /> Personal Information</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
              <InfoRow icon={User}        label="Full Name"       value={d.name} />
              <InfoRow icon={ShieldCheck} label="Employee ID"     value={d.empId} />
              <InfoRow icon={Calendar}    label="Date of Birth"   value={d.dob || '—'} />
              <InfoRow icon={User}        label="Gender"          value={d.gender} />
              <InfoRow icon={Phone}       label="Phone"           value={d.phone} />
              <InfoRow icon={Mail}        label="Email"           value={d.email} />
              <InfoRow icon={MapPin}      label="Address"         value={d.address ? `${d.address}, ${d.city}` : '—'} />
              <InfoRow icon={MapPin}      label="State"           value={d.state || '—'} />
            </div>
          </div>

          {/* Professional Info */}
          <div style={sectionCard}>
            <div style={sectionTitle}><Briefcase size={15} color="#2563eb" /> Professional Information</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
              <InfoRow icon={Briefcase}   label="Department"         value={d.dept} />
              <InfoRow icon={Star}        label="Specialization"     value={d.specialty} />
              <InfoRow icon={Star}        label="Sub Specialization" value={d.subSpecialty || '—'} />
              <InfoRow icon={FileText}    label="Qualification"      value={d.qualification} />
              <InfoRow icon={ShieldCheck} label="License No."        value={d.licenseNo || '—'} />
              <InfoRow icon={Briefcase}   label="Designation"        value={d.designation || d.specialty} />
              <InfoRow icon={Briefcase}   label="Experience"         value={`${d.experience} Years`} />
              <InfoRow icon={Calendar}    label="Joining Date"       value={d.joiningDate || '—'} />
              <InfoRow icon={FileText}    label="Consult Fee"        value={d.consultFee || '—'} />
            </div>
          </div>

          {/* Weekly Schedule + Contact side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

            {/* Schedule */}
            <div style={sectionCard}>
              <div style={sectionTitle}><Clock size={15} color="#2563eb" /> Weekly Schedule ({d.shift} Shift)</div>
              {schedule.map((s, i) => (
                <div key={i} style={{ marginBottom: '10px', padding: '10px', borderRadius: '10px', backgroundColor: '#f9fafb', border: '1px solid #f3f4f6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>{s.day}</span>
                    <span style={{ fontSize: '11px', color: s.booked >= s.slots ? '#dc2626' : '#16a34a', fontWeight: '600' }}>
                      {s.booked}/{s.slots} booked
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '6px' }}>{s.time}</div>
                  <div style={{ height: '5px', backgroundColor: '#e5e7eb', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min((s.booked / s.slots) * 100, 100)}%`, height: '100%', backgroundColor: s.booked >= s.slots ? '#dc2626' : '#2563eb', borderRadius: '99px' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Info */}
            <div style={sectionCard}>
              <div style={sectionTitle}><Users size={15} color="#2563eb" /> Quick Info</div>
              {[
                { label: 'Department',     value: d.dept,                  color: '#dbeafe', text: '#1d4ed8' },
                { label: 'Shift',          value: d.shift,                 color: '#f3e8ff', text: '#7e22ce' },
                { label: 'Experience',     value: `${d.experience} Years`, color: '#dcfce7', text: '#15803d' },
                { label: 'Patients',       value: d.patients,              color: '#fef9c3', text: '#a16207' },
                { label: 'Qualification',  value: d.qualification,         color: '#f0fdf4', text: '#15803d' },
                { label: 'Gender',         value: d.gender,                color: d.gender === 'Female' ? '#fce7f3' : '#dbeafe', text: d.gender === 'Female' ? '#be185d' : '#1d4ed8' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', borderRadius: '8px', backgroundColor: '#f9fafb', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>{item.label}</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', padding: '2px 10px', borderRadius: '999px', backgroundColor: item.color, color: item.text }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewDoctors