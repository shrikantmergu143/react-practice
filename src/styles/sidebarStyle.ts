/* eslint-disable prettier/prettier */

const sidebarStyle = {
  wrapper: `w-sidebar h-screen shrink-0 bg-sidebar border-r border-border transition-all duration-300 flex flex-col`,
  header: `h-navbar flex items-center justify-center border-b border-border px-layout`,
  //   section: `flex-1 overflow-y-auto p-layout`,
  footer: `p-layout border-t border-border`,
  logo: `text-title font-bold text-heading`,
  section: `flex-1 overflow-y-auto py-4`,
  list: `flex flex-col gap-1 px-3`,
  item: `flex items-center gap-3 px-4 py-2 rounded-layout text-body text-body transition-all duration-200 hover:bg-hover hover:text-primary cursor-pointer w-full`,
  activeItem: `bg-primary text-white font-semibold shadow-layout`,
  icon: `w-5 h-5 flex items-center justify-center`,
  title: `flex-1 truncate text-left`,
  badge: `min-w-6 px-2 py-0.5 rounded-full text-xs font-medium bg-primary text-white text-center`,
  subList: `ml-6 mt-1 flex flex-col gap-1 border-l border-border pl-3`,
};

export default sidebarStyle;
