const { toQuery } = require("../utils/helper.utils");

const API_BASE = "http://api.fbi.gov/wanted/v1";

async function getPaginatedList(params) {
  const res = await fetch(`${API_BASE}/list${toQuery(params)}`);
  if (!res.ok) throw new Error("Failed to fetch paginated list");
  return await res.json();
}

async function getById(id) {
  const res = await fetch(`${API_BASE}/object/${id}`);
  if (res.status === 404) {
    const err = new Error("Not found");
    err.code = 404;
    throw err;
  }
  if (!res.ok) throw new Error("Failed to fetch object");
  return await res.json();
}

module.exports = {
  getPaginatedList,
  getById,
};
