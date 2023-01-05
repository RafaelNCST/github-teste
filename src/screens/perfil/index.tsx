import "./styles.css";
import { useState, useEffect } from "react";
import { ConsumerMainContext } from "../../contexts/consumerContext";
import { MOCK } from "./data/mock";
import { SideBar } from "./components";
import { CardRepo } from "./components";
import { Pagination } from "./components";
import { LoadingSpinner } from "../../components/loadingSpinner";

export const Perfil = () => {
  const { userInfos, actualPage, setActualPage } = ConsumerMainContext();

  const {
    public_repos,
    repos_url,
    avatar_url,
    following,
    followers,
    bio,
    email,
    name,
    login,
    blog,
    company,
    twitter_username,
    location,
    starred_url,
  } = userInfos;

  const getMaxPages = Math.ceil(public_repos / 30);

  const [actualArrayRepos, setActualArrayRepos] = useState<any>(MOCK);
  const [loading, setLoading] = useState(true);
  const [showPagination, setShowPagination] = useState(false);

  const getRepositories = async () => {
    const response = await fetch(`${repos_url}?page=${actualPage}`);
    await response.json().then((data) => {
      window.scrollTo(0, 0);
      sessionStorage.setItem("page", String(actualPage));
      setActualArrayRepos(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (actualArrayRepos.length >= 30) {
      setShowPagination(true);
    }
  }, [actualArrayRepos.length]);

  useEffect(() => {
    setLoading(true);
    getRepositories();
  }, [actualPage]);

  return (
    <div className="body">
      <SideBar
        avatar_url={avatar_url}
        name={name}
        username={login}
        description={bio}
        following={following}
        followers={followers}
        organization={company}
        location={location}
        email={email}
        website={blog}
        twitter={twitter_username}
        star_url={starred_url}
      />
      {!loading ? (
        <section className="content-repos">
          {actualArrayRepos.map((item: any) => (
            <CardRepo key={item.id} {...item} />
          ))}
          {showPagination ? (
            <Pagination
              setActualPage={setActualPage}
              actualPage={actualPage}
              maxPages={getMaxPages}
            />
          ) : null}
        </section>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
