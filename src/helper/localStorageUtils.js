export const saveStorage = value => {
  localStorage.setItem("apikey", JSON.stringify(value))
}

export const getStorage = () => {
  const value = localStorage.getItem("apikey")
  return value ? JSON.parse(value) : null
}

export const removeFromLocalStorage = key => {
  localStorage.removeItem(key)
}
