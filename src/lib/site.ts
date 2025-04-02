import { env } from "@/env/client"

type SiteConfig = {
  name: string
  description: string
  url: string
}

export const siteConfig: SiteConfig = {
  name: "bluesky",
  description: "A sample app built with love.",
  url: env.NEXT_PUBLIC_APP_URL,
}
