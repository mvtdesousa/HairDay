import dayjs from "dayjs";
import { supabase } from "./supabase.js";

export async function scheduleFetchByDay({ date }) {
  const parsedDate = dayjs(date);

  if (!parsedDate.isValid()) {
    return [];
  }

  const start = parsedDate.startOf("day").toISOString();
  const end = parsedDate.endOf("day").toISOString();

  const { data, error } = await supabase
    .from("schedules")
    .select("*")
    .gte("when", start)
    .lte("when", end)
    .order("when", { ascending: true });

  if (error) throw error;
  return data ?? [];
}
