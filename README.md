# Gestão de Funcionários — Cálculo de IRRF

Aplicação web para cadastro de funcionários e cálculo automático do Imposto de Renda Retido na Fonte (IRRF). Desenvolvida com **React**, **TypeScript** e **Vite**, sem backend.

Este projeto foi construído com foco em **arquitetura limpa**, princípios **SOLID** e **cobertura de testes** — não apenas funcionalidade, mas também qualidade e manutenibilidade do código.

## Funcionalidades

- Cadastrar, editar e excluir funcionários
- Listar funcionários em tabela com cálculo automático de IRRF
- Filtrar funcionários por nome e CPF
- Persistência dos dados no **LocalStorage**
- Máscara de CPF e formatação monetária em Real (R$)
- Validação de formulário com verificação de CPF duplicado
- Dialog de confirmação customizado para exclusão
- Layout responsivo

## Tecnologias

| Tecnologia        | Uso                                      |
| ----------------- | ---------------------------------------- |
| React 19          | Interface de usuário                     |
| TypeScript        | Tipagem estática (strict mode)           |
| Vite              | Build tool e dev server                  |
| styled-components | Design system e estilização              |
| Context API       | Gerenciamento global de estado           |
| useReducer        | Lógica de estado previsível              |
| Vitest            | Testes unitários                         |
| LocalStorage      | Persistência dos dados no navegador      |

## Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior
- [npm](https://www.npmjs.com/) (já incluso com o Node.js)

```bash
node --version
npm --version
```

## Como executar

```bash
git clone <url-do-repositorio>
cd ttp-frontend
npm install
npm run dev
```

Abra `http://localhost:5173` no navegador.

### Build para produção

```bash
npm run build
npm run preview
```

## Estrutura do projeto

```
ttp-frontend/
├── src/
│   ├── components/          # Componentes de UI por feature
│   │   ├── EmployeeForm/
│   │   ├── EmployeeTable/
│   │   ├── SearchBar/
│   │   └── ui/              # Primitivos reutilizáveis (Button, Input, Card...)
│   ├── context/             # Estado global (Context + useReducer)
│   ├── hooks/               # Hooks customizados (lógica reutilizável)
│   ├── pages/               # Páginas da aplicação
│   ├── styles/              # Tema, mixins e estilos globais
│   ├── types/               # Interfaces e tipos TypeScript
│   ├── utils/               # Funções puras (regras de negócio, formatação)
│   └── data/                # Dados de exemplo
└── test/                    # Testes unitários (espelha src/utils)
    └── utils/
        ├── calculateIRRF.test.ts
        └── validateEmployeeForm.test.ts
```

## Arquitetura e princípios

Levamos a sério **SOLID**, **Clean Code** e **testes automatizados**. Abaixo, como esses princípios se aplicam ao projeto.

### Separação de responsabilidades (camadas)

| Camada | Responsabilidade | Exemplo |
| ------ | ---------------- | ------- |
| `pages/` | Orquestração de tela | `Home.tsx` compõe componentes |
| `hooks/` | Lógica de UI reutilizável | `useEmployeeForm`, `useEmployeePage` |
| `components/` | Apresentação | `EmployeeForm`, `EmployeeTable` |
| `context/` | Estado global | `EmployeeContext`, `employeeReducer` |
| `utils/` | Regras de negócio puras | `calculateIRRF`, `validateEmployeeForm` |
| `types/` | Contratos TypeScript | `Employee`, `FormErrors` |
| `test/` | Testes unitários | Validação das regras de negócio |

### SOLID na prática

| Princípio | Aplicação no projeto |
| --------- | -------------------- |
| **S** — Single Responsibility | Cada módulo tem uma função: `calculateIRRF` só calcula imposto; `employeeStorage` só persiste; `validateEmployeeForm` só valida |
| **O** — Open/Closed | Componentes UI aceitam variantes (`$variant`, `$hasError`) sem alterar o componente base |
| **L** — Liskov Substitution | Hooks expõem contratos tipados; componentes recebem props bem definidas |
| **I** — Interface Segregation | Context expõe apenas o necessário (`addEmployee`, `deleteEmployee`...) — sem vazar `dispatch` |
| **D** — Dependency Inversion | Páginas dependem de hooks abstratos (`useEmployeePage`), não de implementações internas |

### Clean Code

- **Funções puras** em `utils/` — fáceis de testar e raciocinar
- **Nomes descritivos** — `validateEmployeeForm`, `loadEmployeesFromStorage`, `createFormFromEmployee`
- **Componentes enxutos** — `EmployeeForm` renderiza; `useEmployeeForm` contém a lógica
- **Tipagem forte** — strict mode, sem `any`, exhaustiveness check no reducer
- **Design tokens** — tema centralizado em `styles/theme.ts`, sem cores hardcoded
- **Alias `@/`** — imports limpos e consistentes

### Hooks — por que existem?

A pasta `hooks/` **não é desnecessária** — ela separa **lógica de comportamento** da **apresentação**:

| Hook | Responsabilidade |
| ---- | ---------------- |
| `useEmployeeForm` | Estado do formulário, validação e submissão |
| `useEmployeePage` | Orquestração da página (editar, excluir com confirmação) |
| `useEmployees` | Acesso ao estado global (re-export do context) |
| `useConfirm` | Dialog de confirmação (re-export do UI) |

Isso permite que `EmployeeForm.tsx` e `Home.tsx` permaneçam focados em **JSX e composição**, enquanto a lógica fica testável e reutilizável.

## Como testar

### Testes automatizados

Os testes ficam em `test/`, separados do código-fonte, espelhando a estrutura de `src/`:

```bash
npm test           # executa todos os testes
npm run test:watch # modo observação
```

**Cobertura atual:**

| Módulo | O que é testado |
| ------ | --------------- |
| `calculateIRRF` | Todas as faixas de alíquota, limites, dedução por dependente |
| `validateEmployeeForm` | CPF duplicado, edição do próprio registro |

Priorizamos testar **regras de negócio puras** em `utils/` — funções sem dependência de React, rápidas e determinísticas.

### Teste manual na aplicação

#### 1. Cadastro e cálculo automático

Com os dados de exemplo carregados, verifique na tabela:

| Funcionário     | Salário Base IR | Desconto IRRF |
| --------------- | --------------- | ------------- |
| João Silva      | R$ 1.850,00     | R$ 0,00       |
| Maria Santos    | R$ 2.610,41     | R$ 26,34      |
| Pedro Oliveira  | R$ 4.120,82     | R$ 264,41     |
| Ana Costa       | R$ 7.200,00     | R$ 1.084,00   |
| Carlos Ferreira | R$ 1.940,82     | R$ 0,00       |

#### 2. Cadastrar novo funcionário

- Salário Bruto: R$ 3.000,00 | Desconto: R$ 200,00 | Dependentes: 1
- **Salário Base IR esperado:** R$ 2.610,41 | **IRRF:** R$ 26,34

#### 3. Editar, excluir e filtrar

1. Edite um funcionário e verifique recálculo do IRRF
2. Exclua via dialog de confirmação customizado
3. Filtre por nome e CPF
4. Recarregue a página e confirme persistência no LocalStorage

### Reiniciar dados de exemplo

1. F12 → **Application** → **Local Storage**
2. Remova a chave `employees`
3. Recarregue a página

## Regras de cálculo do IRRF

```
Salário Base IR = Salário Bruto − Desconto Previdência − (Dependentes × R$ 189,59)
Desconto IRRF = (Salário Base IR × Alíquota) − Parcela a Deduzir
```

| Faixa salarial            | Alíquota | Parcela a deduzir |
| ------------------------- | -------- | ----------------- |
| Até R$ 2.259,20           | 0%       | R$ 0,00           |
| R$ 2.259,21 a R$ 2.826,65 | 7,5%     | R$ 169,44         |
| R$ 2.826,66 a R$ 3.751,05 | 15%      | R$ 381,44         |
| R$ 3.751,06 a R$ 4.664,68 | 22,5%    | R$ 662,77         |
| Acima de R$ 4.664,68      | 27,5%    | R$ 896,00         |

## Scripts disponíveis

| Comando              | Descrição                              |
| -------------------- | -------------------------------------- |
| `npm run dev`        | Inicia o servidor de desenvolvimento   |
| `npm run build`      | Gera o build de produção               |
| `npm run preview`    | Visualiza o build de produção          |
| `npm test`           | Executa os testes automatizados        |
| `npm run test:watch` | Executa testes em modo observação      |

## Licença

Este projeto foi desenvolvido para fins educacionais e de avaliação técnica.
