import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ad } from "../../interfaces/ad";
import DuoInfo from "./info";
import { styles } from "./styles";
import { GameController } from "phosphor-react-native";
import { THEME } from "../../theme";

export interface DuoCardProps {
  ad: Ad;
  onConnect: () => void;
}

const DuoCard = ({ ad, onConnect }: DuoCardProps) => {
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={ad.name} />
      <DuoInfo label="Tempo de jogo" value={`${ad.yearsPlaying} anos`} />
      <DuoInfo
        label="Disponibilidade"
        value={`${ad.weekDays.length} \u2022 ${ad.hoursStart}-${ad.hoursEnd}`}
      />
      <DuoInfo
        label="Chamada de áudio"
        colorValue={
          ad.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
        value={ad.useVoiceChannel ? "Sim" : "Não"}
      />

      <TouchableOpacity onPress={onConnect} style={styles.button}>
        <GameController size={24} color="#fff" />
        <Text>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DuoCard;
