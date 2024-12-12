
# Teste Backend HMZ 
Projeto de API de crud de usuario, com login e autenticação.




## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env de acordo com o example.env.

Preencha as variáveis de DATABASE de acordo com as credenciais do seu banco Postgres
O secret key é sua chave de autenticação. De preferência use uma string aleatória.


`DATABASE_NAME`

`DATABASE_USERNAME`

`DATABASE_PASSWORD`

`DATABASE_URL`

`PORT`

`SECRET_KEY`



## Instalação

Após configurar as varíaveis de ambiente execute a sequencia de comandos

```bash
  npm install
  npx prisma generate
  npx prisma migrate dev 
  npm run build
  npm run start
```
    
### Utilizando o Docker

```bash
  docker-compose up --build
```
### Users

#### Retorna todos os usuários

```http
  GET /api/users
```

#### Retorna um user

```http
  GET /api/users/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuario que você quer |

#### Edita um user

```http
  PUT /api/users/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuario que você quer |

```http
  DELETE /api/users/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuario que você quer |


### Auth

#### Executa o cadastro do usuário

```http
  POST /api/register
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `username`      | `string` | **Obrigatório**. O nome de usuário |
| `email`      | `string` | **Obrigatório**. O email de usuário |
| `password`      | `string` | **Obrigatório**. A senha do usuário |

#### Executa o login do usuário

```http
  POST /api/login
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `username`      | `string` | **Obrigatório**. O nome de usuário |
| `password`      | `string` | **Obrigatório**. A senha do usuário |

#### Executa o logout do usuário

```http
  POST /api/logout
```
