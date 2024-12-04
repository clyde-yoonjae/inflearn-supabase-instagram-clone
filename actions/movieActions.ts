"use server";

import { createServerSupabaseClient } from "utils/supabse/server";

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function searchMovies({ search, page, pageSize }) {
  const supabase = await createServerSupabaseClient();

  const start = (page - 1) * pageSize;
  const end = page * pageSize - 1;

  const { data, count, error } = await supabase
    .from("movie")
    .select("*", { count: "exact" })
    .like("title", `%${search}%`)
    .range(start, end);

  if (error) {
    console.error(error);
    throw error;
  }

  return {
    data: data || [],
    page,
    pageSize,
    totalCount: count || 0,
    hasNextPage: count > page * pageSize,
  };
}

export async function getMovie(id) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("movie")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  handleError(error);

  return data;
}
