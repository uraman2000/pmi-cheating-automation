import { useEffect, useState } from "react"
import postRequest from "./apiRequest/apiReqest"
import Dropzone from "./components/Dropzone"
import Check from "./components/Check"
import Loading from "./components/Loading"
import CsvConverter from "./helper/jsonToCsv"
import ApiKey from "./components/ApiKey"
const todos = [
  {
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
]
const App = () => {
  const [csvData, setCsvData] = useState([])
  const [headers, setHeades] = useState([])
  const [isColumVisible, setIsColumVisible] = useState([
    true,
    false,
    true,
    true,
    true,
  ])
  const [isButtonDisable, setIsButtonDisable] = useState(true)

  const handleFileDrop = data => {
    if (data.length <= 0) return
    const heads = Object.keys(data[0]).map(header => header)

    setHeades(heads)
    const filteredData = data.filter(i => i[heads[0]] !== "")

    setCsvData(filteredData)
    setIsButtonDisable(false)
  }

  const submit = async () => {
    sendRequestsSequentially(csvData)
  }

  const sendRequestsSequentially = async words => {
    setIsButtonDisable(true)

    let requestCounter = 0
    const requestLimit = 3
    const interval = 60000 // 1 minute in milliseconds

    let data = csvData
    for (const word of words) {
      if (requestCounter >= requestLimit) {
        console.log("Request limit reached. Please wait for the next minute.")
        console.log(interval)
        await setTimeout(() => {
          requestCounter = 0 // Reset the request counter
          console.log("Request limit reset. You can make new requests now.")
        }, interval)
      }
      try {
        data = data.map(item =>
          item === word
            ? {
                ...item,
                Status: "loading",
                StartTime: new Date().toLocaleTimeString(),
              }
            : item
        )
        setCsvData(data)
        const response = await postRequest(word[headers[0]])
        // console.log(response)

        data = data.map(item =>
          item.Status === "loading"
            ? {
                ...item,
                [headers[1]]: response,
                Status: "done",
                EndTime: new Date().toLocaleTimeString(),
              }
            : item
        )
        console.log(
          "🚀 ~ file: App.jsx:70 ~ sendRequestsSequentially ~ data:",
          data
        )
        setCsvData(data)
        // Increment the request counter
        requestCounter++
      } catch (error) {
        console.error(error)
      }

      if (requestCounter >= requestLimit) {
        setTimeout(() => {
          requestCounter = 0 // Reset the request counter after 1 minute
        }, interval)
      }
    }
    setIsButtonDisable(false)
  }

  const downLoad = () => {
    CsvConverter(csvData)
  }

  return (
    <div className="container mx-auto p-4">
      <ApiKey />
      <h1 className="text-2xl font-bold mb-4">Drag and Drop CSV File</h1>
      <Dropzone onFileDrop={handleFileDrop} />

      <div className="flex justify-end">
        <button
          onClick={submit}
          disabled={isButtonDisable}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-blue-500"
        >
          Run
        </button>

        <button
          onClick={downLoad}
          // disabled={isDownloadDisable}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-green-500 ml-6"
        >
          Download
        </button>
      </div>
      {csvData.length > 0 && (
        <table className="mt-4  w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">#</th>
              {Object.keys(csvData[0]).map((header, index) => (
                <th key={index} className="border px-4 py-2">
                  <div className="flex justify-between">
                    {header}
                    <input
                      type="checkbox"
                      checked={isColumVisible[index]}
                      onChange={() =>
                        setIsColumVisible(prevArray => {
                          const newArray = [...prevArray] // Create a copy of the original array
                          newArray[index] = !isColumVisible[index] // Modify the desired index
                          return newArray // Return the updated array as the new state
                        })
                      }
                      className="cursor-pointer text-indigo-600 h-5 w-5"
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index}</td>
                {Object.values(row).map((value, index) => (
                  <td key={index} className="border px-4 py-2">
                    {value === "loading" && <Loading />}
                    {value === "done" && <Check />}
                    {value !== "loading" &&
                      value !== "done" &&
                      isColumVisible[index] &&
                      value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App
