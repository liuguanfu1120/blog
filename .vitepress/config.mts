import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
// Since there is config.mjs, config.mts will be ignored.
export default defineConfig({
  title: "Guan-Fu Liu's blog",
  description: "Record research and life",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Code', link: '/Code/index' },
      { text: 'Reading', link: '/Reading/index' },
      { text: 'Colloquium', link: '/Colloquium/index' },
      { text: 'Notes', link: '/Notes/index' },
    ],

    sidebar: [
      {
        text: 'Code',
        items: [
          { text: 'Python', link: '/Code/Python/index' },
          { text: 'Fortran', link: '/Code/Fortran/index' },
          { text: 'Shell', link: '/Code/Shell/index' },
          { text: 'Git', link: '/Code/Git/index' },

        ]
      },

      {
        text: 'Reading',
        items: [
          { text: 'arXiv', link: '/Reading/arXiv/index' }
        ]
      },
      
      {
        text: 'Colloquium',
        items: [
          { text: '2023', link: '/Colloquium/2023/index' }
        ]
      },

      {
        text: 'Notes',
        items: [
          { text: 'Random', link: '/Notes/Random/index' }
        ]
      },

    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/liuguanfu1120' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Guan-Fu Liu'
    }

  },


  markdown: {
    math: true
  },

  base: '/blog/',
})
