const pageCache = new Map(); // key: "page=1&sort=name", value: [results]

const ttl = 1000 * 60 * 5; // 5 minutes

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

module.exports = {
  getCachedPage,
  cachePage,
};
