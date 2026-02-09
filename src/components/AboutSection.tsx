import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import chefImage from "@/assets/chef.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="about" className="py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary text-xs uppercase tracking-[0.3em] mb-4">{t.about.label}</p>
          <h2 className="text-4xl md:text-5xl font-semibold mb-8 leading-tight">
            {t.about.title1}<br />{t.about.title2}
          </h2>
          <div className="w-16 h-px bg-primary mb-8" />
          <p className="text-muted-foreground leading-relaxed mb-6 font-light">{t.about.p1}</p>
          <p className="text-muted-foreground leading-relaxed font-light">{t.about.p2}</p>
          <div className="mt-10 flex gap-12">
            <div>
              <p className="text-3xl font-['Playfair_Display'] text-primary font-semibold">12</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{t.about.years}</p>
            </div>
            <div>
              <p className="text-3xl font-['Playfair_Display'] text-primary font-semibold">1★</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{t.about.michelin}</p>
            </div>
            <div>
              <p className="text-3xl font-['Playfair_Display'] text-primary font-semibold">98</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{t.about.rating}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img src={chefImage} alt="Šéfkuchař" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-primary/30" />
          <div className="absolute -top-6 -right-6 w-32 h-32 border border-primary/30" />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
