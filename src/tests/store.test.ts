import { useAppointmentStore } from "@/store/appointmentStore";
import { useDoctorStore } from "@/store/doctorStore";
import { usePatientStore } from "@/store/patientStore";

describe("Zustand Stores Unit Tests", () => {
  beforeEach(() => {
    // Reset stores to initial states before each test if required
  });

  test("Appointment store adds a new appointment correctly", () => {
    const initialCount = useAppointmentStore.getState().appointments.length;
    
    useAppointmentStore.getState().addAppointment({
      id: "APT-TEST",
      doctorName: "Dr. Test",
      specialty: "General Medicine",
      date: "2026-06-10",
      time: "10:00 AM",
      type: "In-Person",
      status: "Confirmed",
    });

    const appointments = useAppointmentStore.getState().appointments;
    expect(appointments.length).toBe(initialCount + 1);
    expect(appointments[0].id).toBe("APT-TEST");
  });

  test("Doctor store updates patient queue status correctly", () => {
    const testPatientId = "PAT-001";
    useDoctorStore.getState().updateQueueStatus(testPatientId, "completed");
    
    const patient = useDoctorStore.getState().patientQueue.find(p => p.id === testPatientId);
    expect(patient?.status).toBe("completed");
  });

  test("Patient store updates profile information correctly", () => {
    usePatientStore.getState().updateProfile({ name: "Jane Smith", phone: "+1 (555) 000-0000" });
    
    const profile = usePatientStore.getState().profile;
    expect(profile.name).toBe("Jane Smith");
    expect(profile.phone).toBe("+1 (555) 000-0000");
  });
});
