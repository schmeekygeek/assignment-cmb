import { useAuth } from "./auth-provider";
import { useDialog } from "./dialog-provider";
import { ThemeToggle } from "./mode-toggle"
import { Button } from "./ui/button";

function LogoutButton() {
  const { isLoggedIn } = useAuth();
  const { logout } = useAuth();
  const { showDialog } = useDialog();

  return isLoggedIn ?  (
      <Button onClick={() => {
        logout()
        showDialog("Success!", "You're now logged out.")
      }}>
        Log Out
      </Button>
    ) : <></>
}

export const Header = () => {
  return (
    <div className="flex flex-row">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
        MyTaskApp
      </h1>
      <div className="flex-1"></div>
      <ThemeToggle />
      <div className="px-2">
        <LogoutButton />
      </div>
    </div>
  )
}
