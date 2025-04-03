import type { SignUpFieldErrors } from "@/apis/users/schemas"

import { jsonPayload } from "@/tools/requests/json"
import { signUpSchema } from "@/apis/users/schemas"
import { sendBadRequest, sendBadPayload } from "@/apis/response"

export async function POST(request: Request) {
  const json = await jsonPayload(request)
  if (json.error != null) {
    return sendBadRequest(json.error)
  }

  const body = signUpSchema.safeParse(json.body)
  if (!body.success) {
    const fields = body.error.flatten().fieldErrors
    if (Object.keys(fields).length < 1) {
      return sendBadRequest("Malformed JSON in request body")
    }
    return sendBadPayload<SignUpFieldErrors>(fields)
  }

  return Response.json({ ok: true }, { status: 201 })
}
