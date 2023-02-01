import { View, rcss, tokens, Input, Text, Button } from "app/ui";
import { useState } from "react";
import { PostJSON } from "../lib";
import router from "next/router";

export default function Login() {
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await PostJSON("/api/login", {
      password,
    });
    if (res.success) {
      router.push(window.location.pathname);
    } else {
      alert(res.message);
    }
  };

  return (
    <View css={[rcss.flex.column, rcss.center, rcss.flex.grow(1)]}>
      <View
        css={[
          rcss.borderRadius(8),
          rcss.p(16),
          rcss.flex.column,
          rcss.colWithGap(8),
          {
            background: tokens.backgroundDefault,
            minWidth: 300,
          },
        ]}
      >
        <Text>Enter Password</Text>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="sus"
          type="password"
        />
        <View css={[rcss.flex.rowReverse]}>
          <Button text="Submit" onClick={submit} />
        </View>
      </View>
    </View>
  );
}
