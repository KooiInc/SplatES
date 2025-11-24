<div align="center">
  <a href="https://bundlephobia.com/package/splat-es@latest" rel="nofollow">
    <img src="https://badgen.net/bundlephobia/min/splat-es"></a>
  <a target="_blank" href="https://www.npmjs.com/package/splat-es">
    <img src="https://img.shields.io/npm/v/splat-es.svg?labelColor=cb3837&logo=npm&color=dcfdd9"></a>
</div>

## SplatES: a string templating utility

A small string templating utility. Use it to replace tags (tokens, e.g. `Hello {myToken}`) within strings
using one or more Objects for replacements (e.g. `{myToken: "world!"}`).

The utiltity by default exports a function to replace one or more tokens (`"Some string {token1}, {token2}"`)
within a string.

The tokens are replaced using one or more objects containing the tokens to replace as keys and the
values to replace it/them with (
`[imported interpolator]("Some string {token1}, {token2}", {token1: "one"}, token2: "two"})`)).

The module exports
- the factory itself <code>interpolateFactory</code>),
- the <code>interpolate</code> function (default),
- the <code>interpolateClear</code> function (which clears empty placeholders) and
- a function to extend <code>String.prototype</code> with symbolic methods.


### Repository location
The repository is available at two locations: **Github** (US) and **Codeberg** (Europe).

US politics may result in precarious future US/Github policies,
which may result in the Github repository ceasing to exist in the future.

The Codeberg repository is therefore *authorative*.  

Check the **[DEMO @Codeberg](https://kooiinc.codeberg.page/splatES/Demo/)**, 
or the **[DEMO @Github](https://kooiinc.github.io/SplatES/Demo)**.

## Loading/importing

### Browser
```html
<!-- the browser script is located at /Bundle/index.script.min.js -->
<script src="[browser script location]"></script>
<script>
  const {default: splat /* [, interpolateClear, interpolateFactory, addSymbolicStringExtensions] */} = SplatES;
  splat(hi, {wrld: "world"}); // "hi world"
</script>
```

### ESM (module) 
```javascript
// the module is located at /index.js, 
// or bundled at /Bundle/index.min.js
import {default as splat /* [, interpolateClear, interpolateFactory, addSymbolicStringExtensions] */}
  from "[module location]";
splat(hi, {wrld: "world"}); // "hi world"
```
