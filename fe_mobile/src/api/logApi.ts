// fe_mobile/src/api/logApi.ts
import { API_BASE_URL } from './client';

export interface LogParams {
  painLevel: number;
  memo: string;
  category: 'health' | 'diary' | 'food';
}

export const postLog = async (params: LogParams) => {
  const response = await fetch(`${API_BASE_URL}/logs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      log: { 
        pain_level: params.painLevel, 
        memo: params.memo, 
        category: params.category 
      } 
    }),
  });

  if (!response.ok) {
    throw new Error('서버 통신 실패');
  }

  return await response.json();
};