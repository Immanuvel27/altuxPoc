let config = null;

export const loadConfig = async () => {
  if (!config) {
    const res = await fetch("/config.json");
    config = await res.json();
    console.log("Config loaded:", config);
  }
};

export const getApiUrl = () => {
  if (!config?.API_URL) {
    throw new Error("API_URL missing");
  }
  return config.API_URL;
};
