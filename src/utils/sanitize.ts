/**
 * Escapes special HTML characters to prevent XSS (Cross-Site Scripting) attacks
 * when rendering raw user inputs.
 */
export function sanitizeString(val: string): string {
  if (typeof val !== "string") return val;
  return val
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Sanitizes an entire object's string values (deep traversal or shallow)
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const result = { ...obj };
  for (const key in result) {
    if (typeof result[key] === "string") {
      result[key] = sanitizeString(result[key]) as any;
    }
  }
  return result;
}
