# next13-fetch-cache-issue-template

This repo is made in order to help Next.js to replicate this cache issue

Repo structure:

- backend, a simple server that will generate JSON responses with different payload sizes.
- next-app, a simple next app that will generate a page using a fetch request to get data from the backend.

# Important to know

- the next.js pages 'my-app\app\test\[id]\page.jsx' is using server side rendering.
- the fetch used to populate the next.js test pages uses the revalidate option, so the request should be stored in the next.js cache.
- the test next.js pages will request data to the backend, and every request will have a different response payload size.
- the payload size will increase following the increase of the 'id' requested

# Next.js Issue

If the payload is too big, an issue is coaming out:

```
Failed to set fetch cache http://localhost:4000/test_req TypeError: fetch failed
    at Object.fetch (node:internal/deps/undici/undici:11576:11)
    at async globalThis.fetch (D:\Illuminem\old\next13-fetch-cache-issue-template\my-app\node_modules\next\dist\compiled\next-server\app-page.runtime.prod.js:127:62909)
    at async invokeRequest (D:\Illuminem\old\next13-fetch-cache-issue-template\my-app\node_modules\next\dist\server\lib\server-ipc\invoke-request.js:17:12)
    at async invokeIpcMethod (D:\Illuminem\old\next13-fetch-cache-issue-template\my-app\node_modules\next\dist\server\lib\server-ipc\request-utils.js:45:21)
    at async D:\Illuminem\old\next13-fetch-cache-issue-template\my-app\node_modules\next\dist\compiled\next-server\app-page.runtime.prod.js:127:66497 {
  cause: Error: read ECONNRESET
      at TCP.onStreamRead (node:internal/stream_base_commons:217:20)
      at TCP.callbackTrampoline (node:internal/async_hooks:130:17) {
    errno: -4077,
    code: 'ECONNRESET',
    syscall: 'read'
  }
```

- The issue is not present if the cache of the fetch is disabled.
- The issue is present if the cache of the fetch is enabled, and the response payload is approximately more than: 69KB (I'm not sure my calculations are correct)

# How to use that repo

## INIT

- cd backend
- yarn install
- cd my-app
- yarn install

## RUN TEST USE-CASE

- cd backend
- node server.js
- cd my-app
- yarn build

## SETTINGS, how to switch between different use-case

- you should not change the backend
- in order to change the use-case, you should only change that file: 'my-app\app\config.js'

- TEST_PAGE_COUNT --> How many pages to build
- BASE_SIZE --> The JSON response payload size
- REVALIDATE --> Enable/disable fetch cache

The JSON response payload size.
The size real request size increases by: id*BASE_SIZE.
Considering size=id*BASE_SIZE, the size number will generate a JSON with 'size' field.
Considering x as the current field in [0,'size'].
Every field x will be a string with x chars.
Example:

```
id=2;
BASE_SIZE=2;
size=4;
result:{
    id:2,
    test_0:"x",
    test_1:"xx",
    test_2:"xxx",
    test_3:"xxxx"
}
```

if REVALIDATE is true, the fetch will use the cache and the revalidate.
if REVALIDATE is false, the fetch will not use the cache.
