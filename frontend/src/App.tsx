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
			setUploadError('')
		}
	}

	async function handleUpload() {
		if (!title || !selectedFile) {
			setUploadError('Please enter a lecture title and select a file.')
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

			setTitle('')
			setSelectedFile(null)
		} catch {
			setUploadError('Something went wrong while uploading the lecture.')
		} finally {
			setIsUploading(false)
		}
	}

	return (
		<div className="app">
			<header className="navbar">
				<div className="logo">
					<div className="logo-mark">AI</div>
					<span>Lecture Assistant</span>
				</div>

				<nav>
					<a href="#upload">Upload</a>
					<a href="#about">About</a>
				</nav>
			</header>

			<main>
				<section className="hero">
					<div className="badge">
						<span className="badge-dot"></span>
						AI-powered study assistant
					</div>

					<h1>
						Turn lectures into
						<span> smarter study material.</span>
					</h1>

					<p className="hero-description">
						Upload your university lectures and transform them into searchable, interactive study material.
					</p>
				</section>

				<section className="upload-section" id="upload">
					<div className="upload-card">
						<div className="card-header">
							<div>
								<h2>Upload a lecture</h2>
								<p>Start by uploading an audio or video recording.</p>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="lecture-title">Lecture title</label>

							<input
								id="lecture-title"
								type="text"
								value={title}
								onChange={(event) => setTitle(event.target.value)}
								placeholder="e.g. Operating Systems - Lecture 1"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="lecture-upload">Lecture recording</label>

							<label htmlFor="lecture-upload" className={`file-dropzone ${selectedFile ? 'file-selected' : ''}`}>
								<div className="upload-icon">{selectedFile ? '✓' : '↑'}</div>

								{selectedFile ? (
									<>
										<strong>{selectedFile.name}</strong>
										<span>Click to choose a different file</span>
									</>
								) : (
									<>
										<strong>Choose a lecture recording</strong>
										<span>Audio or video files supported</span>
									</>
								)}
							</label>

							<input id="lecture-upload" type="file" accept="audio/*,video/*" onChange={handleFileChange} hidden />
						</div>

						{uploadError && (
							<div className="error-message">
								<span>!</span>
								{uploadError}
							</div>
						)}

						<button type="button" className="upload-button" onClick={handleUpload} disabled={isUploading}>
							{isUploading ? (
								<>
									<span className="spinner"></span>
									Uploading...
								</>
							) : (
								<>
									Upload Lecture
									<span>→</span>
								</>
							)}
						</button>

						<p className="privacy-note">Your lecture will be processed securely by the application.</p>
					</div>
				</section>

				<section className="features" id="about">
					<div className="feature">
						<div className="feature-icon">01</div>
						<h3>Upload</h3>
						<p>Upload your lecture recording in a few seconds.</p>
					</div>

					<div className="feature">
						<div className="feature-icon">02</div>
						<h3>Process</h3>
						<p>AI processes your lecture and extracts the important information.</p>
					</div>

					<div className="feature">
						<div className="feature-icon">03</div>
						<h3>Study</h3>
						<p>Search, ask questions and revise from your lecture material.</p>
					</div>
				</section>
			</main>

			<footer>
				<span>AI Lecture Assistant</span>
				<span>Built for university students</span>
			</footer>
		</div>
	)
}

export default App
