import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";

const ReservationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", date: "", time: "", guests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t.reservation.success);
    setFormData({ name: "", email: "", phone: "", date: "", time: "", guests: "" });
  };

  return (
    <section id="reservation" className="py-32 px-6 bg-secondary/30" ref={ref}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-primary text-xs uppercase tracking-[0.3em] mb-4"
        >
          {t.reservation.label}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-semibold mb-12"
        >
          {t.reservation.title}
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder={t.reservation.name}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-background border-border/50 h-12 text-sm placeholder:text-muted-foreground/50 focus:border-primary"
            />
            <Input
              type="email"
              placeholder={t.reservation.email}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-background border-border/50 h-12 text-sm placeholder:text-muted-foreground/50 focus:border-primary"
            />
            <Input
              type="tel"
              placeholder={t.reservation.phone}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="bg-background border-border/50 h-12 text-sm placeholder:text-muted-foreground/50 focus:border-primary"
            />
            <Input
              type="number"
              min={1}
              max={12}
              placeholder={t.reservation.guests}
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              required
              className="bg-background border-border/50 h-12 text-sm placeholder:text-muted-foreground/50 focus:border-primary"
            />
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="bg-background border-border/50 h-12 text-sm text-foreground focus:border-primary"
            />
            <Input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
              className="bg-background border-border/50 h-12 text-sm text-foreground focus:border-primary"
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs uppercase tracking-[0.3em] transition-all duration-500 rounded-none"
          >
            {t.reservation.submit}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default ReservationSection;
