import { jsonPayload } from "./json"
import { describe, expect, it } from "vitest"

describe("requests.json", () => {
  it("should return error on malformed json body", async () => {
    const request = new Request("http://localhost:3000", {
      body: "foo:bar",
      method: "POST",
    })
    const payload = await jsonPayload(request)
    expect(payload.body).toBeUndefined()
    expect(payload.error).toBe("Malformed JSON in request body")
  })
  it("should return error on multiple json bodies", async () => {
    const request = new Request("http://localhost:3000", {
      body: "{}{}",
      method: "POST",
    })
    const payload = await jsonPayload(request)
    expect(payload.body).toBeUndefined()
    expect(payload.error).toBe("Malformed JSON in request body")
  })
  it("should return valid json body", async () => {
    const request = new Request("http://localhost:3000", {
      body: JSON.stringify({ foo: "bar" }),
      method: "POST",
    })
    const payload = await jsonPayload(request)
    expect(payload.body).toHaveProperty("foo")
    expect(payload.error).toBeUndefined()
  })
})
