import "./styles/main.css";
import logoImage from "./assets/logo-nlw-esports.svg";
import GameBanner from "./components/GameBanner";
import { useEffect, useState } from "react";
import api from "./services/api";
import Game from "./interfaces/games";
import CreateAdBanner from "./components/CreateAdBanner";
import * as Dialog from "@radix-ui/react-dialog";
import CreateAdModal from "./components/CreateAdModal";

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [adModalOpened, setAdModalOpened] = useState<boolean>(false);

  const fetchGames = async () => {
    const response = await api.get<Game[]>("/games");
    setGames(response.data);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImage} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-gradient bg-clip-text">duo</span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            title={game.title}
            adsCount={game._count.ads}
            bannerUrl={game.bannerUrl}
          />
        ))}
      </div>

      <Dialog.Root open={adModalOpened} onOpenChange={setAdModalOpened}>
        <CreateAdBanner />
        <CreateAdModal
          onSuccess={() => {
            fetchGames();

            setAdModalOpened(false);
          }}
        />
      </Dialog.Root>
    </div>
  );
}

export default App;
