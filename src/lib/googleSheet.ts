const GOOGLE_SCRIPT_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
  process.env.GOOGLE_APP_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbxV4XQzWnpsXyxUQG3SkI2x5kFVdfXPB-LVf8f-obFIIDOAYUs2CvIFG1nte2P8e628NA/exec";

export async function submitToGoogleSheet(
  data: Record<string, string>
) {
  const payload: Record<string, string> = { ...data };

  if (typeof window !== "undefined") {
    payload.url = window.location.href;
    if (!data.source || data.source === "Website") {
      const slug = window.location.pathname.replace(/^\/+|\/+$/g, "");
      payload.source = slug || "home";
    }
  }

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
    redirect: "follow",
  });

  return response.text();
}


