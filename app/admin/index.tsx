import { View, rcss } from "app/ui";
import Login from "./components/login";
import Sidebar from "./components/sidebar";
import Manage from "./components/manage";
import { useAtom } from "jotai";
import { CreatingKey, CurrentKey, PageId } from "./state";
import CreateKey from "./components/create-key";
import { useEffect } from "react";
import useQuery from "./hooks/useQuery";
import { ObjectAny } from "app/types";

interface Props {
  authenticated: boolean;
}

export default function Admin({ authenticated }: Props) {
  const [creating, setCreating] = useAtom(CreatingKey);
  const [currentKey] = useAtom(CurrentKey);
  const [page] = useAtom(PageId);
  const { data: links, loading, refetch } = useQuery<Array<ObjectAny>>("/api/admin/sidebar");

  useEffect(() => {
    if (creating) {
      setCreating(false);
    }
  }, [currentKey, page]);

  return authenticated ? (
    <View css={[rcss.flex.row, rcss.flex.grow(1), {
      maxWidth: '100vw'
    }]}>
      <Sidebar links={links} loading={loading} refresh={refetch} />
      {creating ? <CreateKey refresh={() => {
        refetch();
      }} /> : <Manage refreshSidebar={refetch} />}
    </View>
  ) : (
    <Login />
  );
}
