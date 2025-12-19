# Play55 Case - Frontend

Dashboard de métricas e analytics da plataforma com Nuxt 3, Vue 3 e TypeScript.

---

## 🚀 Requisitos

Certifique-se de estar utilizando as versões corretas de Node e npm:

```json
"engines": {
  "node": ">=22 <23",
  "npm": ">=10.9.2 <12"
}
```

> 💡 **Dica:** Recomenda-se o uso de **nvm** com **nvm use** para gerenciar versões do Node.js de forma simples.

---

## 💻 Comandos Disponíveis

| Comando            | Descrição                               |
| ------------------ | --------------------------------------- |
| `npm run dev`      | Inicia o servidor de desenvolvimento    |
| `npm run build`    | Faz o build da aplicação                |
| `npm run lint`     | Executa o ESLint para análise de código |
| `npm run lint:fix` | Corrige automaticamente erros de lint   |
| `npm run test`     | Executa os testes com Vitest            |
| `nvm use`          | Instala a versão correta do node        |

---

## 🌐 Acesso à Aplicação

- **Local:** [http://localhost:3000](http://localhost:3000)
- **Online:** [https://play55-case.pages.dev/](https://play55-case.pages.dev/)

---

## O que seria feito com mais tempo

- **Testes de componentes**: Meu tempo acabou e nao foi possível entregar os testes

---

## Arquitetura - Nuxt Layers

O projeto utiliza **Nuxt Layers** para organizar o código por domínios de negócio, permitindo:

- **Separação clara de responsabilidades**: Cada layer representa um domínio específico (ex: `dashboard`)
- **Reutilização de código**: Componentes, composables e páginas são isolados por contexto
- **Escalabilidade**: Facilita a adição de novos domínios sem afetar os existentes
- **Manutenibilidade**: Código organizado e com baixo acoplamento
- **Organização**: A pasta de "components", não fica poluída com vários componentes de todas as partes, apenas componentes "globais"

### Decisões de Design

- **Rota de Detalhes da Transação**: Foi implementada uma rota dedicada (`/dashboard/transaction/[id]`) ao clicar em uma transação da tabela. Esta abordagem foi escolhida para demonstrar o sistema de roteamento, mas **poderia facilmente ser substituída por um modal**, dependendo dos requisitos de UX do projeto. Usei apenas porque o trabalho com roteamento era um requisito da vaga

---

##  Qualidade de Código

O projeto segue práticas de código limpo e mantém alta qualidade através de:

### Conventional Commits
- Commits padronizados seguindo a convenção (feat, fix, chore, etc.) [conventionalcommits.org](https://www.conventionalcommits.org/)
- Validação automática de mensagens via **git-commit-msg-linter**

### Automação com Husky
- **Pre-commit hooks**: Executa lint e validações antes de cada commit
- **Commit-msg hooks**: Garante que mensagens sigam o padrão conventional

### Lint-staged
- Executa linting apenas nos arquivos modificados
- Melhora a performance e mantém o código consistente

### Princípios de Clean Code
- **SRP (Single Responsibility Principle)**: Cada componente/função tem uma única responsabilidade
- **Composables reutilizáveis**: Lógica de negócio isolada e testável (domain)
- **Tipagem forte**: TypeScript em todo o projeto para maior segurança
- **Nomenclatura clara**: Funções e variáveis com nomes descritivos

---
