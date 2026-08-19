import { useState } from 'react'
import './App.css'

function App() {
	const [title, setTitle] = useState('')
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [isUploading, setIsUploading] = useState(false)
	const [uploadError, setUploadError] = useState('')

	function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0]

		if (file) {
			setSelectedFile(file)
		}
	}

	async function handleUpload() {
		if (!title || !selectedFile) {
			return
		}

		setIsUploading(true)
		setUploadError('')

		try {
			const formData = new FormData()

			formData.append('title', title)
			formData.append('file', selectedFile)

			const response = await fetch('http://localhost:8000/lectures', {
				method: 'POST',
				body: formData
			})

			if (!response.ok) {
				throw new Error('Upload failed')
			}

			const data = await response.json()

			console.log(data)
		} catch {
			setUploadError('Something went wrong while uploading the lecture.')
		} finally {
			setIsUploading(false)
		}
	}

	return (
		<main>
			<h1>AI Lecture Assistant</h1>

			<p>Turn your university lectures into searchable and interactive study material.</p>

			<label htmlFor="lecture-title">Lecture title</label>

			<input
				id="lecture-title"
				type="text"
				value={title}
				onChange={(event) => setTitle(event.target.value)}
				placeholder="e.g. Operating Systems - Lecture 1"
			/>

			<label htmlFor="lecture-upload">Upload Lecture</label>

			<input id="lecture-upload" type="file" accept="audio/*,video/*" onChange={handleFileChange} />

			<button type="button" onClick={handleUpload} disabled={isUploading}>
				{isUploading ? 'Uploading...' : 'Upload Lecture'}
			</button>
			{uploadError && <p>{uploadError}</p>}

			{selectedFile && (
				<p>
					Selected file: <strong>{selectedFile.name}</strong>
				</p>
			)}
		</main>
	)
}

export default App
