import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

const contactItems = [
  { icon: MapPin, label: "Adresa", value: "Staroměstské náměstí 12, Praha 1" },
  { icon: Phone, label: "Telefon", value: "+420 222 333 444" },
  { icon: Mail, label: "E-mail", value: "rezervace@aurum-praha.cz" },
  { icon: Clock, label: "Otevírací doba", value: "Út–So: 18:00 – 23:00" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-primary text-xs uppercase tracking-[0.3em] mb-4"
        >
          Navštivte nás
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-semibold mb-16"
        >
          Kontakt
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {contactItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex flex-col items-center gap-3"
            >
              <item.icon className="text-primary" size={24} strokeWidth={1.5} />
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.label}</p>
              <p className="text-foreground/80 text-sm font-light">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
