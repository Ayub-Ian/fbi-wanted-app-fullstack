function toQuery(params) {
  const query = new URLSearchParams(params).toString();
  return query ? `?${query}` : "";
}


module.exports = { toQuery };
