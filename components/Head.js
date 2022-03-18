import Head from "next/head";

export default function HeadSection({title}) {

    const headData = {
        title: title + " | Big Picture Coin",
        description: "Use our app to stake your BPC tokens and participate in the weekly BPC lottery!",
        favIconUrl: "/logo.png",
    }

    return(
        <Head>
          <title>{headData.title}</title>
          <meta name="description" content={headData.description} />
          <link rel="icon" href={headData.favIconUrl} />
          <meta property="og:title" content={headData.title} />
          <meta property="og:description" content={headData.description} />
          <meta property="og:image" content={headData.ogUrl} />
          <meta name="twitter:image" content={headData.ogUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:description" content={headData.description} />
          <meta name="twitter:title" content={headData.title} />
          <meta name="twitter:site" content={headData.site} />
          <meta name="twitter:creator" content={headData.creator} />
        </Head>
    )
}