# MVP starter

A Node.js, TypeScript & sqlite starter built upon [Adonis JS](https://adonisjs.com) framework.

🔋 Batteries included:

- [x] Sign in form
- [x] Logout
- [x] List / create / delete users in admin page
- [x] Avatar upload by attachment-lite
- [x] Forgot password
- [x] Email create password
- [x] Roles and permissions with AdonisJS bouncers
- [x] i18n
- [x] Last login at
- [x] Form component
- [x] Admin UI [windmill](https://github.com/estevanmaito/windmill-dashboard)
- [x] Tailwind 3.0
- [x] Alpinejs
- [x] Webpack encore
- [x] Hotwired turbo
- [ ] Unit test
- [ ] e2e test with [cypress](https://www.cypress.io/)

Replace sqlite by other : link

# Installation

```bash
npm install (or yarn)
node ace generate:key
node ace migration:run
node ace db:seed
```

@vscode/sqlite3 package require python2, if you rencontred error :

```
npm install --build-from-source --python=/usr/bin/python2
```

or 

```
yarn --build-from-source --python=/usr/bin/python2
```

## Developing

```bash
npm run dev
```
