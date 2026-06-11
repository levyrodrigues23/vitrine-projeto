import { ADMIN_EMAILS } from "../constants/admin-users";
import type { User } from "../store/useAuthStore";

type ReviewEmailInput = {
  contentType: string;
  action: "create" | "update";
  manager: User | null;
  payload: unknown;
};

export function buildReviewEmailUrl({
  contentType,
  action,
  manager,
  payload,
}: ReviewEmailInput) {
  const reviewPayload = {
    action,
    contentType,
    submittedAt: new Date().toISOString(),
    submittedBy: manager
      ? {
          id: manager.id,
          name: manager.name,
          email: manager.email,
        }
      : null,
    payload,
  };

  const subject = `[Vitrine] Revisar ${contentType}`;
  const body = [
    "Olá, admins.",
    "",
    "Um gerenciador enviou um conteúdo para revisão.",
    "",
    JSON.stringify(reviewPayload, null, 2),
  ].join("\n");

  return `mailto:${ADMIN_EMAILS.join(",")}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
