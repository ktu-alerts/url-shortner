import { NextApiRequest, NextApiResponse, NextPage } from "next";
import Head from "next/head";
import connectToDatabase from "../mongodb";
import { COLLECTION_NAMES } from "../types";

export async function getServerSideProps(request: NextApiRequest) {
  try {
    const hash = request.query.hash as string;
    const database = await connectToDatabase();

    // Find the campaign with the given hash
    const campaign = await database
      .collection(COLLECTION_NAMES["url-info"])
      .findOne({ uid: hash });

    if (campaign) {
      // If the campaign exists, increment the clicked count and redirect to the campaign link
      await database
        .collection(COLLECTION_NAMES["url-info"])
        .updateOne({ uid: hash }, { $inc: { clicked: 1 } });
      return {
        redirect: {
          destination: campaign.link,
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.error("An error occurred while fetching the campaign:", error);
  }

  // If the campaign doesn't exist, return empty props
  return {
    props: {},
  };
}

const HashPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>URL Shortener</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Requested link not found</h1>
    </div>
  );
};

export default HashPage;