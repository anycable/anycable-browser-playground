# AnyCable Browser Playground

This project aims to help in testing different AnyCable features via browsers (primarly, [anycable-client][] features).

## Public version

You can try the playground here: [play.anycable.io](https://play.anycable.io).

**NOTE:** In order to connect to your local server, you must run the server with TLS (`wss://`) enabled. You can configure SSL yourself or use a proxy, like [puma-dev](https://github.com/puma/puma-dev).

## Running locally

You can run the project locally, too:

```bash
npm install
npm run serve
```

Now you can access the playground at [http://localhost:4444](http://localhost:4444).

[anycable-client]: https://github.com/anycable/anycable-client
