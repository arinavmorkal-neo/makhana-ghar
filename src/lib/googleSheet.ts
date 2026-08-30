const GOOGLE_SCRIPT_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
  process.env.GOOGLE_APP_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbxZVjwmSHCmyl1UT8kDMfNsojkrtclDUvXB1PvaWxmTZbmtPiG-1bEqkpt175VhwIzx-w/exec";

export async function submitToGoogleSheet(
  data: Record<string, string>
) {
  const formData = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value || "");
  });

  if (typeof window !== "undefined") {
    formData.append("url", window.location.href);
  }

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    body: formData,
    redirect: "follow",
  });

  return response.text();
}
