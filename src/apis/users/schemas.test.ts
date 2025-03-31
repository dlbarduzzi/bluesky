import { signUpSchema } from "./schemas"
import { describe, expect, it } from "vitest"

describe("apis.users.schemas", () => {
  it("should fail on empty object", () => {
    const parsed = signUpSchema.safeParse({})
    if (!parsed.error) {
      throw new Error("expected sign up schema to fail")
    }
    const errors = parsed.error.flatten().fieldErrors
    expect(errors).toHaveProperty("email")
    expect(errors).toHaveProperty("password")
    expect(errors.email).toContain("Email is required")
    expect(errors.password).toContain("Password is required")
  })
  it("should fail on empty field", () => {
    const parsed = signUpSchema.safeParse({ email: "", password: "" })
    if (!parsed.error) {
      throw new Error("expected sign up schema to fail")
    }
    const errors = parsed.error.flatten().fieldErrors
    expect(errors).toHaveProperty("email")
    expect(errors).toHaveProperty("password")
    expect(errors.email).toContain("Email is required")
    expect(errors.password).toContain("Password is required")
  })
  it("email should fail on invalid field", () => {
    const parsed = signUpSchema.safeParse({ email: "test", password: "testPassword1!" })
    if (!parsed.error) {
      throw new Error("expected sign up schema to fail")
    }
    const errors = parsed.error.flatten().fieldErrors
    expect(errors).toHaveProperty("email")
    expect(errors.email).toContain("Not a valid email")
  })
  it("password should fail with many errors", () => {
    const parsed = signUpSchema.safeParse({
      email: "test@email.com",
      password: "",
    })
    if (!parsed.error) {
      throw new Error("expected sign up schema to fail")
    }
    const errors = parsed.error.flatten().fieldErrors
    expect(errors).toHaveProperty("password")
    /* eslint-disable style/max-len */
    expect(errors.password).toContain("Password is required")
    expect(errors.password).toContain("Password must be at least 8 characters long")
    expect(errors.password).toContain("Password must contain at least 1 number")
    expect(errors.password).toContain("Password must contain at least 1 special character")
    expect(errors.password).toContain("Password must contain at least 1 lowercase character")
    expect(errors.password).toContain("Password must contain at least 1 uppercase character")
    /* eslint-enable style/max-len */
  })
  it("password should fail with max length error", () => {
    const parsed = signUpSchema.safeParse({
      email: "test@email.com",
      password: "t".repeat(73),
    })
    if (!parsed.error) {
      throw new Error("expected sign up schema to fail")
    }
    const errors = parsed.error.flatten().fieldErrors
    expect(errors).toHaveProperty("password")
    expect(errors.password).toContain("Password must be at most 72 characters long")
  })
  it("should succeed parsing schema", () => {
    const parsed = signUpSchema.safeParse({
      email: "test@email.com",
      password: "testPassword1!",
    })
    expect(parsed.error).toBeUndefined()
    expect(parsed.success).toBeTruthy()
  })
})
