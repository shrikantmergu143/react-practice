/* eslint-disable prettier/prettier */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        /* Brand */
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        info: 'var(--color-info)',

        /* Text */
        text: 'var(--color-text)',
        heading: 'var(--color-heading)',
        subtitle: 'var(--color-subtitle)',
        body: 'var(--color-body)',
        muted: 'var(--color-muted)',

        /* Background */
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        sidebar: 'var(--color-sidebar)',
        navbar: 'var(--color-navbar)',

        /* Surface */
        card: 'var(--color-card)',
        border: 'var(--color-border)',
        divider: 'var(--color-divider)',

        /* States */
        hover: 'var(--color-hover)',
        active: 'var(--color-active)',
        selected: 'var(--color-selected)',

        /* Links */
        link: 'var(--color-link)',
        'link-hover': 'var(--color-linkHover)',
      },

      spacing: {
        layout: 'var(--content-padding)',
      },

      width: {
        sidebar: 'var(--sidebar-width)',
        container: 'var(--container-width)',
      },

      height: {
        navbar: 'var(--navbar-height)',
      },

      borderRadius: {
        layout: 'var(--radius)',
      },

      fontFamily: {
        body: ['var(--font-family)'],
      },

      fontSize: {
        body: 'var(--font-body)',
        small: 'var(--font-small)',
        caption: 'var(--font-caption)',

        title: 'var(--font-title)',

        h1: 'var(--font-heading1)',
        h2: 'var(--font-heading2)',
        h3: 'var(--font-heading3)',
        h4: 'var(--font-heading4)',
        h5: 'var(--font-heading5)',
        h6: 'var(--font-heading6)',

        subtitle: 'var(--font-subtitle)',
      },

      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },

      boxShadow: {
        layout: 'var(--shadow)',
      },

      transitionDuration: {
        layout: 'var(--transition)',
      },
    },
  },

  plugins: [],
};
