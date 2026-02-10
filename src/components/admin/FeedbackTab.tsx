import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star } from "lucide-react";

interface FeedbackRow {
  id: string;
  name: string;
  email: string;
  rating: number;
  message: string;
  created_at: string;
}

const FeedbackTab = () => {
  const { t } = useLanguage();

  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["admin-feedback"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("feedback" as any)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as FeedbackRow[];
    },
  });

  if (isLoading) return <div className="py-8 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t.admin.name}</TableHead>
            <TableHead>{t.admin.email}</TableHead>
            <TableHead>{t.admin.rating}</TableHead>
            <TableHead>{t.admin.message}</TableHead>
            <TableHead>{t.admin.date}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbacks.map((f) => (
            <TableRow key={f.id}>
              <TableCell>{f.name}</TableCell>
              <TableCell>{f.email}</TableCell>
              <TableCell>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className={s <= f.rating ? "fill-primary text-primary" : "text-muted-foreground/30"} />
                  ))}
                </div>
              </TableCell>
              <TableCell className="max-w-xs truncate">{f.message}</TableCell>
              <TableCell className="whitespace-nowrap">{new Date(f.created_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FeedbackTab;
