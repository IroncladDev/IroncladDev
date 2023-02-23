import { View, rcss } from "app/ui";
import { useAtom } from "jotai";
import useQuery from "../hooks/useQuery";
import { PageId, CurrentKey } from "../state";
import { useEffect } from "react";
import { ObjectAny } from "app/types";

const RenderCurrentKey = ({ data }: { data: ObjectAny | undefined }) => {
  return <View>asdf</View>;
};

export default function Subnav() {
  const [page] = useAtom(PageId);
  const [currentKey, setCurrentKey] = useAtom(CurrentKey);

  const { data, loading } = useQuery<ObjectAny>(
    "/api/admin/contentById?id=" + page
  );
  const content = data?.content || {};
  const keys = Object.keys(content);

  useEffect(() => {
    if (!currentKey) {
      setCurrentKey(keys[0]);
    }
  }, [keys]);

  return (
    <View css={[rcss.flex.grow(1), rcss.p(16)]}>
      {loading ? (
        <View>Loading...</View>
      ) : (
        <View>
          <RenderCurrentKey data={content?.[currentKey]} />
        </View>
      )}
    </View>
  );
}
