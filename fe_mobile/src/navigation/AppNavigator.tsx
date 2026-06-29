// fe_mobile/src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // 아이콘 라이브러리 사용 시

// 스크린 임포트
import LogWriteScreen from '../screens/LogWriteScreen';
import LogListScreen from '../screens/LogListScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true, // 헤더 표시 여부
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;

            if (route.name === '기록하기') {
              iconName = focused ? 'create' : 'create-outline';
            } else if (route.name === '기록보기') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === '설정') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="기록하기" component={LogWriteScreen} />
        <Tab.Screen name="기록보기" component={LogListScreen} />
        <Tab.Screen name="설정" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}