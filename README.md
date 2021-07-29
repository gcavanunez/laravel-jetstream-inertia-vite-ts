# Laravel Jetstream Vite Typescript Demo App

This application serves as an example of applying vite in Laravel.

## Setup

Clone the repo locally:

```sh
git clone https://github.com/gcavanunez/laravel-jetstream-inertia-vite-ts.git
cd laravel-jetstream-inertia-vite-ts
```

Install PHP dependencies:

```sh
composer install
```

Install NPM dependencies:

```sh
npm ci
```

```sh
yarn
```

Build assets:

```sh
npm run dev
```

```sh
yarn dev
```

Setup configuration:

```sh
cp .env.example .env
```

Generate application key:

```sh
php artisan key:generate
```

Create an SQLite database. You can also use another database (MySQL, Postgres), simply update your configuration accordingly.

```sh
touch database/database.sqlite
```

Run database migrations:

```sh
php artisan migrate
```

Run database seeder:

```sh
php artisan db:seed
```

Run the dev server (the output will give the address):

```sh
php artisan serve
```
