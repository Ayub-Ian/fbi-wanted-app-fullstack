export async function wantedListLoader() {
  return getWantedList();
}

export async function wantedPersonLoader({ params }) {
  return getWantedPerson(params.uid);
}

export async function getWantedList(pageNum = 1) {
  const params = { page: pageNum };
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
