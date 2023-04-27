import { defHttp, aigcHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';

enum Api {
  VIDEO_MEDIA = '/api/v1/multimode/assets',
  VIDEO_UPLOAD = '/v1/video/upload',
  VIDEO_RESULT = '/v1/task',
}

// interface UploadParams {
//   video_data: File | Blob;
// }
interface UploadApiResult {
  msg: string;
  code: number;
  data?: any;
}
interface TypeVideoResult {
  status: string;
  task_id: string;
  infer_result: {
    skeletonFrames: [][];
  };
}
interface UploadMediaResult {
  msg: string;
  code: number;
  data: {
    id: string;
    url: string;
  };
}

// http://daipops-cv-mocap-svc.dev.dm-ai.com

// 视频上传 /api/v1/video/upload
export function uploadVideo(
  params: UploadFileParams,
  onUploadProgress?: (progressEvent: ProgressEvent) => void,
) {
  return aigcHttp.uploadFile<UploadApiResult>(
    {
      url: Api.VIDEO_UPLOAD,
      baseURL: '/aigc-api',
      onUploadProgress,
    },
    params,
  );
}

// 获取上传视频后的解析结果  /api/v1/task/{task_id}
export function getVideoResult(task_id: string) {
  return aigcHttp.get<TypeVideoResult>({
    url: Api.VIDEO_RESULT + '/' + task_id,
    // baseURL: '/aigc-api',
  });
}

// 上传媒体文件
export function uploadMedia(
  params: UploadFileParams,
  onUploadProgress?: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadMediaResult>(
    {
      url: Api.VIDEO_MEDIA,
      onUploadProgress,
    },
    params,
  );
}
