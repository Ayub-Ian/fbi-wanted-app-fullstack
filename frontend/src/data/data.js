export async function wantedListLoader() {
  return getWantedList();
}

export async function getWantedList(pageNum = 1) {
  const params = { page: pageNum };
  const query = new URLSearchParams(params).toString();
  try {
    const res = await fetch(`http://localhost:3030/api/wanted?${query}`); // Use the 'query' string here
    return res.json();
  } catch (error) {
    console.log(error.message);
  }
}
