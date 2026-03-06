import { schedulesDay } from "../schedules/load.js"

const selectedDate = document.getElementById("date")
const employeeInput = document.getElementById("employee")

selectedDate.onchange = () => schedulesDay({ employee: employeeInput.value })
employeeInput.onchange = () => schedulesDay({ employee: employeeInput.value })