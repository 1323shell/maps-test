import { PermissionsAndroid, Platform } from 'react-native';

export const isIos = Platform.OS === 'ios';

export const checkLocationPermissionAndroid = () =>
  PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

export const checkLocationPermissionIos = () => {};

export const getLocationPermisionAndroid = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export const getLocationPermisionIos = async () => {};
