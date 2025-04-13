const { getCachedPage, cachePage } = require("../services/cache");
const wantedService = require("../services/wanted.service");
const { applyFilters } = require("../utils/helper.utils");

async function getWantedList(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  // try {
  //   const data = await wantedService.getPaginatedResults(page, limit);
  //   res.json(data);
  // } catch (err) {
  //   res.status(500).json({ error: "Failed to fetch wanted data" });
  // }
  try {
    const queryKey = new URLSearchParams(req.query).toString(); // "page=1&sort=name"
    let data = getCachedPage(queryKey);

    if (!data) {
      data = await wantedService.getPaginatedList(req.query);
      cachePage(queryKey, data);
    }

    const filtered = applyFilters(data.items, req.query);
    res.json({
      total: data.total || filtered.length,
      items: filtered,
    });
  } catch (err) {
    console.error(err);
    res.status(503).json({ error: "Failed to fetch page from api-server" });
  }
}

async function getWantedItem(req, res) {
  const { id } = req.params;
  const item = await wantedService.getWantedById(id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
}

module.exports = { getWantedList, getWantedItem };
