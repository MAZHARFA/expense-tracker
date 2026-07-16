"use strict";
import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const AUTH_URL = import.meta.env.VITE_AUTH_URL;
import.meta.env.MODE === "development"
  ? "http://localhost:5000/api/auth"
  : "/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, Name, imageUrl) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${AUTH_URL}/signup`, {
        Name,
        email,
        password,
        imageUrl,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },
  logIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${AUTH_URL}/login`, {
        email,
        password,
      });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      toast.error(`User not found for using this  ${email}`);
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${AUTH_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${AUTH_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },
  userProfile: async () => {
    set({ isCheckingAuth: true, error: null });

    try {
      const response = await axios.get(`${AUTH_URL}/get-user`, {
        withCredentials: true,
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      set({
        error: error.response?.data?.message || "Failed to fetch user",
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${AUTH_URL}/forgot-password`, {
        email,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response.data.message || "Error sending reset password email",
      });
      throw error;
    }
  },
  resetPassword: async (Token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${AUTH_URL}/new-password/${Token}`, {
        password,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      throw error;
    }
  },
  uploadImage: async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(`${AUTH_URL}/upload-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading image", error);
      throw error;
    }
  },
}));
