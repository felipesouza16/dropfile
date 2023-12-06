import type { FindPostFiles } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PostFiles from 'src/components/PostFile/PostFiles'

export const QUERY = gql`
  query FindPostFiles {
    postFiles {
      id
      url
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No postFiles yet. '}
      <Link to={routes.newPostFile()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ postFiles }: CellSuccessProps<FindPostFiles>) => {
  return <PostFiles postFiles={postFiles} />
}
