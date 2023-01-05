import "./styles.css";
import raster from "../../assets/images/Raster.png";
import { useState, useEffect, InvalidEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FormEvent, ChangeEvent } from "react";
import { ConsumerMainContext } from "../../contexts/consumerContext";

const placeholderInput = "Digite o nome a ser pesquisado aqui";

export const HomePage = () => {
  const navigate = useNavigate();
  const { setUserInfos, setActualPage } = ConsumerMainContext();
  const [searchInput, setSearchInput] = useState("");
  const [loadedData, setLoadedData] = useState(false);

  const getUserInfos = async () => {
    const response = await fetch(`https://api.github.com/users/${searchInput}`);
    await response.json().then((data) => {
      sessionStorage.setItem("user", JSON.stringify(data));
      setUserInfos(data);
      setLoadedData(true);
    });
  };

  const actionOnSearchUserInfo = (event: FormEvent) => {
    console.log('aqui tá')
    event?.preventDefault();
    getUserInfos();
    console.log('por aqui')
  };

  const actionChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.setCustomValidity("");
    setSearchInput(event?.target.value);
  };

  const actionEmptyInput = (event: InvalidEvent<HTMLInputElement>) => {
    event.target.setCustomValidity("Esse campo não pode estar vazio");
  };

  useEffect(() => {
    setUserInfos({});
    setActualPage(1);
    sessionStorage.clear();
  }, []);

  useEffect(() => {
    if (loadedData) {
      navigate("/perfil");
    }
  }, [navigate, loadedData]);

  const disabledEmptyInput = searchInput.length === 0;

  return (
    <div className="Body">
      <main className="Content">
        <p className="title">Search Devs</p>
        <div className="containerInput">
          <input
            onChange={actionChangeInput}
            className="Input-name"
            value={searchInput}
            placeholder={placeholderInput}
            onInvalid={actionEmptyInput}
            required
          ></input>
          <button
            type="submit"
            className="Button"
            onClick={actionOnSearchUserInfo}
            disabled={disabledEmptyInput}
          >
            <img src={raster} alt="lupa de busca" />
            Buscar
          </button>
        </div>
      </main>
    </div>
  );
};
