type Props = {
  type: string;
  title: string;
  place: string;
  value: string;
  onChange: (value: string) => void;
};

const Input = ({ type, title, place, value, onChange }: Props) => {
  return (
    <label htmlFor="" className="flex flex-col my-4 ">
      <p className="text-rose-200">{title}</p>
      <input
        type={type}
        placeholder={place}
        value={value}
        className="p-1 rounded-xl outline-none border-2 border-rose-200 text-gray-600"
        onChange={({ target }) => onChange(target.value)}
      />
    </label>
  );
};

export default Input;
