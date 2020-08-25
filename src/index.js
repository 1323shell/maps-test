import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  checkLocationPermissionAndroid,
  checkLocationPermissionIos,
  isIos,
} from './helpers';

import Map from './screens/Map';

const Stack = createStackNavigator();

const App = () => {
  const [hasRendered, setHasRendered] = useState(false);
  const [hasPermissionInitial, setHasPermissionInitial] = useState(false);

  useEffect(() => {
    const getGranted = async () => {
      const granted = isIos
        ? await checkLocationPermissionIos()
        : await checkLocationPermissionAndroid();

      setHasPermissionInitial(granted);
      setHasRendered(true);
    };

    getGranted();
  }, [setHasPermissionInitial, setHasRendered]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Map">
          {(props) =>
            hasRendered ? (
              <Map {...props} hasPermissionInitial={hasPermissionInitial} />
            ) : null
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
