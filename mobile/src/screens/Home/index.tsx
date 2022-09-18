import React, { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";

import { styles } from "./styles";
import logoImg from "../../assets/logo-nlw-esports.png";

import Heading from "../../components/Heading";
import GameCard from "../../components/GameCard";

import Game from "../../interfaces/game";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../../components/Background";

const Home: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://10.0.0.85:3333/games", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <GameCard data={item} />}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
};

export default Home;
