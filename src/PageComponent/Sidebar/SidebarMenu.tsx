/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */

import sidebarStyle from '../../styles/sidebarStyle';
import sidebarList from '../../components/static/constant';
import React from 'react';
const Scrollbar = React.lazy(() => import('../../components/Scrollbar'));
const MenuItem = React.lazy(() => import('./MenuItem'));

export default function SidebarMenu() {
  return (
    <React.Suspense fallback={<React.Fragment />}>
      <aside className={sidebarStyle.wrapper}>
        <div className={sidebarStyle.header}>
          <h2 className={sidebarStyle.logo}>Dashboard</h2>
        </div>

        <Scrollbar style={{ height: 'calc(100vh - calc(var(--navbar-height) + 60px))' }}>
          <div className={sidebarStyle.section}>
            <ul className={sidebarStyle.list}>
              {sidebarList?.map?.((item, index) => (
                <MenuItem item={item} key={index} />
              ))}
            </ul>
          </div>
        </Scrollbar>

        <footer className={sidebarStyle.footer}>
          Settings
        </footer>
      </aside>
    </React.Suspense>
  );
}
