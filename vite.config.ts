import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv } from 'vite'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const currentEnv = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [
      react(),
      AutoImport({
        imports: ['react', 'react-router-dom'],
        dts: './src/auto-imports.d.ts',
        dirs: ['src/store'],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json' // Default `./.eslintrc-auto-import.json`
        }
      })
    ],
    // 项目部署的基础路径,
    base: currentEnv.VITE_PUBLIC_PATH,
    mode,
    resolve: {
      // 别名
      alias: {
        '#@': resolve(__dirname, './src'),
        '#@components': resolve(__dirname, './src/components'),
        '#@store': resolve(__dirname, './src/store'),
        '#@views': resolve(__dirname, './src/views'),
        '#@assets': resolve(__dirname, './src/assets'),
        '#@hooks': resolve(__dirname, './src/hooks'),
        '#@reducers': resolve(__dirname, './src/reducers'),
        '#@utils': resolve(__dirname, './src/utils'),
        '#@types': resolve(__dirname, './types')
      }
    },
    // 服务
    server: {
      port: 6688,
      host: '0.0.0.0',
      // 自定义代理---解决跨域
      proxy: {
        // 选项写法
        '/api': {
          target: '',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      cors: true
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        sass: {
          javascriptEnabled: true
        }
      },
      modules: {
        localsConvention: 'camelCaseOnly'
      }
    },
    // 构建
    build: {
      outDir: `docs`, // 输出路径
      // 构建后是否生成 source map 文件
      sourcemap: mode !== 'production',
      assetsInlineLimit: 4096
      // 打包去掉打印信息 保留debugger vite3需要单独安装terser才行
      // minify: 'terser',
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: false,
      //   },
      // },
    }
  })
}
