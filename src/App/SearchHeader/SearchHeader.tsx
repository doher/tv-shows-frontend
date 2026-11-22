import { Brand } from "./Brand/Brand";
import { Horizon } from "./Horizon/Horizon";
import { SearchField } from "./SearchField/SearchField";
import styles from "./SearchHeader.module.css";

export const SearchHeader = () => {
  return (
    <header className={styles.hero}>
      <Horizon />
      <Brand />
      <SearchField />
    </header>
  );
};
