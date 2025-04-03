export function sendBadRequest(message: string) {
  return Response.json({ ok: false, error: "Bad Request", message }, {
    status: 400,
  })
}

export function sendBadPayload<T>(fields: T) {
  return Response.json({ ok: false, error: "Unprocessable Entity", fields }, {
    status: 422,
  })
}
