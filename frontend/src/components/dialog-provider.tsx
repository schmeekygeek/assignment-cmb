import { createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DialogContextType {
  showDialog: (message: string, title: string) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const showDialog = (title: string, msg: string) => {
    setMessage(msg);
    setTitle(title);
    setOpen(true);
  };

  return (
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md w-[90%] rounded-xl p-6 text-left">
          <DialogHeader>
            <DialogTitle className="text-left">{title}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-2 text-left">
              {message}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog must be used within DialogProvider");
  return ctx;
};
