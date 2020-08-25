import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { checkLocationPermissionAndroid } from './helpers/geolocation';
import { isIos } from './helpers/platform';

import Map from './screens/Map';

const Stack = createStackNavigator();

const App = () => {
  const [hasRendered, setHasRendered] = useState(isIos);
  const [hasPermissionInitial, setHasPermissionInitial] = useState(false);

  useEffect(() => {
    if (!isIos) {
      const getGranted = async () => {
        const granted = await checkLocationPermissionAndroid();

        setHasPermissionInitial(granted);
        setHasRendered(true);
      };

      getGranted();
    }
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
