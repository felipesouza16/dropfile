import type { FindPostFileById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PostFile from 'src/components/PostFile/PostFile'

export const QUERY = gql`
  query FindPostFileById($id: Int!) {
    postFile: postFile(id: $id) {
      id
      url
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>PostFile not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ postFile }: CellSuccessProps<FindPostFileById>) => {
  return <PostFile postFile={postFile} />
}
