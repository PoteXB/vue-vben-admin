import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';

enum Api {
  UPLOAD_IMAGE = '/api/v1/virtual/photo/upload',
}

interface UploadMediaResult {
  msg: string;
  code: number;
  data: {
    id: string;
    url: string;
  };
}

// H5上传客户端电子相册
export function h5UploadImage(
  params: UploadFileParams,
  onUploadProgress?: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadMediaResult>(
    {
      url: Api.UPLOAD_IMAGE,
      onUploadProgress,
      timeout: 60 * 1000,
      requestOptions: {
        errorMessageMode: 'none',
      },
    },
    params,
  );
}
