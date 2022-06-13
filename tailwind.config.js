module.exports = {
  content: [
    './index.html',
    './src/**/*.{pcss,vue,js,ts}',
  ],
  theme: {
    extend: {
      spacing: {
        ch: '1ch',
        indent: '2ch',
        ln: '2ex',
      },
      cursor: {
        help: 'help',
      },
      fontSize: {
        mono: ['0.875rem', '1.2'],
      },
    },
    colors: {
      curr: 'currentColor',
      tx: 'transparent',
      white: '#ffffff',
      black: '#000000',
      sol: {
        // Base colors
        '03': '#002b36', // L* 15
        '02': '#073642', // L* 20
        '01': '#586e75', // L* 45
        '00': '#657b83', // L* 50
        0: '#839496', // L* 60
        1: '#93a1a1', // L* 65
        2: '#eee8d5', // L* 92 ~90
        3: '#fdf6e3', // L* 97 ~95
        // Accent colors
        y: '#b58900', // yellow; Split comp
        o: '#cb4b16', // orange; Complement
        r: '#dc322f', // red; Triad
        m: '#d33682', // magenta; Tetrad
        v: '#6c71c4', // violet; Analogous
        b: '#268bd2', // blue; Monotone
        c: '#2aa198', // cyan; Analogous
        g: '#859900', // green; Tetrad
      },
    },
    fontFamily: {
      sans: [
        'Inter', // Inter
        'ui-sans-serif', // system
        'system-ui', '-apple-system', 'BlinkMacSystemFont', // macOS
        'sans-serif', // generic fallback
      ],
      mono: [
        '"JetBrains Mono"', // JetBrains Mono
        'ui-monospace', // system
        'monospace', // generic fallback
      ],
    },
  },
  plugins: [],
}
