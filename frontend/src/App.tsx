import './App.css'
import { ThemeProvider } from "./components/theme-providers"
import { Header } from "./components/header"
import { AuthTabs } from './pages/auth'
import { TaskPage } from './pages/tasks'
import { AuthProvider, useAuth } from './components/auth-provider'
import { DialogProvider } from './components/dialog-provider'

function AppContent() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <TaskPage /> : <AuthTabs />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DialogProvider>
          <div className="bg-auto backdrop-blur-md sticky z-5 top-0 p-4">
            <Header />
          </div>
          <AppContent />
        </DialogProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
