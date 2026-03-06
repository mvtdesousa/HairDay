import dayjs from "dayjs";
import { supabase } from "./supabase.js";

export async function scheduleFetchByDay({ date }) {
  const start = dayjs(date).startOf("day").toISOString();
  const end = dayjs(date).endOf("day").toISOString();

  const { data, error } = await supabase
    .from("schedules")
    .select("*")
    .gte("when", start)
    .lte("when", end)
    .order("when", { ascending: true });

  if (error) throw error;
  return data ?? [];
}