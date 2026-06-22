// fe_mobile/src/api/userApi.ts
import apiClient from './client';

export interface UserUpdateParams {
  nickname?: string;
  interest?: string;
  healthStatus?: string;
}

/**
 * 사용자 정보 조회
 */
export const fetchUserProfile = async () => {
  return await apiClient('/users/profile', { method: 'GET' });
};

/**
 * 사용자 정보 업데이트
 */
export const updateProfile = async (userData: UserUpdateParams) => {
  return await apiClient('/users/update', {
    method: 'PATCH',
    body: JSON.stringify({ user: userData }),
  });
};