"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "@/services/api";
import { CircleNotch } from "@phosphor-icons/react";

const prescriptionSchema = z.object({
  patientName: z.string().min(2, "Patient name is required"),
  medication: z.string().min(2, "Medication name is required"),
  dosage: z.string().min(2, "Dosage is required (e.g. 10mg)"),
  frequency: z.string().min(2, "Frequency is required (e.g. Once daily)"),
  refills: z.number().min(0, "Refills cannot be negative"),
});

type PrescriptionFormValues = z.infer<typeof prescriptionSchema>;

interface PrescriptionFormProps {
  onSuccess?: () => void;
  defaultPatient?: string;
}

export default function PrescriptionForm({ onSuccess, defaultPatient = "" }: PrescriptionFormProps) {
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PrescriptionFormValues>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      patientName: defaultPatient,
      medication: "",
      dosage: "",
      frequency: "",
      refills: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: PrescriptionFormValues) => {
      return mockApi.createPrescription(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
      setSuccess(true);
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1500);
    },
  });

  const onSubmit = (data: PrescriptionFormValues) => {
    mutation.mutate(data);
  };

  if (success) {
    return (
      <div style={{ padding: 24, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--accent-glow)", color: "var(--accent)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>✓</div>
        <h3 className="heading-sm">Prescription Issued!</h3>
        <p className="text-sm text-muted">The prescription has been generated and logged.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Patient Name */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label className="text-sm">Patient Name</label>
        <input
          {...register("patientName")}
          type="text"
          className="input"
          placeholder="e.g. John Smith"
          style={{ width: "100%", borderColor: errors.patientName ? "var(--critical)" : "" }}
        />
        {errors.patientName && (
          <span style={{ color: "var(--critical)", fontSize: "0.75rem" }}>{errors.patientName.message}</span>
        )}
      </div>

      {/* Medication */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label className="text-sm">Medication Name</label>
        <input
          {...register("medication")}
          type="text"
          className="input"
          placeholder="e.g. Lisinopril"
          style={{ width: "100%", borderColor: errors.medication ? "var(--critical)" : "" }}
        />
        {errors.medication && (
          <span style={{ color: "var(--critical)", fontSize: "0.75rem" }}>{errors.medication.message}</span>
        )}
      </div>

      {/* Dosage & Frequency */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label className="text-sm">Dosage</label>
          <input
            {...register("dosage")}
            type="text"
            className="input"
            placeholder="e.g. 10mg"
            style={{ width: "100%", borderColor: errors.dosage ? "var(--critical)" : "" }}
          />
          {errors.dosage && (
            <span style={{ color: "var(--critical)", fontSize: "0.75rem" }}>{errors.dosage.message}</span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label className="text-sm">Frequency</label>
          <input
            {...register("frequency")}
            type="text"
            className="input"
            placeholder="e.g. Once daily"
            style={{ width: "100%", borderColor: errors.frequency ? "var(--critical)" : "" }}
          />
          {errors.frequency && (
            <span style={{ color: "var(--critical)", fontSize: "0.75rem" }}>{errors.frequency.message}</span>
          )}
        </div>
      </div>

      {/* Refills */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label className="text-sm">Authorized Refills</label>
        <input
          {...register("refills", { valueAsNumber: true })}
          type="number"
          className="input"
          style={{ width: "100%", borderColor: errors.refills ? "var(--critical)" : "" }}
        />
        {errors.refills && (
          <span style={{ color: "var(--critical)", fontSize: "0.75rem" }}>{errors.refills.message}</span>
        )}
      </div>

      {mutation.isError && (
        <div style={{ padding: 12, background: "var(--critical-glow)", color: "var(--critical)", borderRadius: 6, fontSize: "0.8125rem" }}>
          Failed to issue prescription. Please try again.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={mutation.isPending}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
      >
        {mutation.isPending ? (
          <>
            <CircleNotch size={18} className="animate-spin" />
            Generating...
          </>
        ) : (
          "Issue Prescription"
        )}
      </button>
    </form>
  );
}
