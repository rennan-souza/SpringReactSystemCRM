export function sidebarExpand() {
  document.getElementById("header")?.classList.toggle("header-expand")
  document.getElementById("sidebar")?.classList.toggle("sidebar-expand")
  document.getElementById("content")?.classList.toggle("content-expand")
  document.getElementById("sbgc")?.classList.toggle("sidebar-bg-close-expand")
}