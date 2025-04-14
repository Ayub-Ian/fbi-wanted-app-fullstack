const pageCache = new Map(); // key: "page=1&sort=name", value: [results]
const objectCache = new Map();
const ttl = 1000 * 60 * 60 * 24; // 24 hrs

function getCachedPage(key) {
  const cached = pageCache.get(key);
  if (!cached) return null;

  const { data, timestamp } = cached;
  if (Date.now() - timestamp < ttl) return data;
  pageCache.delete(key);
  return null;
}

function cachePage(key, data) {
  pageCache.set(key, { data, timestamp: Date.now() });
}

function getCachedObject(id) {
  const obj = objectCache.get(id);
  if (!obj) return null;
  const { data, timestamp } = obj;
  if (Date.now() - timestamp < ttl) return data;
  objectCache.delete(key);
  return null;
}

function cacheObject(id, data) {
  objectCache.set(id, { data, timestamp: Date.now() });
}

module.exports = {
  getCachedPage,
  cachePage,
  getCachedObject,
  cacheObject,
};
