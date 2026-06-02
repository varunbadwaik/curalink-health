"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "@/services/api";
import { usePatientStore } from "@/store/patientStore";
import { CircleNotch } from "@phosphor-icons/react";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  dob: z.string().min(1, "Date of birth is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  bloodType: z.string().min(1, "Please select your blood type"),
  allergies: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  onSuccess?: () => void;
}

export default function ProfileForm({ onSuccess }: ProfileFormProps) {
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(false);
  const currentProfile = usePatientStore((state) => state.profile);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: currentProfile.name,
      dob: currentProfile.dob,
      phone: currentProfile.phone,
      bloodType: currentProfile.bloodType,
      allergies: currentProfile.allergies.join(", "),
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ProfileFormValues) => {
      const parsedAllergies = data.allergies
        ? data.allergies.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
      return mockApi.updatePatientProfile({
        name: data.name,
        dob: data.dob,
        phone: data.phone,
        bloodType: data.bloodType,
        allergies: parsedAllergies,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patientProfile"] });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        if (onSuccess) onSuccess();
      }, 1500);
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {success && (
        <div style={{ padding: 12, background: "var(--accent-glow)", color: "var(--accent)", borderRadius: 6, fontSize: "0.8125rem", border: "1px solid var(--accent)" }}>
          Profile updated successfully!
        </div>
      )}

      {/* Name */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label className="text-sm">Full Name</label>
        <input
          {...register("name")}
          type="text"
          className="input"
          placeholder="e.g. John Smith"
          style={{ width: "100%", borderColor: errors.name ? "var(--critical)" : "" }}
        />
        {errors.name && (
          <span style={{ color: "var(--critical)", fontSize: "0.75rem" }}>{errors.name.message}</span>
        )}
      </div>

      {/* Date of Birth & Phone */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label className="text-sm">Date of Birth</label>
          <input
            {...register("dob")}
            type="date"
            className="input"
            style={{ width: "100%", borderColor: errors.dob ? "var(--critical)" : "" }}
          />
          {errors.dob && (
            <span style={{ color: "var(--critical)", fontSize: "0.75rem" }}>{errors.dob.message}</span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label className="text-sm">Phone Number</label>
          <input
            {...register("phone")}
            type="text"
            className="input"
            placeholder="+1 (555) 000-0000"
            style={{ width: "100%", borderColor: errors.phone ? "var(--critical)" : "" }}
          />
          {errors.phone && (
            <span style={{ color: "var(--critical)", fontSize: "0.75rem" }}>{errors.phone.message}</span>
          )}
        </div>
      </div>

      {/* Blood Type */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label className="text-sm">Blood Type</label>
        <select
          {...register("bloodType")}
          className="input"
          style={{ width: "100%", borderColor: errors.bloodType ? "var(--critical)" : "" }}
        >
          <option value="">Choose blood type...</option>
          <option value="A-Positive">A-Positive (A+)</option>
          <option value="A-Negative">A-Negative (A-)</option>
          <option value="B-Positive">B-Positive (B+)</option>
          <option value="B-Negative">B-Negative (B-)</option>
          <option value="AB-Positive">AB-Positive (AB+)</option>
          <option value="AB-Negative">AB-Negative (AB-)</option>
          <option value="O-Positive">O-Positive (O+)</option>
          <option value="O-Negative">O-Negative (O-)</option>
        </select>
        {errors.bloodType && (
          <span style={{ color: "var(--critical)", fontSize: "0.75rem" }}>{errors.bloodType.message}</span>
        )}
      </div>

      {/* Allergies */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label className="text-sm">Allergies (comma-separated)</label>
        <input
          {...register("allergies")}
          type="text"
          className="input"
          placeholder="e.g. Penicillin, Peanuts"
          style={{ width: "100%" }}
        />
      </div>

      {mutation.isError && (
        <div style={{ padding: 12, background: "var(--critical-glow)", color: "var(--critical)", borderRadius: 6, fontSize: "0.8125rem" }}>
          Failed to save profile. Please try again.
        </div>
      )}

      {/* Save Button */}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={mutation.isPending}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
      >
        {mutation.isPending ? (
          <>
            <CircleNotch size={18} className="animate-spin" />
            Saving Profile...
          </>
        ) : (
          "Save Settings"
        )}
      </button>
    </form>
  );
}
