import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft, FaEdit, FaPhoneAlt, FaEnvelope, FaCircle,
  FaUserNurse, FaIdBadge, FaCalendarAlt
} from "react-icons/fa";
import { MdLocalHospital, MdWork, MdSchedule, MdLocationOn } from "react-icons/md";

const nursesData = [
  { id: 1, name: "Priya Sharma",    empId: "NRS-001", department: "ICU",        shift: "Morning", phone: "9876543210", email: "priya@medicare.com",   status: "Active",   experience: "5 yrs", avatar: "PS", gender: "Female", qualification: "B.Sc Nursing", joiningDate: "2019-06-15", address: "Flat 12, Kondapur, Hyderabad", emergencyContact: "9876540001" },
  { id: 2, name: "Lakshmi Devi",    empId: "NRS-002", department: "General",    shift: "Evening", phone: "9876543211", email: "lakshmi@medicare.com", status: "Active",   experience: "3 yrs", avatar: "LD", gender: "Female", qualification: "GNM",          joiningDate: "2021-03-10", address: "Plot 5, Miyapur, Hyderabad",   emergencyContact: "9876540002" },
  { id: 3, name: "Rekha Nair",      empId: "NRS-003", department: "Pediatrics", shift: "Night",   phone: "9876543212", email: "rekha@medicare.com",   status: "On Leave", experience: "7 yrs", avatar: "RN", gender: "Female", qualification: "M.Sc Nursing", joiningDate: "2017-09-01", address: "H No 33, Gachibowli, Hyd",    emergencyContact: "9876540003" },
  { id: 4, name: "Anitha Reddy",    empId: "NRS-004", department: "Surgery",    shift: "Morning", phone: "9876543213", email: "anitha@medicare.com",  status: "Active",   experience: "4 yrs", avatar: "AR", gender: "Female", qualification: "B.Sc Nursing", joiningDate: "2020-01-20", address: "Road 7, Banjara Hills, Hyd",   emergencyContact: "9876540004" },
  { id: 5, name: "Sunitha Kumari",  empId: "NRS-005", department: "Emergency",  shift: "Evening", phone: "9876543214", email: "sunitha@medicare.com", status: "Active",   experience: "6 yrs", avatar: "SK", gender: "Female", qualification: "GNM",          joiningDate: "2018-11-05", address: "Sector 4, ECIL, Hyderabad",    emergencyContact: "9876540005" },
  { id: 6, name: "Meena Patel",     empId: "NRS-006", department: "Cardiology", shift: "Night",   phone: "9876543215", email: "meena@medicare.com",   status: "Inactive", experience: "2 yrs", avatar: "MP", gender: "Female", qualification: "B.Sc Nursing", joiningDate: "2022-07-18", address: "Lane 9, Dilsukhnagar, Hyd",    emergencyContact: "9876540006" },
  { id: 7, name: "Divya Krishnan",  empId: "NRS-007", department: "ICU",        shift: "Morning", phone: "9876543216", email: "divya@medicare.com",   status: "Active",   experience: "8 yrs", avatar: "DK", gender: "Female", qualification: "M.Sc Nursing", joiningDate: "2016-04-22", address: "Block B, Kukatpally, Hyd",     emergencyContact: "9876540007" },
  { id: 8, name: "Kavitha Rao",     empId: "NRS-008", department: "General",    shift: "Evening", phone: "9876543217", email: "kavitha@medicare.com", status: "Active",   experience: "1 yr",  avatar: "KR", gender: "Female", qualification: "GNM",          joiningDate: "2023-02-14", address: "Street 3, LB Nagar, Hyd",      emergencyContact: "9876540008" },
];

const avatarColors  = ["#0057d9","#0a9396","#e76f51","#9b2335","#3d405b","#2a9d8f","#e9c46a","#264653"];
const statusColor   = { Active: "#2a9d8f", "On Leave": "#e76f51", Inactive: "#aaa" };
const statusBg      = { Active: "#e8f8f5", "On Leave": "#fef2ee", Inactive: "#f5f5f5" };
const shiftColor    = { Morning: "#b7791f", Evening: "#2b6cb0", Night: "#6b46c1" };
const shiftBg       = { Morning: "#fff8e1", Evening: "#e8f4fd", Night: "#f0eeff" };

const ViewNurses = () => {
  const navigate = useNavigate();
  const { id }   = useParams();
  const idx      = nursesData.findIndex(n => n.id === parseInt(id));
  const nurse    = nursesData[idx] || nursesData[0];
  const color    = avatarColors[idx % avatarColors.length];

  const InfoRow = ({ icon, label, value }) => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: "1px solid #f5f5f5" }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: "#eef3ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#0057d9", flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 600 }}>{label}</p>
        <p style={{ margin: "2px 0 0", fontSize: 13.5, color: "#0a1f44", fontWeight: 500 }}>{value || "—"}</p>
      </div>
    </div>
  );

  const SectionCard = ({ icon, title, children }) => (
    <div style={{ background: "#fff", borderRadius: 16, padding: "22px 24px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, paddingBottom: 12, borderBottom: "1.5px solid #f0f0f0" }}>
        <span style={{ fontSize: 16, color: "#0057d9" }}>{icon}</span>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0a1f44" }}>{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <div style={{ padding: "28px 32px", fontFamily: "'DM Sans', sans-serif", background: "#f6f8fc", minHeight: "100vh" }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={() => navigate("/nurses")}
            style={{ width: 38, height: 38, borderRadius: 10, border: "1.5px solid #e0e0e0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#555" }}
          >
            <FaArrowLeft style={{ fontSize: 13 }} />
          </button>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <MdLocalHospital style={{ fontSize: 20, color: "#0057d9" }} />
              <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0a1f44", margin: 0 }}>Nurse Profile</h1>
            </div>
            <p style={{ fontSize: 13, color: "#888", margin: 0 }}>MediCare HMS — Detailed nurse information</p>
          </div>
        </div>
        <button
          onClick={() => navigate(`/nurses/edit/${nurse.id}`)}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "linear-gradient(135deg,#0057d9,#0a2a6e)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
        >
          <FaEdit /> Edit Profile
        </button>
      </div>

      {/* ── Profile Hero Card ── */}
      <div style={{ background: "#fff", borderRadius: 20, padding: "28px 32px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", marginBottom: 24, display: "flex", alignItems: "center", gap: 28 }}>
        {/* Avatar */}
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 26, flexShrink: 0, boxShadow: `0 0 0 4px ${color}33` }}>
          {nurse.avatar}
        </div>
        {/* Name & meta */}
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: "#0a1f44" }}>{nurse.name}</h2>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: "#888" }}>{nurse.qualification} · {nurse.experience} experience</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span style={{ padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: statusBg[nurse.status], color: statusColor[nurse.status], display: "flex", alignItems: "center", gap: 5 }}>
              <FaCircle style={{ fontSize: 7 }} />{nurse.status}
            </span>
            <span style={{ padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: shiftBg[nurse.shift], color: shiftColor[nurse.shift] }}>
              {nurse.shift} Shift
            </span>
            <span style={{ padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#eef3ff", color: "#0057d9" }}>
              {nurse.department}
            </span>
          </div>
        </div>
        {/* Emp ID badge */}
        <div style={{ textAlign: "center", padding: "16px 24px", background: "#f6f8fc", borderRadius: 14 }}>
          <p style={{ margin: "0 0 4px", fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: 1 }}>Employee ID</p>
          <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#0057d9" }}>{nurse.empId}</p>
        </div>
      </div>

      {/* ── Detail Grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

        <SectionCard icon={<FaUserNurse style={{ fontSize: 14 }} />} title="Personal Information">
          <InfoRow icon={<FaIdBadge style={{ fontSize: 13 }} />}    label="Full Name"      value={nurse.name} />
          <InfoRow icon={<FaUserNurse style={{ fontSize: 13 }} />}  label="Gender"         value={nurse.gender} />
          <InfoRow icon={<FaIdBadge style={{ fontSize: 13 }} />}    label="Qualification"  value={nurse.qualification} />
          <InfoRow icon={<FaCalendarAlt style={{ fontSize: 13 }} />} label="Joining Date"  value={nurse.joiningDate} />
          <InfoRow icon={<MdLocationOn style={{ fontSize: 15 }} />}  label="Address"       value={nurse.address} />
        </SectionCard>

        <SectionCard icon={<FaPhoneAlt style={{ fontSize: 13 }} />} title="Contact Details">
          <InfoRow icon={<FaPhoneAlt style={{ fontSize: 13 }} />}   label="Phone"              value={nurse.phone} />
          <InfoRow icon={<FaEnvelope style={{ fontSize: 13 }} />}   label="Email"              value={nurse.email} />
          <InfoRow icon={<FaPhoneAlt style={{ fontSize: 13 }} />}   label="Emergency Contact"  value={nurse.emergencyContact} />
        </SectionCard>

        <SectionCard icon={<MdWork style={{ fontSize: 16 }} />} title="Work Details">
          <InfoRow icon={<MdWork style={{ fontSize: 15 }} />}       label="Department"  value={nurse.department} />
          <InfoRow icon={<MdSchedule style={{ fontSize: 15 }} />}   label="Shift"       value={`${nurse.shift} Shift`} />
          <InfoRow icon={<FaIdBadge style={{ fontSize: 13 }} />}    label="Experience"  value={nurse.experience} />
          <InfoRow icon={<FaCircle style={{ fontSize: 11 }} />}     label="Status"      value={nurse.status} />
        </SectionCard>

      </div>
    </div>
  );
};

export default ViewNurses;