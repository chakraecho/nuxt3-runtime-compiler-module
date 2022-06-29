import { defineNuxtModule, isNuxt2, isNuxt3 } from '@nuxt/kit'
import { resolve } from 'pathe'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-runtime-compiler',
    configKey: 'nuxtRuntimeCompiler'
  },
  setup (_options, nuxt) {
    if (isNuxt2(nuxt)) {
      /** override all nuxt default vue aliases to force uses of the full bundle of VueJS  */
      const vueFullCommonPath = 'vue/dist/vue.common.js'
      const aliases = [
        'vue/dist/vue.common.dev',
        'vue/dist/vue.common.dev.js',
        'vue/dist/vue.common',
        'vue/dist/vue.common.js',
        'vue/dist/vue.common.prod',
        'vue/dist/vue.common.prod.js',
        'vue/dist/vue.esm.browser',
        'vue/dist/vue.esm.browser.js',
        'vue/dist/vue.esm.browser.min',
        'vue/dist/vue.esm.browser.min.js',
        'vue/dist/vue.esm',
        'vue/dist/vue.esm.js',
        'vue/dist/vue',
        'vue/dist/vue.js',
        'vue/dist/vue.min',
        'vue/dist/vue.min.js',
        'vue/dist/vue.runtime.common.dev',
        'vue/dist/vue.runtime.common.dev.js',
        'vue/dist/vue.runtime.common',
        'vue/dist/vue.runtime.common.js',
        'vue/dist/vue.runtime.common.prod',
        'vue/dist/vue.runtime.common.prod.js',
        'vue/dist/vue.runtime.esm',
        'vue/dist/vue.runtime.esm.js',
        'vue/dist/vue.runtime',
        'vue/dist/vue.runtime.js',
        'vue/dist/vue.runtime.min',
        'vue/dist/vue.runtime.min.js',
        'vue'
      ].reduce((obj, aliasName) => Object.assign(obj, { [aliasName]: vueFullCommonPath }), {})

      nuxt.options.alias = {
        ...nuxt.options.alias,
        ...aliases
      }
    } else if (isNuxt3(nuxt)) {
      // remove vue 3 mocks
      nuxt.options.alias = {
        ...nuxt.options.alias,
        '@vue/compiler-core': '@vue/compiler-core',
        '@vue/compiler-dom': '@vue/compiler-dom',
        '@vue/compiler-ssr': '@vue/compiler-ssr',
        'vue/server-renderer': 'vue/server-renderer'
      }

      // set vue esm on client
      nuxt.hook('vite:extendConfig', (config, { isClient, isServer }) => {
        if (isClient) {
          config.resolve.alias.vue = 'vue/dist/vue.esm-bundler'
        }
      })
      nuxt.hook('webpack:config', (configuration) => {
        const clientConfig = configuration.find(config => config.name === 'client')
        if (!clientConfig.resolve) { clientConfig.resolve.alias = {} }
        if (Array.isArray(clientConfig.resolve.alias)) {
          clientConfig.resolve.alias.push({
            name: 'vue',
            alias: 'vue/dist/vue.esm-bundler'
          })
        } else {
          clientConfig.resolve.alias.vue = 'vue/dist/vue.esm-bundler'
        }
      })

      // unmock vue
      nuxt.options.nitro.commonJS = {
        dynamicRequireTargets: [
          './node_modules/@vue/compiler-core',
          './node_modules/@vue/compiler-dom',
          './node_modules/@vue/compiler-ssr',
          './node_modules/vue/server-renderer'
        ]
      }
    }
  }
})
