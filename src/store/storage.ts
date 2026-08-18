const storage = {
  getItem: async (key: string): Promise<string | null> => {
    return localStorage.getItem(key);
  },

  setItem: async (key: string, value: string): Promise<void> => {
    localStorage.setItem(key, value);
  },

  removeItem: async (key: string): Promise<void> => {
    localStorage.removeItem(key);
  },
};

export default storage;
