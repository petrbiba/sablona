import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/i18n/LanguageContext";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isRegister) {
      const { error } = await signUp(email, password);
      if (error) {
        toast.error(t.admin.registerError);
      } else {
        toast.success(t.admin.registerSuccess);
        setIsRegister(false);
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(t.admin.loginError);
      } else {
        navigate("/admin");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="font-['Playfair_Display'] text-3xl font-semibold text-primary tracking-wider">AURUM</h1>
          <p className="text-muted-foreground text-sm mt-2 uppercase tracking-[0.2em]">
            {isRegister ? t.admin.register : t.admin.login}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder={t.admin.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 bg-background border-border/50 focus:border-primary"
          />
          <Input
            type="password"
            placeholder={t.admin.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12 bg-background border-border/50 focus:border-primary"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-xs uppercase tracking-[0.3em]"
          >
            {loading ? "..." : isRegister ? t.admin.register : t.admin.signIn}
          </Button>
        </form>
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {isRegister ? t.admin.switchToLogin : t.admin.switchToRegister}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
