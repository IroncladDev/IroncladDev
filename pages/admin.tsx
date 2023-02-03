import Admin from "app/admin";
import { authenticateToken } from "server/lib/jwt";
import { rcss, View } from "app/ui";

export default function AdminPage({ authenticated }) {
  return (
    <View
      css={[
        rcss.flex.column,
        {
          height: "100vh",
          width: "100vw",
          overflowY: 'auto',
          overflowX: 'hidden'
        },
      ]}
    >
      <Admin authenticated={authenticated} />
    </View>
  );
}

export async function getServerSideProps({ req }) {
  return {
    props: {
      authenticated: !!(await authenticateToken(req.cookies.auth)),
    },
  };
}
