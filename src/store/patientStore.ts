import { create } from "zustand";

export interface VitalRecord {
  date: string;
  heartRate: number;
  bloodPressure: string;
  weight: number;
}

export interface PatientProfile {
  name: string;
  email: string;
  dob: string;
  phone: string;
  bloodType: string;
  allergies: string[];
  conditions: string[];
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  adherence: number;
  nextDose: string;
}

export interface LabResult {
  test: string;
  value: string;
  status: string;
  date: string;
  trend: string;
}

export interface CarePlanTask {
  id: string;
  task: string;
  completed: boolean;
}

export interface AIInsight {
  type: string;
  title: string;
  message: string;
}

interface PatientState {
  profile: PatientProfile;
  vitalsHistory: VitalRecord[];
  medications: Medication[];
  recentLabs: LabResult[];
  carePlanTasks: CarePlanTask[];
  aiInsights: AIInsight[];
  updateProfile: (profile: Partial<PatientProfile>) => void;
  addVitalRecord: (record: VitalRecord) => void;
  toggleCarePlanTask: (id: string) => void;
}

const initialProfile: PatientProfile = {
  name: "John Smith",
  email: "patient@curalink.health",
  dob: "1988-11-24",
  phone: "+1 (555) 234-5678",
  bloodType: "O-Positive",
  allergies: ["Penicillin", "Peanuts"],
  conditions: ["Mild Hypertension", "Seasonal Allergies"],
};

const initialVitals: VitalRecord[] = [
  { date: "Jan", heartRate: 72, bloodPressure: "135/85", weight: 182 },
  { date: "Feb", heartRate: 74, bloodPressure: "130/82", weight: 180 },
  { date: "Mar", heartRate: 70, bloodPressure: "128/80", weight: 179 },
  { date: "Apr", heartRate: 68, bloodPressure: "125/78", weight: 178 },
  { date: "May", heartRate: 71, bloodPressure: "124/79", weight: 177 },
];

const initialMedications: Medication[] = [
  { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", adherence: 95, nextDose: "8:00 PM Today" },
  { name: "Metformin", dosage: "500mg", frequency: "Twice daily", adherence: 88, nextDose: "9:00 PM Today" },
  { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", adherence: 92, nextDose: "10:00 PM Today" },
];

const initialLabs: LabResult[] = [
  { test: "HbA1c", value: "6.8%", status: "borderline", date: "Apr 10, 2026", trend: "down" },
  { test: "Blood Pressure", value: "128/82", status: "normal", date: "Apr 15, 2026", trend: "stable" },
  { test: "Cholesterol (LDL)", value: "115 mg/dL", status: "normal", date: "Apr 10, 2026", trend: "down" },
  { test: "eGFR", value: "78 mL/min", status: "normal", date: "Apr 10, 2026", trend: "stable" },
];

const initialTasks: CarePlanTask[] = [
  { id: "task-1", task: "30-min walk", completed: true },
  { id: "task-2", task: "Blood sugar check", completed: true },
  { id: "task-3", task: "Take medications", completed: false },
  { id: "task-4", task: "Log meal diary", completed: false },
  { id: "task-5", task: "Meditation (10 min)", completed: false },
];

const initialInsights: AIInsight[] = [
  { type: "success", title: "Medication Adherence", message: "Your adherence is 92% this month — great job! Keep it up." },
  { type: "warning", title: "HbA1c Trending", message: "Your HbA1c has dropped from 7.2% to 6.8%. Continue your dietary changes." },
  { type: "info", title: "Exercise Reminder", message: "You've completed 4/5 walks this week. One more to hit your goal!" },
];

export const usePatientStore = create<PatientState>((set) => ({
  profile: initialProfile,
  vitalsHistory: initialVitals,
  medications: initialMedications,
  recentLabs: initialLabs,
  carePlanTasks: initialTasks,
  aiInsights: initialInsights,
  updateProfile: (profile) => set((state) => ({ profile: { ...state.profile, ...profile } })),
  addVitalRecord: (record) => set((state) => ({ vitalsHistory: [...state.vitalsHistory, record] })),
  toggleCarePlanTask: (id) => set((state) => ({
    carePlanTasks: state.carePlanTasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
  })),
}));

