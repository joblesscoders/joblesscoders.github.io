export const CONTACT_TOPICS = [
  "Project Collaboration",
  "Freelance / Contract Work",
  "Bug Report",
  "Feature Request",
  "General Inquiry",
  "Partnership Proposal",
  "Career Opportunity",
  "Technical Support",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export const CONTACT_LIMITS = {
  name: { min: 1, max: 100 },
  email: { min: 5, max: 254 },
  topic: { min: 1, max: 50 },
  message: { min: 10, max: 2000 },
  honeypot: { max: 0 },
  minSubmitDurationMs: 2000, // 2.0 seconds minimum for real user submission
} as const;

// RFC 5322 compliant basic email regex
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export interface ContactPayload {
  name: string;
  email: string;
  topic: string;
  message: string;
  _hp_company?: string; // Honeypot field
  _ts?: number; // Form render timestamp (ms)
}

export interface ContactApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Partial<Record<keyof ContactPayload, string>>;
}

export function validateContactPayload(
  payload: Partial<ContactPayload>,
  options: { checkTiming?: boolean } = {}
): {
  isValid: boolean;
  fieldErrors: Partial<Record<keyof ContactPayload, string>>;
  sanitized?: ContactPayload;
} {
  const fieldErrors: Partial<Record<keyof ContactPayload, string>> = {};

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const topic = typeof payload.topic === "string" ? payload.topic.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const honeypot = typeof payload._hp_company === "string" ? payload._hp_company.trim() : "";
  const timestamp = typeof payload._ts === "number" ? payload._ts : 0;

  // Honeypot check (bot trap)
  if (honeypot.length > CONTACT_LIMITS.honeypot.max) {
    fieldErrors._hp_company = "Spam detected.";
  }

  // Name validation
  if (!name) {
    fieldErrors.name = "Full name is required.";
  } else if (name.length < CONTACT_LIMITS.name.min || name.length > CONTACT_LIMITS.name.max) {
    fieldErrors.name = `Name must be between ${CONTACT_LIMITS.name.min} and ${CONTACT_LIMITS.name.max} characters.`;
  }

  // Email validation
  if (!email) {
    fieldErrors.email = "Email address is required for our engineering leads to respond.";
  } else if (email.length > CONTACT_LIMITS.email.max) {
    fieldErrors.email = `Email cannot exceed ${CONTACT_LIMITS.email.max} characters.`;
  } else if (!EMAIL_REGEX.test(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  // Topic validation
  if (!topic) {
    fieldErrors.topic = "Please select an inquiry topic.";
  } else if (!CONTACT_TOPICS.includes(topic as ContactTopic)) {
    fieldErrors.topic = "Selected topic is not valid.";
  }

  // Message validation
  if (!message) {
    fieldErrors.message = "Message is required.";
  } else if (message.length < CONTACT_LIMITS.message.min) {
    fieldErrors.message = `Message must be at least ${CONTACT_LIMITS.message.min} characters.`;
  } else if (message.length > CONTACT_LIMITS.message.max) {
    fieldErrors.message = `Message cannot exceed ${CONTACT_LIMITS.message.max} characters.`;
  }

  // Timing check (optional, only if timestamp provided and checkTiming requested)
  if (options.checkTiming && timestamp > 0) {
    const elapsed = Date.now() - timestamp;
    if (elapsed < CONTACT_LIMITS.minSubmitDurationMs) {
      fieldErrors._ts = "Submission completed unusually fast. Please try again.";
    }
  }

  const isValid = Object.keys(fieldErrors).length === 0;

  return {
    isValid,
    fieldErrors,
    sanitized: isValid
      ? {
          name,
          email,
          topic,
          message,
        }
      : undefined,
  };
}
