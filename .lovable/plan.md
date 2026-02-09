

## Vicejazycna podpora (cestina / anglictina)

Pridame prepinac jazyku do navigace a prelozime vsechen textovy obsah stranek do anglictiny. Uzivatele si budou moci prepnout jazyk jednim kliknutim.

### Co se zmeni

**1. Jazykovy system**
- Vytvorime soubor `src/i18n/translations.ts` se vsemi texty v cestine a anglictine (navbar, hero, about, menu, galerie, kontakt, rezervace, paticka).
- Vytvorime React context (`src/i18n/LanguageContext.tsx`) s providerem a hookem `useLanguage()`, ktery zpristupni aktualni jazyk a funkci pro prepnuti.

**2. Prepinac jazyku v navigaci**
- Do komponenty `Navbar.tsx` pridame tlacitko "CZ / EN" (nebo vlajecky), ktere prepina jazyk.
- Bude videt jak na desktopu, tak v mobilnim menu.

**3. Uprava vsech sekci**
- Kazda komponenta (HeroSection, AboutSection, MenuSection, GallerySection, ReservationSection, ContactSection, Footer) zacne pouzivat hook `useLanguage()` a misto pevnych ceskych textu bude cist z prekladoveho slovniku.

### Technicky detail

- Zadna externi knihovna (react-i18next apod.) -- pouzijeme jednoduchy React Context + objekt s preklady.
- Jazyk se ulozi do `localStorage`, aby zustal zachovan pri obnove stranky.
- Struktura prekladu bude organizovana po sekcich:

```text
translations = {
  cs: {
    nav: { home, about, menu, gallery, contact, reservation },
    hero: { subtitle, title, cta },
    about: { ... },
    menu: { ... },
    ...
  },
  en: { ... }
}
```

### Dotcene soubory

| Akce | Soubor |
|------|--------|
| Novy | `src/i18n/translations.ts` |
| Novy | `src/i18n/LanguageContext.tsx` |
| Uprava | `src/App.tsx` -- obalit aplikaci `LanguageProvider` |
| Uprava | `src/components/Navbar.tsx` -- pridat prepinac CZ/EN |
| Uprava | `src/components/HeroSection.tsx` |
| Uprava | `src/components/AboutSection.tsx` |
| Uprava | `src/components/MenuSection.tsx` |
| Uprava | `src/components/GallerySection.tsx` |
| Uprava | `src/components/ReservationSection.tsx` |
| Uprava | `src/components/ContactSection.tsx` |
| Uprava | `src/components/Footer.tsx` |

