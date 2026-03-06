import dayjs from "dayjs"

import { scheduleCancel } from "../../services/schedule-cancel.js"
import { schedulesDay } from "./load.js"
import { openModal } from "../../libs/modal.js"

const periodMorning = document.getElementById("period-morning")
const periodAfternoon = document.getElementById("period-afternoon")
const periodNight = document.getElementById("period-night")

const employeeLabel = { ana: "Ana", joao: "João", carla: "Carla" }
const serviceLabel = { corte: "Corte", barba: "Barba", corte_barba: "Corte + Barba" }

export function scheduleShow({ dailySchedules }) {
  try {
    periodMorning.innerHTML = ""
    periodAfternoon.innerHTML = ""
    periodNight.innerHTML = ""

    dailySchedules.forEach((schedule) => {
      const item = document.createElement("li")

      const time = document.createElement("strong")
      const info = document.createElement("span")

      item.setAttribute("data-id", schedule.id)

      time.textContent = dayjs(schedule.when).format("HH:mm")

      const employeeText = employeeLabel[schedule.employee] ?? schedule.employee ?? "Funcionário"
      const serviceText = serviceLabel[schedule.service] ?? schedule.service ?? "Serviço"

info.textContent = `${schedule.name} — ${employeeText} • ${serviceText}`

      const cancelIcon = document.createElement("img")
      cancelIcon.classList.add("cancel-icon")
      cancelIcon.setAttribute("src", "./src/assets/cancel.svg")
      cancelIcon.setAttribute("alt", "Cancelar")

      cancelIcon.onclick = () => {
const id = Number(item.getAttribute("data-id"))

  openModal({
    modalTitle: "Cancelar agendamento",
    modalDescription: `${schedule.name} - ${dayjs(schedule.when).format("HH:mm")}`,

    onConfirm: async () => {

      const deleted = await scheduleCancel(id)

      if (deleted) {
        item.remove() 
        const deleted = await scheduleCancel(id)

if (deleted) {
  item.remove() // remove na hora

  const employee = document.getElementById("employee")?.value
  await schedulesDay({ employee }) 
}
      }

    }
  })
}


      item.append(time, info, cancelIcon)

      const hour = dayjs(schedule.when).hour()

      if (hour <= 12) periodMorning.appendChild(item)
      else if (hour > 12 && hour <= 18) periodAfternoon.appendChild(item)
      else periodNight.appendChild(item)
    })
  } catch (error) {
    console.log(error)
    alert("Não foi possível exibir os agendamentos")
  }
}