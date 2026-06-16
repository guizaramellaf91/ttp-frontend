# Gestão de Funcionários — Cálculo de IRRF

Aplicação web para cadastro de funcionários e cálculo automático do Imposto de Renda Retido na Fonte (IRRF). Desenvolvida com **React**, **TypeScript** e **Vite**, sem backend.

## Funcionalidades

- Cadastrar, editar e excluir funcionários
- Listar funcionários em tabela com cálculo automático de IRRF
- Filtrar funcionários por nome e CPF
- Persistência dos dados no **LocalStorage**
- Máscara de CPF e formatação monetária em Real (R$)
- Validação básica de formulário
- Layout responsivo

## Tecnologias

| Tecnologia   | Uso                                      |
| ------------ | ---------------------------------------- |
| React 19     | Interface de usuário                     |
| TypeScript   | Tipagem estática                         |
| Vite         | Build tool e dev server                  |
| Context API  | Gerenciamento global de estado           |
| useReducer   | Lógica de estado previsível              |
| LocalStorage | Persistência dos dados no navegador      |

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) versão 18 ou superior
- [npm](https://www.npmjs.com/) (já incluso com o Node.js)

Para verificar se estão instalados:

```bash
node --version
npm --version
```

## Como executar

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd ttp-frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O terminal exibirá a URL local (geralmente `http://localhost:5173`). Abra no navegador.

### 4. Build para produção (opcional)

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

Para visualizar o build localmente:

```bash
npm run preview
```

## Estrutura do projeto

```
src/
├── components/
│   ├── EmployeeForm/     # Formulário de cadastro/edição
│   ├── EmployeeTable/    # Tabela de listagem
│   └── SearchBar/        # Filtros de busca
├── context/
│   ├── EmployeeContext.tsx   # Provider e hook useEmployees
│   └── employeeReducer.ts    # Reducer com ações do estado
├── data/
│   ├── employees.sample.json # Funcionários de exemplo para testes
│   └── loadSampleEmployees.ts
├── types/
│   └── Employee.ts       # Interfaces TypeScript
├── utils/
│   ├── calculateIRRF.ts  # Lógica de cálculo do IRRF
│   └── formatters.ts     # Máscaras e formatação
├── pages/
│   └── Home.tsx          # Página principal
├── App.tsx               # Componente raiz
└── main.tsx              # Ponto de entrada
```

## Dados de exemplo

O arquivo `src/data/employees.sample.json` contém 5 funcionários de exemplo com valores variados para validar o cálculo do IRRF em diferentes faixas.

Na **primeira execução** (quando não há dados salvos no navegador), esses funcionários são carregados automaticamente. Para reiniciar com os dados de exemplo:

1. Abra as ferramentas de desenvolvedor do navegador (F12)
2. Vá em **Application** → **Local Storage**
3. Remova a chave `employees`
4. Recarregue a página

## Como testar

### Testes automatizados

O projeto inclui testes unitários para a função de cálculo do IRRF:

```bash
npm test
```

Para executar em modo observação (reexecuta ao salvar arquivos):

```bash
npm run test:watch
```

### Teste manual na aplicação

Siga este roteiro para validar as funcionalidades:

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

1. Preencha o formulário com: Nome, CPF, Salário Bruto, Desconto Previdência e Dependentes
2. Clique em **Cadastrar**
3. Confirme que o funcionário aparece na tabela com os valores calculados

Exemplo para validar manualmente:

- Salário Bruto: R$ 3.000,00
- Desconto Previdência: R$ 200,00
- Dependentes: 1
- **Salário Base IR esperado:** R$ 2.610,41
- **Desconto IRRF esperado:** R$ 26,34

#### 3. Editar funcionário

1. Clique em **Editar** em qualquer linha
2. Altere um campo (ex: número de dependentes)
3. Clique em **Salvar Alterações**
4. Verifique se os valores de IRRF foram recalculados

#### 4. Excluir funcionário

1. Clique em **Excluir** em uma linha
2. Confirme a exclusão no diálogo
3. Verifique se o funcionário foi removido da tabela

#### 5. Filtrar por nome e CPF

1. Digite parte de um nome no campo **Buscar por Nome**
2. Verifique se apenas funcionários correspondentes aparecem
3. Limpe o filtro e teste com o CPF (com ou sem máscara)

#### 6. Persistência no LocalStorage

1. Cadastre ou edite um funcionário
2. Recarregue a página (F5)
3. Confirme que os dados permanecem após o reload

## Regras de cálculo do IRRF

### Salário Base IR

```
Salário Base IR = Salário Bruto − Desconto Previdência − (Dependentes × R$ 189,59)
```

### Tabela de alíquotas

| Faixa salarial           | Alíquota | Parcela a deduzir |
| ------------------------ | -------- | ----------------- |
| Até R$ 2.259,20          | 0%       | R$ 0,00           |
| R$ 2.259,21 a R$ 2.826,65 | 7,5%    | R$ 169,44         |
| R$ 2.826,66 a R$ 3.751,05 | 15%     | R$ 381,44         |
| R$ 3.751,06 a R$ 4.664,68 | 22,5%   | R$ 662,77         |
| Acima de R$ 4.664,68     | 27,5%    | R$ 896,00         |

### Desconto IRRF

```
Desconto IRRF = (Salário Base IR × Alíquota) − Parcela a Deduzir
```

A função `calculateIRRF` em `src/utils/calculateIRRF.ts` encapsula toda essa lógica.

## Gerenciamento de estado

O estado global é gerenciado com **Context API** + **useReducer**:

- `EmployeeContext` — provê o estado e as ações para toda a aplicação
- `employeeReducer` — processa ações: adicionar, editar, excluir e filtrar
- `useEmployees` — hook customizado para consumir o contexto

Os dados são salvos automaticamente no `localStorage` sempre que a lista de funcionários é alterada.

## Scripts disponíveis

| Comando             | Descrição                              |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Inicia o servidor de desenvolvimento   |
| `npm run build`     | Gera o build de produção               |
| `npm run preview`   | Visualiza o build de produção localmente |
| `npm test`          | Executa os testes automatizados        |
| `npm run test:watch`| Executa testes em modo observação      |

## Licença

Este projeto foi desenvolvido para fins educacionais e de avaliação técnica.
