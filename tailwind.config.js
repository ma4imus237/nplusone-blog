/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./layouts/**/*.html', './content/**/*.md'],
  theme: {
    extend: {
      colors: {
        fg: 'rgb(40, 40, 40)',
        'fg-muted': 'rgb(103, 103, 103)',
        'fg-nav': 'rgb(60, 56, 54)',
      },
      fontFamily: {
        serif: ['"Iowan Old Style"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
        logo: ['"Space Grotesk"', 'monospace'],
      },
      fontSize: {
        body: ['17px', { lineHeight: '1.7' }],
        nav: ['15px', { lineHeight: '1.5' }],
        logo: ['17px', { lineHeight: '1.5' }],
        footer: ['14.4px', { lineHeight: '1.5' }],
        'blog-title': ['1.6rem', { lineHeight: '1.4' }],
        'post-title': ['1.75rem', { lineHeight: '1.4' }],
        'h2': ['1.45rem', { lineHeight: '1.4' }],
        'h3': ['1.35rem', { lineHeight: '1.4' }],
      },
      maxWidth: {
        content: '711px',
      },
      spacing: {
        'gap-date': '2rem',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-in-out',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.fg'),
            '--tw-prose-headings': theme('colors.fg'),
            '--tw-prose-links': theme('colors.fg'),
            '--tw-prose-bold': theme('colors.fg'),
            '--tw-prose-quotes': theme('colors.fg-muted'),
            fontFamily: theme('fontFamily.serif').join(', '),
            fontSize: '17px',
            lineHeight: '1.7',
            h2: {
              fontSize: theme('fontSize.h2[0]'),
              fontWeight: '600',
            },
            h3: {
              fontSize: theme('fontSize.h3[0]'),
              fontWeight: '400',
              fontStyle: 'italic',
            },
            a: {
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              '&:hover': {
                opacity: '0.7',
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
