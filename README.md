
# Teste Backend HMZ 
Projeto de API de crud de usuario, com login e autenticação.




## Variáveis de Ambiente

Para rodar esse projeto, após clonar o repositório em sua máquina, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env de acordo com o example.env.

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
    
### Users

#### Retorna todos os usuários

```http
  GET /api/users?page=2&per_page=4
```
### Parâmetros de Consulta

- `page` (opcional): Busca o número da página.
- `per_page` (opcional): Quantidade de retornos por página.

#### Retorna um user

```http
  GET /api/users/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuario que você quer |



#### Criar um user

```http
  POST /api/users
```
| Propriedade   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `first_name`      | `string` | **Obrigatório**. Primeiro nome do usuário|
| `last_name`      | `string` | **Obrigatório**. Último nome do usuário|
| `avatar`      | `string` | **Obrigatório**. Avatar do usuário|
| `email`      | `string` | **Obrigatório**. Email do usuário|

```
{
    "first_name": string,
    "last_name": string,
    "avatar: string,
    "email": string
}
```

#### Editar um user

```http
  PUT /api/users/${id}
```


| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuario que você quer editar|

| Propriedade   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `first_name`      | `string` | **Opcional**. Primeiro nome do usuário|
| `last_name`      | `string` | **Opcional**. Último nome do usuário|
| `avatar`      | `string` | **Opcional**. Avatar do usuário|

```json
{
    "first_name": string, 
    "last_name": string, 
    "avatar: string 
}
```

#### Excluir um user

```http
  DELETE /api/users/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuario que você quer |


### Auth

#### Executa o cadastro do usuário administrador

```http
  POST /api/register
```

| Propriedade   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `username`      | `string` | **Obrigatório**. O nome de usuário |
| `email`      | `string` | **Obrigatório**. O email de usuário |
| `password`      | `string` | **Obrigatório**. A senha do usuário |

```json
{
    "username": string, 
    "email": string,
    "password": string
}
```

#### Executa o login do usuário

```http
  POST /api/login
```

| Propriedade   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `username`      | `string` | **Obrigatório**. O nome de usuário |
| `password`      | `string` | **Obrigatório**. A senha do usuário |

```json
{
    "username": string, 
    "password": string
}
```

#### Executa o logout do usuário

```http
  POST /api/logout
```
