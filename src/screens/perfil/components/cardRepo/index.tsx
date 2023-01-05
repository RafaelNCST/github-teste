import "./styles.css";
import { memo } from "react";
import moment from "moment";
import { BsStar } from "react-icons/bs";
import 'moment/locale/pt-br'

interface CardRepoProps {
  full_name: string;
  description: string;
  stargazers_count: number;
  updated_at: string;
}

export const CardRepo: React.FC<CardRepoProps> = memo(
  ({ full_name, description, stargazers_count, updated_at }) => {
    moment.locale("pt-br");
    const dateFromNow = moment(updated_at).fromNow();
    const titleTitme = moment(updated_at).format("LLLL");

    console.log(titleTitme);

    return (
      <article>
        <header className="card-body">
          <p className="texts-all repo-name-text">{full_name}</p>
          <p className="texts-all description-text">{description}</p>
          <div className="bottom-itens">
            <p className="texts-all bottom-text">
              <BsStar /> {stargazers_count} stars
            </p>
            <div className="dot-separator" />
            <time
              title={titleTitme}
              dateTime={updated_at}
              className="texts-all bottom-text"
            >
              Updated {dateFromNow}
            </time>
          </div>
        </header>
        <hr className="line" />
      </article>
    );
  }
);
