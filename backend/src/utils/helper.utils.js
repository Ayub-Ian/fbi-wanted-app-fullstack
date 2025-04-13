// function buildQuery(params) {
//   return new URLSearchParams(params).toString();
// }

function toQuery(params) {
  const query = new URLSearchParams(params).toString();
  return query ? `?${query}` : "";
}

function applyFilters(list, query) {
  const filterKeys = ["hair", "eye", "race", "name", "keyword", "subject"];
  const activeFilters = filterKeys.filter((key) => query[key]);

  if (activeFilters.length === 0) return list;

  return list.filter((item) => {
    return Object.entries(query).every(([key, value]) => {
      const itemVal = (item[key] || "").toString().toLowerCase();
      return itemVal.includes(value.toLowerCase());
    });
  });
}

module.exports = { toQuery, applyFilters };
