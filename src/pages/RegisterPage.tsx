
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const RegisterPage = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    
    // Clear error when field is edited
    if (formErrors[id as keyof FormErrors]) {
      const newErrors = {...formErrors};
      delete newErrors[id as keyof FormErrors];
      setFormErrors(newErrors);
    }
  };

  const validateForm = () => {
    const errors: FormErrors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";
    
    if (!formData.confirmPassword) errors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const fullName = `${formData.firstName} ${formData.lastName}`;
    const success = await register(formData.email, formData.password, fullName);
    
    if (success) {
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-atlas-lightblue/20 to-atlas-teal/20">
      <div className="absolute inset-0 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=2070')] opacity-[0.03] z-0"></div>
      
      <div className="w-full max-w-lg z-10">
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
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Start your journey with Atlas today
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      className={`pl-10 ${formErrors.firstName ? 'border-red-300 focus-visible:ring-red-300' : ''}`}
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {formErrors.firstName && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.firstName}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      className={`pl-10 ${formErrors.lastName ? 'border-red-300 focus-visible:ring-red-300' : ''}`}
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {formErrors.lastName && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="hello@example.com" 
                    className={`pl-10 ${formErrors.email ? 'border-red-300 focus-visible:ring-red-300' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {formErrors.email && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className={`pl-10 ${formErrors.password ? 'border-red-300 focus-visible:ring-red-300' : ''}`}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {formErrors.password && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.password}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="••••••••" 
                    className={`pl-10 ${formErrors.confirmPassword ? 'border-red-300 focus-visible:ring-red-300' : ''}`}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {formErrors.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.confirmPassword}</p>
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
                    Creating Account
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
              
              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium transition-colors hover:text-atlas-teal">
                  Sign in
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

export default RegisterPage;
