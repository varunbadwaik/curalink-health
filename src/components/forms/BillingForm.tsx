"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CircleNotch, CreditCard } from "@phosphor-icons/react";

const billingSchema = z.object({
  cardholderName: z.string().min(3, "Cardholder name is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be exactly 16 digits"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
  amount: z.number().min(1, "Amount must be at least $1"),
});

type BillingFormValues = z.infer<typeof billingSchema>;

interface BillingFormProps {
  onSuccess?: () => void;
  defaultAmount?: number;
}

export default function BillingForm({ onSuccess, defaultAmount = 150 }: BillingFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BillingFormValues>({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      amount: defaultAmount,
    },
  });

  const onSubmit = async (data: BillingFormValues) => {
    setLoading(true);
    setError(null);

    // Simulate payment transaction
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1500);
    }, 1500);
  };

  if (success) {
    return (
      <div style={{ padding: 24, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--accent-glow)", color: "var(--accent)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>✓</div>
        <h3 className="heading-sm">Payment Successful!</h3>
        <p className="text-sm text-muted">Your payment transaction was processed and completed.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Cardholder Name */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label className="text-sm">Cardholder Name</label>
        <input
          {...register("cardholderName")}
          type="text"
          className="input"
          placeholder="e.g. John Smith"
          style={{ width: "100%", borderColor: errors.cardholderName ? "var(--critical)" : "" }}
        />
        {errors.cardholderName && (
          <span style={{ color: "var(--critical)", fontSize: "0.75rem" }}>{errors.cardholderName.message}</span>
        )}
      </div>

      {/* Card Number */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label className="text-sm" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <CreditCard size={14} /> Card Number
        </label>
        <input
          {...register("cardNumber")}
          type="text"
          className="input"
          placeholder="1234567812345678"
          maxLength={16}
          style={{ width: "100%", borderColor: errors.cardNumber ? "var(--critical)" : "" }}
        />
        {errors.cardNumber && (
          <span style={{ color: "var(--critical)", fontSize: "0.75rem" }}>{errors.cardNumber.message}</span>
        )}
      </div>

      {/* Expiry & CVC */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label className="text-sm">Expiry Date</label>
          <input
            {...register("expiryDate")}
            type="text"
            className="input"
            placeholder="MM/YY"
            maxLength={5}
            style={{ width: "100%", borderColor: errors.expiryDate ? "var(--critical)" : "" }}
          />
          {errors.expiryDate && (
            <span style={{ color: "var(--critical)", fontSize: "0.75rem" }}>{errors.expiryDate.message}</span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label className="text-sm">Security Code (CVC)</label>
          <input
            {...register("cvc")}
            type="password"
            className="input"
            placeholder="•••"
            maxLength={4}
            style={{ width: "100%", borderColor: errors.cvc ? "var(--critical)" : "" }}
          />
          {errors.cvc && (
            <span style={{ color: "var(--critical)", fontSize: "0.75rem" }}>{errors.cvc.message}</span>
          )}
        </div>
      </div>

      {/* Amount */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label className="text-sm">Payment Amount ($)</label>
        <input
          {...register("amount", { valueAsNumber: true })}
          type="number"
          className="input"
          style={{ width: "100%", borderColor: errors.amount ? "var(--critical)" : "" }}
        />
        {errors.amount && (
          <span style={{ color: "var(--critical)", fontSize: "0.75rem" }}>{errors.amount.message}</span>
        )}
      </div>

      {error && (
        <div style={{ padding: 12, background: "var(--critical-glow)", color: "var(--critical)", borderRadius: 6, fontSize: "0.8125rem" }}>
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
      >
        {loading ? (
          <>
            <CircleNotch size={18} className="animate-spin" />
            Processing Transaction...
          </>
        ) : (
          `Pay $${watch("amount") || 0}`
        )}
      </button>
    </form>
  );
}
