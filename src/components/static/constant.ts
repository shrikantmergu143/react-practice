const APP_URL = {
  HOME: '/',
  COUNTER: '/counter',
  FOLDER: '/folder',
  FLATTEN: '/flatten',
};
export { APP_URL };

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
    id: 2,
    title: 'Practice React',
    children: [
      {
        id: 21,
        title: 'Counter',
        path: APP_URL.COUNTER,
      },
      {
        id: 22,
        title: 'Folder',
        path: APP_URL.FOLDER,
      },
      {
        id: 23,
        title: 'Array Flatten',
        path: APP_URL.FLATTEN,
      },
    ],
  },
];

export default sidebarList;
