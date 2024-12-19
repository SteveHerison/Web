import { capitalizeName } from "../../functions/capitalizandoName";
import { useUser } from "../../hooks/useUser";

const Header = () => {
  const { usuario } = useUser();

  return (
    <header className="flex items-center w-full px-2 h-14 bg-slate-400">
      <div className="flex justify-end w-full gap-3">
        <div className="">
          <img src="foto" alt="foto" />
        </div>
        <div>{`${capitalizeName(usuario.nome)}`}</div>
      </div>
    </header>
  );
};

export default Header;
