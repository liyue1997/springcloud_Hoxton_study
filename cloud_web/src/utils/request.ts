/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// const codeMessage = {
//   // 200: '服务器成功返回请求的数据。',
//   // 201: '新建或修改数据成功。',
//   // 202: '一个请求已经进入后台排队（异步任务）。',
//   // 204: '删除数据成功。',
//   // 400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   // 401: '用户没有权限（令牌、用户名、密码错误）。',
//   // 403: '用户得到授权，但是访问是被禁止的。',
//   // 404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   // 406: '请求的格式不可得。',
//   // 410: '请求的资源被永久删除，且不会再得到的。',
//   // 422: '当创建一个对象时，发生一个验证错误。',
//   // 500: '服务器发生错误，请检查服务器。',
//   // 502: '网关错误。',
//   // 503: '服务不可用，服务器暂时过载或维护。',
//   // 504: '网关超时。',
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '系统繁忙',
//   401: '系统繁忙',
//   403: '系统繁忙',
//   404: '系统繁忙',
//   406: '系统繁忙',
//   410: '系统繁忙',
//   422: '系统繁忙',
//   500: '系统繁忙',
//   502: '系统繁忙',
//   503: '系统繁忙',
//   504: '系统繁忙',
// };
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}
export function download(url, options,filename) {
  // url = SERVER_ADDR + url;
  // const defaultOptions = {
  //   credentials: 'include',
  //   headers:options.headers,// getToken() ? { token: getToken() } : {},
  // };
  // const newOptions = { ...defaultOptions, ...options };
  // if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
  //   if (!(newOptions.body instanceof FormData)) {
  //     newOptions.headers = {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json; charset=utf-8',
  //       ...newOptions.headers,
  //     };
  //     newOptions.body = JSON.stringify(newOptions.body);
  //   } else {
  //     // newOptions.body is FormData
  //     newOptions.headers = {
  //       Accept: 'application/json',
  //       ...newOptions.headers,
  //     };
  //   }
  // }
  return fetch(url, options)
    .then(checkStatus)
    .then(res =>
      res.blob().then(blob => {
        const a = document.createElement('a');
        const turl = window.URL.createObjectURL(blob); // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
        a.href = turl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(turl);
      })
    )
    .catch(e => {
      console.log("出错了",e);
      // const { dispatch } = store;
      // const status = e.name;
      // if (status === 401) {
      //   dispatch({
      //     type: 'login/logout',
      //   });
      //   return;
      // }
      // if (status === 403) {
      //   dispatch({
      //     type: 'login/logout',
      //   });
      //   return;
      // }
      // if (status <= 504 && status >= 500) {
      //   if (status === 500) {
      //     dispatch({
      //       type: 'login/logout',
      //     });
      //     return;
      //   }
      //   // dispatch(routerRedux.push('/exception/500'));
      //   message.error('服务器出错了');
      //   return;
      // }
      // if (status >= 404 && status < 422) {
      //   // dispatch(routerRedux.push('/exception/404'));
      //   message.error('请求的链接不存在');
      // }
    });
}



export default request;
