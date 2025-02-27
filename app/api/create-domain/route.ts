import { API_URL } from "@/lib/api";
import { createErrorResponse } from "@/utils/api";

export async function POST(req: Request) {
  const { name, owner, nft_id, expire_date, linkedContractAddress } =
    await req.json();

  try {
    const res = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        owner,
        nft_id,
        expire_date,
        linkedContractAddress,
        image_url: "",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    const result = { status: "success", data };

    return new Response(JSON.stringify(result), {});
  } catch (err: unknown) {
    const error: Error = err as Error;
    return createErrorResponse(error.message, 500);
  }
}
