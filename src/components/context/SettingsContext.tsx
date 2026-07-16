/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

/* =======================
   TYPES
======================= */

export interface AppearanceSettings {
  theme: 'light' | 'dark';
  mode: 'default' | 'compact';
}

export interface LayoutSettings {
  sidebarWidth: string;
  navbarHeight: string;
  contentPadding: number;
  borderRadius: number;
  containerWidth: string;
}

export interface FontWeightSettings {
  regular: number;
  medium: number;
  semibold: number;
  bold: number;
}

export interface TypographySettings {
  fontFamily: string;

  body: number;
  small: number;
  caption: number;

  title: number;

  heading1: number;
  heading2: number;
  heading3: number;
  heading4: number;
  heading5: number;
  heading6: number;

  subtitle: number;

  fontWeight: FontWeightSettings;
}

export interface ColorSettings {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  info: string;

  text: string;
  heading: string;
  subtitle: string;
  body: string;
  muted: string;

  background: string;
  foreground: string;
  sidebar: string;
  navbar: string;

  card: string;
  border: string;
  divider: string;

  hover: string;
  active: string;
  selected: string;

  link: string;
  linkHover: string;
}

export interface EffectSettings {
  shadow: string;
  transition: string;
}

export interface DashboardSettings {
  appearance: AppearanceSettings;
  layout: LayoutSettings;
  typography: TypographySettings;
  colors: ColorSettings;
  effects: EffectSettings;
}

const defaultSettings: DashboardSettings = {
  appearance: {
    theme: 'light', // light | dark
    mode: 'default', // default | compact
  },

  layout: {
    sidebarWidth: '260px',
    navbarHeight: '64px',
    contentPadding: 16,
    borderRadius: 12,
    containerWidth: '100%',
  },

  typography: {
    fontFamily: 'Inter, sans-serif',

    body: 16,
    small: 14,
    caption: 12,

    title: 30,
    heading1: 28,
    heading2: 24,
    heading3: 20,
    heading4: 18,
    heading5: 16,
    heading6: 14,

    subtitle: 18,

    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  colors: {
    /* Brand */
    primary: '#2563EB',
    secondary: '#64748B',
    success: '#16A34A',
    warning: '#F59E0B',
    danger: '#DC2626',
    info: '#0891B2',

    /* Text */
    text: '#111827',
    heading: '#111827',
    subtitle: '#374151',
    body: '#4B5563',
    muted: '#6B7280',

    /* Background */
    background: '#F8FAFC',
    foreground: '#FFFFFF',
    sidebar: '#FFFFFF',
    navbar: '#FFFFFF',

    /* Surface */
    card: '#FFFFFF',
    border: '#E5E7EB',
    divider: '#F1F5F9',

    /* Action */
    hover: '#F3F4F6',
    active: '#DBEAFE',
    selected: '#EFF6FF',

    /* Links */
    link: '#2563EB',
    linkHover: '#1D4ED8',
  },

  effects: {
    shadow: '0 2px 10px rgba(0,0,0,.08)',
    transition: '300ms',
  },
};

interface SettingsContextType {
  settings: DashboardSettings;

  updateSection: <T extends keyof DashboardSettings, K extends keyof DashboardSettings[T]>(
    section: T,
    key: K,
    value: DashboardSettings[T][K],
  ) => void;

  updateNested: <
    T extends keyof DashboardSettings,
    G extends keyof DashboardSettings[T],
    K extends keyof DashboardSettings[T][G],
  >(
    section: T,
    group: G,
    key: K,
    value: DashboardSettings[T][G][K],
  ) => void;

  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSection: () => {},
  updateNested: () => {},
  resetSettings: () => {},
});
interface ISettingProvider {
  children?: React.ReactNode;
}
const SettingsProvider = ({ children }: ISettingProvider) => {
  const [settings, setSettings] = useState<DashboardSettings>(() => {
    const saved = localStorage.getItem('dashboard-settings');

    return saved ? (JSON.parse(saved) as DashboardSettings) : defaultSettings;
  });
  useEffect(() => {
    localStorage.setItem('dashboard-settings', JSON.stringify(settings));

    const root = document.documentElement;

    /* Layout */
    root.style.setProperty('--sidebar-width', settings.layout.sidebarWidth);

    root.style.setProperty('--navbar-height', settings.layout.navbarHeight);

    root.style.setProperty('--content-padding', `${settings.layout.contentPadding}px`);

    root.style.setProperty('--radius', `${settings.layout.borderRadius}px`);

    root.style.setProperty('--container-width', settings.layout.containerWidth);

    /* Typography */
    root.style.setProperty('--font-family', settings.typography.fontFamily);

    Object.entries(settings.typography).forEach(([key, value]) => {
      if (typeof value === 'number') {
        root.style.setProperty(`--font-${key}`, `${value}px`);
      }
    });

    /* Colors */
    Object.entries(settings.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    /* Effects */
    root.style.setProperty('--shadow', settings.effects.shadow);

    root.style.setProperty('--transition', settings.effects.transition);

    document.documentElement.classList.toggle('dark', settings.appearance.theme === 'dark');
  }, [settings]);

  const updateSection: SettingsContextType['updateSection'] = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const updateNested: SettingsContextType['updateNested'] = (section, group, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [group]: {
          ...(prev[section][group] as object),
          [key]: value,
        },
      },
    }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const value = useMemo(() => {
    return {
      settings,
      updateSection,
      updateNested,
      resetSettings,
    };
  }, [settings]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
export default SettingsProvider;
export const useSettings = () => useContext(SettingsContext);
