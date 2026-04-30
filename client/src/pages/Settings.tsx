import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';
import { Page } from './Environments';

export function Settings() {
  const { user, logout } = useAuthStore();
  return <Page title="Settings"><Card className="max-w-xl"><div className="text-sm text-muted">Account</div><div className="mt-2 text-lg">{user?.name ?? 'Local Demo User'}</div><div className="text-sm text-muted">{user?.email ?? 'demo@realitysynth.local'}</div><Button className="mt-5" onClick={logout}>Log out</Button></Card></Page>;
}
