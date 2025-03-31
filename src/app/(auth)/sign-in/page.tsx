import { SignIn } from "@/components/sign-in"

export default function Page() {
  return (
    <div>
      <section aria-labelledby="sign-in-header">
        <h1 id="sign-in-header" className="sr-only">
          Sign in.
        </h1>
      </section>
      <div className="p-4">
        <SignIn />
      </div>
    </div>
  )
}
