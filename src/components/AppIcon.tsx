/* eslint-disable prettier/prettier */
import type { ReactNode, SVGProps } from "react";

export type AppIconName =
  | "circle-caret-down"
  | "circle-caret-up"
  | "circle-caret-right"
type AppIconProps = SVGProps<SVGSVGElement> & {
  name: AppIconName;
  size?: number;
};

const paths: Record<AppIconName, ReactNode> = {
      "circle-caret-down": null,
      "circle-caret-up": null,
      "circle-caret-right": null,
}
export default function AppIcon({ name, size = 18, className = "", ...props }: AppIconProps) {
    const customIcons: Partial<Record<AppIconName, { viewBox: string; aspectRatio: number; paths: ReactNode }>> = {
        "circle-caret-down": {
            viewBox: "0 0 512 512",
            aspectRatio: 1,
            paths: (
                <>
               <path fill="currentColor" d="M256 0a256 256 0 1 0 0 512 256 256 0 1 0 0-512zm0 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9S142.5 192 152 192l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/>
                </>
            ),
        },
        "circle-caret-up": {
            viewBox: "0 0 576 576",
            aspectRatio: 1,
            paths: (
                <>
                <path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM320 224C326.7 224 333 226.8 337.6 231.7L441.6 343.7C448.1 350.7 449.8 360.9 446 369.6C442.2 378.3 433.5 384 424 384L216 384C206.5 384 197.8 378.3 194 369.6C190.2 360.9 191.9 350.7 198.4 343.7L302.4 231.7C306.9 226.8 313.3 224 320 224z"/>
                </>
            ),
        },
        "circle-caret-right": {
            viewBox: "0 0 512 512",
            aspectRatio: 1,
            paths: (
                <>
                <path fill="currentColor" d="M0 256a256 256 0 1 0 512 0 256 256 0 1 0 -512 0zm352 0c0 6.7-2.8 13-7.7 17.6l-112 104c-7 6.5-17.2 8.2-25.9 4.4S192 369.5 192 360l0-208c0-9.5 5.7-18.2 14.4-22s18.9-2.1 25.9 4.4l112 104c4.9 4.5 7.7 10.9 7.7 17.6z"/>
                </>
            ),
        },
    }
    const customIcon = customIcons[name];
    if (customIcon) {
        return (
        <svg
            aria-hidden="true"
            className={`product_app_svg_icon ${className}`.trim()}
            width={size}
            height={size * customIcon.aspectRatio}
            viewBox={customIcon.viewBox}
            fill="none"
            focusable="false"
            {...props}
        >
            {customIcon.paths}
        </svg>
        );
    }
      return (
        <svg
        aria-hidden="true"
        className={`product_app_svg_icon ${className}`.trim()}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        {...props}
        >
        {paths[name]}
        </svg>
    );
}