import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserNurse, FaArrowLeft, FaSave, FaPhoneAlt, FaEnvelope, FaIdBadge } from "react-icons/fa";
import { MdLocalHospital, MdWork, MdSchedule } from "react-icons/md";

const departments = ["ICU", "General", "Pediatrics", "Surgery", "Emergency", "Cardiology", "Neurology", "Orthopedics"];
const shifts      = ["Morning", "Evening", "Night"];
const statuses    = ["Active", "On Leave", "Inactive"];

const initialForm = {
  name: "", empId: "", phone: "", email: "", gender: "",
  department: "", shift: "", status: "Active",
  experience: "", qualification: "", address: "", joiningDate: "",
};

const AddNurses = () => {
  const navigate = useNavigate();
  const [form, setForm]     = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name)         e.name         = "Full name is required";
    if (!form.empId)        e.empId        = "Employee ID is required";
    if (!form.phone)        e.phone        = "Phone number is required";
    if (!form.email)        e.email        = "Email is required";
    if (!form.department)   e.department   = "Department is required";
    if (!form.shift)        e.shift        = "Shift is required";
    if (!form.gender)       e.gender       = "Gender is required";
    if (!form.qualification)e.qualification= "Qualification is required";
    if (!form.joiningDate)  e.joiningDate  = "Joining date is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    console.log("New Nurse:", form);
    alert("Nurse added successfully!");
    navigate("/nurses");
  };

  // ── Shared field styles ──
  const inputStyle = (field) => ({
    width: "100%", padding: "10px 14px", borderRadius: 10,
    border: `1.5px solid ${errors[field] ? "#e63946" : "#e8eaf0"}`,
    fontSize: 13, outline: "none", fontFamily: "'DM Sans', sans-serif",
    background: "#fafbff", boxSizing: "border-box",
  });

  const labelStyle = { fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: 0.8 };
  const errorStyle = { fontSize: 11, color: "#e63946", marginTop: 4 };
  const sectionTitle = (icon, text) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, paddingBottom: 10, borderBottom: "1.5px solid #f0f0f0" }}>
      <span style={{ fontSize: 16, color: "#0057d9" }}>{icon}</span>
      <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0a1f44" }}>{text}</h3>
    </div>
  );

  const Field = ({ label, field, children }) => (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
      {errors[field] && <p style={errorStyle}>{errors[field]}</p>}
    </div>
  );

  return (
    <div style={{ padding: "28px 32px", fontFamily: "'DM Sans', sans-serif", background: "#f6f8fc", minHeight: "100vh" }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <button
          onClick={() => navigate("/nurses")}
          style={{ width: 38, height: 38, borderRadius: 10, border: "1.5px solid #e0e0e0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#555" }}
        >
          <FaArrowLeft style={{ fontSize: 13 }} />
        </button>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <MdLocalHospital style={{ fontSize: 20, color: "#0057d9" }} />
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0a1f44", margin: 0 }}>Add New Nurse</h1>
          </div>
          <p style={{ fontSize: 13, color: "#888", margin: 0 }}>MediCare HMS — Register a new nursing staff member</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 900 }}>

        {/* ── Personal Info ── */}
        <div style={{ background: "#fff", borderRadius: 16, padding: "24px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          {sectionTitle(<FaUserNurse />, "Personal Information")}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            <Field label="Full Name *" field="name">
              <input style={inputStyle("name")} placeholder="e.g. Priya Sharma" value={form.name} onChange={e => handleChange("name", e.target.value)} />
            </Field>

            <Field label="Employee ID *" field="empId">
              <input style={inputStyle("empId")} placeholder="e.g. NRS-009" value={form.empId} onChange={e => handleChange("empId", e.target.value)} />
            </Field>

            <Field label="Gender *" field="gender">
              <div style={{ display: "flex", gap: 10 }}>
                {["Female", "Male", "Other"].map(g => (
                  <button key={g} onClick={() => handleChange("gender", g)}
                    style={{ flex: 1, padding: "9px", borderRadius: 10, border: `1.5px solid ${form.gender === g ? "#0057d9" : "#e8eaf0"}`, background: form.gender === g ? "#eef3ff" : "#fafafa", color: form.gender === g ? "#0057d9" : "#555", fontWeight: form.gender === g ? 700 : 400, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}
                  >{g}</button>
                ))}
              </div>
              {errors.gender && <p style={errorStyle}>{errors.gender}</p>}
            </Field>

            <Field label="Qualification *" field="qualification">
              <input style={inputStyle("qualification")} placeholder="e.g. B.Sc Nursing, GNM" value={form.qualification} onChange={e => handleChange("qualification", e.target.value)} />
            </Field>

            <Field label="Experience" field="experience">
              <input style={inputStyle("experience")} placeholder="e.g. 3 years" value={form.experience} onChange={e => handleChange("experience", e.target.value)} />
            </Field>

            <Field label="Joining Date *" field="joiningDate">
              <input style={inputStyle("joiningDate")} type="date" value={form.joiningDate} onChange={e => handleChange("joiningDate", e.target.value)} />
            </Field>

          </div>
        </div>

        {/* ── Right column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Contact */}
          <div style={{ background: "#fff", borderRadius: 16, padding: "24px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            {sectionTitle(<FaPhoneAlt />, "Contact Details")}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              <Field label="Phone Number *" field="phone">
                <input style={inputStyle("phone")} placeholder="e.g. 9876543210" value={form.phone} onChange={e => handleChange("phone", e.target.value)} />
              </Field>

              <Field label="Email Address *" field="email">
                <input style={inputStyle("email")} type="email" placeholder="e.g. priya@medicare.com" value={form.email} onChange={e => handleChange("email", e.target.value)} />
              </Field>

              <Field label="Address" field="address">
                <textarea style={{ ...inputStyle("address"), resize: "none", height: 72 }} placeholder="Residential address…" value={form.address} onChange={e => handleChange("address", e.target.value)} />
              </Field>

            </div>
          </div>

          {/* Work Details */}
          <div style={{ background: "#fff", borderRadius: 16, padding: "24px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            {sectionTitle(<MdWork />, "Work Details")}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              <Field label="Department *" field="department">
                <select style={{ ...inputStyle("department"), cursor: "pointer" }} value={form.department} onChange={e => handleChange("department", e.target.value)}>
                  <option value="">Select Department</option>
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </Field>

              <Field label="Shift *" field="shift">
                <div style={{ display: "flex", gap: 10 }}>
                  {shifts.map(sh => (
                    <button key={sh} onClick={() => handleChange("shift", sh)}
                      style={{ flex: 1, padding: "9px", borderRadius: 10, border: `1.5px solid ${form.shift === sh ? "#0057d9" : "#e8eaf0"}`, background: form.shift === sh ? "#eef3ff" : "#fafafa", color: form.shift === sh ? "#0057d9" : "#555", fontWeight: form.shift === sh ? 700 : 400, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}
                    >{sh}</button>
                  ))}
                </div>
                {errors.shift && <p style={errorStyle}>{errors.shift}</p>}
              </Field>

              <Field label="Status" field="status">
                <select style={{ ...inputStyle("status"), cursor: "pointer" }} value={form.status} onChange={e => handleChange("status", e.target.value)}>
                  {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>

            </div>
          </div>
        </div>
      </div>

      {/* ── Action Buttons ── */}
      <div style={{ display: "flex", gap: 12, marginTop: 24, maxWidth: 900 }}>
        <button
          onClick={() => navigate("/nurses")}
          style={{ padding: "11px 28px", borderRadius: 10, border: "1.5px solid #e0e0e0", background: "#fff", color: "#555", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 32px", borderRadius: 10, background: "linear-gradient(135deg,#0057d9,#0a2a6e)", color: "#fff", border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
        >
          <FaSave /> Save Nurse
        </button>
      </div>

    </div>
  );
};

export default AddNurses;