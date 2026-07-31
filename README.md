# Lucas Oil Distributor Portal

B2B distributor portal prototype for order management, product catalog, support cases, and marketing collateral.

## Running the code

Run `npm install` to install dependencies.

Run `npm run dev` to start the development server.

Run `npm run build` to create a production build.

Run `npm start` to serve the production build locally (after running `npm run build`).

## Deploy to Heroku

This app ships with a [`server.js`](server.js) Express server that serves the production build and falls back to `index.html` for all routes, which is required for client-side routing (React Router) to work correctly on refresh and deep links.

### Verify locally before deploying

```bash
npm install
npm run build
npm start
```

Visit `http://localhost:3000` and confirm:

- The app loads and key views render (login, dashboard, marketing banners with images)
- Deep links work, e.g. `http://localhost:3000/orders` and `http://localhost:3000/knowledge-hub` load directly
- Refreshing on a nested route, e.g. `/dashboard` or `/orders/123`, does not return a 404

### Deploying to an existing Heroku app

Deploying with `git push heroku` **replaces** the application currently running at that app's URL. The app name, custom domains, config vars, add-ons, and release history all persist — only the running code is swapped.

Before deploying, record the current release so you can roll back if needed, and review what will remain attached to the app:

```bash
heroku releases -a <your-app-name>
# Note the current version (e.g. v42)

heroku config -a <your-app-name>
heroku addons -a <your-app-name>
```

Then deploy:

```bash
heroku git:remote -a <your-app-name>

git add .
git commit -m "Add Heroku deployment config"
git push heroku main
# If your default branch is master, use: git push heroku master

heroku open -a <your-app-name>
```

If something goes wrong, roll back to the previous release:

```bash
heroku rollback v42 -a <your-app-name>
```

Useful post-deploy commands:

```bash
heroku logs --tail -a <your-app-name>
heroku ps -a <your-app-name>
heroku restart -a <your-app-name>
```
