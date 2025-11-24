// $ etc. @https://github.com/KooiInc/SBHelpers
// 20240612
// -----------------------------------------------------------------------
const { $, logFactory,  } =
  await import("https://unpkg.com/dynamic-html-helpers@latest/Bundle/htmlhelpers.min.js");
import {default as splatES, addSymbolicStringExtensions} from "../Bundle/index.min.js";

// assign symbolic String.prototype extension
const [splat, splat$] = addSymbolicStringExtensions();

// try out in developer screen
window.splatES = splatES;

const { log } = logFactory();
const demoText = retrieveCodeFragments();

demo();

function demo() {
  const code4Array = demoText.code4Array;
  const tableTemplatesCode = demoText.tableTemplatesCode;

  // let's create a table
  const tableTemplate = `
    <table>
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th>#</th>
          <th>prename</th>
          <th>surname</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>`;
  const tableRowTemplate =  `
    <tr>
      <td>{index}</td>
      <td>{pre}</td>
      <td>{last}</td>
    </tr>`;
  // the replacements (for tableRowTemplate);
  const theNames = getNamesObj();

  setStyling();
  const theNamesClear = theNames.map(row =>
    !/ignored/i.test(row.pre) && /Invalid\/missing/.test(row.pre)
       ? {...row, pre: `<b class="notifyHeader">Invalid/missing token keys/values are cleared</b>`} : row);
  const theNamesTokensAsArrays = {
    pre: `Mary,Muhammed,Missy,Hillary,Foo,Bar,小平,Володимир,zero (0),Row,,missing value <span class="point right"></span>`
      .split(`,`).map(v => !v.length ? undefined : v),
    last: `Peterson,Ali,Johnson,Clinton,Bar,Foo,邓,Зеленський,0,10,<span class="point left"></span> missing value,`
      .split(`,`).map(v => !v.length ? null : v)
  }

  // show me the money!
  const table1 = tableTemplate[splat]({
    caption: `<code>tableRowTemplate[splat]</code> using <code>theNames</code>`,
    rows: tableRowTemplate[splat](...theNames)
  });
  const table2 = tableTemplate[splat]({
    caption: `<code>tableRowTemplate[splat$]</code> (empty/invalid values => empty string)`,
    rows: tableRowTemplate[splat$](...theNamesClear)
  });
  const table3 = tableTemplate[splat]({
    caption: `<code>tableRowTemplate[splat]</code> token values are arrays`,
    rows: tableRowTemplate[splat](theNamesTokensAsArrays)
  });
  log(
    $.div({data: {header: "true"}},
      demoText.preSyntax[splat]({backLink: demoText.backLink}),
      demoText.codeFragment[splat]({code: demoText.syntax}),
      $.h3({class: "readme"}, $.b(`Templates and tokens used in the examples`)),
      demoText.codeFragment[splat]({code: tableTemplatesCode}),
      $.h3({class: "readme"}, $.b(`table1 =>`)),
      table1,
      $.h3({class: "readme"}, $.b(`table2 =>`)),
      table2,
      $.h3({class: "readme"}, $.b(`Use corresponding arrays`)),
      demoText.codeFragment[splat]({code: code4Array}),
      table3
    )
  );
  createContent();
  hljs.highlightAll(`javascript`);
}

function escHTML(htmlStr) {
  return htmlStr.replace(/</g, `&lt;`).replace(/>/g, '&gt;');
}

function getNamesObj() {
  return [
    {pre: `Mary`, last: `Peterson`},
    {pre: `Muhammed`, last: `Ali`},
    {pre: `Missy`, last: `Johnson`},
    {pre: `Hillary`, last: `Clinton`},
    {pre: `Foo`, last: `Bar`},
    {pre: `Bar`, last: `Foo`},
    {pre: `小平`, last: `邓`},
    {pre: `Володимир`, last: `Зеленський`},
    {pre: `zero (0)`, last: 0},
    {pre: `Row`, last: 10},
    {pre: `replacement-is-empty-string`, last: ''},     // ᐊ Empty string value IS replaced
    {
      pre: `<b class="notifyHeader">Invalid/missing token keys/values are kept</b>`,
      last: `<span class="largeArrowDown"></span>`
    },
    // if !defaultReplacer ...
    {pre: `replacement-Is-array`, last: [1, 2, 3]},     // ᐊ Array value IS NOT replaced/
    {pre: `replacement-Is-null`, last: null},           // ᐊ null value IS NOT replaced
    {pre: `replacement-Is-object`, last: {}},           // ᐊ Object value IS NOT replaced
    {pre: `replacement-Is-undefined`, last: undefined}, // ᐊ undefined value IS NOT replaced
    {last: `key-pre-does-not-exist`},                   // ᐊ undefined value IS NOT replaced
    {pre: `key-last-does-not-exist`},                   // ᐊ incomplete object, what exists is replaced
    {some: `nothing-to-replace`, name: `nothing`},      // ᐊ non existing keys, tokens ignored
    {},                                                 // ᐊ empty object, tokens ignored
    [`nothing`, `nada`, `zip`, `没有什么`,               // ᐊ replacement not an Object, tokens ignored
      `niente`, `rien`, `ничего`]
  ];
}

function getInsertableblocks(templatesDivs) {
  const demoText = [];
  templatesDivs.forEach(block => {
    switch (true) {
      case /syntax|tableTemplatesCode|code4Array/.test(block.id): {
        demoText[block.id] = $.escHtml(block.textContent).replace(/^ {8}/gm, ``).trim();
        break;
      }
      default:
        demoText[block.id] = block.innerHTML;
    }
  });
  
  demoText.backLink = getBackLink();
  return demoText;
}

function retrieveCodeFragments() {
  const codeBlocks = $.node(`#exampleTexts`).content.querySelectorAll('div');
  return getInsertableblocks(codeBlocks);
}

function getBackLink() {
  const isGithub = /github/i.test(location.href);
  const back2repo = `(back to) repository`;
  const isLocal = /localhost/.test(location.href);
  return [
    isLocal
      ? `LOCAL TEST`
      :  isGithub
        ? `<a class="ghBacklink" target="_top" href="https://github.com/KooiInc/SplatES">${back2repo}</a>`
        : `<a class="cbBacklink" target="_top" href="https://codeberg.org/KooiInc/splatES">${back2repo}</a>`
  ];
}

/* region indexCreatr */
function createContent() {
  const logUl = $(`#log2screen`);
  $(`<div class="container">`).append(logUl);
  $.editCssRule(`.bottomSpace { height: ${$.node(`.container`).clientHeight}px; }`);
  logUl.afterMe(`<div class="bottomSpace">`);
}
/* endregion indexCreatr */

function setStyling() {
  const repeat = (str, n = 2) => `${str}${Array(n).join(str)}`;
  $.editCssRules(
    `body { font: 14px/18px normal verdana, arial; margin: 2rem; }`,

    `.container { position: absolute; inset: 0; overflow-y: auto; }`,

    `code.hljs {
      background-color: #343636;
    }`,

    `code:not(.codeblock, .hljs) {
        background-color: rgb(227, 230, 232);
        color: var(--code-color);
        padding: 1px 2px;
        display: inline-block;
        margin: 1px 0;
        border-radius: 4px;
        font-style: normal;
        font-weight: normal;
    }`,

    `div.b5 { margin-top: 5px; }`,

    `.pre-syntax {
      max-width: 90%;
      padding-left: 1em;
    }`,

    `table {
      margin: 1rem 0;
      font-family: verdana;
      font-size: 0.9rem;
      border-collapse: collapse;
      vertical-align: top;
      min-width: 500px;
      max-width: 700px;

      td, th {
        padding: 2px 4px;
        font-size: 14px;
        height: 18px;
      }

      th {
        font-weight: bold;
        text-align: left;
        border-bottom: 1px solid #999;
        background-color: #999;
        color: #FFF;
      }

      td:first-child, th:first-child {
        text-align: right; padding-right: 5px;
        width: 24px;
      }

      caption {
        border: 1px solid #ccc;
        padding: 0.5rem;
        font-size: 14px;
        white-space: nowrap;
       }

       tbody tr:nth-child(even) { background-color: #ddd; }
     }`,

    `.largeArrowDown:before{
      content: '${repeat(`⬇`, 3)}';
      color: red; }`,

    `span.point:before {
      font-weight: bold;
      color: red;
      content: '➜';
      vertical-align: middle;
    }`,

    `span.point.left:before {
      display: inline-block;
      transform: rotate(-180deg);
     }`,

    `b.notifyHeader { color: green; }`,

    `li.head {
      margin-left: -2rem !important;

      table { margin-top: 1.2rem; }

      hr { margin-bottom: 1.2rem; }
      h3.readme { margin-bottom: 0; margin-top: 0.5em;}
      h3.readme~pre, h3.readme~table { margin-top: 0.2em; }
            div.readme li {
        margin: 0.1em 0 0.2em -1.5rem !important;
      }
    }`,

    `a { text-decoration:none; font-weight:bold; }`,
    `a:hover { text-decoration:underline; }`,
    `a[target]:before { color:rgba(0,0,238,0.7);font-size: 1.1rem;vertical-align:bottom }`,
    `a[target="_blank"]:before {content: '\\2197'' '; }`,

    `a[target].cbBacklink {
      &:before {
        content: url(./codebergicon.ico)' ';
        vertical-align: middle;
      }
     }`,

    `a[target].ghBacklink {
      &:before {
        content: url(./githubicon.png)' ';
        vertical-align: middle;
      }
     }`,
    `a[target="_top"]:before {content: '\\21BA'' '; }`,

    `ul#log2screen { margin: 0 auto; max-width: 40vw; }`,

    `pre.hljs {
      border-radius: 8px;
      box-shadow: 1px 2px 8px #555;
    }`,

    `#log2screen pre.syntax {
      margin-top: -0.7rem;
      margin-bottom: 1.5rem;
    }`,

    `#log2screen code.language-javascript {
      background-color: revert;
      color: revert;
    }`,

    `pre.syntax { width: 100%; }`,
    `.readme {
      margin-top: -0.4rem;
      margin-bottom: 1rem;
      color: #777;
      font-weight: normal;
    }`,

    `@media (min-width: 1600px) {
      ul#log2screen  { max-width: 50vw; }
    }`,
    `@media (max-width: 1600px) and (min-width: 1024px) {
      ul#log2screen { max-width: 70vw; }
    }`,
    `@media (max-width: 1024px) and (min-width: 300px) {
      ul#log2screen { max-width: 90vw; }
    }`,
  );
}
