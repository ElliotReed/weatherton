# Notes

check cors on server to only allow deployed site

## Status

Refactoring, and general typescript conversion

Last worked on 2024-12-6

## Ideas

### Scroll to show content

- When forecast mostly in view, scroll down to bottom of content.

----

## Deployment

In app.js, set to the production url (uncomment).

after build, dist folder is deployed to github pages as the gh-pages branch

```console
npm run deploy
```

## Updates

force to latest with npm-check-updates

```console
ncu -u
```

## Network

expose network

```console
npm run dev -- --host
```
