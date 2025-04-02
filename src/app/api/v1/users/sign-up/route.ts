import { delay } from "@/lib/utils"

export async function GET() {
  await delay(1000)
  return Response.json({ ok: true, message: "User created." }, { status: 201 })
}
