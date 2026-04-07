# 🏥 SIGPS — Sistema de Gestão de Posto de Saúde

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-blue)
![Node](https://img.shields.io/badge/backend-Node.js-green)
![React](https://img.shields.io/badge/frontend-React-blue)
![MySQL](https://img.shields.io/badge/database-MySQL-orange)

---

## 📌 Sobre o Projeto

O **SIGPS (Sistema de Gestão de Posto de Saúde)** é uma aplicação web fullstack desenvolvida para otimizar o gerenciamento de atendimentos em unidades de saúde.

O sistema permite o controle completo de:

* 👥 Pacientes
* 📅 Agendamentos
* 🧾 Prontuários
* 📊 Dashboard
* 📑 Relatórios

---

## 🚀 Funcionalidades

### 🔐 Autenticação

* Login com JWT
* Controle de acesso por tipo de usuário

### 👥 Pacientes

* Cadastro, edição e exclusão
* Listagem completa

### 📅 Agendamentos

* Calendário interativo
* Criação e edição de consultas
* Drag & drop
* Bloqueio de horários ocupados

### 🧾 Prontuários

* Histórico clínico do paciente
* Registros médicos por consulta

### 📊 Dashboard

* Indicadores em tempo real
* Gráficos de agendamentos
* Contadores por status

### 📑 Relatórios

* Filtro por data
* Filtro por status
* Busca por paciente
* Exportação em CSV

---

## 🧠 Regras de Negócio

* Não é permitido agendar dois atendimentos no mesmo horário para o mesmo profissional
* Apenas usuários autorizados acessam determinadas rotas
* Dashboard e relatórios são gerados dinamicamente (sem armazenamento próprio)

---

## 🏗️ Tecnologias Utilizadas

### Frontend

* React.js
* React Router DOM
* Axios
* React Big Calendar
* Recharts
* React Toastify

### Backend

* Node.js
* Express
* MySQL
* JWT (JSON Web Token)

---

## 🗄️ Banco de Dados

### Principais Tabelas:

* `usuarios`
* `pacientes`
* `agendamento`
* `prontuarios`

---

## 🔌 API (Principais Rotas)

### 🔐 Auth

```
POST /login
POST /register
```

### 👥 Pacientes

```
GET /pacientes
POST /pacientes
PUT /pacientes/:id
DELETE /pacientes/:id
```

### 📅 Agendamentos

```
GET /agendamentos
POST /agendamentos
PUT /agendamentos/:id
DELETE /agendamentos/:id
```

### 📊 Dashboard

```
GET /dashboard
```

---

## ▶️ Como Rodar o Projeto

### 🔧 Backend

```bash
npm install
node server.js
```

### 💻 Frontend

```bash
npm install
npm run dev
```

---

## 🔐 Autenticação (JWT)

O sistema utiliza token JWT para autenticação.

O token é armazenado no `localStorage` e enviado automaticamente nas requisições:

```http
Authorization: Bearer TOKEN
```

---

## 🎨 Interface

* Layout moderno e responsivo
* Sidebar dinâmica
* Modais interativos
* Feedback visual com notificações

---

## ⚠️ Tratamento de Erros

| Código | Descrição                                  |
| ------ | ------------------------------------------ |
| 401    | Não autorizado (token inválido ou ausente) |
| 500    | Erro interno do servidor                   |

---

## 🧪 Melhorias Futuras

* Exportação de relatórios em PDF
* Filtro por médico
* Paginação de dados
* Dashboard avançado com mais métricas

---

## 👩‍💻 Desenvolvido por

**Karen Ramos Valentim**

---

## 🏁 Considerações Finais

O SIGPS foi desenvolvido com foco em:

* Escalabilidade
* Usabilidade
* Aplicação real no contexto de saúde

---

> 💬 *“Sistema projetado para simular um ambiente real de gestão em saúde, com foco em eficiência e organização.”*

---