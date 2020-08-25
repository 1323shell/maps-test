import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const checkLocationPermissionAndroid = () =>
  PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

export const getLocationPermisionAndroid = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export const getLocationPermisionIos = async () => {
  const granted = await Geolocation.requestAuthorization('whenInUse');

  return granted === 'granted';
};
