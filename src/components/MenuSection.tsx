import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface MenuCategory {
  id: string;
  title_cs: string;
  title_en: string;
  sort_order: number;
}

interface MenuItem {
  id: string;
  category_id: string;
  name_cs: string;
  name_en: string;
  desc_cs: string;
  desc_en: string;
  price: string;
  sort_order: number;
}

const MenuSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  const { data: categories = [] } = useQuery({
    queryKey: ["menu-categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("menu_categories" as any).select("*").order("sort_order");
      if (error) throw error;
      return data as unknown as MenuCategory[];
    },
  });

  const { data: items = [] } = useQuery({
    queryKey: ["menu-items"],
    queryFn: async () => {
      const { data, error } = await supabase.from("menu_items" as any).select("*").order("sort_order");
      if (error) throw error;
      return data as unknown as MenuItem[];
    },
  });

  return (
    <section id="menu" className="py-32 px-6 bg-secondary/30" ref={ref}>
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-primary text-xs uppercase tracking-[0.3em] mb-4"
        >
          {t.menu.label}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-semibold"
        >
          {t.menu.title}
        </motion.h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-16">
        {categories.map((category, catIndex) => {
          const catItems = items.filter((i) => i.category_id === category.id);
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + catIndex * 0.15 }}
            >
              <h3 className="text-2xl font-semibold text-primary mb-8 text-center font-['Playfair_Display'] italic">
                {language === "cs" ? category.title_cs : category.title_en}
              </h3>
              <div className="space-y-6">
                {catItems.map((item) => (
                  <div key={item.id} className="group">
                    <div className="flex justify-between items-baseline gap-4">
                      <h4 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors font-['Playfair_Display']">
                        {language === "cs" ? item.name_cs : item.name_en}
                      </h4>
                      <div className="flex-1 border-b border-dotted border-border/50 min-w-[40px] translate-y-[-4px]" />
                      <span className="text-primary font-light text-sm whitespace-nowrap">{item.price}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mt-1 font-light">
                      {language === "cs" ? item.desc_cs : item.desc_en}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="text-center text-muted-foreground text-xs mt-16 uppercase tracking-[0.2em]"
      >
        {t.menu.tasting}
      </motion.p>
    </section>
  );
};

export default MenuSection;
