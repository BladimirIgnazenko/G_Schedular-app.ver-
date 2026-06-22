// fe_mobile/src/api/client.ts

const BASE_URL = 'http://localhost:3000/api/v1';

const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'API 요청 실패');
  }

  return response.json();
};

export default apiClient;