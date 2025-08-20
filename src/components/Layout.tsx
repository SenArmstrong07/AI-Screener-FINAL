import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Users, 
  BarChart3, 
  User, 
  ChevronRight 
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "HOME", href: "/", icon: Home },
  { name: "CANDIDATE SCREENER", href: "/screener", icon: Users },
  { name: "DASHBOARD", href: "/dashboard", icon: BarChart3 },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo/Brand */}
        <div className="p-6">
          <h1 className="text-primary text-lg font-bold">
            Lorem to the Ipsum
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon size={18} />
                <span>{item.name}</span>
                {isActive && (
                  <ChevronRight size={16} className="ml-auto" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Admin Login */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-3 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg cursor-pointer transition-all duration-200">
            <User size={18} />
            <span>Admin Login</span>
            <ChevronRight size={16} className="ml-auto" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}