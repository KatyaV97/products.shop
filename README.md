# products.shop.ru

``
Интернет Сибсети
``

Под капотом Nuxt3 (Node v 20.7.0), сборщик vite, sass

[Документация по Nuxt3](https://nuxt.com/)

![Nuxtjs](https://img.shields.io/badge/Nuxt-002E3B?style=for-the-badge&logo=nuxtdotjs&logoColor=#00DC82)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

## Table of contents

[Установка](#front-setup)

[Дерево стилей](#style-tree)

[Брейкпоинты](#breakpoints)

[Nuxt Context](#nuxt-context)

[Сервер](#server)

[Ошибки](#error-codes)

## Front Setup

```sh
npm install
```

### Сборка для локальной разработки

```sh
npm run dev
```
### Сборка проекта на машине

```sh
npm run build
```
Для деплоя проекта есть сервис /services/nuxt-ssr.service, который выполняет следующую команду:
```
node /fs/www/.../.output/server/index.mjs
```

### Preview режим

```sh
npm run build
```

```sh
npx nuxi preview
```

## Style tree

```
|_ assets
    |_ sass
        |_ components -> Директория для стилей компонентов проекта            
        |_ fonts -> Директория шрифтов проекта
            |_ Rouble -> Шрифт для корректного отображения знака рубля в проекте
            |_ Roboto -> Основной шрифт проекта, имеет 2 начертания (Medium, Regular)
        |_ view -> Директория для пейджей проекта
        |_ base.sass -> Файл базовых стилей проекта
        |_ colors.sass -> Файл переменных цветовой палитры проекта
        |_ global-variables.sass -> Файл с глобальными переменными и миксинами sass
```