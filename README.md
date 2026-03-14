# 🎁 Birthday Gifts --- Ultra Minimal Apple Edition

Uma curadoria pessoal de ideias de presentes construída com foco em
experiência premium, minimalismo e arquitetura moderna.

Inspirado em marcas como Apple e Nike, este projeto prioriza elegância,
clareza visual e microinterações sofisticadas.

------------------------------------------------------------------------

# ✨ Visão Geral

Este projeto é um site pessoal para listar ideias de presentes de
aniversário.

Ele não funciona como e-commerce --- apenas exibe ideias e redireciona
para links externos definidos manualmente.

O objetivo principal é oferecer:

-   Experiência visual premium
-   Interface minimalista
-   Navegação fluida
-   Estrutura escalável
-   Código organizado e profissional

------------------------------------------------------------------------

# 🧱 Stack Tecnológica

## ⚛️ Next.js 14 (App Router)

Framework React moderno com:

-   Roteamento baseado em pastas
-   Server Components
-   Performance otimizada
-   SEO-friendly
-   Arquitetura escalável

------------------------------------------------------------------------

## ⚛️ React 18

Interface baseada em componentes reutilizáveis.

------------------------------------------------------------------------

## 🎨 TailwindCSS

Estilização utilitária com foco em consistência e velocidade.

------------------------------------------------------------------------

## 🎬 Framer Motion

Responsável pelas microinterações e transições suaves.

------------------------------------------------------------------------

## 🟦 TypeScript

Tipagem estática para maior segurança e escalabilidade.

------------------------------------------------------------------------

# 🏗 Arquitetura do Projeto

    birthday-gifts/
    │
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── gifts/
    │       └── [slug]/
    │           └── page.tsx
    │
    ├── components/
    │   ├── Hero.tsx
    │   ├── GiftCard.tsx
    │   ├── GiftGrid.tsx
    │   ├── GiftDetail.tsx
    │   └── TopBackButton.tsx
    │
    ├── data/
    │   └── gifts.ts
    │
    ├── public/
    ├── tailwind.config.js
    ├── tsconfig.json
    └── package.json

------------------------------------------------------------------------

# 📁 Organização

## app/

Gerencia o roteamento automático do Next.js.

-   `page.tsx` → Página principal
-   `gifts/[slug]/page.tsx` → Página individual do presente
-   `layout.tsx` → Estrutura global

------------------------------------------------------------------------

## components/

Componentes reutilizáveis e organizados por responsabilidade.

------------------------------------------------------------------------

## data/

Arquivo `gifts.ts` contém os dados mockados dos presentes.

------------------------------------------------------------------------

# 📱 Responsividade

Layout responsivo com Tailwind:

-   Desktop → 3 colunas
-   Tablet → 2 colunas
-   Mobile → 1 coluna

------------------------------------------------------------------------

# 🎨 Sistema Visual

-   Muito espaço em branco
-   Hierarquia clara
-   Microinterações suaves
-   Scroll fluido
-   Estética editorial

------------------------------------------------------------------------

# 🛠 Como Rodar o Projeto

Instalar dependências:

``` bash
npm install
```

Rodar servidor:

``` bash
npm run dev
```

Acessar:

    http://localhost:3000

------------------------------------------------------------------------

# ✏️ Como Adicionar Novos Presentes

Editar:

    data/gifts.ts

Adicionar novo item:

``` ts
{
  name: "Novo Presente",
  slug: "novo-presente",
  image: "https://link-da-imagem.com",
  description: "Descrição personalizada.",
  buyUrl: "https://site-externo.com"
}
```

------------------------------------------------------------------------

# 🚀 Deploy

Recomendado: Vercel

1.  Subir para GitHub
2.  Conectar na Vercel
3.  Deploy automático

------------------------------------------------------------------------

# 📌 Conclusão

Projeto com arquitetura moderna, visual premium e fácil manutenção.
