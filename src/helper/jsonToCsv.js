import { json2csv } from "json-2-csv"

const downloadCSV = (csvContent, fileName) => {
  const element = document.createElement("a")
  const file = new Blob([csvContent], { type: "text/csv;charset=utf-8" })
  element.href = URL.createObjectURL(file)
  element.download = fileName
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export default async function CsvConverter(json) {
  try {
    const modifiedData = json.map(item => {
      const { Status, StartTime, EndTime, ...data } = item
      return data
    })

    console.log(
      "🚀 ~ file: jsonToCsv.js:16 ~ CsvConverter ~ data:",
      modifiedData
    )
    // console.log(data)
    const csv = await json2csv(modifiedData)

    downloadCSV(csv, "output")
  } catch (err) {
    console.log(err)
  }
}
