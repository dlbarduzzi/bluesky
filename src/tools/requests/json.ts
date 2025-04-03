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

export class SendRequestError extends Error {
  constructor(cause: unknown) {
    super("send request failed", { cause })
    this.name = this.constructor.name
  }
}

export class JsonResponseError extends Error {
  public status: number
  constructor(cause: unknown, status: number) {
    super("json response failed", { cause })
    this.name = this.constructor.name
    this.status = status
  }
}

export async function jsonRequest(request: Request, status = 200) {
  let response: Response
  try {
    response = await fetch(request)
  }
  catch (error) {
    throw new SendRequestError(error)
  }
  if (response.status !== status) {
    throw new JsonResponseError(response.statusText, response.status)
  }
  let data: unknown
  try {
    data = await response.json()
  }
  catch (error) {
    throw new JsonResponseError(error, response.status)
  }
  return data
}
