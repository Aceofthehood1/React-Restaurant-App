# Deployment setup

The frontend and backend are separate services. Never put `MONGODB_URI`, `JWT_SECRET`, or `CLOUDINARY_URL` in Vercel or in a `VITE_*` variable; Vite variables are public in the browser bundle.

## 1. MongoDB Atlas

1. Revoke the previously exposed database users and create a new least-privilege database user with read/write access only to the `Restaurants` database.
2. In **Network Access**, allow Render's outbound traffic. Render does not provide fixed outbound IPs on the free tier, so a demo commonly uses `0.0.0.0/0`; use a strong unique password and Atlas user permissions to limit the risk.
3. Copy the Node.js connection string, set the database name to `Restaurants`, URL-encode special characters in the password, and save it only as Render's `MONGODB_URI` secret.
4. Existing plaintext password documents do not need a bulk migration. The API upgrades each one to bcrypt after its first successful login. New and changed passwords are always hashed.

## 2. Cloudinary

1. Create a Cloudinary account and open the API Keys page.
2. Copy the `CLOUDINARY_URL` value (`cloudinary://API_KEY:API_SECRET@CLOUD_NAME`). Store it only in Render.
3. Uploaded JPEG, PNG, WebP, and GIF files are limited to 5 MB and saved under the `restaurant-app` folder. Uploads are accepted only from an authenticated restaurant representative.
4. Use Cloudinary's default authenticated dashboard controls to delete unused assets when needed. Deleting a menu item does not currently delete its image asset, which avoids accidentally removing a shared image.

## 3. Render backend

1. Create a **Blueprint** from the repository using `render.yaml`, or create a Node Web Service manually with root directory `restaurant-project/backend`, build command `npm ci --omit=dev`, and start command `npm start`.
2. Set `MONGODB_URI`, `CLOUDINARY_URL`, and `FRONTEND_ORIGIN`. Set `FRONTEND_ORIGIN` to the exact Vercel origin, for example `https://your-app.vercel.app` (no path or trailing slash). Comma-separated origins are supported if a preview origin must also be allowed.
3. If not using the Blueprint, generate a long random `JWT_SECRET` (at least 32 random bytes) and add it as a secret. Do not change it casually; changing it signs everyone out.
4. Deploy and confirm `https://YOUR-RENDER-SERVICE.onrender.com/health` returns `{"status":"ok"}`. A 503 response means Atlas is not connected.

## 4. Vercel frontend

1. Keep the Vercel root directory set to `restaurant-project`.
2. Add `VITE_API_URL=https://YOUR-RENDER-SERVICE.onrender.com` for Production (and Preview if wanted), then redeploy. The URL must use HTTPS and have no trailing slash.
3. `restaurant-project/vercel.json` sends browser-route refreshes to `index.html`, so routes such as `/restaurantAdminPage` work when opened directly.
4. After Vercel assigns or changes the frontend domain, update Render's `FRONTEND_ORIGIN` to match it exactly and redeploy the backend.

## Local development

1. Copy `restaurant-project/backend/.env.example` to `restaurant-project/backend/.env` and fill in private values.
2. Copy `restaurant-project/.env.example` to `restaurant-project/.env`.
3. Run `npm install && npm run dev` in `restaurant-project/backend`, then `npm install && npm run dev` in `restaurant-project`.

## Manual smoke test

Register one customer and one restaurant with unique emails and passwords of at least 8 characters. Sign in as the restaurant, upload an image, create a category/dish/promotion, edit one item, and check its public page. Sign in as the customer, browse the menu, create a reservation, and verify it appears for both the customer and the corresponding restaurant. In browser developer tools, confirm API calls use the Render HTTPS origin and private calls include an `Authorization: Bearer ...` header.
