# tsdoc2md

### convert typescript comments to markdown file.
Comments converting of Class, Property, Constructor and Method is implemented.
More will come up soon.

Only support annotations @param, @returns, @example.

Please follow typescript doc comment syntax: [Doc comment syntax](https://api-extractor.com/pages/tsdoc/doc_comment_syntax/)

## Install
```
npm install -g tsdoc2md
```

## Usage
### step1
generate config file named 'tsdoc2md.json'
```js
// tsdoc2md.json
{
  "entry": {
    "README": "/lib/index.d.ts"
  },
  "outDir": "/docs/"
}
/**
* 1. key of entry will be name of markdown file.
* 2. entry file should be a declaration file. 
*/
```
your tsconfig shoud be:
```js
// tsconfig.json
{
  ...
  "declaration": true,
  "declarationMap": true,
  "outDir": "lib"
  ...
}
```
### step2
execute command
```shell
# use in terminal
tsdoc2md
```

### keywords
typescript, markdown