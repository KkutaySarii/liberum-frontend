export async function GET() {
  try {
    // TODO: implement real endpoint

    const data = {
      trendings: [
        {
          id: "1",
          favicon: "",
          domain: "kerem123.lib",
          visits: 213,
        },
        {
          id: "2",
          favicon: "",
          domain: "kerem123.lib",
          visits: 213,
        },
        {
          id: "3",
          favicon: "",
          domain: "kerem123.lib",
          visits: 213,
        },
        {
          id: "4",
          favicon: "",
          domain: "kerem123.lib",
          visits: 213,
        },
        {
          id: "5",
          favicon: "",
          domain: "kerem123.lib",
          visits: 213,
        },
        {
          id: "6",
          favicon: "",
          domain: "kerem123.lib",
          visits: 213,
        },
        {
          id: "7",
          favicon: "",
          domain: "kerem123.lib",
          visits: 213,
        },
        {
          id: "8",
          favicon: "",
          domain: "kerem123.lib",
          visits: 213,
        },
        {
          id: "9",
          favicon: "",
          domain: "kerem123.lib",
          visits: 213,
        },
        {
          id: "10",
          favicon: "",
          domain: "kerem123.lib",
          visits: 213,
        },
      ],
    };

    return Response.json(data);
  } catch {
    return Response.error();
  }
}
