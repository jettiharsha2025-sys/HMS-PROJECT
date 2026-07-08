import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  HeartPulse,
  Star,
  ShieldCheck,
  Pill,
  FileText,
  ScanLine,
  FlaskConical,
  LogOut,
  Hospital,
} from 'lucide-react'

// ── Menu Items ──
const MENU_ITEMS = [
  { label: 'Dashboard1',    icon: LayoutDashboard, path: '/v/dashboard'   },
  { label: 'Patients',     icon: Users,           path: '/v/patients/allpatients'    },
  { label: 'Doctors',      icon: Stethoscope,     path: '/v/doctors/alldoctors'     },
  { label: 'Nurses',       icon: HeartPulse,      path: '/v/nurses/allnurses'      },
  { label: 'Specialities', icon: Star,            path: '/v/specialities'},
  { label: 'Users',        icon: ShieldCheck,     path: '/v/users'       },
  { label: 'Medications',  icon: Pill,            path: '/v/medications' },
  { label: 'Prescription', icon: FileText,        path: '/v/prescription'},
  { label: 'Scans',        icon: ScanLine,        path: '/v/scans'       },
  { label: 'Tests',        icon: FlaskConical,    path: '/v/tests'       },
]

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname.startsWith(path)

  return (
    <div style={{
      width: '220px',
      minWidth: '220px',
      height: '100vh',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 50,
      overflowY: 'auto',
      overflowX: 'hidden',
      borderRight: '1px solid #e5e7eb',
      boxShadow: '4px 0 24px rgba(37, 99, 235, 0.06)',
    }}>

      {/* ── Branding ── */}
      <div style={{
        padding: '20px 16px 16px',
        borderBottom: '1px solid #eff6ff',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexShrink: 0,
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
      }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '10px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          border: '1.5px solid rgba(255,255,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Hospital size={20} color="#fff" />
        </div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff', lineHeight: 1.2 }}>
            MediCare HMS
          </div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.65)', marginTop: '1px' }}>
            Hospital Management System
          </div>
        </div>
      </div>

      {/* ── Main Menu ── */}
      <div style={{ flex: 1, padding: '14px 10px', overflowY: 'auto' }}>

        {/* Section Label */}
        <div style={{
          fontSize: '9px', fontWeight: '700',
          color: '#93c5fd',
          letterSpacing: '1.5px', textTransform: 'uppercase',
          padding: '0 10px', marginBottom: '8px',
        }}>
          Main Menu
        </div>

        {MENU_ITEMS.map((item) => {
          const active = isActive(item.path)
          return (
            <div
              key={item.label}
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: '10px',
                marginBottom: '2px',
                cursor: 'pointer',
                backgroundColor: active ? '#2563eb' : 'transparent',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => {
                if (!active) e.currentTarget.style.backgroundColor = '#eff6ff'
              }}
              onMouseLeave={e => {
                if (!active) e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              {/* Icon */}
              <item.icon
                size={17}
                color={active ? '#fff' : '#2563eb'}
                strokeWidth={active ? 2.2 : 1.8}
              />

              {/* Label */}
              <span style={{
                fontSize: '13px',
                fontWeight: active ? '600' : '400',
                color: active ? '#fff' : '#374151',
                flex: 1,
              }}>
                {item.label}
              </span>

              {/* Active dot */}
              {active && (
                <div style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  backgroundColor: '#93c5fd', flexShrink: 0,
                }} />
              )}
            </div>
          )
        })}
      </div>

      {/* ── Footer — Logout ── */}
      <div style={{
        padding: '12px 10px 20px',
        borderTop: '1px solid #e5e7eb',
        flexShrink: 0,
      }}>
        <div


          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '9px 12px',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fef2f2'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <LogOut size={17} color="#ef4444" strokeWidth={1.8} />
          <span style={{ fontSize: '13px', fontWeight: '500', color: '#ef4444' }}>
            Logout
          </span>
        </div>
      </div>

    </div>
  )
}

export default Sidebar