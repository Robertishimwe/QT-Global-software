import { Shield, FileCode, BarChart3, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  {
    id: 'verified',
    label: 'Verified Users',
    icon: Shield,
    description: 'Crypto verified',
  },
  {
    id: 'protobuf',
    label: 'Protobuf Data',
    icon: FileCode,
    description: 'Binary decoded',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    description: 'User statistics',
  },
];

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <aside className="w-64 min-h-screen bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] p-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <p className="text-xs text-[hsl(var(--sidebar-foreground))]/60">User Management</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth text-left",
                isActive
                  ? "bg-[hsl(var(--sidebar-active))] text-white shadow-md"
                  : "text-[hsl(var(--sidebar-foreground))]/80 hover:bg-[hsl(var(--sidebar-hover))] hover:text-white"
              )}
            >
              <Icon className="w-5 h-5" />
              <div className="flex-1">
                <div className="font-medium text-sm">{item.label}</div>
                <div className="text-xs opacity-70">{item.description}</div>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
