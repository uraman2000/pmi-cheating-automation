import { useEffect, useState } from "react"
import { getStorage, saveStorage } from "../helper/localStorageUtils"

export default function ApiKey() {
  const [state, setState] = useState({
    value: "",
    isChecked: false,
  })

  const handleInputChange = e => {
    const value = e.target.value
    setState({
      ...state,
      value: value,
    })
  }
  const handleCheckboxChange = e => {
    const value = e.target.checked
    setState({
      ...state,
      isChecked: value,
    })
  }
  useEffect(() => {
    const storedData = getStorage()
    if (storedData) {
      setState(storedData)
    }
  }, [])

  useEffect(() => {
    console.log(state)
    if (state.isChecked) saveStorage(state)
  }, [state])
  return (
    <div className="flex w-full mb-4 justify-center items-center h-auto">
      <input
        value={state.value}
        onChange={handleInputChange}
        className="w-full px-3 py-2 rounded border mr-5 focus-visible:border-slate-600"
        placeholder="Api key"
      />

      <div className="flex items-center w-1/6 h-full">
        <input
          onChange={handleCheckboxChange}
          checked={state.isChecked}
          type="checkbox"
          id="remember"
          className="mr-2 leading-tight"
        />
        <label className="text-sm text-gray-700">Remember me</label>
      </div>
    </div>
  )
}
