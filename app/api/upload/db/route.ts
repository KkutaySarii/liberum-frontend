import { API_URL } from "@/lib/api";
import { createErrorResponse } from "@/utils/api";

export async function POST(req: Request) {
  const { image_location, domain_id } = await req.json();

  try {
    const res = await fetch(`${API_URL}/${domain_id}/update-image-url`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image_url: image_location }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    const result = { status: "success" };

    return new Response(JSON.stringify(result), {});
  } catch (err: unknown) {
    const error: Error = err as Error;
    return createErrorResponse(error.message, 500);
  }
}
