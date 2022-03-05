const menu = document.getElementById("menu")
const sidemenu = document.getElementById("side-menu")
const hiddenDiv = document.getElementById("hidden-div")
let state = false

menu.onclick = e => {
  if (!state) {
    sidemenu.classList.remove("close")
    hiddenDiv.classList.remove("close")
    sidemenu.classList.toggle("open")
    hiddenDiv.classList.toggle("open")
    state = true
  } else {
    sidemenu.classList.remove("open")
    hiddenDiv.classList.remove("open")
    hiddenDiv.classList.toggle("close")
    sidemenu.classList.toggle("close")
    state = false
  }
}

hiddenDiv.onclick = () => {
  sidemenu.classList.remove("open")
  hiddenDiv.classList.remove("open")
  hiddenDiv.classList.toggle("close")
  sidemenu.classList.toggle("close")
}
