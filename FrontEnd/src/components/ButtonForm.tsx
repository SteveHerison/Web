// ButtonForm.tsx
type Props = {
  title?: string;
  id?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (id?: string) => void; // Make onClick optional
};

const Button = ({ title, type, id, onClick, disabled }: Props) => {
  return (
    <button
      type={type}
      id={id}
      disabled={disabled}
      onClick={() => onClick && onClick(id)} // Check if onClick exists
      className="cursor-pointer w-full transition-all bg-blue-500 text-white p-1 rounded-lg
    border-blue-600
    border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
    active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
    >
      {title}
    </button>
  );
};

export default Button;
