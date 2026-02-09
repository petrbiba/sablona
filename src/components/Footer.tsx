import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-12 px-6 border-t border-border/30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-['Playfair_Display'] text-xl text-primary tracking-wider">AURUM</p>
        <p className="text-muted-foreground text-xs tracking-wider">{t.footer.rights}</p>
      </div>
    </footer>
  );
};

export default Footer;
