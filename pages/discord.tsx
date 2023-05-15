export default function Discord() {
  return <>yes</>;
}

export async function getServerSideProps({ req, res, query }) {
  return {
    redirect: {
      destination: process.env.DISCORD_INVITE,
    },
  };
}
