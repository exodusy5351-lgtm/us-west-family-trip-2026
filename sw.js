// 미서부 가족여행 대시보드 — 오프라인 대응 Service Worker
// 모하비 사막/국립공원 등 통신 음영 지역에서도 마지막으로 불러온 페이지가 열리도록
// 앱 셸을 캐싱한다 (Stale-While-Revalidate: 캐시 우선 응답 + 백그라운드 갱신)

const CACHE_NAME = "uswest-trip-2026-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const networkFetch = fetch(event.request)
        .then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return networkResponse;
        })
        .catch(() => cachedResponse);

      // 캐시가 있으면 즉시 반환하고, 네트워크 응답으로 백그라운드 갱신
      return cachedResponse || networkFetch;
    })
  );
});
