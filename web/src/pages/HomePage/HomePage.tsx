import { useState } from 'react'

import { MetaTags, useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import './index.css'

import { Trash } from 'src/assets/Trash'
import Preview from 'src/components/Preview/Preview'

const GET_FILES = gql`
  query GetFiles {
    getFiles {
      Key
      LastModified
      ETag
      Size
      StorageClass
      Owner {
        DisplayName
        ID
      }
    }
  }
`

const POST_FILE = gql`
  mutation PostFile($file: String!, $base64: String!) {
    postFiles(file: $file, base64: $base64)
  }
`
const DELETE_FILE = gql`
  mutation DeleteFile($fileKey: String!) {
    deleteFile(fileKey: $fileKey)
  }
`

const HomePage = () => {
  const [files, setFiles] = useState([])
  const { data, refetch } = useQuery(GET_FILES)
  const [postFile] = useMutation(POST_FILE, {
    onCompleted: () => {
      refetch()
    },
  })
  const [deleteFile] = useMutation(DELETE_FILE, {
    onCompleted: () => {
      refetch()
    },
  })

  const handleSave = () => {
    if (files.length === 0) {
      toast.error('Cannot send empty file list.')
      return
    }

    const currentObjects = files.map((file) => ({
      path: file.path,
      preview: file.preview,
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      name: file.name,
      size: file.size,
      type: file.type,
      webkitRelativePath: file.webkitRelativePath,
    }))

    const stringfyObjects = JSON.stringify(currentObjects)
    const reader = new FileReader()

    reader.onloadend = () => {
      const base64String = reader.result
      postFile({ variables: { file: stringfyObjects, base64: base64String } })
    }

    reader.readAsDataURL(files[0])
    setFiles([])
  }

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <Preview files={files} setFiles={setFiles} />
      <div className="container-button">
        <button type="button" onClick={handleSave} className="button-save">
          Save
        </button>
      </div>
      <section className="container-contents">
        {data?.getFiles?.map((file, index) => {
          return (
            <div className="container-image" key={index}>
              <img
                src={`https://dropfile-project.s3.sa-east-1.amazonaws.com/${file.Key}`}
                alt={file}
                className="image"
              />
              <button
                onClick={() => deleteFile({ variables: { fileKey: file.Key } })}
                type="button"
                className="button-trash"
              >
                <Trash />
              </button>
            </div>
          )
        })}
      </section>
    </>
  )
}

export default HomePage
