import { defineConfig } from 'vitepress';
import * as S from 'shiki/types.d.mts';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Plume Documentation",
  description: "Official wiki for installing, learning and developing in Plume",
  markdown: {
    async shikiSetup(shiki) {
      const textmate = await fetch('https://raw.githubusercontent.com/plume-lang/vscode-plume/main/syntaxes/plume.tmLanguage.json');
      const plumeTextmate = await textmate.json();

      const lang: S.LanguageRegistration = { ...plumeTextmate, name: 'plume' };

      await shiki.loadLanguage(lang);
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get started', link: '/get-started' },
      { text: 'Standard library', link: '/standard' }
    ],

    sidebar: [
      {
        text: 'Get started', link: '/get-started/', items: [
          { text: 'Installation', link: '/get-started/installation' },
          { text: 'Your First Code', link: '/get-started/first-code' },
        ]
      },
      {
        text: 'Standard library', link: '/standard/', items: [
          { text: 'Interfaces', link: '/standard/classes' },
          {
            text: 'Datatypes', items: [
              { text: 'List', link: '/standard/datatypes/list' },
              { text: 'Boolean', link: '/standard/datatypes/bool' },
              { text: 'Character', link: '/standard/datatypes/char' },
              { text: 'String', link: '/standard/datatypes/string' },
              { text: 'Option', link: '/standard/datatypes/option' },
              { text: 'Result', link: '/standard/datatypes/result' },
              { text: 'Tuple', link: '/standard/datatypes/tuple' },
              { text: 'Unit', link: '/standard/datatypes/unit' },
              { text: 'Number', link: '/standard/datatypes/number' }
            ]
          }
        ]
      },
    ],
  }
})
