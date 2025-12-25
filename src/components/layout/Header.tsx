import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, FileText, Settings } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-success">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-semibold tracking-tight">
              HR Process Intelligence
            </span>
            <span className="text-xs text-muted-foreground">
              Powered by Industry Frameworks
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link to="/">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
          </Link>
          <Link to="/reports">
            <Button variant="ghost" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant="ghost" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button variant="hero" size="sm">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
