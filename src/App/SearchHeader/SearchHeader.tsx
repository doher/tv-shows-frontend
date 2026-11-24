import { Brand } from "./Brand/Brand";
import { Horizon } from "./Horizon/Horizon";
import { SearchField } from "./SearchField/SearchField";
import styles from "./SearchHeader.module.css";
import type { SearchHeaderProps } from "./types";

export const SearchHeader = ({ children }: SearchHeaderProps) => {
  return (
    <header className={styles.hero}>
      <Horizon />
      <div className={styles.toolbar}>
        <Brand />
        {children}
      </div>
      <SearchField />
    </header>
  );
};
