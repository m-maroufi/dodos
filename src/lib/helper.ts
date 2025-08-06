export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export function getInitials(fullName?: string) {
  if (!fullName || typeof fullName !== "string") return "";

  const parts = fullName.trim().split(" ");
  const first = parts[0]?.[0] || "";
  const last = parts[1]?.[0] || "";
  return last ? `${first} ${last}` : `${first}`;
}
export const statusMap: Record<string, string> = {
  low: "کم",
  medium: "متوسط",
  high: "زیاد",
};
