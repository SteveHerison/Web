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

export const formatPhoneNumber = (value: string): string => {
  // Remove todos os caracteres que não sejam números
  const cleaned = value.replace(/\D/g, "");

  // Aplica a máscara (XX) XXXXX-XXXX
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  // Aplica a máscara parcial enquanto o usuário digita
  const partialMatch = cleaned.match(/^(\d{2})(\d{1,5})?(\d{0,4})?$/);
  if (partialMatch) {
    return `(${partialMatch[1]}) ${partialMatch[2] || ""}${
      partialMatch[3] ? `-${partialMatch[3]}` : ""
    }`;
  }

  return cleaned;
};

export const validateTelefone = (telefone: string) => {
  const telefonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return telefonePattern.test(telefone);
};

export const validateEmail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const formatCep = (value: string): string => {
  // Remove todos os caracteres que não sejam números
  const cleaned = value.replace(/\D/g, "");

  // Aplica a máscara XXXXX-XXX
  const match = cleaned.match(/^(\d{5})(\d{1,3})?$/);
  if (match) {
    return `${match[1]}${match[2] ? `-${match[2]}` : ""}`;
  }

  return cleaned; // Retorna o valor original se não houver correspondência
};
