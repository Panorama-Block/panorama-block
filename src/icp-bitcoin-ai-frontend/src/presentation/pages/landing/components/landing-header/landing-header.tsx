import React, { useState } from "react";
import styles from "./landing-header-styles.module.scss";
import Button from "../../../../components/button/button";

type Item = {
  title: string;
  url: string;
};

const navItems: Item[] = [
  { title: "Home", url: "/#home" },
  { title: "About", url: "#about" },
  { title: "Docs", url: "https://docs.panoramablock.com/" },
];

type Props = {
  connect: () => void
}

const LandingHeader: React.FC<Props> = ({ connect }: Props) => {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <img className={styles.logo} src="/Logo.png" alt="" />
        <nav className={styles.navigation}>
          {navItems.map((item, index) => (
            item.title !== "Docs" ? (
              <div
                key={`header-item-${index}`}
                className={`${styles.navItem} ${active === index ? styles.active : ""
                  }`}
                onClick={() => {
                  setActive(index);
                  index === 1 && window.scrollTo({ top: 868, behavior: "smooth" });
                }}
              >
                {item.title}
              </div>
            )
              : (
                <a className={`${styles.navItem} ${active === index ? styles.active : ""}`} href={item.url} target="__blank" key={`header-item-${index}`}>{item.title}</a>
              )
          ))}
        </nav>
        <div className={styles.connect}>
          <Button
            type="wallet"
            title="Launch App"
            onClick={connect}
          />
        </div>
      </div>
    </div >
  );
};

export default LandingHeader;
