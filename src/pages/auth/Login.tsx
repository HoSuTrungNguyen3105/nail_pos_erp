import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { generateId } from '../../lib/utils'; // Temporary ID generator

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // MOCK LOGIN LOGIC
      // In real app, this would be an API call
      let role: 'admin' | 'provider' | 'distributor' = 'distributor';
      if (formData.email.includes('admin')) role = 'admin';
      if (formData.email.includes('provider')) role = 'provider';

      login('mock_token_' + generateId(), {
        id: generateId(),
        email: formData.email,
        name: formData.email.split('@')[0],
        role: role,
      });

      // Redirect based on role
      if (role === 'provider' || role === 'admin') {
        navigate('/provider/dashboard');
      } else {
        navigate('/distributor/marketplace');
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your dashboard to manage your business"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <div className="flex flex-col gap-1">
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Link to="#" className="text-xs text-[var(--primary)] text-right hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full mt-4" isLoading={isLoading}>
          Sign In
        </Button>

        <div className="text-center text-sm text-[var(--muted-foreground)] mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-[var(--primary)] font-medium hover:underline">
            Register now
          </Link>
        </div>
        
        {/* Helper for demo */}
        <div className="mt-4 p-3 bg-[var(--muted)] rounded-md text-xs text-[var(--muted-foreground)]">
          <p className="font-bold mb-1">Demo Credentials:</p>
          <p>Provider: provider@zota.com</p>
          <p>Distributor: distributor@nail.com</p>
        </div>
      </form>
    </AuthLayout>
  );
}
