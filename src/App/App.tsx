import { observer } from "mobx-react-lite";
import styles from "./App.module.css";
import { Favorites } from "./Favorites/Favorites";
import { usePresenter } from "./logic/usePresenter";
import { SearchHeader } from "./SearchHeader/SearchHeader";
import { SearchResults } from "./SearchResults/SearchResults";

export const App = observer(() => {
  const { searchHeader, favorites, searchResults } = usePresenter();

  return (
    <main className={styles.root}>
      <div className={styles.shell}>
        <SearchHeader {...searchHeader} />
        <Favorites {...favorites} />
        {searchResults && <SearchResults {...searchResults} />}
      </div>
    </main>
  );
});
