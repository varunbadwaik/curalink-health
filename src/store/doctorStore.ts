import { create } from "zustand";

export interface Prescription {
  id: string;
  patientName: string;
  medication: string;
  dosage: string;
  frequency: string;
  refills: number;
  date: string;
  status: "Active" | "Expired" | "Pending";
}

export interface QueuePatient {
  id: string;
  name: string;
  age: number;
  reason: string;
  time: string;
  status: "waiting" | "in-progress" | "completed";
  risk: "low" | "medium" | "high";
}

export interface AIAlert {
  severity: string;
  patient: string;
  message: string;
  time: string;
}

export interface ScheduleSlot {
  id: string;
  time: string;
  patient: string;
  type: string;
  status: "completed" | "in-progress" | "upcoming";
}

export interface DoctorMetric {
  label: string;
  value: string;
  change: string;
}

interface DoctorState {
  prescriptions: Prescription[];
  patientQueue: QueuePatient[];
  aiAlerts: AIAlert[];
  todaySchedule: ScheduleSlot[];
  performanceMetrics: DoctorMetric[];
  addPrescription: (prescription: Prescription) => void;
  updateQueueStatus: (id: string, status: QueuePatient["status"]) => void;
  setQueue: (queue: QueuePatient[]) => void;
  updateScheduleStatus: (id: string, status: ScheduleSlot["status"]) => void;
  dismissAlert: (patientName: string) => void;
}

const initialPrescriptions: Prescription[] = [
  { id: "RX-9920", patientName: "John Smith", medication: "Lisinopril", dosage: "10mg", frequency: "Once daily", refills: 3, date: "2026-05-12", status: "Active" },
  { id: "RX-9921", patientName: "Marcus Vance", medication: "Metformin", dosage: "500mg", frequency: "Twice daily", refills: 2, date: "2026-05-20", status: "Active" },
  { id: "RX-9922", patientName: "Sarah Connor", medication: "Albuterol Inhaler", dosage: "90mcg", frequency: "As needed", refills: 1, date: "2026-06-01", status: "Active" },
];

const initialQueue: QueuePatient[] = [
  { id: "PAT-001", name: "David Miller", age: 45, reason: "Chest Pain & Shortness of Breath", time: "10:15 AM", status: "waiting", risk: "high" },
  { id: "PAT-002", name: "Sarah Connor", age: 32, reason: "Severe Migraine & Nausea", time: "10:30 AM", status: "waiting", risk: "medium" },
  { id: "PAT-003", name: "Robert Downey", age: 58, reason: "Post-Op Cardiovascular Checkup", time: "10:45 AM", status: "in-progress", risk: "low" },
  { id: "PAT-004", name: "Grace Hopper", age: 79, reason: "Chronic Joint Pain & Swelling", time: "11:15 AM", status: "waiting", risk: "medium" },
];

const initialAlerts: AIAlert[] = [
  { severity: "critical", patient: "Robert Chang", message: "SpO2 dropped to 89% — oxygen saturation below safe threshold. Immediate assessment recommended.", time: "2 min ago" },
  { severity: "warning", patient: "Maria Rodriguez", message: "BP readings consistently >150/95 over past 3 days. Consider medication adjustment.", time: "15 min ago" },
  { severity: "info", patient: "James Wilson", message: "Post-op day 5 — wound healing markers within normal range. Discharge criteria may be met.", time: "1 hr ago" },
];

const initialSchedule: ScheduleSlot[] = [
  { id: "sc-1", time: "9:00–9:30", patient: "Maria Rodriguez", type: "Follow-up", status: "completed" },
  { id: "sc-2", time: "9:45–10:15", patient: "James Wilson", type: "Post-Op Check", status: "in-progress" },
  { id: "sc-3", time: "10:30–11:00", patient: "Aisha Khan", type: "Prenatal", status: "upcoming" },
  { id: "sc-4", time: "11:15–11:45", patient: "Robert Chang", type: "Urgent", status: "upcoming" },
  { id: "sc-5", time: "1:00–1:30", patient: "Elena Vasquez", type: "Telehealth", status: "upcoming" },
  { id: "sc-6", time: "2:00–2:30", patient: "John Smith", type: "Annual Physical", status: "upcoming" },
];

const initialMetrics: DoctorMetric[] = [
  { label: "Patients Today", value: "18", change: "+3" },
  { label: "Avg Wait Time", value: "14m", change: "-2m" },
  { label: "Care Plans Active", value: "42", change: "+5" },
  { label: "AI Alerts", value: "5", change: "+2" },
];

export const useDoctorStore = create<DoctorState>((set) => ({
  prescriptions: initialPrescriptions,
  patientQueue: initialQueue,
  aiAlerts: initialAlerts,
  todaySchedule: initialSchedule,
  performanceMetrics: initialMetrics,
  addPrescription: (prescription) => set((state) => ({ prescriptions: [prescription, ...state.prescriptions] })),
  updateQueueStatus: (id, status) => set((state) => ({
    patientQueue: state.patientQueue.map((pat) => pat.id === id ? { ...pat, status } : pat)
  })),
  setQueue: (patientQueue) => set({ patientQueue }),
  updateScheduleStatus: (id, status) => set((state) => ({
    todaySchedule: state.todaySchedule.map((slot) => slot.id === id ? { ...slot, status } : slot)
  })),
  dismissAlert: (patientName) => set((state) => ({
    aiAlerts: state.aiAlerts.filter((a) => a.patient !== patientName)
  })),
}));

