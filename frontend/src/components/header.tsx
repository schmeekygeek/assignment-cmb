import { ThemeToggle } from "./mode-toggle"

export default function Header() {
  return (
    <div className="flex flex-row">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
        MyTaskApp
      </h1>
      <div className="flex-1"></div>
      <ThemeToggle />
    </div>
  )
}
