import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Home = ({ shows }) => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" type="image/x-icon" href="../static/favicon.ico" />
    </Head>

    <h1>Welcome to my website!</h1>
    <p>I'm using server side rendering to get the batman shows.</p>
    <ul>
      { shows.map(show => (
        <li key={ show.id }>
          <Link href="/p/[id]" as={`/p/${ show.id }`}>
            <a>{ show.name }</a>
          </Link>
        </li>
      )) }
    </ul>
  </div>
)

Home.getInitialProps = async () => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${ data.length }`)

  return {
    shows: data.map(entry => entry.show),
  }
}

export default Home
