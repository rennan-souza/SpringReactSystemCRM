export function sidebarExpand() {
  document.getElementById("sidebar")?.classList.toggle("sidebar-expand");
  document.getElementById("content")?.classList.toggle("content-expand");
  document.getElementById("sidebarContainerClose")?.classList.toggle("sidebar-contaianer-close-expand");
}