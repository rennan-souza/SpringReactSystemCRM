export function sidebarExpand() {
  document.getElementById("header")?.classList.toggle("header-expand")
  document.getElementById("sidebar")?.classList.toggle("sidebar-expand")
  document.getElementById("content")?.classList.toggle("content-expand")
  document.getElementById("sbgc")?.classList.toggle("sidebar-bg-close-expand")
}

export function removeSidebarExpand() {
  document.getElementById("header")?.classList.remove("header-expand")
  document.getElementById("sidebar")?.classList.remove("sidebar-expand")
  document.getElementById("content")?.classList.remove("content-expand")
  document.getElementById("sbgc")?.classList.remove("sidebar-bg-close-expand")
}