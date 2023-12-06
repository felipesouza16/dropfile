import type { EditPostFileById, UpdatePostFileInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormPostFile = NonNullable<EditPostFileById['postFile']>

interface PostFileFormProps {
  postFile?: EditPostFileById['postFile']
  onSave: (data: UpdatePostFileInput, id?: FormPostFile['id']) => void
  error: RWGqlError
  loading: boolean
}

const PostFileForm = (props: PostFileFormProps) => {
  const onSubmit = (data: FormPostFile) => {
    props.onSave(data, props?.postFile?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormPostFile> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="url"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Url
        </Label>

        <TextField
          name="url"
          defaultValue={props.postFile?.url}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="url" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PostFileForm
