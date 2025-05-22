import './App.css'
import { ThemeProvider } from "./components/theme-providers"
import Header from "./components/header"
import SignUp from "./pages/signup"
import { Toaster } from 'sonner'

export default function Home() {
  return (
    <ThemeProvider>
      <Toaster />
      <div className="p-0">
        <Header />
        <SignUp />
      </div>
    </ThemeProvider>
  )
}
