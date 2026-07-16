/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
const APP_URL = {
  HOME: '/',
  COUNTER: '/counter',
  FOLDER: '/folder',
};
export { APP_URL };

/* eslint-disable prettier/prettier */
export interface ISidebarItem {
  id: number;
  title: string;
  path?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: ISidebarItem[];
}

const sidebarList: ISidebarItem[] = [
  {
    id: 1,
    title: 'Dashboard',
    path: '/dashboard',
  },
  {
    id: 2,
    title: 'Management',
    children: [
      {
        id: 21,
        title: 'Users',
        path: '/Management/users',
      },
      {
        id: 22,
        title: 'Roles',
        path: '/Management/roles',
      },
      {
        id: 23,
        title: 'Permissions',
        path: '/Management/permissions',
      },
    ],
  },
  {
    id: 3,
    title: 'Products',
    children: [
      {
        id: 31,
        title: 'Products',
        path: '/Products/products',
      },
      {
        id: 32,
        title: 'Categories',
        path: '/Products/categories',
      },
      {
        id: 33,
        title: 'Brands',
        path: '/Products/brands',
      },
    ],
  },
  {
    id: 4,
    title: 'Reports',
    path: '/reports',
  },
  {
    id: 5,
    title: 'Settings',
    children: [
      {
        id: 51,
        title: 'General',
        path: '/Settings/settings',
      },
      {
        id: 52,
        title: 'Theme',
        path: '/Settings/settings/theme',
      },
      {
        id: 53,
        title: 'Security',
        path: '/Settings/settings/security',
      },
    ],
  },
];

export default sidebarList;
