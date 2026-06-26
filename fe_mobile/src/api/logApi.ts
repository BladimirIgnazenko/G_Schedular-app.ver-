// fe_mobile/src/api/logApi.ts
import { API_BASE_URL } from './client'; // 기존에 설정한 공통 URL

export interface LogParams {
  painLevel: number;
  memo: string;
}

export const postLog = async (params: LogParams) => {
  const response = await fetch(`${API_BASE_URL}/logs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ log: params }),
  });

  if (!response.ok) {
    throw new Error('로그 저장 실패');
  }

  return response.json();
};