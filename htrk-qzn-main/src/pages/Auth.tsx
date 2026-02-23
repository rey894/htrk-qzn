import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import quezonMunicipalBg from '@/assets/quezon-municipal-bg.jpg';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  
  const { signIn, signUp, resetPassword, user, loading, isAdmin, isBAC } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If user is already authenticated and on auth page, redirect to admin
    // This handles cases where user refreshes or comes back to auth page
    if (user && !loading && location.pathname === '/auth') {
      // Redirect immediately - let dashboard handle role checking
      navigate('/admin', { replace: true });
    }
  }, [user, loading, navigate, location.pathname]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      toast({
        title: "Success",
        description: "Signed in successfully!",
      });
      // Navigate immediately after successful login
      // The dashboard will handle loading state while roles are fetched
      navigate('/admin', { replace: true });
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setError(null);
    setResetSuccess(false);

    if (!resetEmail) {
      setError('Please enter your email address');
      setResetLoading(false);
      return;
    }

    const { error } = await resetPassword(resetEmail);
    
    if (error) {
      setError(error.message);
      setResetLoading(false);
    } else {
      setResetSuccess(true);
      setResetLoading(false);
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your email for password reset instructions.",
      });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await signUp(email, password, fullName);
    
    if (error) {
      setError(error.message);
    } else {
      toast({
        title: "Success",
        description: "Account created! Please check your email to verify your account.",
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <SEOHelmet
        title="Admin Login"
        description="Access the admin dashboard for content management"
        noindex={true}
      />
      
      <div 
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{
          backgroundImage: `url(${quezonMunicipalBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Blur and overlay effect */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background/40 to-secondary/30"></div>
        
        {/* Content */}
        <Card className="w-full max-w-md relative z-10 shadow-2xl border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
            <CardDescription>
              Sign in to manage website content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                {!showResetPassword ? (
                  <form onSubmit={handleSignIn} className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="admin@quezonbukidnon.gov.ph"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="signin-password">Password</Label>
                        <Button
                          type="button"
                          variant="link"
                          className="h-auto p-0 text-xs"
                          onClick={() => {
                            setShowResetPassword(true);
                            setResetEmail(email);
                            setError(null);
                          }}
                        >
                          Forgot password?
                        </Button>
                      </div>
                      <div className="relative">
                        <Input
                          id="signin-password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    {resetSuccess ? (
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                          Password reset email sent! Please check your inbox and follow the instructions to reset your password.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <>
                        {error && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}
                        
                        <div className="space-y-2">
                          <Label htmlFor="reset-email">Email</Label>
                          <Input
                            id="reset-email"
                            type="email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            required
                            placeholder="Enter your email address"
                          />
                          <p className="text-sm text-muted-foreground">
                            Enter your email address and we'll send you a link to reset your password.
                          </p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                              setShowResetPassword(false);
                              setResetEmail('');
                              setError(null);
                              setResetSuccess(false);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" className="flex-1" disabled={resetLoading}>
                            {resetLoading ? 'Sending...' : 'Send Reset Link'}
                          </Button>
                        </div>
                      </>
                    )}
                  </form>
                )}
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-4 text-center">
              <Button variant="link" onClick={() => navigate('/')}>
                Back to Website
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}