import { useState, useEffect, useRef } from "react";
import {
  faCircleXmark,
  faSpinner,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import * as searchServices from "~/apiServices/searchServices";

import HeadLessTippy from "@tippyjs/react/headless";
import { Wrapper as PopperWapper } from "~/components/Popper";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Search.module.scss";
import AccountItem from "~/components/AccountItem";
import { useDebounce } from "~/hooks";

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setsearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const deboundced = useDebounce(searchValue, 500);

  const inputRef = useRef();

  useEffect(() => {
    if (!deboundced.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);

      const result = await searchServices.search(deboundced);
      setSearchResult(result);

      setLoading(false);
    };

    fetchApi();
  }, [deboundced]);

  const handleClear = () => {
    setsearchValue("");
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValueInput = e.target.value;
    if (!searchValueInput.startsWith(" ")) {
      setsearchValue(searchValueInput);
    }
  };

  return (
    //tippy error wrapper
    <div>
      <HeadLessTippy
        interactive
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <PopperWapper>
              <h4 className={cx("search-title")}>Accounts</h4>
              {searchResult.map((result) => {
                return <AccountItem key={result.id} data={result} />;
              })}
            </PopperWapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            placeholder="Search account and videos"
            value={searchValue}
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx("clear")} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          {loading && (
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
          )}

          <button
            className={cx("search-btn")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </HeadLessTippy>
    </div>
  );
}

export default Search;
