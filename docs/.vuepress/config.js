module.exports = {
  title: 'MELISR documentation',
  base: '/melisr-docs-vuepress/',
  plugins: [
    ['@vuepress/search', {
      searchMaxSuggestions: 10      
    }],
    '@vuepress/back-to-top',
    '@vuepress/last-updated',
    '@vuepress/active-header-links',
    '@vuepress/medium-zoom',
    '@vuepress/nprogress',
  ],
  themeConfig: {
    nav: [
      { text: 'Data entry manual', link: '/data-entry-manual/' },
      { text: 'Additional documents', link: '/additional-documents/' },
    ],
    sidebarDepth: 2,
    sidebar: {
      '/data-entry-manual/': [
        'specify-setup/',
        'using-specify/',
        'querying-specify/',
        {
          title: "Data entry forms",
          children: [
            'data-entry-forms/',
            'data-entry-forms/collection-object-form',
            'data-entry-forms/collection-object-attributes-form',
            'data-entry-forms/collecting-trip-form',
            'data-entry-forms/collecting-event-attribute-form',
            'data-entry-forms/locality-form',
            'data-entry-forms/taxon-form',
            'data-entry-forms/agent-form',
            'data-entry-forms/attachment-forms',
            'data-entry-forms/attachment-metadata-workbench',
            'data-entry-forms/attachment-tools',
          ]
        },
        'transactions/',
        'dna-sequences/',
        'curation-tools/',
        'plugins/',
        {
          title: 'Appendices',
          children: [
            'appendices/appendix-1',
            'appendices/appendix-2',
          ]
        }
      ],
      '/additional-documents/': [
        'melisr-fields-in-avh/',
        ['herbarium-interactions/', 'Herbarium interactions'],
        ['business-case/', 'Business case (2009)'],
        ['specify-dwc-mapping/', 'Specify to Darwin Core mapping']
      ],
      '/': [
        '/'
      ]
    }
  }

}