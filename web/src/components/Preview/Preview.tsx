/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'

import { useDropzone } from 'react-dropzone'

import './index.css'

const thumbsContainer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
}

const thumb: React.CSSProperties = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
}

const thumbInner: React.CSSProperties = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
}

const img: React.CSSProperties = {
  display: 'block',
  width: 'auto',
  height: '100%',
}

const label: React.CSSProperties = {
  color: '#000',
  width: 60,
  textAlign: 'center',
}

const thumbOut: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: 100,
  padding: 8,
}

type PreviewProps = {
  files: any[]
  setFiles: (arg: any[]) => void
}

const Preview = ({ files, setFiles }: PreviewProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  const thumbs = files.map((file, index) => (
    <section style={thumbOut} key={index}>
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            alt={file.name}
            style={img}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview)
            }}
          />
        </div>
      </div>
      <span style={label}>{file.name}</span>
    </section>
  ))

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="container">
      <div {...getRootProps({ className: 'custom-dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  )
}

export default Preview
