

## Vytvoreni admin uctu

### Co udelame

1. **Registracni formular na admin login strance** – Pridame na stranku `/admin/login` moznost prepnout mezi prihlasenim a registraci noveho uctu (email + heslo). Po uspesne registraci se zobrazi hlaska, ze je potreba overit e-mail.

2. **Prirazeni admin role** – Po registraci a overeni e-mailu priradime uctu roli `admin` v tabulce `user_roles` pomoci SQL dotazu. Toto se musi udelat rucne (jednorazove), protoze tabulka `user_roles` nema verejnou `INSERT` politiku – coz je spravne z bezpecnostniho hlediska.

### Kroky implementace

**1. Uprava `src/pages/AdminLogin.tsx`**
- Pridat state pro prepinani mezi "prihlaseni" a "registrace"
- V rezimu registrace zavolat `supabase.auth.signUp()` s `emailRedirectTo: window.location.origin`
- Po uspesne registraci zobrazit informaci o overeni e-mailu
- V rezimu prihlaseni ponechat stavajici logiku

**2. Uprava `src/hooks/useAuth.tsx`**
- Pridat funkci `signUp` (email, password) vedle stavajici `signIn`

**3. Prirazeni admin role (jednorazove)**
- Po registraci a overeni e-mailu spustime SQL prikaz, ktery prida zaznam do `user_roles`:

```text
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users WHERE email = 'vas@email.cz';
```

### Technicke detaily

- Soubory k uprave: `src/pages/AdminLogin.tsx`, `src/hooks/useAuth.tsx`
- Preklady: pridat nove texty do `src/i18n/translations.ts` (registrace, overeni e-mailu)
- Zadne databazove zmeny nejsou potreba – tabulky a politiky uz existuji
