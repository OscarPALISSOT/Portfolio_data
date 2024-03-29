"use client";

import React from "react";
import styles from './footer.module.css';
import navTo from "@/modules/navTo";

interface FooterProps {
    links: string[];
}

export default function Footer({links}: FooterProps) {

    return (
        <>
            <footer className={styles.footer}>
                <ul className={styles.sitemap__list}>
                    {links.map(link => {
                        return (
                            <li key={link} className={styles.sitemap__item}>
                                <a
                                    href={'/' + '#' + link}
                                    onClick={(e) => navTo(e, link)}
                                >
                                    {link}
                                </a>
                            </li>
                        )
                    })}
                </ul>

                <div className={styles.copyright}>
                    <p>Oscar PALISSOT © {new Date().getFullYear()}</p>
                </div>
            </footer>
        </>
    )
}
