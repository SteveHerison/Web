// ButtonForm.tsx
type Props = {
  title: string;
  type: "button" | "submit" | "reset";
};

const Button = ({ title, type }: Props) => {
  return (
    <button
      type={type}
      className="cursor-pointer w-full transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
    border-blue-600
    border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
    active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
    >
      {title}
    </button>
  );
};

export default Button;
