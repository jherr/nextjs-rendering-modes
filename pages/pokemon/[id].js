/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Detail.module.css";

const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
// https://jherr-pokemon.s3.us-west-1.amazonaws.com

export async function getStaticPaths() {
  const resp = await fetch(`${NEXT_PUBLIC_API_URL}/index.json`);
  const pokemon = await resp.json();

  return {
    paths: pokemon.map(({ id }) => ({ params: { id: id.toString() } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const resp = await fetch(`${NEXT_PUBLIC_API_URL}/pokemon/${params.id}.json`);
  return {
    props: {
      pokemon: await resp.json(),
    },
    // revalidate: 30,
  };
}

export default function Detail({ pokemon }) {
  if (!pokemon) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`${NEXT_PUBLIC_API_URL}/${pokemon.image}`}
            alt={pokemon.name.english}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
