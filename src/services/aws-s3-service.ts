// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/
import {
  S3Client,
  ListObjectsCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  CopyObjectCommand,
  GetObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/ListObjectsCommand
export const fetchBucketObjects = async (
  bucketName: string,
  s3Instance: S3Client,
): Promise<any> => {
  const input = {
    Bucket: bucketName,
  };

  const command = new ListObjectsCommand(input);
  const response = await s3Instance.send(command);

  return response;
};

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/ListObjectsCommand/
/**
 * NOTE: without trailing `/` in the `prefix`, objects will be fetched from `/prefix*` instead of `/prefix` exact
 */
export const fetchBucketObjectsByPrefix = async (
  bucketName: string,
  prefix: string,
  s3Instance: S3Client,
): Promise<any> => {
  const input = {
    Bucket: bucketName,
    Region: process.env.AWS_S3_REGION,
    Prefix: prefix,
  };

  const command = new ListObjectsCommand(input);
  const response = await s3Instance.send(command);

  return response;
};

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/DeleteObjectCommand/
/**
 * NOTE: without trailing `/` in the `key`, the delete will occur against `/key*` instead of `/key` exact
 */
export const deleteBucketObjectByKey = async (
  bucket: string,
  key: string,
  s3Instance: S3Client,
): Promise<any> => {
  const input = {
    Bucket: 'examplebucket',
    Key: 'objectkey.jpg',
  };

  const command = new DeleteObjectCommand(input);
  const response = await s3Instance.send(command);
};

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/PutObjectCommand/
export const uploadMedia = async (
  bucketName: string,
  keyName: string,
  body: any,
  fileName: string,
  s3Instance: S3Client,
  contentType?: 'image/jpeg' | 'image/jpg' | 'image/png' | 'application/pdf',
  contentEncoding?: string,
): Promise<any> => {
  const input: PutObjectCommandInput = {
    Body: body,
    Bucket: bucketName,
    ContentType: contentType,
    ContentEncoding: contentEncoding,
    Key: keyName,
    ContentLength: body.data.length,
    Metadata: {
      'x-amz-meta-filename': 'test',
    },
  };

  const command = new PutObjectCommand(input);
  const response = await s3Instance.send(command);

  return response;
};

export const fetchSignedUrl = async (
  bucketName: string,
  keyName: string,
  s3Instance: S3Client,
): Promise<any> => {
  const params = {
    Bucket: bucketName,
    Key: keyName,
  };

  try {
    const command = new GetObjectCommand(params);
    const signedUrl = await getSignedUrl(s3Instance, command, {
      expiresIn: 3600,
    });

    return signedUrl;
  } catch (err) {
    console.log('fetchSignedUrl', fetchSignedUrl);
  }
};

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
  },
): Promise<any> => {
  const input = {
    Bucket: 'destinationbucket',
    CopySource: '/sourcebucket/HappyFacejpg',
    Key: 'HappyFaceCopyjpg',
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
};

export const deleteBucketObject = async (
  bucketName: string,
  keyName: string,
  s3Instance: S3Client,
): Promise<any> => {
  const input = {
    Bucket: bucketName,
    Key: keyName,
  };

  const command = new DeleteObjectCommand(input);
  const response = await s3Instance.send(command);

  return response;
};

export const createS3Instance = async (): Promise<S3Client> => {
  return new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    },
    region: process.env.AWS_S3_REGION,
  });
};

export const fetchObjectsByKey = async (
  bucketName: string,
  listContents: any[],
  s3Instance: S3Client,
): Promise<any> => {
  const promises = [];

  if (listContents) {
    for (let i = 0; i < listContents.length; i++) {
      const key = listContents[i].Key;

      promises.push(await fetchSignedUrl(bucketName, key, s3Instance));
    }
  }

  const images = await Promise.all(promises);

  return images;
};

export const generateKey = (userId: string, fileName: string) => {
  const timestamp = Date.now();
  const extension = fileName.split('.').pop();

  return `${userId}/images/${timestamp}.${extension}`;
};
