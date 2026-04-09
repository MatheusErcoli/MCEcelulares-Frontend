import { Icon } from '@/src/components/Icon';

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  description: string;
}

const StatCard = ({ title, value, icon, description }: StatCardProps) => (
  <div className="bg-white rounded-[24px] p-6 flex flex-col gap-3 border border-gray-100 shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">{title}</p>
      <span className="text-purple-700 bg-purple-100 p-2 rounded-xl">
        <Icon name={icon as any} />
      </span>
    </div>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
    <p className="text-xs text-gray-400">{description}</p>
  </div>
);

interface RecentRowProps {
  id: string;
  label: string;
  sub: string;
  badge: string;
  value: string;
}

const RecentRow = ({ id, label, sub, badge, value }: RecentRowProps) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <div className="flex flex-col">
      <p className="text-sm font-semibold text-gray-900">{label}</p>
      <p className="text-xs text-gray-400">{sub}</p>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
        {badge}
      </span>
      <p className="text-sm font-bold text-purple-700">{value}</p>
    </div>
  </div>
);

const Admin = () => {
  return (
    <div className="flex flex-col gap-8 max-w-5xl">

      {/* Cabeçalho */}
      <div>
        <p className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-1">Bem-vindo</p>
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Produtos"
          value="128"
          icon="faMobileScreen"
          description="Total cadastrado"
        />
        <StatCard
          title="Pedidos"
          value="34"
          icon="faBox"
          description="Este mês"
        />
        <StatCard
          title="Usuários"
          value="512"
          icon="faUsers"
          description="Registrados"
        />
        <StatCard
          title="Receita"
          value="R$ 8.240"
          icon="faChartBar"
          description="Mês atual"
        />
      </div>

      {/* Pedidos recentes */}
      <section className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
            <Icon name="faBox" className="text-purple-700" />
            Pedidos Recentes
          </h2>
          <button className="text-xs font-semibold text-purple-700 hover:opacity-75 transition-opacity">
            Ver todos
          </button>
        </div>

        <div>
          <RecentRow id="1" label="Pedido #101" sub="João Silva • 09/04/2025" badge="Em andamento" value="R$ 1.299,00" />
          <RecentRow id="2" label="Pedido #100" sub="Maria Souza • 08/04/2025" badge="Entregue" value="R$ 749,90" />
          <RecentRow id="3" label="Pedido #99"  sub="Carlos Lima • 07/04/2025" badge="Cancelado" value="R$ 499,00" />
          <RecentRow id="4" label="Pedido #98"  sub="Ana Costa • 06/04/2025" badge="Em andamento" value="R$ 2.100,00" />
        </div>
      </section>

      {/* Produtos e Categorias lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Produtos mais vendidos */}
        <section className="bg-gray-200 rounded-[32px] p-8 flex flex-col gap-5">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-3">
            <Icon name="faStar" className="text-purple-700" />
            Mais Vendidos
          </h2>
          <div className="flex flex-col gap-3">
            {[
              { nome: 'iPhone 15 Pro', qtd: 42 },
              { nome: 'Samsung Galaxy S24', qtd: 31 },
              { nome: 'Xiaomi Redmi Note 13', qtd: 27 },
              { nome: 'Motorola Edge 40', qtd: 18 },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between bg-white rounded-2xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-white bg-linear-to-r from-[#5714d7] to-[#7929c8] w-6 h-6 rounded-full flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-sm font-semibold text-gray-800">{p.nome}</p>
                </div>
                <p className="text-xs text-gray-400">{p.qtd} vendas</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ações rápidas */}
        <section className="bg-gray-200 rounded-[32px] p-8 flex flex-col gap-5">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-3">
            <Icon name="faGear" className="text-purple-700" />
            Ações Rápidas
          </h2>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Adicionar Produto',   icon: 'faPlus',  href: '/admin/produtos/novo' },
              { label: 'Nova Categoria',       icon: 'faTag',   href: '/admin/categorias/novo' },
              { label: 'Gerenciar Pedidos',    icon: 'faBox',   href: '/admin/pedidos' },
              { label: 'Ver Usuários',         icon: 'faUsers', href: '/admin/usuarios' },
            ].map((a, i) => (
              <a
                key={i}
                href={a.href}
                className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 font-semibold text-sm text-gray-800 hover:text-purple-700 hover:shadow-md transition-all group"
              >
                <span className="text-purple-700 bg-purple-100 p-2 rounded-xl group-hover:bg-purple-700 group-hover:text-white transition-colors">
                  <Icon name={a.icon as any} />
                </span>
                {a.label}
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Admin;