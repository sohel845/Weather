import React, {useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Platform,
} from 'react-native';
import MapView from 'react-native-maps';
import {normalize, widthPercentageToDP} from '../helper/responsiveScreen';
import {COLOR} from '../constants/themeContant';

function HomeScreenDetail({route, navigation}) {
  const {
    main,
    descriptionText,
    subBottomLeftView,
    subBottomRightView,
    bottomView,
    cityText,
    degreeText,
    imageStyle,
  } = styles;
  const city = route.params.city;

  useLayoutEffect(() => {
    if (Platform.OS === 'android') {
      navigation.setOptions({
        headerTitleStyle: {
          alignSelf: 'center',
          marginRight: 56,
        },
      });
    }
  }, [navigation]);
  return (
    <SafeAreaView style={main}>
      <View style={main}>
        <MapView
          style={main}
          region={{
            latitude: city.latitude,
            longitude: city.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0721,
          }}
          provider={'google'}
        />
        <View style={bottomView}>
          <View style={subBottomLeftView}>
            <Text style={cityText}>{city.city}</Text>
            <Text style={descriptionText}>{city.weather}</Text>
            <Text style={descriptionText}>{'Humidity: ' + city.humidity}</Text>
            <Text style={descriptionText}>
              {'Wind Speed: ' + city.windSpeed}
            </Text>
            <Text style={descriptionText}>{'Max. Temp.: ' + city.minTemp}</Text>
            <Text style={descriptionText}>{'Min. Temp.: ' + city.maxTemp}</Text>
          </View>
          <View style={subBottomRightView}>
            <Text style={degreeText}>{city.temp + '° C'}</Text>
            <Image
              source={{uri: city.iconLink}}
              style={imageStyle}
              resizeMode={'contain'}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  descriptionText: {
    marginVertical: 8,
    fontSize: normalize(12),
    fontWeight: '400',
    color: COLOR.subTitle,
    fontFamily: 'Roboto-light',
  },
  cityText: {
    marginVertical: 8,
    fontSize: normalize(16),
    fontWeight: '600',
    color: COLOR.title,
    fontFamily: 'Roboto',
  },
  bottomView: {
    flexDirection: 'row',
  },
  subBottomLeftView: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: widthPercentageToDP(50),
  },
  subBottomRightView: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: widthPercentageToDP(50),
    alignItems:'center'
  },
  degreeText: {
    fontSize: normalize(20),
    fontWeight: '600',
    color: COLOR.description,
    marginTop: normalize(24),
    fontFamily: 'Roboto-Bold',
  },
  imageStyle: {
    width: normalize(100),
    height: normalize(100),
    marginTop: -20,
  },
});
export default HomeScreenDetail;
