const redisClient = require("../utils/redisClient");
const { fetchFbiPage } = require("../utils/fetchFbiData");

const PAGE_SIZE = 50;
const REDIS_KEY = "fbi:page:";

async function getWantedPage(page) {
  const key = `${REDIS_KEY}${page}`;
  const cached = await redisClient.get(key);

  if (cached) return JSON.parse(cached);

  const data = await fetchFbiPage(page, PAGE_SIZE);
  await redisClient.set(key, JSON.stringify(data), { EX: 3600 });
  return data;
}

async function getPaginatedResults(page = 1, limit = 20) {
  const fbiPage = Math.ceil((page * limit) / PAGE_SIZE);
  const offset = ((page - 1) * limit) % PAGE_SIZE;

  const data = await getWantedPage(fbiPage);
  const results = data.items.slice(offset, offset + limit);

  return {
    total: data.total,
    page,
    limit,
    results,
  };
}

async function getWantedById(uid) {
  const key = `fbi:item:${uid}`;
  const cached = await redisClient.get(key);

  if (cached) return JSON.parse(cached);

  // TODO: fallback logic to fetch all pages and try to find the uid
  return null;
}

module.exports = {
  getPaginatedResults,
  getWantedById,
};
