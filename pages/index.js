import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const connectHandler = async () => {
    try {
      await ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const login = (accounts) => {
    setWalletConnected(!!accounts.length);
  };

  const init = async () => {
    if (typeof ethereum === "undefined") {
      return;
    }

    setMetamaskInstalled(true);

    ethereum.on("accountsChanged", (accounts) => {
      login(accounts);
    });

    try {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      login(accounts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Demo React Web3</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Welcome</h1>

        <p className={styles.description}>
          How to start using Web3 on your React application.
        </p>

        <p className={styles.description}>
          {!metamaskInstalled ? (
            <a
              href="https://metamask.io/"
              target="https://metamask.io/download/"
            >
              Please Install MetaMask
            </a>
          ) : (
            !walletConnected && <button onClick={connectHandler}>Connect</button>
          )}
        </p>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          ${walletConnected &&
          `
          background: black;
          color: white;
          `}
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
