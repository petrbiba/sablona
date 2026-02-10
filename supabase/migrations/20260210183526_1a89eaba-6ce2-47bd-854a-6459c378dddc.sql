
-- 1. Add admin DELETE policy for reservations
CREATE POLICY "Admins can delete reservations"
  ON public.reservations FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 2. Rate limiting for feedback (max 3 per email per hour)
CREATE INDEX IF NOT EXISTS idx_feedback_email_created ON public.feedback(email, created_at);

CREATE OR REPLACE FUNCTION public.check_feedback_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (
    SELECT count(*) FROM public.feedback
    WHERE email = NEW.email AND created_at > now() - interval '1 hour'
  ) >= 3 THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again later.';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER feedback_rate_limit
  BEFORE INSERT ON public.feedback
  FOR EACH ROW
  EXECUTE FUNCTION public.check_feedback_rate_limit();

-- 3. Rate limiting for reservations (max 5 per email per day)
CREATE INDEX IF NOT EXISTS idx_reservations_email_created ON public.reservations(email, created_at);

CREATE OR REPLACE FUNCTION public.check_reservation_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (
    SELECT count(*) FROM public.reservations
    WHERE email = NEW.email AND created_at > now() - interval '1 day'
  ) >= 5 THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again later.';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER reservation_rate_limit
  BEFORE INSERT ON public.reservations
  FOR EACH ROW
  EXECUTE FUNCTION public.check_reservation_rate_limit();
