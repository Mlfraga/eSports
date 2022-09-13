import React from 'react';
import { ImageBackground } from 'react-native';

import { styles } from './styles';
import backgroundImg from '../../assets/background-galaxy.png';

interface BackgrundProps {
  children: React.ReactNode;
};

const Background: React.FC<BackgrundProps> = ({ children }) => {
  return (
    <ImageBackground source={backgroundImg} defaultSource={backgroundImg} style={styles.container}>
      {children}
    </ImageBackground>
  );
}

export default Background;