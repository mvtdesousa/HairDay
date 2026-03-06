import { schedulesDay } from "./schedules/load.js"
import { initDropdowns } from "../libs/dropdown.js"

document.addEventListener("DOMContentLoaded", function(){
  schedulesDay(),
  initDropdowns()
})