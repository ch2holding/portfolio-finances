export default function Dashboard() {
  return (
    <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card de Boas-vindas */}
        <div className="bg-card border border-border rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-3">
            🎉 Bem-vindo ao Dashboard!
          </h1>
          <p className="text-muted-foreground mb-4">
            Você está autenticado com sucesso usando sua conta Google. Este é um
            exemplo de página protegida que só pode ser acessada por usuários
            autenticados.
          </p>
          <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
            <p className="text-sm text-foreground">
              <strong>Dica:</strong> Use o botão no header para alternar entre
              tema claro e escuro!
            </p>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-card border border-border rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total de Projetos
                </p>
                <p className="text-3xl font-bold text-primary">24</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 dark:text-green-400 font-medium">
                ↑ 12%
              </span>
              <span className="text-muted-foreground ml-2">
                vs mês anterior
              </span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Tarefas Ativas
                </p>
                <p className="text-3xl font-bold text-chart-2">156</p>
              </div>
              <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-chart-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 dark:text-green-400 font-medium">
                ↑ 8%
              </span>
              <span className="text-muted-foreground ml-2">
                vs semana anterior
              </span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Concluídas</p>
                <p className="text-3xl font-bold text-chart-3">89%</p>
              </div>
              <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-chart-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 dark:text-green-400 font-medium">
                ↑ 5%
              </span>
              <span className="text-muted-foreground ml-2">
                vs mês anterior
              </span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Em Atraso</p>
                <p className="text-3xl font-bold text-destructive">7</p>
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-destructive"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-red-600 dark:text-red-400 font-medium">
                ↓ 3%
              </span>
              <span className="text-muted-foreground ml-2">
                vs semana anterior
              </span>
            </div>
          </div>
        </div>

        {/* Grid de Conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Atividades Recentes */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Atividades Recentes
              </h2>
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                Ver todas
              </button>
            </div>
            <div className="space-y-3">
              {[
                {
                  title: "Nova tarefa criada: Design da landing page",
                  time: "Há 2 horas",
                  icon: "📝",
                  color: "bg-primary/10",
                },
                {
                  title: "Projeto 'E-commerce' atualizado",
                  time: "Há 4 horas",
                  icon: "🔄",
                  color: "bg-chart-2/10",
                },
                {
                  title: "Tarefa concluída: Implementar autenticação",
                  time: "Há 6 horas",
                  icon: "✅",
                  color: "bg-chart-3/10",
                },
                {
                  title: "Novo comentário em 'Bug de login'",
                  time: "Há 8 horas",
                  icon: "💬",
                  color: "bg-chart-4/10",
                },
                {
                  title: "Deadline se aproximando: Relatório mensal",
                  time: "Há 1 dia",
                  icon: "⏰",
                  color: "bg-destructive/10",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 hover:bg-accent rounded-lg transition-colors"
                >
                  <div
                    className={`w-12 h-12 ${activity.color} rounded-lg flex items-center justify-center text-2xl`}
                  >
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projetos em Destaque */}
          <div className="bg-card border border-border rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Projetos em Destaque
            </h2>
            <div className="space-y-4">
              {[
                {
                  name: "E-commerce Platform",
                  progress: 75,
                  color: "bg-primary",
                },
                { name: "Mobile App", progress: 50, color: "bg-chart-2" },
                {
                  name: "Dashboard Analytics",
                  progress: 90,
                  color: "bg-chart-3",
                },
              ].map((project, index) => (
                <div key={`project-${index}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {project.name}
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`${project.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Ações Rápidas
              </h3>
              <div className="space-y-2">
                <button
                  type="button"
                  className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent rounded-lg flex items-center transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-3 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Novo Projeto
                </button>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent rounded-lg flex items-center transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-3 text-chart-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Nova Tarefa
                </button>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent rounded-lg flex items-center transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-3 text-chart-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Convidar Membro
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
