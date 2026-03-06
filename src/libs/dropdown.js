export function initDropdowns () {
  const dropdowns = document.querySelectorAll(".dropdown")

  function closeAll(except = null) {
    dropdowns.forEach(d => {
      if (d !== except) d.classList.remove("open")
      const btn = d.querySelector(".dropdown-trigger")
      if (btn) btn.setAttribute("aria-expanded", d.classList.contains("open") ? "true" : "false")
    })
  }

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".dropdown-trigger")
    const menu = dropdown.querySelector(".dropdown-menu")
    const valueEl = dropdown.querySelector(".dropdown-value")
    const hiddenInput = dropdown.querySelector('input[type="hidden"]')
    const items = Array.from(dropdown.querySelectorAll(".dropdown-item"))

    dropdown.dataset.empty = hiddenInput?.value ? "false" : "true"

    function setActiveByIndex(idx) {
      items.forEach((it, i) => {
        it.classList.toggle("active", i === idx)
      })
    }

    function selectItem(item) {
      const value = item.dataset.value
      const label = item.textContent.trim()

      if (hiddenInput) hiddenInput.value = value
      if (valueEl) valueEl.textContent = label

      dropdown.dataset.empty = "false"


      items.forEach(it => it.setAttribute("aria-selected", it === item ? "true" : "false"))

      dropdown.classList.remove("open")
      trigger?.setAttribute("aria-expanded", "false")


      hiddenInput?.dispatchEvent(new Event("change", { bubbles: true }))
    }

    trigger?.addEventListener("click", () => {
      const willOpen = !dropdown.classList.contains("open")
      closeAll(dropdown)
      dropdown.classList.toggle("open", willOpen)
      trigger.setAttribute("aria-expanded", willOpen ? "true" : "false")
      if (willOpen) setActiveByIndex(0)
    })

    items.forEach((item) => {
      item.addEventListener("click", () => selectItem(item))
    })


    trigger?.addEventListener("keydown", (e) => {
      const isOpen = dropdown.classList.contains("open")
      const activeIndex = items.findIndex(it => it.classList.contains("active"))
      const currentIndex = activeIndex >= 0 ? activeIndex : 0

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        if (!isOpen) {
          closeAll(dropdown)
          dropdown.classList.add("open")
          trigger.setAttribute("aria-expanded", "true")
          setActiveByIndex(0)
        } else {
          selectItem(items[currentIndex])
        }
      }

      if (e.key === "Escape") {
        dropdown.classList.remove("open")
        trigger.setAttribute("aria-expanded", "false")
      }

      if (!isOpen) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActiveByIndex(Math.min(currentIndex + 1, items.length - 1))
      }

      if (e.key === "ArrowUp") {
        e.preventDefault()
        setActiveByIndex(Math.max(currentIndex - 1, 0))
      }
    })
  })


  document.addEventListener("click", (e) => {
    const clickedInside = e.target.closest?.(".dropdown")
    if (!clickedInside) closeAll()
  })
}