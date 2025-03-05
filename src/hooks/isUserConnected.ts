export function isUserConnected() {
  const jwt = localStorage.getItem("jwt");

  if (jwt !== null)
    return true
  else
    return false
}