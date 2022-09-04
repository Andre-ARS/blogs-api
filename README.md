# Projeto Blog's API

# Contexto

Este projeto trata-se da criação de uma API de um CRUD das funcionalidades de um blog, utilizando o Sequelizer para manipular as informações, criar entidades e popula-las, a partir dos endpoints da API, feita com base na arquitetura MSC (models, services, controllers). Foi utilizado também o Swagger Ui para criar uma documentação. Esse projeto foi feito no módulo de back-end do curso da Trybe, em um ambiente node.

## Tecnologias usadas

Back-end:

> Desenvolvido usando: Docker, JavaScript, Node.js, Express.js, MySQL, Sequelizer, Swagger.io;

## Testando Localmente

> Clone o Repositório

```bash
git clone git@github.com:Andre-ARS/blogs-api.git
```

> Dentro do diretório do projeto, instale as dependencias

```bash
npm install
```

> Na raiz do projeto suba as imagens do docker

```bash
docker-compose up -d
```

> Depois rode o container

```bash
docker exec -it blogs_api sh 
```

> Popule o Banco

```bash
npm run prestart && npm run seed
```

> Dentro do container rode a API

```bash
npm start
```

> Use o seu API client preferido e rode o endpoint na porta 3000 do seu localhost

Url base da api rodando no Heroku [https://blogs-api-ars.herokuapp.com/](https://blogs-api-ars.herokuapp.com/)

Visite a documentação no swagger [aqui](https://app.swaggerhub.com/apis/ANDRE360ARS/blogs-api/1.0.0#/)
