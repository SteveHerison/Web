import { useEffect, useState } from "react";
import Button from "../ButtonForm";
import InputForm from "../InputForm";
import { useNavigate } from "react-router-dom";
import AlerSucess from "../Alerts/AlerSucess";
import ApiCep from "../../services/apiCepService";

const validateCNPJ = (cnpj: string): boolean => {
  return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj);
};

const FormEmpresa = () => {
  const navigate = useNavigate();
  const [disable] = useState(false);
  const [formData, setFormData] = useState({
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
  });

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
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showCNPJField, setShowCNPJField] = useState(false);

  const buscarCep = async () => {
    // Adiciona 'async' aqui
    if (formData.cep === "") {
      setFormData((prev) => ({ ...prev, cep: "" }));
    }

    try {
      const response = await ApiCep.get(`/${formData.cep}/json/`);
      setFormData((prev) => ({
        ...prev,
        endereco: response.data.logradouro,
        bairro: response.data.bairro,
        cidade: response.data.localidade,
        uf: response.data.uf,
      }));
    } catch (error) {
      console.log("Erro ao buscar CEP", error);
    }
  };
  // Função para lidar com mudanças nos campos
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Reset de erros ao focar nos campos
  const handleFocus = (field: string) => {
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Validações centralizadas
  const validateForm = (): boolean => {
    const errors = { ...formErrors };
    let isValid = true;

    if (!formData.razaoSocial) {
      errors.razaoSocial = "Razão Social é obrigatório.";
      isValid = false;
    }

    if (showCNPJField && formData.cnpj && !validateCNPJ(formData.cnpj)) {
      errors.cnpj = "CNPJ inválido.";
      isValid = false;
    }
    if (!formData.endereco) {
      errors.endereco = "Endereço é obrigatório.";
      isValid = false;
    }

    if (!formData.numero) {
      errors.numero = "Numero é obrigatório.";
      isValid = false;
    }
    if (!formData.cep) {
      errors.cep = "Cep é obrigatório.";
      isValid = false;
    }

    if (!formData.cidade) {
      errors.cidade = "Cidade é obrigatório.";
      isValid = false;
    }

    if (!formData.uf) {
      errors.uf = "Uf é obrigatório.";
      isValid = false;
    }

    if (!formData.endereco) {
      errors.endereco = "Endereço é obrigatório.";
      isValid = false;
    }

    if (!formData.numero) {
      errors.numero = "Numero é obrigatório.";
      isValid = false;
    }

    if (!formData.telefone) {
      errors.telefone = "Telefone é obrigatório.";
      isValid = false;
    }

    if (!formData.responsavel) {
      errors.responsavel = "Responsável é obrigatório.";
      isValid = false;
    }

    if (!formData.emailRespo) {
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

  // Submissão do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSuccessAlert(true);
    }
  };

  // Navegação após sucesso
  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert, navigate]);

  return (
    <div>
      {!showSuccessAlert ? (
        <form onSubmit={handleSubmit} className="flex flex-col " noValidate>
          <div className="flex flex-col gap-4 my-6 space-y-3">
            <div className="flex justify-center gap-3 item center">
              <InputForm
                title="Razão Social"
                id="razaoSocial"
                place=""
                type="text"
                disabled={disable}
                value={formData.razaoSocial}
                onChange={(value) => handleInputChange("razaoSocial", value)}
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
                  value={formData.cnpj}
                  onChange={(value) => handleInputChange("cnpj", value)}
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
                value={formData.cep}
                onChange={(value) => handleInputChange("cep", value)}
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
                value={formData.endereco}
                onChange={(value) => handleInputChange("endereco", value)}
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
                  value={formData.numero}
                  onChange={(value) => handleInputChange("numero", value)}
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
                value={formData.cidade}
                onChange={(value) => handleInputChange("cidade", value)}
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
                  value={formData.uf}
                  onChange={(value) => handleInputChange("uf", value)}
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
              value={formData.telefone}
              onChange={(value) => handleInputChange("telefone", value)}
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
              value={formData.responsavel}
              onChange={(value) => handleInputChange("responsavel", value)}
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
              value={formData.emailRespo}
              onChange={(value) => handleInputChange("emailRespo", value)}
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
      ) : (
        <AlerSucess title="Cadastro realizado com sucesso!" />
      )}
    </div>
  );
};

export default FormEmpresa;
