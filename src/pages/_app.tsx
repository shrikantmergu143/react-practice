import type { AppProps } from "next/app";
import "./../styles/App.css";
import "./../styles/index.css";

import SettingsProvider from "../components/context/SettingsContext";
import DashboardLayout from "../PageComponent/Layout/DashboardLayout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </SettingsProvider>
  );
}