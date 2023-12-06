import type { CreatePostFileInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PostFileForm from 'src/components/PostFile/PostFileForm'

const CREATE_POST_FILE_MUTATION = gql`
  mutation CreatePostFileMutation($input: CreatePostFileInput!) {
    createPostFile(input: $input) {
      id
    }
  }
`

const NewPostFile = () => {
  const [createPostFile, { loading, error }] = useMutation(
    CREATE_POST_FILE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PostFile created')
        navigate(routes.postFiles())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreatePostFileInput) => {
    createPostFile({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New PostFile</h2>
      </header>
      <div className="rw-segment-main">
        <PostFileForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPostFile
