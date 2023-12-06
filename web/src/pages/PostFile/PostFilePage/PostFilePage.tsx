import PostFileCell from 'src/components/PostFile/PostFileCell'

type PostFilePageProps = {
  id: number
}

const PostFilePage = ({ id }: PostFilePageProps) => {
  return <PostFileCell id={id} />
}

export default PostFilePage
