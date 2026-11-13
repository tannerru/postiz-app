# White-label Postiz

This fork adds a white-label layer on top of [Postiz](https://github.com/gitroomhq/postiz-app).
One build can be rebranded per install with environment variables. With no `BRAND_NAME`
set, the app is plain Postiz.

## Settings

All are read when the container starts. None are baked into the build.

| Variable | What it does |
| --- | --- |
| `BRAND_NAME` | Product name. Replaces "Postiz" in page titles, on-screen copy and emails. Turns white-label mode on. |
| `BRAND_LOGO_URL` | Wide logo for dark surfaces: sign-in and the connect-a-channel page. |
| `BRAND_ICON_URL` | Square mark: sidebar, post preview pages, the sign-in side panel. |
| `BRAND_FAVICON_URL` | Browser tab icon. |
| `BRAND_TAGLINE` | Line under the name on the sign-in page. |
| `BRAND_COMPANY`, `BRAND_COMPANY_URL` | Company behind the install, linked under the sign-in form. |
| `BRAND_SOURCE_URL` | Link to this install's source code, shown under the sign-in form. |
| `BRAND_ACCENT`, `BRAND_ACCENT_TEXT` | Accent colour in dark mode and the text colour that sits on it (hex). |
| `BRAND_ACCENT_LIGHT`, `BRAND_ACCENT_LIGHT_TEXT` | The same pair for light mode. Defaults to the dark pair. |

Paths starting with `/brand/` are served from the `/brand` folder inside the container.
Mount your artwork there:

```yaml
    environment:
      BRAND_NAME: 'Acme Social'
      BRAND_LOGO_URL: '/brand/logo.png'
      BRAND_ICON_URL: '/brand/icon.png'
      BRAND_FAVICON_URL: '/brand/favicon.png'
      BRAND_ACCENT: '#f7ee17'
      BRAND_ACCENT_TEXT: '#000000'
      BRAND_SOURCE_URL: 'https://github.com/tannerru/postiz-app/tree/whitelabel'
    volumes:
      - ./brand:/brand:ro
```

## What white-label mode changes

- The name, logos, favicon and accent colour above.
- The sign-in side panel shows the brand in place of Postiz testimonials.
- The Postiz terms and privacy links are hidden on the register page.
- The Mastodon app name registered for custom instances.

Web addresses and package names stay as they are (`npm install -g postiz`, links to the
Postiz docs), because they point at real upstream things.

## Licence

Postiz is AGPL-3.0, and so is this fork. If people use your install over a network, they
must be able to get the source of the version you run. Keep `BRAND_SOURCE_URL` pointing at
the code you deployed. Artwork in `/brand` is yours and is not part of the source.

## Where the code is

- `libraries/helpers/src/utils/brand.ts`: reads the settings.
- `apps/frontend/src/components/brand/`: head tags and logo components.
- `libraries/react-shared-libraries/src/translation/i18next.ts`: swaps the name in translated copy.
- `var/docker/nginx.conf`: serves `/brand/`.
