import request from 'umi-request';

export interface ISendInvitionParams {
  name: string;
  email: string;
}
export function sendInvition(data: ISendInvitionParams): Promise<string> {
  return request
  .post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', {
    data,
  })
}
