export default function Discord() {
  return <>yes</>;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: process.env.DISCORD_INVITE,
    },
  };
}
