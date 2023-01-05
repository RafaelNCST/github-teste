import "./styles.css";
import { AiOutlineMail } from "react-icons/ai";
import { BsPeople, BsHeart, BsStar, BsLink45Deg } from "react-icons/bs";
import { BiMap, BiBuilding } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { CiTwitter } from "react-icons/ci";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../../../components/loadingSpinner";

interface SideBarProps {
  avatar_url: string;
  following: number;
  followers: number;
  description: string;
  email: string;
  name: string;
  username: string;
  website: string;
  organization: string;
  twitter: string;
  location: string;
  star_url: string;
}

export const SideBar: React.FC<SideBarProps> = ({
  avatar_url,
  following,
  followers,
  description,
  email,
  name,
  username,
  website,
  organization,
  twitter,
  location,
  star_url,
}) => {
  const navigate = useNavigate();

  const [image, setImage] = useState<string>("");
  const [star, setStar] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchImage = async () => {
    const res = await fetch(avatar_url);
    await res.blob().then((data) => {
      const imageObjectUrl = URL.createObjectURL(data);
      setImage(imageObjectUrl);
    });
  };

  const fetchStars = async () => {
    const res = await fetch(
      `https://api.github.com/users/${username}/starred?page=${page}`
    );
    await res.json().then((data) => {
      if (data.length !== 0) {
        console.log("data:", data.length, "star:", star);
        setStar((prev) => prev + Number(data.length));
        setPage((prev) => prev + 1);
      } else {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchImage();
  }, []);

  useEffect(() => {
    fetchStars();
  }, [page]);

  return (
    <aside className="side-bar">
      {!loading ? (
        <>
          <header className="container-user-image">
            <img className="image" src={image} alt="imagem do perfil" />
          </header>
          <div className="bottom-area-side-bar">
            <p className="italic-text username">{name}</p>
            <p className="italic-text second-text">{username}</p>
            {!!description && <p className="normal-text">{description}</p>}
            <div className="likes-area">
              <div className="container-itens-likes-area">
                <BsPeople className="like-icon" />
                <p className="italic-text text-likes-area">
                  {followers} followers
                </p>
              </div>
              <div className="container-itens-likes-area">
                <BsHeart className="like-icon" />
                <p className="italic-text text-likes-area">
                  {following} following
                </p>
              </div>
              <div className="container-itens-likes-area">
                <BsStar className="like-icon" />
                <p className="italic-text text-likes-area">{star} stars</p>
              </div>
            </div>
            <div className="social-area">
              {!!organization && (
                <div className="container-area">
                  <BiBuilding color="white" fontSize={25} />
                  <p className="italic-text icons-text">{organization}</p>
                </div>
              )}
              {!!location && (
                <div className="container-area">
                  <BiMap color="white" fontSize={25} />
                  <p className="italic-text icons-text">{location}</p>
                </div>
              )}
              {!!email && (
                <div className="container-area">
                  <AiOutlineMail color="white" fontSize={25} />
                  <p className="italic-text icons-text">{email}</p>
                </div>
              )}
              {!!website && (
                <div className="container-area">
                  <BsLink45Deg color="white" fontSize={25} />
                  <p className="italic-text icons-text">{website}</p>
                </div>
              )}
              {!!twitter && (
                <div className="container-area">
                  <CiTwitter color="white" fontSize={25} />
                  <p className="italic-text icons-text">{twitter}</p>
                </div>
              )}
            </div>
            <div className="button-div">
              <button
                className="button-back"
                onClick={() => navigate("/", { replace: true })}
              >
                Voltar
              </button>
            </div>
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </aside>
  );
};
