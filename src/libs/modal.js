export function openModal({ modalTitle, modalDescription, onConfirm }) {
  const overlay = document.getElementById("modal-overlay")
  const title = document.getElementById("modal-title")
  const description = document.getElementById("modal-description")
  const btnCancel = document.getElementById("modal-cancel")
  const btnConfirm = document.getElementById("modal-confirm")


  if (!overlay || !title || !description || !btnCancel || !btnConfirm) {
    console.error("Modal não encontrado no DOM. Verifique o HTML e os IDs.")
    alert(modalTitle + "\n\n" + modalDescription)
    const ok = confirm("Confirmar?")
    if (ok && typeof onConfirm === "function") onConfirm()
    return
  }

  title.textContent = modalTitle
  description.textContent = modalDescription

  overlay.classList.remove("hidden")

  const close = () => overlay.classList.add("hidden")

  btnConfirm.onclick = () => {
    close()
    if (typeof onConfirm === "function") onConfirm()
  }

  btnCancel.onclick = () => close()

  // fechar clicando fora
  overlay.onclick = (e) => {
    if (e.target === overlay) close()
  }
}