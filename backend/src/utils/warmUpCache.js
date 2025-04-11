const { fetchFbiPage } = require("./fetchFbiData");
const redisClient = require("./redisClient");
const PAGE_SIZE = 50;

async function warmUpFbiCache() {
  const firstPage = await fetchFbiPage(1);
  const totalPages = Math.ceil(firstPage.total / PAGE_SIZE);

  await Promise.all(
    [...Array(totalPages).keys()].map(async (i) => {
      const page = i + 1;
      const data = await fetchFbiPage(page);

      await redisClient.set(`fbi:page:${page}`, JSON.stringify(data), {
        EX: 3600,
      });

      for (const item of data.items) {
        await redisClient.set(`fbi:item:${item.uid}`, JSON.stringify(item), {
          EX: 3600,
        });
      }
    }),
  );

  console.log(`Preloaded ${totalPages} pages into Redis.`);
}
module.exports = warmUpFbiCache;
