import { Header } from "@/components/header/header";
import { Input } from "@/components/input/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../services";
import Link from "next/link";
import { Button } from "@/components/buttons/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalP } from "@/components/modal/modal";

const Register: React.FC = () => {
  const [modalSuccess, setModalSuccess] = useState(false);

  const registerSchema = z
    .object({
      name: z
        .string()
        .min(8, "Insira pelo menos um nome e um sobrenome")
        .max(
          60,
          "O nome é limitado a 60 caracteres, por favor abrevie ou remova algum sobrenome."
        )
        .refine((data) => data.trim().split(" ").length > 1, {
          message: "Insira pelo menos um nome e um sobrenome",
        }),
      email: z
        .string()
        .email("Email inválido")
        .max(30, "Limite de 30 caracteres para email"),
      password: z.string().min(8, "Insira pelo menos 8 caracteres"),
      passwordConfirmation: z.string(),
    })
    .refine((data) => data.passwordConfirmation === data.password, {
      message: "As senhas devem ser iguais",
      path: ["passwordConfirmation"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<any>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (data: any) => {
    try {
      const { data: apiData } = await api.post("users/", data);
      setModalSuccess(true);
    } catch (e: any) {}
  };
  const onSubmit = (data: any) => {
    const { passwordConfirmation, ...dataNotPasswordConfirmation } = data;

    handleRegister(dataNotPasswordConfirmation);
  };

  return (
    <div className="bg-grey8 w-screen h-screen">
      <Header />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-grey10 m-auto max-w-[92vw] my-32 mb-32 w-96 flex rounded flex-col min-h-1 p-4 gap-7"
      >
        <h1 className="text-grey0 text-2xl font-medium text-center">
          Cadastro
        </h1>
        <h2 className="text-grey0 text-sm font-medium">Informações pessoais</h2>
        <Input
          labelName="Nome"
          placeholder="Ex: Roberto Silva"
          labelText="Nome"
          type="text"
          register={register("name")}
        />
        {errors?.name && (
          <span className="text-brand1 text-xs -mt-6">
            {String(errors.name.message)}
          </span>
        )}

        <Input
          labelName="Email"
          placeholder="Ex: robertosilva@mail.com"
          labelText="Email"
          type="email"
          register={register("email")}
        />
        {errors?.email && (
          <span className="text-brand1 text-xs -mt-6">
            {String(errors.email.message)}
          </span>
        )}

        <Input
          labelName="senha"
          placeholder="Digitar senha"
          labelText="Senha"
          type="password"
          register={register("password")}
        />
        {errors?.password && (
          <span className="text-brand1 text-xs -mt-6">
            {String(errors.password.message)}
          </span>
        )}
        <Input
          labelName="confirmacaoSenha"
          placeholder="Digitar senha"
          labelText="Confirmar Senha"
          type="password"
          register={register("passwordConfirmation")}
        />
        {errors?.passwordConfirmation && (
          <span className="text-brand1 text-xs -mt-6">
            {String(errors.passwordConfirmation.message)}
          </span>
        )}

        <Button
          type="submit"
          text="Finalizar cadastro"
          className="btn p-2 bg-brand1 text-grey10 font-semibold rounded h-12 disabled:text-grey0"
          disable={!isDirty || !isValid}
        />
      </form>
      {/* <Footer /> */}

      <ModalP
        isOpen={modalSuccess}
        setIsOpen={setModalSuccess}
        titleModal="Sucesso!"
        className="max-w-[94vw]"
      >
        <h2 className="font-semibold mt-6">
          Sua conta foi criada com sucesso!
        </h2>

        <p className="font-extralight text-grey2">
          Agora você poderá ver seus negócios crescendo em grande escala
        </p>
        <Link
          href="/"
          className="btn p-2 text-center w-32  font-semibold text-sm rounded bg-brand1 text-grey10"
        >
          Ir para o login
        </Link>
      </ModalP>
    </div>
  );
};

export default Register;
