import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus, Search, Eye, Pencil, Trash2,
  ChevronLeft, ChevronRight, Scan,
  Clock, CheckCircle2, Filter, AlertCircle,
} from 'lucide-react'

// ── Shared data (import this in ViewScans too) ──
export const scansData = [
  { id: 1,  patientName: 'Ravi Kumar',    patientId: 'PT-1042', scanType: 'MRI',        bodyPart: 'Brain',        doctorName: 'Dr. Sneha Rao',    technician: 'Sunil Mehta',   date: '2026-07-09', time: '09:30 AM', status: 'Completed', findings: 'No acute abnormality detected. Mild age-related atrophy.' },
  { id: 2,  patientName: 'Sunita Sharma', patientId: 'PT-1043', scanType: 'X-Ray',      bodyPart: 'Chest',        doctorName: 'Dr. Kiran Rao',    technician: 'Sunil Mehta',   date: '2026-07-09', time: '10:15 AM', status: 'Reviewed',  findings: 'Clear lung fields, no infiltrates. Heart size normal.' },
  { id: 3,  patientName: 'Manoj Verma',   patientId: 'PT-1044', scanType: 'CT Scan',    bodyPart: 'Abdomen',      doctorName: 'Dr. Kiran Rao',    technician: 'Nandini Rao',   date: '2026-07-08', time: '02:00 PM', status: 'Completed', findings: 'Mild fatty liver changes. No focal lesion identified.' },
  { id: 4,  patientName: 'Ananya Iyer',   patientId: 'PT-1045', scanType: 'Ultrasound', bodyPart: 'Abdomen',      doctorName: 'Dr. Priya Nair',   technician: 'Sunil Mehta',   date: '2026-07-09', time: '11:00 AM', status: 'Pending',   findings: '' },
  { id: 5,  patientName: 'Deepak Nair',   patientId: 'PT-1046', scanType: 'X-Ray',      bodyPart: 'Left Knee',    doctorName: 'Dr. Ramesh Babu',  technician: 'Nandini Rao',   date: '2026-07-07', time: '04:20 PM', status: 'Reviewed',  findings: 'Mild joint space narrowing consistent with early osteoarthritis.' },
  { id: 6,  patientName: 'Kavitha Menon', patientId: 'PT-1047', scanType: 'MRI',        bodyPart: 'Spine',        doctorName: 'Dr. Sneha Rao',    technician: 'Sunil Mehta',   date: '2026-07-09', time: '08:45 AM', status: 'Pending',   findings: '' },
  { id: 7,  patientName: 'Suresh Pillai', patientId: 'PT-1048', scanType: 'CT Scan',    bodyPart: 'Head',         doctorName: 'Dr. Sneha Rao',    technician: 'Nandini Rao',   date: '2026-07-06', time: '01:30 PM', status: 'Cancelled', findings: '' },
  { id: 8,  patientName: 'Neha Joshi',    patientId: 'PT-1049', scanType: 'Ultrasound', bodyPart: 'Pelvis',       doctorName: 'Dr. Kavya Reddy',  technician: 'Sunil Mehta',   date: '2026-07-09', time: '03:10 PM', status: 'Completed', findings: 'Normal pelvic anatomy, no abnormal findings.' },
  { id: 9,  patientName: 'Arvind Rao',    patientId: 'PT-1050', scanType: 'X-Ray',      bodyPart: 'Sinuses',      doctorName: 'Dr. Lakshmi Devi', technician: 'Nandini Rao',   date: '2026-07-05', time: '10:00 AM', status: 'Reviewed',  findings: 'Mild mucosal thickening in maxillary sinuses.' },
  { id: 10, patientName: 'Pooja Desai',   patientId: 'PT-1051', scanType: 'Mammography', bodyPart: 'Breast',      doctorName: 'Dr. Kavya Reddy',  technician: 'Sunil Mehta',   date: '2026-07-09', time: '12:00 PM', status: 'Pending',   findings: '' },
]

const statusStyle = {
  Pending:   { background: '#fef9c3', color: '#a16207' },
  Completed: { background: '#dbeafe', color: '#1d4ed8' },
  Reviewed:  { background: '#dcfce7', color: '#15803d' },
  Cancelled: { background: '#fee2e2', color: '#dc2626' },
}

const ITEMS_PER_PAGE = 8

const AllScans = () => {
  const navigate = useNavigate()
  const [search,       setSearch]       = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterType,   setFilterType]   = useState('All')
  const [page,         setPage]         = useState(1)

  const pending   = scansData.filter(s => s.status === 'Pending').length
  const completed = scansData.filter(s => s.status === 'Completed').length
  const reviewed  = scansData.filter(s => s.status === 'Reviewed').length

  const scanTypes = ['All', ...new Set(scansData.map(s => s.scanType))]

  const filtered = scansData.filter(s => {
    const q = search.toLowerCase()
    const matchSearch = s.patientName.toLowerCase().includes(q) ||
                        s.patientId.toLowerCase().includes(q) ||
                        s.doctorName.toLowerCase().includes(q)
    const matchStatus = filterStatus === 'All' || s.status === filterStatus
    const matchType   = filterType === 'All' || s.scanType === filterType
    return matchSearch && matchStatus && matchType
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>Scans</h1>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0' }}>Manage imaging orders and reports</p>
        </div>
        <button onClick={() => navigate('/v/scans/addscan')} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          backgroundColor: '#2563eb', color: '#fff', border: 'none',
          borderRadius: '10px', padding: '10px 18px', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
        }}>
          <Plus size={16} /> Add Scan
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Scans', value: scansData.length, icon: Scan,         color: '#2563eb', bg: '#dbeafe' },
          { label: 'Pending',     value: pending,           icon: Clock,        color: '#a16207', bg: '#fef9c3' },
          { label: 'Completed',   value: completed,         icon: CheckCircle2, color: '#1d4ed8', bg: '#dbeafe' },
          { label: 'Reviewed',    value: reviewed,          icon: CheckCircle2, color: '#15803d', bg: '#dcfce7' },
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
            placeholder="Search by patient, ID or doctor..."
            style={{ width: '100%', padding: '8px 10px 8px 32px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', color: '#374151', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <Filter size={14} color="#9ca3af" />
        <select value={filterType} onChange={e => { setFilterType(e.target.value); setPage(1) }}
          style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px 10px', fontSize: '13px', color: '#374151', outline: 'none', cursor: 'pointer', backgroundColor: '#fff' }}>
          {scanTypes.map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1) }}
          style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px 10px', fontSize: '13px', color: '#374151', outline: 'none', cursor: 'pointer', backgroundColor: '#fff' }}>
          {['All', 'Pending', 'Completed', 'Reviewed', 'Cancelled'].map(s => <option key={s}>{s}</option>)}
        </select>
        <span style={{ fontSize: '13px', color: '#9ca3af', marginLeft: 'auto' }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['Patient', 'Scan Type', 'Body Part', 'Doctor', 'Date & Time', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: '48px', textAlign: 'center', color: '#9ca3af' }}>No scans found.</td></tr>
            ) : paginated.map((s, i) => (
              <tr key={s.id}
                style={{ borderBottom: i < paginated.length - 1 ? '1px solid #f3f4f6' : 'none' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: '600', color: '#1f2937' }}>{s.patientName}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>{s.patientId}</div>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '6px', backgroundColor: '#ede9fe', color: '#7c3aed' }}>{s.scanType}</span>
                </td>
                <td style={{ padding: '14px 16px', color: '#374151' }}>{s.bodyPart}</td>
                <td style={{ padding: '14px 16px', color: '#374151', fontWeight: '500' }}>{s.doctorName}</td>
                <td style={{ padding: '14px 16px', color: '#6b7280', fontSize: '12px' }}>{s.date} · {s.time}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '999px', ...statusStyle[s.status] }}>{s.status}</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => navigate(`/v/scans/viewscan/${s.id}`)} style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#eff6ff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Eye size={14} color="#2563eb" /></button>
                    <button onClick={() => navigate(`/v/scans/editscan/${s.id}`)} style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#f0fdf4', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Pencil size={14} color="#16a34a" /></button>
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

export default AllScans