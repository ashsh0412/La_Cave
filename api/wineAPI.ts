const BASE_URL = "https://api.sampleapis.com/wines";

export const fetchWinesByType = async (type: string) => {
  const res = await fetch(`${BASE_URL}/${type}`);
  if (!res.ok) throw new Error("Failed to fetch wines");
  return res.json();
};
