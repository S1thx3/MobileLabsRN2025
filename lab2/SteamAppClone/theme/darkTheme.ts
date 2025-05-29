export const darkTheme = {
  name: 'dark' as const, 
  background: '#121212',
  text: '#FFFFFF',
  primary: '#1DB954',
  cardBackground: '#1E1E1E',
  tabBarBackground: '#181818',
  tabBarActive: '#FFFFFF',
  tabBarInactive: '#B3B3B3',

};


export interface AppThemeBase { 
  background: string;
  text: string;
  primary: string;
  cardBackground: string;
  tabBarBackground: string;
  tabBarActive: string;
  tabBarInactive: string;

}


export type AppTheme = AppThemeBase & {
  name: 'dark' | 'light'; 
};

