import NextLink from "next/link"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div>
      <section aria-labelledby="homepage-header">
        <h1 id="homepage-header" className="sr-only">
          Homepage.
        </h1>
      </section>
      <div className="space-x-3 p-4">
        <Button type="button" asChild>
          <NextLink href="/sign-in" prefetch={false}>Sign in</NextLink>
        </Button>
        <Button type="button" asChild>
          <NextLink href="/sign-up" prefetch={false}>Sign up</NextLink>
        </Button>
      </div>
    </div>
  )
}
