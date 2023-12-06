import type {
  DeletePostFileMutationVariables,
  FindPostFiles,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/PostFile/PostFilesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_POST_FILE_MUTATION = gql`
  mutation DeletePostFileMutation($id: Int!) {
    deletePostFile(id: $id) {
      id
    }
  }
`

const PostFilesList = ({ postFiles }: FindPostFiles) => {
  const [deletePostFile] = useMutation(DELETE_POST_FILE_MUTATION, {
    onCompleted: () => {
      toast.success('PostFile deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeletePostFileMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete postFile ' + id + '?')) {
      deletePostFile({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Url</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {postFiles.map((postFile) => (
            <tr key={postFile.id}>
              <td>{truncate(postFile.id)}</td>
              <td>{truncate(postFile.url)}</td>
              <td>{timeTag(postFile.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.postFile({ id: postFile.id })}
                    title={'Show postFile ' + postFile.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPostFile({ id: postFile.id })}
                    title={'Edit postFile ' + postFile.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete postFile ' + postFile.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(postFile.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PostFilesList
