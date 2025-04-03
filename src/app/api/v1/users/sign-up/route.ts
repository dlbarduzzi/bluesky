import type { z } from "zod"

import { jsonPayload } from "@/tools/requests/json"
import { signUpSchema } from "@/apis/users/schemas"
import { sendBadRequest, sendBadPayload } from "@/apis/response"

type FieldErrors<T extends z.ZodTypeAny> = z.inferFlattenedErrors<T>["fieldErrors"]
type SignUpSchemaFieldErrors = FieldErrors<typeof signUpSchema>

export async function POST(request: Request) {
  const json = await jsonPayload(request)
  if (json.error != null) {
    return sendBadRequest(json.error)
  }

  const body = signUpSchema.safeParse(json.body)
  if (!body.success) {
    return sendBadPayload<SignUpSchemaFieldErrors>(body.error.flatten().fieldErrors)
  }

  console.warn("DATA", body.data)

  return Response.json({ ok: true, message: "User created." }, { status: 201 })
}
