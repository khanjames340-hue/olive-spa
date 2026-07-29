# Olive Spa

Luxury beauty and wellness platform for **Olive Spa** — Juba, South Sudan.

A premium customer acquisition, appointment booking, marketing, and CRM website inspired by five-star spas in Dubai, Bali, and Europe.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React + Vite + Tailwind CSS + Framer Motion |
| Icons | Lucide React |
| Backend | Node.js + Express |
| Database | MongoDB (Mongoose) |
| Auth | JWT + bcrypt |
| Deploy | Vercel (frontend) · Node host (backend) |

## Quick Start — Frontend

```bash
cd olive-spa
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Quick Start — Backend

```bash
cd backend
cp .env.example .env
npm install
# Start MongoDB locally, then:
npm run seed
npm run dev
```

API runs at [http://localhost:5000](http://localhost:5000)

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Customer | amina@example.com | customer123 |
| Admin | admin@olivespa.ss | admin123 |

## Pages

- `/` Home — hero, services, membership, testimonials, Instagram
- `/about` Story, mission, vision, values
- `/services` Filterable service catalog with booking CTAs
- `/packages` Curated spa packages
- `/gallery` Lightbox gallery
- `/booking` Full appointment form → WhatsApp + email notification
- `/membership` Essential / Premium / VIP with payment placeholder
- `/blog` SEO journal
- `/contact` Location, hours, map, reviews
- `/dashboard` Customer appointments, loyalty, membership
- `/admin` Analytics, CRM, promotions, content

## WhatsApp

Floating chat with automated reply templates. Bookings open a pre-filled WhatsApp Business message:

```
Hello Olive Spa, I would like to book an appointment.
Name / Service / Date / Time / Phone
```

Update `WHATSAPP_NUMBER` in `src/data/constants.js` and backend `.env`.

## Environment

Copy `.env.example` files and set:

- `MONGODB_URI`
- `JWT_SECRET`
- `WHATSAPP_NUMBER`
- SMTP credentials for real email notifications

## Brand

- Olive Green `#556B2F`
- Champagne Gold `#D4AF37`
- Soft Beige `#F5EFE6`
- Headings: Playfair Display
- Body: Poppins

## Production Notes

- Frontend builds with `npm run build` (Vercel-compatible)
- Protect admin routes with JWT middleware
- Configure Google Maps embed and Google Business Profile when live
- Replace payment placeholder with Stripe / local gateway when ready
