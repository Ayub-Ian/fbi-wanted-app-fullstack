const wantedService = require("../services/wanted.service");

async function getWanted(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  try {
    const data = await wantedService.getPaginatedResults(page, limit);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wanted data" });
  }
}

async function getWantedItem(req, res) {
  const { id } = req.params;
  const item = await wantedService.getWantedById(id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
}

module.exports = { getWanted, getWantedItem };
