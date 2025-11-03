// app.config.ts
import { defineConfig } from "vinxi/config";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
var app_config_default = defineConfig({
  routers: [
    {
      name: "public",
      type: "static",
      dir: "./public"
    },
    {
      name: "ssr",
      type: "http",
      target: "server",
      handler: "./src/ssr.tsx",
      plugins: () => [
        viteTsConfigPaths({
          projects: ["./tsconfig.json"]
        }),
        tailwindcss(),
        tanstackStart()
      ]
    },
    {
      name: "client",
      type: "spa",
      target: "browser",
      handler: "./src/client.tsx",
      plugins: () => [
        viteTsConfigPaths({
          projects: ["./tsconfig.json"]
        }),
        tailwindcss(),
        tanstackStart()
      ]
    }
  ]
});
export {
  app_config_default as default
};
