export const TextField = ({ name, type, placeholder, register }) => {
  return (
    <input
      {...register(name)}
      name={name}
      id={name}
      type={type}
      placeholder={placeholder}
    />
  );
};
