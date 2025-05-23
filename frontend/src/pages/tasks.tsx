import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Task() {
  const { logout } = useAuth();
  return (
    <>
      <h1>Logged IN</h1>
      <Button onClick={() => {
        logout()
        toast("Logged out successfully!")
      }}>
        Log Out
      </Button>
    </>
    
  );
}
