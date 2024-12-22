// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/
import { S3Client, ListObjectsCommand, DeleteObjectCommand, PutObjectCommand, CopyObjectCommand } from '@aws-sdk/client-s3';

// // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/ListObjectsCommand
export const fetchBucketObjects = async (bucketName: string, s3Instance: S3Client): Promise<any> => {
  const input = { // ListObjectsRequest
    "Bucket": "examplebucket"
  };
  const command = new ListObjectsCommand(input);
  const response = await s3Instance.send(command);
  
  // const objs = await new Promise((resolve, reject) => {
  //   s3Instance.send(
  //     {
  //       Bucket: bucketName
  //     },
  //     (err, data) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(
  //           data.Contents.filter(obj => {
  //             return obj;
  //           })
  //         );
  //       }
  //     }
  //   );

  //   return objs;
  // });
}

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/ListObjectsCommand/
/**
 * NOTE: without trailing `/` in the `prefix`, objects will be fetched from `/prefix*` instead of `/prefix` exact
 */
export const fetchBucketObjectsByPrefix = async(bucketName: string, prefix: string, s3Instance: S3Client): Promise<any> => {
  const input = {
    "Bucket": "examplebucket",
    "MaxKeys": 2,
    Prefix: "STRING_VALUE",
  };
  const command = new ListObjectsCommand(input);
  const response = await s3Instance.send(command);
  // const objs = await new Promise((resolve, reject) => {
  //   s3Instance.listObjects(
  //     {
  //       Bucket: bucketName,
  //       Prefix: prefix
  //     },
  //     (err, data) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(
  //           data.Contents.filter(obj => {
  //             return obj;
  //           })
  //         );
  //       }
  //     }
  //   );
  // });

  // return objs;
}

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/DeleteObjectCommand/
/**
 * NOTE: without trailing `/` in the `key`, the delete will occur against `/key*` instead of `/key` exact
 */
export const deleteBucketObjectByKey = async (bucket: string, key: string, s3Instance: S3Client): Promise<any> => {
  const input = {
    "Bucket": "examplebucket",
    "Key": "objectkey.jpg"
  };
  const command = new DeleteObjectCommand(input);
  const response = await s3Instance.send(command);
  // return new Promise((resolve, reject) => {
  //   s3Instance.deleteObject(
  //     {
  //       Bucket: bucket,
  //       Key: key
  //     },
  //     (err, data) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(data);
  //       }
  //     }
  //   );
  // });
}

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/PutObjectCommand/
export const addMediaBucketObject = async(
  bucketName: string,
  keyName: string,
  fileExtension: string,
  body: any,
  s3Instance: S3Client,
  contentType?: 'image/jpeg' | 'image/jpg' | 'image/png' | 'application/pdf',
  contentEncoding?: 'base64',
  fileName?: string
): Promise<any> => {
  const input = {
  "Body": "HappyFace.jpg",
  "Bucket": "examplebucket",
  "Key": "HappyFace.jpg",
  // "ServerSideEncryption": "AES256",
  // "StorageClass": "STANDARD_IA"
};
  const command = new PutObjectCommand(input);
  const response = await s3Instance.send(command);
  // const obj = await new Promise((resolve, reject) => {
  //   s3Instance.putObject(
  //     {
  //       Bucket: bucketName,
  //       Key: keyName + '.' + fileExtension,
  //       Body: body,
  //       ContentType: contentType || null,
  //       ContentEncoding: contentEncoding || null,
  //       Metadata: {
  //         'x-amz-meta-filename': fileName
  //       }
  //     },
  //     (err, data) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(data);
  //       }
  //     }
  //   );
  // });

  // return obj;
// }

// export const getSignedUrl = async(bucketName: string, keyName: string, s3Instance: S3Client): Promise<any> => {
//   const url = await new Promise((resolve, reject) => {
//     s3Instance.getSignedUrl(
//       'getObject',
//       {
//         Bucket: bucketName,
//         Key: keyName
//       },
//       (err, url) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(url);
//         }
//       }
//     );
//   });

//   return url;
}

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/CopyObjectCommand/
export const copyObject = async (
  sourceBucket: string,
  sourceKey: string,
  destinationBucket: string,
  destinationKey: string,
  s3Instance: S3Client,
  isFolder: boolean,
  _options?: {
    'x-amz-meta-filename': string;
    fileName: any;
  }
): Promise<any> => {
  const input = {
    "Bucket": "destinationbucket",
    "CopySource": "/sourcebucket/HappyFacejpg",
    "Key": "HappyFaceCopyjpg"
  };
  const command = new CopyObjectCommand(input);
  const response = await s3Instance.send(command);
  // const options: any = {};

  // if (_options && _options.fileName) {
  //   options['x-amz-meta-filename'] = _options.fileName;
  //   options.fileName = _options.fileName;
  // }
  // return new Promise((resolve, reject) => {
  //   s3Instance.copyObject(
  //     {
  //       Bucket: destinationBucket,
  //       CopySource: sourceBucket + '/' + sourceKey,
  //       Key: destinationKey,
  //       Metadata: options || null,
  //       // Needs to be COPY if the object being renamed is a folder or else
  //       // the metadata for the files inside the folder will be reset
  //       MetadataDirective: isFolder ? 'COPY' : 'REPLACE'
  //     },
  //     (err, data) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(data);
  //       }
  //     }
  //   );
  // });
}

export const createS3Instance = async (): Promise<S3Client> => {
  return new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    },
    region: process.env.AWS_REGION,
  });
}
