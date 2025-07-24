# ❓ AI FAQ Generator — SEO & AI Friendly

An AI-powered tool that generates 6–10 SEO-optimized FAQs for any product using just its category and description. Built for enhancing product pages with relevant, geo-targeted, and AI-contextual content.

> Built with ⚡️ Next.js, 🔐 Supabase, 💸 Lemon Squeezy, 🎨 ShadCN/UI, and 🧩 TailwindCSS

---

## ✨ Features

-   🔍 SEO-Optimized FAQ generation
-   🌍 Geo-aware, localized questions
-   🤖 AI validation to avoid gibberish or mismatched inputs
-   🖼️ Minimal, clean UI
-   💳 Subscription billing with Lemon Squeezy
-   🔐 Email login with Supabase Auth

---

## 🛠 Tech Stack

| Tech          | Role                          |
| ------------- | ----------------------------- |
| Next.js       | Frontend + backend API routes |
| Supabase      | Auth + Database               |
| Lemon Squeezy | SaaS subscriptions & billing  |
| ShadCN/UI     | UI components                 |
| TailwindCSS   | Styling                       |

---

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/rjc0des/faq-generator
cd faq-generator
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
LEMONSQUEEZY_API_KEY=your_lemon_api_key
LEMONSQUEEZY_STORE_ID=your_lemon_store_id
```

---

## 🧠 How It Works

1. User selects a product category and writes a brief product description.
2. The app uses an AI prompt to generate FAQs that are:
    - Search engine optimized
    - Relevant to the product context
    - Geo-sensitive if applicable
3. Validates user input to reject:
    - Placeholder text
    - Irrelevant or mismatched entries

Sample Output:

```json
[
  {
    "question": "Is this backpack suitable for international travel?",
    "answer": "Yes, it’s compact, durable, and accepted as a cabin-size bag on most airlines."
  },
  ...
]
```

---

## 🧪 Run Locally

```bash
pnpm dev
```

Visit `http://localhost:3000`

---

## 💳 Plans

| Plan | Features                          |
| ---- | --------------------------------- |
| Free | 3 generations/month               |
| Pro  | Unlimited usage, priority support |

Powered by Lemon Squeezy for payments and subscriptions.

---

## 📌 Ideal For

-   Shopify merchants
-   Amazon sellers
-   Product marketers
-   Developers building AI-powered e-commerce tools

---

## 🎯 Goal

Make product pages more informative, AI-enhanced, and SEO-friendly — automatically.

---

## 👨‍💻 Author

**Rohith Jayaraj**  
[LinkedIn](https://linkedin.com/in/rohithjayaraj)  
[Portfolio](https://rohith-jayaraj.vercel.app)  
[Email](mailto:rohithjayaraj90@gmail.com)
