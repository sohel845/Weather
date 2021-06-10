import React, {useEffect} from 'react';
import MainNavigator from './src/navigation';
import PushNotification from 'react-native-push-notification';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'weather',
        channelName: 'WeatherApp',
        channelDescription: 'A channel to categorise your notifications',
        playSound: false,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`),
    );
  }, []);

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};
export default App;
