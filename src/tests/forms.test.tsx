import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookingForm from "@/components/forms/BookingForm";
import LoginForm from "@/components/forms/LoginForm";
import QueryProvider from "@/providers/QueryProvider";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(() => Promise.resolve({ error: null })),
  useSession: jest.fn(() => ({ data: null, status: "unauthenticated" })),
}));

describe("Forms Component Validation Tests", () => {
  test("LoginForm renders fields and validates empty inputs", async () => {
    render(
      <QueryProvider>
        <LoginForm onSuccess={jest.fn()} initialRole="patient" />
      </QueryProvider>
    );

    const emailInput = screen.getByPlaceholderText("name@company.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });

    const submitButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(submitButton);

    // Errors should appear for empty email
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  test("BookingForm displays validation errors for incorrect inputs", async () => {
    render(
      <QueryProvider>
        <BookingForm onSuccess={jest.fn()} />
      </QueryProvider>
    );

    const bookButton = screen.getByRole("button", { name: /book appointment/i });
    fireEvent.click(bookButton);

    await waitFor(() => {
      expect(screen.getByText(/please select a provider/i)).toBeInTheDocument();
    });
  });
});
