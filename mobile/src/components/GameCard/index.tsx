import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { THEME } from "../../theme";
import Game from "../../interfaces/game";
import { useNavigation } from "@react-navigation/native";

interface GameCardProps extends TouchableOpacityProps {
  data: Game;
}

const GameCard: React.FC<GameCardProps> = ({ data, ...rest }) => {
  const navigation = useNavigation();

  const handleClickGame = () => {
    navigation.navigate("Game", {
      id: data.id,
      title: data.title,
      bannerUrl: data.bannerUrl,
    });
  };

  return (
    <TouchableOpacity
      onPress={handleClickGame}
      style={styles.container}
      {...rest}
    >
      <ImageBackground style={styles.cover} source={{ uri: data.bannerUrl }}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.title}>{data.title}</Text>

          <Text style={styles.ads}>{data._count.ads} anúncios</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default GameCard;
