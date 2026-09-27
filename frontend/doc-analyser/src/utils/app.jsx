const apiRequestCounts = {};

const requestHandler = async (api, setLoading, onSuccess, onError) => {
  try {
    if (typeof api !== "function") {
      throw new Error("API function is not defined");
    }

    setLoading && setLoading(true);

    const response = await api();
    const { data, status } = response || {};

    if (status >= 200 && status < 300) {
      if (data?.success) {
        onSuccess(data);
      } else {
        onSuccess(data); // ← most backends don't return {success:true}, just call onSuccess
      }
    } else {
      onError(data?.detail || data?.message || `Error: ${status}`);
    }
  } catch (error) {
    // Read .detail FIRST (FastAPI default), then .message (fallback)
    const errorMessage =
      error?.response?.data?.detail ||
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong.";

    onError(errorMessage);

    if ([401, 403].includes(error?.response?.status)) {
      console.log("Unauthorized! Token might be invalid or expired.");
    }
  } finally {
    setLoading && setLoading(false);
  }
};

class LocalStorage {
  static isBrowser = typeof window !== "undefined";

  static get(key) {
    if (!LocalStorage.isBrowser) return null;
    const value = localStorage.getItem(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  }

  static set(key, value) {
    if (LocalStorage.isBrowser) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  static remove(key) {
    if (LocalStorage.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  static clear() {
    if (LocalStorage.isBrowser) {
      localStorage.clear();
    }
  }
}

export { requestHandler, LocalStorage };
