import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { awsS3 } from 'src/lib/db'

export const getFiles: QueryResolvers['getFiles'] = async () => {
  const response = await awsS3.listObjects({ Bucket: process.env.BUCKET_NAME })
  const listObjects = response.Contents
  const currentListObjects = listObjects.map((x) => ({
    Key: x.Key,
    LastModified: x.LastModified,
    ETag: x.ETag,
    Size: x.Size,
    StorageClass: x.StorageClass,
    Owner: {
      DisplayName: x.Owner.DisplayName,
      ID: x.Owner.ID,
    },
  }))
  return currentListObjects
}

export const postFiles: MutationResolvers['postFiles'] = async ({
  file,
  base64,
}) => {
  const newFile = JSON.parse(file)[0]
  const blob = Buffer.from(base64.split(',')[1], 'base64')

  const response = await awsS3.putObject({
    Bucket: process.env.BUCKET_NAME,
    Key: newFile.name,
    StorageClass: 'STANDARD',
    ContentType: newFile.type,
    Body: blob,
    ACL: 'public-read-write',
  })

  return Boolean(response)
}

export const deleteFile: MutationResolvers['deleteFile'] = async ({
  fileKey,
}) => {
  const response = await awsS3.deleteObject({
    Bucket: process.env.BUCKET_NAME,
    Key: fileKey,
  })

  return Boolean(response)
}
