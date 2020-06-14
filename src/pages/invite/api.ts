import request from 'umi-request';

export function sendInvition(data: any): Promise<string> {
  return request
  .post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', {
    data,
  })
}
