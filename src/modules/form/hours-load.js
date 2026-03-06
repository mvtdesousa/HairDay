import dayjs from "dayjs"
import { openingHours } from "../../utils/opening-hours.js"
import { hoursClick } from "./hours-click.js"

const hours = document.getElementById("hours")

export function hoursLoad({ date, dailySchedules, employee }) {
  hours.innerHTML = ""

  // garante array
  const safeDailySchedules = Array.isArray(dailySchedules) ? dailySchedules : []

 const filteredByEmployee = employee
  ? safeDailySchedules.filter((s) => s.employee === employee)
  : safeDailySchedules

const unavailableHours = filteredByEmployee.map((schedule) =>
  dayjs(schedule.when).format("HH:mm")
)
  // ✅ Regras de fim de semana
  const blockedByWeekRules = new Set()
  const weekDay = dayjs(date).day() // 0=domingo, 6=sábado

  // Domingo: bloqueia todos
  if (weekDay === 0) {
    openingHours.forEach((h) => blockedByWeekRules.add(normalizeHour(h)))
  }

  // Sábado: bloqueia após 18:00 (19,20,21)
  if (weekDay === 6) {
    ;["19:00", "20:00", "21:00"].forEach((h) => blockedByWeekRules.add(h))
  }

  const opening = openingHours.map((hourRaw) => {
    const hour = normalizeHour(hourRaw)
    const [scheduleHour] = hour.split(":")

    const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs())

    const blockedByRules = blockedByWeekRules.has(hour)
    const available =
      !unavailableHours.includes(hour) &&
      !isHourPast &&
      !blockedByRules

    return { hour: hourRaw, available } // mantém visual como estava (ex: "9:00")
  })

  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li")

    li.classList.add("hour")
    li.classList.add(available ? "hour-available" : "hour-unavailable")

    li.textContent = hour

    if (hour === "9:00") {
      hourHeaderAdd("Manhã")
    } else if (hour === "13:00") {
      hourHeaderAdd("Tarde")
    } else if (hour === "18:00") {
      hourHeaderAdd("Noite")
    }

    hours.append(li)
  })

  hoursClick()
}

function hourHeaderAdd(title) {
  const header = document.createElement("li")

  header.classList.add("hour-period")
  header.textContent = title

  hours.append(header)
}

// Normaliza "9:00" -> "09:00" pra comparar corretamente com HH:mm do dayjs
function normalizeHour(hour) {
  const [h, m] = hour.split(":")
  return `${String(h).padStart(2, "0")}:${m}`
}