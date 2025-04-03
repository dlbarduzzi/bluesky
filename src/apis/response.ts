export type BadRequest = { ok: false, error: "Bad Request", message: string }

export function sendBadRequest(message: string) {
  const response: BadRequest = { ok: false, error: "Bad Request", message }
  return Response.json(response, { status: 400 })
}

export type BadPayload<T> = { ok: false, error: "Zod Error", details: T }

export function sendBadPayload<T>(details: T) {
  const response: BadPayload<T> = { ok: false, error: "Zod Error", details }
  return Response.json(response, { status: 422 })
}
