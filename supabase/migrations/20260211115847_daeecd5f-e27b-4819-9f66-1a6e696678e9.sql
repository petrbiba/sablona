
-- Fix: Restrict reservations SELECT to admins only (contains PII)
DROP POLICY IF EXISTS "Authenticated users can view reservations" ON public.reservations;

CREATE POLICY "Admins can view reservations"
  ON public.reservations FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
