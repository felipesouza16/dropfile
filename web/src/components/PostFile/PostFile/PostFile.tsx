import type {
  DeletePostFileMutationVariables,
  FindPostFileById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_POST_FILE_MUTATION = gql`
  mutation DeletePostFileMutation($id: Int!) {
    deletePostFile(id: $id) {
      id
    }
  }
`

interface Props {
  postFile: NonNullable<FindPostFileById['postFile']>
}

const PostFile = ({ postFile }: Props) => {
  const [deletePostFile] = useMutation(DELETE_POST_FILE_MUTATION, {
    onCompleted: () => {
      toast.success('PostFile deleted')
      navigate(routes.postFiles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeletePostFileMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete postFile ' + id + '?')) {
      deletePostFile({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            PostFile {postFile.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{postFile.id}</td>
            </tr>
            <tr>
              <th>Url</th>
              <td>{postFile.url}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(postFile.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPostFile({ id: postFile.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(postFile.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default PostFile
