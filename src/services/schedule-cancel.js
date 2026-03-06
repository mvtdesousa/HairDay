import { supabase } from "./supabase.js";

export async function scheduleCancel(id) {
  const { error } = await supabase.from("schedules").delete().eq("id", String(id));
  if (error) throw error;
  return true;
}