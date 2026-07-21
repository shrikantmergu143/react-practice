/* eslint-disable prettier/prettier */
import { useState } from 'react';
import sidebarStyle from '../../styles/sidebarStyle';
import { ISidebarItem } from '../../components/static/constant';
import AppIcon from '../../components/AppIcon';
import AnchorLink from '../../components/common/AnchorLink';

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
          <span className={sidebarStyle.title}>{item.title}</span>
          <span>
            <AppIcon name={open ? 'circle-caret-down' : "circle-caret-right"}/>
          </span>
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
      <AnchorLink
        to={item?.path as string}
        className={({ isActive }) =>
          `${sidebarStyle.item} ${isActive ? sidebarStyle.activeItem : ''}`
        }
      >
        <span className={sidebarStyle.title}>{item.title}</span>
      </AnchorLink>
    </li>
  );
}
