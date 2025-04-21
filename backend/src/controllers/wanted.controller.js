const {
  getCachedPage,
  cachePage,
  getCachedObject,
  cacheObject,
} = require("../services/cache");
const wantedService = require("../services/wanted.service");

async function getWantedList(req, res) {
  try {
    const queryKey = new URLSearchParams(req.query).toString();
    let data = getCachedPage(queryKey);

    if (!data) {
      data = await wantedService.getPaginatedList(req.query);
      cachePage(queryKey, data);
    }
    
    res.json({
      total: data.total ,
      items: data.items,
    });
  } catch (err) {
    console.error(err);
    res.status(503).json({ error: "Failed to fetch page from api-server" });
  }
}

async function getWantedItem(req, res) {
  try {
    const { id } = req.params;
    let obj = getCachedObject(id);

    if (!obj) {
      obj = await wantedService.getById(id);
      cacheObject(id, obj);
    }

    res.json(obj);
  } catch (err) {
    if (err.code === 404) {
      res.status(404).json({ error: "Object not found" });
    } else {
      console.error(err);
      res.status(503).json({ error: "Failed to fetch wanted object" });
    }
  }
}

module.exports = { getWantedList, getWantedItem };
