
### .env.local

```
NEXT_PUBLIC_SUPABASE_URL=https://gyoagurwmdytjnzzgoom.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5b2FndXJ3bWR5dGpuenpnb29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2NjkxODEsImV4cCI6MjA5MDI0NTE4MX0.Ivdj4X0ZhVnAVu9RDBf119xDZ4mCWqU4soZyI2GIZbc
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5b2FndXJ3bWR5dGpuenpnb29tIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDY2OTE4MSwiZXhwIjoyMDkwMjQ1MTgxfQ.zNysdYXy9pkf6siMOG8L7oChE8ji-bOcN3WDkZKj-KQ
```

### AGENTS.md

```
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

```

### CLAUDE.md

```
@AGENTS.md

```

### eslint.config.mjs

```
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

```

### next-env.d.ts

```
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

### next.config.ts

```
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;

```

### package.json

```
{
  "name": "resume-analyzer",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@supabase/ssr": "^0.10.0",
    "@supabase/supabase-js": "^2.101.0",
    "next": "16.2.1",
    "razorpay": "^2.9.6",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "babel-plugin-react-compiler": "1.0.0",
    "eslint": "^9",
    "eslint-config-next": "16.2.1",
    "typescript": "^5"
  }
}

```

### README.md

```
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

### tsconfig.json

```
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}

```

### src\middleware.ts

```
import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

```

### src\app\globals.css

```
/* ═══════════════════════════════════════════════
   TOKENS
═══════════════════════════════════════════════ */
:root{
  --o1:#6b2500;--o2:#a33d00;--o3:#c9510d;--o4:#e8855a;--o5:#f5c4a8;--o6:#fff1eb;--o7:#fffaf8;
  --white:#ffffff;--surface:#f9f8f7;--s2:#f2efec;--s3:#ebe8e3;
  --w:#fff;--sf:#f9f8f7;--sc2:#f2efec;--sc3:#e8e3de;
  --border:rgba(163,61,0,.09);--b2:rgba(163,61,0,.18);--b3:rgba(163,61,0,.28);
  --bd:rgba(163,61,0,.09);--bd2:rgba(163,61,0,.18);--bd3:rgba(163,61,0,.28);
  --t1:#1a1208;--t2:#5c4a3a;--t3:#9c8070;--t4:#c4b0a4;
  --green:#15803d;--gbg:#dcfce7;--gl:#f0fdf4;
  --red:#991b1b;--rbg:#fee2e2;--rl:#fff5f5;
  --amber:#92400e;--abg:#fef3c7;--al:#fffbeb;
  --blue:#1d4ed8;--bbg:#dbeafe;--bl:#eff6ff;
  --purple:#7c3aed;--pbg:#ede9fe;--pl:#f5f3ff;
  --tl:#0f766e;--tbg:#ccfbf1;
  --sh-sm:0 1px 4px rgba(0,0,0,.06);
  --sh-md:0 4px 16px rgba(0,0,0,.08);
  --sh-lg:0 12px 40px rgba(0,0,0,.10);
  --sh-xl:0 24px 64px rgba(0,0,0,.12);
  --sh-or:0 8px 32px rgba(163,61,0,.25);
  --sh1:0 1px 2px rgba(0,0,0,.05);
  --sh2:0 4px 12px rgba(163,61,0,.08);
  --sh3:0 12px 32px rgba(163,61,0,.12);
  --sh4:0 24px 64px rgba(163,61,0,.16);
  --sho:0 8px 24px rgba(163,61,0,.22);
  --shol:0 12px 32px rgba(163,61,0,.35);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--font-manrope),sans-serif;background:var(--surface);color:var(--t1);overflow-x:hidden;line-height:1.5;font-weight:500}
h1,h2,h3,h4,h5,h6,.nav-logo{font-family:var(--font-plus-jakarta),sans-serif;font-weight:800;letter-spacing:-0.03em}
img{max-width:100%;display:block}
button,input,textarea,select{font-family:inherit}
.mat{font-family:'Material Symbols Outlined';font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;font-size:20px;line-height:1;vertical-align:middle;display:inline-block;user-select:none}
.matf{font-family:'Material Symbols Outlined';font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24;font-size:20px;line-height:1;vertical-align:middle;display:inline-block;user-select:none}
.page{display:none!important}
.page.active{display:block!important}
#page-app.active{display:flex!important;flex-direction:column}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:9px 20px;border-radius:999px;font-size:13px;font-weight:700;border:none;transition:all 150ms;white-space:nowrap;cursor:pointer}
.btn-p{background:linear-gradient(135deg,var(--o2),var(--o3));color:#fff;box-shadow:var(--sh-or)}
.btn-p:hover{transform:translateY(-1px);box-shadow:0 12px 36px rgba(163,61,0,.32)}
.btn-s{background:var(--white);color:var(--t1);border:1.5px solid var(--b2)}
.btn-s:hover{background:var(--o6);border-color:var(--o4);color:var(--o2)}
.btn-g{background:none;color:var(--t2);border:1.5px solid var(--b2)}
.btn-g:hover{background:var(--o6);color:var(--o2)}
.btn-sm{padding:6px 14px;font-size:12px}
.btn-lg{padding:13px 28px;font-size:15px;font-weight:800}
.btn:disabled{opacity:.5;pointer-events:none}

/* INPUTS */
.inp{width:100%;padding:11px 14px;border:1.5px solid var(--b2);border-radius:12px;font-size:14px;color:var(--t1);background:var(--surface);outline:none;transition:all 200ms}
.inp:focus{border-color:var(--o3);background:var(--white);box-shadow:0 0 0 3px var(--o6)}
.inp::placeholder{color:var(--t4)}
.inp-label{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.07em;color:var(--t3);margin-bottom:6px;display:block}
.inp-wrap{margin-bottom:16px}
.inp-hint{font-size:11px;color:var(--t3);margin-top:4px}

/* CARDS */
.card{background:var(--white);border:1px solid var(--border);border-radius:20px;padding:22px;box-shadow:var(--sh-sm)}
.card-hover:hover{box-shadow:var(--sh-md);transform:translateY(-2px)}
.card-hover{transition:all 200ms}

/* BADGES */
.badge{display:inline-flex;align-items:center;gap:3px;padding:3px 9px;border-radius:999px;font-size:11px;font-weight:700}
.bo{background:var(--o6);color:var(--o2);border:1px solid var(--o5)}
.bg{background:var(--gbg);color:var(--green)}
.br{background:var(--rbg);color:var(--red)}
.ba{background:var(--abg);color:var(--amber)}
.bb{background:var(--bbg);color:var(--blue)}
.bp{background:var(--pbg);color:var(--purple)}
.bgy{background:var(--s2);color:var(--t2)}

/* ── BUTTONS ── */
.btn-primary{padding:14px 36px;border-radius:99px;font-size:17px;font-weight:800;border:none;background:linear-gradient(135deg,var(--o2),var(--o3));color:#fff;cursor:pointer;box-shadow:var(--sh-or);transition:all 150ms;font-family:inherit}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 16px 44px rgba(163,61,0,.35)}
.btn-ghost{padding:14px 36px;border-radius:99px;font-size:17px;font-weight:700;border:1.5px solid var(--border2);background:none;color:var(--text2);cursor:pointer;transition:all 150ms;font-family:inherit}
.btn-ghost:hover{background:var(--o6);color:var(--o2);border-color:var(--o4)}

/* ── SHARED NAV ── */
.nav-pill{position:fixed;top:0;left:0;right:0;height:60px;background:rgba(255,255,255,.85);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);z-index:200;display:flex;align-items:center;justify-content:space-between;padding:0 28px}
.nav-logo{font-size:19px;font-weight:800;letter-spacing:-.03em;color:var(--o2);cursor:pointer}
.nav-logo span{color:var(--o3)}
.nav-links{display:flex;gap:24px}
.nav-link{font-size:13px;font-weight:600;color:var(--text2);text-decoration:none;cursor:pointer;transition:color 150ms}
.nav-link:hover{color:var(--o2)}
.nav-actions{display:flex;gap:12px;align-items:center}
.nav-cmd{display:flex;align-items:center;gap:10px;padding:8px 16px;background:var(--s2);border:1px solid var(--b2);border-radius:12px;color:var(--t3);font-size:13px;font-weight:600;cursor:pointer;transition:all 200ms}
.nav-cmd:hover{border-color:var(--o4);background:var(--o6);color:var(--o2)}
.nav-cmd kbd{background:var(--white);border:1px solid var(--b2);padding:2px 6px;border-radius:6px;font-size:10px;font-weight:800;margin-left:8px}
.nav-icon-btn{width:40px;height:40px;border-radius:12px;border:1.5px solid var(--b2);background:var(--white);display:flex;align-items:center;justify-content:center;color:var(--t2);cursor:pointer;position:relative;transition:all 150ms}
.nav-icon-btn:hover{background:var(--o6);border-color:var(--o4);color:var(--o2)}
.nav-dot{position:absolute;top:10px;right:10px;width:8px;height:8px;background:var(--o3);border:2px solid var(--white);border-radius:50%}
.nav-user-trigger{display:flex;align-items:center;gap:8px;padding:4px;border-radius:14px;border:1.5px solid var(--b2);background:var(--white);cursor:pointer;transition:all 150ms}
.nav-user-trigger:hover{border-color:var(--o4);background:var(--o6)}
.nav-avatar{width:32px;height:32px;border-radius:10px;background:var(--o2);color:var(--white);font-size:14px;font-weight:800;display:flex;align-items:center;justify-content:center}
.nav-drop{position:absolute;top:calc(100% + 12px);background:var(--white);border-radius:20px;box-shadow:var(--sh-xl);border:1px solid var(--border);overflow:hidden;z-index:1000}
.adu{animation:adu 300ms cubic-bezier(0.16, 1, 0.3, 1)}
@keyframes adu{from{opacity:0;transform:translateY(10px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}
.nav-drop-h{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;font-size:14px;font-weight:800}
.nav-drop-h button{background:none;border:none;color:var(--o3);font-size:12px;font-weight:700;cursor:pointer}
.nav-notif-i{padding:12px 20px;display:flex;gap:12px;transition:background 150ms;cursor:pointer}
.nav-notif-i:hover{background:var(--o7)}
.nav-notif-c{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.nav-notif-i p{font-size:13px;font-weight:800;color:var(--t1)}
.nav-notif-i span{font-size:11px;color:var(--t3);line-height:1.4}
.nav-drop-f{padding:12px;text-align:center;font-size:12px;font-weight:800;color:var(--o2);background:var(--o6);cursor:pointer}
.nav-user-h{padding:20px;display:flex;gap:12px;align-items:center;border-bottom:1px solid var(--border)}
.nav-user-h p{font-size:15px;font-weight:800;color:var(--t1)}
.nav-user-h span{font-size:12px;color:var(--t3)}
.nav-user-links{padding:8px}
.nav-user-link{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;font-size:14px;font-weight:600;color:var(--t2);text-decoration:none;transition:all 150ms}
.nav-user-link:hover{background:var(--o6);color:var(--o2)}
.nav-user-link .mat{font-size:18px;color:var(--t3)}
.nav-user-f{padding:8px;border-top:1px solid var(--border)}

/* ── SIDEBAR ── */
.app-shell{display:flex;min-height:100vh;padding-top:60px}
.sidebar{width:300px;min-height:calc(100vh - 60px);background:var(--white);border-right:1px solid var(--border);position:fixed;top:60px;left:0;bottom:0;display:flex;flex-direction:column;z-index:100;overflow-y:auto;transition:transform 300ms ease}
.sb-sec{font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--t3);padding:20px 24px 8px}
.sb-it{display:flex;align-items:center;gap:12px;padding:12px 20px;border-radius:12px;font-size:15px;font-weight:600;color:var(--t2);cursor:pointer;text-decoration:none;transition:all 180ms;margin:2px 10px;position:relative}
.sb-it:hover{background:var(--o6);color:var(--o2)}
.sb-it.active{background:var(--o6);color:var(--o2);font-weight:700}
.sb-it .mat,.sb-it .matf{font-size:22px;color:inherit}
.sb-badge{background:var(--o2);color:#fff;font-size:10px;padding:2px 8px;border-radius:6px;margin-left:auto;font-weight:800}
.sb-new{background:var(--gbg);color:var(--green);font-size:9px;padding:2px 7px;border-radius:5px;margin-left:auto;font-weight:900}
.sb-foot{padding:16px;margin-top:auto;border-top:1px solid var(--border)}
.sb-up{background:linear-gradient(135deg,var(--o1),var(--o2));border-radius:16px;padding:20px;color:#fff}
.sb-up h4{font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;opacity:.8;margin-bottom:6px}
.sb-up p{font-size:12px;opacity:.9;line-height:1.5;margin-bottom:14px}
.sb-up button{width:100%;padding:10px;background:#fff;color:var(--o2);border:none;border-radius:10px;font-size:13px;font-weight:800;cursor:pointer;transition:all 200ms}
.sb-up button:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.2)}
.main{margin-left:300px;flex:1;padding:48px 64px;min-height:calc(100vh - 60px)}

/* ── TOAST ── */
.toast-container{position:fixed;top:72px;right:16px;z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none}
.toast{background:#fff;border-radius:12px;padding:12px 16px;box-shadow:var(--sh-lg);display:flex;align-items:center;gap:10px;font-size:13px;font-weight:600;min-width:270px;border-left:4px solid;pointer-events:auto;animation:tin 300ms ease}
.toast.success{border-color:#16a34a}.toast.error{border-color:var(--red)}.toast.info{border-color:var(--o3)}.toast.warning{border-color:var(--amber)}
.toast .mat{font-size:16px}
.toast.success .mat{color:#16a34a}.toast.error .mat{color:var(--red)}.toast.info .mat{color:var(--o3)}.toast.warning .mat{color:var(--amber)}
@keyframes tin{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
@keyframes tout{to{opacity:0;transform:translateX(20px)}}

/* ═══════════════════════════════════════════════
   COMMAND PALETTE
═══════════════════════════════════════════════ */
#cmd-overlay{display:none;position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,.45);backdrop-filter:blur(4px);align-items:flex-start;justify-content:center;padding-top:15vh}
#cmd-overlay.open{display:flex}
.cmd-box{width:100%;max-width:580px;background:#fff;border-radius:18px;box-shadow:var(--sh-xl);overflow:hidden;animation:cmd-in 200ms ease}
@keyframes cmd-in{from{opacity:0;transform:scale(.97) translateY(-8px)}to{opacity:1;transform:scale(1) translateY(0)}}
.cmd-search-row{display:flex;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid var(--border)}
.cmd-search-row .mat{font-size:20px;color:var(--text3)}
.cmd-input{flex:1;border:none;outline:none;font-size:16px;font-family:inherit;color:var(--text1);background:none}
.cmd-input::placeholder{color:var(--text3)}
.cmd-esc{font-size:11px;font-weight:700;color:var(--text3);background:var(--surface2);border:1px solid var(--border);border-radius:4px;padding:2px 8px;cursor:pointer}
.cmd-results{max-height:360px;overflow-y:auto;padding:8px}
.cmd-section-label{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);padding:8px 12px 4px}
.cmd-item{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:10px;cursor:pointer;transition:background 100ms}
.cmd-item:hover,.cmd-item.selected{background:var(--o6)}
.cmd-item .mat{font-size:18px;color:var(--text3);width:22px}
.cmd-item.selected .mat{color:var(--o2)}
.cmd-item-label{font-size:14px;font-weight:600;color:var(--text1);flex:1}
.cmd-item-tag{font-size:11px;color:var(--text3)}
.cmd-item kbd{background:var(--surface2);border:1px solid var(--border);border-radius:4px;padding:1px 6px;font-size:10px;font-weight:700;color:var(--text2)}
.cmd-footer{padding:8px 20px;border-top:1px solid var(--border);display:flex;gap:16px;font-size:11px;color:var(--text3)}
.cmd-footer span{display:flex;align-items:center;gap:4px}
.cmd-footer kbd{background:var(--surface2);border:1px solid var(--border);border-radius:3px;padding:1px 5px;font-size:10px;font-weight:700}

/* ANIMATIONS */
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes float1{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes float2{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.85)}}
@keyframes ringFill{to{stroke-dashoffset:var(--fo)}}
@keyframes toastIn{from{opacity:0;transform:translateX(110%)}to{opacity:1;transform:translateX(0)}}
@keyframes toastOut{to{opacity:0;transform:translateX(110%)}}
@keyframes stagger{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes countUp{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}
@keyframes blobPulse{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(1.07) rotate(2deg)}}

.afu{animation:fadeUp .4s ease both}
.afi{animation:fadeIn .3s ease both}
.asi{animation:scaleIn .25s ease both}
.skel{background:linear-gradient(90deg,var(--s2) 25%,var(--s3) 50%,var(--s2) 75%);background-size:400px 100%;animation:shimmer 1.5s infinite;border-radius:8px}

/* ═══════════════════════════════════════════════
   LANDING PAGE
═══════════════════════════════════════════════ */
.hero-wrap{max-width:1180px;margin:0 auto;padding:100px 28px 60px;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.hero-badge{display:inline-flex;align-items:center;gap:6px;background:var(--o6);border:1px solid var(--o5);color:var(--o2);font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:6px 14px;border-radius:999px;margin-bottom:18px;animation:fadeUp .5s ease}
.hero-h1{font-size:58px;font-weight:900;letter-spacing:-.04em;line-height:1.05;color:var(--t1);margin-bottom:18px;animation:fadeUp .5s .1s ease both}
.hero-h1 span{color:var(--o3)}
.hero-p{font-size:17px;line-height:1.7;color:var(--t2);margin-bottom:28px;animation:fadeUp .5s .2s ease both}
.hero-ctas{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;animation:fadeUp .5s .3s ease both}

/* MODALS */
.modal-overlay{position:fixed;inset:0;background:rgba(26,18,8,0.4);backdrop-filter:blur(8px);z-index:2000;display:flex;align-items:center;justify-content:center;padding:20px}
.modal-box{background:var(--white);border-radius:32px;box-shadow:var(--sh-xl);width:100%;max-width:540px;position:relative;overflow:hidden;animation:scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)}
.modal-close{position:absolute;top:20px;right:20px;width:36px;height:36px;border-radius:12px;border:none;background:var(--s2);color:var(--t3);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 150ms}
.modal-close:hover{background:var(--rbg);color:var(--red)}

/* SHARE MODAL SPECIFIC */
.share-h{padding:32px 32px 24px;text-align:center}
.share-h h2{font-size:28px;font-weight:900;letter-spacing:-.03em;margin-bottom:8px}
.share-h p{font-size:14px;color:var(--t2);line-height:1.6}
.score-card{background:linear-gradient(135deg,var(--o1),var(--o2));border-radius:24px;padding:32px;margin:0 32px 32px;text-align:center;color:#fff;box-shadow:var(--sh-or)}
.sc-ring-w{width:120px;height:120px;margin:0 auto 16px;position:relative}
.sc-ring-w svg{transform:rotate(-90deg)}
.sc-num{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1}
.sc-num h3{font-size:32px;font-weight:900}
.sc-num span{font-size:10px;font-weight:800;letter-spacing:.05em;opacity:.7}
.sc-role{font-size:20px;font-weight:900;margin-bottom:4px}
.sc-comp{font-size:14px;font-weight:700;opacity:.8;margin-bottom:16px}
.sc-badges{display:flex;gap:6px;justify-content:center}
.sc-badge{padding:4px 12px;background:rgba(255,255,255,0.15);border-radius:99px;font-size:11px;font-weight:800}

.share-a{padding:0 32px 32px;display:flex;flex-direction:column;gap:12px}
.share-row{display:flex;gap:8px}
.share-inp{flex:1;background:var(--s2);border:1.5px solid var(--b2);border-radius:14px;padding:12px 16px;font-size:13px;font-weight:600;color:var(--t1)}
.btn-li{background:#0077b5;color:#fff;width:100%;border-radius:14px}
.btn-li:hover{background:#00669c}

/* UPGRADE MODAL SPECIFIC */
.upg-h{padding:32px 32px 24px;text-align:center}
.upg-icon-w{width:56px;height:56px;border-radius:16px;background:var(--o6);color:var(--o3);display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
.upg-icon-w .mat{font-size:32px}
.upg-h h2{font-size:28px;font-weight:900;letter-spacing:-.03em;margin-bottom:8px}
.upg-h p{font-size:14px;color:var(--t2);line-height:1.6}
.upg-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:0 32px;margin-bottom:32px}
.upg-plan{padding:24px;border-radius:20px;border:1.5px solid var(--border);position:relative}
.upg-plan.popular{border-color:var(--o3);background:var(--o7);box-shadow:var(--sh-or)}
.upg-pop-tag{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--o2);color:#fff;font-size:10px;font-weight:900;padding:4px 10px;border-radius:99px}
.upg-plan-h{font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--t3);margin-bottom:4px}
.upg-price{font-size:32px;font-weight:900;color:var(--t1);margin-bottom:20px}
.upg-price span{font-size:14px;font-weight:700;color:var(--t3)}
.upg-list{display:flex;flex-direction:column;gap:10px}
.upg-list li{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--t2)}
.upg-list li .mat{font-size:16px;color:var(--green)}
.upg-list li.no{opacity:.5}
.upg-list li.no .mat{color:var(--t4)}
.upg-f{padding:0 32px 32px;text-align:center}
.upg-f p{font-size:11px;color:var(--t3);margin-top:16px;line-height:1.5}
.btn-hero-primary{padding:13px 26px;border-radius:99px;font-size:15px;font-weight:800;background:linear-gradient(135deg,var(--o2),var(--o3));color:#fff;border:none;cursor:pointer;box-shadow:var(--sh-or);font-family:inherit;display:flex;align-items:center;gap:8px;transition:all 150ms}
.btn-hero-primary:hover{transform:translateY(-2px);box-shadow:0 16px 40px rgba(163,61,0,.32)}
.btn-hero-ghost{padding:13px 26px;border-radius:99px;font-size:15px;font-weight:800;background:#fff;color:var(--text1);border:1.5px solid var(--border2);cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:8px;transition:all 150ms}
.btn-hero-ghost:hover{background:var(--o6);border-color:var(--o4);color:var(--o2)}
.hero-sub{font-size:12px;color:var(--text3);font-weight:600;animation:fadeUp .5s .4s ease both}

/* ... (Remaining styles from HTML) */
.counter-strip{background:linear-gradient(135deg,var(--o1),var(--o2));padding:36px 28px}
.counter-grid{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:24px;text-align:center}
.counter-num{font-size:44px;font-weight:800;color:#fff;letter-spacing:-.04em;line-height:1}
.counter-label{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.6);margin-top:4px}
.counter-live-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:#4ade80;animation:pulse 2s infinite;margin-right:4px;vertical-align:middle}

.proof-bar{background:#fff;border-bottom:1px solid var(--border)}
.proof-inner{max-width:1180px;margin:0 auto;padding:18px 28px;display:flex;align-items:center;gap:32px;flex-wrap:wrap}
.proof-avatars{display:flex}
.proof-av{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--o4),var(--o3));border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:800;margin-left:-8px}
.proof-av:first-child{margin-left:0}
.proof-text{font-size:13px;font-weight:700;color:var(--text2)}
.proof-companies{display:flex;gap:28px;align-items:center;margin-left:auto}
.proof-company{font-size:14px;font-weight:800;color:var(--text3);letter-spacing:-.01em}

.demo-section{background:#fff;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.demo-inner{max-width:1000px;margin:0 auto;padding:72px 28px}
.section-eyebrow{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--o3);margin-bottom:8px}
.section-title{font-size:36px;font-weight:800;letter-spacing:-.03em;line-height:1.1;color:var(--text1);margin-bottom:12px}
.demo-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:40px}
.demo-panel{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:20px}
.demo-label{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--text3);margin-bottom:10px;display:flex;align-items:center;gap:6px}
.demo-ta{width:100%;min-height:220px;resize:none;border:2px solid var(--border);border-radius:16px;padding:22px 28px;font-family:inherit;font-size:17px;line-height:1.75;color:var(--text1);background:#fff;outline:none;transition:all 250ms}
.demo-ta:focus{border-color:var(--o3);box-shadow:0 0 0 4px rgba(201,81,13,.1)}
.linkedin-pill{display:flex;align-items:center;gap:10px;padding:8px 18px;background:var(--blue-bg);color:var(--blue);font-size:14px;font-weight:800;border-radius:99px;cursor:pointer;border:none;font-family:inherit;transition:all 150ms}
.demo-btn{width:100%;margin-top:32px;padding:20px;border-radius:18px;font-size:19px;font-weight:900;border:none;background:linear-gradient(135deg,var(--o2),var(--o3));color:#fff;cursor:pointer;box-shadow:var(--sh-or);font-family:inherit;display:flex;align-items:center;justify-content:center;gap:12px;transition:all 200ms}
.demo-btn:hover{transform:translateY(-3px);box-shadow:0 20px 48px rgba(163,61,0,.4)}

.demo-result-wrap{margin-top:24px;display:none}
.demo-result-wrap.show{display:block}
.result-card{background:#fff;border:1px solid var(--border);border-radius:18px;padding:28px;display:flex;gap:24px;align-items:center;position:relative;overflow:hidden}
.result-ring-wrap{width:110px;height:110px;flex-shrink:0;position:relative}
.result-score-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.result-score-num{font-size:28px;font-weight:800;color:var(--o2);line-height:1}
.email-gate{background:var(--o6);border:1px solid var(--o5);border-radius:14px;padding:18px 20px;display:flex;flex-direction:column;gap:10px}
.email-gate-row{display:flex;gap:8px}
.email-input{flex:1;padding:10px 14px;border:1.5px solid var(--o5);border-radius:8px;font-family:inherit;font-size:13px;outline:none;transition:border-color 150ms}
.email-submit{padding:10px 16px;background:linear-gradient(135deg,var(--o2),var(--o3));color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit;white-space:nowrap;transition:all 150ms}

.pricing-section{background:var(--surface)}
.pricing-inner{max-width:1100px;margin:0 auto;padding:72px 28px}
.pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px}
.pricing-card{background:#fff;border:1.5px solid var(--border);border-radius:20px;padding:28px;transition:all 200ms;position:relative}
.pricing-card.feat{border-color:var(--o3);box-shadow:0 8px 32px rgba(163,61,0,.12)}
.pricing-pop{position:absolute;top:-11px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,var(--o2),var(--o3));color:#fff;font-size:11px;font-weight:800;padding:3px 14px;border-radius:99px;white-space:nowrap}
.pricing-price{font-size:40px;font-weight:800;letter-spacing:-.04em;color:var(--text1);line-height:1}
.pricing-ul{list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:24px}
.pricing-cta{width:100%;padding:12px;border-radius:12px;font-size:14px;font-weight:800;cursor:pointer;font-family:inherit;transition:all 150ms}
.p-outline{background:none;border:1.5px solid var(--border2);color:var(--text1)}
.p-filled{background:linear-gradient(135deg,var(--o2),var(--o3));border:none;color:#fff;box-shadow:var(--sh-or)}
.billing-toggle{display:flex;align-items:center;gap:12px;justify-content:center;margin-top:28px;flex-wrap:wrap}
.tog-track{width:42px;height:22px;background:var(--o3);border-radius:99px;cursor:pointer;position:relative;transition:background 200ms}
.tog-thumb{position:absolute;top:2px;left:2px;width:18px;height:18px;background:#fff;border-radius:50%;transition:transform 200ms}
.tog-track.annual .tog-thumb{transform:translateX(20px)}

.faq-section{background:#fff}
.faq-inner{max-width:780px;margin:0 auto;padding:72px 28px}
.faq-item{background:#fff;border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:border-color 150ms}
.faq-q{display:flex;justify-content:space-between;align-items:center;padding:18px 22px;cursor:pointer;font-size:14px;font-weight:700;gap:16px}
.faq-a{max-height:0;overflow:hidden;transition:max-height 280ms ease,padding 280ms ease;font-size:13px;color:var(--text2);line-height:1.7}
.faq-item.open .faq-a{max-height:200px;padding:0 22px 18px}

.fcta{max-width:1100px;margin:40px auto 60px;border-radius:24px;background:linear-gradient(135deg,var(--o1),var(--o2),var(--o3));padding:60px 40px;text-align:center;position:relative;overflow:hidden}
.site-footer{max-width:1100px;margin:0 auto;padding:28px 28px 48px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border)}

/* ═══════════════════════════════════════════════
   DASHBOARD / APP SHELL
═══════════════════════════════════════════════ */
.dash-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:32px;gap:24px}
.dash-header h1{font-size:36px;font-weight:900;letter-spacing:-.04em;line-height:1.1}
.view-toggle{display:flex;background:var(--surface2);border-radius:16px;padding:6px;margin-bottom:36px;width:fit-content;box-shadow:inset 0 2px 8px rgba(0,0,0,.04)}
.vt-btn{padding:14px 40px;border-radius:12px;font-size:17px;font-weight:800;border:none;background:none;cursor:pointer;font-family:inherit;color:var(--text3);transition:all 200ms;letter-spacing:-.01em}
.vt-btn.active{background:#fff;color:var(--text1);box-shadow:var(--sh-md)}
.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-bottom:40px}
.stat-card{background:#fff;border:1px solid var(--border);border-radius:20px;padding:32px;animation:stagger 400ms ease both;box-shadow:var(--sh-sm);transition:transform 200ms}
.stat-card:hover{transform:translateY(-4px);box-shadow:var(--sh-md)}
.stat-icon{width:56px;height:56px;border-radius:16px;display:flex;align-items:center;justify-content:center;margin-bottom:18px}
.stat-num{font-size:56px;font-weight:900;letter-spacing:-.06em;color:var(--text1);line-height:1}
.stat-delta{font-size:14px;font-weight:800;margin-top:8px;display:flex;align-items:center;gap:8px}
.delta-up{color:var(--green)}

/* --- DASHBOARD REFINEMENTS --- */
.dash-header h1{font-size:36px;font-weight:900;letter-spacing:-.04em;line-height:1.1;color:var(--t1)}
.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-bottom:32px}
.stat-card{background:var(--white);border:1.5px solid var(--border);border-radius:24px;padding:24px;transition:all 200ms}
.stat-card:hover{transform:translateY(-4px);box-shadow:var(--sh-md);border-color:var(--o4)}
.stat-icon{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:16px}
.stat-num{font-size:40px;font-weight:900;letter-spacing:-.04em;color:var(--t1);line-height:1}
.stat-label{font-size:13px;font-weight:700;color:var(--t3);margin-top:4px}
.stat-delta{font-size:12px;font-weight:800;margin-top:12px;display:flex;align-items:center;gap:4px}

.dash-grid-2{display:grid;grid-template-columns:1.6fr 1fr;gap:24px}
.dash-card{background:var(--white);border:1.5px solid var(--border);border-radius:24px;padding:24px;height:100%}
.dash-card-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.dash-card-h h3{font-size:18px;font-weight:900;letter-spacing:-.02em}

.dash-time{display:flex;flex-direction:column;gap:20px;position:relative}
.dash-time::before{content:'';position:absolute;left:7px;top:8px;bottom:8px;width:2px;background:var(--s2)}
.dash-time-i{display:flex;gap:16px;position:relative;z-index:1}
.dash-time-dot{width:16px;height:16px;border-radius:50%;background:var(--white);border:3px solid var(--o3);flex-shrink:0;margin-top:2px}
.dash-time-dot.green{border-color:var(--green)}
.dash-time-dot.blue{border-color:var(--blue)}
.dash-time-c p{font-size:14px;font-weight:700;color:var(--t1);margin-bottom:2px}
.dash-time-c span{font-size:12px;color:var(--t3)}

.health-ring-w{width:100px;height:100px;margin-right:20px;flex-shrink:0;position:relative}
.health-ring-c{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1}
.health-ring-c h4{font-size:24px;font-weight:900;color:var(--o2)}
.health-ring-c span{font-size:10px;font-weight:800;opacity:.6}

.delta-card{background:#fff;border:1px solid var(--border);border-radius:16px;padding:22px;margin-bottom:20px}
.delta-versions{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px}
.delta-version{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px 14px;min-width:120px;cursor:pointer;text-align:center}
.delta-version.best{border-color:#16a34a;background:#f0fdf4}
.delta-best-tag{position:absolute;top:-8px;left:50%;transform:translateX(-50%);background:#16a34a;color:#fff;font-size:9px;font-weight:800;padding:2px 8px;border-radius:99px;white-space:nowrap}

.health-card{background:#fff;border:1px solid var(--border);border-radius:16px;padding:22px;display:flex;align-items:center;gap:22px;margin-bottom:20px}
.health-ring{width:80px;height:80px;flex-shrink:0;position:relative}
.health-ring-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.health-ring-num{font-size:20px;font-weight:800;color:var(--o2);line-height:1}

.ats-warnings{background:#fff;border:1px solid var(--border);border-radius:16px;padding:22px;margin-bottom:20px}
.ats-rule{display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-radius:10px;margin-bottom:8px;cursor:pointer}
.ats-rule-icon{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ats-rule-critical{background:#fee2e2}

.salary-controls{display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap}
.salary-chip{padding:10px 24px;border-radius:99px;font-size:14px;font-weight:700;border:1.5px solid var(--border2);background:#fff;color:var(--text2);cursor:pointer;transition:all 150ms;font-family:inherit}
.salary-chip:hover{border-color:var(--o4);background:var(--o6)}
.salary-chip.active{border-color:var(--o3);background:var(--o6);color:var(--o1);box-shadow:0 4px 12px rgba(163,61,0,.08)}

.salary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:48px}
.salary-card{background:#fff;border:1px solid var(--border);border-radius:24px;padding:28px;transition:all 250ms;cursor:pointer;position:relative;display:flex;flex-direction:column;gap:12px}
.salary-card:hover{transform:translateY(-4px);box-shadow:var(--sh-md);border-color:var(--o4)}
.salary-role{font-size:19px;font-weight:800;color:var(--text1);letter-spacing:-.02em}
.salary-city{font-size:13px;color:var(--text3);font-weight:600}
.salary-range{font-size:28px;font-weight:900;color:var(--o2);letter-spacing:-.04em;margin:8px 0 4px}
.salary-bar-bg{height:10px;background:var(--surface2);border-radius:99px;overflow:hidden;margin:8px 0}
.salary-bar-fill{height:100%;background:linear-gradient(90deg,var(--o2),var(--o3));border-radius:99px}
.salary-meta{display:flex;justify-content:space-between;align-items:center;font-size:13px;font-weight:700;color:var(--text2)}
.salary-trend.up{color:var(--green)}
.salary-trend.stable{color:var(--text3)}

.demand-tag{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;padding:5px 12px;border-radius:99px}
.demand-high{background:#f0fdf4;color:#16a34a}
.demand-viral{background:var(--o6);color:var(--o2)}
.demand-med{background:var(--blue-bg);color:var(--blue)}

.salary-skills{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px;padding-top:12px;border-top:1px solid var(--border)}
.salary-skill{font-size:11px;font-weight:700;color:var(--text3)}

.salary-disclaimer{background:rgba(59,130,246,.05);border:1px solid rgba(59,130,246,.1);border-radius:12px;padding:14px 24px;display:flex;align-items:center;gap:12px;font-size:12px;font-weight:600;color:var(--text2);margin-top:24px}

.pro-box{background:linear-gradient(135deg,var(--o1),var(--o2));border-radius:18px;padding:24px;color:#fff;margin-top:24px}
.pro-box h4{font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;opacity:.7;margin-bottom:8px}
.pro-box p{font-size:13px;opacity:.9;line-height:1.6;margin-bottom:16px}
.pro-btn{width:100%;padding:12px;background:#fff;color:var(--o2);border:none;border-radius:12px;font-size:14px;font-weight:800;cursor:pointer;font-family:inherit;transition:all 200ms}
.info-banner{background:var(--o6);border:1.5px solid var(--o5);border-radius:18px;padding:12px 20px;display:flex;align-items:center;gap:14px;margin-bottom:20px;animation:fadeUp 400ms ease both}
.info-banner p{font-size:14px;font-weight:700;color:var(--o1);letter-spacing:-.01em}
.info-banner .mat{font-size:20px;color:var(--o3)}

.ab-resume-box{background:#fff;border:1px solid var(--border);border-radius:20px;padding:20px;margin-bottom:20px}
.ab-resume-label{font-size:14px;font-weight:800;color:var(--text1);margin-bottom:10px}

.ab-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-bottom:24px}
.ab-card{background:#fff;border:1px solid var(--border);border-radius:20px;padding:20px;display:flex;flex-direction:column;gap:10px;transition:all 250ms}
.ab-card:hover{border-color:var(--o4);box-shadow:var(--sh-md)}
.ab-card-num{font-size:11px;font-weight:800;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:2px}
.ab-input{width:100%;padding:10px 14px;border-radius:10px;border:1px solid var(--border);background:var(--surface);font-family:inherit;font-size:14px;font-weight:700;color:var(--text1);transition:all 200ms}
.ab-input:focus{outline:none;border-color:var(--o4);background:#fff;box-shadow:0 0 0 3px var(--o6)}
.ab-jd-ta{width:100%;padding:14px;border-radius:10px;border:1px solid var(--border);background:var(--surface);font-family:inherit;font-size:14px;font-weight:600;color:var(--text2);min-height:110px;resize:vertical;transition:all 200ms}
.ab-jd-ta:focus{outline:none;border-color:var(--o4);background:#fff;box-shadow:0 0 0 3px var(--o6)}

.ab-btn-centered{display:flex;justify-content:center;margin-top:24px}


.mobile-bottom-nav{display:none;position:fixed;bottom:0;left:0;right:0;background:rgba(255,255,255,.92);backdrop-filter:blur(16px);border-top:1px solid var(--border);padding:8px 0 calc(8px + env(safe-area-inset-bottom,0px));z-index:150}
@media(max-width:768px){
  .hero-wrap{grid-template-columns:1fr;gap:32px;padding:80px 20px 40px}
  .sidebar{transform:translateX(-100%)}
  .main{margin-left:0;padding:16px;padding-bottom:80px}
  .mobile-bottom-nav{display:block}
}

/* AUTH & ONBOARDING */
#page-auth{display:flex!important;flex-direction:column;min-height:100vh;background:var(--white)}
.auth-nav{height:64px;padding:0 32px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border)}
.auth-logo{font-size:20px;font-weight:900;letter-spacing:-.04em;color:var(--t1)}
.auth-logo span{color:var(--o3)}
.auth-wrap{display:grid;grid-template-columns:1.05fr .95fr;flex:1}
.auth-left{background:linear-gradient(135deg,var(--o1),var(--o2));padding:60px 80px;color:#fff;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden}
.auth-left-blob{position:absolute;border-radius:50%;filter:blur(60px);z-index:0}
.auth-left h1{font-size:54px;font-weight:900;letter-spacing:-.05em;line-height:1.05;margin-bottom:24px}
.auth-left-sub{font-size:18px;opacity:.85;line-height:1.6;max-width:480px;margin-bottom:40px}
.auth-feats{display:flex;flex-direction:column;gap:16px}
.auth-feat{display:flex;align-items:center;gap:12px;font-size:15px;font-weight:600;opacity:.9}
.auth-feat .mat{color:var(--o5)}
.auth-proof{margin-top:auto;padding-top:60px}
.auth-avs{display:flex;margin-bottom:12px}
.auth-av{width:32px;height:32px;border-radius:50%;border:2px solid var(--o2);background:var(--o3);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;margin-left:-10px}
.auth-av:first-child{margin-left:0}

.auth-right{padding:60px 80px;display:flex;flex-direction:column;justify-content:center;background:var(--surface)}
.auth-box{width:100%;max-width:420px;margin:0 auto}
.auth-box h2{font-size:32px;font-weight:900;letter-spacing:-.04em;margin-bottom:12px}
.auth-box p{font-size:15px;color:var(--t2);line-height:1.6;margin-bottom:32px}
.google-btn{width:100%;padding:14px;border-radius:14px;border:1.5px solid var(--b2);background:var(--white);font-size:15px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:12px;cursor:pointer;transition:all 150ms}
.google-btn:hover{background:var(--o6);border-color:var(--o4)}
.auth-divider{display:flex;align-items:center;gap:16px;font-size:12px;color:var(--t4);font-weight:700;margin:28px 0}
.auth-divider::before,.auth-divider::after{content:'';flex:1;height:1px;background:var(--b2)}
.auth-tabs{display:flex;gap:4px;background:var(--s2);padding:4px;border-radius:12px;margin-bottom:24px}
.auth-tab{flex:1;padding:10px;border-radius:999px;border:none;background:none;font-size:13px;font-weight:700;color:var(--t3);cursor:pointer;transition:all 200ms}
.auth-tab.active{background:var(--white);color:var(--t1);box-shadow:var(--sh-sm)}
.pwd-bar-bg{height:4px;background:var(--s2);border-radius:99px;margin-top:8px;overflow:hidden}
.pwd-bar-fill{height:100%;transition:width 300ms,background 300ms}

#page-onboarding{min-height:100vh;background:var(--surface);display:flex;flex-direction:column;align-items:center;padding:60px 20px}
.ob-logo{font-size:22px;font-weight:900;letter-spacing:-.04em;margin-bottom:60px}
.ob-logo span{color:var(--o3)}
.ob-prog{display:flex;gap:8px;margin-bottom:48px;align-items:center}
.ob-node{display:flex;flex-direction:column;align-items:center;gap:8px;width:70px}
.ob-circle{width:32px;height:32px;border-radius:50%;background:var(--white);border:2.5px solid var(--b2);color:var(--t4);font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;transition:all 300ms}
.ob-circle.active{border-color:var(--o2);color:var(--o2);box-shadow:0 0 0 4px var(--o6)}
.ob-circle.done{background:var(--o2);border-color:var(--o2);color:var(--white)}
.ob-node-label{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--t4)}
.ob-node-label.active{color:var(--o2)}
.ob-node-label.done{color:var(--t2)}
.ob-line{width:30px;height:2.5px;background:var(--b2);margin-bottom:18px}
.ob-line.done{background:var(--o2)}

.ob-card{width:100%;max-width:580px;background:var(--white);border-radius:24px;box-shadow:var(--sh-lg);padding:48px;position:relative;overflow:hidden}
.ob-ey{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--o3);margin-bottom:12px}
.ob-title{font-size:32px;font-weight:900;letter-spacing:-.03em;line-height:1.2;margin-bottom:12px}
.ob-sub{font-size:16px;color:var(--t2);line-height:1.6;margin-bottom:32px}
.ob-user-card{background:var(--o6);border:1px solid var(--o5);border-radius:16px;padding:20px;display:flex;gap:16px;align-items:center;margin-bottom:24px}
.ob-uavatar{width:56px;height:56px;border-radius:14px;background:var(--o3);color:var(--white);font-size:24px;font-weight:900;display:flex;align-items:center;justify-content:center}
.ob-uname{font-size:18px;font-weight:800;color:var(--t1)}
.ob-uemail{font-size:14px;color:var(--t2)}
.ob-ugoogle{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:800;color:var(--green);margin-top:4px}
.ob-chips{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:32px}
.ob-chip{padding:12px 20px;border-radius:12px;border:1.5px solid var(--b2);font-size:14px;font-weight:700;color:var(--t2);background:var(--white);cursor:pointer;transition:all 150ms}
.ob-chip:hover{border-color:var(--o4);background:var(--o6);color:var(--o2)}
.ob-chip.active{border-color:var(--o3);background:var(--o6);color:var(--o1);box-shadow:var(--sh-sm)}
.ob-actions{display:flex;justify-content:space-between;align-items:center;margin-top:40px}
.ob-back{font-size:14px;font-weight:700;color:var(--t3);cursor:pointer;background:none;border:none}
.ob-skip{font-size:14px;font-weight:700;color:var(--o3);cursor:pointer}
.ob-dropzone{border:2.5px dashed var(--b2);border-radius:20px;padding:48px;text-align:center;transition:all 200ms;cursor:pointer}
.ob-dropzone:hover{border-color:var(--o4);background:var(--o7)}
.ob-dropzone .mat{font-size:48px;color:var(--o4);margin-bottom:16px}
.ob-dropzone h3{font-size:18px;font-weight:800;margin-bottom:4px}
.ob-dropzone p{font-size:14px;color:var(--t3)}/* ═══════════════════════════════════════════════
   UI SYNC UTILITIES (KINETIC EDITION)
═══════════════════════════════════════════════ */

/* FEATURE TABS */
.ftabs{display:flex;background:var(--s2);padding:6px;border-radius:18px;width:fit-content;margin-bottom:32px;gap:4px;box-shadow:inset 0 2px 8px rgba(0,0,0,0.04)}
.ftab{padding:12px 28px;border-radius:12px;font-size:15px;font-weight:800;border:none;background:none;color:var(--t3);cursor:pointer;transition:all 250ms;letter-spacing:-0.01em}
.ftab:hover{color:var(--o2)}
.ftab.active{background:var(--white);color:var(--t1);box-shadow:var(--sh-md)}

/* STAT GRID */
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-bottom:32px}
.scard{background:var(--w);border:1.5px solid var(--bd);border-radius:24px;padding:24px;transition:all 250ms}
.scard:hover{transform:translateY(-4px);box-shadow:var(--sh3);border-color:var(--o4)}
.scard-icon{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:16px}
.scard-num{font-size:42px;font-weight:900;letter-spacing:-0.04em;color:var(--t1);line-height:1}
.scard-label{font-size:13px;font-weight:700;color:var(--t3);margin-top:4px}
.scard-delta{font-size:12px;font-weight:800;margin-top:12px;display:flex;align-items:center;gap:4px}

/* QUICK ACTIONS */
.qa-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px}
.qa-item{background:var(--w);border:1.5px solid var(--bd);border-radius:20px;padding:20px;display:flex;align-items:center;gap:16px;cursor:pointer;transition:all 250ms}
.qa-item:hover{background:var(--o6);border-color:var(--o4);transform:translateY(-2px);box-shadow:var(--sh2)}
.qa-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.qa-info h4{font-size:15px;font-weight:800;color:var(--t1);margin-bottom:2px}
.qa-info p{font-size:12px;color:var(--t3);font-weight:600}

/* A/B GRID (JOB MATCH) */
.ab-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:24px}
.ab-card{background:var(--w);border:1.5px solid var(--bd);border-radius:24px;padding:24px;display:flex;flex-direction:column;gap:12px;transition:all 250ms;position:relative}
.ab-card:hover{border-color:var(--o4);box-shadow:var(--sh3)}
.ab-num{font-size:11px;font-weight:800;color:var(--t3);text-transform:uppercase;letter-spacing:0.1em;opacity:0.6}
.ab-inp-w{display:flex;flex-direction:column;gap:6px}
.ab-inp-l{font-size:11px;font-weight:800;color:var(--t4);text-transform:uppercase}
.ab-input{width:100%;padding:12px 16px;border-radius:12px;border:1.5px solid var(--bd2);background:var(--sf);font-family:inherit;font-size:14px;font-weight:700;color:var(--t1);transition:all 200ms}
.ab-input:focus{outline:none;border-color:var(--o3);background:var(--w);box-shadow:0 0 0 4px var(--o6)}
.ab-area{width:100%;padding:16px;border-radius:12px;border:1.5px solid var(--bd2);background:var(--sf);font-family:inherit;font-size:14px;font-weight:600;color:var(--t2);min-height:140px;resize:none;transition:all 200ms}
.ab-area:focus{outline:none;border-color:var(--o3);background:var(--w);box-shadow:0 0 0 4px var(--o6)}

/* SALARY CARDS */
.sal-card{background:var(--w);border:1.5px solid var(--bd);border-radius:24px;padding:28px;transition:all 250ms;cursor:pointer;display:flex;flex-direction:column;gap:12px}
.sal-card:hover{transform:translateY(-4px);box-shadow:var(--sh3);border-color:var(--o4)}
.sal-role{font-size:20px;font-weight:900;color:var(--t1);letter-spacing:-.02em}
.sal-city{font-size:13px;color:var(--t3);font-weight:600}
.sal-range{font-size:32px;font-weight:900;color:var(--o2);letter-spacing:-.04em}
.sal-bar-bg{height:12px;background:var(--s2);border-radius:99px;overflow:hidden;margin:8px 0}
.sal-bar-fill{height:100%;background:linear-gradient(90deg,var(--o2),var(--o3));border-radius:99px;transition:width 800ms cubic-bezier(0.16, 1, 0.3, 1)}
.sal-meta{display:flex;justify-content:space-between;align-items:center;font-size:13px;font-weight:700;color:var(--t2)}
/* INTERVIEW PREP (KINETIC EDITION) */
.ip-header{display:flex;justify-content:space-between;align-items:center;padding:12px 28px;background:var(--w);border-bottom:1.5px solid var(--bd2);margin-bottom:24px}
.ip-prog-label{font-size:12px;font-weight:800;color:var(--t3);text-transform:uppercase;letter-spacing:0.05em}
.ip-prog-val{color:var(--o2);margin-left:8px}

.ip-grid{display:grid;grid-template-columns:1.6fr 1fr;gap:24px;align-items:start}

.ip-card{background:var(--w);border:1.5px solid var(--bd);border-radius:24px;padding:28px;box-shadow:var(--sh-sm);position:relative}
.ip-card-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.ip-status{font-size:11px;font-weight:800;color:var(--t3);display:flex;align-items:center;gap:6px;text-transform:uppercase}
.dot-blink{width:8px;height:8px;background:var(--o3);border-radius:50%;animation:pulse 1.5s infinite}

.ip-rings{display:flex;justify-content:space-around;padding:24px 0;text-align:center}
.ip-ring-w{width:120px;height:120px;position:relative;margin:0 auto 12px}
.ip-ring-w svg{transform:rotate(-90deg)}
.ip-ring-c{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1}
.ip-ring-num{font-size:28px;font-weight:900;color:var(--t1)}
.ip-ring-pct{font-size:12px;opacity:0.6;font-weight:700}
.ip-ring-label{font-size:14px;font-weight:800;color:var(--t2);margin-bottom:4px}
.ip-ring-sub{font-size:11px;font-weight:600;color:var(--t3)}

.ip-star-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:24px}
.ip-star-box{background:var(--sf);border:1.5px solid var(--bd2);border-radius:16px;padding:16px;display:flex;flex-direction:column;gap:8px}
.ip-star-l{font-size:10px;font-weight:800;color:var(--t4);text-transform:uppercase;letter-spacing:0.05em}
.ip-star-s{display:flex;align-items:center;gap:6px;font-size:14px;font-weight:700}
.ip-star-s.present{color:var(--green)}
.ip-star-s.missing{color:var(--t4)}

.ip-ans-w{margin-top:24px}
.ip-ans-area{width:100%;min-height:160px;padding:24px;border-radius:20px;border:1.5px solid var(--bd2);background:var(--sf);font-family:inherit;font-size:15px;line-height:1.6;color:var(--t2);outline:none;transition:all 200ms;resize:none}
.ip-ans-area:focus{border-color:var(--o3);background:var(--w);box-shadow:0 0 0 4px var(--o6)}

.ip-side-sec{display:flex;flex-direction:column;gap:16px}
.ip-stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;text-align:center}
.ip-stat-i h4{font-size:24px;font-weight:900;color:var(--t1);line-height:1}
.ip-stat-i span{font-size:10px;font-weight:800;color:var(--t3);text-transform:uppercase;display:block;margin-top:4px}

.kw-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.kw-tag{padding:6px 14px;border-radius:10px;font-size:12px;font-weight:700;display:flex;align-items:center;gap:4px;cursor:default}
.kw-tag.v{background:var(--gl);color:var(--green);border:1px solid var(--gbg)}
.kw-tag.o{background:var(--o6);color:var(--t2);border:1px solid var(--o5);opacity:0.75}

.filler-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--bd2);font-size:13px;font-weight:700}
.filler-row span:last-child{color:var(--o3);font-weight:900}

.hist-item{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:var(--sf);border-radius:12px;margin-bottom:8px;transition:all 150ms}
.hist-item:hover{background:var(--o6)}
.hist-item p{font-size:13px;font-weight:700;color:var(--t1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px}
.hist-item span{font-size:13px;font-weight:900;color:var(--o3)}
/* PRICING SYSTEM (KINETIC EDITION) */
.pr-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:48px}
.pr-card{background:var(--w);border:1.5px solid var(--bd);border-radius:32px;padding:40px;display:flex;flex-direction:column;transition:all 300ms;position:relative}
.pr-card:hover{transform:translateY(-8px);box-shadow:var(--sh4);border-color:var(--o3)}
.pr-card.popular{border-color:var(--o3);background:var(--o7);box-shadow:var(--sh-or)}
.pr-card.valuable{border:2px solid var(--o2);background:var(--white);box-shadow:var(--shol)}
.pr-tag{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,var(--o2),var(--o3));color:#fff;font-size:11px;font-weight:900;padding:5px 16px;border-radius:99px;white-space:nowrap;letter-spacing:0.04em}

.pr-h{margin-bottom:32px}
.pr-name{font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:var(--t3);margin-bottom:8px}
.pr-price{font-size:48px;font-weight:900;color:var(--t1);letter-spacing:-0.05em;line-height:1}
.pr-price span{font-size:16px;font-weight:700;color:var(--t3);letter-spacing:0}

.pr-list{list-style:none;margin:32px 0;display:flex;flex-direction:column;gap:14px;flex-grow:1}
.pr-it{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600;color:var(--t2)}
.pr-it .mat{font-size:18px;color:var(--green)}
.pr-it.no{opacity:0.4}
.pr-it.no .mat{color:var(--t4)}

.pr-comp-w{background:var(--w);border:1.5px solid var(--bd);border-radius:32px;padding:48px;margin-top:64px;overflow:hidden}
.pr-table{width:100%;border-collapse:collapse;text-align:left}
.pr-table th{padding:24px;font-size:14px;font-weight:800;color:var(--t1);border-bottom:1.5px solid var(--bd)}
.pr-table td{padding:20px 24px;font-size:14px;font-weight:600;color:var(--t2);border-bottom:1px solid var(--bd)}
.pr-table tr:hover{background:var(--o7)}
.pr-table .check{color:var(--green);font-weight:900}
.pr-table .cross{color:var(--t4);font-weight:900}

.bill-tog{display:flex;align-items:center;gap:16px;background:var(--s2);padding:6px;border-radius:20px;width:fit-content;margin:0 auto 48px}
.bt-btn{padding:10px 24px;border-radius:14px;font-size:14px;font-weight:800;border:none;background:none;color:var(--t3);cursor:pointer;transition:all 250ms}
.bt-btn.active{background:var(--white);color:var(--t1);box-shadow:var(--sh-md)}

.save-tag{background:var(--tbg);color:var(--tl);font-size:10px;font-weight:900;padding:2px 8px;border-radius:6px;margin-left:8px}

.locked-overlay{position:absolute;inset:0;background:rgba(255,255,255,0.7);backdrop-filter:blur(6px);z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:inherit}
.locked-msg{background:var(--white);padding:24px;border-radius:20px;box-shadow:var(--sh-xl);border:1.5px solid var(--o5);text-align:center;max-width:280px}
.locked-msg h4{font-size:16px;font-weight:900;color:var(--o1);margin-bottom:8px}
.locked-msg p{font-size:12px;color:var(--t3);margin-bottom:16px}

```

### src\app\layout.tsx

```
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Manrope } from 'next/font/google';
import './globals.css';
import Toasts from '@/components/ui/Toasts';
import CommandPalette from '@/components/ui/CommandPalette';
import ShareModal from '@/components/ui/ShareModal';
import UpgradeModal from '@/components/ui/UpgradeModal';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
});

import InDepthAnalysisModal from '@/components/ui/InDepthAnalysisModal';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Hirely AI — Next Level Career Intelligence',
  description: 'AI-Powered Career Intelligence',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${plusJakarta.variable} ${manrope.variable}`}>
        <AuthProvider>
          <Toasts />
          <CommandPalette />
          <ShareModal />
          <UpgradeModal />
          <InDepthAnalysisModal />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

```

### src\app\page.module.css

```
.page {
  --background: #fafafa;
  --foreground: #fff;

  --text-primary: #000;
  --text-secondary: #666;

  --button-primary-hover: #383838;
  --button-secondary-hover: #f2f2f2;
  --button-secondary-border: #ebebeb;

  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--font-geist-sans);
  background-color: var(--background);
}

.main {
  display: flex;
  flex: 1;
  width: 100%;
  max-width: 800px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: var(--foreground);
  padding: 120px 60px;
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 24px;
}

.intro h1 {
  max-width: 320px;
  font-size: 40px;
  font-weight: 600;
  line-height: 48px;
  letter-spacing: -2.4px;
  text-wrap: balance;
  color: var(--text-primary);
}

.intro p {
  max-width: 440px;
  font-size: 18px;
  line-height: 32px;
  text-wrap: balance;
  color: var(--text-secondary);
}

.intro a {
  font-weight: 500;
  color: var(--text-primary);
}

.ctas {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 440px;
  gap: 16px;
  font-size: 14px;
}

.ctas a {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  border-radius: 128px;
  border: 1px solid transparent;
  transition: 0.2s;
  cursor: pointer;
  width: fit-content;
  font-weight: 500;
}

a.primary {
  background: var(--text-primary);
  color: var(--background);
  gap: 8px;
}

a.secondary {
  border-color: var(--button-secondary-border);
}

/* Enable hover only on non-touch devices */
@media (hover: hover) and (pointer: fine) {
  a.primary:hover {
    background: var(--button-primary-hover);
    border-color: transparent;
  }

  a.secondary:hover {
    background: var(--button-secondary-hover);
    border-color: transparent;
  }
}

@media (max-width: 600px) {
  .main {
    padding: 48px 24px;
  }

  .intro {
    gap: 16px;
  }

  .intro h1 {
    font-size: 32px;
    line-height: 40px;
    letter-spacing: -1.92px;
  }
}

@media (prefers-color-scheme: dark) {
  .logo {
    filter: invert();
  }

  .page {
    --background: #000;
    --foreground: #000;

    --text-primary: #ededed;
    --text-secondary: #999;

    --button-primary-hover: #ccc;
    --button-secondary-hover: #1a1a1a;
    --button-secondary-border: #1a1a1a;
  }
}

```

### src\app\page.tsx

```
'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/AuthContext';

export default function LandingPage() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [isAnnual, setIsAnnual] = useState(false);

  // Redirect if logged in
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [demoState, setDemoState] = useState<'idle' | 'loading' | 'result'>('idle');
  const [demoScore, setDemoScore] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [counts, setCounts] = useState({ analyses: 0, offers: 0, score: 0, time: 0 });
  const [signupCount, setSignupCount] = useState(12847);
  const [tab, setTab] = useState<'plans' | 'redeem'>('plans');
  const [coupon, setCoupon] = useState('');

  // Counter animation logic
  useEffect(() => {
    const duration = 2200;
    const start = Date.now();
    const targets = { analyses: 847231, offers: 12490, score: 31, time: 15 };

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      
      setCounts({
        analyses: Math.round(ease * targets.analyses),
        offers: Math.round(ease * targets.offers),
        score: Math.round(ease * targets.score),
        time: Math.round(ease * targets.time),
      });

      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const interval = setInterval(() => {
      setSignupCount(prev => prev + Math.round(Math.random() * 3));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const runDemo = () => {
    setDemoState('loading');
    setTimeout(() => {
      setDemoState('result');
      setDemoScore(Math.floor(Math.random() * 30) + 65);
    }, 2000);
  };

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const handleCoupon = () => {
    if (coupon.trim().toUpperCase() === 'CHARANFABLY7890') {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'Voucher applied! Advanced features unlocked.' } }));
      localStorage.setItem('user_tier', 'advanced');
      setCoupon('');
      router.push('/dashboard');
    } else {
      showToast('error', 'Invalid promotional code.');
    }
  };

  return (
    <div id="page-landing" className="page active">
      <Navbar />

      {/* HERO */}
      <div className="hero-wrap">
        <div className="afu">
          <div className="hero-badge">✦ The Complete AI Career Intelligence Suite</div>
          <h1 className="hero-h1">Secure Your <span className="acc">Dream Career</span><br/>With Precision</h1>
          <p className="hero-p" style={{ fontSize: '18px' }}>One platform. Every step. We analyze resumes, match roles, draft letters, trap applications, and negotiate salaries — powered by Hirely’s proprietary hiring AI.</p>
          <div className="hero-ctas">
            <button className="btn-hero-primary" onClick={() => router.push('/analyzer')}>
              <span className="matf">rocket_launch</span> Start Your Analysis
            </button>
            <button className="btn-hero-ghost" onClick={() => document.getElementById('features-anchor')?.scrollIntoView({ behavior: 'smooth' })}>
              <span className="mat">auto_awesome</span> Explore features
            </button>
          </div>
          <div className="hero-sub">6 Professional Tools · Real-time Market Data · Trusted by 12k+ Tech Professionals</div>
        </div>
        <div style={{ position: 'relative', height: '420px' }} className="afu">
          {/* Floating cards */}
          <div className="glass" style={{ position: 'absolute', top: 0, left: 0, width: '280px', borderRadius: '18px', padding: '24px', boxShadow: 'var(--sh-lg)', animation: 'float 6s ease-in-out infinite', transform: 'rotate(-2deg)', zIndex: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div><div style={{ fontSize: '14px', fontWeight: 800 }}>ATS Score</div><div style={{ fontSize: '12px', color: 'var(--text3)' }}>Senior PM · Google</div></div>
              <div style={{ background: 'var(--o6)', padding: '8px', borderRadius: '10px' }}><span className="mat" style={{ fontSize: '18px', color: 'var(--o2)' }}>verified</span></div>
            </div>
            <div style={{ fontSize: '56px', fontWeight: 900, color: 'var(--o1)', letterSpacing: '-.04em', margin: '12px 0 8px' }}>92%</div>
            <div style={{ height: '10px', background: 'var(--o6)', borderRadius: '99px', overflow: 'hidden' }}><div style={{ height: '100%', width: '92%', background: 'linear-gradient(90deg, var(--o1), var(--o3))', borderRadius: '99px' }}></div></div>
            <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '12px', fontStyle: 'italic', fontWeight: 600 }}>"Optimized for High-Impact Keywords"</div>
          </div>
          <div className="glass" style={{ position: 'absolute', top: '190px', right: '10px', width: '230px', borderRadius: '18px', padding: '20px', boxShadow: 'var(--sh-lg)', animation: 'float 8s ease-in-out infinite .5s', transform: 'rotate(1.5deg)', zIndex: 1 }}>
            <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--o3)', marginBottom: '8px' }}>✦ CAREER PATHING</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text1)', lineHeight: 1.4 }}>Next Level: Senior Product Architect · ↑ ₹12L Hike</div>
          </div>
          <div className="glass" style={{ position: 'absolute', bottom: '20px', left: '40px', width: '210px', borderRadius: '16px', padding: '14px 20px', boxShadow: 'var(--sh-md)', border: '1px solid var(--o5)', zIndex: 3 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', flexShrink: 0, animation: 'pulse 2s infinite' }}></div><span style={{ fontSize: '14px', fontWeight: 800 }}>Interviewing at Meta</span></div>
          </div>
        </div>
      </div>
      
      {/* COUNTER STRIP - MOVED UP */}
      <div className="counter-strip" style={{ background: 'var(--o1)', color: 'white', borderTop: '1px solid #ffffff20' }}>
        <div className="counter-grid">
          <div><div className="counter-num"><span className="counter-live-dot"></span>{counts.analyses.toLocaleString('en-IN')}</div><div className="counter-label">Resumes Analyzed</div></div>
          <div><div className="counter-num">{counts.offers.toLocaleString('en-IN')}</div><div className="counter-label">Offers Secured</div></div>
          <div><div className="counter-num">{counts.score}%</div><div className="counter-label">Avg Improvement</div></div>
          <div><div className="counter-num">{counts.time}d</div><div className="counter-label">Avg Time to Hire</div></div>
        </div>
      </div>

      {/* SOCIAL PROOF BAR */}
      <div className="proof-bar">
        <div className="proof-inner">
          <div className="proof-avatars">
            <div className="proof-av">C</div><div className="proof-av">H</div><div className="proof-av">A</div><div className="proof-av">R</div><div className="proof-av">A</div><div className="proof-av">N</div>
          </div>
          <div className="proof-text"><span>{signupCount.toLocaleString('en-IN')}</span> seekers landed offers at</div>
          <div className="proof-companies" style={{ opacity: 0.8 }}>
            <span className="proof-company">Google</span><span className="proof-company">Amazon</span><span className="proof-company">Stripe</span><span className="proof-company">Razorpay</span><span className="proof-company">Zomato</span>
          </div>
        </div>
      </div>


      {/* DEMO SECTION */}
      <div className="demo-section" id="demo-anchor">
        <div className="demo-inner">
          <div className="section-eyebrow">Try It Now — No Signup Required</div>
          <div className="section-title">Get Your Match Score in 10 Seconds</div>
          <div className="demo-grid">
            <div className="demo-panel">
              <div className="demo-label"><span className="mat">person</span> Your Resume</div>
              <textarea className="demo-ta" placeholder="Paste your resume text..."></textarea>
            </div>
            <div className="demo-panel">
              <div className="demo-label"><span className="mat">work</span> Job Description</div>
              <textarea className="demo-ta" placeholder="Paste job description..."></textarea>
            </div>
          </div>
          <button className="demo-btn" onClick={runDemo}>
            <span className="mat">bolt</span> Get My Match Score — Free
          </button>

          {demoState === 'loading' && (
            <div style={{ textAlign: 'center', padding: '36px' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid var(--o5)', borderTopColor: 'var(--o2)', borderRadius: '50%', animation: 'spin .8s linear infinite', margin: '0 auto 14px' }}></div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text2)' }}>Analyzing your match...</div>
            </div>
          )}

          {demoState === 'result' && (
            <div className="demo-result-wrap show">
              <div className="result-card">
                <div className="result-ring-wrap">
                  <svg width="110" height="110" viewBox="0 0 110 110">
                    <circle cx="55" cy="55" r="46" fill="none" stroke="var(--o6)" strokeWidth="10"/>
                    <circle cx="55" cy="55" r="46" fill="none" stroke="url(#demo-grad)" strokeWidth="10" strokeLinecap="round" strokeDasharray="289" strokeDashoffset={289 - (demoScore / 100) * 289} style={{ transition: 'stroke-dashoffset 1.2s ease' }}/>
                    <defs><linearGradient id="demo-grad"><stop offset="0%" stopColor="#a33d00"/><stop offset="100%" stopColor="#c9510d"/></linearGradient></defs>
                  </svg>
                  <div className="result-score-center"><span className="result-score-num">{demoScore}%</span><span className="result-score-pct">match</span></div>
                </div>
                <div className="result-info">
                  <h3>{demoScore >= 80 ? 'Strong Match 💪' : 'Good Match 👍'}</h3>
                  <p>Your resume highlights key skills needed for this role. Check the full breakdown below.</p>
                  {!unlocked ? (
                    <div className="email-gate">
                      <p>🔓 Enter email to unlock full ATS breakdown</p>
                      <div className="email-gate-row">
                        <input className="email-input" type="email" placeholder="your@email.com"/>
                        <button className="email-submit" onClick={() => { setUnlocked(true); showToast('success', 'Full analysis unlocked!'); }}>Unlock →</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ color: 'var(--green)', fontWeight: 700 }}>✓ Analysis Unlocked</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PRICING */}
      <div className="pricing-section" id="pricing-anchor" style={{ background: 'var(--sf)' }}>
        <div className="pricing-inner">
          <div className="section-eyebrow">Pricing Plans</div>
          <div className="section-title">Upgrade Your Career</div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', borderBottom: '1px solid var(--border)', marginBottom: '40px', marginTop: '40px' }}>
            <button 
              onClick={() => setTab('plans')}
              style={{ padding: '0 16px 16px', background: 'none', border: 'none', fontSize: '18px', fontWeight: 900, color: tab === 'plans' ? 'var(--o1)' : 'var(--t4)', borderBottom: `3px solid ${tab === 'plans' ? 'var(--o3)' : 'transparent'}`, cursor: 'pointer', transition: 'all 0.3s' }}
            >
              Subscription
            </button>
            <button 
              onClick={() => setTab('redeem')}
              style={{ padding: '0 16px 16px', background: 'none', border: 'none', fontSize: '18px', fontWeight: 900, color: tab === 'redeem' ? 'var(--o1)' : 'var(--t4)', borderBottom: `3px solid ${tab === 'redeem' ? 'var(--o3)' : 'transparent'}`, cursor: 'pointer', transition: 'all 0.3s' }}
            >
              Redeem Voucher
            </button>
          </div>
          
          {tab === 'plans' ? (
            <div className="afu">
              <div className="billing-toggle">
                <span className={`tog-label ${!isAnnual ? 'active' : ''}`}>Monthly</span>
                <div className={`tog-track ${isAnnual ? 'annual' : ''}`} onClick={() => setIsAnnual(!isAnnual)}><div className="tog-thumb"></div></div>
                <span className={`tog-label ${isAnnual ? 'active' : ''}`}>Annual</span>
                <span className="save-badge">Save 33%</span>
              </div>
              
              <div className="pricing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                <div className="pricing-card">
                  <div className="pricing-name">Free</div>
                  <div className="pricing-price">₹0</div>
                  <ul className="pricing-ul">
                    <li><span className="mat">check</span> 1 resume analysis/day</li>
                    <li><span className="mat">check</span> 1 job match/day</li>
                    <li className="no"><span className="mat">lock</span> STAR Interview Coach</li>
                    <li className="no"><span className="mat">lock</span> Mock Interviews</li>
                  </ul>
                  <button className="pricing-cta p-outline" onClick={() => router.push('/dashboard')}>Start Free</button>
                </div>

                <div className="pricing-card feat">
                  <div className="pricing-pop">Popular</div>
                  <div className="pricing-name">Pro</div>
                  <div className="pricing-price">{isAnnual ? '₹3,999' : '₹499'}<span>/{isAnnual ? 'yr' : 'mo'}</span></div>
                  <ul className="pricing-ul">
                    <li><span className="mat">check</span> Unlimited Resume Scans</li>
                    <li><span className="mat">check</span> STAR Interview Coach</li>
                    <li><span className="mat">check</span> Advanced Cover Letters</li>
                    <li className="no"><span className="mat">lock</span> Mock Interviews</li>
                  </ul>
                  <button className="pricing-cta p-filled" onClick={() => router.push('/dashboard')}>Upgrade to Pro</button>
                </div>

                <div className="pricing-card" style={{ border: '2px solid var(--t1)' }}>
                  <div className="pricing-name">Advanced</div>
                  <div className="pricing-price">{isAnnual ? '₹9,999' : '₹1,199'}<span>/{isAnnual ? 'yr' : 'mo'}</span></div>
                  <ul className="pricing-ul">
                    <li><span className="mat">check</span> Everything in Pro</li>
                    <li><span className="mat">check</span> Mock Interviews AI</li>
                    <li><span className="mat">check</span> Salary Intelligence</li>
                    <li><span className="mat">check</span> Recruiter Score</li>
                  </ul>
                  <button className="pricing-cta p-filled" style={{ background: 'var(--t1)' }} onClick={() => router.push('/dashboard')}>Get Advanced</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="afu" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '60px 32px', background: 'var(--w)', borderRadius: '32px', border: '1.5px solid var(--border)', boxShadow: 'var(--sh-lg)' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--o6)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--o1)' }}>
                <span className="mat" style={{ fontSize: '40px' }}>confirmation_number</span>
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--t1)', marginBottom: '8px' }}>Redeem Your Voucher 🎁</h3>
              <p style={{ fontSize: '15px', color: 'var(--t3)', fontWeight: 600, marginBottom: '32px' }}>Enter your code to unlock premium career tools instantly.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: '0 auto' }}>
                <input 
                  className="email-input" 
                  style={{ height: '60px', borderRadius: '18px', textTransform: 'uppercase', textAlign: 'center', fontWeight: 900, fontSize: '24px', letterSpacing: '0.2em', border: '1.5px solid var(--bd)' }} 
                  placeholder="XYZ-123" 
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                />
                <button className="btn-hero-primary" onClick={handleCoupon} style={{ width: '100%', height: '56px', fontSize: '16px', fontWeight: 900 }}>Redeem Voucher →</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FAQ */}
      <div className="faq-section">
        <div className="faq-inner">
          <div className="section-title">FAQ</div>
          <div className="faq-list">
            {[
              ['Is my resume data private?', 'Yes, we encrypt everything.'],
              ['How accurate is the ATS score?', 'Highly accurate, simulated on real systems.'],
            ].map(([q, a], i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {q} <span className="mat">expand_more</span>
                </div>
                {openFaq === i && <div className="faq-a">{a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="site-footer">
        <div className="footer-logo">Hirely AI</div>
        <div className="footer-copy">© 2025 · Made in India 🇮🇳</div>
      </div>
    </div>
  );
}

```

### src\app\alerts\page.tsx

```
'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useSubscription } from '@/hooks/useSubscription';

type Alert = {
  id: number;
  role: string;
  loc: string;
  auto: boolean;
  matches: number;
  active: boolean;
};

const INITIAL_ALERTS: Alert[] = [
  { id: 1, role: 'Senior Product Manager', loc: 'Bangalore, Hybrid', auto: true, matches: 12, active: true },
  { id: 2, role: 'Product Director', loc: 'Remote (India)', auto: false, matches: 3, active: true },
  { id: 3, role: 'Group PM', loc: 'San Francisco, CA', auto: false, matches: 0, active: false }
];

export default function JobAlertsPage() {
  const { tier } = useSubscription();
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const toggleAlert = (id: number, field: 'auto' | 'active') => {
    if (tier === 'free' && field === 'auto') {
      showToast('info', 'Auto-Apply requires a Pro plan.');
      return;
    }
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, [field]: !a[field] } : a));
    showToast('success', `${field === 'auto' ? 'Auto-Apply' : 'Alert'} setting updated.`);
  };

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div className="pg-hdr" style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)' }}>Job Alerts & Auto-Apply</h1>
                <span className="badge" style={{ background: 'var(--tl)', color: '#fff', fontSize: '10px' }}>PRO</span>
              </div>
              <p style={{ color: 'var(--t3)', fontWeight: 600 }}>Set up laser-focused queries and let our AI apply on your behalf.</p>
            </div>
            <button className="btn btn-p" onClick={() => showToast('info', 'Creating new alert...')}>
              <span className="mat" style={{ marginRight: '6px' }}>add</span> New Alert
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '24px' }}>
            {/* Main Area: Alerts List */}
            <div>
              {alerts.map((a, i) => (
                <div key={a.id} className="card afu" style={{ padding: '24px', marginBottom: '16px', borderLeft: a.active ? '3px solid var(--gn)' : '3px solid var(--s3)', opacity: a.active ? 1 : 0.6, animationDelay: `${i * 100}ms` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--t1)' }}>{a.role}</h3>
                        {!a.active && <span className="badge" style={{ background: 'var(--s2)', color: 'var(--t3)' }}>Paused</span>}
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--t2)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="mat" style={{ fontSize: '16px', color: 'var(--t4)' }}>location_on</span> {a.loc}
                      </div>
                    </div>
                    
                    <div className={`toggle-sw ${a.active ? 'on' : ''}`} onClick={() => toggleAlert(a.id, 'active')} style={{ alignSelf: 'flex-start' }}>
                      <div className="toggle-thumb"></div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--bd)', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '4px' }}>NEW MATCHES</div>
                        <div style={{ fontSize: '16px', fontWeight: 900, color: a.matches > 0 ? 'var(--o2)' : 'var(--t1)' }}>{a.matches}</div>
                      </div>
                      <div style={{ height: '32px', width: '1px', background: 'var(--bd)' }}></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--t2)' }}>Auto-Apply <span className="mat" style={{ fontSize: '14px', color: 'var(--o2)', verticalAlign: 'middle' }}>auto_awesome</span></div>
                        <div className={`toggle-sw ${a.auto ? 'on' : ''}`} onClick={() => toggleAlert(a.id, 'auto')}>
                          <div className="toggle-thumb"></div>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-g btn-sm" style={{ padding: '8px 12px' }} onClick={() => showToast('info', `Editing ${a.role} alert...`)}>Edit</button>
                      <button className="btn btn-p btn-sm" style={{ padding: '8px 16px' }} onClick={() => showToast('success', `Viewing ${a.matches} matches...`)}>View Matches →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Guidelines */}
            <div className="afu" style={{ animationDelay: '200ms' }}>
              <div className="card" style={{ padding: '24px', background: 'linear-gradient(145deg, var(--s3), var(--s2))', border: '1px solid var(--bd)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="mat" style={{ color: 'var(--o3)' }}>info</span> Auto-Apply Rules
                </h3>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                  <li style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.6, marginBottom: '12px', display: 'flex', gap: '8px' }}>
                    <span className="mat" style={{ color: 'var(--gn)', fontSize: '18px' }}>check_circle</span>
                    Only applies if Match Score > 80%
                  </li>
                  <li style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.6, marginBottom: '12px', display: 'flex', gap: '8px' }}>
                    <span className="mat" style={{ color: 'var(--gn)', fontSize: '18px' }}>check_circle</span>
                    Auto-generates targeted Cover Letter
                  </li>
                  <li style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.6, display: 'flex', gap: '8px' }}>
                    <span className="mat" style={{ color: 'var(--gn)', fontSize: '18px' }}>check_circle</span>
                    Answers basic screening questions based on your profile
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

```

### src\app\analyzer\page.tsx

```
'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

export default function ResumeAnalyzer() {
  const [state, setState] = useState<'idle' | 'uploading' | 'analyzing' | 'result'>('idle');
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);

  const startAnalysis = () => {
    setState('uploading');
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 30;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setState('analyzing');
        setTimeout(() => {
          setState('result');
          setScore(84);
        }, 2000);
      }
      setProgress(p);
    }, 400);
  };

  const showToast = (type: any, msg: string) => window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));

  return (
    <div id="page-analyzer" className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main">
          <div className="dash-header">
            <div>
              <h1>Resume Analyzer 🚀</h1>
              <p style={{ color: 'var(--t2)', fontWeight: 600, marginTop: '4px' }}>
                Simulate a real ATS scan and see how a recruiter views your profile.
              </p>
            </div>
            <button className="btn btn-s" onClick={() => setState('idle')}><span className="mat">refresh</span> New Analysis</button>
          </div>

          {state === 'idle' && (
            <div className="afu">
              <div className="ob-dropzone" style={{ minHeight: '360px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} onClick={startAnalysis}>
                <div style={{ width: '80px', height: '80px', background: 'var(--o6)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <span className="mat" style={{ fontSize: '40px', color: 'var(--o3)' }}>cloud_upload</span>
                </div>
                <h3>Drop your resume here (PDF or DOCX)</h3>
                <p style={{ maxWidth: '320px', margin: '8px auto 24px' }}>Drag and drop your file or click to browse. Max file size: 5MB.</p>
                <button className="btn btn-p" onClick={(e) => { e.stopPropagation(); startAnalysis(); }}>
                   Select File to Analyze
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '40px' }}>
                <div className="dash-card">
                  <div className="stat-icon" style={{ background: 'var(--o6)', color: 'var(--o3)' }}><span className="mat">search_check</span></div>
                  <h4 style={{ marginBottom: '8px' }}>ATS Simulation</h4>
                  <p style={{ fontSize: '13px', color: 'var(--t3)', lineHeight: 1.5 }}>Our AI mimics Oracle Taleo, Workday, and Greenhouse parsers to ensure your layout is 100% visible.</p>
                </div>
                <div className="dash-card">
                  <div className="stat-icon" style={{ background: 'var(--gbg)', color: 'var(--green)' }}><span className="mat">key</span></div>
                  <h4 style={{ marginBottom: '8px' }}>Keyword Insight</h4>
                  <p style={{ fontSize: '13px', color: 'var(--t3)', lineHeight: 1.5 }}>Identify missing skills and high-leverage keywords that boost your visibility in recruiter searches.</p>
                </div>
                <div className="dash-card">
                  <div className="stat-icon" style={{ background: 'var(--pl)', color: 'var(--purple)' }}><span className="mat">edit_note</span></div>
                  <h4 style={{ marginBottom: '8px' }}>Smart Editing</h4>
                  <p style={{ fontSize: '13px', color: 'var(--t3)', lineHeight: 1.5 }}>Receive real-time line-by-line feedback on your bullet points to maximize impact scores.</p>
                </div>
              </div>

              <div style={{ marginTop: '48px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 900 }}>Your Recent Scans</h3>
                  <button className="btn btn-s btn-sm">View Archive</button>
                </div>
                <div className="dash-card" style={{ padding: '0' }}>
                  {[
                    { name: 'Senior Fullstack v.4', date: '2 hours ago', score: 87, status: 'OPTIMIZED' },
                    { name: 'Generic Backend Developer', date: '1 day ago', score: 62, status: 'ACTION NEEDED' },
                    { name: 'Charan_Resume_Stripe_v1', date: '3 days ago', score: 78, status: 'STRATEGIC' },
                  ].map((scan, i) => (
                    <div key={i} className="sb-it" style={{ padding: '16px 20px', borderBottom: i === 2 ? 'none' : '1px solid var(--border)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <span className="mat" style={{ color: 'var(--t3)' }}>description</span>
                          <div>
                            <p style={{ fontWeight: 700, fontSize: '14px' }}>{scan.name}</p>
                            <span style={{ fontSize: '12px', color: 'var(--t4)' }}>Analyzed {scan.date}</span>
                          </div>
                       </div>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                          <span className="sb-badge" style={{ background: scan.status === 'ACTION NEEDED' ? 'var(--rbg)' : scan.status === 'OPTIMIZED' ? 'var(--gbg)' : 'var(--abg)', color: scan.status === 'ACTION NEEDED' ? 'var(--red)' : scan.status === 'OPTIMIZED' ? 'var(--green)' : 'var(--amber)', fontSize: '10px' }}>{scan.status}</span>
                          <div style={{ textAlign: 'right', minWidth: '40px' }}>
                             <span style={{ fontWeight: 900, color: 'var(--t1)' }}>{scan.score}</span><span style={{ fontSize: '10px', color: 'var(--t3)', marginLeft: '2px' }}>/100</span>
                          </div>
                          <span className="mat" style={{ color: 'var(--t4)' }}>chevron_right</span>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {(state === 'uploading' || state === 'analyzing') && (
            <div className="afu" style={{ textAlign: 'center', padding: '100px 20px' }}>
              <div style={{ width: '120px', height: '120px', position: 'relative', margin: '0 auto 32px' }}>
                 <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="var(--s2)" strokeWidth="8"/>
                    <circle cx="60" cy="60" r="54" fill="none" stroke="var(--o3)" strokeWidth="8" strokeLinecap="round" strokeDasharray="339.29" strokeDashoffset={339.29 - (progress/100)*339.29} style={{ transition: 'stroke-dashoffset 0.4s ease' }}/>
                 </svg>
                 <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 900, color: 'var(--o2)' }}>
                   {Math.round(progress)}%
                 </div>
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '8px' }}>{state === 'uploading' ? 'Uploading Resume...' : 'Running AI Diagnostics...'}</h2>
              <p style={{ color: 'var(--t3)', fontWeight: 600 }}>{state === 'uploading' ? 'Sending secure file to analysis engine' : 'Parsing structure, extracting keywords, and simulating ATS results'}</p>
              
              <div className="dash-card" style={{ maxWidth: '400px', margin: '48px auto 0', padding: '16px 20px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span className="mat" style={{ color: 'var(--o3)' }}>lock</span>
                <p style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.4 }}>Your data is encrypted and never stored unless you choose to save it.</p>
              </div>
            </div>
          )}

          {state === 'result' && (
            <div className="afu">
              <div className="dash-grid-2">
                    <div className="dash-card">
                       <div className="print-only" style={{ display: 'none', marginBottom: '32px' }}>
                          <h1 style={{ color: 'var(--o1)', fontSize: '28px' }}>Hirely AI Analysis Report</h1>
                          <p style={{ color: 'var(--t3)', fontWeight: 700 }}>Candidate: Charan · Date: {new Date().toLocaleDateString()} · Job: Product Manager</p>
                       </div>
                       <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                          <div className="health-ring-w" style={{ width: '140px', height: '140px' }}>
                             <svg width="140" height="140" viewBox="0 0 140 140">
                                <circle cx="70" cy="70" r="62" fill="none" stroke="var(--o6)" strokeWidth="14"/>
                                <circle cx="70" cy="70" r="62" fill="none" stroke="var(--o3)" strokeWidth="14" strokeLinecap="round" strokeDasharray="389.5" strokeDashoffset={389.5 - (score/100)*389.5} style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}/>
                             </svg>
                             <div className="health-ring-c">
                                <h4 style={{ fontSize: '36px' }}>{score}</h4>
                                <span style={{ fontSize: '11px' }}>ATS SCORE</span>
                             </div>
                          </div>
                          <div style={{ flex: 1 }}>
                             <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '8px' }}>Strategic Visibility 🛡️</h2>
                             <p style={{ color: 'var(--t2)', fontSize: '15px', lineHeight: 1.5, marginBottom: '20px' }}>Your resume is highly readable for modern ATS. Minor adjustments to your Experience bullets could push you to the top 1%.</p>
                             <div style={{ display: 'flex', gap: '10px' }} className="no-print">
                                <button className="btn btn-p" onClick={() => window.dispatchEvent(new CustomEvent('open-share'))}>Share Performance</button>
                                <button className="btn btn-s" onClick={() => window.print()}>Download Full PDF Report</button>
                             </div>
                          </div>
                       </div>

                   <div style={{ marginTop: '40px', borderTop: '1px solid var(--border)', paddingTop: '32px', position: 'relative' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '20px' }}>In-Depth Advanced Insights</h3>
                      
                      {/* BLURRED PREVIEW BLOCK */}
                      <div style={{ filter: 'blur(10px)', opacity: 0.3, pointerEvents: 'none', userSelect: 'none' }}>
                        <div className="dash-time">
                           <div className="dash-time-i">
                              <div className="dash-time-dot"></div>
                              <div className="dash-time-c">
                                 <p>Recruiter 6-Second Scan Prediction</p>
                                 <span>Detected Seniority: Staff / Lead. Parsing confidence: 98%.</span>
                              </div>
                           </div>
                           <div className="dash-time-i">
                              <div className="dash-time-dot blue"></div>
                              <div className="dash-time-c">
                                 <p>Achievement vs Responsibility Detection</p>
                                 <span>Only 30% of your bullets are results-oriented. Advanced metrics needed.</span>
                              </div>
                           </div>
                           <div className="dash-time-i">
                              <div className="dash-time-dot green"></div>
                              <div className="dash-time-c">
                                 <p>Competitor Peer Comparison</p>
                                 <span>You rank in the top 12% of applicants for Stripe hiring manager filtered search.</span>
                              </div>
                           </div>
                        </div>
                      </div>

                      {/* LOCK OVERLAY */}
                      <div className="locked-overlay">
                         <div className="locked-msg afu">
                            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--o6)', color: 'var(--o3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                               <span className="mat" style={{ fontSize: '24px' }}>lock</span>
                            </div>
                            <h4>Unlock Advanced Insights</h4>
                            <p>Get recruiter scan simulations, peer benchmarks, and deep bullet analysis with Advanced tier.</p>
                            <button className="btn btn-p" style={{ width: '100%' }} onClick={() => window.dispatchEvent(new CustomEvent('open-upgrade'))}>
                               Upgrade to Advanced
                            </button>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="dash-card">
                   <div className="dash-card-h">
                      <h3>Keyword Analysis</h3>
                      <span className="sb-new" style={{ fontSize: '9px' }}>AI UPDATED</span>
                   </div>
                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                      <div className="ob-chip active" style={{ fontSize: '12px', padding: '8px 14px' }}>Next.js (High)</div>
                      <div className="ob-chip active" style={{ fontSize: '12px', padding: '8px 14px' }}>React Native (High)</div>
                      <div className="ob-chip active" style={{ fontSize: '12px', padding: '8px 14px' }}>AWS (Mid)</div>
                      <div className="ob-chip" style={{ fontSize: '12px', padding: '8px 14px', borderStyle: 'dashed' }}>Kubernetes (Missing)</div>
                      <div className="ob-chip" style={{ fontSize: '12px', padding: '8px 14px', borderStyle: 'dashed' }}>CI/CD (Missing)</div>
                   </div>
                   
                   <div style={{ background: 'var(--o6)', borderRadius: '16px', padding: '20px', marginTop: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                        <span className="mat" style={{ color: 'var(--o3)' }}>lightbulb</span>
                        <h4 style={{ color: 'var(--o1)' }}>AI Strategy</h4>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--o2)', lineHeight: 1.5, fontWeight: 600 }}>
                        Recruiters searching for "Fullstack" roles in Bangalore prioritize "Scalability" and "Microservices". Add these to your Summary section.
                      </p>
                   </div>

                   <button className="btn btn-p" style={{ width: '100%', marginTop: '32px' }} onClick={() => window.dispatchEvent(new CustomEvent('open-upgrade'))}>Unlock Full Industry Insights</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

```

### src\app\auth\page.tsx

```
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useUser } from '@/context/AuthContext';

export default function AuthPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useUser();
  const [tab, setTab] = useState<'in' | 'up'>('in');
  const [showPwd, setShowPwd] = useState(false);
  const [pwdStrength, setPwdStrength] = useState(0);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const supabase = createClient();

  const checkPwd = (val: string) => {
    let score = 0;
    if (val.length >= 8) score += 25;
    if (/[A-Z]/.test(val)) score += 25;
    if (/[0-9]/.test(val)) score += 25;
    if (/[^A-Za-z0-9]/.test(val)) score += 25;
    setPwdStrength(score);
  };


  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (tab === 'up') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          }
        });
        
        if (error) throw error;
        
        if (data.user && data.session) {
          window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'Registration successful! Welcome to Hirely AI.' } }));
          router.push('/dashboard');
        } else {
          window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'Check your email to verify your account!' } }));
          setTab('in');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'Welcome back! Redirecting...' } }));
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      let friendlyMsg = err.message || 'Authentication failed';
      if (err.message?.includes('Invalid login credentials')) {
        friendlyMsg = 'Invalid email or password. Please try again.';
      } else if (err.message?.includes('User already registered')) {
        friendlyMsg = 'This email is already registered. Try signing in.';
      }
      setErrorMsg(friendlyMsg);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'error', msg: friendlyMsg } }));
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: 'select_account',
            access_type: 'offline',
          }
        }
      });
      if (error) throw error;
    } catch (err: any) {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'error', msg: err.message || 'Google Auth failed' } }));
      setLoading(false);
    }
  };

  return (
    <div id="page-auth" className="afi">
      <nav className="auth-nav">
        <div className="auth-logo">Profile<span>Pro</span> AI</div>
        <div style={{ fontSize: '13px', color: 'var(--t3)', fontWeight: 600 }}>Made in India 🇮🇳</div>
      </nav>
      
      <div className="auth-wrap">
        <div className="auth-left">
          <div className="auth-left-blob" style={{ width: '400px', height: '400px', background: 'rgba(255,255,255,.08)', top: '-100px', left: '-80px' }}></div>
          <div className="auth-left-blob" style={{ width: '280px', height: '280px', background: 'rgba(0,0,0,.15)', bottom: '-60px', right: '-40px' }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,.5)', marginBottom: '14px' }}>Hirely AI</div>
            <h1>Land Your<br/><span style={{ color: 'rgba(255,255,255,.65)' }}>Dream Job</span><br/>— Faster</h1>
            <p className="auth-left-sub">AI-powered career intelligence: ATS analysis, job matching, interview prep, salary insights — all in one place.</p>
            
            <div className="auth-feats">
              <div className="auth-feat"><span className="mat">check_circle</span> ATS Score with real parser rules (not guesses)</div>
              <div className="auth-feat"><span className="mat">check_circle</span> Job match across Naukri, LinkedIn, Internshala</div>
              <div className="auth-feat"><span className="mat">check_circle</span> ₹ Salary intelligence for Indian tech roles</div>
              <div className="auth-feat"><span className="mat">check_circle</span> AI Interview Coach with STAR scoring</div>
              <div className="auth-feat"><span className="mat">check_circle</span> Resume versioning with score delta tracking</div>
            </div>
          </div>
          
          <div className="auth-proof">
            <div className="auth-avs">
              <div className="auth-av">P</div><div className="auth-av">R</div><div className="auth-av">A</div><div className="auth-av">S</div><div className="auth-av">+</div>
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.75)', fontWeight: 600 }}>
              <span style={{ color: '#fff', fontWeight: 800 }}>12,847</span> job seekers joined this month
            </div>
            <div style={{ marginTop: '6px', color: 'rgba(255,255,255,.5)', fontSize: '12px' }}>★★★★★ 4.9/5 from 2,300+ reviews</div>
          </div>
        </div>
        
        <div className="auth-right">
          <div className="auth-box afu">
            <h2>{tab === 'in' ? 'Welcome back' : 'Create an account'}</h2>
            <p>{tab === 'in' ? 'Sign in to your career dashboard and continue your job search.' : 'Join thousands of job seekers and automate your career growth.'}</p>
            
            <button className="google-btn" onClick={handleGoogleAuth} disabled={loading}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? 'Connecting...' : 'Continue with Google'}
            </button>
            
            <div className="auth-divider">or sign in with email</div>
            
            <div className="auth-tabs">
              <button className={`auth-tab ${tab === 'in' ? 'active' : ''}`} onClick={() => setTab('in')}>Sign In</button>
              <button className={`auth-tab ${tab === 'up' ? 'active' : ''}`} onClick={() => setTab('up')}>Create Account</button>
            </div>
            
            <form onSubmit={handleAuth}>
              {errorMsg && (
                <div style={{ padding: '12px', background: 'var(--rbg)', color: 'var(--red)', fontSize: '13px', borderRadius: '12px', marginBottom: '16px', fontWeight: 600 }}>
                  {errorMsg}
                </div>
              )}

              {tab === 'up' && (
                <div className="inp-wrap">
                  <label className="inp-label">Full Name</label>
                  <input className="inp" type="text" placeholder="Your full name" required value={name} onChange={(e) => setName(e.target.value)} disabled={loading} />
                </div>
              )}
              
              <div className="inp-wrap">
                <label className="inp-label">Email</label>
                <input className="inp" type="email" placeholder="you@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
              </div>
              
              <div className="inp-wrap" style={{ position: 'relative' }}>
                <label className="inp-label">Password</label>
                <input 
                  className="inp" 
                  type={showPwd ? "text" : "password"} 
                  placeholder={tab === 'in' ? "Your password" : "Min 8 characters"} 
                  required 
                  value={password}
                  disabled={loading}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (tab === 'up') checkPwd(e.target.value);
                  }}
                  style={{ paddingRight: '44px' }}
                />
                <button 
                  type="button"
                  onClick={() => setShowPwd(!showPwd)} 
                  style={{ position: 'absolute', right: '12px', bottom: '12px', background: 'none', border: 'none', color: 'var(--t3)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <span className="mat" style={{ fontSize: '18px' }}>{showPwd ? 'visibility' : 'visibility_off'}</span>
                </button>
                
                {tab === 'up' && (
                  <>
                    <div className="pwd-bar-bg">
                      <div 
                        className="pwd-bar-fill" 
                        style={{ 
                          width: `${pwdStrength}%`, 
                          background: pwdStrength < 50 ? 'var(--red)' : pwdStrength < 100 ? 'var(--amber)' : 'var(--green)' 
                        }}
                      ></div>
                    </div>
                    <div className="inp-hint">
                      {pwdStrength === 0 ? 'Enter a password' : pwdStrength < 100 ? 'Stronger password suggested' : 'Excellent password!'}
                    </div>
                  </>
                )}
              </div>
              
              {tab === 'in' && (
                <div style={{ textAlign: 'right', marginBottom: '16px' }}>
                  <button type="button" style={{ background: 'none', border: 'none', fontSize: '12px', color: 'var(--o2)', fontWeight: 700, cursor: 'pointer' }}>Forgot password?</button>
                </div>
              )}
              
              {tab === 'up' && (
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--t2)', cursor: 'pointer' }}>
                    <input type="checkbox" required style={{ marginTop: '2px', accentColor: 'var(--o3)' }} />
                    <span>I agree to the <a href="#" style={{ color: 'var(--o2)', fontWeight: 700, textDecoration: 'none' }}>Terms</a> & <a href="#" style={{ color: 'var(--o2)', fontWeight: 700, textDecoration: 'none' }}>Privacy Policy</a></span>
                  </label>
                </div>
              )}
              
              <button className="btn btn-p btn-lg" style={{ width: '100%', borderRadius: '14px' }} type="submit" disabled={loading}>
                {loading ? 'Authenticating...' : tab === 'in' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
            
            <div style={{ fontSize: '12px', color: 'var(--t3)', textAlign: 'center', marginTop: '18px', lineHeight: 1.6 }}>By continuing, you agree to our <a href="#" style={{ color: 'var(--o2)', fontWeight: 700, textDecoration: 'none' }}>Terms</a> & <a href="#" style={{ color: 'var(--o2)', fontWeight: 700, textDecoration: 'none' }}>Privacy Policy</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}

```

### src\app\auth\callback\route.ts

```
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth?error=auth-failure`)
}

```

### src\app\career-path\page.tsx

```
'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useUser } from '@/context/AuthContext';

export default function CareerPathPredictor() {
  const { user } = useUser();
  const [currentRole, setCurrentRole] = useState('Senior Product Manager');
  const [targetRole, setTargetRole] = useState('Product Director');

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const timeline = [
    { time: 'Current: 2022 – Present', title: 'Senior Product Manager', org: 'Google · Leading primary search UX experiments and core ranking features.', salary: null, skills: [], curr: true, goal: false },
    { time: 'Goal #1 · Estimated 2026', title: 'Principal Product Manager', org: 'Meta / Stripe · Focus on strategy, high-level roadmapping, and mentorship.', salary: '₹65L – ₹80L', skills: ['System Design', 'Strategic Planning', 'Leadership'], curr: false, goal: false },
    { time: 'Goal #2 · Estimated 2028', title: 'Product Director', org: 'Global Tech · Executive leadership, P&L responsibility, and organizational scale.', salary: '₹1.1Cr+', skills: ['Product Org Scale', 'Financial Analysis', 'Executive Comm'], curr: false, goal: false },
    { time: 'North Star · Estimated 2031', title: 'VP of Product / CPO', org: 'Unicorn SaaS · C-Suite leadership at a multi-billion dollar scale.', salary: 'Equity Focus', skills: ['Public Markets', 'Investor Relations', 'Visionary Leadership'], curr: false, goal: true },
  ];

  const skillGaps = [
    { skill: 'System Design', pct: 35, color: 'var(--rd)' },
    { skill: 'P&L Management', pct: 50, color: 'var(--am)' },
    { skill: 'Executive Communication', pct: 65, color: 'var(--o3)' },
    { skill: 'Org Scaling', pct: 70, color: 'var(--bl)' },
  ];

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div className="pg-hdr" style={{ marginBottom: 0 }}>
              <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                Career Path Predictor 🗺
                <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px', background: 'var(--pbg)', color: 'var(--pu)', verticalAlign: 'middle', letterSpacing: '.05em' }}>AI VISION</span>
              </h1>
            </div>
          </div>

          <div className="cp-layout">
            {/* MAIN PORTION */}
            <div>
              <div className="card" style={{ marginBottom: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800 }}>AI Predicted Path to {targetRole}</div>
                  <span className="badge" style={{ background: 'var(--gbg)', color: 'var(--gn)' }}>92% SUCCESS PROBABILITY</span>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px', background: 'var(--sf)', borderRadius: '14px', padding: '14px' }}>
                  <div className="inp-w" style={{ marginBottom: 0 }}>
                    <label className="inp-lbl">Current Role</label>
                    <input className="inp" type="text" value={currentRole} onChange={e => setCurrentRole(e.target.value)} style={{ background: 'var(--w)' }} />
                  </div>
                  <div className="inp-w" style={{ marginBottom: 0 }}>
                    <label className="inp-lbl">Target Role</label>
                    <input className="inp" type="text" value={targetRole} onChange={e => setTargetRole(e.target.value)} style={{ background: 'var(--w)' }} />
                  </div>
                  <div className="inp-w" style={{ marginBottom: 0, gridColumn: '1/-1' }}>
                    <button className="btn btn-p btn-sm" style={{ width: '100%' }} onClick={() => showToast('success', 'Career path recalculated!')}>
                      <span className="mat" style={{ marginRight: '6px' }}>trending_up</span> Recalculate Path
                    </button>
                  </div>
                </div>

                <div className="cp-timeline" style={{ position: 'relative', paddingLeft: '24px' }}>
                  <div className="cp-line" style={{ position: 'absolute', left: '11px', top: '24px', bottom: '0', width: '2px', background: 'var(--s3)' }}></div>
                  
                  {timeline.map((node, i) => (
                    <div key={i} className="cp-node" style={{ position: 'relative', marginBottom: '32px' }}>
                      <div className={`cp-dot ${node.curr ? 'curr' : node.goal ? 'goal' : ''}`} style={{
                        position: 'absolute', left: '-29px', top: '4px', width: '16px', height: '16px', borderRadius: '50%',
                        background: node.curr ? 'var(--gn)' : node.goal ? 'var(--o2)' : 'var(--w)',
                        border: node.curr ? 'none' : node.goal ? 'none' : '2px solid var(--o3)',
                        boxShadow: node.curr ? '0 0 12px var(--gn)' : node.goal ? '0 0 16px var(--o2)' : 'none',
                        zIndex: 2
                      }}></div>
                      
                      <div className={`cp-card ${node.goal ? 'goal-card' : ''}`} style={{
                        background: node.goal ? 'linear-gradient(135deg, var(--o2), var(--o3))' : 'var(--w)',
                        color: node.goal ? '#fff' : 'var(--t1)',
                        border: node.goal ? 'none' : '1.5px solid var(--bd)',
                        borderRadius: '16px', padding: '20px',
                        boxShadow: node.goal ? 'var(--sh-or)' : 'var(--sh1)',
                      }}>
                        <div className="cp-time" style={{ fontSize: '12px', fontWeight: 800, color: node.goal ? 'rgba(255,255,255,0.8)' : 'var(--t3)', marginBottom: '8px' }}>{node.time}</div>
                        <div className="cp-title" style={{ fontSize: '18px', fontWeight: 900, marginBottom: '6px' }}>{node.title}</div>
                        <div className="cp-salary" style={{ fontSize: '14px', lineHeight: 1.6, color: node.goal ? 'rgba(255,255,255,0.9)' : 'var(--t2)' }}>
                          {node.org}
                          {node.salary && <><br/><strong style={node.goal ? {color: '#fff'} : {color: 'var(--o2)'}}>Estimated Pay: {node.salary}</strong></>}
                        </div>
                        {node.skills && node.skills.length > 0 && (
                          <div className="cp-skills-row" style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {node.skills.map(s => (
                              <span key={s} className="cp-skill-chip" style={{
                                fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '999px',
                                background: node.goal ? 'rgba(255,255,255,0.2)' : 'var(--s2)',
                                color: node.goal ? '#fff' : 'var(--t2)'
                              }}>{s}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div>
              <div className="card" style={{ background: 'linear-gradient(135deg, var(--o1), var(--o2), var(--o3))', padding: '28px', color: '#fff', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,0.8)' }}>
                  <span className="mat" style={{ fontSize: '18px' }}>auto_awesome</span> AI Strategic Brief
                </div>
                <div style={{ fontSize: '15px', lineHeight: 1.6, marginBottom: '24px', opacity: 0.95 }}>
                  Based on your current trajectory and the massive adoption of AI in Product Management, your fastest path to <strong style={{color:'#fff'}}>Director level entails focusing on Technical Growth and Scale Ops.</strong>
                </div>
                
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <span className="mat" style={{ color: 'var(--gbg)', fontSize: '20px' }}>check_circle</span>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '4px' }}>Learn System Design</h4>
                    <p style={{ fontSize: '13px', opacity: 0.8 }}>Crucial for Stripe/Meta transitions.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  <span className="mat" style={{ color: 'var(--gbg)', fontSize: '20px' }}>check_circle</span>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '4px' }}>Lead an Infrastructure Project</h4>
                    <p style={{ fontSize: '13px', opacity: 0.8 }}>Demonstrate P&L or efficiency gains.</p>
                  </div>
                </div>
                
                <button 
                  style={{ width:'100%', padding:'12px', background:'#fff', border:'none', borderRadius:'12px', fontSize:'13px', fontWeight: 800, cursor:'pointer', color:'var(--o2)', transition:'opacity 150ms' }}
                  onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
                  onMouseOut={e => e.currentTarget.style.opacity = '1'}
                  onClick={() => showToast('info', 'Personalized path analysis starting...')}
                >
                  Personalize Path Analysis
                </button>
              </div>

              <div className="card" style={{ marginBottom: '16px', padding: '24px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '16px' }}>Top Peer Comparisons</h3>
                {[
                  { role: 'Product Director', pay: 'Avg. Pay: ₹1.2Cr', rank: 'Top 5% Peer Rank', status: 'ON_TRACK', rc: 'var(--o2)', sbg: 'var(--o6)' },
                  { role: 'Group PM', pay: 'Avg. Pay: ₹85L', rank: 'Top 2% Peer Rank', status: 'EXCEEDING', rc: 'var(--gn)', sbg: 'var(--gbg)' },
                ].map((p, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i === 0 ? '1px solid var(--bd)' : 'none' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--t1)', marginBottom: '4px' }}>{p.role}</div>
                      <div style={{ fontSize: '12px', color: 'var(--t3)', fontWeight: 600 }}>{p.pay}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ background: p.sbg, color: p.rc, padding: '4px 10px', borderRadius: '999px', fontSize: '10px', fontWeight: 800, marginBottom: '6px' }}>{p.rank}</div>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--t3)' }}>{p.status}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card" style={{ padding: '24px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--am)' }}>⚠</span> Priority Skill Gaps
                </div>
                {skillGaps.map((g, i) => (
                  <div key={i} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>
                      <span>{g.skill}</span>
                      <span style={{ color: g.color }}>{g.pct}%</span>
                    </div>
                    <div style={{ background: 'var(--s2)', height: '6px', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ width: `${g.pct}%`, background: g.color, height: '100%', borderRadius: '999px' }}></div>
                    </div>
                  </div>
                ))}
                <button 
                  className="btn btn-s btn-sm" 
                  style={{ width: '100%', marginTop: '8px', borderRadius: '10px' }}
                  onClick={() => showToast('info', 'Taking skill assessment...')}
                >
                  Take Skill Assessment →
                </button>
              </div>
            </div>
          </div>
          
          <style jsx>{`
            .cp-layout {
              display: grid;
              grid-template-columns: 1fr 340px;
              gap: 24px;
            }
          `}</style>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

```

### src\app\cover-letter\page.tsx

```
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useSubscription } from '@/hooks/useSubscription';

export default function CoverLetterGenerator() {
  const router = useRouter();
  const { tier } = useSubscription();

  const [jd, setJd] = useState('');
  const [resume, setResume] = useState('Senior Product Manager with 8+ years of experience leading cross-functional teams at Google and Amazon. Expert in user-centric design, A/B testing, and scaling cloud-native SaaS products.');
  const [tone, setTone] = useState<'professional' | 'creative' | 'bold' | 'minimal'>('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [editMode, setEditMode] = useState(false);

  const [variation, setVariation] = useState(0);

  const generateLetter = () => {
    if (!jd.trim()) {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'warning', msg: 'Please paste a Job Description first.' } }));
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation with tone-specific variants
    setTimeout(() => {
      const templates = {
        professional: [
          `Dear Hiring Manager,

I am writing to express my strong interest in the [Position Name] role at [Company Name]. With over 8 years of experience in product management at industry leaders like Google and Amazon, I have consistently delivered high-impact features that reached millions of users globally. 

My approach is rooted in data-driven decision-making and rigorous A/B testing, ensuring that every product iteration delivers maximum value to the customer. I am particularly impressed by [Company Name]'s recent innovations in [Specific Area], and I am eager to bring my expertise in scaling cloud-native SaaS products and user-centric design to help drive your next phase of growth.

Thank you for your time and consideration. I look forward to the possibility of discussing how my skills and experience can contribute to the continued success of [Company Name].

Sincerely,
Charan`,
          `To the Hiring Team at [Company Name],

Regarding the [Position Name] opening, I am eager to offer my 8+ years of product leadership experience from Google and Amazon. My career has been defined by a deep commitment to user-centricity and a proven track record in scaling global SaaS platforms.

In my previous roles, I have lead cross-functional teams through complex product lifecycles, consistently achieving significant growth through strategic A/B testing and infrastructure optimization. I am highly motivated by [Company Name]’s mission and would appreciate the opportunity to discuss how my technical background and strategic mindset can exceed your expectations for this role.

Sincerely,
Charan`,
          `Dear [Hiring Manager Name],

I am submitting my application for the [Position Name] role with great enthusiasm. Having spent nearly a decade at the forefront of product innovation at Google and Amazon, I have developed a sophisticated understanding of how to bridge the gap between complex engineering and user delight.

My core competence lies in driving product strategy from conception to global scale, with a heavy emphasis on ROI-focused roadmapping. I have long admired [Company Name]'s commitment to [Specific Value], and I am confident that my experience in managing high-velocity teams will be a valuable asset to your organization.

Sincerely,
Charan`,
          `To the Recruitment Team at [Company Name],

I am writing to express my interest in the [Position Name] position. With a robust background in scaling multi-million user products at Google and Amazon, I bring a unique blend of technical expertise and strategic vision.

My methodology involves a deep dive into user metrics to identify growth opportunities and streamline product efficiency. I've followed [Company Name]’s trajectory in the [Specific Area] market and believe my expertise in user-centric scaling is the perfect match for your upcoming initiatives.

Best regards,
Charan`,
          `Dear Hiring Manager,

With 8+ years of experience leading cross-functional teams in the tech industry, I am writing to apply for the [Position Name] role. My time at Google and Amazon has equipped me with the skills to handle large-scale product deployments and foster a culture of excellence.

I specialize in aligning product goals with organizational objectives to ensure sustainable growth. I am particularly interested in how [Company Name] is tackling [Specific Problem], and I look forward to discussing how my experience can help accelerate your solutions.

Sincerely,
Charan`,
          `To the Hiring Committee,

I am a seasoned Product Manager with a decade of experience at Google and Amazon, and I am excited to apply for the [Position Name] role. My career has been focused on delivering cloud-native SaaS solutions that define market standards.

I pride myself on my ability to translate complex stakeholder requirements into actionable product roadmaps. [Company Name] stands out as a leader in [Specific Area], and I am eager to leverage my background in A/B testing and user research to contribute to your continued success.

Respectfully,
Charan`,
          `Dear [Contact Person],

I am applying for the [Position Name] position at [Company Name]. My experience at Google and Amazon has provided me with a rigorous foundation in data-driven product management and international scale operations.

I have a proven record of leading teams that exceed performance benchmarks and user satisfaction scores. I am impressed by [Company Name]’s rapid growth and would welcome the chance to apply my expertise in scaling infrastructure to your next generation of products.

Sincerely,
Charan`,
          `To the Product Leadership at [Company Name],

I am writing to share my credentials for the [Position Name] role. Having spent 8+ years navigating the high-stakes environments of Google and Amazon, I have mastered the art of delivering high-quality products under tight deadlines.

My focus is always on creating intuitive user experiences that are backed by robust backend logic. I am eager to contribute to [Company Name]'s vision for [Specific Goal] by applying my deep knowledge of SaaS lifecycle management.

Kind regards,
Charan`,
          `Dear Hiring Manager,

Please accept this letter as a formal expression of interest in the [Position Name] role. My background includes significant stints at Google and Amazon, where I spearheaded the development of core features for world-class products.

I am a firm believer in the power of user-centric design to drive business outcomes. [Company Name]'s approach to [Specific Feature or Value] aligns with my professional philosophy, and I am confident I can help scale your offerings to new heights.

Sincerely,
Charan`,
          `To the Hiring Team,

I am writing to apply for the [Position Name] role at [Company Name]. With over 8 years in product leadership at Google and Amazon, I have a deep understanding of the challenges associated with rapid digital transformation.

In my previous roles, I have optimized team workflows to increase output by 40% while maintaining a 98% user satisfaction rate. I am excited about the opportunity to bring this level of efficiency to [Company Name]'s innovative product suite.

Best regards,
Charan`
        ],

        creative: [
          `To the team at [Company Name],

If you're looking for someone who lives at the intersection of "wildly ambitious" and "meticulously data-driven," you've found your next Product Manager. From my time scaling products at Google to optimizing user flows at Amazon, I've learned that the best products don't just solve problems—they tell a story.

I've been following [Company Name]'s journey for a while, and your latest work in [Specific Area] genuinely caught my eye. I don't just want to build products; I want to build the future of [Industry] with a team that isn't afraid to break things and rebuild them better. Let's create something people haven't even dreamed of yet.

Best,
Charan`,
          `Hey there, Hiring Team at [Company Name]!

You're building something incredible in the [Specific Area] space, and I want in. Why? Because I don't just build features—I build ecosystems. With a background forged at tech giants like Google and Amazon, I've mastered the art of high-impact product delivery while keeping the human element front and center.

I'm the Product Manager who isn't afraid to dive into the deep end of data but comes up for air with a creative spark that changes the game. Let's talk about how we can take [Company Name]’s vision to the next level with a mix of technical grit and visionary thinking.

Cheers,
Charan`,
          `To the Dreamers and Builders at [Company Name],

I’ve always believed that a product is only as strong as the curiosity that built it. After 8 years of navigating the complex landscapes of Google and Amazon, my curiosity has only grown. I’m applying for the [Position Name] role because I see a mirror of that same restless innovation in what you’re doing with [Specific Project].

I don’t just manage roadmaps; I curate experiences. My passion lies in finding the "magic" in the data and using it to build products that feel more like companions than tools. Let’s collaborate and write the next chapter of [Industry] history together.

With energy,
Charan`,
          `To the Team at [Company Name],

What if your next Product Manager looked at your JD and didn't see a list of tasks, but a canvas for global impact? That’s me. Having cut my teeth at Google and Amazon, I’ve learned that scale isn’t just a number—it’s a mindset.

I’m drawn to [Company Name] because you aren't just following the market; you're challenging it. I want to bring my background in high-velocity SaaS and user-centric design to your team to help turn your boldest ideas into a tangible, multi-million user reality.

Let’s build something bold,
Charan`,
          `Hello [Company Name]!

In a world full of "good enough" products, I'm here to build the exceptional. My 8-year journey through Google and Amazon has taught me that the secret to a great product isn't just the code—it's the empathy behind the execution.

I’m applying for the [Position Name] role because I’m ready to trade the comfort of big tech for the thrill of your mission. I want to take the lessons I've learned about massive scale and apply them to the agility and innovation I see in [Company Name]. Let’s make something beautiful and functional.

Excitedly,
Charan`,
          `To the Innovators at [Company Name],

I believe the best products are those that solve problems users haven't even articulated yet. That’s the mindset I’ve cultivated over 8 years at Google and Amazon. Now, I’m looking to bring that "future-first" perspective to the [Position Name] role at [Company Name].

I’ve admired your work in [Specific Area] from afar, and I’m ready to jump in and help you refine your vision. I’m a high-impact strategist who loves the messy stage of creation just as much as the polished stage of deployment. Let’s get to work.

Best,
Charan`,
          `To the Hiring Team,

Imagine a Product Manager who treats every A/B test like a scientific experiment and every user journey like a cinematic experience. That’s who I am. My tenure at Google and Amazon has given me the tools to build big, but my heart is in building things that matter.

I see [Company Name] as the place where I can truly let my creative and technical sides merge. I’m eager to discuss how my experience in [Specific Skill] can help you bridge the gap between "good" and "indispensable" for your users.

With passion,
Charan`,
          `Dear [Company Name],

I don’t want to just fill a position; I want to become a core part of the engine that drives your innovation. Having led teams at Google and Amazon, I’ve seen what happens when you combine massive scale with a deep-seated passion for the user.

Your latest updates to [Product Name] felt like they came from a team that truly cares. I want to join that team and bring my expertise in SaaS scaling and product strategy to the table. Let’s discuss how we can make the [Position Name] role a launchpad for your next big win.

Cheers,
Charan`,
          `To the team at [Company Name],

I’ve spent the last 8 years at Google and Amazon learning how to build products that change habits. Now, I want to use those same skills to build products that change the world—and I believe [Company Name] is where that happens.

Your work in [Specific Area] isn’t just impressive; it’s inspiring. I’m applying for the [Position Name] role because I want to be part of a team that values creativity just as much as it values growth. I’m ready to bring my A-game to your roadmapping and execution.

Onward,
Charan`,
          `Hello Team [Company Name],

If you need a PM who can talk to engineers in code and to users in stories, let’s talk. My background at Google and Amazon has made me a "bilingual" product leader who knows how to translate high-level strategy into ground-level impact.

I’m particularly obsessed with the way [Company Name] is handled [Specific Challenge]. I have a few ideas on how we could take that even further using [Specific Methodology]. I’d love to explore this further with your team.

Warmly,
Charan`
        ],

        bold: [
          `Let's cut to the chase.

[Company Name] is solving big problems in [Specific Area], and I have the direct experience scaling SaaS products at Google and Amazon to help you solve them faster. I don't just manage products—I drive growth, lead cross-functional teams, and turn complex data into actionable strategies that move the needle.

In my previous roles, I didn't just meet KPIs; I redefined them. I'm ready to bring that same high-velocity, results-first mindset to the [Position Name] role. If you want a Product Manager who delivers without excuses, we should talk.

Regards,
Charan`,
          `I don't just ship code; I ship ROI.

With 8 years of high-stakes product management at Google and Amazon, I specialize in one thing: results. I'm looking for a challenge at [Company Name] where my expertise in cloud-native SaaS and user-centric scaling can make an immediate, multi-million user impact.

If you are looking for a [Position Name] who can sit at the helm of your strategy and navigate through any complexity to reach the target, I am your candidate. I’m ready to start today.

Best,
Charan`,
          `I’m not here to join your team; I’m here to help you dominate your market.

With a background at Google and Amazon, I have mastered the art of winning. I’ve seen what it takes to build products that crush the competition and delight users at a massive scale. I want to bring that same "win-at-all-costs" mentality to the [Position Name] role at [Company Name].

My strategy is simple: hypothesize, test, scale, repeat—until we are the only names in the market. If you want a Product Manager who plays to win, I’m your only choice.

Regards,
Charan`,
          `Dear [Company Name],

Your current growth in [Specific Area] is impressive, but I know how to make it explosive. Using my 8+ years of experience from Google and Amazon, I know exactly where the friction points are in scaling a global SaaS product.

I’m applying for the [Position Name] role because I’m ready to take the reins and drive your KPIs into the stratosphere. I don’t believe in "trying"; I believe in "delivering." Let’s discuss how I can get started on your Q4 goals today.

Best,
Charan`,
          `Stop looking for a "good" candidate. I’m the best one.

My tenure at Google and Amazon wasn’t just about putting in the time; it was about leading the pack. I’ve built features that users didn't know they needed and drove efficiencies that saved millions. I am ready to bring that level of high-performance leadership to [Company Name].

I have the technical grit, the strategic vision, and the track record to prove it. For the [Position Name] role, you don't need another manager—you need a driver. That’s me.

Sincerely,
Charan`,
          `To the team at [Company Name],

Let’s talk about your [Specific Metric]. I’ve looked at your current product trajectory and I see exactly where we can double it. My 8 years at Google and Amazon have turned me into a specialist in finding and exploiting growth levers.

I’m applying for the [Position Name] role because I want to give your team the edge they need to outpace [Competitor]. I move fast, I think deep, and I deliver. If that’s the kind of energy you need, let’s sit down.

Regards,
Charan`,
          `I am built for this role.

8 years at Google and Amazon hasn't just taught me PM skills; it's forged me into a market-ready leader who knows how to scale under pressure. I see [Company Name] as the next logical step to prove that I can drive transformative growth in any environment.

I’m ready to take full ownership of the [Position Name] roadmap and turn it into a blueprint for success. I don't wait for permission; I wait for the data. Let’s get moving.

Best,
Charan`,
          `I don't follow roadmaps; I define them.

Having led some of the most critical product initiatives at Google and Amazon, I have a deep-seated intuition for what works and what doesn't. I want to bring that clarity of vision to [Company Name] as your next [Position Name].

I specialize in high-velocity delivery and ruthless prioritization. I’m the candidate who will tell you what you need to hear, not what you want to hear, to ensure your product wins.

Sincerely,
Charan`,
          `Hire me for the results, stay for the growth.

My career at Google and Amazon has been defined by one thing: significant, measurable impact. I am ready to bring that same level of accountability to the [Position Name] role at [Company Name].

I have a zero-fluff approach to product management. I look at the data, I listen to the user, and I build for scale. If you are serious about taking [Company Name] to the next level, I am the partner you need.

Best regards,
Charan`,
          `To the Hiring Team,

I see the potential of [Company Name] and I know exactly how to unlock it. With my 8 years at Google and Amazon, I’ve learned that the difference between a good product and a global leader is the quality of its leadership.

I am applying for the [Position Name] role because I want to be that leader for you. I am ready to overhaul your product strategy, lead your teams to new heights, and ensure that [Company Name] is the name everyone is talking about next year.

Let’s do this,
Charan`
        ],

        minimal: [
          `Dear Hiring Manager,

I am highly interested in the [Position Name] role at [Company Name].

Key Highlights:
• 8+ years of PM experience at Google & Amazon.
• Expert in scaling cloud-native SaaS and A/B testing.
• Proven track record in user-centric design and ROI-focused roadmapping.

I admire [Company Name]'s focus on [Specific Area] and believe my background aligns perfectly with your current goals. I’d love to briefly discuss how I can help your team scale.

Sincerely,
Charan`,
          `To [Company Name] HR,

I am writing to apply for the [Position Name] position.

With a background at Google and Amazon, I bring 8+ years of expertise in product management, user-centric scaling, and cross-functional leadership. I am deeply impressed by your work in [Specific Area] and am confident I can contribute to your team's success immediately.

Sincerely,
Charan`,
          `Dear Hiring Manager,

I’m a seasoned Product Manager (Google, Amazon) interested in the [Position Name] role at [Company Name].

Expertise:
- Global SaaS scaling
- ROI-driven roadmaps
- Cross-functional leadership

Your work in [Specific Area] is world-class. I'd love to contribute.

Best,
Charan`,
          `To the Team at [Company Name],

I am applying for the [Position Name] role. 

Summary: 8 years of PM experience at Google/Amazon. Specialist in A/B testing and user-centric design. Ready to help scale [Company Name] to its next multi-million user milestone.

Sincerely,
Charan`,
          `Hello,

Regarding the [Position Name] opening: I offer 8+ years of product leadership from Google and Amazon. My focus is on data-driven growth and user delight at scale. Highly interested in [Company Name]'s mission.

Sincerely,
Charan`,
          `Dear Hiring Team,

Please consider my application for [Position Name]. 

Background:
- 8 years at Google & Amazon
- Expert in SaaS lifecycle & strategy
- Proven results in user growth

Eager to bring this experience to [Company Name].

Sincerely,
Charan`,
          `To Whom It May Concern,

I am interested in the [Position Name] role at [Company Name]. With a background in leading product teams at Google and Amazon, I have the skills to drive high-impact results for your organization.

Best,
Charan`,
          `Dear Hiring Manager,

Applying for [Position Name]. 

Experience: 8 years (Google, Amazon). 
Skills: SaaS Scaling, Data Analysis, Roadmapping.
Goal: To help [Company Name] dominate the [Specific Area] market.

Sincerely,
Charan`,
          `To the Hiring Team,

I am a former Google/Amazon Product Manager interested in your [Position Name] role. I specialize in scaling complex products and leading talented teams. Looking forward to discussing how I can help [Company Name] grow.

Best regards,
Charan`,
          `Dear [Company Name],

Seeking the [Position Name] role. 

Quick facts: 8 years in PM leadership at Google/Amazon. Expert in user-centric scaling and growth operations. Eager to join your innovative team.

Sincerely,
Charan`
        ]
      };
      
      const currentVariants = templates[tone];
      const nextIdx = (variation + 1) % currentVariants.length;
      setGeneratedLetter(currentVariants[variation]);
      setVariation(nextIdx);
      
      setIsGenerating(false);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: `Drafted variation #${variation + 1} (${tone.toUpperCase()})!` } }));
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'Copied to clipboard!' } }));
  };

  return (
    <div id="page-cover-letter" className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '0', background: 'var(--surface)' }}>
          
          <div className="ip-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 900 }}>Cover Letter Generator ✍️</h1>
              <span className="badge bo" style={{ fontSize: '10px' }}>AI-POWERED</span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
               <button className="btn btn-s btn-sm" onClick={() => setGeneratedLetter('')}>Clear All</button>
            </div>
          </div>

          <div style={{ padding: '0 40px 40px' }}>
            <div className="ip-grid">
              
              {/* LEFT COLUMN: INPUTS */}
              <div className="afu">
                <div className="ip-card" style={{ marginBottom: '24px' }}>
                  <div className="dash-card-h">
                     <h3 style={{ fontSize: '15px', fontWeight: 900 }}>Job Details</h3>
                  </div>
                  <div className="ab-inp-w" style={{ marginTop: '16px' }}>
                    <label className="ab-inp-l">Job Description (JD)</label>
                    <textarea 
                      className="ab-area" 
                      placeholder="Paste the job description here..."
                      value={jd}
                      onChange={(e) => setJd(e.target.value)}
                      style={{ minHeight: '180px', fontSize: '14px' }}
                    />
                  </div>

                  <div className="ab-inp-w" style={{ marginTop: '20px' }}>
                    <label className="ab-inp-l">Select Resume Version</label>
                    <select className="ab-input" style={{ appearance: 'none', background: 'var(--sf) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E") no-repeat right 12px center' }}>
                      <option>Senior PM v.4 (Default)</option>
                      <option>Product Lead v.2</option>
                      <option>Strategy Consultant v.1</option>
                    </select>
                  </div>
                </div>

                <div className="ip-card">
                  <div className="dash-card-h">
                     <h3 style={{ fontSize: '15px', fontWeight: 900 }}>Tone & Personalization</h3>
                  </div>
                  <div className="ftabs" style={{ marginTop: '16px', marginBottom: '0', width: '100%' }}>
                    <button className={`ftab ${tone === 'professional' ? 'active' : ''}`} onClick={() => setTone('professional')} style={{ flex: 1 }}>Professional</button>
                    <button className={`ftab ${tone === 'creative' ? 'active' : ''}`} onClick={() => setTone('creative')} style={{ flex: 1 }}>Creative</button>
                    <button className={`ftab ${tone === 'bold' ? 'active' : ''}`} onClick={() => setTone('bold')} style={{ flex: 1 }}>Bold</button>
                    <button className={`ftab ${tone === 'minimal' ? 'active' : ''}`} onClick={() => setTone('minimal')} style={{ flex: 1 }}>Minimal</button>
                  </div>
                  
                  <div style={{ marginTop: '24px' }}>
                    <button 
                      className="btn btn-p btn-lg" 
                      style={{ width: '100%', padding: '16px' }}
                      onClick={generateLetter}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <><span className="mat" style={{ animation: 'spin 1.5s linear infinite', marginRight: '10px' }}>sync</span> Drafting Letter...</>
                      ) : (
                        <><span className="mat" style={{ marginRight: '10px' }}>auto_awesome</span> Generate Cover Letter</>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: PREVIEW */}
              <div className="afu">
                <div className="ip-card" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
                  <div className="dash-card-h">
                     <h3 style={{ fontSize: '15px', fontWeight: 900 }}>Preview</h3>
                     {generatedLetter && (
                       <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            className="btn btn-s btn-sm" 
                            onClick={generateLetter} 
                            disabled={isGenerating}
                            title="Regenerate Variation"
                          >
                            <span className="mat" style={{ fontSize: '16px', animation: isGenerating ? 'spin 1.5s linear infinite' : 'none' }}>refresh</span>
                          </button>
                          <button className="btn btn-s btn-sm" onClick={() => setEditMode(!editMode)}>
                            <span className="mat" style={{ fontSize: '16px' }}>{editMode ? 'visibility' : 'edit'}</span>
                          </button>
                          <button className="btn btn-s btn-sm" onClick={copyToClipboard}>
                            <span className="mat" style={{ fontSize: '16px' }}>content_copy</span>
                          </button>
                       </div>
                     )}
                  </div>

                  {!generatedLetter ? (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: 0.5 }} className="no-print">
                      <span className="mat" style={{ fontSize: '48px', marginBottom: '16px' }}>description</span>
                      <p style={{ maxWidth: '240px', fontSize: '14px', fontWeight: 600 }}>Your AI-generated cover letter will appear here.</p>
                    </div>
                  ) : (
                    <div style={{ flex: 1, marginTop: '20px' }}>
                      <div className="print-only" style={{ display: 'none', marginBottom: '40px' }}>
                        <h1 style={{ color: 'var(--o1)', fontSize: '24px', marginBottom: '8px' }}>Hirely AI — Professional Cover Letter</h1>
                        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '32px' }} />
                      </div>
                      {editMode ? (
                        <textarea 
                          className="ip-ans-area no-print"
                          value={generatedLetter}
                          onChange={(e) => setGeneratedLetter(e.target.value)}
                          style={{ width: '100%', height: '480px', border: 'none', background: 'var(--sf)', padding: '20px', borderRadius: '16px', fontSize: '14px', lineHeight: 1.6, resize: 'none' }}
                        />
                      ) : (
                        <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: 1.7, color: 'var(--t1)', padding: '10px' }}>
                          {generatedLetter}
                        </div>
                      )}
                    </div>
                  )}

                  {generatedLetter && (
                    <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border)' }} className="no-print">
                       <button className="btn btn-p" style={{ width: '100%' }} onClick={() => window.print()}>
                         Download as PDF
                       </button>
                    </div>
                  )}
                </div>

                {/* HELP BLOCK */}
                <div className="ip-card" style={{ marginTop: '24px', background: 'var(--o7)', border: '1.5px dashed var(--o5)' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="mat" style={{ color: 'var(--o3)', fontSize: '18px' }}>lightbulb</span>
                    <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--o2)' }}>PRO TIP</h4>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--t2)', lineHeight: 1.5, fontWeight: 600 }}>
                    Our AI cross-references your resume v.4 with the JD keywords to ensure high ATS relevance.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

```

### src\app\dashboard\page.tsx

```
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useUser } from '@/context/AuthContext';

export default function Dashboard() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [stats, setStats] = useState({ resumes: 0, bestMatch: 0, coverLetters: 0, pipelines: 0 });
  const [animatedStats, setAnimatedStats] = useState({ resumes: 0, bestMatch: 0, coverLetters: 0, pipelines: 0 });

  // Derive user's real data from user_metadata (persisted forever in Supabase)
  const userStats = user?.user_metadata?.stats || { resumes: 0, bestMatch: 0, coverLetters: 0, pipelines: 0 };
  const hasActivity = user?.user_metadata?.has_activity === true;
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'there';

  // Animate counters when data loads
  useEffect(() => {
    if (hasActivity) {
      const targets = userStats;
      const duration = 1200;
      const start = Date.now();

      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);

        setAnimatedStats({
          resumes: Math.round(ease * targets.resumes),
          bestMatch: Math.round(ease * targets.bestMatch),
          coverLetters: Math.round(ease * targets.coverLetters),
          pipelines: Math.round(ease * targets.pipelines),
        });

        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [hasActivity]);

  const openShare = () => window.dispatchEvent(new CustomEvent('open-share'));

  // Show skeleton while auth is loading
  if (isLoading) {
    return (
      <div id="page-dashboard" className="afi">
        <Navbar />
        <div className="app-shell">
          <Sidebar />
          <main className="main">
            <div className="afu">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div><div className="skel" style={{ height: '32px', width: '280px', marginBottom: '8px' }}></div><div className="skel" style={{ height: '16px', width: '340px' }}></div></div>
                <div className="skel" style={{ height: '44px', width: '140px', borderRadius: '14px' }}></div>
              </div>
              <div className="stat-row">
                {[1,2,3,4].map(i => <div key={i} className="stat-card"><div className="skel" style={{ height: '48px', width: '48px', borderRadius: '12px', marginBottom: '16px' }}></div><div className="skel" style={{ height: '32px', width: '80px', marginBottom: '8px' }}></div><div className="skel" style={{ height: '14px', width: '120px' }}></div></div>)}
              </div>
              <div className="dash-grid-2">
                <div className="dash-card"><div className="skel" style={{ height: '24px', width: '200px', marginBottom: '20px' }}></div><div className="skel" style={{ height: '300px', borderRadius: '16px' }}></div></div>
                <div className="dash-card"><div className="skel" style={{ height: '24px', width: '160px', marginBottom: '20px' }}></div><div className="skel-list">{[1,2,3,4].map(i => <div key={i} className="skel" style={{ height: '60px', borderRadius: '12px', marginBottom: '12px' }}></div>)}</div></div>
              </div>
            </div>
          </main>
        </div>
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div id="page-dashboard" className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main">

          {/* ========== EMPTY STATE — New User ========== */}
          {!hasActivity && (
            <div className="afu" style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ width: '100px', height: '100px', background: 'var(--o6)', borderRadius: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', boxShadow: '0 8px 32px rgba(163,61,0,.12)' }}>
                <span className="mat" style={{ fontSize: '48px', color: 'var(--o3)' }}>rocket_launch</span>
              </div>
              <h2 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '12px', color: 'var(--t1)' }}>
                Welcome, {displayName}! 🎉
              </h2>
              <p style={{ fontSize: '17px', color: 'var(--t2)', maxWidth: '500px', margin: '0 auto 12px', lineHeight: 1.6, fontWeight: 500 }}>
                Your career command center is ready. Upload your first resume to unlock AI-powered insights, job matching, and more.
              </p>
              <p style={{ fontSize: '14px', color: 'var(--t3)', maxWidth: '440px', margin: '0 auto 40px', fontWeight: 600 }}>
                Everything you do here is saved to your account forever — across all devices.
              </p>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
                <button className="btn btn-p btn-lg" onClick={() => router.push('/analyzer')} style={{ padding: '16px 36px', fontSize: '16px' }}>
                  <span className="mat" style={{ marginRight: '8px' }}>upload_file</span> Upload Resume
                </button>
                <button className="btn btn-s btn-lg" onClick={() => router.push('/jobmatch')} style={{ padding: '16px 36px', fontSize: '16px' }}>
                  <span className="mat" style={{ marginRight: '8px' }}>auto_awesome</span> Match a Job
                </button>
              </div>

              {/* Quick start cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
                <div className="dash-card" style={{ padding: '28px', textAlign: 'left', cursor: 'pointer', transition: 'all .2s' }} onClick={() => router.push('/analyzer')}>
                  <div style={{ width: '44px', height: '44px', background: 'var(--o6)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <span className="mat" style={{ color: 'var(--o2)' }}>description</span>
                  </div>
                  <h4 style={{ fontWeight: 800, marginBottom: '6px', fontSize: '15px' }}>Analyze Resume</h4>
                  <p style={{ fontSize: '13px', color: 'var(--t3)', fontWeight: 500, lineHeight: 1.5 }}>Get an ATS score and AI feedback on your resume.</p>
                </div>
                <div className="dash-card" style={{ padding: '28px', textAlign: 'left', cursor: 'pointer', transition: 'all .2s' }} onClick={() => router.push('/jobmatch')}>
                  <div style={{ width: '44px', height: '44px', background: 'var(--gbg)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <span className="mat" style={{ color: 'var(--green)' }}>manage_search</span>
                  </div>
                  <h4 style={{ fontWeight: 800, marginBottom: '6px', fontSize: '15px' }}>Match Jobs</h4>
                  <p style={{ fontSize: '13px', color: 'var(--t3)', fontWeight: 500, lineHeight: 1.5 }}>Find roles that fit your skills perfectly.</p>
                </div>
                <div className="dash-card" style={{ padding: '28px', textAlign: 'left', cursor: 'pointer', transition: 'all .2s' }} onClick={() => router.push('/cover-letter')}>
                  <div style={{ width: '44px', height: '44px', background: 'var(--pbg)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <span className="mat" style={{ color: 'var(--purple)' }}>mail</span>
                  </div>
                  <h4 style={{ fontWeight: 800, marginBottom: '6px', fontSize: '15px' }}>Cover Letter</h4>
                  <p style={{ fontSize: '13px', color: 'var(--t3)', fontWeight: 500, lineHeight: 1.5 }}>Generate a tailored cover letter with AI.</p>
                </div>
              </div>
            </div>
          )}

          {/* ========== LOADED STATE — Returning User with Activity ========== */}
          {hasActivity && (
            <div className="afu">
              <div className="dash-header">
                <div>
                  <h1 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--t1)' }}>Welcome back, {displayName}! 👋</h1>
                  <p style={{ color: 'var(--t2)', marginTop: '4px', fontWeight: 600 }}>
                    {userStats.resumes > 0 ? `You have ${userStats.resumes} resume${userStats.resumes > 1 ? 's' : ''} analyzed.` : 'Your career dashboard is ready.'}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn btn-s" onClick={openShare}>
                    <span className="mat" style={{ marginRight: '6px' }}>share</span> Share Score
                  </button>
                  <button className="btn btn-p" onClick={() => router.push('/jobmatch')}>
                    <span className="mat" style={{ marginRight: '6px' }}>rocket_launch</span> Match a Job
                  </button>
                </div>
              </div>

              <div className="stat-grid">
                <div className="scard afu" style={{ animationDelay: '100ms' }}>
                  <div className="scard-icon" style={{ background: 'var(--o6)', color: 'var(--o2)' }}><span className="mat">description</span></div>
                  <div className="scard-num">{animatedStats.resumes}</div>
                  <div className="scard-label">Total Resumes</div>
                </div>
                <div className="scard afu" style={{ animationDelay: '200ms' }}>
                  <div className="scard-icon" style={{ background: 'var(--gbg)', color: 'var(--green)' }}><span className="mat">verified</span></div>
                  <div className="scard-num">{animatedStats.bestMatch > 0 ? `${animatedStats.bestMatch}%` : '—'}</div>
                  <div className="scard-label">Best Match Score</div>
                </div>
                <div className="scard afu" style={{ animationDelay: '300ms' }}>
                  <div className="scard-icon" style={{ background: 'var(--pbg)', color: 'var(--purple)' }}><span className="mat">mail</span></div>
                  <div className="scard-num">{animatedStats.coverLetters}</div>
                  <div className="scard-label">Cover Letters</div>
                </div>
                <div className="scard afu" style={{ animationDelay: '400ms' }}>
                  <div className="scard-icon" style={{ background: 'var(--s2)', color: 'var(--t2)' }}><span className="mat">view_kanban</span></div>
                  <div className="scard-num">{animatedStats.pipelines}</div>
                  <div className="scard-label">Job Pipelines</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="qa-grid afu" style={{ animationDelay: '500ms', gridTemplateColumns: 'repeat(5, 1fr)' }}>
                <div className="qa-item" onClick={() => router.push('/analyzer')}>
                  <div className="qa-icon" style={{ background: 'var(--o6)', color: 'var(--o2)' }}><span className="mat">upload_file</span></div>
                  <div className="qa-info"><h4>Analyze</h4><p>Score Resume</p></div>
                </div>
                <div className="qa-item" onClick={() => router.push('/jobmatch')}>
                  <div className="qa-icon" style={{ background: 'var(--gbg)', color: 'var(--green)' }}><span className="mat">auto_awesome</span></div>
                  <div className="qa-info"><h4>Match</h4><p>AI Matching</p></div>
                </div>
                <div className="qa-item" onClick={() => router.push('/cover-letter')}>
                  <div className="qa-icon" style={{ background: 'var(--pbg)', color: 'var(--purple)' }}><span className="mat">description</span></div>
                  <div className="qa-info"><h4>Letter</h4><p>Drafting AI</p></div>
                </div>
                <div className="qa-item" onClick={() => router.push('/jobs')}>
                  <div className="qa-icon" style={{ background: 'var(--s2)', color: 'var(--t2)' }}><span className="mat">view_kanban</span></div>
                  <div className="qa-info"><h4>Tracker</h4><p>Kanban Board</p></div>
                </div>
                <div className="qa-item" onClick={() => router.push('/salary')}>
                  <div className="qa-icon" style={{ background: 'var(--bbg)', color: 'var(--blue)' }}><span className="mat">payments</span></div>
                  <div className="qa-info"><h4>Salary</h4><p>Intel Hub</p></div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

```

### src\app\errors\page.tsx

```
'use client';

import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

export default function ErrorStates() {
  const showToast = (type: string, msg: string) => window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));

  return (
    <div id="page-errors" className="page active">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main">
          <div style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-.02em', marginBottom: '4px' }}>Error States & Rate Limiting</div>
          <p style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '28px' }}>Pre-designed states for every possible failure — ensuring a premium experience regardless of platform issues.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '18px' }}>
            {/* API Error */}
            <div className="error-state show">
              <div className="error-icon"><span className="mat">cloud_off</span></div>
              <div className="error-title">AI service unavailable</div>
              <div className="error-msg">Our analysis engine is experiencing high load. This usually resolves in under 60 seconds.</div>
              <button className="error-retry" onClick={() => showToast('info', 'Retrying...')}>Try Again</button>
            </div>

            {/* PDF Parse Error */}
            <div style={{ background: '#fff', border: '1.5px solid var(--amber-bg)', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
              <div className="rate-icon" style={{ background: 'var(--amber-bg)' }}><span className="mat" style={{ color: 'var(--amber)' }}>description</span></div>
              <div className="error-title">Could not parse PDF</div>
              <div className="error-msg">This PDF appears to be image-based. ATS systems will also reject it for the same reason.</div>
              <div style={{ background: 'var(--amber-bg)', borderRadius: '10px', padding: '12px', marginBottom: '16px', fontSize: '12px', color: 'var(--amber)', fontWeight: 700, textAlign: 'left' }}>💡 Fix: Re-export from Word/Docs as a text-base PDF.</div>
              <button className="btn-primary" style={{ background: 'var(--amber)', boxShadow: 'none' }}>Upload Different File</button>
            </div>

            {/* Rate Limit */}
            <div className="rate-limit-card show" style={{ animation: 'none' }}>
              <div className="rate-icon"><span className="mat">schedule</span></div>
              <div className="rate-title">Daily limit reached</div>
              <div className="rate-msg">You've used your 1 free analysis today. Resets at midnight IST.</div>
              <div className="rate-countdown">08:42:17</div>
              <button className="rate-upgrade" onClick={() => window.dispatchEvent(new CustomEvent('open-upg'))}>Upgrade now ✦</button>
            </div>

            {/* Network Error */}
            <div style={{ background: '#fff', border: '1.5px solid var(--blue-bg)', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
              <div className="rate-icon" style={{ background: 'var(--blue-bg)' }}><span className="mat" style={{ color: 'var(--blue)' }}>wifi_off</span></div>
              <div className="error-title">You're offline</div>
              <div className="error-msg">No internet connection detected. Your draft is saved locally and will sync when you're back online.</div>
              <button className="btn-primary" style={{ background: 'var(--blue)', boxShadow: 'none' }}>I'm Back Online</button>
            </div>

            {/* Payment Failed */}
            <div style={{ background: '#fff', border: '1.5px solid var(--red-bg)', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
              <div className="rate-icon" style={{ background: 'var(--red-bg)' }}><span className="mat" style={{ color: 'var(--red)' }}>payment</span></div>
              <div className="error-title">Payment failed</div>
              <div className="error-msg">Your transaction was declined. This sometimes happens with prepaid cards.</div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>Retry Payment</button>
                <button className="btn-ghost" style={{ padding: '8px 16px', fontSize: '12px' }}>Try UPI Instead</button>
              </div>
            </div>

            {/* Empty search */}
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
              <div className="error-title">No results for "golang salary"</div>
              <div className="error-msg">Try searching for a job title, skill, or city name.</div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {['Go engineer', 'Backend', 'Bangalore'].map(s => (
                  <button key={s} className="salary-chip">{s}</button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

```

### src\app\interview\page.tsx

```
'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useSubscription } from '@/hooks/useSubscription';

export default function InterviewPrep() {
  const [mode, setMode] = useState<'text' | 'voice'>('text');
  const [ans, setAns] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { tier } = useSubscription();
  
  // Simulated Analysis State
  const [stats, setStats] = useState({
    clarity: 0,
    confidence: 0,
    relevance: 0
  });

  const [star, setStar] = useState({
    s: false,
    t: false,
    a: false,
    r: false
  });

  const [showReport, setShowReport] = useState(false);

  const handleSubmit = () => {
    if (tier !== 'advanced') {
      window.dispatchEvent(new CustomEvent('open-upgrade'));
      return;
    }
    setIsAnalyzing(true);
    // Simulate real-time update
    setTimeout(() => {
      setStats({ clarity: 88, confidence: 74, relevance: 96 });
      setStar({ s: true, t: true, a: true, r: true });
      setIsAnalyzing(false);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'Answer Analyzed! Feedback updated.' } }));
    }, 2000);
  };

  const handleEndSession = () => {
    setShowReport(true);
  };

  return (
    <div id="page-interview" className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '0', background: 'var(--surface)' }}>
          
          <div className="ip-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 900 }}>Interview Prep</h1>
              <span className="badge bo" style={{ fontSize: '10px' }}>General Behavioral</span>
            </div>
            <div className="ip-prog-label">
              Session progress <span className="ip-prog-val">Q1 of 10</span>
            </div>
          </div>

          <div style={{ padding: '0 40px 40px' }}>
            <div className="ip-grid">
              
              {/* LEFT COLUMN: MAIN WORKSPACE */}
              <div className="afu">
                
                {/* QUESTION CARD */}
                <div className="ip-card" style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <span className="badge bo">BEHAVIORAL</span>
                    <span className="badge bgy">EASY</span>
                    <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, color: 'var(--t4)' }}>Question 1 / 10</span>
                  </div>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, lineHeight: 1.4, color: 'var(--t1)', marginBottom: '16px' }}>
                    "Tell me about yourself and your professional background. What brings you here today?"
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--t3)', fontWeight: 600 }}>
                    <span className="mat" style={{ fontSize: '18px' }}>lightbulb</span>
                    Use the STAR method — Situation, Task, Action, Result. Aim for 90-120 seconds.
                  </div>
                </div>

                {/* LIVE ANALYSIS CARD */}
                <div className="ip-card" style={{ marginBottom: '24px', minHeight: '380px', position: 'relative' }}>
                  <div className="ip-card-h" style={{ opacity: tier === 'advanced' ? 1 : 0.3 }}>
                    <h3 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--t4)', textTransform: 'uppercase' }}>Live Answer Analysis</h3>
                    <div className="ip-status">
                      <div className="dot-blink"></div>
                      {isAnalyzing ? 'Analyzing...' : 'Ready'}
                    </div>
                  </div>

                  <div className="ip-rings" style={{ opacity: tier === 'advanced' ? 1 : 0.3, filter: tier === 'advanced' ? 'none' : 'blur(8px)' }}>
                    {/* CLARITY */}
                    <div className="ip-ring-i">
                      <div className="ip-ring-w">
                        <svg width="120" height="120">
                          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--s2)" strokeWidth="10" />
                          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--o3)" strokeWidth="10" strokeDasharray="339.29" strokeDashoffset={339.29 * (1 - stats.clarity/100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }} />
                        </svg>
                        <div className="ip-ring-c">
                          <span className="ip-ring-num">{stats.clarity}</span>
                          <span className="ip-ring-pct">%</span>
                        </div>
                      </div>
                      <div className="ip-ring-label">Clarity</div>
                      <div className="ip-ring-sub">Excellent articulation</div>
                    </div>

                    {/* CONFIDENCE */}
                    <div className="ip-ring-i">
                      <div className="ip-ring-w">
                        <svg width="120" height="120">
                          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--s2)" strokeWidth="10" />
                          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--o4)" strokeWidth="10" strokeDasharray="339.29" strokeDashoffset={339.29 * (1 - stats.confidence/100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }} />
                        </svg>
                        <div className="ip-ring-c">
                          <span className="ip-ring-num">{stats.confidence}</span>
                          <span className="ip-ring-pct">%</span>
                        </div>
                      </div>
                      <div className="ip-ring-label">Confidence</div>
                      <div className="ip-ring-sub">Stay steady</div>
                    </div>

                    {/* RELEVANCE */}
                    <div className="ip-ring-i">
                      <div className="ip-ring-w">
                        <svg width="120" height="120">
                          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--s2)" strokeWidth="10" />
                          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--o2)" strokeWidth="10" strokeDasharray="339.29" strokeDashoffset={339.29 * (1 - stats.relevance/100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }} />
                        </svg>
                        <div className="ip-ring-c">
                          <span className="ip-ring-num">{stats.relevance}</span>
                          <span className="ip-ring-pct">%</span>
                        </div>
                      </div>
                      <div className="ip-ring-label">Relevance</div>
                      <div className="ip-ring-sub">Strong keywords</div>
                    </div>
                  </div>

                  <div className="ip-star-grid" style={{ opacity: tier === 'advanced' ? 1 : 0.3, filter: tier === 'advanced' ? 'none' : 'blur(8px)' }}>
                    <div className="ip-star-box">
                      <span className="ip-star-l">SITUATION</span>
                      <span className={`ip-star-s ${star.s ? 'present' : 'missing'}`}>
                        <span className="mat">{star.s ? 'check' : 'remove'}</span> {star.s ? 'Present' : 'Missing'}
                      </span>
                    </div>
                    <div className="ip-star-box">
                      <span className="ip-star-l">TASK</span>
                      <span className={`ip-star-s ${star.t ? 'present' : 'missing'}`}>
                        <span className="mat">{star.t ? 'check' : 'remove'}</span> {star.t ? 'Present' : 'Missing'}
                      </span>
                    </div>
                    <div className="ip-star-box">
                      <span className="ip-star-l">ACTION</span>
                      <span className={`ip-star-s ${star.a ? 'present' : 'missing'}`}>
                        <span className="mat">{star.a ? 'check' : 'remove'}</span> {star.a ? 'Present' : 'Missing'}
                      </span>
                    </div>
                    <div className="ip-star-box">
                      <span className="ip-star-l">RESULT</span>
                      <span className={`ip-star-s ${star.r ? 'present' : 'missing'}`}>
                        <span className="mat">{star.r ? 'check' : 'remove'}</span> {star.r ? 'Present' : 'Missing'}
                      </span>
                    </div>
                  </div>

                  {/* LOCK OVERLAY */}
                  {tier !== 'advanced' && (
                    <div className="locked-overlay">
                       <div className="locked-msg afu">
                          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--o6)', color: 'var(--o3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                             <span className="mat" style={{ fontSize: '24px' }}>lock</span>
                          </div>
                          <h4>Advanced Mock Interview</h4>
                          <p>Get real-time analysis, STAR tracking, and recruiter-style feedback for your voice and text answers.</p>
                          <button className="btn btn-p" style={{ width: '100%', marginBottom: '8px' }} onClick={() => window.dispatchEvent(new CustomEvent('open-upgrade'))}>
                             Upgrade to Advanced
                          </button>
                       </div>
                    </div>
                  )}
                </div>

                {/* YOUR ANSWER BOX */}
                <div className="ip-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 900 }}>Your Answer</h3>
                    <div style={{ display: 'flex', background: 'var(--s2)', padding: '4px', borderRadius: '10px' }}>
                      <button 
                        className={`btn ${mode === 'text' ? 'active' : ''}`} 
                        onClick={() => setMode('text')}
                        style={{ padding: '6px 16px', fontSize: '12px', background: mode === 'text' ? 'var(--w)' : 'none', border: 'none', boxShadow: mode === 'text' ? 'var(--sh1)' : 'none', color: mode === 'text' ? 'var(--t1)' : 'var(--t3)', borderRadius: '8px' }}
                      >
                         <span className="mat" style={{ fontSize: '16px', marginRight: '6px' }}>edit_note</span> Text
                      </button>
                      <button 
                        className={`btn ${mode === 'voice' ? 'active' : ''}`} 
                        onClick={() => {
                          if (tier !== 'advanced') {
                            window.dispatchEvent(new CustomEvent('open-upgrade'));
                            return;
                          }
                          setMode('voice');
                        }}
                        style={{ padding: '6px 16px', fontSize: '12px', background: mode === 'voice' ? 'var(--w)' : 'none', border: 'none', boxShadow: mode === 'voice' ? 'var(--sh1)' : 'none', color: mode === 'voice' ? 'var(--t1)' : 'var(--t3)', borderRadius: '8px' }}
                      >
                         <span className="mat" style={{ fontSize: '16px', marginRight: '6px' }}>mic</span> Voice
                      </button>
                    </div>
                  </div>
                  
                  <textarea 
                    className="ip-ans-area"
                    placeholder="Start typing your answer here... Use the STAR method: describe the Situation, your Task, the Action you took, and the Result."
                    value={ans}
                    onChange={(e) => setAns(e.target.value)}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--t4)', fontWeight: 700 }}>{ans.split(/\s+/).filter(Boolean).length} words</span>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button className="btn btn-g" style={{ padding: '12px 32px' }}>Skip</button>
                      <button className="btn btn-p" style={{ padding: '12px 40px', fontSize: '15px' }} onClick={handleSubmit}>
                        Submit Answer <span className="mat" style={{ fontSize: '18px', marginLeft: '8px' }}>arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: SIDEBAR TOOLS */}
              <div className="afu ip-side-sec" style={{ animationDelay: '100ms' }}>
                
                {/* SESSION STATS */}
                <div className="ip-card">
                  <h3 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--t4)', textTransform: 'uppercase', marginBottom: '16px' }}>Session Stats</h3>
                  <div className="ip-stat-grid">
                    <div className="ip-stat-i">
                      <h4>0</h4>
                      <span>Done</span>
                    </div>
                    <div className="ip-stat-i">
                      <h4 style={{ color: 'var(--o3)' }}>--</h4>
                      <span>Avg Score</span>
                    </div>
                    <div className="ip-stat-i">
                      <h4>10</h4>
                      <span>Left</span>
                    </div>
                  </div>
                </div>

                {/* AI COACHING HINT */}
                <div className="ip-card" style={{ background: 'var(--o7)', border: '1.5px dashed var(--o5)' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                     <span className="mat" style={{ color: 'var(--o3)' }}>tips_and_updates</span>
                     <h3 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--o2)', textTransform: 'uppercase' }}>AI Coaching Hint</h3>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.6, fontWeight: 600 }}>
                    "Your answer needs a concrete Result. Quantify the outcome — did adoption increase? Did the stakeholder change their stance? A number here could lift your score by 12+ points."
                  </p>
                </div>

                {/* KEYWORDS TO INCLUDE */}
                <div className="ip-card">
                  <h3 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--t4)', textTransform: 'uppercase', marginBottom: '12px' }}>Keywords to Include</h3>
                  <div className="kw-tags">
                    <div className="kw-tag v"><span className="mat" style={{ fontSize: '14px' }}>check</span> stakeholder</div>
                    <div className="kw-tag v"><span className="mat" style={{ fontSize: '14px' }}>check</span> data-driven</div>
                    <div className="kw-tag v"><span className="mat" style={{ fontSize: '14px' }}>check</span> alignment</div>
                    <div className="kw-tag o">+ outcome</div>
                    <div className="kw-tag o">+ impact</div>
                    <div className="kw-tag o">+ metrics</div>
                    <div className="kw-tag o">trade-off</div>
                    <div className="kw-tag o">consensus</div>
                  </div>
                  <div style={{ marginTop: '16px', fontSize: '11px', color: 'var(--t3)', fontWeight: 700 }}>
                    <span style={{ color: 'var(--green)' }}>3 matched</span> · 3 suggested · 2 optional
                  </div>
                </div>

                {/* FILLER WORD TRACKER */}
                <div className="ip-card" style={{ position: 'relative' }}>
                  {tier !== 'advanced' && (
                    <div className="locked-overlay" style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '24px' }}>
                      <button className="btn btn-p btn-sm" onClick={() => window.dispatchEvent(new CustomEvent('open-upgrade'))}>Unlock</button>
                    </div>
                  )}
                  <h3 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--t4)', textTransform: 'uppercase', marginBottom: '8px' }}>Filler Word Tracker</h3>
                  <div className="filler-row"><span>"um"</span> <span style={{ opacity: 0.3 }}>0x</span></div>
                  <div className="filler-row"><span>"like"</span> <span style={{ opacity: 0.3 }}>0x</span></div>
                  <div className="filler-row"><span>"you know"</span> <span style={{ opacity: 0.3 }}>0x</span></div>
                  <div className="filler-row"><span>"basically"</span> <span style={{ opacity: 0.3 }}>0x</span></div>
                  <p style={{ fontSize: '10px', color: 'var(--t3)', marginTop: '12px', fontWeight: 600 }}>Reduce filler words to boost Confidence score</p>
                </div>

                {/* PREVIOUS ANSWERS */}
                <div className="ip-card">
                  <h3 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--t4)', textTransform: 'uppercase', marginBottom: '12px' }}>Previous Answers</h3>
                  <div style={{ textAlign: 'center', padding: '20px 0', opacity: 0.5, fontSize: '12px', fontWeight: 600 }}>
                    No sessions recorded yet.
                  </div>
                  <button className="btn btn-g btn-sm" style={{ width: '100%', marginTop: '8px' }} onClick={handleEndSession}>End Session Early</button>
                </div>

              </div>

            </div>
          </div>

          {/* SESSION COMPLETION REPORT MODAL */}
          {showReport && (
            <div className="modal-overlay adu" style={{ padding: '40px' }}>
               <div className="modal-card afu" style={{ maxWidth: '900px', width: '100%', padding: '0', overflow: 'hidden' }}>
                  <div style={{ background: 'var(--o1)', color: 'white', padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <div>
                        <span className="badge bo" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', marginBottom: '12px' }}>SESSION COMPLETE</span>
                        <h2 style={{ fontSize: '32px', fontWeight: 900 }}>Excellent Progress, Charan! 🚀</h2>
                        <p style={{ opacity: 0.8, fontWeight: 600, marginTop: '8px' }}>Your behavioral session score is in the top 12% of applicants.</p>
                     </div>
                     <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '48px', fontWeight: 900 }}>82<span style={{ fontSize: '24px', opacity: 0.7 }}>/100</span></div>
                        <div style={{ fontSize: '14px', fontWeight: 800, opacity: 0.8 }}>OVERALL SCORE</div>
                     </div>
                  </div>

                  <div style={{ padding: '40px' }}>
                     <div className="dash-grid-2">
                        <div>
                           <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '24px' }}>Skill Breakdown</h3>
                           <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                              {[
                                 { label: 'Technical Accuracy', val: 92, color: 'var(--green)' },
                                 { label: 'Strategic Thinking', val: 78, color: 'var(--o3)' },
                                 { label: 'Communication', val: 84, color: 'var(--blue)' },
                                 { label: 'STAR Structure', val: 68, color: 'var(--purple)' },
                              ].map(s => (
                                 <div key={s.label}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', fontWeight: 700 }}>
                                       <span>{s.label}</span>
                                       <span>{s.val}%</span>
                                    </div>
                                    <div style={{ height: '8px', background: 'var(--s2)', borderRadius: '99px' }}>
                                       <div style={{ height: '100%', width: `${s.val}%`, background: s.color, borderRadius: '99px' }}></div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>

                        <div style={{ background: 'var(--sf)', padding: '32px', borderRadius: '24px', border: '1.5px solid var(--border)' }}>
                           <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '16px' }}>AI Coaching Insights</h3>
                           <div className="dash-time">
                              <div className="dash-time-i">
                                 <div className="dash-time-dot green"></div>
                                 <div className="dash-time-c">
                                    <p style={{ fontWeight: 800 }}>Strong Technical Foundation</p>
                                    <span style={{ fontSize: '13px', opacity: 0.7 }}>You articulated complex edge cases perfectly in Q2.</span>
                                 </div>
                              </div>
                              <div className="dash-time-i">
                                 <div className="dash-time-dot"></div>
                                 <div className="dash-time-c">
                                    <p style={{ fontWeight: 800 }}>Improve Result Quantification</p>
                                    <span style={{ fontSize: '13px', opacity: 0.7 }}>Try to use more numbers (ROI, %, Time saved) in your results.</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div style={{ marginTop: '40px', display: 'flex', gap: '16px' }}>
                        <button className="btn btn-p" style={{ flex: 1, padding: '16px' }} onClick={() => setShowReport(false)}>
                           Continue to Dashboard
                        </button>
                        <button className="btn btn-s" style={{ flex: 1, padding: '16px' }} onClick={() => window.print()}>
                           Download PDF Report
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          )}

        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

```

### src\app\jobmatch\page.tsx

```
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useSubscription } from '@/hooks/useSubscription';

export default function JobMatch() {
  const router = useRouter();
  const [tab, setTab] = useState<'single' | 'ab' | 'history' | 'local'>('ab');
  const { tier } = useSubscription();
  const [resume, setResume] = useState('Senior Product Manager with 8+ years of experience leading cross-functional teams at Google and Amazon. Expert in user-centric design, A/B testing, and scaling cloud-native SaaS products.');
  
  const [abJobs, setAbJobs] = useState([
    { id: 1, title: 'Senior Product Manager', company: 'Stripe', jd: 'We are looking for a Senior PM to lead our Billing platform. Experience with payments and API design is a plus.' },
    { id: 2, title: 'Lead Product Manager', company: 'Atlassian', jd: 'Join our Jira Cloud team. Focus on user growth, retention, and enterprise-grade features.' },
    { id: 3, title: 'Product Director', company: 'Razorpay', jd: 'Scale our neo-banking initiative. Deep understanding of fintech and platform infrastructure required.' },
  ]);

  const [results, setResults] = useState<any[]>([]);
  const [isMatching, setIsMatching] = useState(false);

  const startMatch = () => {
    if (tier === 'free') {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'info', msg: 'Free plan: 1 match/day used. Upgrade for unlimited A/B compares.' } }));
    }
    setIsMatching(true);
    setTimeout(() => {
      setResults([
        { id: 1, score: 91, fit: 'EXCELLENT', skills: ['API Design', 'Payments'], gap: ['Scaling'] },
        { id: 2, score: 78, fit: 'STRONG', skills: ['Growth', 'SaaS'], gap: ['Enterprise'] },
        { id: 3, score: 65, fit: 'MODERATE', skills: ['Fintech'], gap: ['Infrastructure'] },
      ]);
      setIsMatching(false);
    }, 1500);
  };

  const handleLocalTab = () => {
    if (tier !== 'advanced') {
      window.dispatchEvent(new CustomEvent('open-upgrade'));
    } else {
      setTab('local');
    }
  };

  const showToast = (type: any, msg: string) => window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));

  return (
    <div id="page-jobmatch" className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '40px' }}>
          <div className="dash-header" style={{ marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)' }}>AI Job Matcher 🚀</h1>
              <p style={{ color: 'var(--t2)', marginTop: '4px', fontWeight: 600 }}>Compare your resume against multiple job descriptions with Hirely AI.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-s" onClick={() => window.dispatchEvent(new CustomEvent('open-share'))}>
                <span className="mat" style={{ marginRight: '6px' }}>share</span> Share Result
              </button>
            </div>
          </div>

          <div className="ftabs">
            <button className={`ftab ${tab === 'single' ? 'active' : ''}`} onClick={() => setTab('single')}>Single Match</button>
            <button className={`ftab ${tab === 'ab' ? 'active' : ''}`} onClick={() => setTab('ab')}>A/B Compare 3 Jobs</button>
            <button className={`ftab ${tab === 'history' ? 'active' : ''}`} onClick={() => setTab('history')}>Match History</button>
            <button 
              className={`ftab ${tab === 'local' ? 'active' : ''}`} 
              onClick={handleLocalTab}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <span className="mat" style={{ fontSize: '16px' }}>location_on</span>
              Near Me
              {tier !== 'advanced' && <span className="sb-badge" style={{ background: 'var(--o3)', marginLeft: '4px' }}>ADV</span>}
            </button>
          </div>

          {tab === 'ab' && (
            <div className="afu">
              <div className="ab-resume-box afu" style={{ padding: '24px', background: 'var(--w)', border: '1.5px solid var(--bd)', borderRadius: '24px', marginBottom: '24px', boxShadow: 'var(--sh1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <label className="ab-num" style={{ fontSize: '12px' }}>GLOBAL RESUME CONTENT</label>
                  <span className="badge bp">Shared across all 3 matches</span>
                </div>
                <textarea 
                  className="ab-area" 
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  placeholder="Paste your central resume content here..."
                  style={{ minHeight: '100px', fontSize: '15px' }}
                />
              </div>

              <div className="ab-grid">
                {abJobs.map((job, i) => (
                  <div key={job.id} className="ab-card afu" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                    <div className="ab-num">JOB MATCH #0{job.id}</div>
                    
                    <div className="ab-inp-w">
                      <label className="ab-inp-l">Job Title</label>
                      <input 
                        className="ab-input" 
                        value={job.title}
                        onChange={(e) => {
                          const next = [...abJobs];
                          next[i].title = e.target.value;
                          setAbJobs(next);
                        }}
                      />
                    </div>

                    <div className="ab-inp-w">
                      <label className="ab-inp-l">Company Name</label>
                      <input 
                        className="ab-input" 
                        value={job.company}
                        onChange={(e) => {
                          const next = [...abJobs];
                          next[i].company = e.target.value;
                          setAbJobs(next);
                        }}
                      />
                    </div>

                    <div className="ab-inp-w" style={{ flex: 1 }}>
                      <label className="ab-inp-l">Job Description</label>
                      <textarea 
                        className="ab-area" 
                        value={job.jd}
                        onChange={(e) => {
                          const next = [...abJobs];
                          next[i].jd = e.target.value;
                          setAbJobs(next);
                        }}
                        style={{ minHeight: '130px' }}
                      />
                    </div>

                    {results[i] && (
                      <div className="ab-res afu" style={{ marginTop: '12px', padding: '16px', background: 'var(--sf)', borderRadius: '16px', border: '1px solid var(--bd2)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <div style={{ fontSize: '24px', fontWeight: 900, color: results[i].score > 80 ? 'var(--green)' : 'var(--o2)' }}>{results[i].score}%</div>
                          <span className={`badge ${results[i].score > 80 ? 'bg' : 'bo'}`}>{results[i].fit}</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {results[i].skills.map((s: string) => <span key={s} className="badge bb" style={{ fontSize: '10px' }}>{s}</span>)}
                          {results[i].gap.map((g: string) => <span key={g} className="badge br" style={{ fontSize: '10px' }}>Gap: {g}</span>)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="ab-btn-centered">
                <button 
                  className="btn btn-p btn-lg" 
                  onClick={startMatch}
                  disabled={isMatching}
                  style={{ padding: '16px 60px', borderRadius: '18px', width: '100%', maxWidth: '600px' }}
                >
                  {isMatching ? (
                    <><span className="mat" style={{ animation: 'spin 1.5s linear infinite', marginRight: '10px' }}>sync</span> Analyzing 3 Jobs...</>
                  ) : (
                    <><span className="mat" style={{ marginRight: '10px' }}>auto_awesome</span> Compare All 3 Jobs at Once</>
                  )}
                </button>
              </div>
            </div>
          )}

          {tab === 'single' && (
            <div className="afu" style={{ textAlign: 'center', padding: '100px 0' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--o6)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <span className="mat" style={{ fontSize: '40px', color: 'var(--o3)' }}>search</span>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 900 }}>Single Match Analysis</h2>
              <p style={{ color: 'var(--t3)', marginTop: '8px', fontWeight: 600 }}>Coming shortly. We're prioritizing the A/B Comparison workspace.</p>
              <button className="btn btn-s" style={{ marginTop: '24px' }} onClick={() => setTab('ab')}>Back to A/B Compare</button>
            </div>
          )}

          {tab === 'history' && (
            <div className="afu" style={{ textAlign: 'center', padding: '100px 0' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--sc2)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <span className="mat" style={{ fontSize: '40px', color: 'var(--t3)' }}>history</span>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 900 }}>No Match History</h2>
              <p style={{ color: 'var(--t3)', marginTop: '8px', fontWeight: 600 }}>Your match reports will appear here once you run and save an analysis.</p>
            </div>
          )}

          {tab === 'local' && (
            <div className="afu">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                   <h2 style={{ fontSize: '24px', fontWeight: 900 }}>Jobs Near Bangalore</h2>
                   <p style={{ color: 'var(--t4)', fontWeight: 800, fontSize: '13px' }}>FETCHED FROM PROFILE LOCATION • UPDATED 2M AGO</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                   <div style={{ padding: '10px 16px', borderRadius: '14px', background: 'var(--w)', border: '1.5px solid var(--bd)', fontSize: '12px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="mat" style={{ color: 'var(--o1)', fontSize: '18px' }}>filter_list</span> Filters
                   </div>
                   <div style={{ padding: '10px 16px', borderRadius: '14px', background: 'var(--w)', border: '1.5px solid var(--bd)', fontSize: '12px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="mat" style={{ color: 'var(--o1)', fontSize: '18px' }}>notifications</span> Alert On
                   </div>
                </div>
              </div>

              <div className="dash-grid-2">
                 {[
                   { company: 'Google', role: 'Staff Product Manager', pay: '₹75L - ₹90L', time: '2h ago', match: 94, tags: ['Hybrid', 'Tier 1'] },
                   { company: 'Uber', role: 'Sr. Product Analyst', pay: '₹42L - ₹55L', time: '6h ago', match: 88, tags: ['On-site', 'Stock'] },
                   { company: 'Zomato', role: 'Product Lead', pay: '₹60L+', time: '1d ago', match: 82, tags: ['Remote', 'High Growth'] },
                   { company: 'PhonePe', role: 'Growth Product Manager', pay: '₹35L - ₹48L', time: '2d ago', match: 79, tags: ['Fintech'] },
                 ].map((j, i) => (
                   <div key={i} className="ip-card afu" style={{ animationDelay: `${i * 100}ms` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--gbg)', border: '1px solid var(--bd)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 900, color: 'var(--t4)' }}>
                           {j.company[0]}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                           <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--green)' }}>{j.match}%</div>
                           <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--t4)' }}>MATCH</div>
                        </div>
                      </div>
                      <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '4px' }}>{j.role}</h3>
                      <p style={{ fontSize: '14px', color: 'var(--t3)', fontWeight: 700, marginBottom: '20px' }}>{j.company} • {j.time}</p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <div style={{ fontSize: '15px', fontWeight: 900 }}>{j.pay}</div>
                         <div style={{ display: 'flex', gap: '6px' }}>
                            {j.tags.map(t => <span key={t} className="badge bg" style={{ fontSize: '10px' }}>{t}</span>)}
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          )}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

```

### src\app\jobs\page.tsx

```
'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

type Job = {
  id: number;
  title: string;
  co: string;
  loc: string;
  mode: string;
  score: number;
  date: string;
  bg: string;
  badge: string | null;
  colId: string;
};

const INITIAL_COLS = [
  { id: 'wishlist', title: 'WISHLIST', dot: '#9ca3af', tc: 'var(--t2)', tbg: 'var(--s2)' },
  { id: 'applied', title: 'APPLIED', dot: 'var(--bl)', tc: 'var(--bl)', tbg: 'var(--bbg)' },
  { id: 'interviewing', title: 'INTERVIEWING', dot: 'var(--am)', tc: 'var(--am)', tbg: 'var(--abg)' },
  { id: 'offered', title: 'OFFERED', dot: 'var(--gn)', tc: 'var(--gn)', tbg: 'var(--gbg)' },
];

const INITIAL_JOBS: Job[] = [
  { id: 1, title: 'Senior SWE', co: 'Google', loc: 'Bangalore', mode: 'Hybrid', score: 82, date: 'Saved Jan 20', bg: '#1a73e8', badge: null, colId: 'wishlist' },
  { id: 2, title: 'Software Engineer', co: 'Zepto', loc: 'Mumbai', mode: 'Remote', score: 79, date: 'Saved Jan 22', bg: '#ff424d', badge: null, colId: 'wishlist' },
  { id: 3, title: 'Staff Engineer', co: 'Stripe', loc: 'Remote', mode: 'Remote', score: 87, date: 'Applied Jan 18', bg: '#6772e5', badge: null, colId: 'applied' },
  { id: 4, title: 'Senior Engineer', co: 'CRED', loc: 'Bangalore', mode: 'Hybrid', score: 81, date: 'Applied Jan 15', bg: '#fc3464', badge: null, colId: 'applied' },
  { id: 5, title: 'Senior SWE', co: 'Swiggy', loc: 'Bangalore', mode: 'Hybrid', score: 84, date: 'Round 2 · Jan 28', bg: '#f97316', badge: 'Round 2', colId: 'interviewing' },
  { id: 6, title: 'Senior Engineer', co: 'Navi', loc: 'Bangalore', mode: 'Hybrid', score: 90, date: '🎉 Offer received!', bg: '#9b5cf6', badge: 'Offer ₹32L', colId: 'offered' },
];

export default function ApplicationTracker() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [draggedId, setDraggedId] = useState<number | null>(null);

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const handleDragStart = (id: number) => {
    setDraggedId(id);
  };

  const handleDrop = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    if (draggedId !== null) {
      setJobs(prev => prev.map(j => j.id === draggedId ? { ...j, colId } : j));
      setDraggedId(null);
      showToast('success', 'Application moved!');
    }
  };

  const openJobDetail = (job: Job) => {
    showToast('info', `Opening details for ${job.title} at ${job.co}...`);
  };

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'var(--o6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="mat" style={{ color: 'var(--o2)', fontSize: '20px' }}>view_kanban</span>
                </div>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-.03em', color: 'var(--t1)' }}>Application Tracker</h1>
                  <p style={{ fontSize: '13px', color: 'var(--t2)' }}>Manage {jobs.length} active pipelines in your high-performance workspace.</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button className="btn btn-s btn-sm" onClick={() => showToast('info', 'Auto-sync started — scanning LinkedIn, Naukri...')}>
                <span className="mat" style={{ fontSize: '14px' }}>sync</span> Auto-Sync
              </button>
              <button className="btn btn-p" onClick={() => showToast('info', 'New Pipeline wizard coming soon!')}>
                <span className="mat">add</span> New Pipeline
              </button>
            </div>
          </div>

          {/* VIEW TOGGLE */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', alignItems: 'center' }}>
            <div style={{ display: 'flex', background: 'var(--s2)', borderRadius: '12px', padding: '3px', gap: '2px' }}>
              <button 
                className={view === 'kanban' ? 'btn btn-sm active' : 'btn btn-g btn-sm'} 
                onClick={() => setView('kanban')}
                style={view === 'kanban' ? { borderRadius: '10px', fontSize: '12px', padding: '6px 14px', background: 'var(--w)', boxShadow: 'var(--sh1)' } : { borderRadius: '10px', fontSize: '12px', padding: '6px 14px' }}
              >
                Kanban
              </button>
              <button 
                className={view === 'list' ? 'btn btn-sm active' : 'btn btn-g btn-sm'} 
                onClick={() => setView('list')}
                style={view === 'list' ? { borderRadius: '10px', fontSize: '12px', padding: '6px 14px', background: 'var(--w)', boxShadow: 'var(--sh1)' } : { borderRadius: '10px', fontSize: '12px', padding: '6px 14px' }}
              >
                List
              </button>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--t3)', fontWeight: 600 }}>{jobs.length} total applications</span>
          </div>

          {/* KANBAN VIEW */}
          {view === 'kanban' && (
            <div>
              <div className="kb-board" style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px', alignItems: 'flex-start' }}>
                {INITIAL_COLS.map(col => {
                  const colJobs = jobs.filter(j => j.colId === col.id);
                  return (
                    <div 
                      key={col.id} 
                      style={{ flex: '1 1 300px', minWidth: '300px', background: 'var(--s2)', borderRadius: '16px', padding: '14px' }}
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => handleDrop(e, col.id)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: col.dot, marginRight: '8px' }}></div>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: col.tc }}>{col.title}</div>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: col.tc, marginLeft: '8px', opacity: 0.7 }}>{colJobs.length}</div>
                        <button className="btn-icon-sm" style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: 'var(--t3)' }} onClick={() => showToast('info', 'Add job modal coming soon!')}>
                          <span className="mat" style={{ fontSize: '18px' }}>add</span>
                        </button>
                      </div>
                      
                      {colJobs.length === 0 ? (
                        <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--t4)', fontSize: '13px', fontWeight: 600, border: '2px dashed var(--border)', borderRadius: '12px' }}>
                          <span className="mat" style={{ display: 'block', fontSize: '24px', marginBottom: '8px', opacity: 0.5 }}>inbox</span>
                          No {col.title.toLowerCase()} yet
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {colJobs.map(job => (
                            <div 
                              key={job.id} 
                              draggable
                              onDragStart={() => handleDragStart(job.id)}
                              onClick={() => openJobDetail(job)}
                              style={{ background: 'var(--w)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', cursor: 'grab', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
                            >
                              {job.badge && (
                                <div style={{ fontSize: '9px', fontWeight: 800, padding: '2px 8px', borderRadius: '999px', background: col.tbg, color: col.tc, display: 'inline-block', marginBottom: '8px' }}>
                                  {job.badge}
                                </div>
                              )}
                              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: job.bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 800 }}>
                                  {job.co[0]}
                                </div>
                                <div>
                                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--t1)' }}>{job.title}</div>
                                  <div style={{ fontSize: '12px', color: 'var(--t3)', fontWeight: 600 }}>{job.co} · {job.loc}</div>
                                </div>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, marginBottom: '8px' }}>
                                <span style={{ color: 'var(--o2)' }}>{job.score}% match</span>
                                <span style={{ color: 'var(--t3)' }}>{job.mode}</span>
                              </div>
                              <div style={{ fontSize: '10px', color: 'var(--t4)', fontWeight: 600 }}>{job.date}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* LIST VIEW */}
          {view === 'list' && (
            <div className="card">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--t3)', borderBottom: '1px solid var(--bd)' }}>Role</th>
                    <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--t3)', borderBottom: '1px solid var(--bd)' }}>Company</th>
                    <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--t3)', borderBottom: '1px solid var(--bd)' }}>Stage</th>
                    <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--t3)', borderBottom: '1px solid var(--bd)' }}>Match</th>
                    <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--t3)', borderBottom: '1px solid var(--bd)' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map(job => {
                    const col = INITIAL_COLS.find(c => c.id === job.colId)!;
                    return (
                      <tr 
                        key={job.id} 
                        style={{ cursor: 'pointer', transition: 'background 100ms' }} 
                        onClick={() => openJobDetail(job)}
                        className="hover-row" // Needs quick CSS tweak in globals or inline
                      >
                        <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 700 }}>{job.title}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: job.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 800 }}>
                              {job.co[0]}
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600 }}>{job.co}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 9px', borderRadius: '999px', background: col.tbg, color: col.tc }}>
                            {col.title}
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 800, color: 'var(--o2)' }}>{job.score}%</td>
                        <td style={{ padding: '12px 14px', fontSize: '12px', color: 'var(--t3)' }}>{job.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <style jsx>{`
                .hover-row:hover { background: var(--o7); }
              `}</style>
            </div>
          )}
          
          <div style={{ marginTop: '16px', padding: '12px 16px', background: 'var(--w)', borderRadius: '12px', border: '1px solid var(--bd)', fontSize: '12px', color: 'var(--t3)' }}>
            💡 Drag cards between columns to update their status. Click any card for full details.
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

```

### src\app\notifications\page.tsx

```
'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useRouter } from 'next/navigation';

type Notification = {
  id: number;
  icon: string;
  title: string;
  msg: string;
  time: string;
  page: string;
  read: boolean;
  ibg: string;
  ic: string;
  type: 'jobs' | 'resume' | 'interview' | 'other';
};

const INITIAL_NOTIFS: Notification[] = [
  { id: 1, type: 'resume', icon: 'description', title: 'Analysis Complete', msg: 'Your latest resume analysis for Senior PM is ready. Score: 92%', time: '10 mins ago', page: '/analyzer', read: false, ibg: 'var(--o6)', ic: 'var(--o2)' },
  { id: 2, type: 'jobs', icon: 'work', title: 'New Job Match', msg: 'Stripe is hiring a Product Director with a 95% skill match.', time: '2 hours ago', page: '/jobmatch', read: false, ibg: 'var(--gbg)', ic: 'var(--gn)' },
  { id: 3, type: 'interview', icon: 'record_voice_over', title: 'Interview Reminder', msg: 'Your mock interview practice score is available.', time: 'Yesterday', page: '/interview', read: true, ibg: 'var(--bbg)', ic: 'var(--bl)' },
  { id: 4, type: 'other', icon: 'mail', title: 'Cover Letter Ready', msg: 'AI has drafted your tailored cover letter for Google.', time: '2 days ago', page: '/cover-letter', read: true, ibg: 'var(--pbg)', ic: 'var(--pu)' }
];

export default function NotificationsPage() {
  const router = useRouter();
  const [notifs, setNotifs] = useState<Notification[]>(INITIAL_NOTIFS);
  const [filter, setFilter] = useState<'all' | 'unread' | 'jobs' | 'resume' | 'interview'>('all');

  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'All caught up!' } }));
  };

  const handleNotifClick = (id: number, page: string) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    router.push(page);
  };

  const filteredNotifs = notifs.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div className="pg-hdr" style={{ marginBottom: 0 }}>
              <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)' }}>Notifications</h1>
              <p style={{ color: 'var(--t3)', fontWeight: 600 }}>{unreadCount} unread notifications</p>
            </div>
            <button className="btn btn-s btn-sm" onClick={markAllRead}>Mark all read</button>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', flexWrap: 'wrap' }}>
            {['all', 'unread', 'jobs', 'resume', 'interview'].map((f) => (
              <button 
                key={f}
                className={`sal-filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f as any)}
                style={{ 
                  padding: '8px 16px', borderRadius: '12px', fontSize: '13px', fontWeight: 800, cursor: 'pointer',
                  background: filter === f ? 'var(--t1)' : 'var(--w)', 
                  color: filter === f ? 'var(--w)' : 'var(--t3)',
                  border: `1px solid ${filter === f ? 'var(--t1)' : 'var(--bd)'}`,
                  textTransform: 'capitalize'
                }}
              >
                {f} {f === 'all' ? `(${notifs.length})` : f === 'unread' ? `(${unreadCount})` : ''}
              </button>
            ))}
          </div>
          
          <div id="notif-page-list">
            {filteredNotifs.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', background: 'var(--w)', borderRadius: '16px', border: '1px dashed var(--bd)' }}>
                <span className="mat" style={{ fontSize: '32px', color: 'var(--t4)', marginBottom: '8px' }}>notifications_off</span>
                <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--t3)' }}>You're all caught up here.</p>
              </div>
            ) : (
              filteredNotifs.map(n => (
                <div 
                  key={n.id}
                  className="card card-hover" 
                  style={{ 
                    display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '10px', 
                    padding: '16px 18px', cursor: 'pointer',
                    borderLeft: !n.read ? '3px solid var(--o3)' : '1px solid var(--bd)' 
                  }}
                  onClick={() => handleNotifClick(n.id, n.page)}
                >
                  <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: n.ibg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="mat" style={{ fontSize: '20px', color: n.ic }}>{n.icon}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--t1)', marginBottom: '3px' }}>{n.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.5, marginBottom: '5px' }}>{n.msg}</div>
                    <button 
                      style={{ fontSize: '12px', fontWeight: 800, color: 'var(--o2)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      onClick={(e) => { e.stopPropagation(); router.push(n.page); }}
                    >
                      View page →
                    </button>
                    <div style={{ fontSize: '11px', color: 'var(--t3)', fontWeight: 600, marginTop: '8px' }}>{n.time}</div>
                  </div>
                  {!n.read && (
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--o3)', flexShrink: 0, marginTop: '4px' }}></div>
                  )}
                </div>
              ))
            )}
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

```

### src\app\onboarding\page.tsx

```
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/AuthContext';

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();
  const [step, setStep] = useState(1);
  const totalSteps = 8;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    else router.push('/dashboard');
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div id="page-onboarding" className="afi">
      <div className="ob-logo">Profile<span>Pro</span> AI</div>
      
      {/* Progress Tracker */}
      <div className="ob-prog">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <React.Fragment key={i}>
            <div className="ob-node">
              <div className={`ob-circle ${step > i + 1 ? 'done' : step === i + 1 ? 'active' : ''}`}>
                {step > i + 1 ? <span className="mat">check</span> : i + 1}
              </div>
              <div className={`ob-node-label ${step === i + 1 ? 'active' : step > i + 1 ? 'done' : ''}`}>
                {['Welcome', 'Status', 'Target', 'Skills', 'Resume', 'LinkedIn', 'Prefs', 'Finish'][i]}
              </div>
            </div>
            {i < totalSteps - 1 && (
              <div className={`ob-line ${step > i + 1 ? 'done' : ''}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="ob-card">
        {/* S1: Welcome */}
        {step === 1 && (
          <div className="ob-sc active">
            <div className="ob-ey">Step 1 of 8 — Welcome</div>
            <div className="ob-title">Welcome to Hirely AI! 👋</div>
            <div className="ob-sub">Confirm your info and we'll personalise everything in under 3 minutes.</div>
            {user && (
              <div className="ob-user-card">
                <div className="ob-uavatar">{user.email ? user.email[0].toUpperCase() : 'U'}</div>
                <div>
                  <div className="ob-uname">{user.user_metadata?.full_name || 'User'}</div>
                  <div className="ob-uemail">{user.email}</div>
                  <div className="ob-ugoogle"><span className="mat" style={{ fontSize: '13px' }}>verified_user</span> Authenticated Profile</div>
                </div>
              </div>
            )}
            <div className="inp-wrap">
              <label className="inp-label">What should we call you?</label>
              <input className="inp" type="text" placeholder="Preferred first name" defaultValue={user?.user_metadata?.full_name?.split(' ')[0] || ''} />
            </div>
            <div className="ob-actions">
              <span></span>
              <button className="btn btn-p" onClick={nextStep}>Let's go <span className="mat">arrow_forward</span></button>
            </div>
          </div>
        )}

        {/* S2: Status */}
        {step === 2 && (
          <div className="ob-sc active">
            <div className="ob-ey">Step 2 of 8 — Your Situation</div>
            <div className="ob-title">Where are you in your career?</div>
            <div className="ob-sub">This personalises job matches and interview questions to your level of experience.</div>
            <div className="ob-chips">
              {['College Student', 'Recent Graduate', 'Early Career (1-3 yrs)', 'Professional (4-8 yrs)', 'Senior Leader (9+ yrs)', 'Career Changer'].map(s => (
                <button key={s} className="ob-chip" onClick={nextStep}>{s}</button>
              ))}
            </div>
            <div className="ob-actions">
              <button className="ob-back" onClick={prevStep}>Back</button>
              <span className="ob-skip" onClick={nextStep}>Skip for now</span>
            </div>
          </div>
        )}

        {/* S3: Target Role */}
        {step === 3 && (
          <div className="ob-sc active">
            <div className="ob-ey">Step 3 of 8 — Goal</div>
            <div className="ob-title">What's your target role?</div>
            <div className="ob-sub">Tell us the specific job title you're aiming for next.</div>
            <div className="inp-wrap">
              <label className="inp-label">Target Job Title</label>
              <input className="inp" type="text" placeholder="e.g. Senior Product Designer, Backend Engineer" />
            </div>
            <div className="ob-actions">
              <button className="ob-back" onClick={prevStep}>Back</button>
              <button className="btn btn-p" onClick={nextStep}>Continue <span className="mat">arrow_forward</span></button>
            </div>
          </div>
        )}

        {/* S4 to S8 are placeholders for now, but following the same theme */}
        {step >= 4 && step <= 7 && (
          <div className="ob-sc active">
            <div className="ob-ey">Step {step} of 8 — Setting Up</div>
            <div className="ob-title">{['Skills', 'Resume Upload', 'LinkedIn Sync', 'Preferences'][step - 4]}</div>
            <div className="ob-sub">We're almost there! Setting up your {['skills profile', 'AI resume scanner', 'LinkedIn connection', 'search preferences'][step - 4]}.</div>
            
            {step === 5 && (
              <div className="ob-dropzone">
                <span className="mat">upload_file</span>
                <h3>Drag & drop your resume</h3>
                <p>PDF or Word (max 5MB)</p>
              </div>
            )}
            
            <div className="ob-actions" style={{ marginTop: '40px' }}>
              <button className="ob-back" onClick={prevStep}>Back</button>
              <button className="btn btn-p" onClick={nextStep}>Next Step <span className="mat">arrow_forward</span></button>
            </div>
          </div>
        )}

        {step === 8 && (
          <div className="ob-sc active" style={{ textAlign: 'center' }}>
            <div className="ob-ey">Step 8 of 8 — Ready!</div>
            <div className="ob-title">Account Prepared! 🚀</div>
            <div className="ob-sub">Your career engine is now calibrated. Redirecting you to your personal dashboard...</div>
            <div className="loading-spinner" style={{ marginTop: '30px' }}></div>
            <button className="btn btn-p btn-lg" style={{ width: '100%', marginTop: '30px' }} onClick={nextStep}>Take me to Dashboard</button>
          </div>
        )}
      </div>
    </div>
  );
}

```

### src\app\pricing\page.tsx

```
'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useSubscription, UserTier } from '@/hooks/useSubscription';

export default function PricingPage() {
  const { tier, upgrade } = useSubscription();

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const handleUpgrade = (targetTier: UserTier) => {
    if (targetTier === tier) return;
    showToast('info', targetTier === 'free' ? 'Downgrading to Free plan.' : `Initiating checkout for ${targetTier} plan...`);
    // Here we wrap their upgrade to simulate going to Razorpay or unlocking
    upgrade(targetTier, targetTier === 'advanced');
  };

  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: '/month',
      desc: 'Perfect for exploring and getting your first ATS score.',
      btn: tier === 'free' ? 'Current Plan' : 'Downgrade to Free',
      tierVal: 'free' as UserTier,
      feats: ['1 resume analysis/day', '1 job match/day', 'Basic ATS scoring', 'Community support'],
      nots: ['Cover Letter Writer', 'Career Path Analysis', 'Salary Intelligence', 'Mock Interview AI', 'Priority support'],
      popular: false
    },
    {
      name: 'Pro',
      price: '₹499',
      period: '/month',
      desc: 'Everything you need to actively job hunt and land interviews.',
      btn: tier === 'pro' ? 'Current Plan' : 'Upgrade to Pro',
      tierVal: 'pro' as UserTier,
      feats: ['Unlimited resume analyses', 'Unlimited job matching', 'Cover Letter Writer', 'Career Path Analysis', 'STAR Interview Coach', 'Email alerts for jobs', 'Priority support'],
      nots: ['In-depth Resume Analysis', 'Location-based Jobs'],
      popular: true
    },
    {
      name: 'Advanced',
      price: '₹899',
      period: '/month',
      desc: 'The complete career acceleration suite. No limits, no compromises.',
      btn: tier === 'advanced' ? 'Current Plan' : 'Go Advanced',
      tierVal: 'advanced' as UserTier,
      feats: ['Everything in Pro', 'In-depth resume analysis', 'Location-based job search', 'Salary Intelligence', 'Mock Interview AI', 'Recruiter Score mode', 'Dedicated career coach'],
      nots: [],
      popular: false
    }
  ];

  const featuresList = [
    ['ATS Analysis', '1/day', 'Unlimited', 'Unlimited'],
    ['Job Match', '1/day', 'Unlimited', 'Unlimited'],
    ['Resume Score', 'Basic', 'Advanced', 'Recruiter Score'],
    ['Cover Letter Writer', false, true, true],
    ['Career Path Analysis', false, true, true],
    ['In-depth Resume Analysis', false, false, true],
    ['Location-based Jobs', false, false, true],
    ['Salary Intelligence', false, false, true],
    ['Mock Interview', false, false, true],
    ['STAR Interview Coach', false, true, true],
    ['Email Generator', false, true, true],
    ['AI Resume Rewriter', false, true, true],
    ['Application Tracker', true, true, true],
    ['Priority Support', false, false, true],
    ['Dedicated Career Coach', false, false, true],
  ];

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div className="pg-hdr">
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)', marginBottom: '4px' }}>Pricing &amp; Plans</h1>
            <p style={{ color: 'var(--t3)', fontWeight: 600 }}>Unlock your full career potential with the right plan.</p>
          </div>

          {/* PLAN CARDS */}
          <div className="pricing-layout">
            {plans.map((p, idx) => (
              <div key={idx} className={`pricing-card ${p.popular ? 'popular' : ''}`}>
                <div className="pricing-name">{p.name}</div>
                <div className="pricing-price">{p.price}<span className="pricing-period">{p.period}</span></div>
                <div className="pricing-desc">{p.desc}</div>
                <button 
                  className={`pricing-btn ${p.popular ? 'primary' : ''}`} 
                  onClick={() => handleUpgrade(p.tierVal)}
                >
                  {p.btn}
                </button>
                <ul className="pricing-feat-list">
                  {p.feats.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                  {p.nots.map((f, i) => (
                    <li key={`not-${i}`} className="no">{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* FEATURE COMPARISON TABLE */}
          <div style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-.02em', textAlign: 'center', margin: '32px 0 16px' }}>Detailed Feature Comparison</div>
          <div style={{ overflowX: 'auto' }}>
            <table className="fc-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Free</th>
                  <th>Pro</th>
                  <th>Advanced</th>
                </tr>
              </thead>
              <tbody>
                {featuresList.map((row, i) => (
                  <tr key={i}>
                    <td>{row[0]}</td>
                    <td>{row[1] === true ? <span className="fc-check">✓</span> : row[1] === false ? <span className="fc-x">✕</span> : <span className="fc-text">{row[1]}</span>}</td>
                    <td>{row[2] === true ? <span className="fc-check">✓</span> : row[2] === false ? <span className="fc-x">✕</span> : <span className="fc-text">{row[2]}</span>}</td>
                    <td>{row[3] === true ? <span className="fc-check">✓</span> : row[3] === false ? <span className="fc-x">✕</span> : <span className="fc-text">{row[3]}</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--t3)' }}>
            All plans include a 7-day free trial. Cancel anytime. Secure payments via Razorpay.
          </div>

          <style jsx>{`
            .pricing-layout {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 24px;
              margin-bottom: 32px;
            }
            .pricing-card {
              background: var(--w);
              border: 1.5px solid var(--bd);
              border-radius: 20px;
              padding: 32px;
              box-shadow: var(--sh1);
              transition: transform 150ms, box-shadow 150ms;
              position: relative;
            }
            .pricing-card.popular {
              border-color: var(--o4);
              box-shadow: 0 12px 32px rgba(163, 61, 0, 0.12);
              border-width: 2px;
            }
            .pricing-name {
              font-size: 14px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: .08em;
              color: var(--t4);
              margin-bottom: 12px;
            }
            .pricing-card.popular .pricing-name {
              color: var(--o3);
            }
            .pricing-price {
              font-size: 44px;
              font-weight: 900;
              color: var(--t1);
              letter-spacing: -.03em;
              margin-bottom: 16px;
              display: flex;
              align-items: baseline;
            }
            .pricing-period {
              font-size: 16px;
              font-weight: 700;
              color: var(--t3);
              letter-spacing: normal;
            }
            .pricing-desc {
              font-size: 14px;
              color: var(--t2);
              line-height: 1.6;
              margin-bottom: 24px;
            }
            .pricing-btn {
              width: 100%;
              padding: 14px;
              border-radius: 12px;
              font-size: 16px;
              font-weight: 900;
              border: 1px solid var(--bd);
              background: var(--s1);
              color: var(--t1);
              cursor: pointer;
              transition: all 150ms;
              margin-bottom: 32px;
            }
            .pricing-btn.primary {
              background: var(--t1);
              color: var(--w);
              border-color: var(--t1);
            }
            .pricing-feat-list {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            .pricing-feat-list li {
              position: relative;
              padding-left: 28px;
              font-size: 14px;
              color: var(--t1);
              font-weight: 600;
              margin-bottom: 16px;
            }
            .pricing-feat-list li::before {
              content: 'check_circle';
              font-family: 'Material Symbols Outlined';
              position: absolute;
              left: 0;
              top: -2px;
              font-size: 20px;
              color: var(--gn);
            }
            .pricing-feat-list li.no {
              color: var(--t4);
              text-decoration: line-through;
            }
            .pricing-feat-list li.no::before {
              content: 'remove_circle_outline';
              color: var(--t4);
            }
            .fc-table {
              width: 100%;
              border-collapse: collapse;
              background: var(--w);
              border-radius: 16px;
              overflow: hidden;
              box-shadow: var(--sh1);
              border: 1px solid var(--bd);
            }
            .fc-table th, .fc-table td {
              padding: 16px 20px;
              text-align: center;
              border-bottom: 1px solid var(--bd);
            }
            .fc-table th:first-child, .fc-table td:first-child {
              text-align: left;
              font-weight: 800;
            }
            .fc-table th {
              background: var(--s1);
              font-size: 12px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: .08em;
              color: var(--t3);
            }
            .fc-table td {
              font-size: 14px;
              color: var(--t1);
            }
            .fc-check {
              color: var(--gn);
              font-weight: 900;
              font-size: 18px;
            }
            .fc-x {
              color: var(--t4);
              font-weight: 700;
              font-size: 16px;
            }
            .fc-text {
              font-weight: 700;
            }
          `}</style>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

```

### src\app\profile\page.tsx

```
'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useUser } from '@/context/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';

export default function ProfilePage() {
  const { user } = useUser();
  const { tier } = useSubscription();

  const [profile, setProfile] = useState({
    name: user?.user_metadata?.full_name || 'Charan Kumar',
    title: 'Senior Product Designer',
    exp: '8 Years Experience',
    loc: 'Bangalore, India',
    target: 'Principal Product Architect',
    targetSalary: '₹45.0L',
    cos: 'Google, Stripe, Atlassian',
    bio: 'Strategic designer focused on building scalable design systems and high-conversion user interfaces for fintech and SaaS platforms. 8+ years shipping products at scale.'
  });

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const goals = [
    { done: true, title: 'Resume Mastered', detail: 'v4 scored 92% Match Score for Stripe Role.' },
    { done: true, title: 'Interview Ready', detail: 'Mock Technical session completed with 82/100.' },
    { done: false, title: 'Apply to 3 Target Companies', detail: '0 of 3 applications submitted.' },
    { done: false, title: 'Complete Salary Research', detail: 'View salary benchmarks for your target role.' },
    { done: false, title: 'Land an Offer', detail: 'The final goal — you\'ve got this!' },
  ];

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div className="pg-hdr" style={{ marginBottom: 0 }}>
              <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)' }}>Career Profile</h1>
              <p style={{ color: 'var(--t3)', fontWeight: 600 }}>Manage your identity and career target metrics.</p>
            </div>
            <button className="btn btn-s btn-sm" onClick={() => showToast('info', 'Editing profile...')}>
              <span className="mat" style={{ fontSize: '14px', marginRight: '6px' }}>edit</span> Edit Profile
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', marginTop: '32px' }}>
            {/* MAIN PORTION */}
            <div>
              <div className="card afu" style={{ marginBottom: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--s2), var(--s3))', border: '3px solid var(--w)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 800, color: 'var(--t2)', flexShrink: 0, boxShadow: 'var(--sh3)' }}>
                    {profile.name[0].toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-.02em', marginBottom: '3px' }}>{profile.name}</div>
                    <div style={{ fontSize: '14px', color: 'var(--t2)', fontWeight: 600, marginBottom: '12px' }}>{profile.title}</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span className="badge" style={{ background: 'var(--gbg)', color: 'var(--gn)' }}><span className="mat" style={{ fontSize: '13px', marginRight: '4px' }}>work_history</span> {profile.exp}</span>
                      <span className="badge" style={{ background: 'var(--pbg)', color: 'var(--pu)' }}><span className="mat" style={{ fontSize: '13px', marginRight: '4px' }}>location_on</span> {profile.loc}</span>
                      {tier === 'pro' && <span className="badge" style={{ background: 'var(--o6)', color: 'var(--o2)' }}>Pro Plan ✦</span>}
                      {tier === 'advanced' && <span className="badge" style={{ background: 'var(--bbg)', color: 'var(--bl)' }}>Advanced Plan</span>}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '20px', borderTop: '1px solid var(--bd)', paddingTop: '16px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--t3)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span className="mat" style={{ fontSize: '14px' }}>person</span> PROFESSIONAL BIO
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--t2)', lineHeight: 1.7 }}>{profile.bio}</div>
                </div>
              </div>

              {/* Goal Progress */}
              <div className="card afu" style={{ padding: '24px', animationDelay: '100ms' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800 }}>Goal Progress</div>
                  <span className="badge" style={{ background: 'var(--gbg)', color: 'var(--gn)' }}>{goals.filter(g => g.done).length} of {goals.length} complete</span>
                </div>
                {goals.map((g, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', borderBottom: i !== goals.length - 1 ? '1px solid var(--bd)' : 'none' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: g.done ? 'var(--gn)' : 'var(--s2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      {g.done && <span className="mat" style={{ fontSize: '11px', color: '#fff' }}>check</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--t1)', opacity: g.done ? 1 : 0.8, marginBottom: '2px' }}>{g.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--t3)' }}>{g.detail}</div>
                    </div>
                    {!g.done && (
                      <button className="btn btn-g btn-sm" style={{ fontSize: '11px', padding: '6px 10px', flexShrink: 0 }} onClick={() => showToast('info', `Starting: ${g.title}`)}>
                        Start →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="afu" style={{ animationDelay: '150ms' }}>
              <div className="card" style={{ marginBottom: '16px', padding: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--o2)', marginBottom: '4px' }}>CAREER TARGET</div>
                
                <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--t3)', marginBottom: '5px', marginTop: '16px' }}>TARGET TITLE</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--t1)' }}>{profile.target}</div>
                
                <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--t3)', marginBottom: '5px', marginTop: '16px' }}>TARGET SALARY (CTC)</div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--gn)' }}>
                  {profile.targetSalary} <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--t3)' }}>Per Annum</span>
                </div>
                
                <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--t3)', marginBottom: '8px', marginTop: '16px' }}>TARGET COMPANIES</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {profile.cos.split(',').map(co => (
                    <span key={co} className="badge" style={{ background: 'var(--s2)', color: 'var(--t2)', fontWeight: 700 }}>{co.trim()}</span>
                  ))}
                </div>
                
                <button className="btn btn-g btn-sm" style={{ width: '100%', marginTop: '20px', borderRadius: '10px' }} onClick={() => showToast('info', 'Editing career targets...')}>
                  <span className="mat" style={{ fontSize: '14px', marginRight: '6px' }}>edit</span> Update Targets
                </button>
              </div>

              {/* AI Personalization */}
              <div style={{ background: 'var(--o7)', border: '1px solid var(--o5)', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span className="mat" style={{ fontSize: '16px', color: 'var(--o3)' }}>auto_awesome</span>
                  <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--o2)' }}>AI PERSONALIZATION</div>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.6 }}>
                  "We're using your <strong style={{color:'var(--t1)'}}>{profile.exp}</strong> of experience and target as a <strong style={{color:'var(--t1)'}}>{profile.target}</strong> to customize your AI-generated cover letters and interview questions."
                </div>
              </div>

              {/* Linked Accounts */}
              <div className="card" style={{ padding: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, marginBottom: '16px' }}>Linked Accounts</div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--gbg)', borderRadius: '12px', marginBottom: '10px', cursor: 'pointer' }} onClick={() => showToast('success', 'LinkedIn already linked ✓')}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#0077b5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="mat" style={{ fontSize: '16px', color: '#fff' }}>link</span>
                  </div>
                  <div style={{ flex: 1, fontSize: '14px', fontWeight: 700, color: 'var(--gn)' }}>LinkedIn Linked</div>
                  <span className="mat" style={{ fontSize: '20px', color: 'var(--gn)' }}>check_circle</span>
                </div>
                
                <div 
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px dashed var(--bd)', borderRadius: '12px', cursor: 'pointer', transition: 'all 150ms' }} 
                  onClick={() => showToast('info', 'Connect GitHub account...')}
                  onMouseOver={e => e.currentTarget.style.borderColor = 'var(--o4)'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'var(--bd)'}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--s2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="mat" style={{ fontSize: '16px', color: 'var(--t3)' }}>code</span>
                  </div>
                  <div style={{ flex: 1, fontSize: '14px', fontWeight: 700, color: 'var(--t3)' }}>Connect GitHub</div>
                  <span className="mat" style={{ fontSize: '20px', color: 'var(--t4)' }}>add_circle_outline</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

```

### src\app\referrals\page.tsx

```
'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useUser } from '@/context/AuthContext';

export default function ReferralsPage() {
  const { user } = useUser();
  const userName = user?.user_metadata?.full_name || 'Charan';
  const referralLink = `profilepro.ai/r/${userName.split(' ')[0].toLowerCase()}`;

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const copyLink = () => {
    navigator.clipboard?.writeText(referralLink).catch(() => {});
    showToast('success', 'Referral link copied to clipboard!');
  };

  const stats = [
    { val: 3, lbl: 'Total Referrals' },
    { val: 9, lbl: 'Free Analyses Earned' },
    { val: 2, lbl: 'Active Trials' },
    { val: '₹1,497', lbl: 'Value Generated' }
  ];

  const milestones = [
    { n: 1, reward: '3 free analyses', done: true },
    { n: 5, reward: '1 month Pro free', done: false },
    { n: 10, reward: 'Lifetime 20% discount', done: false }
  ];

  const referrals = [
    { name: 'Priya Sharma', email: 'priya@gmail.com', date: 'Jan 18, 2026', status: 'Signed up', sc: 'var(--gn)', sg: 'var(--gbg)' },
    { name: 'Rahul Verma', email: 'rahul@gmail.com', date: 'Jan 22, 2026', status: 'Signed up', sc: 'var(--gn)', sg: 'var(--gbg)' },
    { name: 'Anita Reddy', email: 'anita@gmail.com', date: 'Jan 25, 2026', status: 'Trial active', sc: 'var(--o2)', sg: 'var(--o6)' },
  ];

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div className="pg-hdr">
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)' }}>Refer & Earn</h1>
            <p style={{ color: 'var(--t3)', fontWeight: 600 }}>Share ProfilePro AI with friends. Every signup earns you 3 extra free analyses.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
            <div>
              {/* Referral link banner */}
              <div style={{ 
                background: 'linear-gradient(135deg, var(--o1), var(--o2), var(--o3))', 
                borderRadius: '24px', padding: '32px', color: '#fff', marginBottom: '20px', 
                position: 'relative', overflow: 'hidden' 
              }}>
                <div style={{ 
                  position: 'absolute', inset: 0, opacity: 0.06, 
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)', 
                  backgroundSize: '24px 24px' 
                }}></div>
                <div style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,0.6)', marginBottom: '10px', position: 'relative', zIndex: 1 }}>
                  YOUR REFERRAL LINK
                </div>
                <div style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px', position: 'relative', zIndex: 1 }}>
                  Invite friends, earn free analyses
                </div>
                <div style={{ fontSize: '15px', opacity: 0.9, lineHeight: 1.6, marginBottom: '24px', position: 'relative', zIndex: 1, fontWeight: 500 }}>
                  For every friend who signs up using your link, you get <strong style={{ color: '#fff' }}>3 extra free analyses</strong>. They get a <strong style={{ color: '#fff' }}>2-week Pro trial free</strong>.
                </div>
                
                <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '14px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 1 }}>
                  <div style={{ flex: 1, fontSize: '15px', fontWeight: 800, color: 'rgba(255,255,255,0.95)' }}>
                    {referralLink}
                  </div>
                  <button 
                    style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '10px', padding: '8px 16px', fontSize: '13px', fontWeight: 800, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'background 150ms' }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.35)'}
                    onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    onClick={copyLink}
                  >
                    <span className="mat" style={{ fontSize: '16px' }}>content_copy</span> Copy
                  </button>
                </div>
              </div>

              {/* Share buttons */}
              <div className="card afu" style={{ marginBottom: '20px', padding: '24px', animationDelay: '100ms' }}>
                <div style={{ fontSize: '15px', fontWeight: 800, marginBottom: '16px' }}>Share via</div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button className="btn" style={{ background: 'var(--bl)', color: '#fff', borderRadius: '12px', padding: '12px 24px', fontWeight: 800 }} onClick={() => showToast('success', 'Opening LinkedIn...')}>
                    <span className="mat" style={{ fontSize: '18px', marginRight: '6px' }}>share</span> LinkedIn
                  </button>
                  <button className="btn" style={{ background: '#25D366', color: '#fff', borderRadius: '12px', padding: '12px 24px', fontWeight: 800 }} onClick={() => showToast('success', 'Opening WhatsApp...')}>
                    <span className="mat" style={{ fontSize: '18px', marginRight: '6px' }}>chat</span> WhatsApp
                  </button>
                  <button className="btn" style={{ background: '#000', color: '#fff', borderRadius: '12px', padding: '12px 24px', fontWeight: 800 }} onClick={() => showToast('success', 'Opening X...')}>
                    𝕏 Twitter / X
                  </button>
                  <button className="btn btn-g" style={{ borderRadius: '12px', padding: '12px 24px', fontWeight: 800 }} onClick={() => showToast('success', 'Opening email...')}>
                    <span className="mat" style={{ fontSize: '18px', marginRight: '6px' }}>mail</span> Email
                  </button>
                </div>
              </div>

              {/* Referred users list */}
              <div className="card afu" style={{ padding: '24px', animationDelay: '200ms' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 800 }}>Referred Friends (3)</div>
                  <span className="badge" style={{ background: 'var(--gbg)', color: 'var(--gn)', fontWeight: 800 }}>+9 analyses earned</span>
                </div>
                
                {referrals.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 0', borderBottom: i !== referrals.length - 1 ? '1px solid var(--bd)' : 'none' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--o2), var(--o3))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '15px', fontWeight: 800, flexShrink: 0 }}>
                      {r.name[0]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--t1)' }}>{r.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--t3)', fontWeight: 600 }}>{r.email} · Joined {r.date}</div>
                    </div>
                    <span className="badge" style={{ background: r.sg, color: r.sc, fontWeight: 800 }}>{r.status}</span>
                    <span style={{ fontSize: '15px', fontWeight: 900, color: 'var(--gn)', marginLeft: '8px' }}>+3</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats sidebar */}
            <div className="afu" style={{ animationDelay: '150ms' }}>
              <div className="card" style={{ marginBottom: '20px', padding: '24px' }}>
                <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '16px' }}>Your Referral Stats</div>
                {stats.map((s, i) => (
                  <div key={i} style={{ padding: '14px 0', borderBottom: i !== stats.length - 1 ? '1px solid var(--bd)' : 'none' }}>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--o2)', letterSpacing: '-.02em' }}>{s.val}</div>
                    <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--t4)', marginTop: '2px' }}>{s.lbl}</div>
                  </div>
                ))}
              </div>

              {/* Milestones */}
              <div style={{ background: 'var(--o6)', border: '1.5px solid var(--o5)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--o2)', marginBottom: '10px' }}>🏆 Referral Milestones</div>
                {milestones.map((m, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px', fontSize: '13px', fontWeight: 600 }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: m.done ? 'var(--gn)' : 'var(--w)', border: m.done ? 'none' : '1.5px solid var(--bd)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {m.done && <span className="mat" style={{ fontSize: '14px', color: '#fff', fontWeight: 900 }}>check</span>}
                    </div>
                    <span style={{ color: 'var(--t1)' }}>
                      <strong style={{ color: 'var(--o3)' }}>{m.n} referral{m.n > 1 ? 's' : ''}</strong> → {m.reward}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

```

### src\app\rewriter\page.tsx

```
'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useSubscription } from '@/hooks/useSubscription';

export default function AIRewriterPage() {
  const { tier } = useSubscription();
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const handleRewrite = () => {
    if (tier === 'free') {
      showToast('error', 'AI Rewriter requires a Pro or Advanced plan. Please upgrade to use this feature.');
      return;
    }
    if (!input.trim()) {
      showToast('error', 'Please enter a bullet point to rewrite.');
      return;
    }
    
    setLoading(true);
    setResult(null);
    
    // Simulate AI loading
    setTimeout(() => {
      setLoading(false);
      setResult(`Spearheaded the integration of Next.js and React components across 11 high-fidelity applications, reducing development turnaround time by 40% and ensuring 100% adherence to the Kinetic Design system.` );
      showToast('success', 'Bullet point rewritten!');
    }, 1500);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard?.writeText(result).catch(() => {});
      showToast('success', 'Copied to clipboard!');
    }
  };

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div className="pg-hdr" style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)' }}>AI Bullet Rewriter</h1>
              <span style={{ fontSize: '11px', fontWeight: 900, padding: '4px 10px', borderRadius: '6px', background: 'var(--t1)', color: '#fff' }}>PRO</span>
            </div>
            <p style={{ color: 'var(--t3)', fontWeight: 600 }}>Transform weak bullet points into high-impact, ATS-optimized achievements.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '24px' }}>
            {/* Main Area */}
            <div>
              <div className="card afu" style={{ padding: '32px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--t1)' }}>Original Bullet Point</label>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--t4)' }}>Max 300 chars</span>
                </div>
                <textarea 
                  className="inp-ans-area" 
                  style={{ width: '100%', height: '140px', padding: '16px', borderRadius: '16px', background: 'var(--s1)', border: '1.5px solid var(--bd)', fontSize: '15px', color: 'var(--t1)', lineHeight: 1.6, resize: 'none' }}
                  placeholder="e.g., I managed a team of developers to build a new feature for our web app."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button className="btn btn-p" onClick={handleRewrite} disabled={loading} style={{ padding: '14px 32px', fontSize: '15px' }}>
                    {loading ? (
                      <><span className="mat spin" style={{ marginRight: '8px' }}>autorenew</span> Rewriting...</>
                    ) : (
                      <><span className="mat" style={{ marginRight: '8px' }}>auto_awesome</span> Rewrite this Bullet</>
                    )}
                  </button>
                </div>
              </div>

              {result && (
                <div className="card afu" style={{ padding: '32px', border: '2px solid var(--o3)', background: 'var(--o7)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="mat" style={{ color: 'var(--o2)', fontSize: '20px' }}>check_circle</span>
                      <label style={{ fontSize: '14px', fontWeight: 900, color: 'var(--o2)', textTransform: 'uppercase', letterSpacing: '.05em' }}>ATS-Optimized Result</label>
                    </div>
                    <button className="btn btn-s btn-sm" onClick={copyResult} style={{ background: '#fff' }}>
                      <span className="mat" style={{ fontSize: '16px', marginRight: '6px' }}>content_copy</span> Copy
                    </button>
                  </div>
                  <div style={{ fontSize: '18px', lineHeight: 1.7, fontWeight: 700, color: 'var(--t1)', padding: '16px', background: '#fff', borderRadius: '16px', border: '1px solid var(--o5)', boxShadow: 'var(--sh1)' }}>
                    {result}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Guidelines */}
            <div className="afu" style={{ animationDelay: '100ms' }}>
              <div className="card" style={{ padding: '24px', background: 'var(--t1)', color: '#fff' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="mat" style={{ color: 'var(--o2)' }}>tips_and_updates</span>
                  Formula for Success
                </h3>
                
                <div style={{ marginBottom: '20px' }}>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--o2)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '6px' }}>Action Verb</strong>
                  <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: 1.5 }}>Start with a strong verb that highlights leadership or initiative (e.g., Spearheaded, Orchestrated, Engineered).</p>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--o2)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '6px' }}>Metrics & Impact</strong>
                  <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: 1.5 }}>Include quantifiable results (%, ₹, time, volume) to prove your impact.</p>
                </div>

                <div>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--o2)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '6px' }}>Context / Method</strong>
                  <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: 1.5 }}>Briefly mention the tools, scale, or situation (e.g., using React, across 11 modules).</p>
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
            .spin { animation: slowspin 1.5s linear infinite; }
            @keyframes slowspin { 100% { transform: rotate(360deg); } }
          `}</style>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

```

### src\app\salary\page.tsx

```
'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useSubscription } from '@/hooks/useSubscription';

export default function SalaryIntel() {
  const [city, setCity] = useState('all');
  const [level, setLevel] = useState('all');
  const { tier } = useSubscription();

  const salaryData = [
    { role: 'Frontend Engineer', city: 'Bangalore', level: 'Mid Level', range: '₹14L – ₹28L', median: '₹19L', trend: '↑ 12%', fill: 72, demand: 'HIGH DEMAND', icon: 'local_fire_department', skills: ['React', 'TypeScript', 'Next.js'] },
    { role: 'Backend Engineer', city: 'Bangalore', level: 'Senior', range: '₹22L – ₹48L', median: '₹32L', trend: '↑ 18%', fill: 85, demand: 'HIGH DEMAND', icon: 'local_fire_department', skills: ['Node.js', 'Go', 'PostgreSQL'] },
    { role: 'Product Manager', city: 'Mumbai', level: 'Mid Level', range: '₹18L – ₹38L', median: '₹26L', trend: '↑ 22%', fill: 78, demand: 'TRENDING', icon: 'trending_up', skills: ['Roadmapping', 'SQL', 'Figma'] },
    { role: 'Data Engineer', city: 'Hyderabad', level: 'Mid-Senior', range: '₹16L – ₹40L', median: '₹24L', trend: '↑ 25%', fill: 80, demand: 'HIGH DEMAND', icon: 'local_fire_department', skills: ['Spark', 'Airflow', 'dbt'] },
    { role: 'UI/UX Designer', city: 'Pune', level: 'Junior-Mid', range: '₹8L – ₹22L', median: '₹14L', trend: '→ 5%', fill: 55, demand: 'STABLE', icon: 'equalizer', skills: ['Figma', 'Prototyping', 'Research'] },
  ];

  const handleRoleClick = () => {
    if (tier !== 'advanced') {
      window.dispatchEvent(new CustomEvent('open-upgrade'));
    }
  };

  return (
    <div id="page-salary" className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main">
          <div className="dash-header">
            <div>
              <h1>Salary Intelligence 💰</h1>
              <p style={{ color: 'var(--t2)', fontWeight: 600, marginTop: '4px' }}>
                Real-time ₹ salary data for Indian tech roles · Updated daily
              </p>
            </div>
          </div>
          
          <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--t3)', marginBottom: '12px', marginTop: '12px' }}>FILTER BY CITY</div>
          <div className="salary-controls">
            {cities.map(c => (
              <button 
                key={c.id} 
                className={`salary-chip ${city === c.id ? 'active' : ''}`} 
                onClick={() => setCity(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--t3)', marginBottom: '12px', marginTop: '32px' }}>FILTER BY ROLE LEVEL</div>
          <div className="salary-controls">
            {levels.map(l => (
              <button 
                key={l.id} 
                className={`salary-chip ${level === l.id ? 'active' : ''}`} 
                onClick={() => setLevel(l.id)}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="salary-grid" style={{ marginTop: '40px' }}>
            {salaryData.map((s, i) => (
              <div key={i} className="sal-card afu" style={{ animationDelay: `${i * 100}ms` }} onClick={handleRoleClick}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="sal-role">{s.role}</div>
                  <span className={`demand-tag ${s.demand === 'TRENDING' ? 'demand-viral' : s.demand === 'STABLE' ? 'demand-med' : 'demand-high'}`}>
                    <span className="mat" style={{ fontSize: '14px' }}>{s.icon}</span> {s.demand}
                  </span>
                </div>
                <div className="sal-city">{s.city} · {s.level}</div>
                <div className="sal-range">{s.range}</div>
                <div className="sal-bar-bg"><div className="sal-bar-fill" style={{ width: `${s.fill}%` }}></div></div>
                <div className="sal-meta">
                  <span>Median: <b>{s.median}</b></span>
                  <span className={`salary-trend ${s.trend.includes('↑') ? 'up' : 'stable'}`}>{s.trend} YoY</span>
                </div>
                <div className="salary-skills" style={{ borderTop: '1.5px solid var(--bd2)' }}>
                  {s.skills.map(sk => (
                    <span key={sk} className="salary-skill">Skills: {s.skills.join(', ')}</span>
                  )).slice(0, 1)}
                </div>
              </div>
            ))}
          </div>
            
          {/* NEGOTIATION SCRIPT GENERATOR */}
          <div className="ip-card afu" style={{ marginTop: '48px', padding: '40px', background: 'white', border: '1.5px solid var(--border)', position: 'relative' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--o1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <span className="mat" style={{ fontSize: '28px' }}>handshake</span>
                </div>
                <div>
                   <h2 style={{ fontSize: '20px', fontWeight: 900 }}>Negotiation Script Generator</h2>
                   <p style={{ fontSize: '13px', color: 'var(--t3)', fontWeight: 600 }}>Convert intel into action with AI-powered persuasion templates.</p>
                </div>
             </div>

             <div className="dash-grid-2">
                <div>
                   <div className="ab-inp-w" style={{ marginBottom: '20px' }}>
                      <label className="ab-inp-l">Target Salary (₹ Annual)</label>
                      <input className="ab-input" placeholder="e.g. ₹35,00,000" />
                   </div>
                   <div className="ab-inp-w" style={{ marginBottom: '20px' }}>
                      <label className="ab-inp-l">Primary Achievement</label>
                      <textarea className="ab-area" placeholder="e.g. Led a team of 5 to increase revenue by 20%..." style={{ minHeight: '100px' }} />
                   </div>
                   <button className="btn btn-p" style={{ width: '100%', padding: '14px' }} onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'Negotiation Script Generated!' } }))}>
                      Generate Persuasive Script
                   </button>
                </div>
                <div style={{ background: 'var(--o7)', borderRadius: '20px', border: '1.5px dashed var(--o5)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--o2)', textTransform: 'uppercase' }}>SCRIPT PREVIEW</span>
                      <span className="mat" style={{ fontSize: '18px', color: 'var(--o4)', cursor: 'pointer' }}>content_copy</span>
                   </div>
                   <div style={{ flex: 1, fontSize: '13px', color: 'var(--t2)', fontStyle: 'italic', lineHeight: 1.6 }}>
                      "Hi [Hiring Manager], thank you for the offer. Based on my research on current market trends for [Role] in [City] and my recent success in [Achievement], I was expecting a compensation package closer to..."
                   </div>
                   <div style={{ marginTop: '16px', background: 'var(--w)', padding: '12px', borderRadius: '12px', border: '1px solid var(--o5)', display: 'flex', gap: '8px' }}>
                      <span className="mat" style={{ color: 'var(--o3)', fontSize: '16px' }}>verified</span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--t2)' }}>84% Success Rate with this template</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="salary-disclaimer afu" style={{ animationDelay: '800ms', padding: '18px 24px', borderRadius: '16px', border: '1.5px solid var(--bd2)', background: 'var(--o7)', color: 'var(--t2)', marginTop: '24px' }}>

            <span className="mat" style={{ color: 'var(--o3)' }}>info</span>
            <span style={{ fontWeight: 600 }}>Salary data sourced from Glassdoor India, Levels.fyi, LinkedIn Salary, and 1,200+ Hirely user reports. Figures are gross CTC before taxes.</span>
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

const cities = [
  { id: 'all', label: 'All Cities' },
  { id: 'bangalore', label: 'Bangalore' },
  { id: 'mumbai', label: 'Mumbai' },
  { id: 'delhi', label: 'Delhi NCR' },
  { id: 'hyderabad', label: 'Hyderabad' },
  { id: 'pune', label: 'Pune' },
  { id: 'remote', label: 'Remote' },
];

const levels = [
  { id: 'all', label: 'All Levels' },
  { id: 'fresher', label: 'Fresher (0-1 yr)' },
  { id: 'junior', label: 'Junior (1-3 yrs)' },
  { id: 'mid', label: 'Mid (3-6 yrs)' },
  { id: 'senior', label: 'Senior (6+ yrs)' },
];


```

### src\app\settings\page.tsx

```
'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useUser } from '@/context/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';

export default function SettingsPage() {
  const { user } = useUser();
  const { tier } = useSubscription();

  const [activeTab, setActiveTab] = useState('profile');

  // Toggle states
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    notifJobs: true,
    notifAts: true,
    notifInterviews: true,
    notifWeekly: false,
    notifSalary: true,
    notifDeadlines: false,
    appCompact: false,
    appAnimations: true,
    privPublic: false,
    privData: true,
    privEmployers: false,
    privSalary: true,
  });

  const toggle = (key: string) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const navItems = [
    { icon: 'person', label: 'Profile & Account', id: 'profile' },
    { icon: 'notifications', label: 'Notifications', id: 'notif' },
    { icon: 'security', label: 'Security', id: 'security' },
    { icon: 'credit_card', label: 'Billing', id: 'billing' },
    { icon: 'palette', label: 'Appearance', id: 'appear' },
    { icon: 'privacy_tip', label: 'Privacy', id: 'privacy' },
  ];

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div className="pg-hdr" style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)', marginBottom: '4px' }}>Settings</h1>
            <p style={{ color: 'var(--t3)', fontWeight: 600 }}>Manage your account, notifications, and preferences.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '32px' }}>
            <div className="settings-nav">
              {navItems.map((s) => (
                <div 
                  key={s.id}
                  className={`sn-it ${activeTab === s.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(s.id)}
                >
                  <span className="mat" style={{ fontSize: '18px', marginRight: '8px' }}>{s.icon}</span> 
                  {s.label}
                </div>
              ))}
            </div>

            <div className="settings-content" style={{ background: 'var(--w)', border: '1px solid var(--bd)', borderRadius: '20px', padding: '32px', boxShadow: 'var(--sh1)' }}>
              
              {/* Profile Section */}
              {activeTab === 'profile' && (
                <div className="settings-section">
                  <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '24px' }}>Profile Information</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="inp-w">
                      <label className="inp-lbl">First Name</label>
                      <input className="inp" type="text" defaultValue={(user?.user_metadata?.full_name || 'Charan').split(' ')[0]} />
                    </div>
                    <div className="inp-w">
                      <label className="inp-lbl">Last Name</label>
                      <input className="inp" type="text" defaultValue={(user?.user_metadata?.full_name || 'Kumar').split(' ').slice(1).join(' ') || 'Kumar'} />
                    </div>
                  </div>
                  <div className="inp-w">
                    <label className="inp-lbl">Email Address</label>
                    <input className="inp" type="email" defaultValue={user?.email || 'charan@gmail.com'} />
                  </div>
                  <div className="inp-w">
                    <label className="inp-lbl">Phone Number</label>
                    <input className="inp" type="tel" placeholder="+91 9876543210" />
                  </div>
                  <div className="inp-w">
                    <label className="inp-lbl">Location</label>
                    <input className="inp" type="text" defaultValue="Bangalore, India" />
                  </div>
                  <div className="inp-w">
                    <label className="inp-lbl">Professional Bio</label>
                    <textarea className="inp" style={{ minHeight: '80px' }} defaultValue="Strategic designer focused on building scalable design systems and high-conversion user interfaces."></textarea>
                  </div>
                  <button className="btn btn-p btn-sm" onClick={() => showToast('success', 'Profile saved successfully!')} style={{ marginTop: '16px' }}>
                    <span className="mat" style={{ fontSize: '16px', marginRight: '6px' }}>save</span> Save Changes
                  </button>
                </div>
              )}

              {/* Notification Section */}
              {activeTab === 'notif' && (
                <div className="settings-section">
                  <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '24px' }}>Notification Preferences</h3>
                  
                  {[
                    { key: 'notifJobs', title: 'New Job Matches', desc: 'Get notified when new jobs match your profile' },
                    { key: 'notifAts', title: 'ATS Analysis Complete', desc: 'Alert when your resume scan finishes' },
                    { key: 'notifInterviews', title: 'Interview Reminders', desc: 'Remind 1 hour before scheduled mock sessions' },
                    { key: 'notifWeekly', title: 'Weekly Career Digest', desc: 'Weekly summary of your progress and opportunities' },
                    { key: 'notifSalary', title: 'Salary Alerts', desc: 'Notify when salaries change for your target role' },
                    { key: 'notifDeadlines', title: 'Application Deadlines', desc: 'Remind 3 days before saved jobs close' }
                  ].map(n => (
                    <div key={n.key} className="toggle-row">
                      <div className="toggle-lbl">
                        <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--t1)', marginBottom: '4px' }}>{n.title}</h4>
                        <p style={{ fontSize: '12px', color: 'var(--t3)', fontWeight: 600 }}>{n.desc}</p>
                      </div>
                      <div className={`toggle-sw ${toggles[n.key] ? 'on' : ''}`} onClick={() => toggle(n.key)}>
                        <div className="toggle-thumb"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Security Section */}
              {activeTab === 'security' && (
                <div className="settings-section">
                  <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '24px' }}>Security Settings</h3>
                  <div className="inp-w"><label className="inp-lbl">Current Password</label><input className="inp" type="password" placeholder="Enter current password"/></div>
                  <div className="inp-w"><label className="inp-lbl">New Password</label><input className="inp" type="password" placeholder="Enter new password"/></div>
                  <div className="inp-w"><label className="inp-lbl">Confirm New Password</label><input className="inp" type="password" placeholder="Confirm new password"/></div>
                  <button className="btn btn-p btn-sm" onClick={() => showToast('success', 'Password updated successfully!')} style={{ marginTop: '8px' }}>Update Password</button>
                  
                  <div style={{ marginTop: '32px', padding: '20px', background: 'var(--gl)', border: '1px solid var(--gbg)', borderRadius: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--gn)', marginBottom: '8px' }}>Two-Factor Authentication</div>
                    <div style={{ fontSize: '13px', color: 'var(--t2)', marginBottom: '16px', fontWeight: 600 }}>Add an extra layer of security to your account.</div>
                    <button className="btn btn-s btn-sm" style={{ background: '#fff' }} onClick={() => showToast('info', '2FA setup via authenticator app...')}>Enable 2FA</button>
                  </div>
                  
                  <div style={{ marginTop: '20px', padding: '20px', background: 'var(--rl)', border: '1px solid var(--rbg)', borderRadius: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--rd)', marginBottom: '8px' }}>Danger Zone</div>
                    <div style={{ fontSize: '13px', color: 'var(--t2)', marginBottom: '16px', fontWeight: 600 }}>Once you delete your account, all your data will be permanently removed.</div>
                    <button className="btn btn-sm" style={{ background: 'var(--rd)', color: '#fff', border: 'none' }} onClick={() => showToast('error', 'Please contact support to delete your account.')}>Delete Account</button>
                  </div>
                </div>
              )}

              {/* Billing Section */}
              {activeTab === 'billing' && (
                <div className="settings-section">
                  <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '24px' }}>Billing &amp; Subscription</h3>
                  
                  <div style={{ background: 'var(--o6)', border: '1.5px solid var(--o5)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--o3)', marginBottom: '6px' }}>CURRENT PLAN</div>
                        <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--t1)' }}>{tier === 'pro' ? 'Pro ✦' : tier === 'advanced' ? 'Advanced' : 'Free'}</div>
                      </div>
                      <button className="btn btn-p btn-sm" onClick={() => showToast('info', 'Opening upgrade modal...')}>Upgrade Now</button>
                    </div>
                  </div>
                  
                  <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--t1)', marginBottom: '12px' }}>Payment Method</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid var(--bd)', borderRadius: '14px', marginBottom: '16px' }}>
                    <div style={{ width: '48px', height: '32px', background: 'linear-gradient(135deg, var(--bl), #2563eb)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontStyle: 'italic' }}>VISA</span>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--t1)' }}>•••• •••• •••• 4242</div>
                      <div style={{ fontSize: '12px', color: 'var(--t3)', fontWeight: 600 }}>Expires 12/26</div>
                    </div>
                    <button className="btn btn-g btn-sm" style={{ marginLeft: 'auto' }} onClick={() => showToast('info', 'Opening payment settings...')}>Edit</button>
                  </div>
                  <button className="btn btn-g btn-sm" onClick={() => showToast('info', 'Add new payment method...')}>
                    <span className="mat" style={{ fontSize: '16px', marginRight: '6px' }}>add</span> Add Payment Method
                  </button>
                  
                  <div style={{ marginTop: '32px', fontSize: '14px', fontWeight: 900, color: 'var(--t1)', marginBottom: '16px' }}>Billing History</div>
                  {['Jan 2026', 'Dec 2025', 'Nov 2025'].map(m => (
                    <div key={m} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid var(--bd)', borderRadius: '12px', marginBottom: '8px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700 }}>{m}</div>
                      <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--gn)' }}>₹499</div>
                      <button className="btn btn-s btn-sm" style={{ fontSize: '12px', border: 'none' }} onClick={() => showToast('info', 'Downloading invoice...')}>
                        <span className="mat" style={{ fontSize: '16px', marginRight: '4px' }}>download</span> Invoice
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Appearance Section */}
              {activeTab === 'appear' && (
                <div className="settings-section">
                  <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '24px' }}>Appearance</h3>
                  <div className="toggle-row">
                    <div className="toggle-lbl"><h4 style={{ fontSize: '14px', fontWeight: 800 }}>Compact Mode</h4><p style={{ fontSize: '12px', color: 'var(--t3)' }}>Reduce spacing for more content on screen</p></div>
                    <div className={`toggle-sw ${toggles.appCompact ? 'on' : ''}`} onClick={() => toggle('appCompact')}><div className="toggle-thumb"></div></div>
                  </div>
                  <div className="toggle-row">
                    <div className="toggle-lbl"><h4 style={{ fontSize: '14px', fontWeight: 800 }}>Animations</h4><p style={{ fontSize: '12px', color: 'var(--t3)' }}>Enable smooth transitions and effects</p></div>
                    <div className={`toggle-sw ${toggles.appAnimations ? 'on' : ''}`} onClick={() => toggle('appAnimations')}><div className="toggle-thumb"></div></div>
                  </div>
                  <div className="inp-w" style={{ marginTop: '24px' }}>
                     <label className="inp-lbl">Language</label>
                     <select className="inp"><option>English (India)</option><option>Hindi</option><option>Tamil</option></select>
                  </div>
                  <div className="inp-w">
                     <label className="inp-lbl">Date Format</label>
                     <select className="inp"><option>DD/MM/YYYY (India)</option><option>MM/DD/YYYY (US)</option><option>YYYY-MM-DD</option></select>
                  </div>
                  <button className="btn btn-p btn-sm" onClick={() => showToast('success', 'Appearance setings saved!')}>Save Preferences</button>
                </div>
              )}

              {/* Privacy Section */}
              {activeTab === 'privacy' && (
                <div className="settings-section">
                  <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '24px' }}>Privacy Settings</h3>
                  {[
                    { key: 'privPublic', title: 'Public Profile', desc: 'Allow your profile to be discoverable by recruiters' },
                    { key: 'privData', title: 'Share Anonymous Data', desc: 'Help us improve with anonymized usage analytics' },
                    { key: 'privEmployers', title: 'Profile Visibility to Employers', desc: 'Show your profile to employers in your target companies' },
                    { key: 'privSalary', title: 'Salary Data Contribution', desc: 'Share anonymized salary data to help the community' },
                  ].map(p => (
                    <div key={p.key} className="toggle-row">
                      <div className="toggle-lbl">
                        <h4 style={{ fontSize: '14px', fontWeight: 800 }}>{p.title}</h4>
                        <p style={{ fontSize: '12px', color: 'var(--t3)' }}>{p.desc}</p>
                      </div>
                      <div className={`toggle-sw ${toggles[p.key] ? 'on' : ''}`} onClick={() => toggle(p.key)}>
                        <div className="toggle-thumb"></div>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: '32px' }}>
                    <button className="btn btn-g btn-sm" onClick={() => showToast('info', 'Downloading your data archive...')}>
                      <span className="mat" style={{ fontSize: '16px', marginRight: '6px' }}>download</span> Download My Data
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
          
          <style jsx>{`
            .settings-nav {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }
            .sn-it {
              padding: 14px 16px;
              border-radius: 12px;
              color: var(--t3);
              font-weight: 800;
              font-size: 14px;
              display: flex;
              align-items: center;
              cursor: pointer;
              transition: all 150ms;
            }
            .sn-it:hover {
              background: var(--s2);
              color: var(--t2);
            }
            .sn-it.active {
              background: var(--w);
              color: var(--o2);
              box-shadow: var(--sh1);
              border: 1px solid var(--bd);
            }
            .toggle-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 16px 0;
              border-bottom: 1px solid var(--bd);
            }
          `}</style>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

```

### src\app\skilltest\page.tsx

```
'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

export default function SkillTestPage() {
  const [step, setStep] = useState(0); // 0: intro, 1: question 1, 2: question 2, 3: result
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  
  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const startTest = () => {
    setStep(1);
    setSelectedOpt(null);
  };

  const nextQ = () => {
    if (selectedOpt === null) {
      showToast('error', 'Please select an answer.');
      return;
    }
    setStep(prev => prev + 1);
    setSelectedOpt(null);
  };

  const questions = [
    {
      q: 'When designing a highly concurrent payment processing webhook, which pattern ensures idempotency best?',
      opts: [
        'A. Using a distributed Redis lock per user ID.',
        'B. Inserting a unique transaction ID into a PostgreSQL database with a UNIQUE constraint.',
        'C. Rate limiting API requests to 10/second.',
        'D. Placing all incoming webhooks into a Kafka topic for asynchronous processing.'
      ],
      correct: 1
    },
    {
      q: 'You are tasked with decreasing the P99 latency of a microservice that queries a large user table. Which is the immediate next step?',
      opts: [
        'A. Rewrite the service from Node.js to Go.',
        'B. Add a caching layer using Memcached.',
        'C. Analyze slow query logs and add composite indexes to the database.',
        'D. Horizontally scale the database with sharding.'
      ],
      correct: 2
    }
  ];

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div className="pg-hdr" style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)' }}>Technical Skill Assessment</h1>
            <p style={{ color: 'var(--t3)', fontWeight: 600 }}>Validate your skills to surface top-tier job matches.</p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {step === 0 && (
              <div className="card afu" style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'var(--o6)', color: 'var(--o2)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="mat" style={{ fontSize: '40px' }}>psychology</span>
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '16px' }}>Senior System Design Test</h2>
                <p style={{ fontSize: '15px', color: 'var(--t2)', lineHeight: 1.6, marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
                  This 20-minute assessment covers distributed systems, database scaling, and API design. Scoring above 80% marks you as 'Verified' for Staff-level roles.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
                  <span className="badge bg"><span className="mat">schedule</span> 20 mins</span>
                  <span className="badge bp"><span className="mat">help</span> 15 Questions</span>
                  <span className="badge bo"><span className="mat">stars</span> High ROI</span>
                </div>
                <button className="btn btn-p" onClick={startTest} style={{ padding: '16px 40px', fontSize: '16px' }}>Start Assessment →</button>
              </div>
            )}

            {(step === 1 || step === 2) && (
              <div className="card afu" style={{ padding: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--o2)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                    Question {step} of 2
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ height: '6px', width: '30px', borderRadius: '3px', background: step >= 1 ? 'var(--o3)' : 'var(--s2)' }}></div>
                    <div style={{ height: '6px', width: '30px', borderRadius: '3px', background: step >= 2 ? 'var(--o3)' : 'var(--s2)' }}></div>
                  </div>
                </div>
                
                <h3 style={{ fontSize: '20px', fontWeight: 800, lineHeight: 1.5, marginBottom: '32px', color: 'var(--t1)' }}>
                  {questions[step - 1].q}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {questions[step - 1].opts.map((opt, i) => (
                    <div 
                      key={i} 
                      className="opt-card"
                      onClick={() => setSelectedOpt(i)}
                      style={{
                        padding: '16px 20px', borderRadius: '12px', cursor: 'pointer', transition: 'all 150ms',
                        border: selectedOpt === i ? '2px solid var(--o3)' : '1px solid var(--bd)',
                        background: selectedOpt === i ? 'var(--o7)' : 'var(--w)',
                        fontWeight: selectedOpt === i ? 800 : 600,
                        color: selectedOpt === i ? 'var(--o1)' : 'var(--t2)',
                        boxShadow: selectedOpt === i ? 'var(--sh1)' : 'none'
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn btn-p" onClick={nextQ} style={{ padding: '12px 32px' }}>
                    {step === 2 ? 'Submit Assessment' : 'Next Question'} →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="card afu" style={{ padding: '60px 40px', textAlign: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--gbg)', color: 'var(--gn)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="mat" style={{ fontSize: '50px' }}>verified</span>
                </div>
                <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '16px' }}>Assessment Passed! 🎉</h2>
                <div style={{ fontSize: '48px', fontWeight: 900, color: 'var(--gn)', marginBottom: '8px' }}>92%</div>
                <p style={{ fontSize: '15px', color: 'var(--t2)', fontWeight: 600, marginBottom: '32px' }}>
                  Top 5% · You are now verified for Senior & Staff System Design. Your job match algorithm has been recalibrated.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                  <button className="btn btn-g" onClick={() => setStep(0)}>Take Another Test</button>
                  <button className="btn btn-p" onClick={() => { showToast('success', 'Redirecting to new matches...'); setTimeout(() => window.location.href='/jobmatch', 1000); }}>View Upgraded Job Matches</button>
                </div>
              </div>
            )}

          </div>

        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

```

### src\app\templates\page.tsx

```
'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useSubscription } from '@/hooks/useSubscription';

type AppTemplate = {
  id: number;
  name: string;
  img: string;
  category: string;
  isPro: boolean;
};

const TEMPLATES: AppTemplate[] = [
  { id: 1, name: 'Kinetic Standard (ATS)', img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=560&fit=crop', category: 'Tech & Engineering', isPro: false },
  { id: 2, name: 'Modern Executive', img: 'https://images.unsplash.com/photo-1586282391215-684c85116790?w=400&h=560&fit=crop', category: 'Management', isPro: true },
  { id: 3, name: 'Creative Portfolio', img: 'https://images.unsplash.com/photo-1586282391129-76a6ceb20454?w=400&h=560&fit=crop', category: 'Design', isPro: true },
  { id: 4, name: 'Clean Minimal', img: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&h=560&fit=crop', category: 'All Roles', isPro: false },
];

export default function TemplatesPage() {
  const { tier } = useSubscription();
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Tech & Engineering', 'Management', 'Design', 'All Roles'];
  const filtered = filter === 'All' ? TEMPLATES : TEMPLATES.filter(t => t.category === filter);

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const handleUseTemplate = (t: AppTemplate) => {
    if (t.isPro && tier === 'free') {
      showToast('error', 'This template requires a Pro plan.');
      return;
    }
    showToast('success', `Applying ${t.name} template...`);
  };

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div className="pg-hdr" style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)', marginBottom: '8px' }}>ATS Resume Templates</h1>
            <p style={{ color: 'var(--t3)', fontWeight: 600 }}>Start with a proven layout optimized for applicant tracking systems.</p>
          </div>

          {/* Filter Bar */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
            {categories.map(c => (
              <button 
                key={c}
                className={`sal-filter-btn ${filter === c ? 'active' : ''}`}
                onClick={() => setFilter(c)}
                style={{
                  padding: '8px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: 700,
                  whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 150ms',
                  background: filter === c ? 'var(--t1)' : 'var(--w)',
                  color: filter === c ? '#fff' : 'var(--t3)',
                  border: `1px solid ${filter === c ? 'var(--t1)' : 'var(--bd)'}`
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Template Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
            {filtered.map((t, i) => (
              <div key={t.id} className="card afu" style={{ padding: '16px', animationDelay: `${i * 100}ms` }}>
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--bd)', marginBottom: '16px', background: 'var(--s1)', aspectRatio: '1/1.4' }}>
                  <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
                  {t.isPro && (
                    <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--t1)', color: '#fff', fontSize: '10px', fontWeight: 900, padding: '4px 8px', borderRadius: '4px', letterSpacing: '.05em' }}>
                      PRO
                    </div>
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', opacity: 0, transition: 'opacity 200ms', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                       onMouseOver={e => e.currentTarget.style.opacity = '1'}
                       onMouseOut={e => e.currentTarget.style.opacity = '0'}>
                    <button className="btn btn-p" onClick={() => handleUseTemplate(t)}>Use Template</button>
                  </div>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 900, color: 'var(--t1)', marginBottom: '4px' }}>{t.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--t3)', fontWeight: 600 }}>{t.category}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

```

### src\components\layout\MobileBottomNav.tsx

```
'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function MobileBottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const gp = (path: string) => {
    router.push(path);
  };

  const showComingSoon = (feature: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'info', msg: `${feature} is coming soon in the next mobile update!` } }));
  };

  return (
    <nav className="mobile-bottom-nav">
      <div className="mbn-inner" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', maxWidth: '500px', margin: '0 auto', height: '64px' }}>
        <div 
          className={`mbn-item ${pathname === '/dashboard' ? 'active' : ''}`} 
          onClick={() => gp('/dashboard')}
          style={{ cursor: 'pointer', textAlign: 'center', flex: 1, color: pathname === '/dashboard' ? 'var(--o3)' : 'var(--t3)' }}
        >
          <span className={pathname === '/dashboard' ? 'matf' : 'mat'} style={{ fontSize: '24px' }}>grid_view</span>
          <div style={{ fontSize: '10px', fontWeight: 700, marginTop: '2px' }}>Home</div>
        </div>
        
        <div 
          className={`mbn-item ${pathname === '/jobmatch' ? 'active' : ''}`} 
          onClick={() => gp('/jobmatch')}
          style={{ cursor: 'pointer', textAlign: 'center', flex: 1, color: pathname === '/jobmatch' ? 'var(--o3)' : 'var(--t3)' }}
        >
          <span className={pathname === '/jobmatch' ? 'matf' : 'mat'} style={{ fontSize: '24px' }}>manage_search</span>
          <div style={{ fontSize: '10px', fontWeight: 700, marginTop: '2px' }}>Match</div>
        </div>

        <button 
          className="mbn-fab" 
          onClick={() => gp('/analyzer')}
          style={{ 
            width: '56px', 
            height: '56px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, var(--o2), var(--o3))', 
            color: '#fff', 
            border: 'none', 
            boxShadow: 'var(--sh-or)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginTop: '-30px',
            cursor: 'pointer'
          }}
        >
          <span className="mat" style={{ fontSize: '28px' }}>add</span>
        </button>

        <div 
          className={`mbn-item ${pathname === '/interview' ? 'active' : ''}`} 
          onClick={() => gp('/interview')}
          style={{ cursor: 'pointer', textAlign: 'center', flex: 1, color: pathname === '/interview' ? 'var(--o3)' : 'var(--t3)' }}
        >
          <span className={pathname === '/interview' ? 'matf' : 'mat'} style={{ fontSize: '24px' }}>mic</span>
          <div style={{ fontSize: '10px', fontWeight: 700, marginTop: '2px' }}>Coach</div>
        </div>

        <div 
          className={`mbn-item ${pathname === '/profile' ? 'active' : ''}`} 
          onClick={() => gp('/profile')}
          style={{ cursor: 'pointer', textAlign: 'center', flex: 1, color: pathname === '/profile' ? 'var(--o3)' : 'var(--t3)' }}
        >
          <span className={pathname === '/profile' ? 'matf' : 'mat'} style={{ fontSize: '24px' }}>person</span>
          <div style={{ fontSize: '10px', fontWeight: 700, marginTop: '2px' }}>Profile</div>
        </div>
      </div>
    </nav>
  );
}


```

### src\components\layout\Navbar.tsx

```
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useUser } from '@/context/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const { user } = useUser();
  const [showNotif, setShowNotif] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const openCmd = () => {
    window.dispatchEvent(new CustomEvent('open-cmdp'));
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth');
    router.refresh();
  };

  const pathname = usePathname();
  const isLanding = pathname === '/';

  return (
    <nav className="nav-pill">
      <div 
        className="nav-logo" 
        onClick={() => router.push('/')}
        style={{ cursor: 'pointer' }}
      >
        Hirely<span>AI</span>
      </div>

      <div className="nav-actions">
        {isLanding ? (
          <>
            <button 
              className="btn" 
              style={{ padding: '8px 16px', fontWeight: 700, color: 'var(--t2)', fontSize: '14px' }}
              onClick={() => router.push('/auth')}
            >
              Sign In
            </button>
            <button 
              className="btn btn-p" 
              style={{ padding: '8px 24px', fontWeight: 900, borderRadius: '12px' }}
              onClick={() => router.push('/auth')}
            >
              Sign Up Free
            </button>
          </>
        ) : (
          <>
            <button className="nav-cmd" onClick={openCmd}>
              <span className="mat">search</span>
              <span>Search tools...</span>
              <kbd>⌘K</kbd>
            </button>

            <div style={{ position: 'relative' }}>
              <button className="nav-icon-btn" onClick={() => setShowNotif(!showNotif)}>
                <span className="mat">{showNotif ? 'notifications_active' : 'notifications'}</span>
                <div className="nav-dot"></div>
              </button>
              {showNotif && (
                <div className="nav-drop adu" style={{ right: 0, width: '320px' }}>
                  <div className="nav-drop-h">
                    <span>Notifications</span>
                    <button onClick={() => setShowNotif(false)}>Mark all as read</button>
                  </div>
                  <div className="nav-notif">
                    <div className="nav-notif-i">
                      <div className="nav-notif-c bg"><span className="mat">check_circle</span></div>
                      <div>
                        <p>ATS Scan Complete</p>
                        <span>Your resume scored 84/100 for 'Product Manager'</span>
                      </div>
                    </div>
                    <div className="nav-notif-i">
                      <div className="nav-notif-c bp"><span className="mat">auto_awesome</span></div>
                      <div>
                        <p>New AI Feature</p>
                        <span>STAR Interview Coach is now live!</span>
                      </div>
                    </div>
                  </div>
                  <div className="nav-drop-f">View all notifications</div>
                </div>
              )}
            </div>

            <div style={{ position: 'relative' }}>
              <button className="nav-user-trigger" onClick={() => setShowUser(!showUser)}>
                <div className="nav-avatar">{user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}</div>
                <span className="mat">expand_more</span>
              </button>
              {showUser && (
                <div className="nav-drop adu" style={{ right: 0, width: '240px' }}>
                  <div className="nav-user-h">
                    <div className="nav-avatar">{user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}</div>
                    <div>
                      <p>{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}</p>
                      <span>{user?.email || ''}</span>
                    </div>
                  </div>
                  <div className="nav-user-links">
                    <Link href="/profile" className="nav-user-link"><span className="mat">person</span> Profile</Link>
                    <Link href="/pricing" className="nav-user-link"><span className="mat">verified</span> Subscription <span className="sb-badge">PRO</span></Link>
                    <Link href="/profile" className="nav-user-link"><span className="mat">settings</span> Settings</Link>
                  </div>
                  <div className="nav-user-f">
                    <button onClick={handleSignOut} className="nav-user-link" style={{ width: '100%', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer' }}>
                      <span className="mat">logout</span> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button className="btn btn-p" onClick={() => router.push('/dashboard')}>Dashboard</button>
          </>
        )}
      </div>
    </nav>
  );
}

```

### src\components\layout\Sidebar.tsx

```
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSubscription } from '@/hooks/useSubscription';

const TIER_LABELS: Record<string, { label: string; color: string }> = {
  free: { label: 'FREE', color: 'var(--t3)' },
  pro: { label: 'PRO', color: 'var(--o3)' },
  advanced: { label: 'ADV', color: 'var(--tl)' },
};

export default function Sidebar() {
  const pathname = usePathname();
  const { tier } = useSubscription();
  const tierInfo = TIER_LABELS[tier];

  const handleUpgrade = () => {
    window.dispatchEvent(new CustomEvent('open-upgrade'));
  };

  return (
    <aside className="sidebar" style={{ zIndex: 900, overflowY: 'auto' }}>
      <nav style={{ padding: '20px 8px', flex: 1 }}>
        <div className="sb-sec">Main</div>
        <Link href="/dashboard" className={`sb-it ${pathname === '/dashboard' ? 'active' : ''}`}>
          <span className={pathname === '/dashboard' ? 'matf' : 'mat'}>grid_view</span> <span>Dashboard</span>
        </Link>
        <Link href="/jobmatch" className={`sb-it ${pathname === '/jobmatch' ? 'active' : ''}`}>
          <span className={pathname === '/jobmatch' ? 'matf' : 'mat'}>manage_search</span> <span>Job Match</span>
        </Link>
        <Link href="/analyzer" className={`sb-it ${pathname === '/analyzer' ? 'active' : ''}`}>
          <span className={pathname === '/analyzer' ? 'matf' : 'mat'}>description</span> <span>Resume Analyzer</span>
        </Link>
        <Link href="/jobs" className={`sb-it ${pathname === '/jobs' ? 'active' : ''}`}>
          <span className={pathname === '/jobs' ? 'matf' : 'mat'}>view_kanban</span> <span>Job Pipeline</span>
        </Link>

        <div className="sb-sec">Tools</div>
        <Link href="/cover-letter" className={`sb-it ${pathname === '/cover-letter' ? 'active' : ''}`}>
          <span className={pathname === '/cover-letter' ? 'matf' : 'mat'}>mail</span> <span>Cover Letters</span>
        </Link>
        <Link href="/rewriter" className={`sb-it ${pathname === '/rewriter' ? 'active' : ''}`}>
          <span className={pathname === '/rewriter' ? 'matf' : 'mat'}>auto_awesome</span> <span>Bullet Rewriter</span>
        </Link>
        <Link href="/templates" className={`sb-it ${pathname === '/templates' ? 'active' : ''}`}>
          <span className={pathname === '/templates' ? 'matf' : 'mat'}>format_paint</span> <span>ATS Templates</span>
        </Link>
        
        <div className="sb-sec">Career Intelligence</div>
        <Link href="/interview" className={`sb-it ${pathname === '/interview' ? 'active' : ''}`}>
          <span className={pathname === '/interview' ? 'matf' : 'mat'}>mic</span> <span>Interview Prep</span>
        </Link>
        <Link href="/salary" className={`sb-it ${pathname === '/salary' ? 'active' : ''}`}>
          <span className={pathname === '/salary' ? 'matf' : 'mat'}>payments</span> <span>Salary Intel</span>
        </Link>
        <Link href="/career-path" className={`sb-it ${pathname === '/career-path' ? 'active' : ''}`}>
          <span className={pathname === '/career-path' ? 'matf' : 'mat'}>trending_up</span> <span>Career Path</span>
        </Link>
        <Link href="/skilltest" className={`sb-it ${pathname === '/skilltest' ? 'active' : ''}`}>
          <span className={pathname === '/skilltest' ? 'matf' : 'mat'}>psychology</span> <span>Skill Test</span>
        </Link>

        <div className="sb-sec">Account</div>
        <Link href="/profile" className={`sb-it ${pathname === '/profile' ? 'active' : ''}`}>
          <span className={pathname === '/profile' ? 'matf' : 'mat'}>person_pin</span> <span>Career Profile</span>
        </Link>
        <Link href="/alerts" className={`sb-it ${pathname === '/alerts' ? 'active' : ''}`}>
          <span className={pathname === '/alerts' ? 'matf' : 'mat'}>notifications_active</span> <span>Job Alerts</span>
        </Link>
        <Link href="/notifications" className={`sb-it ${pathname === '/notifications' ? 'active' : ''}`}>
          <span className={pathname === '/notifications' ? 'matf' : 'mat'}>notifications</span> <span>Notifications</span>
          <span className="sb-badge" style={{ background: 'var(--o3)', color: '#fff' }}>4</span>
        </Link>
        <Link href="/referrals" className={`sb-it ${pathname === '/referrals' ? 'active' : ''}`}>
          <span className={pathname === '/referrals' ? 'matf' : 'mat'}>loyalty</span> <span>Refer & Earn</span>
        </Link>
        <Link href="/pricing" className={`sb-it ${pathname === '/pricing' ? 'active' : ''}`}>
          <span className={pathname === '/pricing' ? 'matf' : 'mat'}>star</span> <span>Pricing & Plans</span>
        </Link>
        <Link href="/settings" className={`sb-it ${pathname === '/settings' ? 'active' : ''}`}>
          <span className={pathname === '/settings' ? 'matf' : 'mat'}>settings</span> <span>Settings</span>
        </Link>
      </nav>

      <div className="sb-foot">
        {tier === 'free' ? (
          <div className="sb-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <h4>UPGRADE PLAN</h4>
              <span style={{ fontSize: '10px', fontWeight: 900, color: tierInfo.color, background: 'var(--s2)', padding: '2px 8px', borderRadius: '6px' }}>{tierInfo.label}</span>
            </div>
            <p>Unlock mock interviews, salary intel, and unlimited job matching.</p>
            <button onClick={handleUpgrade}>View Plans ✦</button>
          </div>
        ) : tier === 'pro' ? (
          <div className="sb-up" style={{ background: 'linear-gradient(135deg, #fff7ed, #fff1e6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <h4>PRO PLAN ACTIVE ✓</h4>
              <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--o3)', background: 'var(--o6)', padding: '2px 8px', borderRadius: '6px' }}>PRO</span>
            </div>
            <p>Upgrade to Advanced for mock interviews & salary intel.</p>
            <button onClick={handleUpgrade} style={{ background: 'var(--t1)' }}>Go Advanced ✦</button>
          </div>
        ) : (
          <div className="sb-up" style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <h4 style={{ color: 'var(--green)' }}>ADVANCED ACTIVE ✓</h4>
              <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--green)', background: 'var(--gbg)', padding: '2px 8px', borderRadius: '6px' }}>ADV</span>
            </div>
            <p style={{ color: 'var(--t2)' }}>You have full access to all Hirely AI features.</p>
            <Link href="/pricing" style={{ display: 'block', textAlign: 'center', fontSize: '12px', fontWeight: 800, color: 'var(--green)', marginTop: '8px', textDecoration: 'none' }}>Manage Subscription →</Link>
          </div>
        )}
      </div>
    </aside>
  );
}

```

### src\components\ui\CommandPalette.tsx

```
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const cmdData = [
    { icon: 'grid_view', label: 'Dashboard', tag: 'Page', cat: 'Pages', action: () => router.push('/dashboard') },
    { icon: 'manage_search', label: 'Job Match', tag: 'Page', cat: 'Pages', action: () => router.push('/jobmatch') },
    { icon: 'payments', label: 'Salary Intelligence', tag: 'Page', cat: 'Pages', action: () => router.push('/salary') },
    { icon: 'mic', label: 'Interview Prep', tag: 'Tool', cat: 'Tools', action: () => showToast('info', 'Opening Interview Prep...') },
    { icon: 'trending_up', label: 'Career Path Predictor', tag: 'Tool', cat: 'Tools', action: () => showToast('info', 'Starting Predictor...') },
    { icon: 'description', label: 'Resume Analyzer', tag: 'Page', cat: 'Pages', action: () => router.push('/analyzer') },
    { icon: 'mail', label: 'Cover Letters', tag: 'Tool', cat: 'Tools', action: () => showToast('info', 'Opening Generator...') },
    { icon: 'upload_file', label: 'Upload New Resume', tag: 'Action', cat: 'Actions', action: () => router.push('/analyzer') },
    { icon: 'share', label: 'Share Score Card', tag: 'Action', cat: 'Actions', action: () => window.dispatchEvent(new CustomEvent('open-share')) },
    { icon: 'auto_awesome', label: 'Upgrade to Pro', tag: 'Action', cat: 'Actions', action: () => window.dispatchEvent(new CustomEvent('open-upgrade')) },
    { icon: 'error_outline', label: 'Error States Demo', tag: 'Page', cat: 'Pages', action: () => router.push('/errors') },
  ];

  const filteredCmd = cmdData.filter(d => 
    !query || d.label.toLowerCase().includes(query.toLowerCase()) || d.cat.toLowerCase().includes(query.toLowerCase())
  );

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 50);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        handleOpen();
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('open-cmdp', handleOpen);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-cmdp', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (idx: number) => {
    if (filteredCmd[idx]) {
      filteredCmd[idx].action();
      setIsOpen(false);
      setQuery('');
    }
  };

  if (!isOpen) return null;

  // Group by category
  const categories = Array.from(new Set(filteredCmd.map(d => d.cat)));

  return (
    <div id="cmd-overlay" className="open" onClick={() => setIsOpen(false)}>
      <div className="cmd-box afu" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-search-row">
          <span className="mat">search</span>
          <input 
            ref={inputRef}
            className="cmd-input" 
            placeholder="Search pages, tools, actions..." 
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') setSelectedIndex(s => Math.min(s + 1, filteredCmd.length - 1));
              if (e.key === 'ArrowUp') setSelectedIndex(s => Math.max(s - 1, 0));
              if (e.key === 'Enter') handleSelect(selectedIndex);
            }}
            autoComplete="off"
          />
          <button className="cmd-esc" onClick={() => setIsOpen(false)}>esc</button>
        </div>
        
        <div className="cmd-results">
          {categories.map(cat => (
            <div key={cat}>
              <div className="cmd-section-label">{cat}</div>
              {filteredCmd.filter(d => d.cat === cat).map((d) => {
                const globalIdx = filteredCmd.indexOf(d);
                return (
                  <div 
                    key={d.label} 
                    className={`cmd-item ${globalIdx === selectedIndex ? 'selected' : ''}`}
                    onMouseEnter={() => setSelectedIndex(globalIdx)}
                    onClick={() => handleSelect(globalIdx)}
                  >
                    <span className="mat">{d.icon}</span>
                    <span className="cmd-item-label">{d.label}</span>
                    <span className="cmd-item-tag">{d.tag}</span>
                    {globalIdx === selectedIndex && <kbd>↵</kbd>}
                  </div>
                );
              })}
            </div>
          ))}
          {filteredCmd.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <span className="mat" style={{ fontSize: '32px', color: 'var(--t4)', marginBottom: '12px' }}>search_off</span>
              <p style={{ fontSize: '14px', color: 'var(--t3)' }}>No results found for "{query}"</p>
            </div>
          )}
        </div>
        
        <div className="cmd-footer">
          <span><kbd>↑↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Select</span>
          <span><kbd>esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}

```

### src\components\ui\InDepthAnalysisModal.tsx

```
'use client';

import { useState, useEffect } from 'react';

export default function InDepthAnalysisModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-indepth', handleOpen);
    return () => window.removeEventListener('open-indepth', handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal-box afu" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px' }}>
        <button className="modal-close" onClick={() => setIsOpen(false)}>
          <span className="mat">close</span>
        </button>
        
        <div style={{ padding: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
             <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--o6)', color: 'var(--o3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <span className="mat" style={{ fontSize: '32px' }}>analytics</span>
             </div>
             <div>
               <h2 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.02em' }}>In-Depth Analysis Report</h2>
               <p style={{ color: 'var(--t3)', fontWeight: 600, fontSize: '14px' }}>Recruiter 6-Second Scan Simulation</p>
             </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            
            {/* COLUMN 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <section>
                <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--t4)', letterSpacing: '0.1em', marginBottom: '12px' }}>Parsing & Readability</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700 }}>
                     <span>ATS Parsing Score</span>
                     <span style={{ color: 'var(--green)' }}>100% (Perfect)</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700 }}>
                     <span>Impact Scoring</span>
                     <span style={{ color: 'var(--o3)' }}>High</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700 }}>
                     <span>Readability Index</span>
                     <span style={{ color: 'var(--green)' }}>78/100</span>
                   </div>
                </div>
              </section>

              <section style={{ marginTop: '24px' }}>
                <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--t4)', letterSpacing: '0.1em', marginBottom: '12px' }}>Content Quality</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '13px', fontWeight: 600 }}>
                    <span className="mat" style={{ color: 'var(--green)', fontSize: '18px' }}>check_circle</span> Achievements detected: 8
                  </li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '13px', fontWeight: 600 }}>
                    <span className="mat" style={{ color: 'var(--o3)', fontSize: '18px' }}>warning</span> Weak bullets identified: 3
                  </li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '13px', fontWeight: 600 }}>
                    <span className="mat" style={{ color: 'var(--green)', fontSize: '18px' }}>check_circle</span> Metrics & Numbers: Strong
                  </li>
                </ul>
              </section>
            </div>

            {/* COLUMN 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <section>
                <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--t4)', letterSpacing: '0.1em', marginBottom: '12px' }}>Strategic Alignment</h4>
                <div style={{ background: 'var(--s2)', padding: '16px', borderRadius: '16px' }}>
                   <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--t3)', marginBottom: '8px' }}>Seniority Level Detected</div>
                   <div style={{ fontSize: '17px', fontWeight: 900, color: 'var(--o2)' }}>Mid-Senior Level (5-8yrs)</div>
                </div>
                <div style={{ marginTop: '16px' }}>
                   <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--t3)', marginBottom: '8px' }}>Industry Keyword Coverage</div>
                   <div style={{ height: '8px', background: 'var(--s2)', borderRadius: '99px', overflow: 'hidden' }}>
                     <div style={{ width: '84%', height: '100%', background: 'var(--o3)' }}></div>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, marginTop: '6px' }}>
                      <span>84% COVERAGE</span>
                      <span style={{ color: 'var(--o3)' }}>TOP 5%</span>
                   </div>
                </div>
              </section>

              <section style={{ marginTop: '16px' }}>
                 <div style={{ background: 'var(--o7)', border: '1.5px dashed var(--o5)', borderRadius: '16px', padding: '16px' }}>
                    <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--o2)', marginBottom: '6px' }}>Competitor Benchmark</h4>
                    <p style={{ fontSize: '12px', color: 'var(--t2)', lineHeight: 1.5, fontWeight: 600 }}>
                      You are ranking higher than 92% of applicants for "Senior Product Designer" roles at Stripe, Google, and Meta.
                    </p>
                 </div>
              </section>
            </div>

          </div>

          <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <button className="btn btn-p" style={{ padding: '14px 48px' }} onClick={() => setIsOpen(false)}>Done Reviewing</button>
          </div>
        </div>
      </div>
    </div>
  );
}

```

### src\components\ui\ShareModal.tsx

```
'use client';

import { useState, useEffect } from 'react';

export default function ShareModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-share', handleOpen);
    return () => window.removeEventListener('open-share', handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal-box afu" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setIsOpen(false)}>
          <span className="mat">close</span>
        </button>
        
        <div className="share-h">
          <h2>Share Your Success 🎯</h2>
          <p>Inspire your network and earn referral credits for every colleague who joins Hirely.</p>
        </div>

        <div className="score-card">
          <div className="sc-ring-w">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10"/>
              <circle 
                cx="60" cy="60" r="54" 
                fill="none" stroke="var(--white)" strokeWidth="10" 
                strokeLinecap="round" 
                strokeDasharray="339.29" 
                style={{ strokeDashoffset: '67.85', transition: 'stroke-dashoffset 1.5s ease-out' }}
              />
            </svg>
            <div className="sc-num">
              <h3>80%</h3>
              <span>ATS SCORE</span>
            </div>
          </div>
          <div className="sc-role">Senior Product Designer</div>
          <div className="sc-comp">Stripe · Hybrid</div>
          <div className="sc-badges">
            <span className="sc-badge">Top 12%</span>
            <span className="sc-badge">AI Optimized</span>
          </div>
        </div>

        <div className="share-a">
          <div className="share-row">
            <input className="inp share-inp" defaultValue="hirely.ai/share/charan-ux" readOnly />
            <button className="btn btn-s" onClick={() => {
              navigator.clipboard.writeText("hirely.ai/share/charan-ux");
              window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'Copied link to clipboard!' } }));
            }}>
              <span className="mat">content_copy</span>
            </button>
          </div>
          <button className="btn btn-li btn-lg">
            <span className="mat">share</span> Share on LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
}

```

### src\components\ui\Toasts.tsx

```
'use client';

import { useState, useEffect } from 'react';

type ToastData = {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  msg: string;
};

export default function Toasts() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handleShowToast = (event: any) => {
      const { type, msg } = event.detail;
      const id = Date.now();
      setToasts((prev) => [...prev, { id, type, msg }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    };

    window.addEventListener('show-toast', handleShowToast);
    return () => window.removeEventListener('show-toast', handleShowToast);
  }, []);

  const icons = {
    success: 'check_circle',
    error: 'error',
    info: 'info',
    warning: 'warning',
  };

  return (
    <div className="toast-container" id="toasts">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <div className="toast-icon"><span className="mat">{icons[toast.type]}</span></div>
          <div className="toast-body">
            <p className="toast-type">{toast.type.toUpperCase()}</p>
            <p className="toast-msg">{toast.msg}</p>
          </div>
          <button className="toast-close" onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}>
            <span className="mat">close</span>
          </button>
        </div>
      ))}
    </div>
  );
}

```

### src\components\ui\UpgradeModal.tsx

```
'use client';

import { useState, useEffect } from 'react';
import { useSubscription, UserTier } from '@/hooks/useSubscription';
import Link from 'next/link';

export default function UpgradeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { tier, upgrade } = useSubscription();

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-upgrade', handleOpen);
    return () => window.removeEventListener('open-upgrade', handleOpen);
  }, []);

  if (!isOpen) return null;

  const handleUpgrade = (newTier: UserTier) => {
    const isTrial = newTier === 'advanced';
    upgrade(newTier, isTrial);
    setIsOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal-box afu" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px' }}>
        <button className="modal-close" onClick={() => setIsOpen(false)}>
          <span className="mat">close</span>
        </button>
        
        <div style={{ padding: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.04em' }}>Choose Your Power-Up 🚀</h2>
            <p style={{ color: 'var(--t3)', fontWeight: 600, marginTop: '8px' }}>Unlock the full potential of Hirely AI and land your dream job faster.</p>
          </div>

          <div className="pr-grid" style={{ gap: '16px' }}>
            
            {/* FREE */}
            <div className="pr-card" style={{ padding: '24px' }}>
              <div className="pr-name">Free</div>
              <div className="pr-price" style={{ fontSize: '36px' }}>₹0<span style={{ fontSize: '14px' }}>/mo</span></div>
              <ul className="pr-list" style={{ margin: '20px 0', gap: '8px', fontSize: '13px' }}>
                <li className="pr-it"><span className="mat">check</span> 1 ATS Scan/day</li>
                <li className="pr-it"><span className="mat">check</span> 1 Job Match/day</li>
                <li className="pr-it no"><span className="mat">lock</span> STAR Coach</li>
                <li className="pr-it no"><span className="mat">lock</span> Mock Interviews</li>
              </ul>
              <button className="btn btn-g" style={{ width: '100%' }} disabled={tier === 'free'}>
                {tier === 'free' ? 'Current Plan' : 'Downgrade'}
              </button>
            </div>

            {/* PRO */}
            <div className="pr-card popular" style={{ padding: '24px' }}>
              <div className="pr-tag">MOST POPULAR</div>
              <div className="pr-name">Pro</div>
              <div className="pr-price" style={{ fontSize: '36px' }}>₹499<span style={{ fontSize: '14px' }}>/mo</span></div>
              <ul className="pr-list" style={{ margin: '20px 0', gap: '8px', fontSize: '13px' }}>
                <li className="pr-it"><span className="mat">check</span> Unlimited Scans</li>
                <li className="pr-it"><span className="mat">check</span> STAR Interview Coach</li>
                <li className="pr-it"><span className="mat">check</span> Advanced Writer</li>
                <li className="pr-it no"><span className="mat">lock</span> Mock Interviews</li>
              </ul>
              <button className="btn btn-p" style={{ width: '100%' }} onClick={() => handleUpgrade('pro')}>
                Upgrade to Pro
              </button>
            </div>

            {/* ADVANCED */}
            <div className="pr-card valuable" style={{ padding: '24px' }}>
               <div className="pr-tag" style={{ background: 'var(--t1)' }}>BEST VALUE</div>
               <div className="pr-name">Advanced</div>
               <div className="pr-price" style={{ fontSize: '36px' }}>₹1,199<span style={{ fontSize: '14px' }}>/mo</span></div>
               <ul className="pr-list" style={{ margin: '20px 0', gap: '8px', fontSize: '13px' }}>
                 <li className="pr-it"><span className="mat">check</span> Everything in Pro</li>
                 <li className="pr-it"><span className="mat">check</span> Mock Interviews</li>
                 <li className="pr-it"><span className="mat">check</span> Salary Intel PRO</li>
                 <li className="pr-it"><span className="mat">check</span> Recruiter Score</li>
               </ul>
               <button className="btn btn-p" style={{ width: '100%', background: 'var(--t1)' }} onClick={() => handleUpgrade('advanced')}>
                 Get Advanced
               </button>
               <p style={{ fontSize: '10px', color: 'var(--t3)', textAlign: 'center', marginTop: '12px', fontWeight: 700 }}>Start 3-day trial · Cancel anytime</p>
            </div>

          </div>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link href="/pricing" onClick={() => setIsOpen(false)} style={{ fontSize: '13px', fontWeight: 800, color: 'var(--o3)', textDecoration: 'none' }}>
              View full feature comparison table →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

```

### src\context\AuthContext.tsx

```
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Use getUser() which validates against the server — not getSession() which can be stale
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setIsLoading(false);
    });

    // Also subscribe to auth state changes (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useUser must be used within an AuthProvider');
  }
  return context;
};

```

### src\hooks\useSubscription.ts

```
'use client';

import { useState, useEffect } from 'react';

export type UserTier = 'free' | 'pro' | 'advanced';

export function useSubscription() {
  const [tier, setTier] = useState<UserTier>('free');
  const [isTrialing, setIsTrialing] = useState(false);
  const [trialTimeLeft, setTrialTimeLeft] = useState(3 * 24 * 60 * 60); // 3 days in seconds

  useEffect(() => {
    // Simulated load from local storage
    const saved = localStorage.getItem('user_tier') as UserTier;
    if (saved) setTier(saved);
  }, []);

  const upgrade = (newTier: UserTier, isTrial = false) => {
    setTier(newTier);
    localStorage.setItem('user_tier', newTier);
    if (isTrial) {
      setIsTrialing(true);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: `3-day Advanced trial started! Enjoy full access.` } }));
    } else {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: `Upgraded to ${newTier.toUpperCase()} successfully!` } }));
    }
  };

  const checkAccess = (feature: string) => {
    const limits: Record<UserTier, string[]> = {
      free: ['ats_analysis', 'job_match', 'score', 'keywords'],
      pro: ['ats_analysis', 'job_match', 'score', 'keywords', 'star_coach', 'email_gen', 'cover_letter', 'career_path', 'rewrite', 'ats_tips', 'formatting'],
      advanced: ['ats_analysis', 'job_match', 'score', 'keywords', 'star_coach', 'email_gen', 'cover_letter', 'career_path', 'rewrite', 'ats_tips', 'formatting', 'deep_analysis', 'local_jobs', 'salary_intel', 'mock_interview', 'unlimited_match', 'recruiter_score', 'role_optimization']
    };
    return limits[tier].includes(feature);
  };

  return { tier, upgrade, checkAccess, isTrialing, trialTimeLeft };
}

```

### src\utils\supabase\client.ts

```
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

```

### src\utils\supabase\middleware.ts

```
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // --- PERFECT REDIRECT LOGIC ---
  const path = request.nextUrl.pathname;

  // 1. If logged in and on Landing or Auth -> Go to Dashboard
  if (user && (path === '/' || path === '/auth')) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // 2. If logged out and on protected pages -> Go to Auth
  if (!user && (path.startsWith('/dashboard') || path.startsWith('/onboarding') || path.startsWith('/analyzer'))) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    return NextResponse.redirect(url)
  }

  return response
}

```

### src\utils\supabase\server.ts

```
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

```
