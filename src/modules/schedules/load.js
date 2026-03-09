import dayjs from "dayjs"
import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js"
import { scheduleShow } from "./show.js"
import { hoursLoad } from "../form/hours-load.js"

const selectedDate = document.getElementById("date")
const selectedEmployee = document.getElementById("employee")

export async function schedulesDay({ employee } = {}) {
  if (!selectedDate.value) {
    selectedDate.value = dayjs().format("YYYY-MM-DD")
  }

  const date = selectedDate.value
  const currentEmployee = employee ?? selectedEmployee?.value

  const dailySchedules = (await scheduleFetchByDay({ date })) ?? []
  scheduleShow({ dailySchedules })              
  hoursLoad({ date, dailySchedules, employee: currentEmployee }) 
}
