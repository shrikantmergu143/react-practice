/* eslint-disable prettier/prettier */
import React from 'react';
import { Outlet } from 'react-router';
import layoutStyle from '../../styles/layoutStyle';

const SidebarMenu = React.lazy(() => import('../Sidebar/SidebarMenu'));

export default function DashboardLayout() {
  return (
    <React.Suspense fallback={<></>}>
      <section className={layoutStyle.layout_wrappper}>
        <div className={layoutStyle.layout_content}>
          <SidebarMenu />

          <main className={layoutStyle.child_content}>
            <header className={layoutStyle.navbar}>Navbar</header>

            <div className={layoutStyle.page}>
              <div className={layoutStyle.page_container}>
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </section>
    </React.Suspense>
  );
}
