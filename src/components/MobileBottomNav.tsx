import { Link, useLocation } from "react-router-dom";
import { Home, Shirt, Handshake, Building2, Headset } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export default function MobileBottomNav() {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { icon: Home, label: t('nav.home'), path: '/' },
    { icon: Shirt, label: t('nav.products'), path: '/products' },
    { icon: Handshake, label: t('nav.partner'), path: '/partner' },
    { icon: Building2, label: t('nav.about'), path: '/tentang-kami' },
    { icon: Headset, label: t('nav.contact'), path: '/contact' },
  ];

  return (
    <div className="fixed bottom-0 z-50 w-full bg-white border-t border-gray-200 lg:hidden pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_30px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16 px-1">
        {navItems.map((item) => {
          const isActive = item.path === '/' 
            ? location.pathname === '/' 
            : location.pathname.startsWith(item.path);

          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200",
                isActive ? "text-red-600" : "text-gray-400 hover:text-gray-900"
              )}
            >
              <div
                className={cn(
                  "p-1.5 rounded-full transition-all duration-300",
                  isActive ? "bg-red-50 text-red-600" : "bg-transparent text-gray-500"
                )}
              >
                <item.icon className={cn("w-6 h-6", isActive && "stroke-[2.5]")} />
              </div>
              <span 
                className={cn(
                  "text-[9px] font-bold tracking-wider",
                  isActive ? "text-red-600" : "text-gray-500"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
