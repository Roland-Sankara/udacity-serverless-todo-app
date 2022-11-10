import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { Types } from 'aws-sdk/clients/s3'

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic

export class AttachmentUtils {
  constructor(
    private readonly s3Client: Types = new XAWS.S3({ signatureVersion: 'v4' }),
    private readonly s3BucketName = process.env.ATTACHMENT_S3_BUCKET,
    private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION
  ) {}

  async generateUploadUrl(todoId: string): Promise<string> {
    const url = this.s3Client.getSignedUrl('putObject', {
      Bucket: this.s3BucketName,
      Key: todoId,
      Expires: +this.urlExpiration
    })

    return url as string
  }
}