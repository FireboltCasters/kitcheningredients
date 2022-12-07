import React, {FunctionComponent, useState} from "react";
import {Input, TextArea, View} from "native-base";
import {ParentDimension, ThemedMarkdown} from "../../api/src";
import {TextInput} from "react-native";

export const ExampleMarkdownScreen: FunctionComponent = (props) => {

  const [dimension, setDimension] = useState({x: 0, y: 0, width: 0, height: 0});

  const markdownTextExample = `
Welcome to the markdown test.

This is a test of the markdown component. Lorizzle dolizzle sheezy tellivizzle, **Bold** and *italic* its fo rizzle adipiscing shut the shizzle up. Nullizzle sapizzle velizzle, dope volutpizzle, suscipizzle yo, dope vel, fo shizzle. Pellentesque fo shizzle tortor. Sed erizzle. Ghetto fo shizzle dolizzle dapibizzle turpis tempizzle gangsta. Maurizzle pellentesque nibh izzle turpizzle. Fizzle shizzlin dizzle tortizzle. Rizzle eleifend rhoncizzle check out this. In hac fo shizzle shut the shizzle up dictumst. Donec dapibus. Nizzle tellizzle mah nizzle, pretizzle hizzle, mattis izzle, eleifend fizzle, . Daahng dawg suscipizzle. Integizzle semper fizzle sizzle fo shizzle.

Headings:

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

-------------------------

Bold Text: **Bold Text**

Italic Text: *Italic Text*

Strike Through Text: ~~Strikethoughtext~~

------------------

Bullet List:

- First Bullet
- Second Bullet
  - First Sub Bullet
  - Second Sub Bullet
     - First Sub Sub Bullet
     - Second Sub Sub Bullet
  - Sub Bullet
- Bullet with Bold Text: **Bold**

-------------

Numbered List

1. First
2. Second
3. Third
4. Fourth with Bold Text: **Bold**

-----------


Block Quote:

> This is a block quote

------

Link Example:

[https://www.google.com](https://www.google.com)

[Link to Google](https://www.google.com)

------------

Table:

| Header | Header | Header | Header |
| ------ | ------ | ------ | ------ |
| Cell   | Cell   | Cell   | Cell   |
| Cell   | Cell   | Cell   | Cell   |
| Cell   | Cell   | Cell   | Cell   |
| Cell   | Cell   | Cell   | Cell   |

---------

  `;

  const [markdownText, setMarkdownText] = React.useState(markdownTextExample);

  return (
    <View style={{width: "100%", flex: 1, flexDirection: "row"}}>
      <View  style={{width: "100%", flex: 1}}>
        <ThemedMarkdown>
          {markdownText}
        </ThemedMarkdown>
      </View>
      <View  style={{width: "100%", flex: 1, backgroundColor: "red"}}>
        <ParentDimension style={{width: "100%", flex: 1, backgroundColor: "red", height: "100%"}} setDimension={(x, y, width, height) => {
          setDimension({x, y, width, height});
        } }>
          <Input
            placeholder="Your Placeholder"
            size={"lg"}
            style={{height: dimension?.height-10, width: 300, backgroundColor: "blue", flexGrow: 1, flex: 1}}
            editable
            multiline
            value={markdownText}
            onChangeText={(value) => setMarkdownText(value)} />
        </ParentDimension>
      </View>
    </View>
  );
}
