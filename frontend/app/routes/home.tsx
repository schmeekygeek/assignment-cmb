import { Button } from "~/components/ui/button"

import type { Route } from "./+types/home"
import { ThemeProvider } from "~/components/theme-providers"
import { ThemeToggle } from "~/components/mode-toggle"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Home() {
  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-svh">
        <ThemeToggle />
      </div>
    </ThemeProvider>
  )
}
