import React, { CSSProperties, MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface AnchorLinkProps {
  children: ReactNode;
   className?:
    | string
    | ((props: { isActive: boolean }) => string);
  to?: string;
  target?: "_blank" | "_self";
  id?: string;
  title?: string;
  slash?: boolean;
  style?: CSSProperties;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const AnchorLink: React.FC<AnchorLinkProps> = ({
  children,
  className = "",
  to = "",
  target,
  id,
  title,
  slash = false,
  style,
  onClick,
}) => {
  const router = useRouter();

  const href = slash ? `${to}/` : to;

  const isActive = router.asPath === href;
  const resolvedClassName =
    typeof className === "function"
      ? `${className({ isActive })}${isActive ? " active-link" : ""}`
      : `${className ?? ""} ${isActive ? "active-link" : ""}`;
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick && !to) {
      e.preventDefault();
      onClick(e);
    }
  };

  if (target) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        id={id}
        title={title}
        style={style}
        onClick={handleClick}
        className={resolvedClassName}

      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      id={id}
      title={title}
      style={style}
      onClick={handleClick}
      className={resolvedClassName}
    >
      {children}
    </Link>
  );
};

export default AnchorLink;