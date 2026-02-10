import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/i18n/LanguageContext";
import ReservationsTab from "@/components/admin/ReservationsTab";
import MenuTab from "@/components/admin/MenuTab";
import FeedbackTab from "@/components/admin/FeedbackTab";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin/login");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">{t.admin.noAccess}</p>
          <Button variant="outline" onClick={signOut}>{t.admin.signOut}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/30 px-6 py-4 flex items-center justify-between">
        <h1 className="font-['Playfair_Display'] text-xl font-semibold text-primary tracking-wider">
          AURUM — {t.admin.dashboard}
        </h1>
        <Button variant="outline" size="sm" onClick={signOut} className="text-xs uppercase tracking-wider">
          {t.admin.signOut}
        </Button>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <Tabs defaultValue="reservations">
          <TabsList className="mb-6">
            <TabsTrigger value="reservations">{t.admin.reservations}</TabsTrigger>
            <TabsTrigger value="menu">{t.admin.menuTab}</TabsTrigger>
            <TabsTrigger value="feedback">{t.admin.feedbackTab}</TabsTrigger>
          </TabsList>
          <TabsContent value="reservations"><ReservationsTab /></TabsContent>
          <TabsContent value="menu"><MenuTab /></TabsContent>
          <TabsContent value="feedback"><FeedbackTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
