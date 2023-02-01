# Admin Page

1. I can add, edit, and delete mongo documents in which each one is a PAGE, known as a Snapshot
2. Pages can have an infinite amount of keys/values and depths
3. Page data can be accessed from a json api endpoint, I can use my dashboard to store config data as well
4. Authentication

## Todo
1. List all page data (query)
2. Create page (mutation)
3. Write to document (freeform mutation)
4. Get a single page

## Schema Structure

types of keys:
 - key-value
 - deep object
 - array

### `key-value`
simple key-value editable pair
```js
{
  "Homepage": {
    "type": "kv",
    "value": "whatever"
  }
}
```

### `array`
array of objects
```js
{
  "TestArr": {
    "type": "array",
    "keySchema": {
      "id": "string",
      "title": "string",
      "value": "string"
    },
    "value": [
      {
        "id": "1",
        "title": "testing",
        "value": "testvalue"
      }
    ]
  }
}
```

### `object`
Collection of key/value pairs.  No arrays.
```js
{
  "Object": {
    "type": "object",
    "value": {
      "key1": "value1",
      "key2": 2,
      "key3": "asdfasudifhdsuah"
    }
  }
}
```

```json
"content": {
    "Homepage": {
      "type": "kv",
      "keySchema": "string",
      "value": "whatever"
    },    
    "TestArr": {
      "type": "array",
      "keySchema": {
        "id": "string",
        "title": "text"
      },
      "value": [
        {
          "id": "1",
          "test": "testing",
        },
      ]
    },
    "Object": {
      "type": "object",
      "value": {
        "keyname2": {
          "type": "kv",
          "keySchema": "string",
          "value": "whatever"
        },
        "keyname": {
          "type": "kv",
          "keySchema": "string",
          "value": "whatever"
        }
      }
    } 
  }
```