import { motion } from "framer-motion";
import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const FeedbackSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("feedback" as any).insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        rating,
        message: formData.message.trim(),
      } as any);
      if (error) throw error;
      toast.success(t.feedback.success);
      setFormData({ name: "", email: "", message: "" });
      setRating(0);
    } catch {
      toast.error(t.feedback.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-primary text-xs uppercase tracking-[0.3em] mb-4">
          {t.feedback.label}
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold mb-12">
          {t.feedback.title}
        </h2>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder={t.feedback.name}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              maxLength={100}
              className="bg-background border-border/50 h-12 text-sm placeholder:text-muted-foreground/50 focus:border-primary"
            />
            <Input
              type="email"
              placeholder={t.feedback.email}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              maxLength={255}
              className="bg-background border-border/50 h-12 text-sm placeholder:text-muted-foreground/50 focus:border-primary"
            />
          </div>

          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={32}
                  className={`transition-colors ${
                    star <= (hoveredStar || rating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground/30"
                  }`}
                />
              </button>
            ))}
          </div>

          <textarea
            placeholder={t.feedback.message}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            maxLength={1000}
            rows={4}
            className="w-full bg-background border border-border/50 rounded-md px-3 py-3 text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
          />

          <Button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="w-full h-12 bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs uppercase tracking-[0.3em] transition-all duration-500 rounded-none"
          >
            {isSubmitting ? "..." : t.feedback.submit}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default FeedbackSection;
