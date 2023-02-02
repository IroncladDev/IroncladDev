import { View, rcss, tokens, FlexRow, Text, Button } from "app/ui";
import useQuery from "../hooks/useQuery";
import { useAtom } from "jotai";
import { PageId, CurrentKey, CreatingKey } from "../state";
import useLazyQuery from "../hooks/useLazyQuery";
import Image from "next/image";
import { useEffect } from "react";
import { Layout, Plus, Trash } from "react-feather";
import { ObjectAny } from "app/types";
import { PostJSON } from "../lib";
import { Toast } from "app/lib/modal";

const NestedKey = ({ keyname }: { keyname: string }) => {
  const [currentKey, setCurrentKey] = useAtom(CurrentKey);
  const selected = keyname === currentKey;

  return (
    <View
      css={[
        rcss.p(8),
        rcss.borderRadius(0, 4, 4, 0),
        {
          transition: "0.25s",
          background: selected
            ? tokens.backgroundHighest
            : tokens.backgroundHigher,
          border: `solid 1px transparent`,
          borderLeft: `solid 1px ${tokens.backgroundHighest}`,
          "&:hover": {
            borderColor: tokens.subgroundHighest,
          },
        },
      ]}
      onClick={() => setCurrentKey(keyname)}
    >
      <Text variant="small">{keyname}</Text>
    </View>
  );
};

const InlineKey = ({
  _id,
  selected,
  name,
  links,
  refresh,
}: {
  _id: string;
  selected: boolean;
  name: string;
  links: Array<ObjectAny>;
  refresh: () => void;
}) => {
  const [page, setPage] = useAtom(PageId);
  const [currentKey, setCurrentKey] = useAtom(CurrentKey);
  const [, setCreating] = useAtom(CreatingKey);

  const [fire, { data, loading }] = useLazyQuery(
    "/api/admin/contentById?id=" + page
  );
  const content = data?.content || {};
  const keys = Object.keys(content);

  const deletePage = () => {
    const shouldDelete = prompt(
      "Are you sure you want to delete this page? Type 'deletepage' to confirm."
    );
    if (shouldDelete === "deletepage") {
      PostJSON("/api/admin/deletePage", { page: _id }).then(({ success }) => {
        if (success) {
          Toast.fire("Page deleted");
          refresh();
        } else {
          Toast.fire("Internal Server Error");
        }
      });
    }
  };

  useEffect(() => {
    if (selected) {
      fire();
    }
  }, [selected]);

  useEffect(() => {
    fire();
  }, [links]);

  useEffect(() => {
    if (!currentKey) {
      setCurrentKey(keys[0]);
    }
  }, [keys]);

  return (
    <View
      key={"v-" + _id}
      css={[
        rcss.flex.column,
        rcss.borderRadius(4),
        {
          background: selected ? tokens.backgroundHigher : "transparent",
          border: `solid 1px ${
            selected ? tokens.backgroundHighest : "transparent"
          }`,
        },
      ]}
      onClick={() => setPage(_id)}
    >
      <View
        css={[
          rcss.p(8),
          selected ? rcss.borderRadius(4, 4, 0, 0) : rcss.borderRadius(8),
          rcss.flex.row,
          rcss.rowWithGap(8),
          rcss.align.center,
          {
            borderBottom: selected
              ? `solid ${tokens.backgroundHighest} 1px`
              : "none",
            transition: "0.25s",
            "&:hover": {
              background: selected
                ? tokens.backgroundHighest
                : tokens.backgroundHigher,
              cursor: "pointer",
            },
          },
        ]}
      >
        <Layout size={16} />
        <Text>{name[0].toUpperCase() + name.slice(1)}</Text>
      </View>
      {selected ? (
        <>
          {loading ? (
            "Loading..."
          ) : (
            <View css={[rcss.p(8)]}>
              {keys.map((key) => (
                <NestedKey key={key} keyname={key} />
              ))}
            </View>
          )}
          <View
            css={[rcss.px(8), rcss.pb(8), rcss.flex.row, rcss.rowWithGap(8)]}
          >
            <Button
              onClick={() => setCreating(true)}
              text="New Key"
              iconLeft={<Plus size={12} />}
              small
            />

            <Button
              onClick={deletePage}
              text="Delete"
              iconLeft={<Trash size={12} />}
              small
            />
          </View>
        </>
      ) : null}
    </View>
  );
};

export default function Sidebar({
  links,
  loading,
  refresh,
}: {
  links: Array<ObjectAny>;
  loading: boolean;
  refresh: () => void;
}) {
  const [page, setPage] = useAtom(PageId);

  const addPage = () => {
    const pageName = prompt("Enter page name");
    if (pageName && typeof pageName === "string") {
      PostJSON("/api/admin/createPage", { name: pageName }).then(
        ({ success }) => {
          if (success) {
            refresh();
          } else {
            Toast.fire("Internal server error");
          }
        }
      );
    }
  };

  useEffect(() => {
    if (!page && links) {
      setPage(links[0]._id);
    }
  }, [links]);

  return (
    <View
      css={[
        rcss.flex.column,
        rcss.colWithGap(8),
        {
          background: tokens.backgroundDefault,
          minWidth: 150,
          borderRight: `solid 1px ${tokens.backgroundHighest}`,
        },
      ]}
    >
      <View
        css={[
          rcss.p(16),
          {
            background: tokens.backgroundHigher,
          },
        ]}
      >
        <FlexRow gap={8} center>
          <Image
            src="/brand/logo-white-transparent.svg"
            alt="IroncladDev Logo"
            width="32"
            height="32"
          />

          <Image
            src="/brand/headline.svg"
            alt="Headline"
            height="24"
            width={8 * 15}
          />
        </FlexRow>
      </View>
      <View css={[rcss.px(8), rcss.colWithGap(8)]}>
        {loading
          ? "Loading..."
          : links.map(({ _id, name }: { _id: string; name: string }) => (
              <InlineKey
                key={_id}
                _id={_id}
                selected={_id === page}
                name={name}
                links={links}
                refresh={refresh}
              />
            ))}

        <Button
          text="Add Page"
          onClick={addPage}
          iconLeft={<Plus size={16} />}
        ></Button>
      </View>
    </View>
  );
}
