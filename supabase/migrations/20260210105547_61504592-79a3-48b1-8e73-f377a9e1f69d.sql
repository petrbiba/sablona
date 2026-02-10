
-- Enum pro role
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Tabulka user_roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer funkce pro kontrolu role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS pro user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Tabulka feedback
CREATE TABLE public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert feedback"
  ON public.feedback FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view feedback"
  ON public.feedback FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Tabulka menu_categories
CREATE TABLE public.menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_cs TEXT NOT NULL,
  title_en TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view menu categories"
  ON public.menu_categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert menu categories"
  ON public.menu_categories FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update menu categories"
  ON public.menu_categories FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete menu categories"
  ON public.menu_categories FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

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

ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view menu items"
  ON public.menu_items FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert menu items"
  ON public.menu_items FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update menu items"
  ON public.menu_items FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete menu items"
  ON public.menu_items FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Uprava reservations - pridani statusu
ALTER TABLE public.reservations ADD COLUMN status TEXT NOT NULL DEFAULT 'pending';

-- Admin muze updatovat rezervace
CREATE POLICY "Admins can update reservations"
  ON public.reservations FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Seed data: menu categories
INSERT INTO public.menu_categories (id, title_cs, title_en, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Předkrmy', 'Starters', 0),
  ('a1000000-0000-0000-0000-000000000002', 'Hlavní chody', 'Main Courses', 1),
  ('a1000000-0000-0000-0000-000000000003', 'Dezerty', 'Desserts', 2);

-- Seed data: menu items
INSERT INTO public.menu_items (category_id, name_cs, name_en, desc_cs, desc_en, price, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Tatarský biftek z českého hovězího', 'Czech Beef Tartare', 'křepelčí vejce, lanýž, brioche toast', 'quail egg, truffle, brioche toast', '420 Kč', 0),
  ('a1000000-0000-0000-0000-000000000001', 'Hřebenatka Saint-Jacques', 'Scallop Saint-Jacques', 'květákový krém, hazelnuts, citrónový olej', 'cauliflower cream, hazelnuts, lemon oil', '580 Kč', 1),
  ('a1000000-0000-0000-0000-000000000001', 'Foie gras terrine', 'Foie Gras Terrine', 'fíkový chutney, oříšky, domácí brioche', 'fig chutney, nuts, house-made brioche', '620 Kč', 2),
  ('a1000000-0000-0000-0000-000000000002', 'Jelení hřbet sous-vide', 'Venison Loin Sous-Vide', 'kořenová zelenina, borůvková redukce, bramborové pyré', 'root vegetables, blueberry reduction, potato purée', '890 Kč', 0),
  ('a1000000-0000-0000-0000-000000000002', 'Candát na másle', 'Pike-Perch in Butter', 'špenátový risotto, parmezán, citronové beurre blanc', 'spinach risotto, parmesan, lemon beurre blanc', '780 Kč', 1),
  ('a1000000-0000-0000-0000-000000000002', 'Kachní prso confitované', 'Confit Duck Breast', 'červené zelí, jablečný gel, šťáva z portského', 'red cabbage, apple gel, port wine jus', '720 Kč', 2),
  ('a1000000-0000-0000-0000-000000000003', 'Čokoládová sféra Valrhona', 'Valrhona Chocolate Sphere', 'malinové coulis, zlatý list, sorbet', 'raspberry coulis, gold leaf, sorbet', '380 Kč', 0),
  ('a1000000-0000-0000-0000-000000000003', 'Crème brûlée z levandule', 'Lavender Crème Brûlée', 'madlénky, čerstvé bylinky', 'madeleines, fresh herbs', '320 Kč', 1),
  ('a1000000-0000-0000-0000-000000000003', 'Sýrový výběr', 'Cheese Selection', 'výběr českých a francouzských sýrů, ořechy, med', 'Czech & French cheeses, nuts, honey', '450 Kč', 2);
