import dayjs from "dayjs"

import { scheduleNew } from "../../services/schedule-new.js"
import { schedulesDay } from "../schedules/load.js"
import { openModal } from "../../libs/modal.js"

const form = document.querySelector("form")

const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")
const employeeSelect = document.getElementById("employee")
const serviceSelect = document.getElementById("service")

form.onsubmit = async (event) => {
  event.preventDefault()

  const name = clientName.value.trim()
  if (!name) {
    alert("Informe o nome do cliente!")
    return
  }

  const employee = employeeSelect.value
  if (!employee) {
    alert("Selecione o funcionário!")
    return
  }

  const service = serviceSelect.value
  if (!service) {
    alert("Selecione o serviço!")
    return
  }

  const hourSelected = document.querySelector(".hour-selected")

  if (!hourSelected) {
    alert("Selecione um horário!")
    return
  }

  const selectedHourText = hourSelected.innerText
  const [hour] = selectedHourText.split(":")

  const when = dayjs(selectedDate.value)
    .hour(Number(hour))
    .minute(0)
    .second(0)

 const id = String(Date.now())
const employeeText = document.querySelector('[data-dropdown="employee"] .dropdown-value').textContent
const serviceText = document.querySelector('[data-dropdown="service"] .dropdown-value').textContent
  openModal({
    modalTitle: "Confirmar agendamento",
    modalDescription: 
`Cliente: ${name}
Data: ${dayjs(selectedDate.value).format("DD/MM/YYYY")}
Hora: ${selectedHourText}
Funcionário: ${employeeText}
Serviço: ${serviceText}`,
    onConfirm: async () => {

      try {

        await scheduleNew({
          id,
          name,
          when: when.toISOString(),
          employee,
          service
        })

        await schedulesDay({ employee })

        clientName.value = ""

      } catch (error) {
        console.log(error)
        alert("Não foi possível realizar o agendamento.")
      }

    }
  })
}
