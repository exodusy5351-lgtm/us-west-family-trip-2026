// 미서부 가족여행 대시보드 — 오프라인 대응 Service Worker
// 모하비 사막/국립공원 등 통신 음영 지역에서도 마지막으로 불러온 페이지가 열리도록
// 앱 셸을 캐싱한다 (Stale-While-Revalidate: 캐시 우선 응답 + 백그라운드 갱신)
// 커밋마다 아래 CACHE_NAME 날짜를 갱신할 것 (배포마다 캐시 강제 갱신 목적)

const CACHE_NAME = "uswest-trip-2026-20260905e";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg"
];

self.addEventListener("install", (event) => {
  // cache.addAll()은 내부적으로 일반 fetch를 쓰기 때문에 브라우저 HTTP 디스크 캐시에
  // 남아있는 예전 응답을 그대로 캐시에 담아버릴 수 있다 (CACHE_NAME을 바꿔도 내용물은 안 바뀌는 원인).
  // {cache:'reload'}로 항상 네트워크에서 새로 받아오도록 강제한다.
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        APP_SHELL.map((url) =>
          fetch(url, { cache: "reload" }).then((res) => cache.put(url, res))
        )
      )
    )
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

  const sameOrigin = new URL(event.request.url).origin === self.location.origin;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 백그라운드 재검증도 브라우저 HTTP 디스크 캐시를 우회해야 한다.
      // 그냥 fetch(event.request)를 쓰면 디스크 캐시에 남아있던 예전 응답을
      // 그대로 다시 캐시에 써넣기 때문에, 배포가 끝났는데도 새로고침할 때마다
      // 옛 화면이 계속 되살아난다 (install 핸들러와 동일한 문제였음).
      const revalidate = sameOrigin
        ? fetch(event.request.url, { cache: "reload" })
        : fetch(event.request);

      const networkFetch = revalidate
        .then((networkResponse) => {
          // 404/500 같은 실패 응답을 캐시에 담아 고착시키지 않는다
          if (sameOrigin && networkResponse && networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      // 캐시가 있으면 즉시 반환하고, 네트워크 응답으로 백그라운드 갱신
      return cachedResponse || networkFetch;
    })
  );
});
