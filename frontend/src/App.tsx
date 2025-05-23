import './App.css'
import { ThemeProvider } from "./components/theme-providers"
import Header from "./components/header"
import { AuthTabs } from './pages/auth'
import Task from './pages/tasks'
import { AuthProvider, useAuth } from './components/auth-provider'
import { DialogProvider } from './components/dialog-provider'

function AppContent() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Task /> : <AuthTabs />;
}

export default function Home() {

  return (
    <ThemeProvider>
      <AuthProvider>
        <DialogProvider>

          <div>
            <Header />
            <AppContent />
          </div>
        </DialogProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
