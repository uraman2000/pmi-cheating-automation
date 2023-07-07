import Papa from "papaparse"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"

// eslint-disable-next-line react/prop-types
const Dropzone = ({ onFileDrop }) => {
  const handleDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        const reader = new FileReader()
        reader.onload = () => {
          const result = Papa.parse(reader.result, { header: true })
          onFileDrop(result.data)
        }
        reader.readAsText(file)
      })
    },
    [onFileDrop]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  })

  return (
    <div
      {...getRootProps()}
      className={`p-6 border-2 rounded-lg ${
        isDragActive ? "border-blue-400" : "border-gray-400"
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        {isDragActive ? "Drop the files here" : "Drag and drop CSV files here"}
      </p>
    </div>
  )
}

export default Dropzone
