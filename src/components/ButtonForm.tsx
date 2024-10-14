type Props = {
  title: string;
  value: string;
};

const Button = ({ title, value }: Props) => {
  return (
    <button value={value} className="bg-rose-100 p-2 rounded-xl my-3 w-full ">
      {title}
    </button>
  );
};

export default Button;
