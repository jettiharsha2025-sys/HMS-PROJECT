import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Pencil, Trash2, Activity, Users, Stethoscope, FileText, Star, ShieldCheck, Clock, Heart, Brain, Bone, Baby, Sun, Shield, Wind, Zap, Ear, Microscope } from 'lucide-react'

const specialitiesData = [
  { id: 1,  name: 'Cardiology',      code: 'CARD',  head: 'Dr. Arun Kumar',    doctors: 6,  nurses: 8,  patients: 48,  beds: 20, rating: 4.9, status: 'Active',   icon: 'Heart',       color: '#dc2626', bg: '#fee2e2', consultFee: '₹800', workingHours: '8:00 AM – 8:00 PM', workingDays: 'Mon – Sat', desc: 'Diagnosis and treatment of heart and cardiovascular system disorders.', services: 'ECG, Echo, Angiography, Bypass Surgery, Cardiac Catheterization, Pacemaker Implantation', equipment: 'Cath Lab, CCU, Ventilators, Defibrillators, ECG Machines', doctors_list: ['Dr. Arun Kumar', 'Dr. Vijay Sharma', 'Dr. Ravi Menon'], stats: { surgeries: 320, consultations: 980, avgRating: 4.9 } },
  { id: 2,  name: 'Neurology',       code: 'NEURO', head: 'Dr. Sneha Rao',     doctors: 4,  nurses: 6,  patients: 35,  beds: 15, rating: 4.8, status: 'Active',   icon: 'Brain',       color: '#7c3aed', bg: '#ede9fe', consultFee: '₹700', workingHours: '9:00 AM – 7:00 PM', workingDays: 'Mon – Fri', desc: 'Study and treatment of disorders of the nervous system.', services: 'EEG, MRI Scans, Stroke Treatment, Epilepsy Management, Nerve Conduction Studies', equipment: 'EEG Machine, MRI, CT Scanner, Neurosurgery OT', doctors_list: ['Dr. Sneha Rao', 'Dr. Ravi Teja'], stats: { surgeries: 80, consultations: 750, avgRating: 4.8 } },
  { id: 3,  name: 'Orthopedics',     code: 'ORTHO', head: 'Dr. Ramesh Babu',   doctors: 5,  nurses: 7,  patients: 42,  beds: 18, rating: 4.7, status: 'Active',   icon: 'Bone',        color: '#0891b2', bg: '#cffafe', consultFee: '₹900', workingHours: '8:00 AM – 6:00 PM', workingDays: 'Mon – Sat', desc: 'Diagnosis and treatment of musculoskeletal system.', services: 'Joint Replacement, Fracture Treatment, Sports Medicine, Arthroscopy, Spine Surgery', equipment: 'Operation Theatre, C-Arm, Physiotherapy Unit', doctors_list: ['Dr. Ramesh Babu', 'Dr. Suresh Iyer', 'Dr. Pradeep Nair'], stats: { surgeries: 520, consultations: 1100, avgRating: 4.7 } },
  { id: 4,  name: 'Pediatrics',      code: 'PEDI',  head: 'Dr. Priya Nair',    doctors: 3,  nurses: 5,  patients: 60,  beds: 25, rating: 4.8, status: 'Active',   icon: 'Baby',        color: '#16a34a', bg: '#dcfce7', consultFee: '₹500', workingHours: '8:00 AM – 8:00 PM', workingDays: 'Mon – Sun', desc: 'Medical care of infants, children and adolescents.', services: 'Neonatology, Vaccination, Growth Monitoring, Pediatric Surgery', equipment: 'NICU, Incubators, Pediatric Ventilators, Photo Therapy Units', doctors_list: ['Dr. Priya Nair', 'Dr. Anand Rao'], stats: { surgeries: 0, consultations: 1400, avgRating: 4.8 } },
  { id: 5,  name: 'Dermatology',     code: 'DERM',  head: 'Dr. Suresh Gupta',  doctors: 4,  nurses: 4,  patients: 44,  beds: 10, rating: 4.5, status: 'Active',   icon: 'Sun',         color: '#d97706', bg: '#fef9c3', consultFee: '₹600', workingHours: '10:00 AM – 6:00 PM', workingDays: 'Mon – Sat', desc: 'Diagnosis and treatment of skin, hair and nail disorders.', services: 'Laser Treatment, Chemical Peel, Dermatoscopy, Phototherapy, Botox', equipment: 'Laser Machines, Dermatoscope, UV Therapy Units', doctors_list: ['Dr. Suresh Gupta', 'Dr. Kavitha Menon'], stats: { surgeries: 0, consultations: 960, avgRating: 4.5 } },
  { id: 6,  name: 'Gynecology',      code: 'GYNO',  head: 'Dr. Kavya Reddy',   doctors: 4,  nurses: 6,  patients: 38,  beds: 15, rating: 4.7, status: 'Active',   icon: 'Shield',      color: '#be185d', bg: '#fce7f3', consultFee: '₹600', workingHours: '8:00 AM – 6:00 PM', workingDays: 'Mon – Sat', desc: 'Health of female reproductive systems.', services: 'Obstetrics, Gynecological Surgery, Laparoscopy, IVF Consultation', equipment: 'Operation Theatre, Labour Room, Ultrasound, Laparoscopy Unit', doctors_list: ['Dr. Kavya Reddy', 'Dr. Suma Rao'], stats: { surgeries: 240, consultations: 820, avgRating: 4.7 } },
  { id: 7,  name: 'Pulmonology',     code: 'PULM',  head: 'Dr. Anita Mehta',   doctors: 3,  nurses: 4,  patients: 39,  beds: 12, rating: 4.6, status: 'Inactive', icon: 'Wind',        color: '#0f766e', bg: '#ccfbf1', consultFee: '₹650', workingHours: '9:00 AM – 5:00 PM', workingDays: 'Mon – Fri', desc: 'Diagnosis and treatment of respiratory tract disorders.', services: 'PFT, Bronchoscopy, Sleep Study, Nebulization, Oxygen Therapy', equipment: 'Spirometry, Bronchoscope, ICU, Ventilators', doctors_list: ['Dr. Anita Mehta', 'Dr. Rajan Kumar'], stats: { surgeries: 0, consultations: 720, avgRating: 4.6 } },
  { id: 8,  name: 'Gastroenterology',code: 'GAST',  head: 'Dr. Kiran Rao',     doctors: 4,  nurses: 5,  patients: 50,  beds: 16, rating: 4.7, status: 'Active',   icon: 'Activity',    color: '#a16207', bg: '#fef9c3', consultFee: '₹750', workingHours: '8:00 AM – 6:00 PM', workingDays: 'Mon – Sat', desc: 'Treatment of digestive system disorders.', services: 'Endoscopy, Colonoscopy, Liver Biopsy, ERCP, Hepatology', equipment: 'Endoscopy Suite, Colonoscopy Unit, Laparoscopy', doctors_list: ['Dr. Kiran Rao', 'Dr. Pradeep Sinha'], stats: { surgeries: 190, consultations: 880, avgRating: 4.7 } },
  { id: 9,  name: 'Endocrinology',   code: 'ENDO',  head: 'Dr. Meena Joshi',   doctors: 3,  nurses: 4,  patients: 52,  beds: 10, rating: 4.6, status: 'Active',   icon: 'Zap',         color: '#1d4ed8', bg: '#dbeafe', consultFee: '₹550', workingHours: '9:00 AM – 5:00 PM', workingDays: 'Mon – Fri', desc: 'Treatment of hormone disorders.', services: 'Diabetes Management, Thyroid Treatment, Obesity Clinic, Hormone Therapy', equipment: 'Lab, Bone Densitometry, Ultrasound', doctors_list: ['Dr. Meena Joshi', 'Dr. Anand Kumar'], stats: { surgeries: 0, consultations: 1020, avgRating: 4.6 } },
  { id: 10, name: 'ENT',             code: 'ENT',   head: 'Dr. Lakshmi Devi',  doctors: 3,  nurses: 3,  patients: 47,  beds: 10, rating: 4.5, status: 'Active',   icon: 'Ear',         color: '#6b7280', bg: '#f1f5f9', consultFee: '₹550', workingHours: '9:00 AM – 5:00 PM', workingDays: 'Mon – Sat', desc: 'Ear, Nose and Throat disorders.', services: 'Audiometry, Tonsillectomy, Septoplasty, Cochlear Implant, Sinus Surgery', equipment: 'Audiometry Lab, ENT OT, Endoscope', doctors_list: ['Dr. Lakshmi Devi', 'Dr. Suresh Pillai'], stats: { surgeries: 280, consultations: 790, avgRating: 4.5 } },
  { id: 11, name: 'Radiology',       code: 'RADIO', head: 'Dr. Sunil Mehta',   doctors: 2,  nurses: 3,  patients: 30,  beds: 5,  rating: 4.4, status: 'Active',   icon: 'Microscope',  color: '#475569', bg: '#f1f5f9', consultFee: '₹400', workingHours: '8:00 AM – 8:00 PM', workingDays: 'Mon – Sat', desc: 'Medical imaging diagnostics.', services: 'X-Ray, MRI, CT Scan, Ultrasound, PET Scan, Mammography', equipment: 'MRI Machine, CT Scanner, X-Ray, Ultrasound Units', doctors_list: ['Dr. Sunil Mehta', 'Dr. Nandini Rao'], stats: { surgeries: 0, consultations: 580, avgRating: 4.4 } },
  { id: 12, name: 'General Medicine', code: 'GEN',  head: 'Dr. Ravi Teja',     doctors: 8,  nurses: 10, patients: 120, beds: 40, rating: 4.5, status: 'Active',   icon: 'Stethoscope', color: '#2563eb', bg: '#dbeafe', consultFee: '₹300', workingHours: '8:00 AM – 8:00 PM', workingDays: 'Mon – Sun', desc: 'Primary care for a wide range of conditions.', services: 'OPD, Fever Clinic, General Checkup, Preventive Care, Health Screening', equipment: 'General OPD, Basic Lab, Pharmacy', doctors_list: ['Dr. Ravi Teja', 'Dr. Meera Pillai', 'Dr. Kiran Das', 'Dr. Sumit Roy'], stats: { surgeries: 0, consultations: 2400, avgRating: 4.5 } },
]

const iconMap = { Heart, Brain, Bone, Baby, Sun, Shield, Wind, Activity, Zap, Ear, Microscope, Stethoscope }

const statusStyle = { Active: { background: '#dcfce7', color: '#15803d' }, Inactive: { background: '#fee2e2', color: '#dc2626' } }
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

const ViewSpecialites = () => {
  const navigate = useNavigate()
  const { id }   = useParams()
  const s        = specialitiesData.find(sp => sp.id === parseInt(id))

  if (!s) return (
    <div style={{ padding: '48px', textAlign: 'center' }}>
      <div style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>Speciality Not Found</div>
      <button onClick={() => navigate('/v/specialities')} style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', backgroundColor: '#2563eb', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><ArrowLeft size={14} /> Back</button>
    </div>
  )

  const IconComp = iconMap[s.icon] || Activity

  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate(-1)} style={{ width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #e5e7eb', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ArrowLeft size={16} color="#374151" /></button>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>Speciality Details</h1>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0' }}>{s.name} · {s.code}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate(`/v/specialities/editspeciality/${s.id}`)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', backgroundColor: '#fff', fontSize: '13px', fontWeight: '600', color: '#374151', cursor: 'pointer' }}><Pencil size={14} /> Edit</button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '10px', border: 'none', backgroundColor: '#fee2e2', fontSize: '13px', fontWeight: '600', color: '#dc2626', cursor: 'pointer' }}><Trash2 size={14} /> Delete</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '20px', alignItems: 'start' }}>
        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ ...sectionCard, textAlign: 'center' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '16px', backgroundColor: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <IconComp size={34} color={s.color} />
            </div>
            <div style={{ fontSize: '17px', fontWeight: '700', color: '#1f2937' }}>{s.name}</div>
            <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: '700', padding: '3px 12px', borderRadius: '6px', backgroundColor: s.bg, color: s.color, margin: '6px 0' }}>{s.code}</div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>{s.head}</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 12px', borderRadius: '999px', ...statusStyle[s.status] }}>{s.status}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginTop: '12px', padding: '8px', backgroundColor: '#fefce8', borderRadius: '8px' }}>
              <Star size={14} color="#f59e0b" fill="#f59e0b" />
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#92400e' }}>{s.rating}</span>
              <span style={{ fontSize: '11px', color: '#a16207' }}>/ 5.0</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={sectionCard}>
            <div style={sectionTitle}><Activity size={15} color="#2563eb" /> Stats</div>
            {[
              { label: 'Doctors',      value: s.doctors,            color: '#2563eb', bg: '#dbeafe' },
              { label: 'Nurses',       value: s.nurses,             color: '#7c3aed', bg: '#ede9fe' },
              { label: 'Beds',         value: s.beds,               color: '#16a34a', bg: '#dcfce7' },
              { label: 'Patients',     value: s.patients,           color: '#d97706', bg: '#fef9c3' },
              { label: 'Surgeries',    value: s.stats.surgeries,    color: '#dc2626', bg: '#fee2e2' },
              { label: 'Consultations',value: s.stats.consultations,color: '#0891b2', bg: '#cffafe' },
            ].map(st => (
              <div key={st.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', borderRadius: '8px', backgroundColor: st.bg, marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: st.color }}>{st.label}</span>
                <span style={{ fontSize: '15px', fontWeight: '700', color: st.color }}>{st.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={sectionCard}>
            <div style={sectionTitle}><ShieldCheck size={15} color="#2563eb" /> General Information</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
              <InfoRow icon={Activity}    label="Speciality"    value={s.name} />
              <InfoRow icon={ShieldCheck} label="Code"          value={s.code} />
              <InfoRow icon={Stethoscope} label="Head Doctor"   value={s.head} />
              <InfoRow icon={Clock}       label="Working Hours" value={s.workingHours} />
              <InfoRow icon={Clock}       label="Working Days"  value={s.workingDays} />
              <InfoRow icon={FileText}    label="Consult Fee"   value={s.consultFee} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={sectionCard}>
              <div style={sectionTitle}><FileText size={15} color="#2563eb" /> Description</div>
              <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
            <div style={sectionCard}>
              <div style={sectionTitle}><Star size={15} color="#2563eb" /> Services</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {s.services.split(', ').map((sv, i) => (
                  <span key={i} style={{ fontSize: '12px', fontWeight: '500', padding: '4px 10px', borderRadius: '999px', backgroundColor: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }}>{sv}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={sectionCard}>
              <div style={sectionTitle}><ShieldCheck size={15} color="#2563eb" /> Equipment & Facilities</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {s.equipment.split(', ').map((eq, i) => (
                  <span key={i} style={{ fontSize: '12px', fontWeight: '500', padding: '4px 10px', borderRadius: '999px', backgroundColor: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}>{eq}</span>
                ))}
              </div>
            </div>
            <div style={sectionCard}>
              <div style={sectionTitle}><Users size={15} color="#2563eb" /> Doctors in this Dept.</div>
              {s.doctors_list.map((doc, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', borderRadius: '8px', backgroundColor: '#f9fafb', marginBottom: '6px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#dbeafe', color: '#2563eb', fontSize: '10px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {doc.split(' ').slice(1).map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#1f2937' }}>{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewSpecialites