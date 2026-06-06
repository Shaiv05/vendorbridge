"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, FileText, Quote, CheckSquare, ShoppingCart, Receipt,
  BarChart3, Settings, LogOut, Sparkles, Menu, X, Search, Bell, ChevronDown,
} from "lucide-react";
import { useAuth } from "@/features/auth/auth-context";
import { cn } from "@/lib/utils";
import { Input, Button } from "@/components/ui/primitives";
import { RoleBadge } from "@/components/role-badge";
import type { Role } from "@/types/user";

interface NavItem { title: string; href: string; icon: typeof LayoutDashboard; roles: Role[] | "all"; }

const NAV: NavItem[] = [
  { title: "Dashboard",       href: "/dashboard",        icon: LayoutDashboard, roles: "all" },
  { title: "Vendors",         href: "/vendors",          icon: Users,           roles: ["ADMIN", "PROCUREMENT_OFFICER"] },
  { title: "RFQs",            href: "/rfqs",             icon: FileText,        roles: ["ADMIN", "PROCUREMENT_OFFICER"] },
  { title: "Quotations",      href: "/quotations",       icon: Quote,           roles: ["ADMIN", "PROCUREMENT_OFFICER", "VENDOR"] },
  { title: "Approvals",       href: "/approvals",        icon: CheckSquare,     roles: ["ADMIN", "MANAGER"] },
  { title: "Purchase Orders", href: "/purchase-orders",  icon: ShoppingCart,    roles: ["ADMIN", "PROCUREMENT_OFFICER"] },
  { title: "Invoices",        href: "/invoices",         icon: Receipt,         roles: ["ADMIN", "PROCUREMENT_OFFICER"] },
  { title: "Reports",         href: "/reports",          icon: BarChart3,       roles: ["ADMIN", "MANAGER"] },
  { title: "Settings",        href: "/settings",         icon: Settings,        roles: "all" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  
  if (!user) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (search) params.set("q", search);
    else params.delete("q");
    router.push(`${pathname}?${params.toString()}`);
  };

  const visible = NAV.filter((n) => n.roles === "all" || n.roles.includes(user.role));
  const initials = `${user.first_name[0] ?? ""}${user.last_name[0] ?? ""}`.toUpperCase();

  return (
    <div className="min-h-screen flex bg-background">
      {/* ... (sidebar) */}
      <motion.aside animate={{ width: collapsed ? 72 : 256 }} transition={{ duration: 0.25 }}
        className="hidden lg:flex flex-col bg-sidebar text-sidebar-foreground sticky top-0 h-screen border-r border-sidebar-border">
        <Side collapsed={collapsed} items={visible} pathname={pathname} onToggle={() => setCollapsed((c) => !c)} role={user.role} onLogout={logout} />
      </motion.aside>

      <AnimatePresence>
        {mobile && (<>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobile(false)} />
          <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25 }}
            className="lg:hidden fixed left-0 top-0 h-full w-64 bg-sidebar text-sidebar-foreground z-50">
            <Side collapsed={false} items={visible} pathname={pathname} onToggle={() => setMobile(false)} role={user.role} onLogout={logout} mobile />
          </motion.aside>
        </>)}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-xl flex items-center gap-3 px-4 sm:px-6">
          <button onClick={() => setMobile(true)} className="lg:hidden p-2 rounded-md hover:bg-muted"><Menu className="h-5 w-5" /></button>
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search current view..." 
              className="pl-9 bg-muted/40 border-transparent" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          {/* ... (rest of header) */}
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-violet" />
            </Button>
            <div className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-muted transition">
              <div className="h-8 w-8 rounded-full bg-gradient-primary grid place-items-center text-white text-xs font-bold">{initials || "U"}</div>
              <div className="hidden sm:block text-left leading-tight">
                <div className="text-sm font-semibold">{user.first_name}</div>
                <div className="text-[10px] text-muted-foreground">{user.email}</div>
              </div>
              <ChevronDown className="hidden sm:block h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8"><motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>{children}</motion.div></main>
      </div>
    </div>
  );
}

function Side({ collapsed, items, pathname, onToggle, role, onLogout, mobile }: {
  collapsed: boolean; items: NavItem[]; pathname: string; onToggle: () => void; role: Role; onLogout: () => void; mobile?: boolean;
}) {
  return (<>
    <div className={cn("h-16 flex items-center px-4 border-b border-sidebar-border", collapsed && !mobile && "justify-center px-0")}>
      <Link href="/dashboard" className="flex items-center gap-2.5 min-w-0">
        <div className="h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow shrink-0"><Sparkles className="h-4 w-4 text-white" /></div>
        {(!collapsed || mobile) && <div className="min-w-0">
          <div className="text-sm font-bold tracking-tight">VendorBridge</div>
          <div className="text-[10px] text-sidebar-foreground/60 uppercase tracking-wider">ERP Suite</div>
        </div>}
      </Link>
      {mobile && <button onClick={onToggle} className="ml-auto p-1.5 rounded-md hover:bg-sidebar-accent"><X className="h-4 w-4" /></button>}
    </div>
    <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
      {items.map((it) => {
        const active = pathname === it.href;
        const I = it.icon;
        return (
          <Link key={it.href} href={it.href} className={cn("group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
            active ? "bg-sidebar-accent text-white" : "text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-white",
            collapsed && !mobile && "justify-center px-0")}>
            {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-gradient-primary" />}
            <I className={cn("h-4 w-4 shrink-0", active && "text-primary-glow")} />
            {(!collapsed || mobile) && <span className="truncate">{it.title}</span>}
          </Link>
        );
      })}
    </nav>
    <div className="p-3 border-t border-sidebar-border space-y-2">
      {(!collapsed || mobile) && <div className="px-2 py-1"><RoleBadge role={role} /></div>}
      <button onClick={onLogout} className={cn("w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-white transition",
        collapsed && !mobile && "justify-center px-0")}>
        <LogOut className="h-4 w-4 shrink-0" />{(!collapsed || mobile) && <span>Sign out</span>}
      </button>
      {!mobile && <button onClick={onToggle} className="w-full text-[10px] uppercase tracking-wider text-sidebar-foreground/40 hover:text-white py-1">
        {collapsed ? "Expand" : "Collapse"}
      </button>}
    </div>
  </>);
}
