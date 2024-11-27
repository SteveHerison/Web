export const insertMaskInCnpj = (cnpj: string): string => {
  // Remover qualquer caractere não numérico
  const onlyNumbers = cnpj.replace(/\D/g, "");

  // Adicionar a máscara no formato XX.XXX.XXX/XXXX-XX
  return onlyNumbers.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
};

export const validateCpf = (cpf: string) => {
  const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return cpfPattern.test(cpf);
};

export const validateTelefone = (telefone: string) => {
  const telefonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return telefonePattern.test(telefone);
};

export const validateEmail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
