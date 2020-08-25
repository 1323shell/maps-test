import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';
import MapView from 'react-native-maps';

export const AreaView = styled(SafeAreaView)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
`;

export const Map = styled(MapView)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
`;
