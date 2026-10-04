const APP_URL = {
  HOME: '/',
  COUNTER: '/counter',
  FOLDER: '/folder',
  FLATTEN: '/flatten',
  PNG_TINIFY: '/png-tinify',
  USE_REDUCER: '/use-reducer',
  REVERSE_STRING: '/reverse-string',
  PALINDROME: '/palindrome',
  FACTORIAL: '/factorial',
  FIBONACCI: '/fibonacci',
  DUPLICATE_VALUE_REMOVE: '/duplicate-value-remove',
  PRIME_NUMBER: '/prime-number',
  LARGEST_NUMBER: '/largest-number',
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
      {
        id: 24,
        title: 'PNG Tinify',
        path: APP_URL.PNG_TINIFY,
      },
      {
        id: 25,
        title: 'useReducer',
        path: APP_URL.USE_REDUCER,
      },
      {
        id: 26,
        title: 'Reverse String',
        path: APP_URL.REVERSE_STRING,
      },
      {
        id: 27,
        title: 'Palindrome',
        path: APP_URL.PALINDROME,
      },
      {
        id: 28,
        title: 'Factorial',
        path: APP_URL.FACTORIAL,
      },
      {
        id: 29,
        title: 'Fibonacci',
        path: APP_URL.FIBONACCI,
      },
      {
        id: 30,
        title: 'Duplicate Value Remove',
        path: APP_URL.DUPLICATE_VALUE_REMOVE,
      },
      {
        id: 31,
        title: 'Prime Number',
        path: APP_URL.PRIME_NUMBER,
      },
      {
        id: 32,
        title: 'Largest Number',
        path: APP_URL.LARGEST_NUMBER,
      },
    ],
  },
];

export default sidebarList;
