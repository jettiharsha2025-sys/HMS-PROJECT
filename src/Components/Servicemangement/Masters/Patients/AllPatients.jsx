import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus, Search, Eye, Pencil, Trash2, Filter,
  ChevronLeft, ChevronRight, Users, UserCheck,
  UserX, Clock, Phone, Mail, Calendar,
} from 'lucide-react'

const patientsData = [
  { id: 1,  name: 'Rahul Sharma',   age: 34, gender: 'Male',   blood: 'B+',  phone: '9876543210', email: 'rahul@email.com',   doctor: 'Dr. Arun',   dept: 'Cardiology',   admit: '01 Dec 2024', status: 'Admitted',   issue: 'Chest Pain'    },
  { id: 2,  name: 'Priya Reddy',    age: 28, gender: 'Female', blood: 'O+',  phone: '9876543211', email: 'priya@email.com',   doctor: 'Dr. Sneha',  dept: 'General',      admit: '02 Dec 2024', status: 'Discharged', issue: 'Fever'         },
  { id: 3,  name: 'Suresh Kumar',   age: 52, gender: 'Male',   blood: 'A+',  phone: '9876543212', email: 'suresh@email.com',  doctor: 'Dr. Ramesh', dept: 'Orthopedics',  admit: '02 Dec 2024', status: 'Admitted',   issue: 'Knee Pain'     },
  { id: 4,  name: 'Anita Verma',    age: 45, gender: 'Female', blood: 'AB+', phone: '9876543213', email: 'anita@email.com',   doctor: 'Dr. Kavya',  dept: 'Endocrinology',admit: '03 Dec 2024', status: 'Outpatient', issue: 'Diabetes'      },
  { id: 5,  name: 'Kiran Naidu',    age: 61, gender: 'Male',   blood: 'B-',  phone: '9876543214', email: 'kiran@email.com',   doctor: 'Dr. Vijay',  dept: 'Cardiology',   admit: '03 Dec 2024', status: 'Admitted',   issue: 'Hypertension'  },
  { id: 6,  name: 'Meena Joshi',    age: 38, gender: 'Female', blood: 'O-',  phone: '9876543215', email: 'meena@email.com',   doctor: 'Dr. Arun',   dept: 'Neurology',    admit: '04 Dec 2024', status: 'Discharged', issue: 'Migraine'      },
  { id: 7,  name: 'Ravi Teja',      age: 29, gender: 'Male',   blood: 'A-',  phone: '9876543216', email: 'ravi@email.com',    doctor: 'Dr. Sneha',  dept: 'Pulmonology',  admit: '04 Dec 2024', status: 'Admitted',   issue: 'Asthma'        },
  { id: 8,  name: 'Lakshmi Devi',   age: 55, gender: 'Female', blood: 'B+',  phone: '9876543217', email: 'lakshmi@email.com', doctor: 'Dr. Ramesh', dept: 'Gastrology',   admit: '05 Dec 2024', status: 'Outpatient', issue: 'Gastritis'     },
  { id: 9,  name: 'Anil Reddy',     age: 47, gender: 'Male',   blood: 'AB-', phone: '9876543218', email: 'anil@email.com',    doctor: 'Dr. Kavya',  dept: 'Dermatology',  admit: '05 Dec 2024', status: 'Admitted',   issue: 'Skin Allergy'  },
  { id: 10, name: 'Sita Kumari',    age: 67, gender: 'Female', blood: 'O+',  phone: '9876543219', email: 'sita@email.com',    doctor: 'Dr. Vijay',  dept: 'Cardiology',   admit: '06 Dec 2024', status: 'Admitted',   issue: 'Heart Failure' },
  { id: 11, name: 'Mohan Das',      age: 41, gender: 'Male',   blood: 'A+',  phone: '9876543220', email: 'mohan@email.com',   doctor: 'Dr. Arun',   dept: 'Orthopedics',  admit: '06 Dec 2024', status: 'Discharged', issue: 'Back Pain'     },
  { id: 12, name: 'Radha Krishna',  age: 33, gender: 'Female', blood: 'B+',  phone: '9876543221', email: 'radha@email.com',   doctor: 'Dr. Sneha',  dept: 'Gynecology',   admit: '07 Dec 2024', status: 'Outpatient', issue: 'Checkup'       },
]

const ITEMS_PER_PAGE = 8

const statusStyle = {
  Admitted:   { background: '#dbeafe', color: '#1d4ed8' },
  Discharged: { background: '#dcfce7', color: '#15803d' },
  Outpatient: { background: '#fef9c3', color: '#a16207' },
}

const genderColor = {
  Male:   { background: '#dbeafe', color: '#1d4ed8' },
  Female: { background: '#fce7f3', color: '#be185d' },
}

const bloodColors = {
  'A+': '#dc2626', 'A-': '#dc2626', 'B+': '#2563eb', 'B-': '#2563eb',
  'O+': '#16a34a', 'O-': '#16a34a', 'AB+': '#7c3aed', 'AB-': '#7c3aed',
}

const departments = ['All', ...new Set(patientsData.map(p => p.dept))]
const statuses    = ['All', 'Admitted', 'Discharged', 'Outpatient']

const AllPatients = () => {
  const navigate = useNavigate()
  const [search,       setSearch]       = useState('')
  const [filterDept,   setFilterDept]   = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [page,         setPage]         = useState(1)

  const admitted   = patientsData.filter(p => p.status === 'Admitted').length
  const discharged = patientsData.filter(p => p.status === 'Discharged').length
  const outpatient = patientsData.filter(p => p.status === 'Outpatient').length

  const filtered = patientsData.filter(p => {
    const q = search.toLowerCase()
    const matchSearch = p.name.toLowerCase().includes(q) ||
                        p.issue.toLowerCase().includes(q) ||
                        p.doctor.toLowerCase().includes(q)
    const matchDept   = filterDept   === 'All' || p.dept   === filterDept
    const matchStatus = filterStatus === 'All' || p.status === filterStatus
    return matchSearch && matchDept && matchStatus
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>All Patients</h1>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0' }}>Manage and track all hospital patients</p>
        </div>
        <button onClick={() => navigate('/v/patients/addpatient')} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          backgroundColor: '#2563eb', color: '#fff',
          border: 'none', borderRadius: '10px',
          padding: '10px 18px', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
        }}>
          <Plus size={16} /> Add Patient
        </button>
      </div>

      {/* ── Summary Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Patients', value: patientsData.length, icon: Users,      color: '#2563eb', bg: '#dbeafe' },
          { label: 'Admitted',       value: admitted,            icon: UserCheck,  color: '#1d4ed8', bg: '#dbeafe' },
          { label: 'Discharged',     value: discharged,          icon: UserX,      color: '#15803d', bg: '#dcfce7' },
          { label: 'Outpatient',     value: outpatient,          icon: Clock,      color: '#a16207', bg: '#fef9c3' },
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
            placeholder="Search by name, issue or doctor..."
            style={{
              width: '100%', padding: '8px 10px 8px 32px',
              border: '1px solid #e5e7eb', borderRadius: '8px',
              fontSize: '13px', color: '#374151', outline: 'none', boxSizing: 'border-box',
            }} />
        </div>
        <Filter size={14} color="#9ca3af" />
        <select value={filterDept} onChange={e => { setFilterDept(e.target.value); setPage(1) }}
          style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px 10px', fontSize: '13px', color: '#374151', outline: 'none', cursor: 'pointer', backgroundColor: '#fff' }}>
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1) }}
          style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px 10px', fontSize: '13px', color: '#374151', outline: 'none', cursor: 'pointer', backgroundColor: '#fff' }}>
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <span style={{ fontSize: '13px', color: '#9ca3af', marginLeft: 'auto' }}>
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* ── Table ── */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflowX: 'auto' }}>
        <table style={{  minWidth: '1200px', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['Patient', 'Age / Gender', 'Blood', 'Contact', 'Doctor', 'Department', 'Admit Date', 'Issue', 'Status', 'Actions'].map(h => (
                <th key={h} style={{
                  padding: '12px 16px', textAlign: 'left',
                  fontSize: '11px', fontWeight: '600', color: '#6b7280',
                  textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ padding: '48px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
                  <Users size={32} color="#e5e7eb" style={{ display: 'block', margin: '0 auto 8px' }} />
                  No patients found.
                </td>
              </tr>
            ) : paginated.map((p, i) => (
              <tr key={p.id}
                style={{ borderBottom: i < paginated.length - 1 ? '1px solid #f3f4f6' : 'none' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {/* Patient */}
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '34px', height: '34px', borderRadius: '50%',
                      backgroundColor: '#dbeafe', color: '#2563eb',
                      fontSize: '11px', fontWeight: '700',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      {p.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <span style={{ fontWeight: '600', color: '#1f2937' }}>{p.name}</span>
                  </div>
                </td>

                {/* Age / Gender */}
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontSize: '13px', color: '#374151' }}>{p.age} yrs</div>
                  <span style={{
                    fontSize: '11px', fontWeight: '600',
                    padding: '1px 7px', borderRadius: '999px',
                    ...(genderColor[p.gender] || {}),
                  }}>{p.gender}</span>
                </td>

                {/* Blood Group */}
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    fontSize: '12px', fontWeight: '700',
                    color: bloodColors[p.blood] || '#374151',
                  }}>{p.blood}</span>
                </td>

                {/* Contact */}
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6b7280', marginBottom: '2px' }}>
                    <Phone size={11} /> {p.phone}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#9ca3af' }}>
                    <Mail size={11} /> {p.email}
                  </div>
                </td>

                {/* Doctor */}
                <td style={{ padding: '14px 16px', color: '#374151', fontWeight: '500', fontSize: '13px' }}>{p.doctor}</td>

                {/* Department */}
                <td style={{ padding: '14px 16px', color: '#6b7280', fontSize: '13px' }}>{p.dept}</td>

                {/* Admit Date */}
                <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6b7280' }}>
                    <Calendar size={11} /> {p.admit}
                  </div>
                </td>

                {/* Issue */}
                <td style={{ padding: '14px 16px', color: '#374151', fontWeight: '500' }}>{p.issue}</td>

                {/* Status */}
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    fontSize: '11px', fontWeight: '600',
                    padding: '3px 10px', borderRadius: '999px',
                    ...statusStyle[p.status],
                  }}>{p.status}</span>
                </td>

                {/* Actions */}
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button onClick={() => navigate(`/v/patients/viewpatient/${p.id}`)} title="View" style={{
                      width: '30px', height: '30px', borderRadius: '8px',
                      backgroundColor: '#eff6ff', border: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    }}><Eye size={14} color="#2563eb" /></button>
                    <button onClick={() => navigate(`/v/patients/editpatient/${p.id}`)} title="Edit" style={{
                      width: '30px', height: '30px', borderRadius: '8px',
                      backgroundColor: '#f0fdf4', border: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    }}><Pencil size={14} color="#16a34a" /></button>
                    <button title="Delete" style={{
                      width: '30px', height: '30px', borderRadius: '8px',
                      backgroundColor: '#fef2f2', border: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    }}><Trash2 size={14} color="#dc2626" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 16px', borderTop: '1px solid #e5e7eb',
          }}>
            <span style={{ fontSize: '13px', color: '#9ca3af' }}>
              Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{
                width: '32px', height: '32px', borderRadius: '8px',
                border: '1px solid #e5e7eb', backgroundColor: page === 1 ? '#f9fafb' : '#fff',
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><ChevronLeft size={15} color={page === 1 ? '#d1d5db' : '#374151'} /></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)} style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  backgroundColor: p === page ? '#2563eb' : '#fff',
                  color: p === page ? '#fff' : '#374151',
                  fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                }}>{p}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{
                width: '32px', height: '32px', borderRadius: '8px',
                border: '1px solid #e5e7eb', backgroundColor: page === totalPages ? '#f9fafb' : '#fff',
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><ChevronRight size={15} color={page === totalPages ? '#d1d5db' : '#374151'} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllPatients