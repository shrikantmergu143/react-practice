/* eslint-disable prettier/prettier */
import React from 'react';
import layoutStyle from '../../styles/layoutStyle';

const SidebarMenu = React.lazy(() => import('../Sidebar/SidebarMenu'));

export default function DashboardLayout({children}: any) {
  return (
    <React.Suspense fallback={<React.Suspense />}>
      <section className={layoutStyle.layout_wrappper}>
        <div className={layoutStyle.layout_content}>
          <SidebarMenu />
          <main className={layoutStyle.child_content}>
            <header className={layoutStyle.navbar}>Navbar</header>
            {children}
          </main>
        </div>
      </section>
    </React.Suspense>
  );
}
