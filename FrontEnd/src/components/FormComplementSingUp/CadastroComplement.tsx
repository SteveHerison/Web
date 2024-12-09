import { useState, useContext } from "react";
import Button from "../ButtonForm";
import InputForm from "../InputForm";
import ApiCep from "../../services/apiCepService";
import { useModal } from "../../contexts/ModalContext";
import FormularioCadastro from "../FormConfirm/FormularioCadastro";
import { CadastroContext } from "../../contexts/UserCompanyContext";

const validateCNPJ = (cnpj: string): boolean => {
  return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj);
};

const FormEmpresa = () => {
  const { openModal } = useModal();
  const [disable] = useState(false);
  const context = useContext(CadastroContext);

  if (!context) {
    throw new Error("MeuComponente deve estar dentro de CadastroProvider");
  }

  const { empresa, atualizarEmpresa } = context;

  const [formErrors, setFormErrors] = useState({
    razaoSocial: "",
    cnpj: "",
    endereco: "",
    numero: "",
    cidade: "",
    uf: "",
    telefone: "",
    responsavel: "",
    emailRespo: "",
    cep: "",
    terms: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showCNPJField, setShowCNPJField] = useState(false);

  const buscarCep = async () => {
    if (!empresa.cep) return;

    try {
      const response = await ApiCep.get(`/${empresa.cep}/json/`);
      atualizarEmpresa("endereco", response.data.logradouro || "");
      atualizarEmpresa("bairro", response.data.bairro || "");
      atualizarEmpresa("cidade", response.data.localidade || "");
      atualizarEmpresa("uf", response.data.uf || "");
    } catch (error) {
      console.log("Erro ao buscar CEP:", error);
    }
  };

  const handleFocus = (field: string) => {
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = (): boolean => {
    const errors = { ...formErrors };
    let isValid = true;

    if (!empresa.razaoSocial) {
      errors.razaoSocial = "Razão Social é obrigatório.";
      isValid = false;
    }

    if (showCNPJField && empresa.cnpj && !validateCNPJ(empresa.cnpj)) {
      errors.cnpj = "CNPJ inválido.";
      isValid = false;
    }
    if (!empresa.endereco) {
      errors.endereco = "Endereço é obrigatório.";
      isValid = false;
    }

    if (!empresa.numero) {
      errors.numero = "Numero é obrigatório.";
      isValid = false;
    }
    if (!empresa.cep) {
      errors.cep = "Cep é obrigatório.";
      isValid = false;
    }

    if (!empresa.cidade) {
      errors.cidade = "Cidade é obrigatório.";
      isValid = false;
    }

    if (!empresa.uf) {
      errors.uf = "Uf é obrigatório.";
      isValid = false;
    }

    if (!empresa.telefone) {
      errors.telefone = "Telefone é obrigatório.";
      isValid = false;
    }

    if (!empresa.responsavel) {
      errors.responsavel = "Responsável é obrigatório.";
      isValid = false;
    }

    if (!empresa.emailRespo) {
      errors.emailRespo = "Email é obrigatório.";
      isValid = false;
    }

    if (!termsAccepted) {
      errors.terms = "Você deve aceitar os termos e condições.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      openModal(<FormularioCadastro />);
    }
  };
  // // Navegação após sucesso
  // useEffect(() => {
  //   if (showSuccessAlert) {
  //     const timer = setTimeout(() => {
  //       navigate("/login");
  //     }, 2000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [showSuccessAlert, navigate]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col " noValidate>
        <div className="flex flex-col gap-4 my-6 space-y-3">
          <div className="flex justify-center gap-3 item center">
            <InputForm
              title="Razão Social"
              id="razaoSocial"
              place=""
              type="text"
              disabled={disable}
              value={empresa.razaoSocial}
              onChange={(value) => atualizarEmpresa("razaoSocial", value)}
              spellcheck={true}
              onFocus={() => handleFocus("razaoSocial")}
              errorMessage={formErrors.razaoSocial}
            />
            {showCNPJField && (
              <InputForm
                title="CNPJ"
                id="cnpj"
                place=""
                type="text"
                disabled={disable}
                value={empresa.cnpj}
                onChange={(value) => atualizarEmpresa("cnpj", value)}
                onFocus={() => handleFocus("cnpj")}
                errorMessage={formErrors.cnpj}
                spellcheck={true}
                required
              />
            )}
            <div className="flex items-center">
              {!showCNPJField ? (
                <Button
                  title="CNPJ"
                  type="button"
                  onClick={() => setShowCNPJField((prev) => !prev)}
                />
              ) : (
                <p
                  onClick={() => setShowCNPJField(!showCNPJField)}
                  className="p-1 text-white bg-blue-500 rounded-full cursor-pointer"
                >
                  X
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <InputForm
              title="CEP"
              id="cep"
              place=""
              type="text"
              disabled={disable}
              value={empresa.cep}
              onChange={(value) => atualizarEmpresa("cep", value)}
              spellcheck={true}
              onFocus={() => handleFocus("cep")}
              errorMessage={formErrors.cep}
            />
            <div>
              <Button title="Buscar" onClick={buscarCep} />
            </div>
          </div>
          <div className="flex justify-center gap-3 item center">
            <InputForm
              title="Endereço"
              id="endereco"
              place=""
              type="text"
              disabled={disable}
              value={empresa.endereco}
              onChange={(value) => atualizarEmpresa("endereco", value)}
              spellcheck={true}
              onFocus={() => handleFocus("endereco")}
              errorMessage={formErrors.endereco}
              required
            />
            <div>
              <InputForm
                title="Número"
                id="numero"
                place=""
                type="number"
                disabled={disable}
                value={empresa.numero}
                onChange={(value) => atualizarEmpresa("numero", value)}
                spellcheck={true}
                onFocus={() => handleFocus("numero")}
                errorMessage={formErrors.numero}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <InputForm
              title="Cidade"
              id="cidade"
              place=""
              type="text"
              disabled={disable}
              value={empresa.cidade}
              onChange={(value) => atualizarEmpresa("cidade", value)}
              spellcheck={true}
              onFocus={() => handleFocus("cidade")}
              errorMessage={formErrors.cidade}
              required={true}
            />
            <div>
              <InputForm
                title="UF"
                id="uf"
                place=""
                type="text"
                disabled={disable}
                value={empresa.uf}
                onChange={(value) => atualizarEmpresa("uf", value)}
                spellcheck={true}
                onFocus={() => handleFocus("uf")}
                errorMessage={formErrors.uf}
              />
            </div>
          </div>
          <InputForm
            title="Telefone"
            id="telefone"
            place=""
            type="number"
            disabled={disable}
            value={empresa.telefone}
            onChange={(value) => atualizarEmpresa("telefone", value)}
            spellcheck={true}
            onFocus={() => handleFocus("telefone")}
            errorMessage={formErrors.telefone}
            required
          />

          <InputForm
            title="Responsável da empresa"
            id="Responsavel"
            place=""
            type="text"
            disabled={disable}
            value={empresa.responsavel}
            onChange={(value) => atualizarEmpresa("responsavel", value)}
            spellcheck={true}
            onFocus={() => handleFocus("responsavel")}
            errorMessage={formErrors.responsavel}
            required
          />
          <InputForm
            title="E-mail responsável"
            id="emailRespo"
            place=""
            type="email"
            disabled={disable}
            value={empresa.emailRespo}
            onChange={(value) => atualizarEmpresa("emailRespo", value)}
            spellcheck={true}
            onFocus={() => handleFocus("emailRespo")}
            errorMessage={formErrors.emailRespo}
            required
          />
        </div>
        <div className="flex gap-3 ">
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-4 h-4 border rounded"
            />
            <label htmlFor="terms" className="text-sm">
              Aceito os termos e condições
            </label>
          </div>
          {formErrors.terms && (
            <p className="text-sm text-red-500">{formErrors.terms}</p>
          )}
        </div>

        <div className="mt-4">
          <Button title="Cadastrar" id="register" disabled={disable} />
        </div>
      </form>
    </div>
  );
};

export default FormEmpresa;
