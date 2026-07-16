/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import sidebarStyle from '../../styles/sidebarStyle';
import { ISidebarItem } from '../../components/static/constant';

interface Props {
  item: ISidebarItem;
}

export default function MenuItem({ item }: Props) {
  const [open, setOpen] = useState(false);

  const hasChildren = !!item.children?.length;

  if (hasChildren) {
    return (
      <li>
        <button className={sidebarStyle.item} onClick={() => setOpen(!open)}>
          <span>{item.icon ?? '📁'}</span>

          <span className={sidebarStyle.title}>{item.title}</span>

          <span>{open ? '▾' : '▸'}</span>
        </button>

        {open && (
          <ul className={sidebarStyle.subList}>
            {item.children!.map((child) => (
              <MenuItem key={child.id} item={child} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <NavLink
        to={item.path!}
        className={({ isActive }) =>
          `${sidebarStyle.item} ${isActive ? sidebarStyle.activeItem : ''}`
        }
      >
        <span>{item.icon ?? '📄'}</span>

        <span className={sidebarStyle.title}>{item.title}</span>
      </NavLink>
    </li>
  );
}
