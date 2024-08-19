import { DEFAULT_PAGINATION } from "../utils/staticConstants";

const URL = `${import.meta.env.VITE_REFERRAL_DOMAIN}:${
  import.meta.env.VITE_REFERRAL_PORT
}${import.meta.env.VITE_REFERRAL_ENDPOINT}`;

const HEADERS = {
  "Content-Type": "application/json",
};

export const createReferral = async (payload) => {
  try {
    const response = await fetch(`${URL}/create`, {
      method: "POST",
      body: payload
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getReferals = async (pagination = DEFAULT_PAGINATION) => {
  try {
    const params = new URLSearchParams({
      page: pagination.page,
      limit: pagination.limit,
    });
    const response = await fetch(`${URL}?${params.toString()}`, {
      method: "GET",
      headers: HEADERS,
    });

    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      error,
    };
  }
};

export const updateReferralById = async (id, payload) => {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "PUT",
      body: payload
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error };
  }
};

export const deleteReferralById = async (id) => {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE",
      headers: HEADERS,
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      error,
    };
  }
};
