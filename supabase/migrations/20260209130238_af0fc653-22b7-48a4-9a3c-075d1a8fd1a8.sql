
CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  guests INTEGER NOT NULL CHECK (guests >= 1 AND guests <= 12),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Anyone can create a reservation (no login required)
CREATE POLICY "Anyone can create reservations"
  ON public.reservations
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users (staff) can view reservations
CREATE POLICY "Authenticated users can view reservations"
  ON public.reservations
  FOR SELECT
  TO authenticated
  USING (true);
