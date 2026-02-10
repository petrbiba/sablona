import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Trash2, Plus, Pencil } from "lucide-react";

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

const emptyCategory = { title_cs: "", title_en: "", sort_order: 0 };
const emptyItem = { category_id: "", name_cs: "", name_en: "", desc_cs: "", desc_en: "", price: "", sort_order: 0 };

const MenuTab = () => {
  const { t } = useLanguage();
  const qc = useQueryClient();
  const [editCat, setEditCat] = useState<(MenuCategory & { isNew?: boolean }) | null>(null);
  const [editItem, setEditItem] = useState<(MenuItem & { isNew?: boolean }) | null>(null);

  const { data: categories = [] } = useQuery({
    queryKey: ["admin-menu-categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("menu_categories" as any).select("*").order("sort_order");
      if (error) throw error;
      return data as unknown as MenuCategory[];
    },
  });

  const { data: items = [] } = useQuery({
    queryKey: ["admin-menu-items"],
    queryFn: async () => {
      const { data, error } = await supabase.from("menu_items" as any).select("*").order("sort_order");
      if (error) throw error;
      return data as unknown as MenuItem[];
    },
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-menu-categories"] });
    qc.invalidateQueries({ queryKey: ["admin-menu-items"] });
  };

  const saveCat = useMutation({
    mutationFn: async (cat: typeof editCat) => {
      if (!cat) return;
      if (cat.isNew) {
        const { error } = await supabase.from("menu_categories" as any).insert({
          title_cs: cat.title_cs, title_en: cat.title_en, sort_order: cat.sort_order,
        } as any);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("menu_categories" as any).update({
          title_cs: cat.title_cs, title_en: cat.title_en, sort_order: cat.sort_order,
        } as any).eq("id", cat.id);
        if (error) throw error;
      }
    },
    onSuccess: () => { invalidate(); setEditCat(null); toast.success("Saved"); },
  });

  const deleteCat = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("menu_categories" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const saveItem = useMutation({
    mutationFn: async (item: typeof editItem) => {
      if (!item) return;
      const payload = {
        category_id: item.category_id, name_cs: item.name_cs, name_en: item.name_en,
        desc_cs: item.desc_cs, desc_en: item.desc_en, price: item.price, sort_order: item.sort_order,
      };
      if (item.isNew) {
        const { error } = await supabase.from("menu_items" as any).insert(payload as any);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("menu_items" as any).update(payload as any).eq("id", item.id);
        if (error) throw error;
      }
    },
    onSuccess: () => { invalidate(); setEditItem(null); toast.success("Saved"); },
  });

  const deleteItem = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("menu_items" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Kategorie</h3>
          <Button size="sm" variant="outline" onClick={() => setEditCat({ id: "", ...emptyCategory, isNew: true })}>
            <Plus size={14} className="mr-1" /> {t.admin.addCategory}
          </Button>
        </div>

        {editCat && (
          <div className="border border-border rounded-md p-4 mb-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input placeholder={t.admin.titleCs} value={editCat.title_cs} onChange={(e) => setEditCat({ ...editCat, title_cs: e.target.value })} />
              <Input placeholder={t.admin.titleEn} value={editCat.title_en} onChange={(e) => setEditCat({ ...editCat, title_en: e.target.value })} />
              <Input type="number" placeholder={t.admin.sortOrder} value={editCat.sort_order} onChange={(e) => setEditCat({ ...editCat, sort_order: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => saveCat.mutate(editCat)}>{t.admin.save}</Button>
              <Button size="sm" variant="outline" onClick={() => setEditCat(null)}>{t.admin.cancel}</Button>
            </div>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.admin.titleCs}</TableHead>
              <TableHead>{t.admin.titleEn}</TableHead>
              <TableHead>{t.admin.sortOrder}</TableHead>
              <TableHead>{t.admin.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.title_cs}</TableCell>
                <TableCell>{c.title_en}</TableCell>
                <TableCell>{c.sort_order}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => setEditCat(c)}><Pencil size={14} /></Button>
                    <Button size="sm" variant="ghost" onClick={() => deleteCat.mutate(c.id)}><Trash2 size={14} /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Items */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Položky</h3>
          <Button size="sm" variant="outline" onClick={() => setEditItem({ id: "", ...emptyItem, category_id: categories[0]?.id || "", isNew: true })}>
            <Plus size={14} className="mr-1" /> {t.admin.addItem}
          </Button>
        </div>

        {editItem && (
          <div className="border border-border rounded-md p-4 mb-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <select
                value={editItem.category_id}
                onChange={(e) => setEditItem({ ...editItem, category_id: e.target.value })}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                {categories.map((c) => <option key={c.id} value={c.id}>{c.title_cs}</option>)}
              </select>
              <Input type="number" placeholder={t.admin.sortOrder} value={editItem.sort_order} onChange={(e) => setEditItem({ ...editItem, sort_order: parseInt(e.target.value) || 0 })} />
              <Input placeholder={t.admin.nameCs} value={editItem.name_cs} onChange={(e) => setEditItem({ ...editItem, name_cs: e.target.value })} />
              <Input placeholder={t.admin.nameEn} value={editItem.name_en} onChange={(e) => setEditItem({ ...editItem, name_en: e.target.value })} />
              <Input placeholder={t.admin.descCs} value={editItem.desc_cs} onChange={(e) => setEditItem({ ...editItem, desc_cs: e.target.value })} />
              <Input placeholder={t.admin.descEn} value={editItem.desc_en} onChange={(e) => setEditItem({ ...editItem, desc_en: e.target.value })} />
              <Input placeholder={t.admin.price} value={editItem.price} onChange={(e) => setEditItem({ ...editItem, price: e.target.value })} />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => saveItem.mutate(editItem)}>{t.admin.save}</Button>
              <Button size="sm" variant="outline" onClick={() => setEditItem(null)}>{t.admin.cancel}</Button>
            </div>
          </div>
        )}

        {categories.map((cat) => {
          const catItems = items.filter((i) => i.category_id === cat.id);
          if (catItems.length === 0) return null;
          return (
            <div key={cat.id} className="mb-6">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">{cat.title_cs}</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.admin.nameCs}</TableHead>
                    <TableHead>{t.admin.nameEn}</TableHead>
                    <TableHead>{t.admin.price}</TableHead>
                    <TableHead>{t.admin.sortOrder}</TableHead>
                    <TableHead>{t.admin.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {catItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name_cs}</TableCell>
                      <TableCell>{item.name_en}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.sort_order}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => setEditItem(item)}><Pencil size={14} /></Button>
                          <Button size="sm" variant="ghost" onClick={() => deleteItem.mutate(item.id)}><Trash2 size={14} /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuTab;
