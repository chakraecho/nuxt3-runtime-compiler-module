import nuxtRuntimeCompiler from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    nuxtRuntimeCompiler
  ],
  experimental: {
    externalVue: !process.env.NO_EXTERNAL_VUE
  },
  builder: process.env.BUILDER as 'vite' | 'webpack' ?? 'vite',
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => {
        return [
          'math',
          'maction',
          'maligngroup',
          'malignmark',
          'menclose',
          'merror',
          'mfenced',
          'mfrac',
          'mi',
          'mlongdiv',
          'mmultiscripts',
          'mn',
          'mo',
          'mover',
          'mpadded',
          'mphantom',
          'mroot',
          'mrow',
          'ms',
          'mscarries',
          'mscarry',
          'mscarries',
          'msgroup',
          'mstack',
          'mlongdiv',
          'msline',
          'mstack',
          'mspace',
          'msqrt',
          'msrow',
          'mstack',
          'mstack',
          'mstyle',
          'msub',
          'msup',
          'msubsup',
          'mtable',
          'mtd',
          'mtext',
          'mtr',
          'munder',
          'munderover',
          'semantics',
          'math',
          'mi',
          'mn',
          'mo',
          'ms',
          'mspace',
          'mtext',
          'menclose',
          'merror',
          'mfenced',
          'mfrac',
          'mpadded',
          'mphantom',
          'mroot',
          'mrow',
          'msqrt',
          'mstyle',
          'mmultiscripts',
          'mover',
          'mprescripts',
          'msub',
          'msubsup',
          'msup',
          'munder',
          'munderover',
          'none',
          'maligngroup',
          'malignmark',
          'mtable',
          'mtd',
          'mtr',
          'mlongdiv',
          'mscarries',
          'mscarry',
          'msgroup',
          'msline',
          'msrow',
          'mstack',
          'maction',
          'semantics',
          'annotation',
          'annotation-xml'
        ].includes(tag)
      }
    }
  }
})
