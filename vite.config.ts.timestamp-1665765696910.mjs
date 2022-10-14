// vite.config.ts
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { crx } from "@crxjs/vite-plugin";

// src/manifest.ts
import { defineManifest } from "@crxjs/vite-plugin";
var manifest_default = defineManifest({
  name: "Stack Overflow & Reddit in Google",
  description: "",
  version: "1.0.2",
  manifest_version: 3,
  icons: {
    "16": "src/assets/images/icon_16.png",
    "32": "src/assets/images/icon_32.png",
    "64": "src/assets/images/icon_64.png",
    "128": "src/assets/images/icon_128.png",
    "256": "src/assets/images/icon_256.png"
  },
  background: {
    service_worker: "src/background/main.ts",
    type: "module"
  },
  content_scripts: [
    {
      matches: ["*://www.google.com/search?q=*"],
      js: ["src/content/googlehandler.ts"]
    }
  ],
  web_accessible_resources: [
    {
      resources: [
        "src/assets/hljs/*",
        "src/assets/images/*"
      ],
      matches: [
        "http://*/*",
        "https://*/*"
      ]
    }
  ]
});

// vite.config.ts
import "svelte-windicss-preprocess";
import WindiCSS from "vite-plugin-windicss";
var vite_config_default = defineConfig({
  build: {
    emptyOutDir: true
  },
  plugins: [
    WindiCSS(),
    crx({ manifest: manifest_default }),
    svelte()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL21hbmlmZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbGFzc2VcXFxcQ29kZVxcXFxFeHRlbnNpb25zXFxcXG1vcmUtcmljaC1yZXN1bHRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsYXNzZVxcXFxDb2RlXFxcXEV4dGVuc2lvbnNcXFxcbW9yZS1yaWNoLXJlc3VsdHNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2xhc3NlL0NvZGUvRXh0ZW5zaW9ucy9tb3JlLXJpY2gtcmVzdWx0cy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB7IHN2ZWx0ZSB9IGZyb20gJ0BzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGUnXHJcbmltcG9ydCB7IGNyeCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcclxuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vc3JjL21hbmlmZXN0J1xyXG5pbXBvcnQgeyB3aW5kaSB9IGZyb20gJ3N2ZWx0ZS13aW5kaWNzcy1wcmVwcm9jZXNzJztcclxuXHJcbmltcG9ydCBXaW5kaUNTUyBmcm9tICd2aXRlLXBsdWdpbi13aW5kaWNzcydcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgICBlbXB0eU91dERpcjogdHJ1ZVxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgICBXaW5kaUNTUygpLFxyXG4gICAgICAgIGNyeCh7IG1hbmlmZXN0IH0pLFxyXG4gICAgICAgIHN2ZWx0ZSgpLy8oe3ByZXByb2Nlc3M6IFt3aW5kaSgpXX0pLFxyXG4gICAgXSxcclxufSlcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsYXNzZVxcXFxDb2RlXFxcXEV4dGVuc2lvbnNcXFxcbW9yZS1yaWNoLXJlc3VsdHNcXFxcc3JjXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsYXNzZVxcXFxDb2RlXFxcXEV4dGVuc2lvbnNcXFxcbW9yZS1yaWNoLXJlc3VsdHNcXFxcc3JjXFxcXG1hbmlmZXN0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9sYXNzZS9Db2RlL0V4dGVuc2lvbnMvbW9yZS1yaWNoLXJlc3VsdHMvc3JjL21hbmlmZXN0LnRzXCI7aW1wb3J0IHsgZGVmaW5lTWFuaWZlc3QgfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVNYW5pZmVzdCh7XHJcbiAgbmFtZTogJ1N0YWNrIE92ZXJmbG93ICYgUmVkZGl0IGluIEdvb2dsZScsXHJcbiAgZGVzY3JpcHRpb246IFwiXCIsXHJcbiAgdmVyc2lvbjogJzEuMC4yJyxcclxuICBtYW5pZmVzdF92ZXJzaW9uOiAzLFxyXG4gIGljb25zOiB7XHJcbiAgICBcIjE2XCI6IFwic3JjL2Fzc2V0cy9pbWFnZXMvaWNvbl8xNi5wbmdcIixcclxuICAgIFwiMzJcIjogXCJzcmMvYXNzZXRzL2ltYWdlcy9pY29uXzMyLnBuZ1wiLFxyXG4gICAgXCI2NFwiOiBcInNyYy9hc3NldHMvaW1hZ2VzL2ljb25fNjQucG5nXCIsXHJcbiAgICBcIjEyOFwiOiBcInNyYy9hc3NldHMvaW1hZ2VzL2ljb25fMTI4LnBuZ1wiLFxyXG4gICAgXCIyNTZcIjogXCJzcmMvYXNzZXRzL2ltYWdlcy9pY29uXzI1Ni5wbmdcIixcclxuICB9LFxyXG4gIGJhY2tncm91bmQ6IHtcclxuICAgIHNlcnZpY2Vfd29ya2VyOiAnc3JjL2JhY2tncm91bmQvbWFpbi50cycsXHJcbiAgICB0eXBlOiAnbW9kdWxlJyxcclxuICB9LFxyXG4gIGNvbnRlbnRfc2NyaXB0czogW1xyXG4gICAge1xyXG4gICAgICBtYXRjaGVzOiBbJyo6Ly93d3cuZ29vZ2xlLmNvbS9zZWFyY2g/cT0qJ10sXHJcbiAgICAgIGpzOiBbJ3NyYy9jb250ZW50L2dvb2dsZWhhbmRsZXIudHMnXSxcclxuICAgIH0sXHJcbiAgXSxcclxuICB3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXM6IFtcclxuICAgIHtcclxuICAgICAgcmVzb3VyY2VzOiBbXHJcbiAgICAgICAgJ3NyYy9hc3NldHMvaGxqcy8qJyxcclxuICAgICAgICAnc3JjL2Fzc2V0cy9pbWFnZXMvKicsXHJcbiAgICAgIF0sXHJcbiAgICAgIG1hdGNoZXM6IFtcclxuICAgICAgICBcImh0dHA6Ly8qLypcIixcclxuICAgICAgICBcImh0dHBzOi8vKi8qXCJcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgXSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4VSxTQUFTLG9CQUFvQjtBQUMzVyxTQUFTLGNBQWM7QUFDdkIsU0FBUyxXQUFXOzs7QUNGa1UsU0FBUyxzQkFBc0I7QUFFclgsSUFBTyxtQkFBUSxlQUFlO0FBQUEsRUFDNUIsTUFBTTtBQUFBLEVBQ04sYUFBYTtBQUFBLEVBQ2IsU0FBUztBQUFBLEVBQ1Qsa0JBQWtCO0FBQUEsRUFDbEIsT0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLFlBQVk7QUFBQSxJQUNWLGdCQUFnQjtBQUFBLElBQ2hCLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxpQkFBaUI7QUFBQSxJQUNmO0FBQUEsTUFDRSxTQUFTLENBQUMsK0JBQStCO0FBQUEsTUFDekMsSUFBSSxDQUFDLDhCQUE4QjtBQUFBLElBQ3JDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsMEJBQTBCO0FBQUEsSUFDeEI7QUFBQSxNQUNFLFdBQVc7QUFBQSxRQUNUO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7OztBRGhDRCxPQUFzQjtBQUV0QixPQUFPLGNBQWM7QUFHckIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsT0FBTztBQUFBLElBQ0gsYUFBYTtBQUFBLEVBQ2pCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxTQUFTO0FBQUEsSUFDVCxJQUFJLEVBQUUsMkJBQVMsQ0FBQztBQUFBLElBQ2hCLE9BQU87QUFBQSxFQUNYO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
