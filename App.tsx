import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { VelvetRouteDeck } from './src/navigation/VelvetRouteDeck';
import { palette } from './src/theme/nocturneTokens';
import {LogLevel, OneSignal} from 'react-native-onesignal';

function App() {
  const [oneSignKkkk, setOneSignKkkk] = useState('6c6d90d6-0e04-4226-abdf-3f17305a9177');

  useEffect(() => {

    const initOnsignall = async () => {
      try {
        // Verbose-логи лишаємо тільки в дебазі
        if (__DEV__) {
          OneSignal.Debug.setLogLevel(LogLevel.Verbose);
        }

        // OneSignal ініціалізація
        if (oneSignKkkk) {
          OneSignal.initialize(oneSignKkkk);
        }
      } catch (e) {
        console.log('OneSignal init error:', e);
      }
    };
    
    initOnsignall();
    
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={palette.graphite} />
      <VelvetRouteDeck oneSignKkkk={oneSignKkkk}/>
    </SafeAreaProvider>
  );
}

export default App;
