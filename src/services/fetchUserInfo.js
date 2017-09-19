import request from '../utils/request';

export async function fetchUserInfo() {
  return request('/index.php/Home/Confirm', {
    method: 'get',
    credentials: 'same-origin', // credentials: 'include' 设置允许跨域发送cookie
  });
}
export async function getFileInfo() {
  return request('/index.php/Home/Confirm/allfile', {
    method: 'get',
    credentials: 'same-origin', // credentials: 'include' 设置允许跨域发送cookie
  });
}
export async function getBasicInfo() {
  return request('/index.php/Home/BasicInfo/get_info', {
    method: 'get',
    credentials: 'same-origin', // credentials: 'include' 设置允许跨域发送cookie
  });
}
