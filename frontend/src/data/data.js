export async function wantedListLoader({ request }) {
  const url = new URL(request.url);
  const pageNum = url.searchParams.get("page") || 1;
  const filters = {};

  for (const [key, value] of url.searchParams.entries()) {
    if (Array.isArray(filters[key])) {
      filters[key].push(value);
    } else if (filters[key]) {
      filters[key] = [filters[key], value];
    } else {
      filters[key] = value;
    }
  }

  return getWantedList(pageNum, filters);
}

export async function wantedPersonLoader({ params }) {
  return getWantedPerson(params.uid);
}

export async function getWantedList(pageNum = 1, filters = {}) {
  const params = { page: pageNum, ...filters };
  const query = new URLSearchParams(params).toString();
  try {
    const res = await fetch(`http://localhost:3030/api/wanted?${query}`);
    return res.json();
  } catch (error) {
    console.log(error.message);
  }
}

export async function getWantedPerson(id) {
  try {
    const res = await fetch(`http://localhost:3030/api/wanted/${id}`);
    return res.json();
  } catch (error) {
    console.log(error.message);
  }
}
