import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users, Stethoscope, HeartPulse, CalendarDays,
  Pill, FileText, FlaskConical, ScanLine,
  TrendingUp, TrendingDown, AlertTriangle,
  CheckCircle, Clock, Activity, ArrowRight,
  BedDouble, Star, ShieldCheck,
} from 'lucide-react'

// ── Mock Data ──
const stats = [
  { label: 'Total Patients',  value: 340,  change: '+12%', up: true,  icon: Users,        color: '#2563eb', bg: '#dbeafe' },
  { label: 'Total Doctors',   value: 82,   change: '+3%',  up: true,  icon: Stethoscope,  color: '#16a34a', bg: '#dcfce7' },
  { label: 'Total Nurses',    value: 54,   change: '+5%',  up: true,  icon: HeartPulse,   color: '#7c3aed', bg: '#ede9fe' },
  { label: 'Appointments',    value: 128,  change: '+8%',  up: true,  icon: CalendarDays, color: '#0891b2', bg: '#cffafe' },
  { label: 'Medications',     value: 246,  change: '-2%',  up: false, icon: Pill,         color: '#d97706', bg: '#fef9c3' },
  { label: 'Prescriptions',   value: 94,   change: '+15%', up: true,  icon: FileText,     color: '#be185d', bg: '#fce7f3' },
  { label: 'Lab Tests',       value: 63,   change: '+7%',  up: true,  icon: FlaskConical, color: '#0f766e', bg: '#ccfbf1' },
  { label: 'Scans Today',     value: 21,   change: '+4%',  up: true,  icon: ScanLine,     color: '#dc2626', bg: '#fee2e2' },
]

const recentPatients = [
  { id: 1, name: 'Rahul Sharma',   age: 34, issue: 'Chest Pain',    status: 'Admitted',   doctor: 'Dr. Arun',   time: '9:00 AM'  },
  { id: 2, name: 'Priya Reddy',    age: 28, issue: 'Fever',         status: 'Discharged', doctor: 'Dr. Sneha',  time: '10:30 AM' },
  { id: 3, name: 'Suresh Kumar',   age: 52, issue: 'Knee Pain',     status: 'Admitted',   doctor: 'Dr. Ramesh', time: '11:00 AM' },
  { id: 4, name: 'Anita Verma',    age: 45, issue: 'Diabetes',      status: 'Outpatient', doctor: 'Dr. Kavya',  time: '2:00 PM'  },
  { id: 5, name: 'Kiran Naidu',    age: 61, issue: 'Hypertension',  status: 'Admitted',   doctor: 'Dr. Vijay',  time: '3:30 PM'  },
]

const appointments = [
  { id: 1, patient: 'Meena Joshi',   doctor: 'Dr. Arun',   dept: 'Cardiology',   time: '9:00 AM',  status: 'Confirmed' },
  { id: 2, patient: 'Ravi Teja',     doctor: 'Dr. Sneha',  dept: 'Neurology',    time: '10:30 AM', status: 'Pending'   },
  { id: 3, patient: 'Lakshmi Devi',  doctor: 'Dr. Ramesh', dept: 'Orthopedics',  time: '11:00 AM', status: 'Confirmed' },
  { id: 4, patient: 'Anil Reddy',    doctor: 'Dr. Kavya',  dept: 'Dermatology',  time: '2:00 PM',  status: 'Cancelled' },
  { id: 5, patient: 'Sita Kumari',   doctor: 'Dr. Vijay',  dept: 'ENT',          time: '3:30 PM',  status: 'Confirmed' },
]

const departments = [
  { name: 'Cardiology',    patients: 48, doctors: 6, icon: Activity,    color: '#dc2626', bg: '#fee2e2' },
  { name: 'Neurology',     patients: 35, doctors: 4, icon: BedDouble,   color: '#7c3aed', bg: '#ede9fe' },
  { name: 'Orthopedics',   patients: 42, doctors: 5, icon: ShieldCheck, color: '#0891b2', bg: '#cffafe' },
  { name: 'Pediatrics',    patients: 29, doctors: 3, icon: Star,        color: '#16a34a', bg: '#dcfce7' },
  { name: 'Dermatology',   patients: 31, doctors: 4, icon: Users,       color: '#d97706', bg: '#fef9c3' },
  { name: 'Emergency',     patients: 18, doctors: 8, icon: AlertTriangle,color:'#dc2626', bg: '#fee2e2' },
]

const topDoctors = [
  { name: 'Dr. Arun Kumar',  dept: 'Cardiology',  patients: 48, rating: 4.9, avatar: 'AK' },
  { name: 'Dr. Sneha Rao',   dept: 'Neurology',   patients: 42, rating: 4.8, avatar: 'SR' },
  { name: 'Dr. Kavya Reddy', dept: 'Gynecology',  patients: 38, rating: 4.7, avatar: 'KR' },
  { name: 'Dr. Vijay Sharma',dept: 'Orthopedics', patients: 35, rating: 4.6, avatar: 'VS' },
]

const alerts = [
  { type: 'warning', msg: '3 medications expiring within 30 days',        icon: AlertTriangle },
  { type: 'info',    msg: '8 pending lab test results awaiting review',   icon: FlaskConical  },
  { type: 'success', msg: '12 patients successfully discharged today',    icon: CheckCircle   },
  { type: 'warning', msg: '2 appointments cancelled — slots available',   icon: CalendarDays  },
]

const alertStyle = {
  warning: { bg: '#fef9c3', border: '#fde68a', color: '#a16207', icon: '#d97706' },
  info:    { bg: '#dbeafe', border: '#bfdbfe', color: '#1d4ed8', icon: '#2563eb' },
  success: { bg: '#dcfce7', border: '#bbf7d0', color: '#15803d', icon: '#16a34a' },
}

const statusStyle = {
  Admitted:   { background: '#dbeafe', color: '#1d4ed8' },
  Discharged: { background: '#dcfce7', color: '#15803d' },
  Outpatient: { background: '#fef9c3', color: '#a16207' },
  Confirmed:  { background: '#dcfce7', color: '#15803d' },
  Pending:    { background: '#fef9c3', color: '#a16207' },
  Cancelled:  { background: '#fee2e2', color: '#dc2626' },
}

const card = {
  backgroundColor: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: '14px',
  padding: '20px',
}

const sectionTitle = {
  fontSize: '15px',
  fontWeight: '700',
  color: '#1f2937',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const Dashboard = () => {
  const navigate = useNavigate()
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>

      {/* ── Page Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
            Dashboard
          </h1>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0' }}>
            {today} — Welcome back, Dr. Admin
          </p>
        </div>

        {/* Quick OPD Stats */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '20px',
          backgroundColor: '#fff', border: '1px solid #e5e7eb',
          borderRadius: '12px', padding: '10px 20px',
        }}>
          {[
            { label: "Today's OPD", value: 24, color: '#2563eb' },
            { label: 'Surgeries',   value: 6,  color: '#16a34a' },
            { label: 'Emergency',   value: 3,  color: '#dc2626' },
            { label: 'Admissions',  value: 18, color: '#7c3aed' },
          ].map((s, i, arr) => (
            <React.Fragment key={s.label}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: s.color }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>{s.label}</div>
              </div>
              {i < arr.length - 1 && <div style={{ width: '1px', height: '30px', backgroundColor: '#e5e7eb' }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Alerts ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {alerts.map((a, i) => {
          const st = alertStyle[a.type]
          return (
            <div key={i} style={{
              backgroundColor: st.bg, border: `1px solid ${st.border}`,
              borderRadius: '10px', padding: '12px 14px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <a.icon size={16} color={st.icon} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '12px', fontWeight: '500', color: st.color, lineHeight: 1.4 }}>{a.msg}</span>
            </div>
          )
        })}
      </div>

      {/* ── Stats Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {stats.map(s => (
          <div key={s.label} style={{
            ...card,
            display: 'flex', alignItems: 'center', gap: '14px',
            cursor: 'pointer', transition: 'box-shadow 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              backgroundColor: s.bg, display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <s.icon size={22} color={s.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '22px', fontWeight: '700', color: '#1f2937', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '3px' }}>{s.label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                {s.up
                  ? <TrendingUp size={12} color="#16a34a" />
                  : <TrendingDown size={12} color="#dc2626" />
                }
                <span style={{ fontSize: '11px', fontWeight: '600', color: s.up ? '#16a34a' : '#dc2626' }}>
                  {s.change} this month
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Recent Patients + Appointments ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>

        {/* Recent Patients */}
        <div style={card}>
          <div style={sectionTitle}>
            <span>Recent Patients</span>
            <button onClick={() => navigate('/v/patients')} style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              fontSize: '12px', fontWeight: '600', color: '#2563eb',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}>
              View All <ArrowRight size={13} />
            </button>
          </div>
          {recentPatients.map((p, i) => (
            <div key={p.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 0',
              borderBottom: i < recentPatients.length - 1 ? '1px solid #f3f4f6' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  backgroundColor: '#dbeafe', color: '#2563eb',
                  fontSize: '11px', fontWeight: '700',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {p.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>{p.name}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af' }}>{p.issue} · Age {p.age} · {p.doctor}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px' }}>
                <span style={{
                  fontSize: '11px', fontWeight: '600',
                  padding: '2px 8px', borderRadius: '999px',
                  ...statusStyle[p.status],
                }}>{p.status}</span>
                <span style={{ fontSize: '10px', color: '#9ca3af' }}>{p.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Today's Appointments */}
        <div style={card}>
          <div style={sectionTitle}>
            <span>Today's Appointments</span>
            <button onClick={() => navigate('/v/appointments')} style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              fontSize: '12px', fontWeight: '600', color: '#2563eb',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}>
              View All <ArrowRight size={13} />
            </button>
          </div>
          {appointments.map((a, i) => (
            <div key={a.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 0',
              borderBottom: i < appointments.length - 1 ? '1px solid #f3f4f6' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  backgroundColor: '#f3e8ff', color: '#7c3aed',
                  fontSize: '11px', fontWeight: '700',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {a.patient.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>{a.patient}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af' }}>{a.doctor} · {a.dept}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px' }}>
                <span style={{
                  fontSize: '11px', fontWeight: '600',
                  padding: '2px 8px', borderRadius: '999px',
                  ...statusStyle[a.status],
                }}>{a.status}</span>
                <span style={{ fontSize: '10px', color: '#9ca3af' }}>
                  <Clock size={10} style={{ marginRight: '2px' }} />{a.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Departments + Top Doctors ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '20px' }}>

        {/* Departments */}
        <div style={card}>
          <div style={sectionTitle}>
            <span>Departments Overview</span>
            <button onClick={() => navigate('/v/specialities')} style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              fontSize: '12px', fontWeight: '600', color: '#2563eb',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}>
              View All <ArrowRight size={13} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {departments.map(d => (
              <div key={d.name} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px', borderRadius: '10px',
                backgroundColor: '#f9fafb', border: '1px solid #f3f4f6',
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  backgroundColor: d.bg, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <d.icon size={17} color={d.color} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>{d.name}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af' }}>
                    {d.patients} patients · {d.doctors} doctors
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Doctors */}
        <div style={card}>
          <div style={sectionTitle}>
            <span>Top Doctors</span>
            <button onClick={() => navigate('/v/doctors')} style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              fontSize: '12px', fontWeight: '600', color: '#2563eb',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}>
              View All <ArrowRight size={13} />
            </button>
          </div>
          {topDoctors.map((d, i) => (
            <div key={d.name} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px 0',
              borderBottom: i < topDoctors.length - 1 ? '1px solid #f3f4f6' : 'none',
            }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%',
                backgroundColor: '#dbeafe', color: '#2563eb',
                fontSize: '12px', fontWeight: '700',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {d.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>{d.name}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>{d.dept}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Star size={12} color="#f59e0b" fill="#f59e0b" />
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#1f2937' }}>{d.rating}</span>
                </div>
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>{d.patients} pts</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div style={card}>
        <div style={{ ...sectionTitle, marginBottom: '14px' }}>
          <span>Quick Actions</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
          {[
            { label: 'Add Patient',      icon: Users,        color: '#2563eb', bg: '#dbeafe', path: '/v/patients'             },
            { label: 'Add Doctor',       icon: Stethoscope,  color: '#16a34a', bg: '#dcfce7', path: '/v/doctors'              },
            { label: 'Add Nurse',        icon: HeartPulse,   color: '#7c3aed', bg: '#ede9fe', path: '/v/nurses/addnurses'     },
            { label: 'New Prescription', icon: FileText,     color: '#be185d', bg: '#fce7f3', path: '/v/prescription/addprescription' },
            { label: 'Add Medication',   icon: Pill,         color: '#d97706', bg: '#fef9c3', path: '/v/medications/addmedications'   },
            { label: 'New Test',         icon: FlaskConical, color: '#0f766e', bg: '#ccfbf1', path: '/v/tests/addtest'        },
          ].map(q => (
            <button
              key={q.label}
              onClick={() => navigate(q.path)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                padding: '14px 10px', borderRadius: '12px',
                backgroundColor: q.bg, border: `1px solid ${q.bg}`,
                cursor: 'pointer', transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = 'none' }}
            >
              <q.icon size={22} color={q.color} />
              <span style={{ fontSize: '12px', fontWeight: '600', color: q.color, textAlign: 'center', lineHeight: 1.3 }}>
                {q.label}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  )

}

export default Dashboard