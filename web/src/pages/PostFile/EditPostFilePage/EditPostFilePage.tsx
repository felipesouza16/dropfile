import EditPostFileCell from 'src/components/PostFile/EditPostFileCell'

type PostFilePageProps = {
  id: number
}

const EditPostFilePage = ({ id }: PostFilePageProps) => {
  return <EditPostFileCell id={id} />
}

export default EditPostFilePage
