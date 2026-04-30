import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { Activity, Database, Gauge, Home, Settings as SettingsIcon, SlidersHorizontal } from 'lucide-react';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Datasets } from './pages/Datasets';
import { Environments } from './pages/Environments';
import { Landing } from './pages/Landing';
import { Models } from './pages/Models';
import { Settings } from './pages/Settings';

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: Gauge },
  { to: '/environments', label: 'Environments', icon: Activity },
  { to: '/datasets', label: 'Datasets', icon: Database },
  { to: '/models', label: 'Models', icon: SlidersHorizontal },
  { to: '/settings', label: 'Settings', icon: SettingsIcon }
];

function AppNav() {
  const location = useLocation();
  if (location.pathname === '/' || location.pathname.startsWith('/auth')) return null;
  return (
    <nav className="sticky top-0 z-40 flex items-center gap-2 border-b border-white/10 bg-surface px-4 py-2 text-stone-100">
      <NavLink to="/" className="mr-3 flex items-center gap-2 font-medium"><Home size={17} /> RealitySynth</NavLink>
      {nav.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => `flex items-center gap-2 rounded-md px-3 py-2 text-sm ${isActive ? 'bg-primary text-white' : 'text-muted hover:bg-white/5 hover:text-stone-100'}`}><item.icon size={15} /> {item.label}</NavLink>)}
    </nav>
  );
}

export function App() {
  return (
    <>
      <AppNav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/environments" element={<Environments />} />
        <Route path="/datasets" element={<Datasets />} />
        <Route path="/models" element={<Models />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/auth/:mode" element={<Auth />} />
      </Routes>
    </>
  );
}
