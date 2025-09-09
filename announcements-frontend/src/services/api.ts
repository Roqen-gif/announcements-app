import axios from "axios";

// Create axios instance with base configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Announcements API
export const getAnnouncements = async () => {
  try {
    console.log('Fetching announcements from:', `${API_BASE_URL}/announcements`);
    const response = await api.get("/announcements");
    console.log('Announcements response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching announcements:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status
    });
    throw new Error('Failed to fetch announcements');
  }
};

export const getAnnouncement = async (id: number) => {
  try {
    const response = await api.get(`/announcements/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching announcement:', error);
    throw new Error('Failed to fetch announcement');
  }
};

export const createAnnouncement = async (data: {
  title: string;
  content: string;
  publishedDate: string;
  categories: number[];
}) => {
  try {
    const response = await api.post("/announcements", data);
    return response.data;
  } catch (error) {
    console.error('Error creating announcement:', error);
    throw new Error('Failed to create announcement');
  }
};

export const updateAnnouncement = async (id: number, data: {
  title?: string;
  content?: string;
  publishedDate?: string;
  categories?: number[];
}) => {
  try {
    const response = await api.put(`/announcements/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating announcement:', error);
    throw new Error('Failed to update announcement');
  }
};

export const deleteAnnouncement = async (id: number) => {
  try {
    await api.delete(`/announcements/${id}`);
  } catch (error) {
    console.error('Error deleting announcement:', error);
    throw new Error('Failed to delete announcement');
  }
};

export const updateAnnouncementCategories = async (announcementId: number, categoryIds: number[]) => {
  try {
    const response = await api.patch(`/announcements/${announcementId}`, {
      categories: categoryIds,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating announcement categories:', error);
    throw new Error('Failed to update announcement categories');
  }
};

// Categories API
export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
};

export const createCategory = async (data: { name: string }) => {
  try {
    const response = await api.post("/categories", data);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Failed to create category');
  }
};

export const updateCategory = async (id: number, data: { name: string }) => {
  try {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw new Error('Failed to update category');
  }
};

export const deleteCategory = async (id: number) => {
  try {
    await api.delete(`/categories/${id}`);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw new Error('Failed to delete category');
  }
};