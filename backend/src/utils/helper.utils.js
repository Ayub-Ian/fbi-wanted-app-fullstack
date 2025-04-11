function buildQuery(params) {
  return new URLSearchParams(params).toString();
}

module.exports = { buildQuery };
