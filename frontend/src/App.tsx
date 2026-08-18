import { useState } from 'react'
import './App.css'

function App() {
  // for file selection, initialise as null - no file selected yet
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  // selectedFile = the file they selected or null

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    // event.target.files - array of files selected, we only want the first one

    if (file) {
      setSelectedFile(file) // update react state with the selected file
    }
  }

  return (
    <main>
      <h1>AI Lecture Assistant</h1>

      <p>
        Turn your university lectures into searchable and interactive study
        material.
      </p>

      <label htmlFor="lecture-upload">Upload Lecture</label>

      <input
        id="lecture-upload"
        type="file"
        accept="audio/*,video/*"
        onChange={handleFileChange}
      />

      {selectedFile && (
        <p>
          Selected file: <strong>{selectedFile.name}</strong>
        </p>
      )}
    </main>
  )
}

export default App