import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus, Search, Eye, Pencil, Trash2,
  ChevronLeft, ChevronRight, FileText,
  CheckCircle2, Clock, Filter, Pill,
} from 'lucide-react'

// ── Shared data (import this in ViewPrescription too) ──
export const prescriptionData = [
  { id: 1,  patientName: 'Ravi Kumar',    patientId: 'PT-1042', doctorName: 'Dr. Arun Kumar',   department: 'Cardiology',   date: '2026-07-08', diagnosis: 'Hypertension',              medicines: [{ name: 'Losartan',     dosage: '50mg',  frequency: 'Once daily',      duration: '30 days' }, { name: 'Atorvastatin', dosage: '10mg', frequency: 'Once daily at night', duration: '30 days' }], notes: 'Monitor BP weekly. Follow up after 30 days.', status: 'Active' },
  { id: 2,  patientName: 'Sunita Sharma', patientId: 'PT-1043', doctorName: 'Dr. Sneha Rao',    department: 'Neurology',    date: '2026-07-07', diagnosis: 'Migraine',                  medicines: [{ name: 'Sumatriptan', dosage: '50mg',  frequency: 'As needed',       duration: '10 days' }], notes: 'Avoid triggers, maintain sleep schedule.', status: 'Active' },
  { id: 3,  patientName: 'Manoj Verma',   patientId: 'PT-1044', doctorName: 'Dr. Ramesh Babu',  department: 'Orthopedics',  date: '2026-07-05', diagnosis: 'Knee Osteoarthritis',       medicines: [{ name: 'Ibuprofen',   dosage: '400mg', frequency: 'Twice daily',     duration: '14 days' }, { name: 'Calcium + Vit D', dosage: '500mg', frequency: 'Once daily', duration: '60 days' }], notes: 'Physiotherapy recommended 3x/week.', status: 'Completed' },
  { id: 4,  patientName: 'Ananya Iyer',   patientId: 'PT-1045', doctorName: 'Dr. Priya Nair',   department: 'Pediatrics',   date: '2026-07-09', diagnosis: 'Viral Fever',               medicines: [{ name: 'Paracetamol', dosage: '250mg', frequency: 'Every 6 hours',   duration: '5 days' }], notes: 'Plenty of fluids, rest advised.', status: 'Active' },
  { id: 5,  patientName: 'Deepak Nair',   patientId: 'PT-1046', doctorName: 'Dr. Suresh Gupta', department: 'Dermatology',  date: '2026-07-03', diagnosis: 'Eczema',                    medicines: [{ name: 'Hydrocortisone Cream', dosage: '1%', frequency: 'Twice daily', duration: '14 days' }], notes: 'Avoid harsh soaps.', status: 'Completed' },
  { id: 6,  patientName: 'Kavitha Menon', patientId: 'PT-1047', doctorName: 'Dr. Kavya Reddy',  department: 'Gynecology',   date: '2026-07-09', diagnosis: 'Iron Deficiency Anemia',    medicines: [{ name: 'Ferrous Sulfate', dosage: '325mg', frequency: 'Once daily', duration: '90 days' }], notes: 'Repeat CBC after 6 weeks.', status: 'Active' },
  { id: 7,  patientName: 'Suresh Pillai', patientId: 'PT-1048', doctorName: 'Dr. Kiran Rao',    department: 'Gastroenterology', date: '2026-06-30', diagnosis: 'Acid Reflux',           medicines: [{ name: 'Omeprazole', dosage: '20mg', frequency: 'Once daily before breakfast', duration: '30 days' }], notes: 'Avoid spicy food and late meals.', status: 'Cancelled' },
  { id: 8,  patientName: 'Neha Joshi',    patientId: 'PT-1049', doctorName: 'Dr. Meena Joshi',  department: 'Endocrinology',date: '2026-07-06', diagnosis: 'Type 2 Diabetes',           medicines: [{ name: 'Metformin', dosage: '500mg', frequency: 'Twice daily with meals', duration: '90 days' }], notes: 'Monitor blood sugar daily.', status: 'Active' },
  { id: 9,  patientName: 'Arvind Rao',    patientId: 'PT-1050', doctorName: 'Dr. Lakshmi Devi', department: 'ENT',          date: '2026-07-01', diagnosis: 'Sinusitis',                 medicines: [{ name: 'Azithromycin', dosage: '500mg', frequency: 'Once daily', duration: '5 days' }], notes: 'Steam inhalation recommended.', status: 'Completed' },
  { id: 10, patientName: 'Pooja Desai',   patientId: 'PT-1051', doctorName: 'Dr. Ravi Teja',    department: 'General Medicine', date: '2026-07-09', diagnosis: 'Seasonal Allergy',      medicines: [{ name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily at night', duration: '10 days' }], notes: 'Avoid known allergens.', status: 'Active' },
]

const statusStyle = {
  Active:    { background: '#dbeafe', color: '#1d4ed8' },
  Completed: { background: '#dcfce7', color: '#15803d' },
  Cancelled: { background: '#fee2e2', color: '#dc2626' },
}

const ITEMS_PER_PAGE = 8

const AllPrescription = () => {
  const navigate = useNavigate()
  const [search,       setSearch]       = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [page,         setPage]         = useState(1)

  const active    = prescriptionData.filter(p => p.status === 'Active').length
  const completed = prescriptionData.filter(p => p.status === 'Completed').length
  const today      = prescriptionData.filter(p => p.date === '2026-07-09').length

  const filtered = prescriptionData.filter(p => {
    const q = search.toLowerCase()
    const matchSearch = p.patientName.toLowerCase().includes(q) ||
                        p.patientId.toLowerCase().includes(q) ||
                        p.doctorName.toLowerCase().includes(q) ||
                        p.diagnosis.toLowerCase().includes(q)
    const matchStatus = filterStatus === 'All' || p.status === filterStatus
    return matchSearch && matchStatus
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>Prescriptions</h1>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0' }}>Manage patient prescriptions and medications</p>
        </div>
        <button onClick={() => navigate('/v/prescription/addprescription')} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          backgroundColor: '#2563eb', color: '#fff', border: 'none',
          borderRadius: '10px', padding: '10px 18px', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
        }}>
          <Plus size={16} /> Add Prescription
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Prescriptions', value: prescriptionData.length, icon: FileText,     color: '#2563eb', bg: '#dbeafe' },
          { label: 'Active',              value: active,                  icon: Clock,        color: '#1d4ed8', bg: '#dbeafe' },
          { label: 'Completed',           value: completed,               icon: CheckCircle2, color: '#15803d', bg: '#dcfce7' },
          { label: "Today's",             value: today,                   icon: Pill,         color: '#d97706', bg: '#fef9c3' },
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
            placeholder="Search by patient, ID, doctor or diagnosis..."
            style={{ width: '100%', padding: '8px 10px 8px 32px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', color: '#374151', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <Filter size={14} color="#9ca3af" />
        <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1) }}
          style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px 10px', fontSize: '13px', color: '#374151', outline: 'none', cursor: 'pointer', backgroundColor: '#fff' }}>
          {['All', 'Active', 'Completed', 'Cancelled'].map(s => <option key={s}>{s}</option>)}
        </select>
        <span style={{ fontSize: '13px', color: '#9ca3af', marginLeft: 'auto' }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['Patient', 'Doctor', 'Diagnosis', 'Medicines', 'Date', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: '48px', textAlign: 'center', color: '#9ca3af' }}>No prescriptions found.</td></tr>
            ) : paginated.map((p, i) => (
              <tr key={p.id}
                style={{ borderBottom: i < paginated.length - 1 ? '1px solid #f3f4f6' : 'none' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: '600', color: '#1f2937' }}>{p.patientName}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>{p.patientId}</div>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ color: '#374151', fontWeight: '500' }}>{p.doctorName}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>{p.department}</div>
                </td>
                <td style={{ padding: '14px 16px', color: '#374151' }}>{p.diagnosis}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '6px', backgroundColor: '#eff6ff', color: '#2563eb' }}>{p.medicines.length} item{p.medicines.length !== 1 ? 's' : ''}</span>
                </td>
                <td style={{ padding: '14px 16px', color: '#6b7280', fontSize: '12px' }}>{p.date}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '999px', ...statusStyle[p.status] }}>{p.status}</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => navigate(`/v/prescription/viewprescription/${p.id}`)} style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#eff6ff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Eye size={14} color="#2563eb" /></button>
                    <button onClick={() => navigate(`/v/prescription/editprescription/${p.id}`)} style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#f0fdf4', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Pencil size={14} color="#16a34a" /></button>
                    <button style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#fef2f2', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Trash2 size={14} color="#dc2626" /></button>
                  </div>
                </td>
              </tr>
            ))}
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

export default AllPrescription