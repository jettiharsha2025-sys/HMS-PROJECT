import { useState } from "react"
import {
  Hospital,
  Bell,
  UserCircle,
  Settings,
  Lock,
  LogOut,
  ChevronDown,
} from "lucide-react"

const Navbar = () => {

  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      height: "100%",
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e5e7eb",
    }}>

      {/* Left — Branding */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "10px",
          backgroundColor: "#2563eb", display: "flex",
          alignItems: "center", justifyContent: "center",
        }}>
          <Hospital size={20} color="#ffffff" />
        </div>
        <div>
          <div style={{ fontSize: "15px", fontWeight: "700", color: "#1e3a5f", lineHeight: 1.2 }}>
            MediCare HMS
          </div>
          <div style={{ fontSize: "11px", color: "#9ca3af" }}>
            Hospital Management System
          </div>
        </div>
      </div>

      {/* Center — Quick Stats */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#2563eb" }}>24</div>
          <div style={{ fontSize: "11px", color: "#9ca3af" }}>Today's OPD</div>
        </div>

        <div style={{ width: "1px", height: "28px", backgroundColor: "#e5e7eb" }} />

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#16a34a" }}>6</div>
          <div style={{ fontSize: "11px", color: "#9ca3af" }}>Surgeries</div>
        </div>

        <div style={{ width: "1px", height: "28px", backgroundColor: "#e5e7eb" }} />

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#dc2626" }}>3</div>
          <div style={{ fontSize: "11px", color: "#9ca3af" }}>Emergency</div>
        </div>

      </div>

      {/* Right — Notifications + User */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>

        {/* Notification Bell */}
        <div style={{ position: "relative", cursor: "pointer" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            backgroundColor: "#f3f4f6", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <Bell size={18} color="#6b7280" />
          </div>
          <div style={{
            position: "absolute", top: "-4px", right: "-4px",
            width: "16px", height: "16px", borderRadius: "50%",
            backgroundColor: "#dc2626", color: "#fff",
            fontSize: "10px", fontWeight: "700",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            5
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: "1px", height: "28px", backgroundColor: "#e5e7eb" }} />

        {/* User Profile */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", position: "relative" }}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%",
            backgroundColor: "#dbeafe", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: "14px", fontWeight: "700", color: "#2563eb"
          }}>
            AD
          </div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#1f2937" }}>Dr. Admin</div>
            <div style={{ fontSize: "11px", color: "#9ca3af" }}>Super Admin</div>
          </div>
          <ChevronDown size={14} color="#9ca3af" />

          {/* Dropdown */}
          {showDropdown && (
            <div style={{
              position: "absolute", top: "48px", right: "0",
              backgroundColor: "#fff", border: "1px solid #e5e7eb",
              borderRadius: "10px", padding: "8px",
              minWidth: "160px", zIndex: 100,
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
            }}>
              {[
                { icon: <UserCircle size={15} color="#374151" />, label: "My Profile" },
                { icon: <Settings size={15} color="#374151" />, label: "Settings" },
                { icon: <Lock size={15} color="#374151" />, label: "Change Password" },
              ].map((item) => (
                <div key={item.label} style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "8px 12px", borderRadius: "8px", cursor: "pointer",
                  fontSize: "13px", color: "#374151",
                }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f3f4f6"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  {item.icon} {item.label}
                </div>
              ))}
              <div style={{ borderTop: "1px solid #e5e7eb", margin: "6px 0" }} />
              <div style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "8px 12px", borderRadius: "8px", cursor: "pointer",
                fontSize: "13px", color: "#dc2626",
              }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#fef2f2"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <LogOut size={15} color="#dc2626" /> Logout
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Navbar