// vite.config.ts
import react from "file:///E:/code-lib/react18-vite4-ts-csr/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig, loadEnv } from "file:///E:/code-lib/react18-vite4-ts-csr/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import AutoImport from "file:///E:/code-lib/react18-vite4-ts-csr/node_modules/unplugin-auto-import/dist/vite.js";
var __vite_injected_original_dirname = "E:\\code-lib\\react18-vite4-ts-csr";
var vite_config_default = ({ mode }) => {
  const currentEnv = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      react(),
      AutoImport({
        imports: ["react", "react-router-dom"],
        dts: "./src/auto-imports.d.ts",
        dirs: ["src/store"],
        eslintrc: {
          enabled: true,
          // Default `false`
          filepath: "./.eslintrc-auto-import.json"
          // Default `./.eslintrc-auto-import.json`
        }
      })
    ],
    // 项目部署的基础路径,
    base: currentEnv.VITE_PUBLIC_PATH,
    mode,
    resolve: {
      // 别名
      alias: {
        "#@": resolve(__vite_injected_original_dirname, "./src"),
        "#@components": resolve(__vite_injected_original_dirname, "./src/components"),
        "#@store": resolve(__vite_injected_original_dirname, "./src/store"),
        "#@views": resolve(__vite_injected_original_dirname, "./src/views"),
        "#@assets": resolve(__vite_injected_original_dirname, "./src/assets"),
        "#@hooks": resolve(__vite_injected_original_dirname, "./src/hooks"),
        "#@reducers": resolve(__vite_injected_original_dirname, "./src/reducers"),
        "#@utils": resolve(__vite_injected_original_dirname, "./src/utils"),
        "#@types": resolve(__vite_injected_original_dirname, "./types")
      }
    },
    // 服务
    server: {
      port: 6688,
      host: "0.0.0.0",
      // 自定义代理---解决跨域
      proxy: {
        // 选项写法
        "/api": {
          target: "",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
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
        localsConvention: "camelCaseOnly"
      }
    },
    // 构建
    build: {
      outDir: `docs`,
      // 输出路径
      // 构建后是否生成 source map 文件
      sourcemap: mode !== "production",
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
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RlLWxpYlxcXFxyZWFjdDE4LXZpdGU0LXRzLWNzclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcY29kZS1saWJcXFxccmVhY3QxOC12aXRlNC10cy1jc3JcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2NvZGUtbGliL3JlYWN0MTgtdml0ZTQtdHMtY3NyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCB0eXBlIHsgQ29uZmlnRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfTogQ29uZmlnRW52KSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRFbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIHJlYWN0KCksXG4gICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgaW1wb3J0czogWydyZWFjdCcsICdyZWFjdC1yb3V0ZXItZG9tJ10sXG4gICAgICAgIGR0czogJy4vc3JjL2F1dG8taW1wb3J0cy5kLnRzJyxcbiAgICAgICAgZGlyczogWydzcmMvc3RvcmUnXSxcbiAgICAgICAgZXNsaW50cmM6IHtcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLCAvLyBEZWZhdWx0IGBmYWxzZWBcbiAgICAgICAgICBmaWxlcGF0aDogJy4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb24nIC8vIERlZmF1bHQgYC4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb25gXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgXSxcbiAgICAvLyBcdTk4NzlcdTc2RUVcdTkwRThcdTdGNzJcdTc2ODRcdTU3RkFcdTc4NDBcdThERUZcdTVGODQsXG4gICAgYmFzZTogY3VycmVudEVudi5WSVRFX1BVQkxJQ19QQVRILFxuICAgIG1vZGUsXG4gICAgcmVzb2x2ZToge1xuICAgICAgLy8gXHU1MjJCXHU1NDBEXG4gICAgICBhbGlhczoge1xuICAgICAgICAnI0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICAgICcjQGNvbXBvbmVudHMnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2NvbXBvbmVudHMnKSxcbiAgICAgICAgJyNAc3RvcmUnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3N0b3JlJyksXG4gICAgICAgICcjQHZpZXdzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy92aWV3cycpLFxuICAgICAgICAnI0Bhc3NldHMnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2Fzc2V0cycpLFxuICAgICAgICAnI0Bob29rcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvaG9va3MnKSxcbiAgICAgICAgJyNAcmVkdWNlcnMnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3JlZHVjZXJzJyksXG4gICAgICAgICcjQHV0aWxzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy91dGlscycpLFxuICAgICAgICAnI0B0eXBlcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi90eXBlcycpXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyBcdTY3MERcdTUyQTFcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHBvcnQ6IDY2ODgsXG4gICAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgICAvLyBcdTgxRUFcdTVCOUFcdTRFNDlcdTRFRTNcdTc0MDYtLS1cdTg5RTNcdTUxQjNcdThERThcdTU3REZcbiAgICAgIHByb3h5OiB7XG4gICAgICAgIC8vIFx1OTAwOVx1OTg3OVx1NTE5OVx1NkNENVxuICAgICAgICAnL2FwaSc6IHtcbiAgICAgICAgICB0YXJnZXQ6ICcnLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb3JzOiB0cnVlXG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIC8vIGNzc1x1OTg4NFx1NTkwNFx1NzQwNlx1NTY2OFxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzYXNzOiB7XG4gICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1vZHVsZXM6IHtcbiAgICAgICAgbG9jYWxzQ29udmVudGlvbjogJ2NhbWVsQ2FzZU9ubHknXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyBcdTY3ODRcdTVFRkFcbiAgICBidWlsZDoge1xuICAgICAgb3V0RGlyOiBgZG9jc2AsIC8vIFx1OEY5M1x1NTFGQVx1OERFRlx1NUY4NFxuICAgICAgLy8gXHU2Nzg0XHU1RUZBXHU1NDBFXHU2NjJGXHU1NDI2XHU3NTFGXHU2MjEwIHNvdXJjZSBtYXAgXHU2NTg3XHU0RUY2XG4gICAgICBzb3VyY2VtYXA6IG1vZGUgIT09ICdwcm9kdWN0aW9uJyxcbiAgICAgIGFzc2V0c0lubGluZUxpbWl0OiA0MDk2XG4gICAgICAvLyBcdTYyNTNcdTUzMDVcdTUzQkJcdTYzODlcdTYyNTNcdTUzNzBcdTRGRTFcdTYwNkYgXHU0RkREXHU3NTU5ZGVidWdnZXIgdml0ZTNcdTk3MDBcdTg5ODFcdTUzNTVcdTcyRUNcdTVCODlcdTg4QzV0ZXJzZXJcdTYyNERcdTg4NENcbiAgICAgIC8vIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgICAvLyB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICAvLyAgIGNvbXByZXNzOiB7XG4gICAgICAvLyAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxuICAgICAgLy8gICAgIGRyb3BfZGVidWdnZXI6IGZhbHNlLFxuICAgICAgLy8gICB9LFxuICAgICAgLy8gfSxcbiAgICB9XG4gIH0pXG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdSLE9BQU8sV0FBVztBQUMxUyxTQUFTLGNBQWMsZUFBZTtBQUV0QyxTQUFTLGVBQWU7QUFDeEIsT0FBTyxnQkFBZ0I7QUFKdkIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxDQUFDLEVBQUUsS0FBSyxNQUFpQjtBQUN0QyxRQUFNLGFBQWEsUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQzlDLFNBQU8sYUFBYTtBQUFBLElBQ2xCLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFdBQVc7QUFBQSxRQUNULFNBQVMsQ0FBQyxTQUFTLGtCQUFrQjtBQUFBLFFBQ3JDLEtBQUs7QUFBQSxRQUNMLE1BQU0sQ0FBQyxXQUFXO0FBQUEsUUFDbEIsVUFBVTtBQUFBLFVBQ1IsU0FBUztBQUFBO0FBQUEsVUFDVCxVQUFVO0FBQUE7QUFBQSxRQUNaO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBO0FBQUEsSUFFQSxNQUFNLFdBQVc7QUFBQSxJQUNqQjtBQUFBLElBQ0EsU0FBUztBQUFBO0FBQUEsTUFFUCxPQUFPO0FBQUEsUUFDTCxNQUFNLFFBQVEsa0NBQVcsT0FBTztBQUFBLFFBQ2hDLGdCQUFnQixRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLFFBQ3JELFdBQVcsUUFBUSxrQ0FBVyxhQUFhO0FBQUEsUUFDM0MsV0FBVyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxRQUMzQyxZQUFZLFFBQVEsa0NBQVcsY0FBYztBQUFBLFFBQzdDLFdBQVcsUUFBUSxrQ0FBVyxhQUFhO0FBQUEsUUFDM0MsY0FBYyxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBLFFBQ2pELFdBQVcsUUFBUSxrQ0FBVyxhQUFhO0FBQUEsUUFDM0MsV0FBVyxRQUFRLGtDQUFXLFNBQVM7QUFBQSxNQUN6QztBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBO0FBQUEsTUFFTixPQUFPO0FBQUE7QUFBQSxRQUVMLFFBQVE7QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxRQUM5QztBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxLQUFLO0FBQUE7QUFBQSxNQUVILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLG1CQUFtQjtBQUFBLFFBQ3JCO0FBQUEsTUFDRjtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1Asa0JBQWtCO0FBQUEsTUFDcEI7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQTtBQUFBO0FBQUEsTUFFUixXQUFXLFNBQVM7QUFBQSxNQUNwQixtQkFBbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFTckI7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFtdCn0K
