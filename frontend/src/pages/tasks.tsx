import { useAuth } from "@/components/auth-provider";
import { useDialog } from "@/components/dialog-provider";
import { Button } from "@/components/ui/button";

export default function Task() {
  const { logout } = useAuth();
  const { showDialog } = useDialog();

  return (
    <>
      <h1>Logged IN</h1>
      <Button onClick={() => {
        logout()
        showDialog("Success!", "You're now logged out.")
      }}>
        Log Out
      </Button>
    </>
    
  );
}
