import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text, ImageBackground, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { THEME } from '../../theme';

export interface GameCardData {
  id: string;
  name: string;
  ads: string;
  cover: ImageSourcePropType
};

interface GameCardProps extends TouchableOpacityProps {
  data: GameCardData;
};

const GameCard: React.FC<GameCardProps> = ({ data, ...rest }) => {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground style={styles.cover} source={data.cover} >

        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>
            {data.name}
          </Text>

          <Text style={styles.ads}>
            {data.ads} anúncios
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default GameCard;