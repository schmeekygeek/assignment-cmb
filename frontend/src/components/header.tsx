import { Loader2 } from "lucide-react";
import { useAuth } from "./auth-provider";
import { useDialog } from "./dialog-provider";
import { ThemeToggle } from "./mode-toggle"
import { Button } from "./ui/button";
import { useState } from "react";

function LogoutButton() {
  const { isLoggedIn } = useAuth();
  const [ isLoading, setLoading ] = useState(false);
  const { logout } = useAuth();
  const { showDialog } = useDialog();

  return isLoggedIn ?  (

    !isLoading ?
      ( <Button onClick={() => {
        setLoading(true)
        logout()
        showDialog("Success!", "You're now logged out.")
        setLoading(false)
      }}> Log Out </Button> ) :
      (
        <Button disabled>
          <Loader2 className="animate-spin" />
          Please wait
        </Button>
      )

  ) : <></>
}

export const Header = () => {
  return (
    <div className="flex flex-row items-center justify-start">
      <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
        GetItDone
      </h1>
      <div className="flex-1"></div>
      <ThemeToggle />
      <div className="px-2">
        <LogoutButton />
      </div>
    </div>
  )
}
