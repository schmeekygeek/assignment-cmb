import { Button } from "../components/ui/button";
import { useTheme } from "../components/theme-providers";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} variant="outline">
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
};
