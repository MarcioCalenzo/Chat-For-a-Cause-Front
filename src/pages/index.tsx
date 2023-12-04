import { Header } from "@/components/header/header";
import Link from "next/link";
import { Button } from "@/components/buttons/button";
import { Input } from "@/components/input/input";
import { useRouter } from "next/router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/services";
import { UserLogin } from "@/interfaces";
import { ModalP } from "@/components/modal/modal";
import { useState } from "react";

export default function Home() {
  const [modalFailed, setModalFailed] = useState(false);

  const route = useRouter();
  const loginSchema = z.object({
    email: z.string().email("Email inválido").min(1, "Informe seu email"),
    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .max(50, "Senha muito longa")
      .min(1, "Informe sua senha"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<any>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (dataLogin: UserLogin) => {
    try {
      const { data } = await api.post("login", dataLogin);
      localStorage.setItem("chatforacause@token", data.token);
      localStorage.setItem("chatforacause@id", data.id);

      route.push("/dashboard");
    } catch (e: any) {
      setModalFailed(true);
    }
  };
  return (
    <main className="bg-grey8 w-screen h-screen">
      <Header />
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-grey10 m-auto max-w-[92vw] my-32 mb-32 w-96 flex rounded flex-col min-h-1 p-4 gap-7"
      >
        <h1 className="text-grey0 text-2xl font-medium text-center mt-3">
          Login
        </h1>

        <Input
          labelName="email"
          labelText="Email"
          placeholder="Digitar email"
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
          labelText="Senha"
          placeholder="Digitar senha"
          type="password"
          register={register("password")}
        />
        {errors?.password && (
          <span className="text-brand1 text-xs -mt-6">
            {String(errors.password.message)}
          </span>
        )}
        <div className="text-end">
          {/* <Link
            href={"/resetPassword"}
            className=" text-base font-medium text-end text-grey2 cursor-pointer"
          >
            Esqueci minha senha
          </Link> */}
        </div>

        <Button
          type="submit"
          text="Entrar"
          className="btn p-2 bg-brand1 text-grey10 font-semibold rounded h-12"
          disable={!isDirty || !isValid}
        />
        <h2 className="text-sm font-normal text-center text-grey2">
          Ainda não possui conta ?
        </h2>
        <Link
          className="text-grey0 btn-ghost border-2 border-grey6 rounded h-12 font-semibold text-center pt-[10px]"
          href={"/register"}
        >
          Cadastrar
        </Link>
      </form>
      {/* <Footer /> */}
      <ModalP
        isOpen={modalFailed}
        setIsOpen={setModalFailed}
        titleModal="Temos um problema"
        className="max-w-[94vw]"
      >
        <h2 className="font-semibold mt-6">
          Seu Email ou senha está inválido !
        </h2>
        <button
          onClick={() => setModalFailed(false)}
          className="btn p-2 text-center w-32  font-semibold text-sm rounded bg-brand1 text-grey10"
        >
          Fechar
        </button>
      </ModalP>
    </main>
  );
}
