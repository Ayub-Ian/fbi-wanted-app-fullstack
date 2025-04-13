const redisClient = require("../utils/redisClient");
const { fetchFbiPage } = require("../utils/fetchFbiData");
const { toQuery } = require("../utils/helper.utils");

const PAGE_SIZE = 50;
const REDIS_KEY = "fbi:page:";

// async function getWantedPage(page) {
//   const key = `${REDIS_KEY}${page}`;
//   const cached = await redisClient.get(key);

//   if (cached) return JSON.parse(cached);

//   const data = await fetchFbiPage(page, PAGE_SIZE);
//   await redisClient.set(key, JSON.stringify(data), { EX: 3600 });
//   return data;
// }

// async function getPaginatedResults(page = 1, limit = 20) {
//   const fbiPage = Math.ceil((page * limit) / PAGE_SIZE);
//   const offset = ((page - 1) * limit) % PAGE_SIZE;

//   const data = await getWantedPage(fbiPage);
//   const results = data.items.slice(offset, offset + limit);

//   return {
//     total: data.total,
//     page,
//     limit,
//     results,
//   };
// }

// async function getWantedById(uid) {
//   const key = `fbi:item:${uid}`;
//   const cached = await redisClient.get(key);

//   if (cached) return JSON.parse(cached);

//   // TODO: fallback logic to fetch all pages and try to find the uid
//   return null;
// }

const API_BASE = "http://api.fbi.gov/wanted/v1";

async function getPaginatedList(params) {
  const res = await fetch(`${API_BASE}/list${toQuery(params)}`);
  if (!res.ok) throw new Error("Failed to fetch paginated list");
  return await res.json(); // expected to be { items: [], total: 1500, ... }
}

module.exports = {
  getPaginatedList,
};
