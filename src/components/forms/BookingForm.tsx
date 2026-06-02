"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "@/services/api";
import { CircleNotch, Calendar, Clock, Note } from "@phosphor-icons/react";
import { sanitizeString } from "@/utils/sanitize";

const bookingSchema = z.object({
  doctorName: z.string().min(2, "Please select a provider"),
  specialty: z.string().min(2, "Specialty is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  type: z.enum(["In-Person", "Telehealth"]),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  onSuccess?: () => void;
}

const doctorsList = [
  { name: "Dr. Sarah Chen", specialty: "Cardiology" },
  { name: "Dr. Mike Torres", specialty: "General Practice" },
  { name: "Dr. Lisa Wong", specialty: "Pediatrics" },
  { name: "Dr. James Park", specialty: "Oncology" },
];

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      doctorName: "",
      specialty: "",
      date: "",
      time: "",
      type: "In-Person",
      notes: "",
    },
  });

  const selectedDoctor = watch("doctorName");

  // Automatically update specialty when doctor is selected
  React.useEffect(() => {
    const doc = doctorsList.find((d) => d.name === selectedDoctor);
    if (doc) {
      setValue("specialty", doc.specialty);
    }
  }, [selectedDoctor, setValue]);

  const mutation = useMutation({
    mutationFn: (data: BookingFormValues) => {
      return mockApi.createAppointment({
        patientName: "John Smith",
        doctorName: data.doctorName,
        specialty: data.specialty,
        date: data.date,
        time: data.time,
        type: data.type,
        notes: data.notes ? sanitizeString(data.notes) : "",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setSuccess(true);
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1500);
    },
  });

  const onSubmit = (data: BookingFormValues) => {
    mutation.mutate(data);
  };

  if (success) {
    return (
      <div style={{ padding: 24, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--accent-glow)", color: "var(--accent)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>✓</div>
        <h3 className="heading-sm">Appointment Booked!</h3>
        <p className="text-sm text-muted">Your booking request has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Provider Selector */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label className="text-sm">Select Doctor</label>
        <select
          {...register("doctorName")}
          className="input"
          style={{ width: "100%", borderColor: errors.doctorName ? "var(--critical)" : "" }}
        >
          <option value="">Choose a doctor...</option>
          {doctorsList.map((doc) => (
            <option key={doc.name} value={doc.name}>
              {doc.name} ({doc.specialty})
            </option>
          ))}
        </select>
        {errors.doctorName && (
          <span style={{ color: "var(--critical)", fontSize: "0.75rem" }}>{errors.doctorName.message}</span>
        )}
      </div>

      {/* Date & Time */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label className="text-sm" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Calendar size={14} /> Date
          </label>
          <input
            {...register("date")}
            type="date"
            className="input"
            style={{ width: "100%", borderColor: errors.date ? "var(--critical)" : "" }}
          />
          {errors.date && (
            <span style={{ color: "var(--critical)", fontSize: "0.75rem" }}>{errors.date.message}</span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label className="text-sm" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Clock size={14} /> Time
          </label>
          <select
            {...register("time")}
            className="input"
            style={{ width: "100%", borderColor: errors.time ? "var(--critical)" : "" }}
          >
            <option value="">Select time...</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="01:30 PM">01:30 PM</option>
            <option value="02:30 PM">02:30 PM</option>
            <option value="03:30 PM">03:30 PM</option>
          </select>
          {errors.time && (
            <span style={{ color: "var(--critical)", fontSize: "0.75rem" }}>{errors.time.message}</span>
          )}
        </div>
      </div>

      {/* Appointment Type */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label className="text-sm">Visit Type</label>
        <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: "0.875rem" }}>
            <input {...register("type")} type="radio" value="In-Person" /> In-Person Visit
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: "0.875rem" }}>
            <input {...register("type")} type="radio" value="Telehealth" /> Virtual (Telehealth)
          </label>
        </div>
      </div>

      {/* Notes */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label className="text-sm" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <Note size={14} /> Symptom Notes
        </label>
        <textarea
          {...register("notes")}
          className="input"
          placeholder="Briefly describe the reason for your visit..."
          style={{ width: "100%", height: 80, resize: "none" }}
        />
      </div>

      {mutation.isError && (
        <div style={{ padding: 12, background: "var(--critical-glow)", color: "var(--critical)", borderRadius: 6, fontSize: "0.8125rem" }}>
          Failed to book appointment. Please try again.
        </div>
      )}

      {/* Action Buttons */}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={mutation.isPending}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
      >
        {mutation.isPending ? (
          <>
            <CircleNotch size={18} className="animate-spin" />
            Booking...
          </>
        ) : (
          "Book Appointment"
        )}
      </button>
    </form>
  );
}
