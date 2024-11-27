import { useState } from "react";
import Button from "../ButtonForm";
import InputForm from "../InputForm";
import { useNavigate } from "react-router-dom";
import AlerSucess from "../Alerts/AlerSucess";
import { insertMaskInCnpj } from "../../functions/mask";

const FormEmpresa = () => {
  const navigate = useNavigate();
  const [disable] = useState(false);
  const [cpfOuCnpj, setCpfOuCnpj] = useState("cpf");
  const [inputRazaoSocial, setInputRazaoSocial] = useState("");
  const [inputCnpj, setInputCnpj] = useState("");
  const [inputEndereco, setInputEndereco] = useState("");
  const [inputNumero, setInputNumero] = useState("");
  const [inputCidade, setInputCidade] = useState("");
  const [inputTelefone, setInputTelefone] = useState("");
  const [inputResponsavel, setInputResponsavel] = useState("");
  const [inputEmailRespo, setInputEmailRespo] = useState("");
  const [inputCep, setInputCep] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // Estado para controlar a exibição do alerta
  const [formErrors, setFormErrors] = useState({
    razaoSocial: "",
    cnpj: "",
    endereco: "",
    cidade: "",
    telefone: "",
    responsavel: "",
    email: "",
    terms: "",
  });

  const handleFocus = (field: string) => {
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Resetando os erros
    setFormErrors({
      razaoSocial: "",
      cnpj: "",
      endereco: "",
      cidade: "",
      telefone: "",
      responsavel: "",
      email: "",
      terms: "",
    });

    let errorMessage = false;

    // Validações
    if (!inputRazaoSocial) {
      setFormErrors((prev) => ({
        ...prev,
        razaoSocial: "Razão Social é obrigatória.",
      }));
      errorMessage = true;
    }

    if (!inputCnpj) {
      setFormErrors((prev) => ({
        ...prev,
        cnpj: "CNPJ inválido. Formato esperado: 00.000.000/0000-00",
      }));
      errorMessage = true;
    }

    if (!inputEndereco) {
      setFormErrors((prev) => ({ ...prev, endereco: "Endereço obrigatório." }));
      errorMessage = true;
    }

    if (!inputCidade) {
      setFormErrors((prev) => ({ ...prev, cidade: "Cidade obrigatória." }));
      errorMessage = true;
    }

    if (!inputEmailRespo) {
      setFormErrors((prev) => ({
        ...prev,
        email: "Formato de e-mail inválido.",
      }));
      errorMessage = true;
    }

    if (!inputResponsavel) {
      setFormErrors((prev) => ({
        ...prev,
        responsavel: "Nome do responsável é obrigatório.",
      }));
      errorMessage = true;
    }

    if (!inputTelefone) {
      setFormErrors((prev) => ({
        ...prev,
        telefone: "Formato de telefone inválido. Exemplo: (11) 91234-5678",
      }));
      errorMessage = true;
    }

    if (!termsAccepted) {
      setFormErrors((prev) => ({
        ...prev,
        terms: "Você deve aceitar os termos e condições.",
      }));
      errorMessage = true;
    }

    if (errorMessage) return;

    // Se não houver erros, mostrar o alerta de sucesso
    setShowSuccessAlert(true);

    // Após 3 segundos (tempo suficiente para o alerta ser visto), redireciona para o login
    setTimeout(() => {
      navigate("/login");
    }, 2000); // Ajuste o tempo de acordo com o que for melhor
  };

  return (
    <div>
      {!showSuccessAlert ? (
        <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
          <div className="flex justify-center gap-3 item center">
            <InputForm
              title="Razão Social"
              id="razaoSocial"
              place=""
              type="text"
              disabled={disable}
              value={inputRazaoSocial}
              onChange={setInputRazaoSocial}
              spellcheck={true}
              onFocus={() => handleFocus("razaoSocial")}
              errorMessage={formErrors.razaoSocial}
            />

            {cpfOuCnpj === "cnpj" && (
              <InputForm
                title="CNPJ"
                id="cnpj"
                place=""
                type="text"
                disabled={disable}
                value={inputCnpj}
                onChange={(value) => setInputCnpj(insertMaskInCnpj(value))}
                spellcheck={true}
                onFocus={() => handleFocus("cnpj")}
                errorMessage={formErrors.cnpj}
                required
              />
            )}
            <div className="flex items-center gap-2">
              {cpfOuCnpj !== "cpf" && (
                <Button
                  title="Não"
                  id="cpf"
                  onClick={() => setCpfOuCnpj("cpf")}
                />
              )}

              {cpfOuCnpj !== "cnpj" && (
                <Button
                  title="CNPJ"
                  id="cnpj"
                  onClick={() => setCpfOuCnpj("cnpj")}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 my-6 space-y-3">
            <div className="flex justify-center gap-3 item center">
              <InputForm
                title="Endereço"
                id="endereco"
                place=""
                type="text"
                disabled={disable}
                value={inputEndereco}
                onChange={setInputEndereco}
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
                  type="text"
                  disabled={disable}
                  value={inputNumero}
                  onChange={setInputNumero}
                  spellcheck={true}
                  onFocus={() => handleFocus("numero")}
                />
              </div>
            </div>
            <div className="flex gap-3 ">
              <InputForm
                title="CEP"
                id="nome"
                place=""
                type="text"
                disabled={disable}
                value={inputCep}
                onChange={setInputCep}
                spellcheck={true}
                onFocus={() => handleFocus("name")}
              />

              <InputForm
                title="Cidade"
                id="cidade"
                place=""
                type="text"
                disabled={disable}
                value={inputCidade}
                onChange={setInputCidade}
                spellcheck={true}
                onFocus={() => handleFocus("cidade")}
                errorMessage={formErrors.cidade}
                required={true}
              />
            </div>
            <InputForm
              title="Telefone"
              id="telefone"
              place=""
              type="text"
              disabled={disable}
              value={inputTelefone}
              onChange={setInputTelefone}
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
              value={inputResponsavel}
              onChange={setInputResponsavel}
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
              value={inputEmailRespo}
              onChange={setInputEmailRespo}
              spellcheck={true}
              onFocus={() => handleFocus("emailRespo")}
              errorMessage={formErrors.email}
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
