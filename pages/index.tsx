import type { NextPage } from "next";
import { GetServerSideProps } from "next";

const Home: NextPage = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: 'https://ktualerts.site', // Replace with your specific URL
      permanent: false,
    },
  };
};

export default Home;
