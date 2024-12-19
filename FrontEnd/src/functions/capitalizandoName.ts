export const capitalizeName = (fullName: string): string => {
  const words = fullName.toLowerCase().split(" ");

  if (words.length > 1) {
    const firstName = words[0];
    const lastName = words[words.length - 1];
    return `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${
      lastName.charAt(0).toUpperCase() + lastName.slice(1)
    }`;
  }

  const singleName = words[0];
  return singleName.charAt(0).toUpperCase() + singleName.slice(1);
};
