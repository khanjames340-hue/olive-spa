# Olive Spa

Luxury beauty and wellness platform for **Olive Spa** — Juba, South Sudan. Live at [theolivespa.com](https://theolivespa.com).

A premium customer acquisition, appointment booking, marketing, and CRM website inspired by five-star spas in Dubai, Bali, and Europe.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React + Vite + Tailwind CSS + Framer Motion |
| Icons | Lucide React |
| Backend | Node.js + Express (`server/`) |
| Database | MySQL / MariaDB |
| Auth | JWT + bcrypt (staff accounts only) |
| Hosting | Namecheap cPanel — static site in `public_html`, API via "Setup Node.js App" |

## Quick Start — Frontend

```bash
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Requests to `/api` are proxied to the backend on port 5000.

## Quick Start — Backend

Needs a MySQL or MariaDB database.

```bash
cd server
cp .env.example .env   # fill in database details, JWT_SECRET and the first admin
npm install
npm run dev
```

Tables are created automatically on startup. The first admin account is created from `ADMIN_EMAIL` / `ADMIN_PASSWORD` while no admin exists yet. To add another admin or reset a password:

```bash
npm run create-admin -- someone@theolivespa.com "a-long-password"
```

Run the backend tests with `npm test`.

## API

| Method | Path | Access | Purpose |
|--------|------|--------|---------|
| GET | `/api/health` | public | Server and database check |
| POST | `/api/appointments` | public | Save a booking from the website |
| POST | `/api/auth/login` | public | Staff sign-in, returns a 12-hour token |
| GET | `/api/auth/me` | staff | Current staff account |
| POST | `/api/auth/change-password` | staff | Change password |
| GET | `/api/admin/stats` | staff | Dashboard numbers |
| GET | `/api/admin/appointments` | staff | List bookings (`status`, `q`, `sort=date`, `page`) |
| PATCH | `/api/admin/appointments/:id` | staff | Set status: pending, confirmed, completed, cancelled |
| GET | `/api/admin/customers` | staff | Guests grouped by phone number |

Sign-in is limited to 10 failed attempts per 15 minutes, and bookings to 20 per hour per visitor.

## Pages

- `/` Home — hero, services, membership, testimonials, Instagram
- `/about` Story, mission, vision, values
- `/services` Filterable service catalog with booking CTAs
- `/packages` Curated spa packages
- `/gallery` Lightbox gallery
- `/booking` Appointment form → saved to the database, then WhatsApp opens with the details
- `/membership` Essential / Premium / VIP with payment placeholder
- `/blog` SEO journal
- `/contact` Location, hours, map, reviews
- `/admin/login` Staff sign-in
- `/admin` Staff dashboard — overview, appointments, customers, settings

If the booking server can't be reached, the form still opens WhatsApp so no booking is lost.

## WhatsApp

Floating chat with automated reply templates. Bookings open a pre-filled WhatsApp Business message including the booking reference:

```
Hello Olive Spa, I would like to book an appointment.
Booking reference / Name / Service / Date / Time / Phone
```

Update `WHATSAPP_NUMBER` in `src/data/constants.js`.

## Deployment (cPanel)

**Website:** run `npm run build` and upload the contents of `dist/` (including `.htaccess`) to `public_html`. The `.htaccess` forces HTTPS, sends every page route to the React app, and leaves `/api` to the Node.js app. If cPanel has added its own lines to `public_html/.htaccess`, keep them when uploading.

**API (one-time setup):**

1. cPanel → **MySQL Database Wizard**: create a database and user, and give the user all privileges on it.
2. Upload the `server/` folder (without `node_modules` and `.env`) to e.g. `/home/<user>/olive-api`.
3. cPanel → **Setup Node.js App** → Create Application:
   - Node.js version: 18 or newer
   - Application root: `olive-api`
   - Application URL: `theolivespa.com` / `api`
   - Application startup file: `app.js`
   - Environment variables: everything in `server/.env.example`
4. Click **Run NPM Install**, then **Restart**.
5. Check [theolivespa.com/api/health](https://theolivespa.com/api/health) shows `{"status":"ok"}`, then sign in at `/admin/login`.
6. Remove `ADMIN_PASSWORD` from the environment variables once you've signed in, and restart the app.

To update the API later, upload the changed files and click **Restart** in Setup Node.js App.

## Brand

- Olive Green `#556B2F`
- Champagne Gold `#D4AF37`
- Soft Beige `#F5EFE6`
- Headings: Playfair Display
- Body: Poppins

## Next Steps

- Email or SMS notifications for new bookings
- Configure Google Maps embed and Google Business Profile
- Replace the membership payment placeholder with a real payment gateway
