export type Language = "cs" | "en";

export const translations = {
  cs: {
    nav: {
      home: "Domů",
      about: "O nás",
      menu: "Menu",
      gallery: "Galerie",
      contact: "Kontakt",
      reservation: "Rezervace",
    },
    hero: {
      subtitle: "Fine Dining · Praha",
      title: "AURUM",
      tagline: "Kde se tradice setkává s uměním na talíři",
      cta: "Rezervovat stůl",
    },
    about: {
      label: "Náš příběh",
      title1: "Gastronomie",
      title2: "jako umění",
      p1: "Restaurace Aurum se nachází v samém srdci Prahy, kde historie a moderní gastronomie tvoří nezapomenutelný zážitek. Náš šéfkuchař, oceněný Michelinskou hvězdou, přetváří tradiční českou kuchyni do zcela nové podoby.",
      p2: "Každý pokrm vypráví příběh — od pečlivě vybraných lokálních surovin po precizní přípravu, která ctí řemeslnou tradici i inovaci. U nás nejíte — zažíváte.",
      years: "Let tradice",
      michelin: "Michelin",
      rating: "Hodnocení",
    },
    menu: {
      label: "Degustační menu",
      title: "Naše menu",
      tasting: "Degustační menu 7 chodů — 2 890 Kč · S párovými víny — 4 290 Kč",
      categories: [
        {
          title: "Předkrmy",
          items: [
            { name: "Tatarský biftek z českého hovězího", desc: "křepelčí vejce, lanýž, brioche toast", price: "420 Kč" },
            { name: "Hřebenatka Saint-Jacques", desc: "květákový krém, hazelnuts, citrónový olej", price: "580 Kč" },
            { name: "Foie gras terrine", desc: "fíkový chutney, oříšky, domácí brioche", price: "620 Kč" },
          ],
        },
        {
          title: "Hlavní chody",
          items: [
            { name: "Jelení hřbet sous-vide", desc: "kořenová zelenina, borůvková redukce, bramborové pyré", price: "890 Kč" },
            { name: "Candát na másle", desc: "špenátový risotto, parmezán, citronové beurre blanc", price: "780 Kč" },
            { name: "Kachní prso confitované", desc: "červené zelí, jablečný gel, šťáva z portského", price: "720 Kč" },
          ],
        },
        {
          title: "Dezerty",
          items: [
            { name: "Čokoládová sféra Valrhona", desc: "malinové coulis, zlatý list, sorbet", price: "380 Kč" },
            { name: "Crème brûlée z levandule", desc: "madlénky, čerstvé bylinky", price: "320 Kč" },
            { name: "Sýrový výběr", desc: "výběr českých a francouzských sýrů, ořechy, med", price: "450 Kč" },
          ],
        },
      ],
    },
    gallery: {
      label: "Vizuální zážitek",
      title: "Galerie",
    },
    reservation: {
      label: "Váš zážitek čeká",
      title: "Rezervace",
      name: "Jméno a příjmení",
      email: "E-mail",
      phone: "Telefon",
      guests: "Počet hostů",
      submit: "Odeslat rezervaci",
      success: "Děkujeme! Vaši rezervaci potvrdíme e-mailem.",
      error: "Chyba při odesílání rezervace. Zkuste to prosím znovu.",
    },
    contact: {
      label: "Navštivte nás",
      title: "Kontakt",
      address: "Adresa",
      addressValue: "Staroměstské náměstí 12, Praha 1",
      phone: "Telefon",
      phoneValue: "+420 222 333 444",
      emailLabel: "E-mail",
      emailValue: "rezervace@aurum-praha.cz",
      hours: "Otevírací doba",
      hoursValue: "Út–So: 18:00 – 23:00",
    },
    footer: {
      rights: "© 2026 Aurum Praha. Všechna práva vyhrazena.",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      menu: "Menu",
      gallery: "Gallery",
      contact: "Contact",
      reservation: "Reservation",
    },
    hero: {
      subtitle: "Fine Dining · Prague",
      title: "AURUM",
      tagline: "Where tradition meets artistry on a plate",
      cta: "Book a table",
    },
    about: {
      label: "Our Story",
      title1: "Gastronomy",
      title2: "as art",
      p1: "Restaurant Aurum is located in the very heart of Prague, where history and modern gastronomy create an unforgettable experience. Our Michelin-starred chef transforms traditional Czech cuisine into an entirely new form.",
      p2: "Every dish tells a story — from carefully selected local ingredients to precise preparation that honors both craft tradition and innovation. Here you don't just eat — you experience.",
      years: "Years of tradition",
      michelin: "Michelin",
      rating: "Rating",
    },
    menu: {
      label: "Tasting Menu",
      title: "Our Menu",
      tasting: "7-course tasting menu — 2 890 CZK · With wine pairing — 4 290 CZK",
      categories: [
        {
          title: "Starters",
          items: [
            { name: "Czech Beef Tartare", desc: "quail egg, truffle, brioche toast", price: "420 CZK" },
            { name: "Scallop Saint-Jacques", desc: "cauliflower cream, hazelnuts, lemon oil", price: "580 CZK" },
            { name: "Foie Gras Terrine", desc: "fig chutney, nuts, house-made brioche", price: "620 CZK" },
          ],
        },
        {
          title: "Main Courses",
          items: [
            { name: "Venison Loin Sous-Vide", desc: "root vegetables, blueberry reduction, potato purée", price: "890 CZK" },
            { name: "Pike-Perch in Butter", desc: "spinach risotto, parmesan, lemon beurre blanc", price: "780 CZK" },
            { name: "Confit Duck Breast", desc: "red cabbage, apple gel, port wine jus", price: "720 CZK" },
          ],
        },
        {
          title: "Desserts",
          items: [
            { name: "Valrhona Chocolate Sphere", desc: "raspberry coulis, gold leaf, sorbet", price: "380 CZK" },
            { name: "Lavender Crème Brûlée", desc: "madeleines, fresh herbs", price: "320 CZK" },
            { name: "Cheese Selection", desc: "Czech & French cheeses, nuts, honey", price: "450 CZK" },
          ],
        },
      ],
    },
    gallery: {
      label: "Visual Experience",
      title: "Gallery",
    },
    reservation: {
      label: "Your experience awaits",
      title: "Reservation",
      name: "Full name",
      email: "E-mail",
      phone: "Phone",
      guests: "Number of guests",
      submit: "Submit reservation",
      success: "Thank you! We will confirm your reservation by e-mail.",
      error: "Error submitting reservation. Please try again.",
    },
    contact: {
      label: "Visit Us",
      title: "Contact",
      address: "Address",
      addressValue: "Staroměstské náměstí 12, Prague 1",
      phone: "Phone",
      phoneValue: "+420 222 333 444",
      emailLabel: "E-mail",
      emailValue: "rezervace@aurum-praha.cz",
      hours: "Opening Hours",
      hoursValue: "Tue–Sat: 6:00 PM – 11:00 PM",
    },
    footer: {
      rights: "© 2026 Aurum Prague. All rights reserved.",
    },
  },
} as const;
