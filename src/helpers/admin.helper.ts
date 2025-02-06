import { ICategory, IMenuItem, ApiResponse } from '@/interfaces/Types';

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCategories = async (): Promise<ApiResponse<ICategory[]>> => {
  const res = await fetch(`${APIURL}categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching categories: ${res.statusText}`);
  }

  const data: ICategory[] = await res.json();
  return { data };
};

export const postMenuItem = async (menuItem: IMenuItem): Promise<ApiResponse<IMenuItem>> => {
  const res = await fetch(`${APIURL}menu-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menuItem),
  });

  if (!res.ok) {
    throw new Error(`Error posting menu item: ${res.statusText}`);
  }

  const data: IMenuItem = await res.json();
  return { data };
};