import { Player } from "@lottiefiles/react-lottie-player";
import Checked from "../../assets/checked.json";
import { useEffect, useState } from "react";

interface AlertProps {
  title: string; // O título agora é dinâmico
}

const AlerSucess: React.FC<AlertProps> = ({ title }) => {
  const [displayedMessage, setDisplayedMessage] = useState("");
  const typingSpeed = 30; // Tempo em milissegundos entre cada letra

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < title.length) {
        setDisplayedMessage((prev) => prev + title[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [title]);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-5">
      <Player
        autoplay
        loop
        src={Checked}
        style={{ height: "200px", width: "200px" }}
      />
      <h2 className="text-3xl text-green-500">{displayedMessage}</h2>{" "}
      {/* Agora o título é dinâmico */}
    </div>
  );
};

export default AlerSucess;
