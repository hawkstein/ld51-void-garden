# LD51 - Void Garden

## Theme - Every 10 seconds

Ludum Dare 51 - Friday September 30th 11:00 PM BST, 48 Hr Compo to Monday October 3rd, 2022

## Packages

- `zustand` for app state management
- `sass` for CSS styling
- `framer-motion` for animation (including inline SVG elements)
- `vite-plugin-svgr` to transform SVGs into components but use online tool if you'd rather they weren't sealed off from React.
- `react-hook-form` for handle forms
- `react-query` for server interaction, mainly with `supabase` for any auth/high scores etc
- `use-sound` wrapper hook for Howler.js for sounds

## Scripts

- `dev` standard Vite script for local development
- `build` standard Vite script to build `/dist` folder (to be zipped and uploaded to Itch.io)
- `publish` can only be run after creating the HTML5 game on Itch.io (also expects to be running in an osx shell for `zip` and have `butler` installed/authed)
- `preview` standard Vite script to serve `/dist` folder

## Useful tools

- [SVGR](https://github.com/gregberge/svgr) Tool for converting SVGs to React components [Online Tool](https://react-svgr.com/playground/)
- [Transfonter](https://transfonter.org/) Build Woff/Woff2 fonts from TTF etc

## Useful Resources

- [80's Fonts 🤘](https://hyperpix.net/fonts/80s-fonts/)
