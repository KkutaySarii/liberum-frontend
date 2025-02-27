/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/lib/api";
import { createErrorResponse } from "@/utils/api";

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/newest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    const returnData = data.map((item: any) => {
      return {
        id: item._id,
        favicon: item?.image_url,
        domain: item?.name,
        visits: item?.visit_count,
      };
    });

    return Response.json({
      newest: returnData,
    });
  } catch (err) {
    const error: Error = err as Error;
    return createErrorResponse(error.message, 500);
  }
}
