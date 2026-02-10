

## Administrace, editovatelne menu, zpetna vazba a reorganizace stranek

### Zmena struktury stranek

Hlavni stranka (`/`) zustane jako prezentacni landing page (hero, about, menu, galerie, kontakt, paticka). Rezervace a zpetna vazba se presunou na samostatne podstranky:

```text
/                -> Landing page (bez rezervace a feedbacku)
/reservation     -> Rezervacni formular (vlastni stranka)
/feedback        -> Formular zpetne vazby (vlastni stranka)
/admin/login     -> Prihlaseni do adminu
/admin           -> Administracni panel
```

Navigace a CTA tlacitka budou odkazovat na `/reservation` a `/feedback` pomoci React Router (`Link` / `useNavigate`).

---

### 1. Podstranka Rezervace (`/reservation`)

- Novy soubor `src/pages/Reservation.tsx` – stranka s Navbar, rezervacnim formularem (stavajici `ReservationSection`) a patickou
- V `Navbar.tsx` zmenime odkaz na rezervaci z `#reservation` na `/reservation` (pouzijeme React Router `Link`)
- V `HeroSection.tsx` CTA tlacitko take povede na `/reservation`
- Odstranime `ReservationSection` z `Index.tsx`

### 2. Podstranka Zpetna vazba (`/feedback`)

- Nova tabulka `feedback` v databazi (name, email, rating 1-5, message, created_at)
- RLS: verejny INSERT, SELECT pouze pro admina
- Novy soubor `src/components/FeedbackSection.tsx` – formular (jmeno, e-mail, hodnoceni hvezdickou, zprava)
- Novy soubor `src/pages/Feedback.tsx` – stranka s Navbar, formularem a patickou
- Odkaz v navigaci nebo v patice

### 3. Menu z databaze

Presuneme polozky menu z `translations.ts` do databaze, aby je majitel mohl spravovat v adminu.

- Nova tabulka `menu_categories` (id, title_cs, title_en, sort_order)
- Nova tabulka `menu_items` (id, category_id, name_cs, name_en, desc_cs, desc_en, price, sort_order)
- RLS: verejny SELECT, INSERT/UPDATE/DELETE pouze pro admina (pres funkci `has_role`)
- Seed data – vlozime stavajici polozky z `translations.ts` do DB v ramci migrace
- `MenuSection.tsx` bude nacitat data z DB pomoci React Query
- Staticke texty sekce (nadpis, degustacni nabidka) zustanou v prekladech

### 4. Administracni panel

**Autentizace a autorizace:**
- Tabulka `user_roles` s enumem `app_role` (admin, user) a funkci `has_role()` (security definer)
- Prihlasovaci stranka `/admin/login` (e-mail + heslo)
- Hook `useAuth` – sleduje session, overuje roli admin
- Chranena routa – bez prihlaseni presmerovani na login

**Admin dashboard (`/admin`) se tremi taby:**
- **Rezervace** – prehled vsech rezervaci, filtrovani, zmena statusu (potvrzena/zamitnuta). Pridame sloupec `status` do tabulky `reservations`.
- **Menu** – CRUD pro kategorie a polozky (CZ/EN nazvy, popisy, cena, razeni)
- **Zpetna vazba** – prehled hodnoceni od hostu

---

### Technicke detaily

**Databazove zmeny (jedna migrace):**

```text
-- Enum pro role
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Tabulka user_roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
+ RLS + funkce has_role() (security definer)

-- Tabulka feedback
CREATE TABLE public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
+ RLS: verejny INSERT, admin SELECT

-- Tabulka menu_categories
CREATE TABLE public.menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_cs TEXT NOT NULL,
  title_en TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
+ RLS: verejny SELECT, admin INSERT/UPDATE/DELETE

-- Tabulka menu_items
CREATE TABLE public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.menu_categories(id) ON DELETE CASCADE NOT NULL,
  name_cs TEXT NOT NULL,
  name_en TEXT NOT NULL,
  desc_cs TEXT NOT NULL,
  desc_en TEXT NOT NULL,
  price TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
+ RLS: verejny SELECT, admin INSERT/UPDATE/DELETE

-- Uprava reservations
ALTER TABLE public.reservations ADD COLUMN status TEXT NOT NULL DEFAULT 'pending';
+ UPDATE politika pro admina

-- Seed data: vlozeni stavajicich polozkek menu
```

**Nove soubory:**

| Soubor | Ucel |
|--------|------|
| `src/pages/Reservation.tsx` | Podstranka s rezervacnim formularem |
| `src/pages/Feedback.tsx` | Podstranka s formularem zpetne vazby |
| `src/components/FeedbackSection.tsx` | Formular zpetne vazby |
| `src/pages/AdminLogin.tsx` | Prihlaseni do adminu |
| `src/pages/Admin.tsx` | Admin layout s taby |
| `src/components/admin/ReservationsTab.tsx` | Sprava rezervaci |
| `src/components/admin/MenuTab.tsx` | CRUD menu |
| `src/components/admin/FeedbackTab.tsx` | Prehled zpetne vazby |
| `src/hooks/useAuth.tsx` | Hook pro autentizaci a kontrolu role |

**Upravene soubory:**

| Soubor | Zmena |
|--------|-------|
| `src/App.tsx` | Nove routy: /reservation, /feedback, /admin, /admin/login |
| `src/pages/Index.tsx` | Odebrani ReservationSection, pridani odkazu |
| `src/components/Navbar.tsx` | Odkaz na /reservation pres React Router Link |
| `src/components/HeroSection.tsx` | CTA tlacitko na /reservation |
| `src/components/MenuSection.tsx` | Nacitani dat z DB |
| `src/i18n/translations.ts` | Preklady pro feedback, admin, nove stranky |
| `src/components/Footer.tsx` | Odkaz na /feedback |

