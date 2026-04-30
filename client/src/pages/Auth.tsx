import { FormEvent, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';

export function Auth() {
  const { mode = 'login' } = useParams();
  const isRegister = mode === 'register';
  const navigate = useNavigate();
  const { login, register } = useAuthStore();
  const [error, setError] = useState('');
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      if (isRegister) await register(String(form.get('email')), String(form.get('password')), String(form.get('name')));
      else await login(String(form.get('email')), String(form.get('password')));
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    }
  };
  return <div className="grid min-h-screen place-items-center bg-ink p-6 text-stone-100"><Card className="w-full max-w-md"><h1 className="text-2xl font-medium">{isRegister ? 'Create account' : 'Welcome back'}</h1><form className="mt-5 grid gap-3" onSubmit={submit}>{isRegister && <input name="name" required className="rounded-md border border-white/10 bg-ink px-3 py-2" placeholder="Name" />}<input name="email" required type="email" className="rounded-md border border-white/10 bg-ink px-3 py-2" placeholder="Email" /><input name="password" required type="password" className="rounded-md border border-white/10 bg-ink px-3 py-2" placeholder="Password" />{error && <div className="text-sm text-alert">{error}</div>}<Button variant="primary">{isRegister ? 'Register' : 'Login'}</Button></form><div className="mt-4 text-sm text-muted">{isRegister ? <Link to="/auth/login">Already have an account?</Link> : <Link to="/auth/register">Need an account?</Link>}</div></Card></div>;
}
