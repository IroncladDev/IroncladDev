import {
  View,
  Text,
  Input,
  TextArea,
  Button,
  rcss,
  Select,
  tokens,
} from "app/ui";
import { useAtom } from "jotai";
import { CreatingKey, PageId } from "../state";
import { useEffect, useState } from "react";
import { PostJSON } from "../lib";
import { Toast } from "app/lib/modal";
import { ObjectAny, KeyType, ContentType } from "app/types";
import { Plus } from "react-feather";

export default function CreateKey({ refresh }: { refresh: () => void; }) {
  const [, setCreating] = useAtom(CreatingKey);
  const [keyname, setKeyName] = useState("");
  const [type, setType] = useState<ContentType>("kv");

  const [value, setValue] = useState("");
  const [id] = useAtom(PageId)

  const [keySchema, setKeySchema] = useState<Array<[string, KeyType]>>([
    ["id", "string"],
    ["field", "string"],
  ]);

  const validateJson = (value: string) => {
    try {
      JSON.parse(value);
      return true;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    switch (type) {
      case "kv":
        setValue("value");
        break;
      case "object":
        setValue('{\n  "field": "value"\n}');
        break;
      case "array":
        setValue("[]");
    }
  }, [type]);

  const submit = () => {
    let val: {
      value?: string | Array<ObjectAny> | ObjectAny;
      type: ContentType;
      keySchema?: ObjectAny;
    } = { type };

    if(type === "kv") {
      val.value = value;
    } else if(type === "object") {
      val.value = JSON.parse(value);
    } else if(type === "array") {
      val.value = [];
      val.keySchema = Object.fromEntries(keySchema);
    }

    PostJSON("/api/admin/createKey", {
      keyname,
      id,
      value: val
    }).then(({ success }) => {
      if (success) {
        setCreating(false);
        refresh();
      } else {
        Toast.fire("Failed to create key")
      }
    })
  };

  return (
    <View css={[rcss.flex.grow(1), rcss.flex.row]}>
      <View css={[rcss.colWithGap(8), rcss.p(16)]}>
        <Text variant="subheadDefault">New Key</Text>
        <Text color="dimmer" variant="small">
          Key name
        </Text>
        <Input
          value={keyname}
          onChange={(e) => setKeyName(e.target.value)}
          placeholder="Lorem"
        />
        <Text color="dimmer" variant="small">
          Type
        </Text>
        <Select value={type} onChange={(e) => setType(e.target.value as ContentType)}>
          <option value="kv">Key-value</option>
          <option value="object">Object</option>
          <option value="array">Array</option>
        </Select>
        <View css={[rcss.flex.row]}>
          <Button text="Cancel" onClick={() => setCreating(false)} />
        </View>
      </View>

      <View
        css={[
          rcss.flex.grow(1),
          rcss.p(16),
          rcss.colWithGap(16),
          {
            background: tokens.backgroundDefault,
          },
        ]}
      >
        {type === "array" ? (
          <View css={[rcss.colWithGap(8)]}>
            <Text variant="subheadDefault">Define Schema</Text>
            {keySchema.map(([key, type], i) => (
              <View key={i} css={[rcss.flex.row, rcss.rowWithGap(8)]}>
                <Input
                  value={key}
                  onChange={(e) => {
                    const newSchema = [...keySchema];
                    newSchema[i][0] = e.target.value;
                    setKeySchema(newSchema);
                  }}
                  placeholder="field"
                />
                <Select
                  value={type}
                  onChange={(e) => {
                    const newSchema = [...keySchema];
                    newSchema[i][1] = e.target.value as KeyType;
                    setKeySchema(newSchema);
                  }}
                >
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                </Select>
              </View>
            ))}
            <View css={[rcss.flex.row, rcss.rowWithGap(8)]}>
              <Button
                text="Field"
                iconLeft={<Plus size={16}/>}
                onClick={() =>
                  setKeySchema([...keySchema, ["field", "string"]])
                }
              />
              <Button text="Save" onClick={submit}/>
            </View>
          </View>
        ) : (
          <View css={[rcss.colWithGap(8)]}>
            <Text variant="subheadDefault">Initial Value</Text>
            <TextArea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={type === "object" ? "{}" : "value"}
              rows={/\n/.test(value) ? value.match(/\n/g).length + 1 : 1}
            />
            <View css={[rcss.flex.row]}>
              <Button
                text="Create"
                onClick={submit}
                disabled={
                  !(
                    (type === "object" ? validateJson(value) : value.length) &&
                    keyname.length
                  )
                }
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
