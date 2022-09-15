import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { Text, TouchableOpacity, Image, View } from "react-native";
import Background from "../../components/Background";
import { GameParams } from "../../@types/navigation";
import logoImg from "../../assets/logo-nlw-esports.png";
import { styles } from "./styles";
import { Entypo } from "@expo/vector-icons";
import { THEME } from "../../theme";

export default function Game() {
  const route = useRoute();
  const game = route.params as GameParams;

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image style={styles.logo} source={logoImg} />

          <View style={styles.right} />
        </View>

        <Text>Game</Text>
      </SafeAreaView>
    </Background>
  );
}
