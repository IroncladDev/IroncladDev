import { View, rcss, tokens, Text, Input, TextArea, Button } from "app/ui";
import { useAtom } from "jotai";
import { PageId, CurrentKey } from "../state";
import { useEffect, useState, useRef } from "react";
import { ObjectAny } from "app/types";
import { generateId } from "../lib";
import useLazyQuery from "../hooks/useLazyQuery";
import { PostJSON } from "../lib";
import { Toast } from "app/lib/modal";

const KeyValueEditor = ({ data }: { data: ObjectAny }) => {
  const [value, setValue] = useState(data.value);
  const [key] = useAtom(CurrentKey);
  const [id] = useAtom(PageId);

  const save = () => {
    PostJSON("/api/admin/edit", {
      value,
      id,
      key,
      type: "kv",
    }).then(({ success }) => {
      if (success) {
        Toast.fire("Saved");
      } else {
        Toast.fire("Internal Server Error");
      }
    });
  };

  return (
    <View css={[rcss.colWithGap(8)]}>
      <TextArea
        placeholder="..."
        rows={value.match(/\n/g)?.length ? value.match(/\n/g).length + 1 : 1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <View css={[rcss.flex.row]}>
        <Button
          text="Save"
          small
          onClick={save}
          disabled={value === data.value}
        />
      </View>
    </View>
  );
};

const EditableListItem = ({
  obj,
  arr,
  refresh,
}: {
  obj: ObjectAny;
  arr: Array<ObjectAny>;
  refresh: () => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [key] = useAtom(CurrentKey);
  const [id] = useAtom(PageId);
  const [stringifiedValue, setStringifiedValue] = useState(
    JSON.stringify(obj, null, 2)
  );

  const save = () => {
    const newArr = arr.map((item) => {
      if (obj.id === item.id) {
        return JSON.parse(stringifiedValue);
      } else {
        return item;
      }
    });

    PostJSON("/api/admin/edit", {
      value: newArr,
      key,
      id,
      type: "array",
    }).then(({ success }) => {
      if (success) {
        refresh();
        setEditing(false);
      } else {
        Toast.fire("Internal server error");
      }
    });
  };

  const deleteItem = () => {
    const shouldDelete = confirm("Are you sure you would like to delete this?");

    if (shouldDelete) {
      PostJSON("/api/admin/edit", {
        key,
        id,
        type: "array",
        value: arr.filter((item) => item.id !== obj.id),
      }).then(({ success }) => {
        if (success) {
          refresh();
          setEditing(false);
        } else {
          Toast.fire("Internal Server Error");
        }
      });
    }
  };

  const validateJSON = () => {
    try {
      JSON.parse(stringifiedValue);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <View
      css={[
        rcss.borderRadius(8),
        rcss.p(16),
        rcss.flex.row,
        rcss.rowWithGap(8),
        {
          background: tokens.backgroundDefault,
        },
      ]}
    >
      <View css={[rcss.flex.grow(1)]}>
        {editing ? (
          <View css={[rcss.colWithGap(8)]}>
            <TextArea
              value={stringifiedValue}
              onChange={(e) => setStringifiedValue(e.target.value)}
              rows={
                stringifiedValue.match(/\n/g)?.length
                  ? stringifiedValue.match(/\n/g).length + 1
                  : 1
              }
            />
            <View css={[rcss.rowWithGap(8)]}>
              <Button
                text="Save"
                small
                disabled={!validateJSON()}
                onClick={save}
              />
              <Button text="Cancel" onClick={() => setEditing(false)} small />
            </View>
          </View>
        ) : (
          Object.entries(obj).map(([key, val], j) => (
            <Text color="dimmer" key={j}>
              <>
                <strong>{key}</strong>: {val}
              </>
            </Text>
          ))
        )}
      </View>

      <View css={[rcss.flex.column, rcss.colWithGap(4)]}>
        <Button text="Edit" small onClick={() => setEditing(true)} />
        <Button text="Delete" small onClick={deleteItem} />
      </View>
    </View>
  );
};

const ArrayEditor = ({
  data,
  refresh,
}: {
  data: ObjectAny;
  refresh: () => void;
}) => {
  const pairs = Object.entries(data.keySchema);
  const [key] = useAtom(CurrentKey);
  const [id] = useAtom(PageId);
  const [input, setInput] = useState<ObjectAny>(
    Object.fromEntries(
      pairs.map(([key, type]) => {
        if (key === "id") {
          return [key, generateId()];
        }
        if (type === "number") {
          return [key, 0];
        } else if(type === "date") {
           return [key, String(new Date().toISOString().split("T")[0])];
        }else {
          return [key, ""];
        }
      })
    )
  );

  const insertValue = () => {
    PostJSON("/api/admin/edit", {
      key,
      id,
      type: "array",
      value: [...data.value, input],
    }).then(({ success }) => {
      if (success) {
        refresh();
        setInput(
          Object.fromEntries(
            pairs.map(([key, type]) => {
              if (key === "id") {
                return [key, generateId()];
              }
              if (type === "number") {
                return [key, 0];
              } else {
                return [key, ""];
              }
            })
          )
        );
      } else {
        Toast.fire("Internal server error");
      }
    });
  };

  return (
    <View css={[rcss.colWithGap(16)]}>
      <View css={[rcss.colWithGap(8)]}>
        {pairs.map(([name, type]) =>
          name === "id" ? null : (
            <View css={[rcss.colWithGap(8)]}>
              <Text color="dimmer">
                {name[0].toUpperCase() + name.slice(1)}
              </Text>
              {type === "string" ? (
                <TextArea
                  value={input[name]}
                  onChange={(e) =>
                    setInput((inp) => ({ ...inp, [name]: e.target.value }))
                  }
                  placeholder={type}
                  rows={
                    input[name]?.match(/\n/g)?.length
                      ? input[name]?.match(/\n/g).length + 1
                      : 1
                  }
                />
              ) : null}
              {type === "number" ? (
                <Input
                  type="number"
                  value={input[name]}
                  onChange={(e) =>
                    setInput((inp) => ({
                      ...inp,
                      [name]: Number(e.target.value),
                    }))
                  }
                  placeholder={type}
                />
              ) : null}
              {type === "date" ? (
                <Input
                  type="date"
                  value={input[name]}
                  onChange={(e) =>
                    setInput((inp) => ({
                      ...inp,
                      [name]: String(e.target.value),
                    }))
                  }
                  placeholder={type}
                />
              ) : null}
            </View>
          )
        )}

        <View css={[rcss.flex.row]}>
          <Button
            text="Insert"
            onClick={insertValue}
            disabled={!Object.values(input).every((x) => String(x).length > 0)}
            small
          />
        </View>
      </View>
      <View
        css={[
          rcss.colWithGap(8),
          rcss.pt(16),
          {
            borderTop: `solid 1px ${tokens.backgroundHighest}`,
          },
        ]}
      >
        {data.value.map((obj, i) => (
          <EditableListItem
            obj={obj}
            key={i}
            arr={data.value}
            refresh={refresh}
          />
        ))}
      </View>
    </View>
  );
};

const ObjectEditor = ({ data, refresh }) => {
  const initialData = JSON.stringify(data.value, null, 2);
  const [initialValue, setInitialValue] = useState(initialData);
  const [key] = useAtom(CurrentKey);
  const [id] = useAtom(PageId);

  useEffect(() => {
    setInitialValue(initialData);
  }, [data]);

  const save = () => {
    PostJSON("/api/admin/edit", {
      id,
      key,
      type: "object",
      value: JSON.parse(initialValue),
    }).then(({ success }) => {
      if (success) {
        refresh();
      } else {
        Toast.fire("Internal server error");
      }
    });
  };

  const validateJSON = () => {
    try {
      JSON.parse(initialValue);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <View css={[rcss.colWithGap(8)]}>
      <TextArea
        value={initialValue}
        onChange={(e) => setInitialValue(e.target.value)}
        rows={
          initialValue.match(/\n/g)?.length
            ? initialValue.match(/\n/g).length + 1
            : 1
        }
      />
      <View css={[rcss.rowWithGap(8)]}>
        <Button
          text="Save"
          disabled={!validateJSON() || initialValue === initialData}
          onClick={save}
          small
        />
        {initialValue === initialData ? null : (
          <Button
            text="Cancel"
            onClick={() => setInitialValue(initialData)}
            small
          />
        )}
      </View>
    </View>
  );
};

const Manage = ({ refreshSidebar }) => {
  const [page] = useAtom(PageId);
  const [currentKey] = useAtom(CurrentKey);

  const [fire, { data, loading }] = useLazyQuery(
    "/api/admin/contentById?id=" + page
  );
  const content = data?.content || {};
  const current = content?.[currentKey];

  const deleteKey = () => {
    const confirmation = prompt(
      `Are you sure you would like to delete '${currentKey}'?  If so, please type the key name.`
    );
    if (confirmation === currentKey) {
      PostJSON("/api/admin/deleteKey", {
        keyname: currentKey,
        page,
      }).then(({ success }) => {
        if (success) {
          fire();
          refreshSidebar();
        }
      });
    }
  };

  const editRaw = () => {
    PostJSON("/api/admin/editRaw", {
      key: currentKey,
      value: JSON.parse(rawValue),
      id: page
    }).then(({success}) => {
      if (success) {
        fire();
      } else {
        Toast.fire("Internal server error");
      }
    })
  }

  const [rawValue, setRawValue] = useState<string>(
    JSON.stringify(content[currentKey], null, 2)
  );

  useEffect(() => {
    setRawValue(JSON.stringify(content[currentKey], null, 2));
  }, [content, currentKey])

  useEffect(() => {
    if (page) {
      fire();
    }
  }, [page]);

  const valid = () => {
    try {
      JSON.parse(rawValue);
      return rawValue !== JSON.stringify(content[currentKey], null, 2);
    } catch (e) {
      return false;
    }
  }

  return (
    <View css={[rcss.flex.row, rcss.flex.grow(1)]}>
      <View
        css={[
          rcss.flex.grow(1),
          rcss.p(16),
          rcss.flex.column,
          rcss.colWithGap(16),
        ]}
      >
        {loading || !current ? (
          <Text>{loading ? "Loading" : "No key selected"}</Text>
        ) : (
          <>
            <View
              css={[
                rcss.flex.row,
                rcss.align.center,
                rcss.justify.spaceBetween,
              ]}
            >
              <Text variant="subheadDefault">{currentKey}</Text>
              <Button text="Delete key" onClick={deleteKey} small />
            </View>
            {current.type === "kv" ? <KeyValueEditor data={current} /> : null}
            {current.type === "object" ? (
              <ObjectEditor refresh={fire} data={current} />
            ) : null}
            {current.type === "array" ? (
              <ArrayEditor refresh={fire} data={current} />
            ) : null}
          </>
        )}
      </View>

      <View
        css={[
          rcss.p(16),
          rcss.flex.column,
          rcss.colWithGap(8),
          {
            background: tokens.backgroundDefault,
            maxHeight: "100vh",
            overflowY: "auto",
            borderLeft: `solid 1px ${tokens.backgroundHighest}`,
          },
        ]}
      >
        <TextArea
          css={[rcss.flex.grow(1), {
            minWidth: 250
          }]}
          value={rawValue}
          onChange={e => setRawValue(e.target.value)}
        />
        <Button text="Save" disabled={!valid()} onClick={editRaw}/>
      </View>
    </View>
  );
};

export default Manage;
