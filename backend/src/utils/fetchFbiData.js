const { buildQuery } = require("./helper.utils");

const BASE_URL = "https://api.fbi.gov/@wanted";

async function fetchFbiPage(page = 1, pageSize = 50) {
  const query = buildQuery({
    page,
    pageSize,
    sort_order: "desc",
    sort_on: "modified",
  });

  const res = await fetch(`${BASE_URL}?${query}`);
  return await res.json();
}

module.exports = { fetchFbiPage };
