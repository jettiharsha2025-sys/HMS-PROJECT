import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus, Search, Eye, Pencil, Trash2,
  ChevronLeft, ChevronRight, Activity,
  Stethoscope, Users, Star, Filter,
  Heart, Brain, Bone, Baby, Microscope,
  Zap, Wind, Sun, Shield, Ear,
} from 'lucide-react'

// ── Shared data (import this in ViewSpeciality too) ──
export const specialitiesData = [
  { id: 1,  name: 'Cardiology',      code: 'CARD', head: 'Dr. Arun Kumar',   doctors: 6,  nurses: 8,  patients: 48,  rating: 4.9, status: 'Active',   icon: 'Heart',       color: '#dc2626', bg: '#fee2e2', desc: 'Diagnosis and treatment of heart and cardiovascular system disorders.' },
  { id: 2,  name: 'Neurology',       code: 'NEURO', head: 'Dr. Sneha Rao',   doctors: 4,  nurses: 6,  patients: 35,  rating: 4.8, status: 'Active',   icon: 'Brain',       color: '#7c3aed', bg: '#ede9fe', desc: 'Study and treatment of disorders of the nervous system including brain and spinal cord.' },
  { id: 3,  name: 'Orthopedics',     code: 'ORTHO', head: 'Dr. Ramesh Babu', doctors: 5,  nurses: 7,  patients: 42,  rating: 4.7, status: 'Active',   icon: 'Bone',        color: '#0891b2', bg: '#cffafe', desc: 'Diagnosis and treatment of musculoskeletal system including bones, joints and muscles.' },
  { id: 4,  name: 'Pediatrics',      code: 'PEDI',  head: 'Dr. Priya Nair',  doctors: 3,  nurses: 5,  patients: 60,  rating: 4.8, status: 'Active',   icon: 'Baby',        color: '#16a34a', bg: '#dcfce7', desc: 'Medical care of infants, children and adolescents up to age 18.' },
  { id: 5,  name: 'Dermatology',     code: 'DERM',  head: 'Dr. Suresh Gupta',doctors: 4,  nurses: 4,  patients: 44,  rating: 4.5, status: 'Active',   icon: 'Sun',         color: '#d97706', bg: '#fef9c3', desc: 'Diagnosis and treatment of skin, hair and nail disorders.' },
  { id: 6,  name: 'Gynecology',      code: 'GYNO',  head: 'Dr. Kavya Reddy', doctors: 4,  nurses: 6,  patients: 38,  rating: 4.7, status: 'Active',   icon: 'Shield',      color: '#be185d', bg: '#fce7f3', desc: 'Health of female reproductive systems and breasts.' },
  { id: 7,  name: 'Pulmonology',     code: 'PULM',  head: 'Dr. Anita Mehta', doctors: 3,  nurses: 4,  patients: 39,  rating: 4.6, status: 'Inactive', icon: 'Wind',        color: '#0f766e', bg: '#ccfbf1', desc: 'Diagnosis and treatment of diseases involving the respiratory tract.' },
  { id: 8,  name: 'Gastroenterology',code: 'GAST',  head: 'Dr. Kiran Rao',   doctors: 4,  nurses: 5,  patients: 50,  rating: 4.7, status: 'Active',   icon: 'Activity',    color: '#a16207', bg: '#fef9c3', desc: 'Study and treatment of disorders of the digestive system.' },
  { id: 9,  name: 'Endocrinology',   code: 'ENDO',  head: 'Dr. Meena Joshi', doctors: 3,  nurses: 4,  patients: 52,  rating: 4.6, status: 'Active',   icon: 'Zap',         color: '#1d4ed8', bg: '#dbeafe', desc: 'Treatment of hormone disorders including diabetes, thyroid and metabolism.' },
  { id: 10, name: 'ENT',             code: 'ENT',   head: 'Dr. Lakshmi Devi',doctors: 3,  nurses: 3,  patients: 47,  rating: 4.5, status: 'Active',   icon: 'Ear',         color: '#6b7280', bg: '#f1f5f9', desc: 'Ear, Nose and Throat — diagnosis and surgical treatment of head and neck disorders.' },
  { id: 11, name: 'Radiology',       code: 'RADIO', head: 'Dr. Sunil Mehta', doctors: 2,  nurses: 3,  patients: 30,  rating: 4.4, status: 'Active',   icon: 'Microscope',  color: '#475569', bg: '#f1f5f9', desc: 'Medical imaging to diagnose and treat diseases using X-ray, MRI, CT scan etc.' },
  { id: 12, name: 'General Medicine',code: 'GEN',   head: 'Dr. Ravi Teja',   doctors: 8,  nurses: 10, patients: 120, rating: 4.5, status: 'Active',   icon: 'Stethoscope', color: '#2563eb', bg: '#dbeafe', desc: 'Primary care covering a wide range of medical conditions and preventive care.' },
]

const iconMap = { Heart, Brain, Bone, Baby, Sun, Shield, Wind, Activity, Zap, Ear, Microscope, Stethoscope }

const ITEMS_PER_PAGE = 8

const statusStyle = {
  Active:   { background: '#dcfce7', color: '#15803d' },
  Inactive: { background: '#fee2e2', color: '#dc2626' },
}

const AllSpecialities = () => {
  const navigate = useNavigate()
  const [search,       setSearch]       = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [page,         setPage]         = useState(1)

  const active   = specialitiesData.filter(s => s.status === 'Active').length
  const inactive = specialitiesData.filter(s => s.status === 'Inactive').length
  const totalDoctors  = specialitiesData.reduce((a, s) => a + s.doctors, 0)
  const totalPatients = specialitiesData.reduce((a, s) => a + s.patients, 0)

  const filtered = specialitiesData.filter(s => {
    const q = search.toLowerCase()
    const matchSearch = s.name.toLowerCase().includes(q) ||
                        s.code.toLowerCase().includes(q) ||
                        s.head.toLowerCase().includes(q)
    const matchStatus = filterStatus === 'All' || s.status === filterStatus
    return matchSearch && matchStatus
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>Specialities</h1>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0' }}>Manage all hospital departments and specialities</p>
        </div>
        <button onClick={() => navigate('/v/specialities/addsspecialities')} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          backgroundColor: '#2563eb', color: '#fff', border: 'none',
          borderRadius: '10px', padding: '10px 18px', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
        }}>
          <Plus size={16} /> Add Speciality
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Specialities', value: specialitiesData.length, icon: Activity,    color: '#2563eb', bg: '#dbeafe' },
          { label: 'Active',             value: active,                  icon: Star,        color: '#15803d', bg: '#dcfce7' },
          { label: 'Total Doctors',      value: totalDoctors,            icon: Stethoscope, color: '#7c3aed', bg: '#ede9fe' },
          { label: 'Total Patients',     value: totalPatients,           icon: Users,       color: '#d97706', bg: '#fef9c3' },
        ].map(card => (
          <div key={card.label} style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <card.icon size={22} color={card.color} />
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: '700', color: '#1f2937' }}>{card.value}</div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={14} color="#9ca3af" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search by name, code or head..."
            style={{ width: '100%', padding: '8px 10px 8px 32px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', color: '#374151', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <Filter size={14} color="#9ca3af" />
        <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1) }}
          style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px 10px', fontSize: '13px', color: '#374151', outline: 'none', cursor: 'pointer', backgroundColor: '#fff' }}>
          {['All', 'Active', 'Inactive'].map(s => <option key={s}>{s}</option>)}
        </select>
        <span style={{ fontSize: '13px', color: '#9ca3af', marginLeft: 'auto' }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['Speciality', 'Code', 'Head Doctor', 'Doctors', 'Nurses', 'Patients', 'Rating', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={9} style={{ padding: '48px', textAlign: 'center', color: '#9ca3af' }}>No specialities found.</td></tr>
            ) : paginated.map((s, i) => {
              const IconComp = iconMap[s.icon] || Activity
              return (
                <tr key={s.id}
                  style={{ borderBottom: i < paginated.length - 1 ? '1px solid #f3f4f6' : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <IconComp size={17} color={s.color} />
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: '#1f2937' }}>{s.name}</div>
                        <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>{s.desc.slice(0, 45)}...</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '6px', backgroundColor: s.bg, color: s.color }}>{s.code}</span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#374151', fontWeight: '500' }}>{s.head}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: '600', color: '#2563eb' }}>{s.doctors}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: '600', color: '#7c3aed' }}>{s.nurses}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: '600', color: '#d97706' }}>{s.patients}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Star size={12} color="#f59e0b" fill="#f59e0b" />
                      <span style={{ fontWeight: '700', color: '#1f2937' }}>{s.rating}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '999px', ...statusStyle[s.status] }}>{s.status}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => navigate(`/v/specialities/viewspeciality/${s.id}`)} style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#eff6ff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Eye size={14} color="#2563eb" /></button>
                      <button onClick={() => navigate(`/v/specialities/editspeciality/${s.id}`)} style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#f0fdf4', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Pencil size={14} color="#16a34a" /></button>
                      <button style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#fef2f2', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Trash2 size={14} color="#dc2626" /></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderTop: '1px solid #e5e7eb' }}>
            <span style={{ fontSize: '13px', color: '#9ca3af' }}>Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: page === 1 ? '#f9fafb' : '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={15} color={page === 1 ? '#d1d5db' : '#374151'} /></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: p === page ? '#2563eb' : '#fff', color: p === page ? '#fff' : '#374151', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>{p}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: page === totalPages ? '#f9fafb' : '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={15} color={page === totalPages ? '#d1d5db' : '#374151'} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllSpecialities