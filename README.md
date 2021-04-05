# UNPKG &middot; [![Travis][build-badge]][build]

[build-badge]: https://img.shields.io/travis/mjackson/unpkg/master.svg?style=flat-square
[build]: https://travis-ci.org/mjackson/unpkg

[UNPKG](https://unpkg.com) is a fast, global [content delivery network](https://en.wikipedia.org/wiki/Content_delivery_network) for everything on [npm](https://www.npmjs.com/).

## Documentation

Please visit [the UNPKG website](https://unpkg.com) to learn more about how to use it.

## Sponsors

Our sponsors and backers are listed [in SPONSORS.md](SPONSORS.md).

## Build Options

Use a `.env` file to set the following options when building the app with `npm run build`. These values will be bundled into the built `server.js` file.

| Flag               | Options / Description                    | Default value                |
| ------------------ | ---------------------------------------- | ---------------------------- |
| `BUILD_ENV`        | `production` or `development`            | `development`                |
| `NODE_ENV`         | `production`, `staging` or `development` | `development`                |
| `CLOUDFLARE_EMAIL` | required                                 | `null`                       |
| `CLOUDFLARE_KEY`   | required                                 | `null`                       |
| `NPM_REGISTRY_URL` | optional                                 | `https://registry.npmjs.org` |
| `ORIGIN`           | optional                                 | `https://unpkg.com`          |

## Runtime Options

These values can be set on the system environment when starting the unpkg `server.js`.

| Flag                   | Options / Description                                   | Default value |
| ---------------------- | ------------------------------------------------------- | ------------- |
| `GOOGLE_CLOUD_PROJECT` | The GCP project ID associated with your application.    | `null`        |
| `GAE_ENV`              | Set to `standard` to enable `@google-cloud/trace-agent` | `null`        |
| `DEBUG`                | enableDebugging                                         | `null`        |
