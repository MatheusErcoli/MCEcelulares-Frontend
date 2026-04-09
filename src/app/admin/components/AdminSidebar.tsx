'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/src/components/Icon';
import { AllIcons } from '@/src/components/Icon';

interface NavItem {
  label: string;
  href: string;
  icon: keyof typeof AllIcons;
}

const navItems: NavItem[] = [
  { label: 'Dashboard',   href: '/admin',           icon: 'faChartBar' },
  { label: 'Produtos',    href: '/admin/produtos',   icon: 'faMobileScreen' },
  { label: 'Categorias',  href: '/admin/categorias', icon: 'faTag' },
  { label: 'Marcas',      href: '/admin/marcas',     icon: 'faStar' },
  { label: 'Pedidos',     href: '/admin/pedidos',    icon: 'faBox' },
  { label: 'Usuários',    href: '/admin/usuarios',   icon: 'faUsers' },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-linear-to-b from-[#5714d7] to-[#7929c8] flex flex-col text-white shrink-0">
      {/* Logo / título */}
      <div className="px-6 py-7 border-b border-white/20">
        <p className="text-xs uppercase tracking-widest font-semibold text-white/60 mb-1">Painel</p>
        <h1 className="text-xl font-bold">Administração</h1>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 p-4 flex-1">
        {navItems.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all
                ${isActive
                  ? 'bg-white text-[#5714d7] shadow-md'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
            >
              <Icon name={item.icon} className="w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Rodapé */}
      <div className="px-6 py-5 border-t border-white/20">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
        >
          <Icon name="faArrowLeft" className="w-3" />
          Voltar ao site
        </Link>
      </div>
    </aside>
  );
};