import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  return new Response(JSON.stringify({ message: "Hello, world!" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const POST =  async (request: NextRequest) => {
  const formData = await request.formData();

  console.log('ENDPOINT', formData)
  return new Response(JSON.stringify({ message: "Data received", data: formData }), {
    status: 200,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
