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
import { CreatingKey } from "../state";
import { useState } from "react";

export default function CreateKey() {
  const [, setCreating] = useAtom(CreatingKey);
  const [keyname, setKeyName] = useState("");
  const [type, setType] = useState("kv");

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
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="kv">Key-value</option>
          <option value="object">Object</option>
          <option value="array">Array</option>
        </Select>
        <View css={[rcss.flex.row]}>
          <Button text="Cancel" onClick={() => setCreating(false)} small />
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
        {type === "array" ? <View>
          
        </View> : <View>
        
        </View>}
      </View>
    </View>
  );
}
