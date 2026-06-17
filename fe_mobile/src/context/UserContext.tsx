import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. 사용자 정보 타입 정의
interface UserData {
  nickname: string;
  interest: string;
  healthStatus: 'stable' | 'warning' | 'critical'; // 크론병 관련 상태값 예시
}

interface UserContextType {
  user: UserData;
  updateUser: (data: Partial<UserData>) => void;
}

// 2. Context 생성
const UserContext = createContext<UserContextType | undefined>(undefined);

// 3. Provider 컴포넌트 (앱을 감싸줄 껍데기)
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData>({
    nickname: '',
    interest: '',
    healthStatus: 'stable',
  });

  const updateUser = (data: Partial<UserData>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 4. 편리하게 사용하기 위한 커스텀 훅
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser는 UserProvider 내부에서 사용해야 합니다.');
  }
  return context;
};