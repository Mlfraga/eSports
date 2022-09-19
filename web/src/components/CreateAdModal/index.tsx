import * as Dialog from "@radix-ui/react-dialog";
import { GameController, Check } from "phosphor-react";
import Input from "../Form/input";
import Select from "../Form/select";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { FormEvent, useEffect, useState } from "react";
import api from "../../services/api";
import Game from "../../interfaces/games";
import SelectOption from "../../interfaces/selectOption";

type FormData = {
  game: string;
  discord: string;
  name: string;
  timeStart: string;
  timeEnd: string;
  yearsPlaying: number;
  useVoiceChannel: boolean;
  weekDays: number[];
};

type CreateAdModalProps = {
  onSuccess: () => void;
};

const CreateAdModal = ({ onSuccess }: CreateAdModalProps) => {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [gameOptions, setGameOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    api.get<Game[]>("/games").then((response) => {
      const options = response.data.map((game) => ({
        displayText: game.title,
        value: game.id,
      }));

      setGameOptions(options);
    });
  }, []);

  const handleCreateAd = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const data = Object.fromEntries(formData);

    const formattedPayload = {
      ...data,
      yearsPlaying: Number(data.yearsPlaying),
      useVoiceChannel: data.useVoiceChannel === "on",
      weekDays: weekDays.map((day) => Number(day)),
    } as FormData;

    try {
      const response = await api.post(
        `/games/${formattedPayload.game}/ads`,
        formattedPayload
      );

      if (response.status === 201) {
        onSuccess();
        alert("Anúncio criado com sucesso!");
      }
    } catch (e) {
      console.log("error", e);

      alert("Erro ao criar anúncio!");
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed">
        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
          <Dialog.Title className="text-3xl font-black">
            Publique um anúncio
          </Dialog.Title>

          <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">
                Qual o game?
              </label>
              <Select
                name="game"
                options={gameOptions}
                placeholder="Selecione o game que deseja jogar"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Como te chamam dentro do game?"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                <Input
                  type="text"
                  name="yearsPlaying"
                  id="yearsPlaying"
                  placeholder="Tudo bem ser ZERO"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual seu discord?</label>
                <Input
                  type="text"
                  name="discord"
                  id="discord"
                  placeholder="Usuario#0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekdays">Quando costuma jogar?</label>

                <ToggleGroup.Root
                  className="grid grid-cols-4 gap-2"
                  type="multiple"
                  value={weekDays}
                  onValueChange={(value) => setWeekDays(value)}
                >
                  <ToggleGroup.Item
                    value="1"
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("1") ? "bg-violet-500" : ""
                    }`}
                    title="Domingo"
                  >
                    D
                  </ToggleGroup.Item>

                  <ToggleGroup.Item
                    value="2"
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("2") ? "bg-violet-500" : ""
                    }`}
                    title="Segunda"
                  >
                    S
                  </ToggleGroup.Item>

                  <ToggleGroup.Item
                    value="3"
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("3") ? "bg-violet-500" : ""
                    }`}
                    title="Terça"
                  >
                    T
                  </ToggleGroup.Item>

                  <ToggleGroup.Item
                    value="4"
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("4") ? "bg-violet-500" : ""
                    }`}
                    title="Quarta"
                  >
                    Q
                  </ToggleGroup.Item>

                  <ToggleGroup.Item
                    value="5"
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("5") ? "bg-violet-500" : ""
                    }`}
                    title="Quinta"
                  >
                    Q
                  </ToggleGroup.Item>

                  <ToggleGroup.Item
                    value="6"
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("6") ? "bg-violet-500" : ""
                    }`}
                    title="Sexta"
                  >
                    S
                  </ToggleGroup.Item>

                  <ToggleGroup.Item
                    value="0"
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("0") ? "bg-violet-500" : ""
                    }`}
                    title="Sábado"
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="timeStart">Qual horário do dia?</label>
                <div className="flex flex-col gap-2">
                  <Input
                    type="time"
                    name="hoursStart"
                    id="hoursStart"
                    placeholder="De"
                  />
                  <Input
                    type="time"
                    name="hoursEnd"
                    id="hoursEnd"
                    placeholder="Até"
                  />
                </div>
              </div>
            </div>

            <div className="mt-2 flex gap-2 text-small">
              <Checkbox.Root
                name="useVoiceChannel"
                className="w-6 h-6 p-1 rounded bg-zinc-900"
              >
                <Checkbox.Indicator>
                  <Check className="h-4 w-4 text-esmerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz?
            </div>

            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                Cancelar
              </Dialog.Close>
              <button
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                type="submit"
              >
                <GameController size={24} />
                Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
};

export default CreateAdModal;
