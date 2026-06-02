import { useAppointmentStore, Appointment } from "@/store/appointmentStore";
import { useDoctorStore, Prescription, QueuePatient, ScheduleSlot } from "@/store/doctorStore";
import { usePatientStore, PatientProfile } from "@/store/patientStore";
import { useDashboardStore } from "@/store/dashboardStore";

// Simulate network latency helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  // --- Appointments ---
  getAppointments: async (): Promise<Appointment[]> => {
    await delay(600);
    return useAppointmentStore.getState().appointments;
  },

  createAppointment: async (appointment: Omit<Appointment, "id" | "status">): Promise<Appointment> => {
    await delay(800);
    const newApt: Appointment = {
      ...appointment,
      id: `APT-${Math.floor(100 + Math.random() * 900)}`,
      status: "Pending",
    };
    useAppointmentStore.getState().addAppointment(newApt);
    return newApt;
  },

  updateAppointmentStatus: async (id: string, status: Appointment["status"]): Promise<void> => {
    await delay(400);
    useAppointmentStore.getState().updateAppointmentStatus(id, status);
  },

  // --- Prescriptions ---
  getPrescriptions: async (): Promise<Prescription[]> => {
    await delay(500);
    return useDoctorStore.getState().prescriptions;
  },

  createPrescription: async (rx: Omit<Prescription, "id" | "date" | "status">): Promise<Prescription> => {
    await delay(700);
    const newRx: Prescription = {
      ...rx,
      id: `RX-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      status: "Active",
    };
    useDoctorStore.getState().addPrescription(newRx);
    return newRx;
  },

  // --- Patient Profile ---
  getPatientProfile: async (): Promise<PatientProfile> => {
    await delay(500);
    return usePatientStore.getState().profile;
  },

  updatePatientProfile: async (profile: Partial<PatientProfile>): Promise<PatientProfile> => {
    await delay(750);
    usePatientStore.getState().updateProfile(profile);
    return usePatientStore.getState().profile;
  },

  // --- Patient Queue ---
  getQueue: async (): Promise<QueuePatient[]> => {
    await delay(600);
    return useDoctorStore.getState().patientQueue;
  },

  updateQueueStatus: async (id: string, status: QueuePatient["status"]): Promise<void> => {
    await delay(400);
    useDoctorStore.getState().updateQueueStatus(id, status);
  },

  // --- Medications ---
  getMedications: async () => {
    await delay(500);
    return usePatientStore.getState().medications;
  },

  // --- Lab Results ---
  getLabs: async () => {
    await delay(600);
    return usePatientStore.getState().recentLabs;
  },

  // --- Care Plan Tasks ---
  getCarePlanTasks: async () => {
    await delay(400);
    return usePatientStore.getState().carePlanTasks;
  },

  toggleCarePlanTask: async (id: string) => {
    await delay(300);
    usePatientStore.getState().toggleCarePlanTask(id);
  },

  // --- AI Insights ---
  getAIInsights: async () => {
    await delay(400);
    return usePatientStore.getState().aiInsights;
  },

  // --- Doctor AI Alerts ---
  getDoctorAlerts: async () => {
    await delay(500);
    return useDoctorStore.getState().aiAlerts;
  },

  dismissDoctorAlert: async (patientName: string) => {
    await delay(300);
    useDoctorStore.getState().dismissAlert(patientName);
  },

  // --- Doctor Schedule ---
  getDoctorSchedule: async () => {
    await delay(500);
    return useDoctorStore.getState().todaySchedule;
  },

  updateDoctorScheduleStatus: async (id: string, status: ScheduleSlot["status"]) => {
    await delay(400);
    useDoctorStore.getState().updateScheduleStatus(id, status);
  },

  // --- Doctor Metrics ---
  getDoctorMetrics: async () => {
    await delay(400);
    return useDoctorStore.getState().performanceMetrics;
  },

  // --- Admin/Org Metrics ---
  getOrgMetrics: async () => {
    await delay(450);
    return useDashboardStore.getState().orgMetrics;
  },

  // --- Admin/System Health ---
  getSystemHealth: async () => {
    await delay(500);
    return useDashboardStore.getState().systemHealth;
  },

  updateSystemServiceStatus: async (serviceName: string, status: any, latency: string) => {
    await delay(400);
    useDashboardStore.getState().updateSystemServiceStatus(serviceName, status, latency);
  },

  // --- Admin/Recent Users ---
  getRecentUsers: async () => {
    await delay(550);
    return useDashboardStore.getState().recentUsers;
  },

  // --- Admin/Compliance ---
  getComplianceItems: async () => {
    await delay(500);
    return useDashboardStore.getState().complianceItems;
  },

  completeComplianceItem: async (id: string) => {
    await delay(400);
    useDashboardStore.getState().completeComplianceItem(id);
  },

  // --- Admin/Department Performance ---
  getDepartmentPerf: async () => {
    await delay(600);
    return useDashboardStore.getState().departmentPerf;
  },
};

