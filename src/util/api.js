const headers = {
  Accept: "*/*",
  "Content-Type": "application/json"
};

const STORAGE_KEY = "travel-advisories-bookmarks";

const getAllAlerts = async () => {
  const response = await fetch(`${import.meta.env.BASE_URL}data/alerts.json`, {
    headers,
    method: "GET"
  });

  if (!response.ok) return [];

  return await response.json();
};

const readLocalBookmarks = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

const writeLocalBookmarks = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const alerts = {
  getSearchData: async () => {
    const data = await getAllAlerts();
    const bookmarks = readLocalBookmarks();
    const bookmarkedCodes = new Set(bookmarks.map(item => item.country_code));

    return data.map(item => ({
      ...item,
      bookmarked: bookmarkedCodes.has(item.country_code)
    }));
  },

  getOne: async (code) => {
    const data = await getAllAlerts();
    const found = data.find(item => item.country_code === code);
    if (!found) return null;

    const bookmarks = readLocalBookmarks();
    const bookmarked = bookmarks.some(item => item.country_code === code);

    return {
      ...found,
      bookmarked
    };
  },

  setBookmark: async (code, bookmarked) => {
    const data = await getAllAlerts();
    const found = data.find(item => item.country_code === code);

    if (!found) {
      return { ok: false };
    }

    let bookmarks = readLocalBookmarks();

    if (bookmarked) {
      const exists = bookmarks.some(item => item.country_code === code);
      if (!exists) {
        bookmarks.unshift({
          ...found,
          bookmarked: true,
          bookmarked_at: new Date().toISOString()
        });
      }
    } else {
      bookmarks = bookmarks.filter(item => item.country_code !== code);
    }

    writeLocalBookmarks(bookmarks);
    return { ok: true };
  },

  getBookmarks: async () => {
    return readLocalBookmarks();
  }
};

const util = {
  refreshDatabase: async () => {
    return { ok: true };
  }
};

export {
  util,
  alerts
};