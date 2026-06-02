import { create } from "zustand";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "warning" | "success" | "critical";
}

export interface OrgMetric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  color: string;
}

export interface SystemService {
  service: string;
  status: "operational" | "degraded" | "down";
  uptime: string;
  latency: string;
}

export interface UserActivity {
  name: string;
  role: string;
  department: string;
  status: "active" | "inactive";
  lastActive: string;
}

export interface ComplianceItem {
  id: string;
  title: string;
  due: string;
  status: "completed" | "pending" | "in-progress";
  priority: "high" | "medium" | "low";
}

export interface DeptPerformance {
  dept: string;
  patients: number;
  satisfaction: number;
  revenue: string;
  efficiency: number;
}

interface DashboardState {
  sidebarOpen: boolean;
  theme: "light" | "dark";
  notifications: NotificationItem[];
  orgMetrics: OrgMetric[];
  systemHealth: SystemService[];
  recentUsers: UserActivity[];
  complianceItems: ComplianceItem[];
  departmentPerf: DeptPerformance[];
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleTheme: () => void;
  markNotificationRead: (id: string) => void;
  addNotification: (notification: NotificationItem) => void;
  updateSystemServiceStatus: (serviceName: string, status: SystemService["status"], latency: string) => void;
  completeComplianceItem: (id: string) => void;
}

const initialNotifications: NotificationItem[] = [
  { id: "nt-1", title: "New Appointment", message: "Your appointment with Dr. Chen is confirmed.", time: "10 mins ago", read: false, type: "success" },
  { id: "nt-2", title: "Prescription Refill", message: "Your Lisinopril refill request has been approved.", time: "2 hrs ago", read: false, type: "info" },
  { id: "nt-3", title: "Lab Results Ready", message: "Blood Work Panel results are now available to view.", time: "1 day ago", read: true, type: "info" },
];

const initialMetrics: OrgMetric[] = [
  { label: "Total Patients", value: "12,847", change: "+342", trend: "up", color: "var(--primary)" },
  { label: "Active Providers", value: "186", change: "+8", trend: "up", color: "var(--accent)" },
  { label: "Appointments Today", value: "847", change: "+12%", trend: "up", color: "var(--purple)" },
  { label: "Revenue (MTD)", value: "$2.4M", change: "+18%", trend: "up", color: "var(--warning)" },
  { label: "Bed Occupancy", value: "87%", change: "+3%", trend: "up", color: "var(--critical)" },
  { label: "Avg Wait Time", value: "14 min", change: "-2 min", trend: "down", color: "var(--accent)" },
];

const initialHealth: SystemService[] = [
  { service: "API Gateway", status: "operational", uptime: "99.99%", latency: "45ms" },
  { service: "Database Cluster", status: "operational", uptime: "99.97%", latency: "12ms" },
  { service: "AI Engine", status: "operational", uptime: "99.95%", latency: "180ms" },
  { service: "FHIR Gateway", status: "degraded", uptime: "99.2%", latency: "340ms" },
  { service: "Notification Service", status: "operational", uptime: "99.98%", latency: "28ms" },
  { service: "File Storage (S3)", status: "operational", uptime: "99.99%", latency: "65ms" },
];

const initialUsers: UserActivity[] = [
  { name: "Dr. James Park", role: "Physician", department: "Oncology", status: "active", lastActive: "5 min ago" },
  { name: "Sarah Miller, RN", role: "Nurse", department: "ICU", status: "active", lastActive: "12 min ago" },
  { name: "Admin: Tom Hayes", role: "Admin", department: "Operations", status: "active", lastActive: "1 hr ago" },
  { name: "Dr. Lisa Wong", role: "Physician", department: "Pediatrics", status: "inactive", lastActive: "2 days ago" },
  { name: "Mark Johnson", role: "Technician", department: "Radiology", status: "active", lastActive: "30 min ago" },
];

const initialCompliance: ComplianceItem[] = [
  { id: "comp-1", title: "HIPAA Audit Log Review", due: "Apr 20, 2026", status: "pending", priority: "high" },
  { id: "comp-2", title: "Staff Security Training", due: "Apr 25, 2026", status: "in-progress", priority: "medium" },
  { id: "comp-3", title: "Data Backup Verification", due: "Apr 18, 2026", status: "completed", priority: "high" },
  { id: "comp-4", title: "Access Control Review", due: "May 1, 2026", status: "pending", priority: "low" },
];

const initialDeptPerf: DeptPerformance[] = [
  { dept: "Cardiology", patients: 2340, satisfaction: 94, revenue: "$420K", efficiency: 91 },
  { dept: "Oncology", patients: 1870, satisfaction: 96, revenue: "$580K", efficiency: 88 },
  { dept: "Pediatrics", patients: 3120, satisfaction: 92, revenue: "$310K", efficiency: 93 },
  { dept: "Emergency", patients: 4560, satisfaction: 87, revenue: "$890K", efficiency: 78 },
  { dept: "Orthopedics", patients: 1540, satisfaction: 91, revenue: "$360K", efficiency: 85 },
];

export const useDashboardStore = create<DashboardState>((set) => ({
  sidebarOpen: true,
  theme: "light",
  notifications: initialNotifications,
  orgMetrics: initialMetrics,
  systemHealth: initialHealth,
  recentUsers: initialUsers,
  complianceItems: initialCompliance,
  departmentPerf: initialDeptPerf,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) => n.id === id ? { ...n, read: true } : n)
  })),
  addNotification: (n) => set((state) => ({ notifications: [n, ...state.notifications] })),
  updateSystemServiceStatus: (service, status, latency) => set((state) => ({
    systemHealth: state.systemHealth.map((s) => s.service === service ? { ...s, status, latency } : s)
  })),
  completeComplianceItem: (id) => set((state) => ({
    complianceItems: state.complianceItems.map((c) => c.id === id ? { ...c, status: "completed" } : c)
  })),
}));

