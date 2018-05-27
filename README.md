# svg-motion

## Motivation
Easy to use tool (without external software) that combine performance of `SVG Spritesheet Animation` with compatibility of `SVG Visibility Animation`. Both techniques have advantages and disadvantages, but only their combination gives the best effect. `svg-motion` converts SVG file with layers (like Photoshop Timeline) to stop motion animation, where top-level layers create animation frames.

## SVG attributes
Keep in mind that all `style` elements inside svg file will be removed. This tool leaves inline style converted to attributes. Therefore the best place to set additional style is attribute, e.g. `fill`, `stroke`, etc. Below some SVG Options from Adobe Illustrator presenting best configuration.

<p align="center">
  <b>SVG Save As</b>
</p>
<p align="center">
  <img width="515" height="716" src="https://user-images.githubusercontent.com/13873576/40585171-3ad552bc-61ae-11e8-9a60-b175ed0af115.png">
</p>
<p align="center">
  <b>SVG Export</b>
</p>
<p align="center">
  <img width="413" height="339" src="https://user-images.githubusercontent.com/13873576/40585175-443065f4-61ae-11e8-9ee5-a1af34697121.png">
</p>

## CLI
```
Options:

  -s, --source <pattern>    pattern for source file(s)
  -o, --output [pattern]    pattern for output file(s)
  -d, --duration <pattern>  duration of one cycle - default: 1000
  -i, --iteration [count]   number of animation cycles - default: 0 (infinite)
  -h, --help                output usage information

Patterns (glob):

  *           0 or more characters
  ?           1 character
  [...]       a range of characters
  [!..]       any character not in the range

  !(a|b)      anything that does not match the given patterns
  ?(a|b)      0 or 1 occurrence of the given patterns
  *(a|b)      0 or more occurrences of the given patterns
  +(a|b)      1 or more occurrences of the given patterns
  @(a|b*|c?)  exactly 1 of the given patterns

  **/*.svg    globstar matches 0 or more subdirectories
```
