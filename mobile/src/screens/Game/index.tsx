import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Image, View, FlatList } from "react-native";
import Background from "../../components/Background";
import { RootStackParamList } from "../../@types/navigation";
import logoImg from "../../assets/logo-nlw-esports.png";
import { styles } from "./styles";
import { Entypo } from "@expo/vector-icons";
import { THEME } from "../../theme";
import Heading from "../../components/Heading";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import DuoCard from "../../components/DuoCard";
import { Ad } from "../../interfaces/ad";

type IGameProps = NativeStackScreenProps<RootStackParamList, "Game">;

export default function Game({ route }: IGameProps) {
  const game = route.params;
  const navigation = useNavigation();

  const [ads, setAds] = useState<Ad[]>([]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchAds = async () => {
      const response = await fetch(
        `http://10.0.0.85:3333/games/${game.id}/ads`
      );

      const responseData: Ad[] = await response.json();

      setAds(responseData);
    };

    fetchAds();
  }, [game]);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image style={styles.logo} source={logoImg} />

          <View style={styles.right} />
        </View>

        <Image
          style={styles.cover}
          resizeMethod="resize"
          source={{ uri: game.bannerUrl }}
        />

        <Heading title={game.title} subtitle={"Conecte-se comece a jogar"} />

        <FlatList
          data={ads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard onConnect={() => console.log("connect"!)} ad={item} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={
            ads.length > 1 ? styles.contentList : styles.emptyListContent
          }
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>Nenhum anúncio encontrado</Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
