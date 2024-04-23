"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitIgnore = exports.utilScssBackup = exports.utilScss = exports.viteHtml = exports.viteConfig = void 0;
const viteConfig = () => {
    const const1 = "`process.env.${key}`";
    const const2 = '`"${value}"`';
    return `/* eslint-disable */
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  import path from "path";
  import fs from "fs";
  
  const root = process.cwd();
  const femEnv = fs.readFileSync(path.resolve(root, ".env-cmdrc"), {
    encoding: "utf8",
  });
  const defineEnv = () => {
    const env = {};
    Object.entries(JSON.parse(femEnv).local).forEach(
      ([key, value]) => (env[${const1}] = ${const2})
    );
    env["process.env.NODE_ENV"] = '"local"';
    return env;
  };
  
  export default () => {
    return defineConfig({
      server: {
        port: 3002,
        host: "loc.encar.com",
      },
      css: {
        modules: {
          generateScopedName: "[name]__[hash:base64:5]",
        },
        preprocessorOptions: {
          scss: {},
        },
      },
      resolve: {
        alias: {
          app: path.resolve(root, "./src"),
        },
      },
      define: {
        ...defineEnv(),
      },
      optimizeDeps: {
        esbuildOptions: {
          loader: { ".js": "jsx" },
        },
      },
      plugins: [
        react({
          jsxRuntime: "classic",
          babel: {
            presets: ["@babel/preset-react"],
            plugins: ["@babel/plugin-transform-react-jsx-development"],
          },
        }),
      ],
    });
  };
  `;
};
exports.viteConfig = viteConfig;
exports.viteHtml = `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <script src="/assets/js/common/browser.js"></script>
    <meta name="naver-site-verification" content="340b4a9105c910bf7730594fb164ff40dfe84f5e" />
    <meta name="google-site-verification" content="-mlfhX62h05FI__C7tIRVHJ7LfvR-uERdJ7nlwYYsjk" />
    <meta name="facebook-domain-verification" content="2xnfhiu5wheuiglzcp22q1c2gjsbpf" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width" />
    <link rel="manifest" href="public/manifest.json" />
    <title>대한민국 No.1 중고차 플랫폼 엔카</title>
    <script>var IP_ADDRESS_INFO = 'ip_address_info';</script>
    <script>global = globalThis;</script>
    <!-- Google Tag Manager -->
    <script>
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?v=20220905&id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-WVBT8RH');
    </script>
    <!-- End Google Tag Manager -->
  </head>
  <body>
    <!-- Low Browser -->
    <script>enLowBrowserRedirect();</script>
    <div id="wrap"></div>
    <div id="page"></div>
    <div id="modal"></div>
    <div id="portal"></div>
    <script type="module" src="./src/index.js"></script>
  </body>
</html>
`;
exports.utilScss = `//전체 스프라이트 이미지 정보 import
@mixin util-sprite($sprite){
  $sprite-offset-x: calc(nth($sprite, 3) / 2);
  $sprite-offset-y: calc(nth($sprite, 4) / 2);
  $sprite-background-url: nth($sprite, 9);
  width: calc(nth($sprite, 5) / 2);
  height: calc(nth($sprite, 6) / 2);
  background: url($sprite-background-url) $sprite-offset-x $sprite-offset-y no-repeat;
  background-size: calc(nth($sprite, 7) / 2);
}

//oocss 방식 사용시 개별이미지 정보 import (width, height, background-position)
@mixin util-unit($sprite){
  $sprite-offset-x: calc(nth($sprite, 3) / 2);
  $sprite-offset-y: calc(nth($sprite, 4) / 2);
  width: calc(nth($sprite, 5) / 2);
  height: calc(nth($sprite, 6) / 2);
  background-position: $sprite-offset-x $sprite-offset-y;
}`;
exports.utilScssBackup = `//전체 스프라이트 이미지 정보 import
@mixin util-sprite($sprite){
  $sprite-offset-x: calc(nth($sprite, 3) / 2);
  $sprite-offset-y: calc(nth($sprite, 4) / 2);
  width: calc(nth($sprite, 5) / 2);
  height: calc(nth($sprite, 6) / 2);
  background: url(nth($sprite, 9)) $sprite-offset-x $sprite-offset-y no-repeat;
  background-size: calc(nth($sprite, 7) / 2);
}

//oocss 방식 사용시 개별이미지 정보 import (width, height, background-position)
@mixin util-unit($sprite){
  $sprite-offset-x: calc(nth($sprite, 3) / 2);
  $sprite-offset-y: calc(nth($sprite, 4) / 2);
  width: calc(nth($sprite, 5) / 2);
  height: calc(nth($sprite, 6) / 2);
  background-position: $sprite-offset-x $sprite-offset-y;
}`;
exports.gitIgnore = `
# Created by https://www.toptal.com/developers/gitignore/api/macos,yarn,react
# Edit at https://www.toptal.com/developers/gitignore?templates=macos,yarn,react

### macOS ###
# General
.DS_Store
.AppleDouble
.LSOverride

# Icon must end with two \r
# Icon

# Thumbnails
._*

# Files that might appear in the root of a volume
.DocumentRevisions-V100
.fseventsd
.Spotlight-V100
.TemporaryItems
.Trashes
.VolumeIcon.icns
.com.apple.timemachine.donotpresent

# Directories potentially created on remote AFP share
.AppleDB
.AppleDesktop
Network Trash Folder
Temporary Items
.apdisk

### react ###
.DS_*
*.log
logs
**/*.backup.*
**/*.back.*

node_modules
bower_components

*.sublime*

psd
thumb
sketch

### yarn ###
# https://yarnpkg.com/advanced/qa#which-files-should-be-gitignored

.yarn/*
!.yarn/releases
!.yarn/plugins
!.yarn/sdks
!.yarn/versions

# if you are NOT using Zero-installs, then:
# comment the following lines
# !.yarn/cache

# and uncomment the following lines
.pnp.*

# End of https://www.toptal.com/developers/gitignore/api/macos,yarn,react

### build ###
**/lib/**
**/dist/**
**/build/**
**/buildServer/**

### parcel ###
.parcel-cache

### sdks vscode ###
.vscode/*

### StorybookJs ###
# gitignore template for the Storybook, UI guide for front apps
# website: https://storybook.js.org/
storybook-static/

### next
**/.next/**

### turbo
.turbo

services/fem/local-vite/yarn.lock
services/fem/local-vite/package.json
services/fem/vite.config.js
services/fem/local-vite/gitignore
services/fem/index.html`;
//# sourceMappingURL=initVite.js.map