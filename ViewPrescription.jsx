import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Pencil, Trash2, User, Stethoscope, FileText, Calendar, Pill, Printer } from 'lucide-react'
import { prescriptionData } from './AllPrescription'

const statusStyle = {
  Active:    { background: '#dbeafe', color: '#1d4ed8' },
  Completed: { background: '#dcfce7', color: '#15803d' },
  Cancelled: { background: '#fee2e2', color: '#dc2626' },
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

const ViewPrescription = () => {
  const navigate = useNavigate()
  const { id }   = useParams()
  const p        = prescriptionData.find(rx => rx.id === parseInt(id))

  if (!p) return (
    <div style={{ padding: '48px', textAlign: 'center' }}>
      <div style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>Prescription Not Found</div>
      <button onClick={() => navigate('/v/prescription')} style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', backgroundColor: '#2563eb', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><ArrowLeft size={14} /> Back</button>
    </div>
  )

  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate(-1)} style={{ width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #e5e7eb', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ArrowLeft size={16} color="#374151" /></button>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>Prescription Details</h1>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0' }}>{p.patientName} · {p.patientId}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', backgroundColor: '#fff', fontSize: '13px', fontWeight: '600', color: '#374151', cursor: 'pointer' }}><Printer size={14} /> Print</button>
          <button onClick={() => navigate(`/v/prescription/editprescription/${p.id}`)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', backgroundColor: '#fff', fontSize: '13px', fontWeight: '600', color: '#374151', cursor: 'pointer' }}><Pencil size={14} /> Edit</button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '10px', border: 'none', backgroundColor: '#fee2e2', fontSize: '13px', fontWeight: '600', color: '#dc2626', cursor: 'pointer' }}><Trash2 size={14} /> Delete</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '20px', alignItems: 'start' }}>
        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ ...sectionCard, textAlign: 'center' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '16px', backgroundColor: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <FileText size={34} color="#2563eb" />
            </div>
            <div style={{ fontSize: '17px', fontWeight: '700', color: '#1f2937' }}>{p.patientName}</div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>{p.patientId}</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 12px', borderRadius: '999px', ...statusStyle[p.status] }}>{p.status}</span>
            </div>
          </div>

          <div style={sectionCard}>
            <div style={sectionTitle}><Stethoscope size={15} color="#2563eb" /> Prescribed By</div>
            <InfoRow icon={Stethoscope} label="Doctor"     value={p.doctorName} />
            <InfoRow icon={Stethoscope} label="Department" value={p.department} />
            <InfoRow icon={Calendar}    label="Date"       value={p.date} />
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={sectionCard}>
            <div style={sectionTitle}><FileText size={15} color="#2563eb" /> Diagnosis</div>
            <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>{p.diagnosis}</p>
          </div>

          <div style={sectionCard}>
            <div style={sectionTitle}><Pill size={15} color="#2563eb" /> Medicines</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  {['Medicine', 'Dosage', 'Frequency', 'Duration'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.medicines.map((med, i) => (
                  <tr key={i} style={{ borderBottom: i < p.medicines.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <td style={{ padding: '10px 12px', fontWeight: '600', color: '#1f2937' }}>{med.name}</td>
                    <td style={{ padding: '10px 12px', color: '#374151' }}>{med.dosage}</td>
                    <td style={{ padding: '10px 12px', color: '#374151' }}>{med.frequency}</td>
                    <td style={{ padding: '10px 12px', color: '#374151' }}>{med.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {p.notes && (
            <div style={sectionCard}>
              <div style={sectionTitle}><FileText size={15} color="#2563eb" /> Notes</div>
              <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>{p.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewPrescription