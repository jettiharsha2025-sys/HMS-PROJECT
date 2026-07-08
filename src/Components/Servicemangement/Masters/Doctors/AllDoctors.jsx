import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus, Search, Eye, Pencil, Trash2, Filter,
  ChevronLeft, ChevronRight, Stethoscope,
  Phone, Mail, Star, CheckCircle, XCircle,
  Clock, Users,
} from 'lucide-react'

const doctorsData = [
  { id: 1,  name: 'Dr. Arun Kumar',    empId: 'DOC-001', dept: 'Cardiology',    specialty: 'Interventional Cardiology', phone: '9876541001', email: 'arun@medicare.com',    experience: 14, patients: 48, rating: 4.9, status: 'Active',    shift: 'Morning', gender: 'Male',   qualification: 'MBBS, MD, DM' },
  { id: 2,  name: 'Dr. Sneha Rao',     empId: 'DOC-002', dept: 'Neurology',     specialty: 'Clinical Neurology',        phone: '9876541002', email: 'sneha@medicare.com',    experience: 10, patients: 42, rating: 4.8, status: 'Active',    shift: 'Evening', gender: 'Female', qualification: 'MBBS, MD, DM' },
  { id: 3,  name: 'Dr. Ramesh Babu',   empId: 'DOC-003', dept: 'Orthopedics',   specialty: 'Joint Replacement',         phone: '9876541003', email: 'ramesh@medicare.com',   experience: 18, patients: 55, rating: 4.7, status: 'Active',    shift: 'Morning', gender: 'Male',   qualification: 'MBBS, MS' },
  { id: 4,  name: 'Dr. Kavya Reddy',   empId: 'DOC-004', dept: 'Gynecology',    specialty: 'Obstetrics & Gynecology',   phone: '9876541004', email: 'kavya@medicare.com',    experience: 9,  patients: 38, rating: 4.7, status: 'Active',    shift: 'Morning', gender: 'Female', qualification: 'MBBS, MS' },
  { id: 5,  name: 'Dr. Vijay Sharma',  empId: 'DOC-005', dept: 'Cardiology',    specialty: 'Cardiac Surgery',           phone: '9876541005', email: 'vijay@medicare.com',    experience: 20, patients: 35, rating: 4.6, status: 'On Leave',  shift: 'Night',   gender: 'Male',   qualification: 'MBBS, MD, MCh' },
  { id: 6,  name: 'Dr. Priya Nair',    empId: 'DOC-006', dept: 'Pediatrics',    specialty: 'Neonatology',               phone: '9876541006', email: 'priya@medicare.com',    experience: 8,  patients: 60, rating: 4.8, status: 'Active',    shift: 'Morning', gender: 'Female', qualification: 'MBBS, MD' },
  { id: 7,  name: 'Dr. Suresh Gupta',  empId: 'DOC-007', dept: 'Dermatology',   specialty: 'Cosmetic Dermatology',      phone: '9876541007', email: 'suresh@medicare.com',   experience: 12, patients: 44, rating: 4.5, status: 'Active',    shift: 'Evening', gender: 'Male',   qualification: 'MBBS, MD' },
  { id: 8,  name: 'Dr. Anita Mehta',   empId: 'DOC-008', dept: 'Pulmonology',   specialty: 'Respiratory Medicine',      phone: '9876541008', email: 'anita@medicare.com',    experience: 11, patients: 39, rating: 4.6, status: 'Inactive',  shift: 'Morning', gender: 'Female', qualification: 'MBBS, MD' },
  { id: 9,  name: 'Dr. Kiran Rao',     empId: 'DOC-009', dept: 'Gastrology',    specialty: 'Hepatology',                phone: '9876541009', email: 'kiran@medicare.com',    experience: 15, patients: 50, rating: 4.7, status: 'Active',    shift: 'Morning', gender: 'Male',   qualification: 'MBBS, MD, DM' },
  { id: 10, name: 'Dr. Meena Joshi',   empId: 'DOC-010', dept: 'Endocrinology', specialty: 'Diabetes & Metabolism',     phone: '9876541010', email: 'meena@medicare.com',    experience: 7,  patients: 52, rating: 4.6, status: 'Active',    shift: 'Evening', gender: 'Female', qualification: 'MBBS, MD' },
  { id: 11, name: 'Dr. Ravi Teja',     empId: 'DOC-011', dept: 'Neurology',     specialty: 'Epilepsy & Stroke',         phone: '9876541011', email: 'ravi@medicare.com',     experience: 6,  patients: 33, rating: 4.4, status: 'Active',    shift: 'Night',   gender: 'Male',   qualification: 'MBBS, MD' },
  { id: 12, name: 'Dr. Lakshmi Devi',  empId: 'DOC-012', dept: 'ENT',           specialty: 'Otolaryngology',            phone: '9876541012', email: 'lakshmi@medicare.com',  experience: 13, patients: 47, rating: 4.5, status: 'On Leave',  shift: 'Morning', gender: 'Female', qualification: 'MBBS, MS' },
]

const ITEMS_PER_PAGE = 8

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

const genderColor = {
  Male:   { background: '#dbeafe', color: '#1d4ed8' },
  Female: { background: '#fce7f3', color: '#be185d' },
}

const departments = ['All', ...new Set(doctorsData.map(d => d.dept))]
const statuses    = ['All', 'Active', 'On Leave', 'Inactive']
const shifts      = ['All', 'Morning', 'Evening', 'Night']

const AllDoctors = () => {
  const navigate = useNavigate()
  const [search,       setSearch]       = useState('')
  const [filterDept,   setFilterDept]   = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterShift,  setFilterShift]  = useState('All')
  const [page,         setPage]         = useState(1)

  const active   = doctorsData.filter(d => d.status === 'Active').length
  const onLeave  = doctorsData.filter(d => d.status === 'On Leave').length
  const inactive = doctorsData.filter(d => d.status === 'Inactive').length

  const filtered = doctorsData.filter(d => {
    const q = search.toLowerCase()
    const matchSearch = d.name.toLowerCase().includes(q) ||
                        d.empId.toLowerCase().includes(q) ||
                        d.specialty.toLowerCase().includes(q)
    const matchDept   = filterDept   === 'All' || d.dept   === filterDept
    const matchStatus = filterStatus === 'All' || d.status === filterStatus
    const matchShift  = filterShift  === 'All' || d.shift  === filterShift
    return matchSearch && matchDept && matchStatus && matchShift
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>All Doctors</h1>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0' }}>Manage all hospital medical staff</p>
        </div>
        <button onClick={() => navigate('/v/doctors/adddoctor')} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          backgroundColor: '#2563eb', color: '#fff', border: 'none',
          borderRadius: '10px', padding: '10px 18px',
          fontSize: '14px', fontWeight: '600', cursor: 'pointer',
        }}>
          <Plus size={16} /> Add Doctor
        </button>
      </div>

      {/* ── Summary Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Doctors', value: doctorsData.length, icon: Stethoscope, color: '#2563eb', bg: '#dbeafe' },
          { label: 'Active',        value: active,             icon: CheckCircle, color: '#15803d', bg: '#dcfce7' },
          { label: 'On Leave',      value: onLeave,            icon: Clock,       color: '#a16207', bg: '#fef9c3' },
          { label: 'Inactive',      value: inactive,           icon: XCircle,     color: '#dc2626', bg: '#fee2e2' },
        ].map(card => (
          <div key={card.label} style={{
            backgroundColor: '#fff', border: '1px solid #e5e7eb',
            borderRadius: '12px', padding: '16px',
            display: 'flex', alignItems: 'center', gap: '14px',
          }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px',
              backgroundColor: card.bg, display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <card.icon size={22} color={card.color} />
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: '700', color: '#1f2937' }}>{card.value}</div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div style={{
        backgroundColor: '#fff', border: '1px solid #e5e7eb',
        borderRadius: '12px', padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: '12px',
        marginBottom: '16px', flexWrap: 'wrap',
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={14} color="#9ca3af" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search by name, ID or specialty..."
            style={{ width: '100%', padding: '8px 10px 8px 32px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', color: '#374151', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <Filter size={14} color="#9ca3af" />
        {[{ val: filterDept, set: setFilterDept, opts: departments },
          { val: filterStatus, set: setFilterStatus, opts: statuses },
          { val: filterShift, set: setFilterShift, opts: shifts },
        ].map((f, i) => (
          <select key={i} value={f.val} onChange={e => { f.set(e.target.value); setPage(1) }}
            style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px 10px', fontSize: '13px', color: '#374151', outline: 'none', cursor: 'pointer', backgroundColor: '#fff' }}>
            {f.opts.map(o => <option key={o}>{o}</option>)}
          </select>
        ))}
        <span style={{ fontSize: '13px', color: '#9ca3af', marginLeft: 'auto' }}>
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* ── Table ── */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflowX:'scroll' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['Doctor', 'Emp ID', 'Department', 'Specialization', 'Contact', 'Experience', 'Patients', 'Rating', 'Shift', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={11} style={{ padding: '48px', textAlign: 'center', color: '#9ca3af' }}>
                  <Stethoscope size={32} color="#e5e7eb" style={{ display: 'block', margin: '0 auto 8px' }} />
                  No doctors found.
                </td>
              </tr>
            ) : paginated.map((d, i) => (
              <tr key={d.id}
                style={{ borderBottom: i < paginated.length - 1 ? '1px solid #f3f4f6' : 'none' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {/* Doctor */}
                <td style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      backgroundColor: d.gender === 'Female' ? '#fce7f3' : '#dbeafe',
                      color: d.gender === 'Female' ? '#be185d' : '#2563eb',
                      fontSize: '11px', fontWeight: '700',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      {d.name.split(' ').slice(1).map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1f2937' }}>{d.name}</div>
                      <span style={{ fontSize: '11px', fontWeight: '500', padding: '1px 6px', borderRadius: '999px', ...(genderColor[d.gender] || {}) }}>{d.gender}</span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '14px', color: '#6b7280', fontWeight: '500' }}>{d.empId}</td>
                <td style={{ padding: '14px', color: '#374151', fontWeight: '500' }}>{d.dept}</td>
                <td style={{ padding: '14px', color: '#6b7280', fontSize: '12px', maxWidth: '160px' }}>{d.specialty}</td>
                <td style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6b7280', marginBottom: '3px' }}>
                    <Phone size={11} /> {d.phone}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#9ca3af' }}>
                    <Mail size={11} /> {d.email}
                  </div>
                </td>
                <td style={{ padding: '14px', color: '#374151', fontWeight: '600', textAlign: 'center' }}>{d.experience} yrs</td>
                <td style={{ padding: '14px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                    <Users size={12} color="#9ca3af" />
                    <span style={{ fontWeight: '600', color: '#374151' }}>{d.patients}</span>
                  </div>
                </td>
                <td style={{ padding: '14px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'center' }}>
                    <Star size={13} color="#f59e0b" fill="#f59e0b" />
                    <span style={{ fontWeight: '700', color: '#1f2937', fontSize: '13px' }}>{d.rating}</span>
                  </div>
                </td>
                <td style={{ padding: '14px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '999px', ...shiftStyle[d.shift] }}>{d.shift}</span>
                </td>
                <td style={{ padding: '14px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '999px', ...statusStyle[d.status] }}>{d.status}</span>
                </td>
                <td style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button onClick={() => navigate(`/v/doctors/viewdoctor/${d.id}`)} title="View" style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#eff6ff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Eye size={14} color="#2563eb" />
                    </button>
                    <button onClick={() => navigate(`/v/doctors/editdoctor/${d.id}`)} title="Edit" style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#f0fdf4', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Pencil size={14} color="#16a34a" />
                    </button>
                    <button title="Delete" style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#fef2f2', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Trash2 size={14} color="#dc2626" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderTop: '1px solid #e5e7eb' }}>
            <span style={{ fontSize: '13px', color: '#9ca3af' }}>
              Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: page === 1 ? '#f9fafb' : '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronLeft size={15} color={page === 1 ? '#d1d5db' : '#374151'} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: p === page ? '#2563eb' : '#fff', color: p === page ? '#fff' : '#374151', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>{p}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: page === totalPages ? '#f9fafb' : '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronRight size={15} color={page === totalPages ? '#d1d5db' : '#374151'} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllDoctors