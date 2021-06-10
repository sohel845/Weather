import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from 'react-native';
import {
  normalize,
  screenWidth,
  widthPercentageToDP,
} from '../helper/responsiveScreen';
import SplashScreen from 'react-native-splash-screen';
import {convertKalToCels} from '../function';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import PushNotification from 'react-native-push-notification';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentCityData, getWeatherData} from '../redux/actions';
import {COLOR} from '../constants/themeContant';

function HomeScreen({navigation}) {
  const {main, loadingView} = styles;
  const [weatherData, setWeatherData] = useState(true);
  const [location, setLocation] = useState(null);
  const dispatch = useDispatch();

  const weatherReducerData = useSelector(state => state.weather.weatherData);
  const error = useSelector(state => state.weather.error);
  const loading = useSelector(state => state.weather.loading);
  const currentCityWeatherData = useSelector(
    state => state.weather.currentCityData,
  );


  useEffect(() => {
    SplashScreen.hide();
    dispatch(getWeatherData());
    checkLocationPermission();
  }, []);

  useEffect(() => {
    if (error) {
      console.log('Error', error);
    }
  }, [error]);

  useEffect(() => {
    if (weatherReducerData?.list && weatherReducerData?.list?.length > 0) {
      formatData(weatherReducerData.list);
    }
  }, [weatherReducerData]);

  useEffect(() => {
    if (location) {
      dispatch(getCurrentCityData(location.latitude, location.longitude));
    }
  }, [dispatch, location]);

  useEffect(() => {
    if (
      currentCityWeatherData?.main?.temp &&
      currentCityWeatherData?.weather[0]?.icon
    ) {
      showNotification(
        convertKalToCels(currentCityWeatherData?.main?.temp),
        currentCityWeatherData?.weather[0]?.icon,
      );
    }
  }, [currentCityWeatherData]);

  function showNotification(temp, icon) {
    PushNotification.removeAllDeliveredNotifications();
    PushNotification.localNotification({
      channelId: 'weather',
      title: 'WeatherApp',
      message: `Current Temp ${temp}° C`,
      largeIconUrl: `http://openweathermap.org/img/wn/${icon}.png`,
      ongoing: true,
    });
  }

  function formatData(cities) {
    const fomatedData = cities.map(city => {
      return {
        id: city?.id,
        city: city?.name,
        latitude: city?.coord?.lat,
        longitude: city?.coord?.lon,
        temp: convertKalToCels(city?.main?.temp),
        minTemp: convertKalToCels(city?.main?.temp_min),
        maxTemp: convertKalToCels(city?.main?.temp_max),
        humidity: city?.main?.humidity,
        windSpeed: city?.wind?.speed,
        weather: city?.weather[0]?.main,
        iconLink:
          'http://openweathermap.org/img/wn/' + city?.weather[0]?.icon + '.png',
      };
    });
    setWeatherData(fomatedData);
    // setLoading(false);
  }

  function requestLocationPermission() {
    const locationPermission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_ALWAYS
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    request(locationPermission).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          getLocation();
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    });
  }

  function checkLocationPermission() {
    const locationPermision =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_ALWAYS
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    check(locationPermision)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            requestLocationPermission();
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            getLocation();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            requestLocationPermission();
            break;
        }
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  function getLocation() {
    Geolocation.getCurrentPosition(info => {
      setLocation(info.coords);
    });
  }

  function onPressCard(item) {
    navigation.navigate('HomeScreenDetail', {city: item});
  }

  function cityCard({item}) {
    const {
      cardView,
      leftSubCardView,
      rightSubCardView,
      degreeText,
      weatherText,
      cityText,
    } = styles;
    const {city, weather, temp} = item;
    return (
      <TouchableOpacity onPress={() => onPressCard(item)}>
        <View style={cardView}>
          <View style={leftSubCardView}>
            <Text style={cityText}>{city}</Text>
            <Text style={weatherText}>{weather}</Text>
          </View>
          <View style={rightSubCardView}>
            <Text style={degreeText}>{temp + '° C'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={main}>
      <View style={main}>
        {loading ? (
          <View style={loadingView}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <FlatList
            data={weatherData}
            style={main}
            renderItem={cityCard}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  cardView: {
    height: widthPercentageToDP(17),
    width: screenWidth,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  leftSubCardView: {
    justifyContent: 'space-between',
  },
  rightSubCardView: {
    justifyContent: 'center',
  },
  cityText: {
    fontSize: normalize(14),
    fontWeight: '500',
    color: COLOR.subTitle,
    fontFamily: 'Roboto',
  },
  weatherText: {
    fontSize: normalize(12),
    fontWeight: '400',
    color: COLOR.description,
    fontFamily: 'Roboto-light',
  },
  degreeText: {
    fontSize: normalize(20),
    fontWeight: '500',
    color: COLOR.title,
    fontFamily: 'Roboto-Bold',
  },
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default HomeScreen;
