/* eslint-disable no-restricted-globals */
// eslint-disable-next-line no-unused-expressions, camelcase, no-undef, no-underscore-dangle
const CACHE_VERSION = SW_VERSION;
// eslint-disable-next-line no-underscore-dangle
const FILES = self.__WB_MANIFEST;

const precache = async () => {
  const cache = await caches.open(CACHE_VERSION);

  await Promise.all(
    FILES.map(async (file) => {
      const url = new URL(file.url, location.href);

      if (file.revision) {
        url.searchParams.append("__WB_REVISION", file.revision);
      }

      const match = await caches.match(url);

      if (match) {
        await cache.put(url, match.clone());
      } else {
        await cache.add(url);
      }
    })
  );
};

self.addEventListener("install", async () => {
  await precache();
});

self.addEventListener("activate", async () => {
  const cachesKeys = await caches.keys();

  await Promise.all(
    cachesKeys.map(async (key) => {
      if (CACHE_VERSION === key) return;

      await caches.delete(key);
    })
  );
});

const getIndexHTML = async (cache) =>
  cache.match("/index.html", { ignoreSearch: true });

const fromCache = async (e) => {
  const cache = await caches.open(CACHE_VERSION);

  const { pathname } = new URL(e.request.url);
  const url = pathname === "/" ? "/index.html" : pathname;

  const match = await cache.match(url, { ignoreSearch: true });

  if (match) return match;

  const req = e.request.clone();

  const isAcceptHTML = req.headers.get("accept")?.includes("text/html");

  try {
    const response = await fetch(e.request);

    if (response.status === 404 && req.method === "GET" && isAcceptHTML) {
      return (await getIndexHTML(cache)) || response;
    }

    if (response.status === 200) {
      await cache.put(req, response.clone());
    }

    return response;
  } catch (err) {
    if (isAcceptHTML) {
      const indexHTML = await getIndexHTML(cache);

      if (indexHTML) return indexHTML;
    }

    throw err;
  }
};

self.addEventListener("fetch", (e) => {
  e.respondWith(fromCache(e));
});

self.addEventListener("notificationclick", (event) => {
  const rootUrl = new URL("/", location).href;
  event.notification.close();
  event.waitUntil(
    // eslint-disable-next-line no-undef
    clients
      .matchAll({
        type: "window",
      })
      // eslint-disable-next-line consistent-return
      .then((clientList) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const client of clientList) {
          if (client.url === rootUrl && "focus" in client) {
            return client.focus();
          }
        }
        // eslint-disable-next-line no-undef
        if (clients.openWindow) return clients.openWindow("/");
      })
  );
});
