import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserNurse, FaSearch, FaPlus, FaEye, FaEdit, FaTrashAlt,
  FaPhoneAlt, FaEnvelope, FaCircle
} from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";

const nursesData = [
  { id: 1, name: "Priya Sharma",       empId: "NRS-001", department: "ICU",        shift: "Morning",   phone: "9876543210", email: "priya@medicare.com",   status: "Active",   experience: "5 yrs", avatar: "PS" },
  { id: 2, name: "Lakshmi Devi",       empId: "NRS-002", department: "General",    shift: "Evening",   phone: "9876543211", email: "lakshmi@medicare.com", status: "Active",   experience: "3 yrs", avatar: "LD" },
  { id: 3, name: "Rekha Nair",         empId: "NRS-003", department: "Pediatrics", shift: "Night",     phone: "9876543212", email: "rekha@medicare.com",   status: "On Leave", experience: "7 yrs", avatar: "RN" },
  { id: 4, name: "Anitha Reddy",       empId: "NRS-004", department: "Surgery",    shift: "Morning",   phone: "9876543213", email: "anitha@medicare.com",  status: "Active",   experience: "4 yrs", avatar: "AR" },
  { id: 5, name: "Sunitha Kumari",     empId: "NRS-005", department: "Emergency",  shift: "Evening",   phone: "9876543214", email: "sunitha@medicare.com", status: "Active",   experience: "6 yrs", avatar: "SK" },
  { id: 6, name: "Meena Patel",        empId: "NRS-006", department: "Cardiology", shift: "Night",     phone: "9876543215", email: "meena@medicare.com",   status: "Inactive", experience: "2 yrs", avatar: "MP" },
  { id: 7, name: "Divya Krishnan",     empId: "NRS-007", department: "ICU",        shift: "Morning",   phone: "9876543216", email: "divya@medicare.com",   status: "Active",   experience: "8 yrs", avatar: "DK" },
  { id: 8, name: "Kavitha Rao",        empId: "NRS-008", department: "General",    shift: "Evening",   phone: "9876543217", email: "kavitha@medicare.com", status: "Active",   experience: "1 yr",  avatar: "KR" },
];

const departments = ["All", "ICU", "General", "Pediatrics", "Surgery", "Emergency", "Cardiology"];
const shifts      = ["All", "Morning", "Evening", "Night"];

const avatarColors = ["#0057d9","#0a9396","#e76f51","#9b2335","#3d405b","#2a9d8f","#e9c46a","#264653"];

const AllNurses = () => {
  const navigate = useNavigate();
  const [search,     setSearch]     = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [shiftFilter,setShiftFilter]= useState("All");

  const filtered = nursesData.filter((n) => {
    const matchSearch = n.name.toLowerCase().includes(search.toLowerCase()) || n.empId.toLowerCase().includes(search.toLowerCase());
    const matchDept   = deptFilter  === "All" || n.department === deptFilter;
    const matchShift  = shiftFilter === "All" || n.shift      === shiftFilter;
    return matchSearch && matchDept && matchShift;
  });

  const stats = [
    { label: "Total Nurses",  value: nursesData.length,                                        color: "#0057d9", bg: "#eef3ff" },
    { label: "Active",        value: nursesData.filter(n => n.status === "Active").length,      color: "#2a9d8f", bg: "#e8f8f5" },
    { label: "On Leave",      value: nursesData.filter(n => n.status === "On Leave").length,    color: "#e76f51", bg: "#fef2ee" },
    { label: "Departments",   value: departments.length - 1,                                    color: "#9b2335", bg: "#fdf0f2" },
  ];

  const statusColor = { Active: "#2a9d8f", "On Leave": "#e76f51", Inactive: "#aaa" };
  const shiftBg     = { Morning: "#fff8e1", Evening: "#e8f4fd", Night: "#f0eeff" };
  const shiftColor  = { Morning: "#b7791f", Evening: "#2b6cb0", Night: "#6b46c1" };

  return (
    <div style={{ padding: "28px 32px", fontFamily: "'DM Sans', sans-serif", background: "#f6f8fc", minHeight: "100vh" }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <MdLocalHospital style={{ fontSize: 22, color: "#0057d9" }} />
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0a1f44", margin: 0 }}>Nursing Staff</h1>
          </div>
          <p style={{ fontSize: 13, color: "#888", margin: 0 }}>MediCare HMS — Manage all registered nurses</p>
        </div>
        <button
          onClick={() => navigate("/nurses/addnurses")}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "linear-gradient(135deg,#0057d9,#0a2a6e)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
        >
          <FaPlus /> Add Nurse
        </button>
      </div>

      {/* ── Stats ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
        {stats.map((st, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "18px 22px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", borderLeft: `4px solid ${st.color}` }}>
            <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 1 }}>{st.label}</p>
            <p style={{ fontSize: 28, fontWeight: 800, color: st.color, margin: 0 }}>{st.value}</p>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div style={{ display: "flex", gap: 12, marginBottom: 22, flexWrap: "wrap", alignItems: "center" }}>
        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1.5px solid #e8eaf0", borderRadius: 10, padding: "8px 14px", flex: "1 1 220px" }}>
          <FaSearch style={{ color: "#aaa", fontSize: 13 }} />
          <input
            style={{ border: "none", outline: "none", fontSize: 13, width: "100%", fontFamily: "inherit", background: "transparent" }}
            placeholder="Search by name or ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Department filter */}
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          style={{ padding: "9px 14px", border: "1.5px solid #e8eaf0", borderRadius: 10, fontSize: 13, background: "#fff", fontFamily: "inherit", cursor: "pointer", outline: "none" }}
        >
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>
        {/* Shift filter */}
        <select
          value={shiftFilter}
          onChange={(e) => setShiftFilter(e.target.value)}
          style={{ padding: "9px 14px", border: "1.5px solid #e8eaf0", borderRadius: 10, fontSize: 13, background: "#fff", fontFamily: "inherit", cursor: "pointer", outline: "none" }}
        >
          {shifts.map(s => <option key={s}>{s}</option>)}
        </select>
        <p style={{ fontSize: 13, color: "#888", margin: 0 }}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
      </div>

      {/* ── Table ── */}
      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", overflowX: "scroll" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f6f8fc" }}>
              {["Nurse", "Emp ID", "Department", "Shift", "Contact", "Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "14px 18px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1.5px solid #f0f0f0" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((nurse, i) => (
              <tr key={nurse.id} style={{ borderBottom: "1px solid #f5f5f5", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#fafbff"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                {/* Nurse */}
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: avatarColors[i % avatarColors.length], display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>
                      {nurse.avatar}
                    </div>
                    <div>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: "#0a1f44" }}>{nurse.name}</p>
                      <p style={{ margin: 0, fontSize: 11, color: "#aaa" }}>{nurse.experience}</p>
                    </div>
                  </div>
                </td>
                {/* Emp ID */}
                <td style={{ padding: "14px 18px", fontSize: 13, color: "#555", fontWeight: 500 }}>{nurse.empId}</td>
                {/* Department */}
                <td style={{ padding: "14px 18px", fontSize: 13, color: "#555" }}>{nurse.department}</td>
                {/* Shift */}
                <td style={{ padding: "14px 18px" }}>
                  <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: shiftBg[nurse.shift], color: shiftColor[nurse.shift] }}>
                    {nurse.shift}
                  </span>
                </td>
                {/* Contact */}
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <span style={{ fontSize: 12, color: "#555", display: "flex", alignItems: "center", gap: 5 }}><FaPhoneAlt style={{ fontSize: 10, color: "#0057d9" }} />{nurse.phone}</span>
                    <span style={{ fontSize: 12, color: "#555", display: "flex", alignItems: "center", gap: 5 }}><FaEnvelope style={{ fontSize: 10, color: "#0057d9" }} />{nurse.email}</span>
                  </div>
                </td>
                {/* Status */}
                <td style={{ padding: "14px 18px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: statusColor[nurse.status] }}>
                    <FaCircle style={{ fontSize: 7 }} />{nurse.status}
                  </span>
                </td>
                {/* Actions */}
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => navigate(`/nurses/view/${nurse.id}`)} style={{ width: 32, height: 32, borderRadius: 8, border: "1.5px solid #e0e0e0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#0057d9" }}><FaEye style={{ fontSize: 13 }} /></button>
                    <button onClick={() => navigate(`/nurses/edit/${nurse.id}`)} style={{ width: 32, height: 32, borderRadius: 8, border: "1.5px solid #e0e0e0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#2a9d8f" }}><FaEdit style={{ fontSize: 13 }} /></button>
                    <button style={{ width: 32, height: 32, borderRadius: 8, border: "1.5px solid #ffe0e0", background: "#fff5f5", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#e63946" }}><FaTrashAlt style={{ fontSize: 13 }} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ padding: "60px 0", textAlign: "center", color: "#aaa" }}>
            <FaUserNurse style={{ fontSize: 40, marginBottom: 12, opacity: 0.3 }} />
            <p style={{ fontSize: 14 }}>No nurses found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNurses;