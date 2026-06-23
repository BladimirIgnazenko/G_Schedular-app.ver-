// fe_mobile/src/context/UserContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { fetchUserProfile, updateProfile, UserUpdateParams } from '../api/userApi';

interface UserData {
  nickname?: string;
  interest?: string;
  healthStatus?: 'good' | 'normal' | 'bad';
}

interface UserContextType {
  user: UserData | null;
  updateUser: (data: UserUpdateParams) => Promise<void>;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    try {
      const data = await fetchUserProfile();
      setUser(data);
    } catch (err) {
      console.error('사용자 정보 로드 실패:', err);
    }
  };

  useEffect(() => {
    const init = async () => {
      await refreshUser();
      setLoading(false);
    };
    init();
  }, []);

  const updateUser = async (data: UserUpdateParams) => {
    const previousUser: UserData = user || { 
      nickname: '', 
      interest: '', 
      healthStatus: 'normal' 
    };

    // 1. 데이터 필터링
    const filteredData: UserUpdateParams = {};
    (Object.keys(data) as Array<keyof UserUpdateParams>).forEach((key) => {
      if (data[key] !== undefined) {
        filteredData[key] = data[key];
      }
    });

    // 2. [핵심 해결] 타입 단언(as UserData)을 통해 병합 결과가 UserData임을 보증
    const nextUser = {
      ...previousUser,
      ...filteredData,
    } as UserData;

    // 3. 낙관적 업데이트
    setUser(nextUser);

    try {
      await updateProfile(filteredData);
    } catch (err) {
      console.error('업데이트 실패, 상태 롤백:', err);
      setUser(previousUser);
      throw err;
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser는 UserProvider 내부에서 사용해야 합니다.');
  }
  return context;
};