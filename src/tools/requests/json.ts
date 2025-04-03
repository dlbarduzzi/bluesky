export async function jsonPayload(request: Request) {
  try {
    const body = await request.json()
    return { body }
  }
  catch {
    const error = "Malformed JSON in request body"
    return { error }
  }
}
