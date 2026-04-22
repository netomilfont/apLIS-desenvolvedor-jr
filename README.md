# apLIS — Teste Técnico Fullstack

Sistema de gestão médica fullstack com dois backends independentes, frontend em React e banco de dados MySQL compartilhado.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Frontend | React 19 + Vite + Axios |
| Backend PHP | PHP 8.3 + Apache + PDO |
| Backend Node.js | Node.js 20 + Express 5 + mysql2 |
| Banco de dados | MySQL 8.0 |
| Infraestrutura | Docker + Docker Compose |

---

## Arquitetura

    ┌─────────────────────────────────────────┐
    │           Frontend React (SPA)          │
    │         http://localhost:3000           │
    └────────────┬────────────────┬───────────┘
                 │                │
                 ▼                ▼
    ┌────────────────┐  ┌─────────────────────┐
    │  Backend PHP   │  │   Backend Node.js   │
    │  porta 8001    │  │     porta 8002      │
    │   /medicos     │  │    /pacientes       │
    └───────┬────────┘  └──────────┬──────────┘
            │                      │
            └──────────┬───────────┘
                       ▼
            ┌─────────────────────┐
            │    MySQL 8.0        │
            │    porta 3306       │
            │  banco: aplis_db    │
            └─────────────────────┘

---

## Funcionalidades

- ✅ CRUD completo de médicos (PHP)
- ✅ CRUD completo de pacientes (Node.js)
- ✅ Sidebar com navegação entre módulos
- ✅ Busca em tempo real nas listagens
- ✅ Feedback visual com mensagens de sucesso/erro
- ✅ Multi-idioma PT/EN no frontend e backends
- ✅ Arquitetura MVC em ambos os backends
- ✅ Banco de dados compartilhado entre os backends
- ✅ Containerização completa com Docker

---

## Como rodar

### Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando

### Subir o projeto

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/apLIS-desenvolvedor-jr.git
cd apLIS-desenvolvedor-jr

# Sobe todos os serviços
docker-compose up --build
```

### Acessar

| Serviço | URL |
|---|---|
| Frontend | http://localhost:3000 |
| API Médicos (PHP) | http://localhost:8001/api/v1/medicos |
| API Pacientes (Node) | http://localhost:8002/api/v1/pacientes |

---

## Endpoints

### Backend PHP — Médicos

| Método | Rota | Descrição |
|---|---|---|
| GET | /api/v1/medicos | Lista todos os médicos |
| GET | /api/v1/medicos/:id | Busca médico por ID |
| POST | /api/v1/medicos | Cria novo médico |
| PUT | /api/v1/medicos/:id | Atualiza médico |
| DELETE | /api/v1/medicos/:id | Remove médico |

### Backend Node.js — Pacientes

| Método | Rota | Descrição |
|---|---|---|
| GET | /api/v1/pacientes | Lista todos os pacientes |
| GET | /api/v1/pacientes/:id | Busca paciente por ID |
| POST | /api/v1/pacientes | Cria novo paciente |
| PUT | /api/v1/pacientes/:id | Atualiza paciente |
| DELETE | /api/v1/pacientes/:id | Remove paciente |

### Multi-idioma

Todos os endpoints respondem de acordo com o header `Accept-Language`:
Accept-Language: pt   → respostas em português (padrão)
Accept-Language: en   → respostas em inglês

---

## Exemplos de uso

### Criar médico
```bash
curl -X POST http://localhost:8001/api/v1/medicos \
  -H "Content-Type: application/json" \
  -d '{"nome": "João da Silva", "CRM": "123456", "UFCRM": "CE"}'
```

### Criar paciente
```bash
curl -X POST http://localhost:8002/api/v1/pacientes \
  -H "Content-Type: application/json" \
  -d '{"nome": "Maria Silva", "dataNascimento": "1990-05-15", "carteirinha": "123456", "cpf": "12345678909"}'
```

---

## Decisões técnicas

**Por que MVC nos backends?**
Separação clara de responsabilidades — model cuida dos dados, controller cuida da lógica, route cuida do roteamento. Facilita manutenção e testes.

**Por que PDO no PHP sem framework?**
O teste pede PHP puro. PDO com prepared statements garante segurança contra SQL injection sem dependências externas.

**Por que mysql2 com pool de conexões no Node?**
Pool evita abrir uma nova conexão a cada requisição, melhorando performance em múltiplas requisições simultâneas.

**Por que Singleton no Database.php?**
Garante que apenas uma conexão com o banco seja criada durante o ciclo de vida da requisição PHP.

**Por que i18n via header Accept-Language?**
Padrão HTTP nativo — o frontend simplesmente muda o header e o backend responde no idioma correto, sem precisar de parâmetros extras na URL.

---

## Autor

Desenvolvido por Neto como teste técnico para a vaga de Desenvolvedor Júnior na **apLIS**.