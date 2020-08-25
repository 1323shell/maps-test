import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import {
  getLocationPermisionAndroid,
  getLocationPermisionIos,
  isIos,
} from '../../helpers';

import * as S from './styled';

const Map = ({ hasPermissionInitial }) => {
  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [hasPermission, setHasPermission] = useState(hasPermissionInitial);

  const delta = useMemo(() => (hasPermission ? 0.005 : 100), [hasPermission]);

  const getLocationRequest = useCallback(
    () =>
      Geolocation.getCurrentPosition(
        (res) =>
          setCoords({
            latitude: res.coords.latitude,
            longitude: res.coords.longitude,
          }),
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      ),
    [],
  );

  useEffect(() => {
    const getCurrentLocation = async () => {
      if (hasPermission) {
        await getLocationRequest();
      } else {
        const granted = isIos
          ? await getLocationPermisionIos()
          : await getLocationPermisionAndroid();

        if (granted) {
          setHasPermission(granted);
        }
      }
    };

    getCurrentLocation();
  }, [getLocationRequest, hasPermission]);

  return (
    <S.AreaView>
      <S.Map
        provider={PROVIDER_GOOGLE}
        region={{
          ...coords,
          latitudeDelta: delta,
          longitudeDelta: delta,
        }}>
        {hasPermission && <Marker coordinate={coords} />}
      </S.Map>
    </S.AreaView>
  );
};

export default Map;
