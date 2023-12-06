import type { EditPostFileById, UpdatePostFileInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PostFileForm from 'src/components/PostFile/PostFileForm'

export const QUERY = gql`
  query EditPostFileById($id: Int!) {
    postFile: postFile(id: $id) {
      id
      url
      createdAt
    }
  }
`
const UPDATE_POST_FILE_MUTATION = gql`
  mutation UpdatePostFileMutation($id: Int!, $input: UpdatePostFileInput!) {
    updatePostFile(id: $id, input: $input) {
      id
      url
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ postFile }: CellSuccessProps<EditPostFileById>) => {
  const [updatePostFile, { loading, error }] = useMutation(
    UPDATE_POST_FILE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PostFile updated')
        navigate(routes.postFiles())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdatePostFileInput,
    id: EditPostFileById['postFile']['id']
  ) => {
    updatePostFile({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit PostFile {postFile?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PostFileForm
          postFile={postFile}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
