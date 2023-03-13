import { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faSpinner,
  faMagnifyingGlass,
  faEllipsisVertical,
  faEarthAsia,
  faCircleQuestion,
  faKeyboard,
  faMessage,
  faCloudUpload,
  faUser,
  faCoins,
  faGear,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import HeadLessTippy from "@tippyjs/react/headless";
import Tippy from "@tippyjs/react";

import Button from "~/components/Button";
import styles from "./Header.module.scss";
import images from "~/assets/images";
import { Wrapper as PopperWapper } from "~/components/Popper";
import { useEffect } from "react";

import AccountItem from "~/components/AccountItem";
import Menu from "~/components/Popper/Menu";
import "tippy.js/dist/tippy.css";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: "English",
    children: {
      title: "Language",
      data: [
        {
          code: "en",
          title: "English",
          type: "language",
        },
        {
          code: "vi",
          title: "Tiếng Việt",
          type: "language",
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: "Feedback and help",
    to: "/feedback",
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: "Keyboard shortcuts",
  },
];

function Header() {
  const [searchResult, setSearchResult] = useState([]);

  const currentUser = true;

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([]);
    }, 1000);
  }, []);

  //handle logic
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case "language":
        break;
      default:
    }
  };

  const userMenu =  [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "View profile",
      to: "/@meee",
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: "Get coins",
      to: "/coins",
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: "Settings",
      to: "/Settings",
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: "Log out",
      to: "/Logout",
      separate: true,
    },
  ]
  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <img src={images.logo} alt="Tiktok" />
        <HeadLessTippy
          interactive
          visible={searchResult.length > 0}
          render={(attrs) => (
            <div className={cx("search-result")} tabIndex="-1" {...attrs}>
              <PopperWapper>
                <h4 className={cx("search-title")}>Accounts</h4>
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
              </PopperWapper>
            </div>
          )}
        >
          <div className={cx("search")}>
            <input placeholder="Search account and videos" spellCheck={false} />
            <button className={cx("clear")}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />

            <button className={cx("search-btn")}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </HeadLessTippy>
        <div className={cx("actions")}>
          {currentUser ? (
            <>
              <Tippy delay={[0, 200]} content="Upload video" placement="bottom">
                <button>
                  <FontAwesomeIcon
                    className={cx("action-btn")}
                    icon={faCloudUpload}
                  />
                </button>
              </Tippy>
              <button>
                <FontAwesomeIcon
                  className={cx("action-btn")}
                  icon={faMessage}
                />
              </button>
            </>
          ) : (
            <>
              <Button text>Upload</Button>
              <Button primary>Login</Button>
            </>
          )}
          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <img
                className={cx("user-avatar")}
                src="https://p77-sign-va-lite.tiktokcdn.com/tos-maliva-avt-0068/9c8b3369a80772f7285ea259c9fb222c~c5_100x100.jpeg?x-expires=1678874400&x-signature=LCqReiN69N1UsG4INODnS3F5rB4%3D"
                alt="Nguyen Van A"
              />
            ) : (
              <button className={cx("more-btn")}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
