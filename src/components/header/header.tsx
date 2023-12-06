import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { User } from "@/interfaces";
import Link from "next/link";
import { api } from "@/services";
import { ImageManual } from "../imageManual/imageManual";
import { useRouter } from "next/router";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({} as User);
  const route = useRouter();

  useEffect(() => {
    const checkIsLogged = async () => {
      try {
        const { data } = await api.get<User[]>("users/");
        const idUser = localStorage.getItem("chatforacause@id");
        const userObj: User | undefined = data.find(
          (user) => user.id === idUser
        );
        if (userObj) {
          setIsLogged(true);
          setUser(userObj);
          route.push("/dashboard");
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkIsLogged();
  }, []);

  const logout = () => {
    localStorage.clear();
    route.push("/");
  };

  return (
    <header className="h-20 border-b-2 bg-whiteFixed border-grey6">
      <div className=" pr-2 pl-4 max-w-screen-2xl mx-auto flex justify-between items-center h-full">
        <Link href={"/"}>
          <h2 className=" text-grey0 text-3xl font-bold">Chat For A Cause</h2>
        </Link>
        <div
          className={`md:flex duration-500 ${
            open
              ? `flex bg-whiteFixed z-10 absolute w-full justify-evenly p-2 m-0 border-b-2 border-grey6 border-l-whiteFixed duration-500 mt-32`
              : "hidden h-full duration-500 top-[-100%] "
          } items-center justify-between gap-8 border-l-2 border-grey6 pl-16`}
        >
          {!isLogged ? (
            <>
              <Link
                className="text-grey0 border-2 border-grey6 rounded w-36 h-9 font-semibold text-center pt-1"
                href="/"
              >
                Fazer Login
              </Link>
              <Link
                href="/register"
                className="border-2 text-grey0 border-grey6 rounded w-36 h-9 font-semibold text-center pt-1"
              >
                Cadastrar
              </Link>
            </>
          ) : (
            <div className="flex gap-2 items-center -ml-8 mr-4 ">
              <ImageManual name={user.name} />
              <p className="text-base h-fit">
                {user.name.length > 20
                  ? `${user.name.slice(0, 20)}...`
                  : user.name}
              </p>
              <button
                className="btn ml-6 bg-grey5 text-grey0 hover:text-grey6"
                onClick={() => logout()}
              >
                Sair
              </button>
            </div>
          )}
        </div>
        <div className="md:hidden flex" onClick={() => setOpen(!open)}>
          {open ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </div>
      </div>
    </header>
  );
};
