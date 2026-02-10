import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const ReservationsTab = () => {
  const { t } = useLanguage();
  const queryClient = useQueryClient();

  const { data: reservations = [], isLoading } = useQuery({
    queryKey: ["admin-reservations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("reservations")
        .update({ status } as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reservations"] });
      toast.success("Status updated");
    },
  });

  const statusLabel = (s: string) => {
    if (s === "confirmed") return t.admin.confirmed;
    if (s === "rejected") return t.admin.rejected;
    return t.admin.pending;
  };

  const statusColor = (s: string) => {
    if (s === "confirmed") return "text-green-500";
    if (s === "rejected") return "text-red-500";
    return "text-yellow-500";
  };

  if (isLoading) return <div className="py-8 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t.admin.name}</TableHead>
            <TableHead>{t.admin.email}</TableHead>
            <TableHead>{t.admin.phone}</TableHead>
            <TableHead>{t.admin.date}</TableHead>
            <TableHead>{t.admin.time}</TableHead>
            <TableHead>{t.admin.guests}</TableHead>
            <TableHead>{t.admin.status}</TableHead>
            <TableHead>{t.admin.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.email}</TableCell>
              <TableCell>{r.phone}</TableCell>
              <TableCell>{r.date}</TableCell>
              <TableCell>{String(r.time)}</TableCell>
              <TableCell>{r.guests}</TableCell>
              <TableCell className={statusColor((r as any).status || "pending")}>
                {statusLabel((r as any).status || "pending")}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => updateStatus.mutate({ id: r.id, status: "confirmed" })}
                    disabled={(r as any).status === "confirmed"}
                  >
                    ✓
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => updateStatus.mutate({ id: r.id, status: "rejected" })}
                    disabled={(r as any).status === "rejected"}
                  >
                    ✗
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReservationsTab;
