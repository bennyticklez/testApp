import React from 'react';
import {NativeBaseProvider, extendTheme, theme as nbTheme} from 'native-base';
import Config from './nativebase.config';
import {Button, Divider, Input, Radio, TextArea} from './themes';

import Routes from './navigation/RoutesClean';

// export default ({ children }: { children: React.ReactNode }) => {
export default function App() {
  const customTheme = extendTheme({
    config: {
      initialColorMode: 'light',
    },
    colors: {
      primary: nbTheme.colors.violet,
      customGray: '#2F3948',
      secondary: nbTheme.colors.coolGray,
    },
    sizes: {
      container: '1016px',
    },
    components: {
      Button,
      Radio,
      Divider,
      Input,
      TextArea,
    },
  });

  return (
    <NativeBaseProvider theme={customTheme} config={Config}>
        <Routes />
    </NativeBaseProvider>
  );
}
