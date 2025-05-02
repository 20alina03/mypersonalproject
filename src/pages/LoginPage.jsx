
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    if (!password) errors.password = "Password is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const success = await login(email, password);
    if (success) {
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-atlas-lightblue/20 to-atlas-teal/20">
      <div className="absolute inset-0 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069')] opacity-[0.03] z-0"></div>
      
      <div className="w-full max-w-md z-10">
        <div className="mb-8 text-center animate-fade-in">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:scale-105 transition-transform">
            <MapPin className="h-10 w-10 text-atlas-teal" strokeWidth={2.5} />
            <span className="text-4xl font-bold bg-gradient-to-r from-atlas-teal to-atlas-navy bg-clip-text text-transparent">
              Atlas
            </span>
          </Link>
          <p className="mt-2 text-muted-foreground">Your Personal Travel Journey</p>
        </div>
        
        <Card className="border-atlas-teal/20 shadow-lg animate-scale-in overflow-hidden">
          <div className="absolute top-0 h-1 w-full bg-gradient-to-r from-atlas-teal via-atlas-lightblue to-atlas-navy"></div>
          
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue your journey
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="hello@example.com" 
                    className={`pl-10 ${formErrors.email ? 'border-red-300 focus-visible:ring-red-300' : ''}`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (formErrors.email) {
                        const newErrors = {...formErrors};
                        delete newErrors.email;
                        setFormErrors(newErrors);
                      }
                    }}
                  />
                  {formErrors.email && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className={`pl-10 ${formErrors.password ? 'border-red-300 focus-visible:ring-red-300' : ''}`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (formErrors.password) {
                        const newErrors = {...formErrors};
                        delete newErrors.password;
                        setFormErrors(newErrors);
                      }
                    }}
                  />
                  {formErrors.password && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.password}</p>
                  )}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col">
              <Button 
                type="submit" 
                className="w-full mb-4 bg-gradient-to-r from-atlas-teal to-atlas-lightblue hover:from-atlas-teal/90 hover:to-atlas-lightblue/90 transition-all group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Signing In
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
              
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline font-medium transition-colors hover:text-atlas-teal">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Atlas. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
