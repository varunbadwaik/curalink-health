import { create } from "zustand";

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  type: "In-Person" | "Telehealth";
  notes?: string;
}

interface AppointmentState {
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointmentStatus: (id: string, status: Appointment["status"]) => void;
}

const initialAppointments: Appointment[] = [
  { id: "APT-101", patientName: "John Smith", doctorName: "Dr. Sarah Chen", specialty: "Cardiology", date: "2026-06-10", time: "10:00 AM", status: "Confirmed", type: "In-Person", notes: "Routine follow-up for high blood pressure." },
  { id: "APT-102", patientName: "John Smith", doctorName: "Dr. Sarah Chen", specialty: "Cardiology", date: "2026-05-12", time: "02:30 PM", status: "Completed", type: "Telehealth", notes: "Medication adjustment check-in." },
  { id: "APT-103", patientName: "John Smith", doctorName: "Dr. Mike Torres", specialty: "General Practice", date: "2026-06-15", time: "11:30 AM", status: "Pending", type: "In-Person" },
];

export const useAppointmentStore = create<AppointmentState>((set) => ({
  appointments: initialAppointments,
  setAppointments: (appointments) => set({ appointments }),
  addAppointment: (appointment) => set((state) => ({ appointments: [appointment, ...state.appointments] })),
  updateAppointmentStatus: (id, status) => set((state) => ({
    appointments: state.appointments.map((apt) => apt.id === id ? { ...apt, status } : apt)
  })),
}));
