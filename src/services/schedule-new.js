import { supabase } from "./supabase.js";

export async function scheduleNew({ id, name, when, employee, service }) {
  const { error } = await supabase.from("schedules").insert([
    { id: String(id), name, when, employee, service },
  ]);

  if (error) throw error;
}