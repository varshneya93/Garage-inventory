html {
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  font-family: sans-serif;
}

body {
  margin: 0;
}

article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {
  display: block;
}

audio, canvas, progress, video {
  vertical-align: baseline;
  display: inline-block;
}

audio:not([controls]) {
  height: 0;
  display: none;
}

[hidden], template {
  display: none;
}

a {
  background-color: #0000;
}

a:active, a:hover {
  outline: 0;
}

abbr[title] {
  border-bottom: 1px dotted;
}

b, strong {
  font-weight: bold;
}

dfn {
  font-style: italic;
}

h1 {
  margin: .67em 0;
  font-size: 2em;
}

mark {
  color: #000;
  background: #ff0;
}

small {
  font-size: 80%;
}

sub, sup {
  vertical-align: baseline;
  font-size: 75%;
  line-height: 0;
  position: relative;
}

sup {
  top: -.5em;
}

sub {
  bottom: -.25em;
}

img {
  border: 0;
}

svg:not(:root) {
  overflow: hidden;
}

hr {
  box-sizing: content-box;
  height: 0;
}

pre {
  overflow: auto;
}

code, kbd, pre, samp {
  font-family: monospace;
  font-size: 1em;
}

button, input, optgroup, select, textarea {
  color: inherit;
  font: inherit;
  margin: 0;
}

button {
  overflow: visible;
}

button, select {
  text-transform: none;
}

button, html input[type="button"], input[type="reset"] {
  -webkit-appearance: button;
  cursor: pointer;
}

button[disabled], html input[disabled] {
  cursor: default;
}

button::-moz-focus-inner, input::-moz-focus-inner {
  border: 0;
  padding: 0;
}

input {
  line-height: normal;
}

input[type="checkbox"], input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}

input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

input[type="search"] {
  -webkit-appearance: none;
}

input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

legend {
  border: 0;
  padding: 0;
}

textarea {
  overflow: auto;
}

optgroup {
  font-weight: bold;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

td, th {
  padding: 0;
}

@font-face {
  font-family: webflow-icons;
  src: url("data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBiUAAAC8AAAAYGNtYXDpP+a4AAABHAAAAFxnYXNwAAAAEAAAAXgAAAAIZ2x5ZmhS2XEAAAGAAAADHGhlYWQTFw3HAAAEnAAAADZoaGVhCXYFgQAABNQAAAAkaG10eCe4A1oAAAT4AAAAMGxvY2EDtALGAAAFKAAAABptYXhwABAAPgAABUQAAAAgbmFtZSoCsMsAAAVkAAABznBvc3QAAwAAAAAHNAAAACAAAwP4AZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpAwPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAQAAAAAwACAACAAQAAQAg5gPpA//9//8AAAAAACDmAOkA//3//wAB/+MaBBcIAAMAAQAAAAAAAAAAAAAAAAABAAH//wAPAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEBIAAAAyADgAAFAAAJAQcJARcDIP5AQAGA/oBAAcABwED+gP6AQAABAOAAAALgA4AABQAAEwEXCQEH4AHAQP6AAYBAAcABwED+gP6AQAAAAwDAAOADQALAAA8AHwAvAAABISIGHQEUFjMhMjY9ATQmByEiBh0BFBYzITI2PQE0JgchIgYdARQWMyEyNj0BNCYDIP3ADRMTDQJADRMTDf3ADRMTDQJADRMTDf3ADRMTDQJADRMTAsATDSANExMNIA0TwBMNIA0TEw0gDRPAEw0gDRMTDSANEwAAAAABAJ0AtAOBApUABQAACQIHCQEDJP7r/upcAXEBcgKU/usBFVz+fAGEAAAAAAL//f+9BAMDwwAEAAkAABcBJwEXAwE3AQdpA5ps/GZsbAOabPxmbEMDmmz8ZmwDmvxmbAOabAAAAgAA/8AEAAPAAB0AOwAABSInLgEnJjU0Nz4BNzYzMTIXHgEXFhUUBw4BBwYjNTI3PgE3NjU0Jy4BJyYjMSIHDgEHBhUUFx4BFxYzAgBqXV6LKCgoKIteXWpqXV6LKCgoKIteXWpVSktvICEhIG9LSlVVSktvICEhIG9LSlVAKCiLXl1qal1eiygoKCiLXl1qal1eiygoZiEgb0tKVVVKS28gISEgb0tKVVVKS28gIQABAAABwAIAA8AAEgAAEzQ3PgE3NjMxFSIHDgEHBhUxIwAoKIteXWpVSktvICFmAcBqXV6LKChmISBvS0pVAAAAAgAA/8AFtgPAADIAOgAAARYXHgEXFhUUBw4BBwYHIxUhIicuAScmNTQ3PgE3NjMxOAExNDc+ATc2MzIXHgEXFhcVATMJATMVMzUEjD83NlAXFxYXTjU1PQL8kz01Nk8XFxcXTzY1PSIjd1BQWlJJSXInJw3+mdv+2/7c25MCUQYcHFg5OUA/ODlXHBwIAhcXTzY1PTw1Nk8XF1tQUHcjIhwcYUNDTgL+3QFt/pOTkwABAAAAAQAAmM7nP18PPPUACwQAAAAAANciZKUAAAAA1yJkpf/9/70FtgPDAAAACAACAAAAAAAAAAEAAAPA/8AAAAW3//3//QW2AAEAAAAAAAAAAAAAAAAAAAAMBAAAAAAAAAAAAAAAAgAAAAQAASAEAADgBAAAwAQAAJ0EAP/9BAAAAAQAAAAFtwAAAAAAAAAKABQAHgAyAEYAjACiAL4BFgE2AY4AAAABAAAADAA8AAMAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEADQAAAAEAAAAAAAIABwCWAAEAAAAAAAMADQBIAAEAAAAAAAQADQCrAAEAAAAAAAUACwAnAAEAAAAAAAYADQBvAAEAAAAAAAoAGgDSAAMAAQQJAAEAGgANAAMAAQQJAAIADgCdAAMAAQQJAAMAGgBVAAMAAQQJAAQAGgC4AAMAAQQJAAUAFgAyAAMAAQQJAAYAGgB8AAMAAQQJAAoANADsd2ViZmxvdy1pY29ucwB3AGUAYgBmAGwAbwB3AC0AaQBjAG8AbgBzVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwd2ViZmxvdy1pY29ucwB3AGUAYgBmAGwAbwB3AC0AaQBjAG8AbgBzd2ViZmxvdy1pY29ucwB3AGUAYgBmAGwAbwB3AC0AaQBjAG8AbgBzUmVndWxhcgBSAGUAZwB1AGwAYQByd2ViZmxvdy1pY29ucwB3AGUAYgBmAGwAbwB3AC0AaQBjAG8AbgBzRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==") format("truetype");
  font-weight: normal;
  font-style: normal;
}

[class^="w-icon-"], [class*=" w-icon-"] {
  speak: none;
  font-variant: normal;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-style: normal;
  font-weight: normal;
  line-height: 1;
  font-family: webflow-icons !important;
}

.w-icon-slider-right:before {
  content: "î˜€";
}

.w-icon-slider-left:before {
  content: "î˜";
}

.w-icon-nav-menu:before {
  content: "î˜‚";
}

.w-icon-arrow-down:before, .w-icon-dropdown-toggle:before {
  content: "î˜ƒ";
}

.w-icon-file-upload-remove:before {
  content: "î¤€";
}

.w-icon-file-upload-icon:before {
  content: "î¤ƒ";
}

* {
  box-sizing: border-box;
}

html {
  height: 100%;
}

body {
  color: #333;
  background-color: #fff;
  min-height: 100%;
  margin: 0;
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 20px;
}

img {
  vertical-align: middle;
  max-width: 100%;
  display: inline-block;
}

html.w-mod-touch * {
  background-attachment: scroll !important;
}

.w-block {
  display: block;
}

.w-inline-block {
  max-width: 100%;
  display: inline-block;
}

.w-clearfix:before, .w-clearfix:after {
  content: " ";
  grid-area: 1 / 1 / 2 / 2;
  display: table;
}

.w-clearfix:after {
  clear: both;
}

.w-hidden {
  display: none;
}

.w-button {
  color: #fff;
  line-height: inherit;
  cursor: pointer;
  background-color: #3898ec;
  border: 0;
  border-radius: 0;
  padding: 9px 15px;
  text-decoration: none;
  display: inline-block;
}

input.w-button {
  -webkit-appearance: button;
}

html[data-w-dynpage] [data-w-cloak] {
  color: #0000 !important;
}

.w-code-block {
  margin: unset;
}

pre.w-code-block code {
  all: inherit;
}

.w-optimization {
  display: contents;
}

.w-webflow-badge, .w-webflow-badge > img {
  box-sizing: unset;
  width: unset;
  height: unset;
  max-height: unset;
  max-width: unset;
  min-height: unset;
  min-width: unset;
  margin: unset;
  padding: unset;
  float: unset;
  clear: unset;
  border: unset;
  border-radius: unset;
  background: unset;
  background-image: unset;
  background-position: unset;
  background-size: unset;
  background-repeat: unset;
  background-origin: unset;
  background-clip: unset;
  background-attachment: unset;
  background-color: unset;
  box-shadow: unset;
  transform: unset;
  direction: unset;
  font-family: unset;
  font-weight: unset;
  color: unset;
  font-size: unset;
  line-height: unset;
  font-style: unset;
  font-variant: unset;
  text-align: unset;
  letter-spacing: unset;
  -webkit-text-decoration: unset;
  text-decoration: unset;
  text-indent: unset;
  text-transform: unset;
  list-style-type: unset;
  text-shadow: unset;
  vertical-align: unset;
  cursor: unset;
  white-space: unset;
  word-break: unset;
  word-spacing: unset;
  word-wrap: unset;
  transition: unset;
}

.w-webflow-badge {
  white-space: nowrap;
  cursor: pointer;
  box-shadow: 0 0 0 1px #0000001a, 0 1px 3px #0000001a;
  visibility: visible !important;
  opacity: 1 !important;
  z-index: 2147483647 !important;
  color: #aaadb0 !important;
  overflow: unset !important;
  background-color: #fff !important;
  border-radius: 3px !important;
  width: auto !important;
  height: auto !important;
  margin: 0 !important;
  padding: 6px !important;
  font-size: 12px !important;
  line-height: 14px !important;
  text-decoration: none !important;
  display: inline-block !important;
  position: fixed !important;
  inset: auto 12px 12px auto !important;
  transform: none !important;
}

.w-webflow-badge > img {
  position: unset;
  visibility: unset !important;
  opacity: 1 !important;
  vertical-align: middle !important;
  display: inline-block !important;
}

h1, h2, h3, h4, h5, h6 {
  margin-bottom: 10px;
  font-weight: bold;
}

h1 {
  margin-top: 20px;
  font-size: 38px;
  line-height: 44px;
}

h2 {
  margin-top: 20px;
  font-size: 32px;
  line-height: 36px;
}

h3 {
  margin-top: 20px;
  font-size: 24px;
  line-height: 30px;
}

h4 {
  margin-top: 10px;
  font-size: 18px;
  line-height: 24px;
}

h5 {
  margin-top: 10px;
  font-size: 14px;
  line-height: 20px;
}

h6 {
  margin-top: 10px;
  font-size: 12px;
  line-height: 18px;
}

p {
  margin-top: 0;
  margin-bottom: 10px;
}

blockquote {
  border-left: 5px solid #e2e2e2;
  margin: 0 0 10px;
  padding: 10px 20px;
  font-size: 18px;
  line-height: 22px;
}

figure {
  margin: 0 0 10px;
}

figcaption {
  text-align: center;
  margin-top: 5px;
}

ul, ol {
  margin-top: 0;
  margin-bottom: 10px;
  padding-left: 40px;
}

.w-list-unstyled {
  padding-left: 0;
  list-style: none;
}

.w-embed:before, .w-embed:after {
  content: " ";
  grid-area: 1 / 1 / 2 / 2;
  display: table;
}

.w-embed:after {
  clear: both;
}

.w-video {
  width: 100%;
  padding: 0;
  position: relative;
}

.w-video iframe, .w-video object, .w-video embed {
  border: none;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}

button, [type="button"], [type="reset"] {
  cursor: pointer;
  -webkit-appearance: button;
  border: 0;
}

.w-form {
  margin: 0 0 15px;
}

.w-form-done {
  text-align: center;
  background-color: #ddd;
  padding: 20px;
  display: none;
}

.w-form-fail {
  background-color: #ffdede;
  margin-top: 10px;
  padding: 10px;
  display: none;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
  display: block;
}

.w-input, .w-select {
  color: #333;
  vertical-align: middle;
  background-color: #fff;
  border: 1px solid #ccc;
  width: 100%;
  height: 38px;
  margin-bottom: 10px;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.42857;
  display: block;
}

.w-input::placeholder, .w-select::placeholder {
  color: #999;
}

.w-input:focus, .w-select:focus {
  border-color: #3898ec;
  outline: 0;
}

.w-input[disabled], .w-select[disabled], .w-input[readonly], .w-select[readonly], fieldset[disabled] .w-input, fieldset[disabled] .w-select {
  cursor: not-allowed;
}

.w-input[disabled]:not(.w-input-disabled), .w-select[disabled]:not(.w-input-disabled), .w-input[readonly], .w-select[readonly], fieldset[disabled]:not(.w-input-disabled) .w-input, fieldset[disabled]:not(.w-input-disabled) .w-select {
  background-color: #eee;
}

textarea.w-input, textarea.w-select {
  height: auto;
}

.w-select {
  background-color: #f3f3f3;
}

.w-select[multiple] {
  height: auto;
}

.w-form-label {
  cursor: pointer;
  margin-bottom: 0;
  font-weight: normal;
  display: inline-block;
}

.w-radio {
  margin-bottom: 5px;
  padding-left: 20px;
  display: block;
}

.w-radio:before, .w-radio:after {
  content: " ";
  grid-area: 1 / 1 / 2 / 2;
  display: table;
}

.w-radio:after {
  clear: both;
}

.w-radio-input {
  float: left;
  margin: 3px 0 0 -20px;
  line-height: normal;
}

.w-file-upload {
  margin-bottom: 10px;
  display: block;
}

.w-file-upload-input {
  opacity: 0;
  z-index: -100;
  width: .1px;
  height: .1px;
  position: absolute;
  overflow: hidden;
}

.w-file-upload-default, .w-file-upload-uploading, .w-file-upload-success {
  color: #333;
  display: inline-block;
}

.w-file-upload-error {
  margin-top: 10px;
  display: block;
}

.w-file-upload-default.w-hidden, .w-file-upload-uploading.w-hidden, .w-file-upload-error.w-hidden, .w-file-upload-success.w-hidden {
  display: none;
}

.w-file-upload-uploading-btn {
  cursor: pointer;
  background-color: #fafafa;
  border: 1px solid #ccc;
  margin: 0;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: normal;
  display: flex;
}

.w-file-upload-file {
  background-color: #fafafa;
  border: 1px solid #ccc;
  flex-grow: 1;
  justify-content: space-between;
  margin: 0;
  padding: 8px 9px 8px 11px;
  display: flex;
}

.w-file-upload-file-name {
  font-size: 14px;
  font-weight: normal;
  display: block;
}

.w-file-remove-link {
  cursor: pointer;
  width: auto;
  height: auto;
  margin-top: 3px;
  margin-left: 10px;
  padding: 3px;
  display: block;
}

.w-icon-file-upload-remove {
  margin: auto;
  font-size: 10px;
}

.w-file-upload-error-msg {
  color: #ea384c;
  padding: 2px 0;
  display: inline-block;
}

.w-file-upload-info {
  padding: 0 12px;
  line-height: 38px;
  display: inline-block;
}

.w-file-upload-label {
  cursor: pointer;
  background-color: #fafafa;
  border: 1px solid #ccc;
  margin: 0;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: normal;
  display: inline-block;
}

.w-icon-file-upload-icon, .w-icon-file-upload-uploading {
  width: 20px;
  margin-right: 8px;
  display: inline-block;
}

.w-icon-file-upload-uploading {
  height: 20px;
}

.w-container {
  max-width: 940px;
  margin-left: auto;
  margin-right: auto;
}

.w-container:before, .w-container:after {
  content: " ";
  grid-area: 1 / 1 / 2 / 2;
  display: table;
}

.w-container:after {
  clear: both;
}

.w-container .w-row {
  margin-left: -10px;
  margin-right: -10px;
}

.w-row:before, .w-row:after {
  content: " ";
  grid-area: 1 / 1 / 2 / 2;
  display: table;
}

.w-row:after {
  clear: both;
}

.w-row .w-row {
  margin-left: 0;
  margin-right: 0;
}

.w-col {
  float: left;
  width: 100%;
  min-height: 1px;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
}

.w-col .w-col {
  padding-left: 0;
  padding-right: 0;
}

.w-col-1 {
  width: 8.33333%;
}

.w-col-2 {
  width: 16.6667%;
}

.w-col-3 {
  width: 25%;
}

.w-col-4 {
  width: 33.3333%;
}

.w-col-5 {
  width: 41.6667%;
}

.w-col-6 {
  width: 50%;
}

.w-col-7 {
  width: 58.3333%;
}

.w-col-8 {
  width: 66.6667%;
}

.w-col-9 {
  width: 75%;
}

.w-col-10 {
  width: 83.3333%;
}

.w-col-11 {
  width: 91.6667%;
}

.w-col-12 {
  width: 100%;
}

.w-hidden-main {
  display: none !important;
}

@media screen and (max-width: 991px) {
  .w-container {
    max-width: 728px;
  }

  .w-hidden-main {
    display: inherit !important;
  }

  .w-hidden-medium {
    display: none !important;
  }

  .w-col-medium-1 {
    width: 8.33333%;
  }

  .w-col-medium-2 {
    width: 16.6667%;
  }

  .w-col-medium-3 {
    width: 25%;
  }

  .w-col-medium-4 {
    width: 33.3333%;
  }

  .w-col-medium-5 {
    width: 41.6667%;
  }

  .w-col-medium-6 {
    width: 50%;
  }

  .w-col-medium-7 {
    width: 58.3333%;
  }

  .w-col-medium-8 {
    width: 66.6667%;
  }

  .w-col-medium-9 {
    width: 75%;
  }

  .w-col-medium-10 {
    width: 83.3333%;
  }

  .w-col-medium-11 {
    width: 91.6667%;
  }

  .w-col-medium-12 {
    width: 100%;
  }

  .w-col-stack {
    width: 100%;
    left: auto;
    right: auto;
  }
}

@media screen and (max-width: 767px) {
  .w-hidden-main, .w-hidden-medium {
    display: inherit !important;
  }

  .w-hidden-small {
    display: none !important;
  }

  .w-row, .w-container .w-row {
    margin-left: 0;
    margin-right: 0;
  }

  .w-col {
    width: 100%;
    left: auto;
    right: auto;
  }

  .w-col-small-1 {
    width: 8.33333%;
  }

  .w-col-small-2 {
    width: 16.6667%;
  }

  .w-col-small-3 {
    width: 25%;
  }

  .w-col-small-4 {
    width: 33.3333%;
  }

  .w-col-small-5 {
    width: 41.6667%;
  }

  .w-col-small-6 {
    width: 50%;
  }

  .w-col-small-7 {
    width: 58.3333%;
  }

  .w-col-small-8 {
    width: 66.6667%;
  }

  .w-col-small-9 {
    width: 75%;
  }

  .w-col-small-10 {
    width: 83.3333%;
  }

  .w-col-small-11 {
    width: 91.6667%;
  }

  .w-col-small-12 {
    width: 100%;
  }
}

@media screen and (max-width: 479px) {
  .w-container {
    max-width: none;
  }

  .w-hidden-main, .w-hidden-medium, .w-hidden-small {
    display: inherit !important;
  }

  .w-hidden-tiny {
    display: none !important;
  }

  .w-col {
    width: 100%;
  }

  .w-col-tiny-1 {
    width: 8.33333%;
  }

  .w-col-tiny-2 {
    width: 16.6667%;
  }

  .w-col-tiny-3 {
    width: 25%;
  }

  .w-col-tiny-4 {
    width: 33.3333%;
  }

  .w-col-tiny-5 {
    width: 41.6667%;
  }

  .w-col-tiny-6 {
    width: 50%;
  }

  .w-col-tiny-7 {
    width: 58.3333%;
  }

  .w-col-tiny-8 {
    width: 66.6667%;
  }

  .w-col-tiny-9 {
    width: 75%;
  }

  .w-col-tiny-10 {
    width: 83.3333%;
  }

  .w-col-tiny-11 {
    width: 91.6667%;
  }

  .w-col-tiny-12 {
    width: 100%;
  }
}

.w-widget {
  position: relative;
}

.w-widget-map {
  width: 100%;
  height: 400px;
}

.w-widget-map label {
  width: auto;
  display: inline;
}

.w-widget-map img {
  max-width: inherit;
}

.w-widget-map .gm-style-iw {
  text-align: center;
}

.w-widget-map .gm-style-iw > button {
  display: none !important;
}

.w-widget-twitter {
  overflow: hidden;
}

.w-widget-twitter-count-shim {
  vertical-align: top;
  text-align: center;
  background: #fff;
  border: 1px solid #758696;
  border-radius: 3px;
  width: 28px;
  height: 20px;
  display: inline-block;
  position: relative;
}

.w-widget-twitter-count-shim * {
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
}

.w-widget-twitter-count-shim .w-widget-twitter-count-inner {
  text-align: center;
  color: #999;
  font-family: serif;
  font-size: 15px;
  line-height: 12px;
  position: relative;
}

.w-widget-twitter-count-shim .w-widget-twitter-count-clear {
  display: block;
  position: relative;
}

.w-widget-twitter-count-shim.w--large {
  width: 36px;
  height: 28px;
}

.w-widget-twitter-count-shim.w--large .w-widget-twitter-count-inner {
  font-size: 18px;
  line-height: 18px;
}

.w-widget-twitter-count-shim:not(.w--vertical) {
  margin-left: 5px;
  margin-right: 8px;
}

.w-widget-twitter-count-shim:not(.w--vertical).w--large {
  margin-left: 6px;
}

.w-widget-twitter-count-shim:not(.w--vertical):before, .w-widget-twitter-count-shim:not(.w--vertical):after {
  content: " ";
  pointer-events: none;
  border: solid #0000;
  width: 0;
  height: 0;
  position: absolute;
  top: 50%;
  left: 0;
}

.w-widget-twitter-count-shim:not(.w--vertical):before {
  border-width: 4px;
  border-color: #75869600 #5d6c7b #75869600 #75869600;
  margin-top: -4px;
  margin-left: -9px;
}

.w-widget-twitter-count-shim:not(.w--vertical).w--large:before {
  border-width: 5px;
  margin-top: -5px;
  margin-left: -10px;
}

.w-widget-twitter-count-shim:not(.w--vertical):after {
  border-width: 4px;
  border-color: #fff0 #fff #fff0 #fff0;
  margin-top: -4px;
  margin-left: -8px;
}

.w-widget-twitter-count-shim:not(.w--vertical).w--large:after {
  border-width: 5px;
  margin-top: -5px;
  margin-left: -9px;
}

.w-widget-twitter-count-shim.w--vertical {
  width: 61px;
  height: 33px;
  margin-bottom: 8px;
}

.w-widget-twitter-count-shim.w--vertical:before, .w-widget-twitter-count-shim.w--vertical:after {
  content: " ";
  pointer-events: none;
  border: solid #0000;
  width: 0;
  height: 0;
  position: absolute;
  top: 100%;
  left: 50%;
}

.w-widget-twitter-count-shim.w--vertical:before {
  border-width: 5px;
  border-color: #5d6c7b #75869600 #75869600;
  margin-left: -5px;
}

.w-widget-twitter-count-shim.w--vertical:after {
  border-width: 4px;
  border-color: #fff #fff0 #fff0;
  margin-left: -4px;
}

.w-widget-twitter-count-shim.w--vertical .w-widget-twitter-count-inner {
  font-size: 18px;
  line-height: 22px;
}

.w-widget-twitter-count-shim.w--vertical.w--large {
  width: 76px;
}

.w-background-video {
  color: #fff;
  height: 500px;
  position: relative;
  overflow: hidden;
}

.w-background-video > video {
  object-fit: cover;
  z-index: -100;
  background-position: 50%;
  background-size: cover;
  width: 100%;
  height: 100%;
  margin: auto;
  position: absolute;
  inset: -100%;
}

.w-background-video > video::-webkit-media-controls-start-playback-button {
  -webkit-appearance: none;
  display: none !important;
}

.w-background-video--control {
  background-color: #0000;
  padding: 0;
  position: absolute;
  bottom: 1em;
  right: 1em;
}

.w-background-video--control > [hidden] {
  display: none !important;
}

.w-slider {
  text-align: center;
  clear: both;
  -webkit-tap-highlight-color: #0000;
  tap-highlight-color: #0000;
  background: #ddd;
  height: 300px;
  position: relative;
}

.w-slider-mask {
  z-index: 1;
  white-space: nowrap;
  height: 100%;
  display: block;
  position: relative;
  left: 0;
  right: 0;
  overflow: hidden;
}

.w-slide {
  vertical-align: top;
  white-space: normal;
  text-align: left;
  width: 100%;
  height: 100%;
  display: inline-block;
  position: relative;
}

.w-slider-nav {
  z-index: 2;
  text-align: center;
  -webkit-tap-highlight-color: #0000;
  tap-highlight-color: #0000;
  height: 40px;
  margin: auto;
  padding-top: 10px;
  position: absolute;
  inset: auto 0 0;
}

.w-slider-nav.w-round > div {
  border-radius: 100%;
}

.w-slider-nav.w-num > div {
  font-size: inherit;
  line-height: inherit;
  width: auto;
  height: auto;
  padding: .2em .5em;
}

.w-slider-nav.w-shadow > div {
  box-shadow: 0 0 3px #3336;
}

.w-slider-nav-invert {
  color: #fff;
}

.w-slider-nav-invert > div {
  background-color: #2226;
}

.w-slider-nav-invert > div.w-active {
  background-color: #222;
}

.w-slider-dot {
  cursor: pointer;
  background-color: #fff6;
  width: 1em;
  height: 1em;
  margin: 0 3px .5em;
  transition: background-color .1s, color .1s;
  display: inline-block;
  position: relative;
}

.w-slider-dot.w-active {
  background-color: #fff;
}

.w-slider-dot:focus {
  outline: none;
  box-shadow: 0 0 0 2px #fff;
}

.w-slider-dot:focus.w-active {
  box-shadow: none;
}

.w-slider-arrow-left, .w-slider-arrow-right {
  cursor: pointer;
  color: #fff;
  -webkit-tap-highlight-color: #0000;
  tap-highlight-color: #0000;
  -webkit-user-select: none;
  user-select: none;
  width: 80px;
  margin: auto;
  font-size: 40px;
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.w-slider-arrow-left [class^="w-icon-"], .w-slider-arrow-right [class^="w-icon-"], .w-slider-arrow-left [class*=" w-icon-"], .w-slider-arrow-right [class*=" w-icon-"] {
  position: absolute;
}

.w-slider-arrow-left:focus, .w-slider-arrow-right:focus {
  outline: 0;
}

.w-slider-arrow-left {
  z-index: 3;
  right: auto;
}

.w-slider-arrow-right {
  z-index: 4;
  left: auto;
}

.w-icon-slider-left, .w-icon-slider-right {
  width: 1em;
  height: 1em;
  margin: auto;
  inset: 0;
}

.w-slider-aria-label {
  clip: rect(0 0 0 0);
  border: 0;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  position: absolute;
  overflow: hidden;
}

.w-slider-force-show {
  display: block !important;
}

.w-dropdown {
  text-align: left;
  z-index: 900;
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
  position: relative;
}

.w-dropdown-btn, .w-dropdown-toggle, .w-dropdown-link {
  vertical-align: top;
  color: #222;
  text-align: left;
  white-space: nowrap;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  text-decoration: none;
  position: relative;
}

.w-dropdown-toggle {
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  padding-right: 40px;
  display: inline-block;
}

.w-dropdown-toggle:focus {
  outline: 0;
}

.w-icon-dropdown-toggle {
  width: 1em;
  height: 1em;
  margin: auto 20px auto auto;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
}

.w-dropdown-list {
  background: #ddd;
  min-width: 100%;
  display: none;
  position: absolute;
}

.w-dropdown-list.w--open {
  display: block;
}

.w-dropdown-link {
  color: #222;
  padding: 10px 20px;
  display: block;
}

.w-dropdown-link.w--current {
  color: #0082f3;
}

.w-dropdown-link:focus {
  outline: 0;
}

@media screen and (max-width: 767px) {
  .w-nav-brand {
    padding-left: 10px;
  }
}

.w-lightbox-backdrop {
  cursor: auto;
  letter-spacing: normal;
  text-indent: 0;
  text-shadow: none;
  text-transform: none;
  visibility: visible;
  white-space: normal;
  word-break: normal;
  word-spacing: normal;
  word-wrap: normal;
  color: #fff;
  text-align: center;
  z-index: 2000;
  opacity: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -webkit-tap-highlight-color: transparent;
  background: #000000e6;
  outline: 0;
  font-family: Helvetica Neue, Helvetica, Ubuntu, Segoe UI, Verdana, sans-serif;
  font-size: 17px;
  font-style: normal;
  font-weight: 300;
  line-height: 1.2;
  list-style: disc;
  position: fixed;
  inset: 0;
  -webkit-transform: translate(0);
}

.w-lightbox-backdrop, .w-lightbox-container {
  -webkit-overflow-scrolling: touch;
  height: 100%;
  overflow: auto;
}

.w-lightbox-content {
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.w-lightbox-view {
  opacity: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
}

.w-lightbox-view:before {
  content: "";
  height: 100vh;
}

.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {
  height: 86vh;
}

.w-lightbox-frame, .w-lightbox-view:before {
  vertical-align: middle;
  display: inline-block;
}

.w-lightbox-figure {
  margin: 0;
  position: relative;
}

.w-lightbox-group .w-lightbox-figure {
  cursor: pointer;
}

.w-lightbox-img {
  width: auto;
  max-width: none;
  height: auto;
}

.w-lightbox-image {
  float: none;
  max-width: 100vw;
  max-height: 100vh;
  display: block;
}

.w-lightbox-group .w-lightbox-image {
  max-height: 86vh;
}

.w-lightbox-caption {
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: #0006;
  padding: .5em 1em;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}

.w-lightbox-embed {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
}

.w-lightbox-control {
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 24px;
  width: 4em;
  transition: all .3s;
  position: absolute;
  top: 0;
}

.w-lightbox-left {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0yMCAwIDI0IDQwIiB3aWR0aD0iMjQiIGhlaWdodD0iNDAiPjxnIHRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHBhdGggZD0ibTAgMGg1djIzaDIzdjVoLTI4eiIgb3BhY2l0eT0iLjQiLz48cGF0aCBkPSJtMSAxaDN2MjNoMjN2M2gtMjZ6IiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==");
  display: none;
  bottom: 0;
  left: 0;
}

.w-lightbox-right {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii00IDAgMjQgNDAiIHdpZHRoPSIyNCIgaGVpZ2h0PSI0MCI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJtMC0waDI4djI4aC01di0yM2gtMjN6IiBvcGFjaXR5PSIuNCIvPjxwYXRoIGQ9Im0xIDFoMjZ2MjZoLTN2LTIzaC0yM3oiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+");
  display: none;
  bottom: 0;
  right: 0;
}

.w-lightbox-close {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii00IDAgMTggMTciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxNyI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJtMCAwaDd2LTdoNXY3aDd2NWgtN3Y3aC01di03aC03eiIgb3BhY2l0eT0iLjQiLz48cGF0aCBkPSJtMSAxaDd2LTdoM3Y3aDd2M2gtN3Y3aC0zdi03aC03eiIgZmlsbD0iI2ZmZiIvPjwvZz48L3N2Zz4=");
  background-size: 18px;
  height: 2.6em;
  right: 0;
}

.w-lightbox-strip {
  white-space: nowrap;
  padding: 0 1vh;
  line-height: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto hidden;
}

.w-lightbox-item {
  box-sizing: content-box;
  cursor: pointer;
  width: 10vh;
  padding: 2vh 1vh;
  display: inline-block;
  -webkit-transform: translate3d(0, 0, 0);
}

.w-lightbox-active {
  opacity: .3;
}

.w-lightbox-thumbnail {
  background: #222;
  height: 10vh;
  position: relative;
  overflow: hidden;
}

.w-lightbox-thumbnail-image {
  position: absolute;
  top: 0;
  left: 0;
}

.w-lightbox-thumbnail .w-lightbox-tall {
  width: 100%;
  top: 50%;
  transform: translate(0, -50%);
}

.w-lightbox-thumbnail .w-lightbox-wide {
  height: 100%;
  left: 50%;
  transform: translate(-50%);
}

.w-lightbox-spinner {
  box-sizing: border-box;
  border: 5px solid #0006;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-top: -20px;
  margin-left: -20px;
  animation: .8s linear infinite spin;
  position: absolute;
  top: 50%;
  left: 50%;
}

.w-lightbox-spinner:after {
  content: "";
  border: 3px solid #0000;
  border-bottom-color: #fff;
  border-radius: 50%;
  position: absolute;
  inset: -4px;
}

.w-lightbox-hide {
  display: none;
}

.w-lightbox-noscroll {
  overflow: hidden;
}

@media (min-width: 768px) {
  .w-lightbox-content {
    height: 96vh;
    margin-top: 2vh;
  }

  .w-lightbox-view, .w-lightbox-view:before {
    height: 96vh;
  }

  .w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {
    height: 84vh;
  }

  .w-lightbox-image {
    max-width: 96vw;
    max-height: 96vh;
  }

  .w-lightbox-group .w-lightbox-image {
    max-width: 82.3vw;
    max-height: 84vh;
  }

  .w-lightbox-left, .w-lightbox-right {
    opacity: .5;
    display: block;
  }

  .w-lightbox-close {
    opacity: .8;
  }

  .w-lightbox-control:hover {
    opacity: 1;
  }
}

.w-lightbox-inactive, .w-lightbox-inactive:hover {
  opacity: 0;
}

.w-richtext:before, .w-richtext:after {
  content: " ";
  grid-area: 1 / 1 / 2 / 2;
  display: table;
}

.w-richtext:after {
  clear: both;
}

.w-richtext[contenteditable="true"]:before, .w-richtext[contenteditable="true"]:after {
  white-space: initial;
}

.w-richtext ol, .w-richtext ul {
  overflow: hidden;
}

.w-richtext .w-richtext-figure-selected.w-richtext-figure-type-video div:after, .w-richtext .w-richtext-figure-selected[data-rt-type="video"] div:after, .w-richtext .w-richtext-figure-selected.w-richtext-figure-type-image div, .w-richtext .w-richtext-figure-selected[data-rt-type="image"] div {
  outline: 2px solid #2895f7;
}

.w-richtext figure.w-richtext-figure-type-video > div:after, .w-richtext figure[data-rt-type="video"] > div:after {
  content: "";
  display: none;
  position: absolute;
  inset: 0;
}

.w-richtext figure {
  max-width: 60%;
  position: relative;
}

.w-richtext figure > div:before {
  cursor: default !important;
}

.w-richtext figure img {
  width: 100%;
}

.w-richtext figure figcaption.w-richtext-figcaption-placeholder {
  opacity: .6;
}

.w-richtext figure div {
  color: #0000;
  font-size: 0;
}

.w-richtext figure.w-richtext-figure-type-image, .w-richtext figure[data-rt-type="image"] {
  display: table;
}

.w-richtext figure.w-richtext-figure-type-image > div, .w-richtext figure[data-rt-type="image"] > div {
  display: inline-block;
}

.w-richtext figure.w-richtext-figure-type-image > figcaption, .w-richtext figure[data-rt-type="image"] > figcaption {
  caption-side: bottom;
  display: table-caption;
}

.w-richtext figure.w-richtext-figure-type-video, .w-richtext figure[data-rt-type="video"] {
  width: 60%;
  height: 0;
}

.w-richtext figure.w-richtext-figure-type-video iframe, .w-richtext figure[data-rt-type="video"] iframe {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.w-richtext figure.w-richtext-figure-type-video > div, .w-richtext figure[data-rt-type="video"] > div {
  width: 100%;
}

.w-richtext figure.w-richtext-align-center {
  clear: both;
  margin-left: auto;
  margin-right: auto;
}

.w-richtext figure.w-richtext-align-center.w-richtext-figure-type-image > div, .w-richtext figure.w-richtext-align-center[data-rt-type="image"] > div {
  max-width: 100%;
}

.w-richtext figure.w-richtext-align-normal {
  clear: both;
}

.w-richtext figure.w-richtext-align-fullwidth {
  text-align: center;
  clear: both;
  width: 100%;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.w-richtext figure.w-richtext-align-fullwidth > div {
  padding-bottom: inherit;
  display: inline-block;
}

.w-richtext figure.w-richtext-align-fullwidth > figcaption {
  display: block;
}

.w-richtext figure.w-richtext-align-floatleft {
  float: left;
  clear: none;
  margin-right: 15px;
}

.w-richtext figure.w-richtext-align-floatright {
  float: right;
  clear: none;
  margin-left: 15px;
}

.w-nav {
  z-index: 1000;
  background: #ddd;
  position: relative;
}

.w-nav:before, .w-nav:after {
  content: " ";
  grid-area: 1 / 1 / 2 / 2;
  display: table;
}

.w-nav:after {
  clear: both;
}

.w-nav-brand {
  float: left;
  color: #333;
  text-decoration: none;
  position: relative;
}

.w-nav-link {
  vertical-align: top;
  color: #222;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  text-decoration: none;
  display: inline-block;
  position: relative;
}

.w-nav-link.w--current {
  color: #0082f3;
}

.w-nav-menu {
  float: right;
  position: relative;
}

[data-nav-menu-open] {
  text-align: center;
  background: #c8c8c8;
  min-width: 200px;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  overflow: visible;
  display: block !important;
}

.w--nav-link-open {
  display: block;
  position: relative;
}

.w-nav-overlay {
  width: 100%;
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  overflow: hidden;
}

.w-nav-overlay [data-nav-menu-open] {
  top: 0;
}

.w-nav[data-animation="over-left"] .w-nav-overlay {
  width: auto;
}

.w-nav[data-animation="over-left"] .w-nav-overlay, .w-nav[data-animation="over-left"] [data-nav-menu-open] {
  z-index: 1;
  top: 0;
  right: auto;
}

.w-nav[data-animation="over-right"] .w-nav-overlay {
  width: auto;
}

.w-nav[data-animation="over-right"] .w-nav-overlay, .w-nav[data-animation="over-right"] [data-nav-menu-open] {
  z-index: 1;
  top: 0;
  left: auto;
}

.w-nav-button {
  float: right;
  cursor: pointer;
  -webkit-tap-highlight-color: #0000;
  tap-highlight-color: #0000;
  -webkit-user-select: none;
  user-select: none;
  padding: 18px;
  font-size: 24px;
  display: none;
  position: relative;
}

.w-nav-button:focus {
  outline: 0;
}

.w-nav-button.w--open {
  color: #fff;
  background-color: #c8c8c8;
}

.w-nav[data-collapse="all"] .w-nav-menu {
  display: none;
}

.w-nav[data-collapse="all"] .w-nav-button, .w--nav-dropdown-open, .w--nav-dropdown-toggle-open {
  display: block;
}

.w--nav-dropdown-list-open {
  position: static;
}

@media screen and (max-width: 991px) {
  .w-nav[data-collapse="medium"] .w-nav-menu {
    display: none;
  }

  .w-nav[data-collapse="medium"] .w-nav-button {
    display: block;
  }
}

@media screen and (max-width: 767px) {
  .w-nav[data-collapse="small"] .w-nav-menu {
    display: none;
  }

  .w-nav[data-collapse="small"] .w-nav-button {
    display: block;
  }

  .w-nav-brand {
    padding-left: 10px;
  }
}

@media screen and (max-width: 479px) {
  .w-nav[data-collapse="tiny"] .w-nav-menu {
    display: none;
  }

  .w-nav[data-collapse="tiny"] .w-nav-button {
    display: block;
  }
}

.w-tabs {
  position: relative;
}

.w-tabs:before, .w-tabs:after {
  content: " ";
  grid-area: 1 / 1 / 2 / 2;
  display: table;
}

.w-tabs:after {
  clear: both;
}

.w-tab-menu {
  position: relative;
}

.w-tab-link {
  vertical-align: top;
  text-align: left;
  cursor: pointer;
  color: #222;
  background-color: #ddd;
  padding: 9px 30px;
  text-decoration: none;
  display: inline-block;
  position: relative;
}

.w-tab-link.w--current {
  background-color: #c8c8c8;
}

.w-tab-link:focus {
  outline: 0;
}

.w-tab-content {
  display: block;
  position: relative;
  overflow: hidden;
}

.w-tab-pane {
  display: none;
  position: relative;
}

.w--tab-active {
  display: block;
}

@media screen and (max-width: 479px) {
  .w-tab-link {
    display: block;
  }
}

.w-ix-emptyfix:after {
  content: "";
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

.w-dyn-empty {
  background-color: #ddd;
  padding: 10px;
}

.w-dyn-hide, .w-dyn-bind-empty, .w-condition-invisible {
  display: none !important;
}

.wf-layout-layout {
  display: grid;
}

@font-face {
  font-family: BDO Grotesk;
  src: url("https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1c554072e0fa8cb27e83e_BDOGrotesk-Bold.woff2") format("woff2"), url("https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1c5540ecb63711af5693b_BDOGrotesk-ExtraBold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: BDO Grotesk;
  src: url("https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1c5540ecb63711af56936_BDOGrotesk-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: BDO Grotesk;
  src: url("https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1c5542c6850b8749bcef7_BDOGrotesk-Light.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: BDO Grotesk;
  src: url("https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1c554ac346fbb9c89e66d_BDOGrotesk-DemiBold.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: BDO Grotesk;
  src: url("https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1c5542bddc5018d95d84d_BDOGrotesk-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: BDO Grotesk;
  src: url("https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1c5548bbd3e84a1ae83cf_BDOGrotesk-Black.woff2") format("woff2");
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Butler;
  src: url("https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1c5e0ff79ea4054e368ff_Butler-Black.woff2") format("woff2");
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Butler;
  src: url("https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1c5e83600e31145eb9782_Butler-Bold.woff2") format("woff2"), url("https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1c5ef667e031c13d0ef14_Butler-ExtraBold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Butler;
  src: url("https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1c5f6f8cd8e7b32dc4c93_Butler-Light.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Butler;
  src: url("https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1c5ffb9ba6a7bf7bd66e1_Butler-Medium.woff2") format("woff2"), url("https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1c5ffb9ba6a7bf7bd66e1_Butler-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Butler;
  src: url("https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1c60da427f9f9d4fea0a7_Butler-UltraLight.woff2") format("woff2");
  font-weight: 200;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Butler;
  src: url("https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1c617fe0aceb5da0e47ed_Butler.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

:root {
  --black: #0c0c0c;
  --border: #e9e9e9;
  --_sizes---xsmall: .5rem;
  --white: white;
  --light-grey: #f2f2f2;
  --transparent: #0000;
  --background: #fafafa;
  --grey: #8b8b8b;
  --_sizes---medium: 2rem;
  --_sizes---small: 1rem;
  --_sizes---large: 3rem;
  --_sizes---xlarge: 4rem;
  --_sizes---huge: 5rem;
  --_sizes---xhuge: 6rem;
  --_sizes---xxhuge: 8rem;
  --_sizes---border--xsmall: .5rem;
  --_sizes---border--small: 1rem;
  --_sizes---border--medium: 2rem;
  --_sizes---border--large: 3rem;
  --_sizes---border--xlarge: 4rem;
  --_sizes---border--huge: 5rem;
  --_sizes---border--xhuge: 6rem;
  --_sizes---border--xxhuge: 8rem;
}

.w-layout-grid {
  grid-row-gap: 16px;
  grid-column-gap: 16px;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: 1fr;
  display: grid;
}

.w-layout-blockcontainer {
  max-width: 940px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.w-checkbox {
  margin-bottom: 5px;
  padding-left: 20px;
  display: block;
}

.w-checkbox:before {
  content: " ";
  grid-area: 1 / 1 / 2 / 2;
  display: table;
}

.w-checkbox:after {
  content: " ";
  clear: both;
  grid-area: 1 / 1 / 2 / 2;
  display: table;
}

.w-checkbox-input {
  float: left;
  margin: 4px 0 0 -20px;
  line-height: normal;
}

.w-checkbox-input--inputType-custom {
  border: 1px solid #ccc;
  border-radius: 2px;
  width: 12px;
  height: 12px;
}

.w-checkbox-input--inputType-custom.w--redirected-checked {
  background-color: #3898ec;
  background-image: url("https://d3e54v103j8qbb.cloudfront.net/static/custom-checkbox-checkmark.589d534424.svg");
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  border-color: #3898ec;
}

.w-checkbox-input--inputType-custom.w--redirected-focus {
  box-shadow: 0 0 3px 1px #3898ec;
}

.w-form-formradioinput--inputType-custom {
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 12px;
  height: 12px;
}

.w-form-formradioinput--inputType-custom.w--redirected-focus {
  box-shadow: 0 0 3px 1px #3898ec;
}

.w-form-formradioinput--inputType-custom.w--redirected-checked {
  border-width: 4px;
  border-color: #3898ec;
}

@media screen and (max-width: 991px) {
  .w-layout-blockcontainer {
    max-width: 728px;
  }
}

@media screen and (max-width: 767px) {
  .w-layout-blockcontainer {
    max-width: none;
  }
}

body {
  color: var(--black);
  background-color: #fafafa;
  font-family: BDO Grotesk, Arial, sans-serif;
  font-size: 14px;
  line-height: 20px;
}

h1 {
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 38px;
  font-weight: 400;
  line-height: 44px;
}

h2 {
  text-transform: uppercase;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 32px;
  font-weight: 400;
  line-height: 36px;
}

h3 {
  text-transform: uppercase;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 400;
  line-height: 30px;
}

h4 {
  text-transform: uppercase;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
}

h5 {
  text-transform: uppercase;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

h6 {
  text-transform: uppercase;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}

p {
  margin-bottom: 10px;
}

a {
  text-decoration: underline;
}

img {
  max-width: 100%;
  display: inline-block;
}

blockquote {
  border-left: 5px solid var(--border);
  margin-bottom: 10px;
  padding: 10px 20px;
  font-size: 18px;
  line-height: 1.5;
}

.max-width-full {
  width: 100%;
  max-width: none;
}

.text-rich-text h1 {
  font-size: 5rem;
  line-height: 1.1;
}

.text-rich-text h2 {
  font-size: 4rem;
  line-height: 1.1;
}

.text-rich-text h3 {
  font-size: 3rem;
  line-height: 1.1;
}

.text-rich-text h4 {
  font-size: 2rem;
  line-height: 1.2;
}

.text-rich-text h5 {
  font-size: 1.5rem;
  line-height: 1.2;
}

.text-rich-text h6 {
  font-size: 1rem;
  line-height: 1.2;
}

.text-rich-text a {
  color: var(--black);
}

.text-rich-text p {
  font-size: 1rem;
  line-height: 1.5;
}

.text-rich-text blockquote {
  font-size: 1.25rem;
}

.text-rich-text img {
  border-radius: var(--_sizes---xsmall);
}

.fs-styleguide_label {
  border-radius: var(--_sizes---xsmall);
  color: #fff;
  background-color: #2d62ff;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: .25rem .75rem .3rem;
  font-weight: 600;
  display: flex;
}

.fs-styleguide_label.is-tag {
  background-color: #dd23bb;
}

.text-size-tiny {
  font-size: .75rem;
  line-height: 1.5;
}

.nav_menu_link {
  color: var(--white);
  padding: 1rem;
}

.heading-style-h2 {
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 12rem;
  font-weight: 400;
  line-height: 1.1;
}

.heading-style-h2.bottom {
  font-family: Butler, Georgia, sans-serif;
}

.fs-styleguide_section-header {
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  border-bottom: 1px solid #eee;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  grid-auto-columns: 1fr;
  width: 100%;
  padding-bottom: 3rem;
  line-height: 1.4;
  display: grid;
}

.padding-section-large {
  padding-top: 8rem;
  padding-bottom: 8rem;
}

.icon-1x1-medium {
  width: 2rem;
  height: 2rem;
}

.fs-styleguide_hero-label {
  border-radius: var(--_sizes---xsmall);
  color: var(--black);
  text-transform: uppercase;
  background-color: #eee;
  padding: .25rem .5rem;
  font-size: .75rem;
  font-weight: 500;
  text-decoration: none;
}

.padding-custom3 {
  padding: 3.5rem;
}

.spacer-xxhuge {
  width: 100%;
  padding-top: 12rem;
}

.fs-styleguide_background {
  border: 1px solid #0000001a;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  display: flex;
}

.background-color-secondary {
  background-color: var(--light-grey);
}

.spacer-xhuge {
  width: 100%;
  padding-top: 8rem;
}

.overflow-visible {
  overflow: visible;
}

.fs-styleguide_header-block {
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  grid-auto-columns: 1fr;
  place-items: center start;
  display: grid;
}

.overflow-hidden {
  overflow: hidden;
}

.pointer-events-none {
  pointer-events: none;
}

.text-style-link {
  color: #000;
  text-decoration: underline;
}

.margin-xsmall {
  margin: .5rem;
}

.icon-1x1-large {
  width: 2.5rem;
  height: 2.5rem;
}

.margin-horizontal {
  margin-top: 0;
  margin-bottom: 0;
}

.fs-styleguide_item-header {
  border-bottom: 1px solid #0000001a;
  width: 100%;
  padding-bottom: 2rem;
}

.padding-bottom {
  padding-top: 0;
  padding-left: 0;
  padding-right: 0;
}

.fs-styleguide_heading-header {
  color: var(--white);
  font-size: 8rem;
  line-height: 1;
}

.fs-styleguide_item-wrapper {
  grid-column-gap: 3rem;
  grid-row-gap: 3rem;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  display: flex;
}

.text-weight-xbold {
  font-weight: 800;
}

.fs-styleguide_section {
  grid-column-gap: 6rem;
  grid-row-gap: 6rem;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  grid-auto-columns: 1fr;
  place-items: start;
  display: grid;
}

.fs-styleguide_section.is-vertical {
  grid-column-gap: 4rem;
  grid-row-gap: 4rem;
  grid-template-columns: 1fr;
}

.text-size-small {
  font-size: .875rem;
  line-height: 1.5;
}

.icon-1x1-small {
  flex: none;
  width: 1rem;
  height: 1rem;
}

.form_checkbox {
  flex-direction: row;
  align-items: center;
  margin-bottom: .5rem;
  padding-left: 0;
  display: flex;
}

.padding-small {
  padding: 1rem;
}

.fs-styleguide_header {
  color: #fff;
  background-color: #000;
  background-image: radial-gradient(circle at 100% 100%, #dd23bb40, #0000 40%), radial-gradient(circle at 0 100%, #2d62ff4d, #0000 60%);
}

.margin-top {
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
}

.padding-vertical {
  padding-left: 0;
  padding-right: 0;
}

.pointer-events-auto {
  pointer-events: auto;
}

.text-color-alternate {
  color: #fff;
}

.padding-horizontal {
  padding-top: 0;
  padding-bottom: 0;
}

.text-weight-medium {
  font-weight: 500;
}

.spacer-medium {
  width: 100%;
  padding-top: 2rem;
}

.text-style-muted {
  opacity: .6;
}

.margin-custom1 {
  margin: 1.5rem;
}

.container-small {
  width: 100%;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
}

.fs-styleguide_spacing-all {
  display: none;
}

.form_component {
  margin-bottom: 0;
}

.spacer-xxlarge {
  width: 100%;
  padding-top: 5rem;
}

.text-align-left {
  text-align: left;
}

.spacer-huge {
  width: 100%;
  padding-top: 6rem;
}

.button-group {
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  flex-flow: wrap;
  justify-content: flex-start;
  align-items: center;
  display: flex;
}

.text-style-strikethrough {
  text-decoration: line-through;
}

.margin-xxlarge {
  margin: 5rem;
}

.margin-small {
  margin: 1rem;
}

.text-align-center {
  text-align: center;
}

.text-size-medium {
  font-size: 1.25rem;
  line-height: 1.5;
}

.hide {
  display: none;
}

.overflow-scroll {
  overflow: scroll;
}

.margin-tiny {
  margin: .125rem;
}

.padding-xhuge {
  padding: 8rem;
}

.max-width-small {
  width: 100%;
  max-width: 20rem;
}

.icon-height-small {
  height: 1rem;
}

.heading-style-h1 {
  font-size: 14rem;
  font-weight: 400;
  line-height: 1.1;
}

.padding-xxhuge {
  padding: 12rem;
}

.nav_brand {
  color: var(--white);
  font-size: 1.25rem;
  font-weight: 500;
}

.text-color-primary {
  color: #000;
}

.padding-large {
  padding: 3rem;
}

.aspect-ratio-portrait {
  aspect-ratio: 2 / 3;
  object-fit: cover;
}

.z-index-1 {
  z-index: 1;
  position: relative;
}

.text-align-right {
  text-align: right;
}

.padding-section-small {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.aspect-ratio-landscape {
  aspect-ratio: 3 / 2;
  object-fit: cover;
}

.text-weight-normal {
  font-weight: 400;
}

.padding-custom1 {
  padding: 1.5rem;
}

.button {
  border: 1px solid var(--black);
  background-color: var(--black);
  color: var(--white);
  text-align: center;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  min-height: 3.5rem;
  padding: .75rem 2rem;
  font-weight: 600;
  transition: all .4s;
  display: flex;
}

.button:hover {
  background-color: var(--transparent);
  color: var(--black);
}

.button.is-text {
  color: var(--black);
  background-color: #0000;
  border: 2px solid #0000;
}

.button.is-text:hover {
  background-color: var(--black);
  color: var(--white);
}

.button.is-form-submit {
  width: 100%;
}

.button.is-secondary {
  border-style: solid;
  border-width: 1px;
  border-color: #222 #222 #222 var(--black);
  color: var(--black);
  background-color: #0000;
}

.button.is-secondary:hover {
  background-color: var(--black);
  color: var(--white);
}

.button.is-large {
  padding: 1rem 2rem;
}

.button.is-icon {
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  display: flex;
}

.button.is-small {
  padding: .5rem 1.25rem;
}

.form_radio {
  flex-direction: row;
  align-items: center;
  margin-bottom: .5rem;
  padding-left: 0;
  display: flex;
}

.text-weight-light {
  font-weight: 300;
}

.heading-style-h6 {
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.5;
}

.fs-styleguide_classes {
  grid-column-gap: 1px;
  grid-row-gap: 1px;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  grid-auto-columns: 1fr;
  display: grid;
}

.spacer-xlarge {
  width: 100%;
  padding-top: 4rem;
}

.padding-0 {
  padding: 0;
}

.overflow-auto {
  overflow: auto;
}

.text-style-italic {
  font-style: italic;
}

.max-width-xlarge {
  width: 100%;
  max-width: 64rem;
}

.margin-xxhuge {
  margin: 12rem;
}

.text-weight-semibold {
  font-weight: 600;
}

.padding-custom2 {
  padding: 2.5rem;
}

.fs-styleguide_2-col {
  grid-column-gap: 4rem;
  grid-row-gap: 4rem;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: 1fr;
  width: 100%;
  display: grid;
}

.fs-styleguide_2-col.is-align-start {
  align-items: start;
}

.max-width-xxlarge {
  width: 100%;
  max-width: 80rem;
}

.fs-styleguide_empty-box {
  z-index: -1;
  background-color: #2d40ea0d;
  border: 1px dashed #2d40ea;
  min-width: 3rem;
  height: 3rem;
  position: relative;
}

.text-color-secondary {
  color: #222;
}

.spacer-tiny {
  width: 100%;
  padding-top: .125rem;
}

.aspect-ratio-widescreen {
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.heading-style-h4 {
  text-transform: uppercase;
  font-size: 4rem;
  font-weight: 400;
  line-height: 1.4;
}

.margin-large {
  margin: 3rem;
}

.margin-0 {
  margin: 0;
}

.icon-height-large {
  height: 3rem;
}

.margin-xxsmall {
  margin: .25rem;
}

.form_message-success {
  border-radius: var(--_sizes---xsmall);
  color: #114e0b;
  background-color: #cef5ca;
  padding: 1.25rem;
}

.aspect-ratio-square {
  aspect-ratio: 1;
  object-fit: cover;
}

.background-color-alternate {
  background-color: var(--white);
}

.heading-style-h3 {
  text-transform: uppercase;
  font-size: 8rem;
  font-weight: 400;
  line-height: 1.2;
}

.fs-styleguide_heading-medium {
  font-size: 4rem;
}

.margin-xlarge {
  margin: 4rem;
}

.margin-medium {
  margin: 2rem;
}

.padding-left {
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;
}

.align-center {
  margin-left: auto;
  margin-right: auto;
}

.text-style-allcaps {
  text-transform: uppercase;
}

.fs-styleguide_spacing {
  grid-column-gap: .5rem;
  grid-row-gap: .5rem;
  background-image: linear-gradient(to top, #2d40ea1a, #fff0);
  grid-template-rows: auto auto;
  grid-template-columns: 1fr;
  grid-auto-columns: 1fr;
  place-content: start;
  place-items: start stretch;
  display: grid;
  position: relative;
}

.margin-custom2 {
  margin: 2.5rem;
}

.nav_button {
  padding: 1rem;
}

.text-weight-bold {
  font-weight: 700;
}

.padding-medium {
  padding: 2rem;
}

.form_radio-icon {
  width: .875rem;
  height: .875rem;
  margin-top: 0;
  margin-left: 0;
  margin-right: .5rem;
}

.form_radio-icon.w--redirected-checked {
  border-width: .25rem;
  width: .875rem;
  height: .875rem;
}

.form_radio-icon.w--redirected-focus {
  width: .875rem;
  height: .875rem;
  box-shadow: 0 0 .25rem 0 #3898ec;
}

.fs-styleguide_background-space {
  width: 1px;
  height: 1px;
  margin: 5rem;
}

.padding-xxlarge {
  padding: 5rem;
}

.max-width-large {
  width: 100%;
  max-width: 48rem;
}

.form_input {
  border: 1px solid var(--border);
  background-color: var(--white);
  color: var(--black);
  border-radius: 100px;
  min-height: 3.5rem;
  margin-bottom: .75rem;
  padding: .5rem 1rem;
  font-size: 1rem;
}

.form_input:hover, .form_input:active, .form_input:focus {
  border-color: #c5c5c5;
}

.form_input::placeholder, .form_input.is-select-input {
  color: #222;
}

.form_input.is-text-area {
  border-radius: 30px;
  min-height: 8rem;
  padding-top: .75rem;
  font-size: 1rem;
}

.text-size-large {
  font-size: 1.5rem;
  line-height: 1.4;
}

.form_message-error {
  border-radius: var(--_sizes---xsmall);
  color: #3b0b0b;
  text-align: center;
  background-color: #f8e4e4;
  margin-top: 2rem;
  padding: .75rem;
}

.padding-xsmall {
  padding: .5rem;
}

.margin-vertical {
  margin-left: 0;
  margin-right: 0;
}

.spacer-xsmall {
  width: 100%;
  padding-top: .5rem;
}

.container-large {
  width: 100%;
  max-width: 110rem;
  margin-left: auto;
  margin-right: auto;
}

.spacing-clean {
  margin: 0;
  padding: 0;
}

.fs-styleguide_4-col {
  grid-column-gap: 4rem;
  grid-row-gap: 4rem;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-columns: 1fr;
  width: 100%;
  display: grid;
}

.heading-style-h5 {
  font-size: 3rem;
  font-weight: 400;
  line-height: 1.5;
}

.padding-top {
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
}

.spacer-small {
  width: 100%;
  padding-top: 1rem;
}

.fs-styleguide_3-col {
  grid-column-gap: 4rem;
  grid-row-gap: 4rem;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-columns: 1fr;
  align-items: stretch;
  width: 100%;
  display: grid;
}

.fs-styleguide_3-col.is-align-start {
  align-items: start;
}

.fs-styleguide_item {
  grid-column-gap: 1.125rem;
  grid-row-gap: 1.125rem;
  border-bottom: 1px solid #0000001a;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  grid-auto-columns: 1fr;
  place-content: start;
  place-items: start;
  padding-bottom: 3rem;
  display: grid;
  position: relative;
}

.fs-styleguide_item.is-stretch {
  justify-items: stretch;
}

.text-style-nowrap {
  white-space: nowrap;
}

.margin-huge {
  margin: 6rem;
}

.text-size-regular {
  color: var(--black);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
}

.nav_component {
  border-radius: var(--_sizes---xsmall);
  background-color: var(--black);
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  position: relative;
  inset: 0% 0% auto;
}

.padding-xxsmall {
  padding: .25rem;
}

.z-index-2 {
  z-index: 2;
  position: relative;
}

.margin-xhuge {
  margin: 8rem;
}

.padding-huge {
  padding: 6rem;
}

.fs-styleguide_spacer-box {
  background-color: #2d40ea1a;
  border: 1px dashed #2d40ea;
  width: 100%;
  position: relative;
}

.padding-global {
  padding-left: 2.5rem;
  padding-right: 2.5rem;
}

.max-width-medium {
  width: 100%;
  max-width: 32rem;
}

.max-width-xxsmall {
  width: 100%;
  max-width: 12rem;
}

.padding-tiny {
  padding: .125rem;
}

.padding-section-medium {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.margin-right {
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
}

.max-width-xsmall {
  width: 100%;
  max-width: 16rem;
}

.background-color-tertiary {
  background-color: var(--black);
}

.padding-xlarge {
  padding: 4rem;
}

.margin-bottom {
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
}

.margin-left {
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 0;
}

.fs-styleguide_row {
  grid-column-gap: .75rem;
  grid-row-gap: .75rem;
  flex-direction: row;
  grid-template-rows: auto;
  grid-template-columns: auto;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  justify-content: flex-start;
  align-items: center;
  display: flex;
}

.spacer-large {
  padding-top: 3rem;
}

.background-color-primary {
  background-color: var(--background);
  color: #fff;
}

.container-medium {
  width: 100%;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
}

.text-style-quote {
  border-left: .25rem solid var(--border);
  margin-bottom: 0;
  padding: 0 1.25rem;
  font-size: 1.25rem;
  line-height: 1.5;
}

.spacer-xxsmall {
  width: 100%;
  padding-top: .25rem;
}

.fs-styleguide_1-col {
  grid-column-gap: 3rem;
  grid-row-gap: 3rem;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  grid-auto-columns: 1fr;
  width: 100%;
  display: grid;
}

.fs-styleguide_message {
  color: #5e5515;
  background-color: #fcf8d8;
  border-radius: .25rem;
  padding: .25rem .5rem;
  font-size: .875rem;
}

.margin-custom3 {
  margin: 3.5rem;
}

.layer {
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0%;
}

.form_checkbox-icon {
  border-radius: .125rem;
  width: .875rem;
  height: .875rem;
  margin: 0 .5rem 0 0;
}

.form_checkbox-icon.w--redirected-checked {
  background-size: 90%;
  border-radius: .125rem;
  width: .875rem;
  height: .875rem;
  margin: 0 .5rem 0 0;
}

.form_checkbox-icon.w--redirected-focus {
  border-radius: .125rem;
  width: .875rem;
  height: .875rem;
  margin: 0 .5rem 0 0;
  box-shadow: 0 0 .25rem 0 #3898ec;
}

.nav_container {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
}

.icon-height-medium {
  height: 2rem;
}

.padding-right {
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
}

.utility-page-wrap {
  justify-content: center;
  align-items: center;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  max-height: 100%;
  display: flex;
}

.utility-page-content {
  text-align: center;
  flex-direction: column;
  width: 260px;
  display: flex;
}

.utility-page-form {
  flex-direction: column;
  align-items: stretch;
  display: flex;
}

.utility-content {
  border: 1px solid var(--border);
  border-radius: var(--_sizes---xsmall);
  background-color: var(--white);
  width: 100%;
  padding: 2rem;
}

.link {
  color: var(--black);
  font-weight: 500;
  text-decoration: underline;
}

.link:hover {
  color: var(--grey);
}

.utility-content-wrapper {
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 4rem;
  display: flex;
}

.form_grid {
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  grid-template-rows: auto;
  width: 100%;
}

.form_field-label {
  margin-bottom: .5rem;
  font-weight: 400;
}

.form_message-success-wrapper {
  background-color: #0000;
  margin-top: 1rem;
  padding: 0;
}

.contact-container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.contact_form {
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr;
  grid-auto-columns: 1fr;
  display: grid;
}

.form_message-error-wrapper {
  margin-top: 1rem;
  padding: 0;
}

.success-text {
  text-align: center;
  font-weight: 500;
}

.contact_form-block {
  border: 1px solid var(--border);
  border-radius: var(--_sizes---medium);
  background-color: var(--white);
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 0;
  padding: 2rem;
}

.error-text {
  color: #e23939;
}

.text-style-link-2 {
  color: #0e0e0e;
  text-decoration: underline;
}

.form-item {
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
}

.contact_component-info {
  flex-flow: row;
  justify-content: space-between;
  align-items: stretch;
  display: flex;
}

.icon-embed-small {
  color: var(--white);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
}

.faq_list-grid {
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  grid-template-rows: auto;
  grid-template-columns: 100%;
  grid-auto-columns: 100%;
  place-items: start stretch;
  display: grid;
}

.faq_icon-wrappper {
  background-color: var(--black);
  border-radius: 100%;
  justify-content: center;
  align-self: flex-start;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
}

.faq_answer {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  font-size: 1rem;
  line-height: 1.4;
  overflow: hidden;
}

.faq_accordion {
  border-bottom: 1px solid var(--border);
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding-bottom: 1rem;
}

.faq_question {
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  display: flex;
}

.faq-title {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
}

.line {
  background-color: var(--border);
  width: 100%;
  height: 1px;
}

.hero-grid {
  grid-template-rows: auto auto auto auto auto auto auto auto;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  height: 100vh;
}

.hero-content {
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  display: flex;
}

.hero-title {
  color: var(--black);
  text-align: center;
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 0;
  font-family: BDO Grotesk, Arial, sans-serif;
  font-size: 16vw;
  font-weight: 400;
  line-height: 1;
}

.hero-title.secondary {
  font-family: Butler, Georgia, sans-serif;
  font-weight: 400;
}

.title-wrap {
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  position: relative;
}

.title-wrap.top {
  z-index: 1;
}

.title-wrap.bottom {
  z-index: 3;
  justify-content: flex-start;
  align-items: flex-start;
}

.hero-image-container {
  z-index: 2;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 25rem;
  margin-top: -1rem;
  display: flex;
  position: absolute;
}

.hero-image-wrapper {
  border-radius: var(--_sizes---xsmall);
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hero-image-item {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.hero-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
}

.copyright-symbol {
  font-family: BDO Grotesk, Arial, sans-serif;
  font-size: 3rem;
  font-weight: 900;
  line-height: 1;
  position: absolute;
  inset: 0% -2rem auto auto;
}

.menu-icon_line-top {
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 2px;
  padding-bottom: 6px;
}

.nav-link {
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  height: 1.125rem;
  text-decoration: none;
  display: flex;
  position: relative;
  overflow: hidden;
}

.menu-icon-block {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
}

.button-background-circle {
  background-color: var(--background);
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  text-decoration: none;
  display: flex;
}

.button-image {
  object-fit: cover;
  background-image: url("https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1e782e6798d83ea8d70e7_profile-img.jpg");
  background-position: 0 0;
  background-size: auto;
  border: 1px solid #8b8b8b;
  border-radius: 100px;
  width: 24px;
  height: 24px;
}

.navigation-container {
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  justify-content: flex-end;
  align-items: center;
  display: flex;
  position: relative;
}

.logo {
  color: var(--black);
  height: 2.25rem;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.2;
}

.button-animation {
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 8px 15px;
  text-decoration: none;
  display: flex;
}

.button-wrapper {
  grid-column-gap: 20px;
  border: 1px solid var(--black);
  background-color: var(--black);
  border-radius: 100px;
  flex: 0 auto;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 1.5rem;
  font-size: 1.375rem;
  text-decoration: none;
  display: flex;
  overflow: hidden;
}

.hi-wrapper {
  z-index: 5;
  grid-column-gap: 8px;
  background-color: var(--black);
  border-radius: 100px;
  flex: 0 auto;
  justify-content: center;
  align-items: center;
  padding: 5px 14px 5px 5px;
  text-decoration: none;
  display: flex;
  position: absolute;
  top: 3.1rem;
  right: auto;
  transform: rotate(-7deg);
}

.navbar {
  background-color: #0000;
  padding-top: .75rem;
  padding-bottom: .75rem;
  position: absolute;
  inset: 0% 0% auto;
}

.logo-link {
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  height: 2.25rem;
  text-decoration: none;
  display: flex;
  position: relative;
  overflow: hidden;
}

.menu-icon-wrap {
  border-radius: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  display: flex;
  position: relative;
}

.hi-text {
  color: #fff;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 15px;
  font-weight: 400;
  line-height: 100%;
  text-decoration: none;
}

.button-arrow {
  color: #fff;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
  display: flex;
}

.button-arrow._02 {
  color: #0f0f0f;
}

.button-icon-block {
  z-index: 3;
  grid-column-gap: 10px;
  background-color: var(--black);
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  margin-top: auto;
  margin-bottom: auto;
  text-decoration: none;
  display: flex;
  position: absolute;
  right: 1.5rem;
}

.button-text-wrap {
  z-index: 2;
  grid-row-gap: 2rem;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 1rem;
  text-decoration: none;
  display: flex;
  position: relative;
}

.text-button {
  color: #fff;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1rem;
  line-height: 100%;
  text-decoration: none;
}

.text-button._2 {
  color: #1e2022;
}

.nav-button-wrap {
  display: none;
}

.main-button {
  color: var(--black);
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-decoration: none;
  display: flex;
  position: relative;
}

.nav-grid {
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
}

.menu-icon_line-bottom {
  background-color: #000;
  width: 24px;
  height: 2px;
}

.nav-text {
  color: var(--black);
  font-size: 1.125rem;
  line-height: 1;
}

.nav-text.text-color-secondary {
  color: var(--grey);
}

.social-wrapper {
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  justify-content: center;
  align-items: center;
  display: flex;
}

.social-link {
  background-color: var(--black);
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  transition: all .4s;
  display: flex;
}

.social-link:hover {
  transform: scale(.9);
}

.social-icon-block {
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  width: 1.375rem;
  height: 1.375rem;
  display: flex;
  position: relative;
  overflow: hidden;
}

.social-icon {
  color: #fff;
  width: 1.375rem;
  height: 1.375rem;
}

.header-inner-grid {
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
}

.circle-text {
  height: 10rem;
}

.scroll-down-wrapper {
  justify-content: flex-end;
  align-items: flex-end;
  display: flex;
  position: relative;
}

.scroll-down {
  grid-column-gap: 6px;
  grid-row-gap: 6px;
  flex-flow: column;
  justify-content: flex-end;
  align-items: flex-end;
  display: flex;
}

.scroll-down-shape {
  background-color: var(--black);
  border: 1px solid #0f0f0f;
  border-radius: 100px;
  justify-content: center;
  align-items: flex-start;
  width: 28px;
  height: 44px;
  display: flex;
}

.scroll-down-circle {
  background-color: #fff;
  border-radius: 10px;
  width: 6px;
  height: 6px;
  margin-top: 10px;
}

.about-section {
  padding-top: 8rem;
}

.scrolling-text-wrapper {
  overflow: hidden;
}

.scrolling-text-wrapper.cta {
  mix-blend-mode: difference;
}

.scrolling-text-block {
  grid-column-gap: 3rem;
  grid-row-gap: 3rem;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  position: relative;
}

.scrolling-text-item {
  grid-column-gap: 3rem;
  grid-row-gap: 3rem;
  flex: none;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5px;
  display: flex;
}

.scrolling-text {
  color: var(--grey);
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 16vw;
  font-weight: 400;
  line-height: 1;
}

.scrolling-text.alternate-text {
  font-family: Butler, Georgia, sans-serif;
  position: relative;
  bottom: -1.75rem;
}

.about-grid {
  grid-template-rows: auto;
  width: 100%;
}

.about-content {
  width: 100%;
  max-width: 35rem;
}

.number-wrap {
  grid-column-gap: 4rem;
  grid-row-gap: 4rem;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
}

.number-grid {
  grid-column-gap: 3rem;
  grid-row-gap: 3rem;
  grid-template-rows: auto;
  width: 100%;
}

.number-container {
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
}

.number-container._02 {
  justify-content: flex-start;
  align-items: center;
}

.number-container._03 {
  justify-content: flex-start;
  align-items: flex-end;
}

.number-block {
  height: 8rem;
  min-height: 8rem;
}

.number-wrapper {
  height: 8rem;
  min-height: 8rem;
  display: flex;
  overflow: hidden;
}

.number {
  color: var(--black);
  text-align: center;
  height: 8rem;
  min-height: 8rem;
  font-size: 8rem;
  font-weight: 500;
  line-height: 1;
}

.number.grey {
  color: var(--grey);
}

.work-section {
  padding-bottom: 4rem;
}

.title-overflow {
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  overflow: hidden;
}

.work-top-content {
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-rows: auto;
  grid-template-columns: .5fr 1fr .5fr;
  width: 100%;
}

.work-number-wrap {
  justify-content: center;
  align-items: center;
  display: flex;
}

.work-number {
  border: 1px solid var(--border);
  color: var(--black);
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
}

.empty-state {
  background-color: var(--light-grey);
  text-align: center;
}

.work-grid {
  grid-column-gap: 1.5rem;
  grid-row-gap: 5rem;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: 1fr;
  width: 100%;
  height: 100%;
  display: grid;
}

.work-link {
  border-radius: var(--_sizes---xsmall);
  background-color: var(--background);
  width: 100%;
  height: 100%;
  text-decoration: none;
  display: block;
  position: relative;
}

.work-image-wrap {
  border-radius: var(--_sizes---xsmall);
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.work-image {
  object-fit: cover;
  width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 100%;
  position: relative;
}

.cursor-wrapper {
  border-radius: 1rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  inset: 0%;
  overflow: hidden;
}

.cursor {
  z-index: 10;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  background-color: #1d1f2140;
  border: 1px solid #ffffff40;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 6rem;
  text-decoration: none;
  display: flex;
  position: absolute;
}

.work-content-wrapper {
  background-color: var(--background);
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  padding-top: 1rem;
  padding-left: 5px;
  padding-right: 5px;
  display: flex;
}

.work-text {
  border: 1px solid var(--border);
  color: var(--black);
  border-radius: 100px;
  padding: 6px 14px;
  font-size: 1.125rem;
  line-height: 1;
}

.work-text.work-name {
  border-color: var(--black);
  background-color: var(--black);
  color: var(--white);
}

.view-text {
  color: var(--white);
  letter-spacing: .5px;
  font-weight: 400;
}

.overlay-grid {
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-rows: auto;
  grid-template-columns: 1fr auto 1fr;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0%;
}

.overlay-block {
  background-color: var(--border);
  width: 100%;
  height: 100%;
  transform: translate(0%);
}

.overlay-block.left {
  transform: translate(-110%);
}

.overlay-block.right {
  transform: translate(110%);
}

.work-component {
  grid-column-gap: 5rem;
  grid-row-gap: 5rem;
  flex-flow: column;
  display: flex;
}

.work-wrapper {
  position: sticky;
  top: 3rem;
}

.work-wrapper._02 {
  z-index: 2;
}

.work-wrapper._01 {
  z-index: 1;
}

.service-arrow-block {
  border: 1px solid var(--black);
  background-color: var(--black);
  border-radius: 100rem;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  display: flex;
}

.service-top-content {
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  grid-template-rows: auto;
  grid-template-columns: 1fr auto;
  grid-auto-columns: 1fr;
  justify-content: space-between;
  align-items: center;
}

.service-content-bottom {
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  overflow: hidden;
}

.service-plus-icon {
  color: var(--background);
  width: 1.375rem;
  height: 1.375rem;
}

.service-title {
  white-space: nowrap;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 4rem;
  font-weight: 400;
  line-height: 1.2;
}

.service-title.hover {
  color: var(--grey);
  font-family: Butler, Georgia, sans-serif;
}

.service-image {
  border-radius: var(--_sizes---xsmall);
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
}

.service-text-wrap {
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 40rem;
  padding-top: 2rem;
  display: flex;
}

.service-top-grid {
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-rows: auto;
  grid-template-columns: 1.5fr 1fr .5fr;
  grid-auto-columns: 1fr;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: grid;
}

.service-description {
  margin-bottom: 0;
  font-size: 1.25rem;
  line-height: 1.5;
}

.service-subtitle {
  border: 1px solid var(--border);
  white-space: nowrap;
  border-radius: 100px;
  padding: .5rem 1rem;
  font-size: 1rem;
  line-height: 1;
}

.service-image-wrap {
  perspective: 1000px;
  justify-content: center;
  align-items: center;
  width: 14rem;
  height: 14rem;
  display: flex;
}

.service-content-block {
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
}

.service-image-block {
  position: relative;
}

.service-number {
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
  font-family: Butler, Georgia, sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
  position: relative;
  top: 1.5rem;
}

.service-title-wrap {
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 5rem;
  display: flex;
  position: relative;
  overflow: hidden;
}

.work-item {
  width: 100%;
}

.work-list-wrapper {
  width: 100%;
  height: 100%;
}

.testimonial-picture {
  z-index: 5;
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0%;
}

.slide-opacity {
  z-index: 10;
  background-image: linear-gradient(90deg, var(--background), #0000);
  width: 5rem;
  position: absolute;
  inset: 0% auto 0% 0%;
}

.slide-opacity.righ {
  background-image: linear-gradient(90deg, #0000, var(--background));
  inset: 0% 0% 0% auto;
}

.testimonial-content {
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  opacity: 1;
  cursor: pointer;
  flex-direction: column;
  flex: none;
  justify-content: flex-start;
  align-items: center;
  width: 60rem;
  padding-top: 3rem;
  display: flex;
}

.slide-nav {
  display: none;
}

.testimonial-name {
  font-size: 1.1rem;
  line-height: 1.55;
}

.testimonial-mask {
  height: 100%;
}

.testimonial-arrow {
  color: var(--black);
  flex: none;
  justify-content: center;
  align-items: center;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  overflow: hidden;
}

.slider-arrow {
  border: 1px solid var(--border);
  background-color: var(--white);
  cursor: pointer;
  border-radius: 100rem;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  transition: all .4s;
  display: flex;
}

.slider-arrow:hover {
  transform: scale(.9);
}

.client-picture {
  border-radius: var(--_sizes---xsmall);
  width: 3.5rem;
  height: 3.5rem;
  position: relative;
  overflow: hidden;
}

.testimonial-slide {
  vertical-align: middle;
}

.testimonial-wrapper {
  grid-column-gap: 0rem;
  grid-row-gap: 0rem;
  flex-direction: column;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-columns: 1fr;
  justify-content: space-between;
  padding-top: 4rem;
  padding-bottom: 4rem;
  display: flex;
  position: relative;
}

.right-arrow {
  justify-content: flex-end;
  align-items: flex-end;
  display: flex;
  inset: -5rem 26rem auto auto;
}

.client-position {
  color: #8b8b8b;
  padding-top: 0;
  font-size: .875rem;
}

.testimonial-content-wrap {
  grid-column-gap: 1.25rem;
  grid-row-gap: 1.25rem;
  align-items: center;
  display: flex;
}

.testimonial-arrow-wrap {
  justify-content: center;
  align-items: center;
  padding: 2px;
  display: flex;
  position: relative;
}

.testimonial-arrow-wrap.left-arrow {
  position: absolute;
  inset: 0% auto 0% -100%;
}

.testimonial-arrow-wrap.right-arrow {
  position: absolute;
  inset: 0% -100% 0% auto;
}

.testimonial-text {
  text-align: center;
  font-size: 3.25rem;
  line-height: 1.3;
}

.testimonial-slider-wrapper {
  background-color: #0000;
  width: 65rem;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
}

.left-arrow {
  justify-content: flex-start;
  align-items: flex-end;
  display: flex;
  inset: -5rem auto auto 26rem;
}

.testimonial-arrow-item {
  z-index: 1;
  position: relative;
  overflow: hidden;
}

.testimonial-container {
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  display: flex;
}

.cta-section {
  padding-top: 8rem;
  padding-bottom: 8rem;
}

.cta-image {
  border-radius: var(--_sizes---xsmall);
  width: 30rem;
}

.cta-grid {
  grid-template-columns: 1fr 1fr;
  width: 100%;
}

.cta-content {
  width: 100%;
  max-width: 30rem;
}

.cta-button-wrap {
  justify-content: flex-start;
  align-items: center;
  display: flex;
}

.cta-image-wrap {
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  display: flex;
}

.footer {
  background-color: var(--light-grey);
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.footer-padding {
  padding-top: 8rem;
  padding-bottom: 6rem;
}

.footer-bottom {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.footer-bottom-container {
  background-color: var(--black);
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  padding-top: 3rem;
  padding-bottom: 3.5rem;
}

.footer-bottom-wrapper {
  grid-column-gap: 1.5rem;
  grid-row-gap: 0rem;
  white-space: normal;
  grid-template-rows: auto;
  grid-template-columns: max-content;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  justify-content: space-between;
  display: flex;
}

.footer-link-block {
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
  justify-content: flex-end;
  align-items: center;
  display: flex;
}

.footer_credit-text {
  color: var(--grey);
  font-size: .875rem;
}

.footer-legal-link {
  color: var(--white);
  font-size: .875rem;
  text-decoration: underline;
  transition: opacity .4s;
}

.footer-legal-link:hover {
  opacity: .5;
  color: var(--light-grey);
}

.back-to-top-arrow {
  color: #fff;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
  display: flex;
}

.back-to-top-link {
  background-color: #0f0f0f;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  display: flex;
}

.back-to-top-wrap {
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  justify-content: flex-end;
  align-items: center;
}

.footer-top-content {
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-columns: 1fr;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8rem;
  display: grid;
}

.back-arrow-wrap {
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  width: 1rem;
  height: 1rem;
  display: flex;
  position: relative;
  overflow: hidden;
}

.social-block {
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
}

.footer-link {
  text-decoration: none;
  transition: opacity .4s;
}

.footer-link:hover {
  opacity: .6;
}

.footer-nav-menu {
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
  justify-content: center;
  align-items: center;
  display: flex;
}

.newsletter-form {
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  color: var(--black);
  text-align: center;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  display: flex;
}

.form {
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 40rem;
  margin-top: 10px;
  display: flex;
  position: relative;
}

.form-input {
  border: 1px solid var(--border);
  background-color: var(--white);
  color: var(--black);
  background-image: url("https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a2916482c018e44a05700e_newsletter-icon.svg");
  background-position: 3%;
  background-repeat: no-repeat;
  background-size: 22px;
  border-radius: 100px;
  min-height: 4rem;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 3.5rem;
  transition: border-color .4s;
}

.form-input:hover, .form-input:active, .form-input:focus {
  border-color: #c5c5c5;
}

.newsletter-button {
  border: 1px solid var(--black);
  background-color: var(--black);
  border-radius: 100px;
  height: 3.5rem;
  min-height: 3.5rem;
  margin-top: 4px;
  margin-right: 4px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  transition: all .4s;
  position: absolute;
  inset: 0% 0% 0% auto;
}

.newsletter-button:hover {
  background-color: var(--transparent);
  color: var(--black);
}

.nav-number {
  background-color: var(--black);
  color: var(--background);
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  width: 1.125rem;
  height: 1.125rem;
  font-size: 9px;
  line-height: 1;
  display: flex;
  position: absolute;
  inset: -.5rem -1rem auto auto;
}

.nav-link-wrap {
  position: relative;
}

.back-to-top-block {
  grid-column-gap: .5rem;
  grid-row-gap: .5rem;
  justify-content: flex-end;
  align-items: center;
  text-decoration: none;
  display: flex;
}

.link-block {
  height: 1.25rem;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.link-text {
  color: var(--black);
  font-size: 1.125rem;
  line-height: 1;
}

.link-text.text-color-secondary {
  color: var(--grey);
}

.scroll-down-block {
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  display: flex;
}

.image-wrapper {
  border-radius: var(--_sizes---xsmall);
  width: 100%;
  overflow: hidden;
}

.cover-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.work-content-item {
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  display: flex;
}

.work-bottom-content {
  flex-flow: column;
  display: flex;
}

.link-button {
  border: 1px solid var(--border);
  color: var(--black);
  border-radius: 100rem;
  justify-content: center;
  align-items: center;
  padding: .4rem 1rem;
  text-decoration: none;
  transition: all .4s;
  display: flex;
}

.link-button:hover {
  border-color: var(--black);
  background-color: var(--black);
  color: var(--white);
}

.work-info-text {
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
  font-size: .875rem;
  font-weight: 400;
}

.work-info-text.text-mute {
  color: #000000a6;
}

.work-bottom-item {
  border-top: 1px solid var(--border);
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
}

.work-bottom-item.bottom {
  border-bottom: 1px solid var(--border);
}

.work-left-content {
  flex-flow: column;
  justify-content: space-between;
  max-height: 100vh;
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  position: sticky;
  top: 0;
}

.work-content-grid {
  grid-column-gap: 4rem;
  grid-row-gap: 4rem;
  grid-template-rows: auto;
  grid-template-columns: 1fr .5fr;
  width: 100%;
}

.next-work-button {
  justify-content: center;
  align-items: center;
  display: flex;
}

.contact_item {
  grid-column-gap: 1.25rem;
  grid-row-gap: 1.25rem;
  text-align: left;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
}

.contact_item.left {
  justify-content: flex-start;
  align-items: center;
}

.contact_item.right {
  justify-content: flex-end;
  align-items: center;
}

.contact_icon-wrap {
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  vertical-align: top;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: 1fr;
  display: block;
}

.icon-embed-medium-2 {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
}

.contact-link {
  color: #0f0f0f;
  font-size: 1rem;
  line-height: 1;
  text-decoration: underline;
  transition: all .4s;
}

.contact-link:hover {
  color: var(--grey);
}

.faq-number {
  font-family: Butler, Georgia, sans-serif;
}

.link-block-wrap {
  position: relative;
}

@media screen and (min-width: 1280px) {
  .scrolling-text.alternate-text {
    bottom: -1.875rem;
  }

  .work-content-wrapper {
    bottom: 1.5rem;
    left: 1.5rem;
    right: 1.5rem;
  }

  .work-text {
    font-size: 1.25rem;
  }

  .work-content-grid {
    grid-column-gap: 8rem;
    grid-row-gap: 8rem;
  }
}

@media screen and (min-width: 1440px) {
  .fs-styleguide_heading-header {
    font-size: 10rem;
  }

  .hero-title {
    font-size: 15rem;
  }

  .hero-image-container {
    width: 25rem;
    height: 30rem;
  }

  .circle-text {
    height: 12rem;
  }

  .scrolling-text {
    font-size: 15rem;
  }

  .scrolling-text.alternate-text {
    font-size: 15.25rem;
    bottom: -2.5rem;
  }

  .number-block, .number-wrapper {
    height: 10rem;
    min-height: 10rem;
  }

  .number {
    height: 10rem;
    min-height: 10rem;
    font-size: 10rem;
  }

  .work-content-wrapper {
    bottom: 2rem;
    left: 2rem;
    right: 2rem;
  }

  .service-title {
    font-size: 4.5rem;
  }

  .service-description {
    font-size: 1.375rem;
  }

  .service-image-wrap {
    width: 16rem;
    height: 16rem;
  }

  .service-title-wrap {
    height: 5.5rem;
  }
}

@media screen and (min-width: 1920px) {
  .number-block, .number-wrapper {
    height: 10rem;
    min-height: 10rem;
  }

  .number {
    height: 10rem;
    min-height: 10rem;
    font-size: 10rem;
  }

  .work-text {
    font-size: 1.5rem;
  }

  .work-content-grid {
    grid-column-gap: 10rem;
    grid-row-gap: 10rem;
  }
}

@media screen and (max-width: 991px) {
  .heading-style-h2 {
    font-size: 8rem;
  }

  .padding-section-large {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }

  .spacer-xxhuge {
    padding-top: 8rem;
  }

  .spacer-xhuge {
    padding-top: 6rem;
  }

  .margin-horizontal {
    margin-top: 0;
    margin-bottom: 0;
  }

  .padding-bottom {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
  }

  .fs-styleguide_heading-header {
    font-size: 4rem;
  }

  .fs-styleguide_section {
    grid-column-gap: 2.5rem;
    grid-template-columns: 1fr;
  }

  .margin-top {
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
  }

  .padding-vertical {
    padding-left: 0;
    padding-right: 0;
  }

  .padding-horizontal {
    padding-top: 0;
    padding-bottom: 0;
  }

  .spacer-medium {
    padding-top: 1.5rem;
  }

  .spacer-xxlarge {
    padding-top: 4rem;
  }

  .spacer-huge {
    padding-top: 5rem;
  }

  .margin-xxlarge {
    margin: 4rem;
  }

  .heading-style-h1 {
    font-size: 10rem;
  }

  .padding-xxhuge {
    padding: 8rem;
  }

  .padding-large {
    padding: 2.5rem;
  }

  .heading-style-h6 {
    font-size: 1.5rem;
  }

  .margin-xxhuge {
    margin: 8rem;
  }

  .fs-styleguide_2-col {
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
    grid-template-columns: 1fr;
  }

  .heading-style-h4 {
    font-size: 3rem;
  }

  .margin-large {
    margin: 2.5rem;
  }

  .heading-style-h3 {
    font-size: 6rem;
  }

  .fs-styleguide_heading-medium {
    font-size: 3rem;
  }

  .margin-xlarge {
    margin: 3rem;
  }

  .margin-medium {
    margin: 1.5rem;
  }

  .padding-left {
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
  }

  .nav_button {
    color: #fff;
  }

  .padding-medium {
    padding: 1.5rem;
  }

  .padding-xxlarge {
    padding: 4rem;
  }

  .margin-vertical {
    margin-left: 0;
    margin-right: 0;
  }

  .fs-styleguide_4-col {
    grid-template-columns: 1fr;
  }

  .heading-style-h5 {
    font-size: 2rem;
  }

  .padding-top {
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }

  .fs-styleguide_3-col {
    grid-template-columns: 1fr;
  }

  .margin-huge {
    margin: 5rem;
  }

  .margin-xhuge {
    margin: 6rem;
  }

  .padding-huge {
    padding: 5rem;
  }

  .padding-section-medium {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .margin-right {
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 0;
  }

  .hide-tablet {
    display: none;
  }

  .max-width-full-tablet {
    width: 100%;
    max-width: none;
  }

  .padding-xlarge {
    padding: 3rem;
  }

  .margin-bottom {
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
  }

  .margin-left {
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 0;
  }

  .spacer-large {
    padding-top: 2.5rem;
  }

  .fs-styleguide_1-col {
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
  }

  .padding-right {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
  }

  .hero-grid {
    height: 60rem;
  }

  .hero-content {
    position: relative;
    top: -3rem;
  }

  .hero-title {
    font-size: 18vw;
  }

  .hero-image-container {
    width: 16rem;
    height: 20rem;
  }

  .copyright-symbol {
    font-size: 2rem;
    top: -.25rem;
    right: -1.5rem;
  }

  .menu-icon_line-top {
    background-color: #fff;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 2px;
    margin-bottom: 6px;
    padding-bottom: 0;
    padding-right: 0;
    display: flex;
    position: static;
  }

  .menu-button {
    background-color: #0f0f0f;
    border-radius: 100%;
    padding: 0;
  }

  .menu-button.w--open {
    background-color: #0f0f0f;
  }

  .nav-link {
    height: 4rem;
  }

  .menu-icon-block {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    display: flex;
  }

  .navigation-container {
    grid-column-gap: 2.5rem;
    grid-row-gap: 2.5rem;
    background-color: #dadada;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100vh;
    padding-top: 14rem;
  }

  .button-animation, .hi-wrapper {
    display: none;
  }

  .menu-icon-wrap {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: flex;
    position: relative;
  }

  .navigation {
    background-color: #0000;
    width: 100%;
    height: 100vh;
    position: fixed;
    inset: 0%;
  }

  .button-arrow {
    position: relative;
  }

  .button-arrow._02 {
    z-index: 10;
  }

  .button-icon-block {
    display: none;
  }

  .nav-button-wrap {
    display: block;
  }

  .nav-grid {
    grid-template-columns: 1fr 1fr;
  }

  .menu-icon_line-bottom {
    background-color: #fff;
    width: 22px;
    height: 2px;
    padding-bottom: 0;
    padding-right: 0;
  }

  .nav-text {
    font-size: 4rem;
  }

  .circle-text {
    height: 8rem;
  }

  .scrolling-text-block, .scrolling-text-item {
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
  }

  .scrolling-text {
    font-size: 8rem;
  }

  .scrolling-text.alternate-text {
    bottom: -1.25rem;
  }

  .about-grid {
    grid-template-columns: .5fr 1fr;
  }

  .number-grid {
    grid-template-columns: 1fr;
  }

  .work-grid {
    grid-column-gap: 4rem;
    grid-row-gap: 4rem;
    grid-template-columns: 1fr;
  }

  .work-link {
    height: auto;
  }

  .cursor {
    background-color: #ffffff1a;
    width: 3rem;
    height: 3rem;
    display: none;
    bottom: 20%;
  }

  .work-component {
    grid-column-gap: 4rem;
    grid-row-gap: 4rem;
  }

  .work-wrapper, .work-wrapper._02 {
    position: static;
  }

  .service-text-wrap {
    padding-top: 0;
  }

  .service-top-grid {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }

  .service-top-grid.last {
    padding-bottom: 0;
  }

  .service-subtitle {
    margin-top: 20px;
  }

  .service-content-block {
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }

  .service-image-block {
    display: none;
  }

  .service-number {
    font-size: 1.125rem;
  }

  .slide-opacity {
    width: 3rem;
  }

  .testimonial-content {
    width: 100%;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .testimonial-mask, .testimonial-slide {
    width: 100%;
  }

  .right-arrow {
    right: 15rem;
  }

  .testimonial-text {
    font-size: 2rem;
  }

  .testimonial-slider-wrapper {
    width: 100%;
  }

  .left-arrow {
    left: 15rem;
  }

  .cta-grid {
    grid-column-gap: 2.5rem;
    grid-row-gap: 2.5rem;
    grid-template-rows: auto auto auto;
  }

  .footer-top-content {
    grid-column-gap: 3rem;
    grid-row-gap: 3rem;
  }

  .nav-button-wrapper {
    display: none;
  }

  .work-content-item, .work-bottom-content {
    width: 100%;
  }

  .work-left-content {
    grid-column-gap: 4rem;
    grid-row-gap: 4rem;
    width: 100%;
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 1rem;
    position: static;
  }
}

@media screen and (max-width: 767px) {
  .heading-style-h2 {
    font-size: 6rem;
  }

  .fs-styleguide_section-header {
    font-size: .875rem;
  }

  .padding-section-large {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }

  .spacer-xxhuge {
    padding-top: 4.5rem;
  }

  .spacer-xhuge {
    padding-top: 4rem;
  }

  .margin-horizontal {
    margin-top: 0;
    margin-bottom: 0;
  }

  .padding-bottom {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
  }

  .margin-top {
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
  }

  .padding-vertical {
    padding-left: 0;
    padding-right: 0;
  }

  .padding-horizontal {
    padding-top: 0;
    padding-bottom: 0;
  }

  .spacer-medium {
    padding-top: 1.25rem;
  }

  .spacer-xxlarge {
    padding-top: 3rem;
  }

  .spacer-huge {
    padding-top: 3.5rem;
  }

  .margin-xxlarge {
    margin: 3rem;
  }

  .padding-xhuge {
    padding: 6rem;
  }

  .heading-style-h1 {
    font-size: 8rem;
  }

  .padding-xxhuge {
    padding: 4.5rem;
  }

  .padding-large {
    padding: 1.5rem;
  }

  .max-width-full-mobile-landscape {
    width: 100%;
    max-width: none;
  }

  .padding-section-small {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .hide-mobile-landscape {
    display: none;
  }

  .heading-style-h6 {
    font-size: 1.25rem;
  }

  .margin-xxhuge {
    margin: 4.5rem;
  }

  .heading-style-h4 {
    font-size: 2.5rem;
  }

  .margin-large {
    margin: 1.5rem;
  }

  .heading-style-h3 {
    font-size: 4rem;
  }

  .fs-styleguide_heading-medium {
    font-size: 2rem;
  }

  .margin-xlarge {
    margin: 2rem;
  }

  .margin-medium {
    margin: 1.25rem;
  }

  .padding-left {
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
  }

  .padding-medium {
    padding: 1.25rem;
  }

  .padding-xxlarge {
    padding: 3rem;
  }

  .text-size-large {
    font-size: 1.25rem;
  }

  .margin-vertical {
    margin-left: 0;
    margin-right: 0;
  }

  .heading-style-h5 {
    font-size: 2rem;
  }

  .padding-top {
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }

  .text-style-nowrap {
    white-space: normal;
  }

  .margin-huge {
    margin: 3.5rem;
  }

  .margin-xhuge {
    margin: 4rem;
  }

  .padding-huge {
    padding: 3.5rem;
  }

  .padding-global {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  .padding-section-medium {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  .margin-right {
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 0;
  }

  .padding-xlarge {
    padding: 2rem;
  }

  .margin-bottom {
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
  }

  .margin-left {
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 0;
  }

  .spacer-large {
    padding-top: 1.5rem;
  }

  .padding-right {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
  }

  .faq_icon-wrappper {
    width: 1.75rem;
  }

  .faq_answer {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  .faq_question {
    padding: 1rem 1.25rem;
  }

  .hero-title {
    font-size: 17vw;
  }

  .hero-image-container {
    width: 12rem;
    height: 15rem;
  }

  .copyright-symbol {
    font-size: 1.5rem;
    right: -1.25rem;
  }

  .nav-link {
    height: 3.5rem;
  }

  .navigation-container {
    grid-column-gap: 2.25rem;
    grid-row-gap: 2.25rem;
    padding-top: 12rem;
  }

  .nav-text {
    font-size: 3.5rem;
  }

  .circle-text {
    height: 7rem;
  }

  .scroll-down-shape {
    width: 26px;
    height: 40px;
  }

  .about-section {
    padding-top: 6rem;
  }

  .scrolling-text {
    font-size: 6rem;
  }

  .scrolling-text.alternate-text {
    bottom: -1.125rem;
  }

  .about-grid {
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
  }

  .about-content {
    max-width: none;
  }

  .number-block, .number-wrapper {
    height: 6rem;
    min-height: 6rem;
  }

  .number {
    height: 6rem;
    min-height: 6rem;
    font-size: 6rem;
  }

  .cursor-wrapper {
    border-radius: 10px;
  }

  .service-title {
    font-size: 2.25rem;
  }

  .service-top-grid {
    grid-template-columns: 2rem 1fr auto;
  }

  .service-subtitle {
    margin-top: 10px;
  }

  .service-content-block {
    justify-content: flex-start;
    align-items: center;
  }

  .service-number {
    font-size: 1rem;
    top: 0;
  }

  .service-title-wrap {
    height: 2.75rem;
  }

  .slide-opacity {
    width: 2rem;
  }

  .testimonial-wrapper {
    padding-bottom: 3.5rem;
  }

  .right-arrow {
    right: 0;
  }

  .testimonial-text {
    font-size: 1.875rem;
  }

  .left-arrow {
    left: 0;
  }

  .cta-section {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }

  .cta-image {
    width: auto;
  }

  .footer-padding {
    padding-top: 6rem;
  }

  .footer-bottom-wrapper {
    grid-column-gap: 2.5rem;
    grid-row-gap: 2.5rem;
    flex-flow: column;
    grid-auto-flow: row;
    justify-content: center;
    place-items: center;
    padding-bottom: 1rem;
  }

  .footer_credit-text {
    margin-top: 1rem;
  }

  .back-to-top-link {
    width: 2.25rem;
    height: 2.25rem;
  }

  .back-to-top-wrap {
    grid-column-gap: .75rem;
    grid-row-gap: .75rem;
  }

  .footer-top-content {
    margin-bottom: 6rem;
  }
}

@media screen and (max-width: 479px) {
  .heading-style-h2 {
    font-size: 16vw;
  }

  .margin-horizontal {
    margin-top: 0;
    margin-bottom: 0;
  }

  .padding-bottom {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
  }

  .margin-top {
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
  }

  .padding-vertical {
    padding-left: 0;
    padding-right: 0;
  }

  .padding-horizontal {
    padding-top: 0;
    padding-bottom: 0;
  }

  .heading-style-h1 {
    font-size: 18vw;
  }

  .heading-style-h6 {
    font-size: 1rem;
  }

  .spacer-xlarge {
    padding-top: 3.5rem;
  }

  .heading-style-h4 {
    font-size: 2rem;
  }

  .max-width-full-mobile-portrait {
    width: 100%;
    max-width: none;
  }

  .heading-style-h3 {
    font-size: 3rem;
  }

  .padding-left {
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
  }

  .margin-vertical {
    margin-left: 0;
    margin-right: 0;
  }

  .heading-style-h5 {
    font-size: 1.5rem;
  }

  .padding-top {
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }

  .margin-right {
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 0;
  }

  .hide-mobile-portrait {
    display: none;
  }

  .margin-bottom {
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
  }

  .margin-left {
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 0;
  }

  .fs-styleguide_row {
    flex-wrap: wrap;
  }

  .padding-right {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
  }

  .utility-content {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .contact_form {
    grid-row-gap: 1.5rem;
  }

  .contact_form-block {
    border-radius: 1.5rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  .hero-grid {
    height: 46rem;
  }

  .hero-content {
    grid-column-gap: .5rem;
    grid-row-gap: .5rem;
  }

  .hero-image-container {
    width: 32vw;
    height: 40vw;
    margin-top: -.5rem;
  }

  .copyright-symbol {
    font-size: 1rem;
    right: -.875rem;
  }

  .nav-link {
    height: 3rem;
  }

  .logo {
    font-size: 1.5rem;
    line-height: 1.2;
  }

  .logo-link {
    height: 1.75rem;
  }

  .nav-text {
    font-size: 3rem;
  }

  .header-inner-grid {
    grid-column-gap: 1.5rem;
    grid-row-gap: 1.5rem;
  }

  .about-section {
    padding-top: 6rem;
  }

  .scrolling-text-block, .scrolling-text-item {
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }

  .scrolling-text {
    font-size: 4rem;
  }

  .scrolling-text.alternate-text {
    bottom: -.65rem;
  }

  .about-grid {
    grid-column-gap: 1.5rem;
    grid-row-gap: 1.5rem;
  }

  .number-container {
    width: auto;
  }

  .title-overflow {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .work-top-content {
    grid-column-gap: 4rem;
    grid-row-gap: 4rem;
  }

  .work-number {
    width: 1.875rem;
    height: 1.875rem;
    font-size: 12px;
  }

  .work-grid {
    grid-column-gap: 3rem;
    grid-row-gap: 3rem;
  }

  .cursor {
    width: 2.5rem;
    height: 2.5rem;
    bottom: 10%;
  }

  .work-content-wrapper {
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    flex-flow: column;
    justify-content: space-between;
    align-items: flex-start;
    inset: 10px 1.125rem 1.125rem;
  }

  .work-text {
    font-size: 1rem;
  }

  .work-component {
    grid-column-gap: 3rem;
    grid-row-gap: 3rem;
  }

  .work-wrapper._01 {
    padding-bottom: 0;
  }

  .service-arrow-block {
    width: 1.75rem;
    height: 1.75rem;
  }

  .service-plus-icon {
    width: .875rem;
  }

  .service-title {
    white-space: normal;
    font-size: 1.675rem;
  }

  .service-title.hover {
    display: none;
  }

  .service-text-wrap {
    padding-top: 0;
  }

  .service-top-grid {
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    grid-template-columns: 1fr auto;
    grid-auto-columns: auto;
  }

  .service-description {
    font-size: 1rem;
  }

  .service-content-block {
    grid-column-gap: .5rem;
    grid-row-gap: .5rem;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .service-number {
    font-size: .75rem;
    top: 10px;
  }

  .service-title-wrap {
    height: auto;
  }

  .slide-opacity {
    width: 1.5rem;
  }

  .client-picture {
    width: 3.25rem;
    height: 3.25rem;
  }

  .testimonial-wrapper {
    padding-bottom: 3rem;
    padding-left: 0;
  }

  .footer-bottom-wrapper {
    justify-content: center;
    align-items: center;
  }

  .footer-link-block {
    flex-flow: column;
  }

  .back-to-top-arrow {
    width: .875rem;
    height: .875rem;
  }

  .back-to-top-link {
    width: 1.75rem;
    height: 1.75rem;
  }

  .footer-top-content {
    grid-column-gap: 1rem;
    grid-row-gap: 3rem;
  }

  .back-arrow-wrap {
    width: .875rem;
    height: .875rem;
  }

  .form {
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    flex-flow: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .form-input {
    background-position: 8%;
  }

  .newsletter-button {
    width: 100%;
    position: static;
  }

  .work-content-item {
    grid-column-gap: 1.25rem;
    grid-row-gap: 1.25rem;
    flex-flow: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
}

#w-node-_63acae3c-38bd-89d0-94b4-d30aff6df8c9-7a800465 {
  grid-area: 1 / 1 / 9 / 9;
  align-self: center;
}

#w-node-d5e70905-1bcc-d4a4-9d9b-08e5356d5da6-7a800465 {
  grid-area: 8 / 1 / 9 / 9;
  align-self: center;
}

#w-node-e1ca7f9c-1a9a-87a7-6a3d-d9acd56bcb41-7a800465 {
  grid-area: 1 / 2 / 2 / 3;
  place-self: end center;
}

#w-node-_85e625a6-f240-5071-c0d5-5a24c5e20980-7a800465 {
  grid-area: 1 / 1 / 2 / 2;
}

#w-node-_9c2b6fc6-02d6-6067-7fb5-0ec4bec01d7d-7a800465 {
  grid-area: 1 / 3 / 2 / 4;
  place-self: end;
}

#w-node-b09d78c8-9e26-38f0-9010-f2ee62e3a124-7a800465 {
  place-self: start;
}

#w-node-_27bb3e70-8fbc-42ba-55fc-a3fd11b58724-7a800465 {
  justify-self: start;
}

#w-node-e3bf7f6c-7da8-b6c5-4a57-1819e7f057e2-7a800465 {
  grid-area: span 1 / span 1 / span 1 / span 1;
  justify-self: start;
}

#w-node-_1d4f9d20-380c-82eb-58ff-94c62b6eb093-7a800465 {
  place-self: center end;
}

#w-node-_1a52aaeb-bd08-e9bb-3acd-2434bfeaa4e4-7a800465 {
  grid-area: span 1 / span 1 / span 1 / span 1;
  justify-self: start;
}

#w-node-ed29aff0-1ea4-07d9-ff5e-5cd75da4d672-7a800465 {
  place-self: center end;
}

#w-node-f1a33154-001e-b8e2-9115-b553a188bbbf-7a800465 {
  grid-area: span 1 / span 1 / span 1 / span 1;
  justify-self: start;
}

#w-node-_9631e3ea-c05a-ca23-8b6f-67584ae4e2d0-7a800465 {
  place-self: center end;
}

#w-node-_23fcf86c-0f3f-e33b-4ba2-f49e72986cf8-7a800465 {
  grid-area: 2 / 1 / 3 / 2;
  place-self: end start;
}

#w-node-cef2ddfb-1c02-1636-5d64-5b9795ae1fae-7a800465 {
  grid-area: 1 / 1 / 3 / 4;
}

#w-node-_88013df8-e791-57c9-2eeb-33375e76a52b-7a800465 {
  grid-area: 2 / 3 / 3 / 4;
  place-self: end;
}

#w-node-d47673fa-c4bb-58b8-7542-c16ec338e45a-7a800465 {
  grid-area: 1 / 1 / 2 / 2;
  place-self: center start;
}

#w-node-d47673fa-c4bb-58b8-7542-c16ec338e45d-7a800465 {
  grid-area: span 1 / span 1 / span 1 / span 1;
}

#w-node-d47673fa-c4bb-58b8-7542-c16ec338e462-7a800465 {
  grid-area: 1 / 2 / 2 / 3;
  place-self: center end;
}

#w-node-d47673fa-c4bb-58b8-7542-c16ec338e465-7a800465 {
  grid-area: 1 / 3 / 2 / 4;
  place-self: center end;
}

#w-node-d47673fa-c4bb-58b8-7542-c16ec338e46b-7a800465 {
  grid-area: 1 / 1 / 2 / 4;
}

#w-node-_22abe2ff-3da3-0818-17d8-058c4a5192c3-7a800465 {
  grid-area: 1 / 1 / 2 / 2;
  place-self: center start;
}

#w-node-_22abe2ff-3da3-0818-17d8-058c4a5192c6-7a800465 {
  grid-area: span 1 / span 1 / span 1 / span 1;
}

#w-node-_22abe2ff-3da3-0818-17d8-058c4a5192cb-7a800465 {
  grid-area: 1 / 2 / 2 / 3;
  place-self: center end;
}

#w-node-_22abe2ff-3da3-0818-17d8-058c4a5192ce-7a800465 {
  grid-area: 1 / 3 / 2 / 4;
  place-self: center end;
}

#w-node-_22abe2ff-3da3-0818-17d8-058c4a5192d2-7a800465 {
  grid-area: 1 / 1 / 2 / 4;
}

#w-node-_93ddc628-a16c-1443-0d93-4dd970636267-7a800465 {
  grid-area: 1 / 1 / 2 / 2;
  place-self: center start;
}

#w-node-_93ddc628-a16c-1443-0d93-4dd97063626a-7a800465 {
  grid-area: span 1 / span 1 / span 1 / span 1;
}

#w-node-_93ddc628-a16c-1443-0d93-4dd97063626f-7a800465 {
  grid-area: 1 / 2 / 2 / 3;
  place-self: center end;
}

#w-node-_93ddc628-a16c-1443-0d93-4dd970636272-7a800465 {
  grid-area: 1 / 3 / 2 / 4;
  place-self: center end;
}

#w-node-_93ddc628-a16c-1443-0d93-4dd970636276-7a800465 {
  grid-area: 1 / 1 / 2 / 4;
}

#w-node-f9757d23-e471-62ea-178b-496f0d6249ec-7a800465 {
  grid-area: 1 / 1 / 2 / 2;
  place-self: center start;
}

#w-node-f9757d23-e471-62ea-178b-496f0d6249ef-7a800465 {
  grid-area: span 1 / span 1 / span 1 / span 1;
}

#w-node-f9757d23-e471-62ea-178b-496f0d6249f4-7a800465 {
  grid-area: 1 / 2 / 2 / 3;
  place-self: center end;
}

#w-node-f9757d23-e471-62ea-178b-496f0d6249f7-7a800465 {
  grid-area: 1 / 3 / 2 / 4;
  place-self: center end;
}

#w-node-f9757d23-e471-62ea-178b-496f0d6249fb-7a800465 {
  grid-area: 1 / 1 / 2 / 4;
}

#w-node-cea4b765-5424-6d43-9894-e87eeb36482d-eb364828 {
  justify-self: start;
}

#w-node-cea4b765-5424-6d43-9894-e87eeb364843-eb364828 {
  place-self: center end;
}

#w-node-cea4b765-5424-6d43-9894-e87eeb36485a-eb364828 {
  place-self: center;
}

#w-node-d67eb5af-71ce-c994-22fc-09239c8f9c4c-9c8f9c4a {
  grid-area: 1 / 1 / 3 / 3;
}

#w-node-d67eb5af-71ce-c994-22fc-09239c8f9c6a-9c8f9c4a {
  grid-area: 2 / 1 / 3 / 3;
  align-self: end;
}

#w-node-d67eb5af-71ce-c994-22fc-09239c8f9c81-9c8f9c4a {
  grid-area: 1 / 1 / 3 / 3;
}

#w-node-_0d059ca8-5ca0-4475-4962-dfefac8e2560-ac8e2557 {
  grid-area: 1 / 1 / 2 / 3;
}

#w-node-_0d059ca8-5ca0-4475-4962-dfefac8e2561-ac8e2557 {
  grid-area: 1 / 2 / 2 / 4;
}

#w-node-_0d059ca8-5ca0-4475-4962-dfefac8e2575-ac8e2557 {
  grid-area: 1 / 1 / 2 / 3;
}

#w-node-_0d059ca8-5ca0-4475-4962-dfefac8e2576-ac8e2557 {
  grid-area: 1 / 2 / 2 / 4;
}

#w-node-e1e48b2b-414e-30de-8de6-8d658b19893c-8b198938 {
  place-self: center start;
}

#w-node-e1e48b2b-414e-30de-8de6-8d658b198941-8b198938 {
  place-self: center;
}

#w-node-e1e48b2b-414e-30de-8de6-8d658b198966-8b198938 {
  place-self: center end;
}

#w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f418-7a800467 {
  grid-area: span 1 / span 1 / span 1 / span 1;
}

#w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f437-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f43c-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f441-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f446-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f44c-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f452-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f458-7a800467 {
  justify-self: start;
}

#w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f53a-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f542-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f559-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f572-7a800467 {
  grid-area: span 1 / span 1 / span 1 / span 1;
}

#w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f575-7a800467 {
  justify-self: start;
}

#w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f577-7a800467 {
  grid-area: span 1 / span 1 / span 1 / span 1;
}

#w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f57a-7a800467 {
  justify-self: start;
}

#w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f5ca-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f5d4-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f5d5-7a800467 {
  grid-area: span 1 / span 1 / span 1 / span 1;
}

#w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f647-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f64c-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f651-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f656-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f65b-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f660-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f66a-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f66f-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f674-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f679-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f67e-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f683-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f688-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f68d-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f692-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f697-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f69c-7a800467 {
  justify-self: start;
}

#w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f6a0-7a800467 {
  grid-area: span 1 / span 1 / span 1 / span 1;
}

#w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f6a1-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f6a6-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f6ab-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f6b0-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f6c4-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f6c9-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f6ce-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f6d3-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f6d8-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f6dd-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f6e7-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f6ec-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f6f1-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f6f6-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f6fb-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f700-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f705-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f70a-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f70f-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f714-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f719-7a800467 {
  justify-self: start;
}

#w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f71d-7a800467 {
  grid-area: span 1 / span 1 / span 1 / span 1;
}

#w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f71e-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f723-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f728-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f72d-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f73e-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f743-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f748-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f74d-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f752-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f757-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f75c-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f761-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f766-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f76b-7a800467 {
  justify-self: start;
}

#w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f76f-7a800467 {
  grid-area: span 1 / span 1 / span 1 / span 1;
}

#w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f770-7a800467 {
  justify-self: start;
}

#w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f773-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f7f4-7a800467, #w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f821-7a800467 {
  grid-area: span 1 / span 1 / span 1 / span 1;
}

#w-node-_6eee23e7-6f9b-4d00-fc7d-94bd5717f85f-7a800467 {
  justify-self: start;
}

#w-node-_5f95208d-1ca5-862a-c511-847a0b1fcca5-7a80046d {
  justify-self: center;
}

#w-node-e8ea40c6-889c-8c7d-91e7-22d88ea92124-c6b3dfe5 {
  grid-area: 2 / 1 / 3 / 2;
  place-self: end start;
}

#w-node-e8ea40c6-889c-8c7d-91e7-22d88ea92126-c6b3dfe5 {
  grid-area: 1 / 1 / 3 / 4;
}

#w-node-e8ea40c6-889c-8c7d-91e7-22d88ea9212d-c6b3dfe5 {
  grid-area: 2 / 3 / 3 / 4;
  place-self: end;
}

@media screen and (max-width: 991px) {
  #w-node-e3bf7f6c-7da8-b6c5-4a57-1819e7f057e2-7a800465, #w-node-_1d4f9d20-380c-82eb-58ff-94c62b6eb093-7a800465, #w-node-ed29aff0-1ea4-07d9-ff5e-5cd75da4d672-7a800465, #w-node-_9631e3ea-c05a-ca23-8b6f-67584ae4e2d0-7a800465 {
    justify-self: start;
  }

  #w-node-d47673fa-c4bb-58b8-7542-c16ec338e46b-7a800465, #w-node-_22abe2ff-3da3-0818-17d8-058c4a5192d2-7a800465, #w-node-_93ddc628-a16c-1443-0d93-4dd970636276-7a800465, #w-node-f9757d23-e471-62ea-178b-496f0d6249fb-7a800465 {
    grid-column: 1 / 4;
  }

  #w-node-cea4b765-5424-6d43-9894-e87eeb364830-eb364828 {
    grid-area: 2 / 1 / 3 / 4;
  }

  #w-node-cea4b765-5424-6d43-9894-e87eeb364843-eb364828 {
    grid-area: 1 / 2 / 2 / 4;
  }

  #w-node-cea4b765-5424-6d43-9894-e87eeb36485a-eb364828 {
    grid-area: 2 / 2 / 3 / 3;
  }

  #w-node-d67eb5af-71ce-c994-22fc-09239c8f9c4c-9c8f9c4a {
    grid-row-end: 2;
  }

  #w-node-d67eb5af-71ce-c994-22fc-09239c8f9c6a-9c8f9c4a {
    grid-row: 3 / 4;
    justify-self: center;
  }

  #w-node-d67eb5af-71ce-c994-22fc-09239c8f9c81-9c8f9c4a {
    justify-self: center;
  }

  #w-node-e1e48b2b-414e-30de-8de6-8d658b198977-8b198938 {
    grid-area: 1 / 2 / 2 / 3;
    place-self: center end;
  }

  #w-node-f2c006da-4ddb-e148-e6b9-8d6c250ad45f-88868710 {
    grid-area: 2 / 1 / 3 / 3;
  }

  #w-node-f2c006da-4ddb-e148-e6b9-8d6c250ad443-88868710 {
    grid-area: 1 / 1 / 2 / 3;
  }
}

@media screen and (max-width: 767px) {
  #w-node-_85e625a6-f240-5071-c0d5-5a24c5e20980-7a800465 {
    grid-area: 2 / 1 / 3 / 3;
    justify-self: start;
  }

  #w-node-_9c2b6fc6-02d6-6067-7fb5-0ec4bec01d7d-7a800465 {
    grid-row: 2 / 3;
  }

  #w-node-b09d78c8-9e26-38f0-9010-f2ee62e3a124-7a800465 {
    grid-area: 1 / 1 / 2 / 3;
  }

  #w-node-_27bb3e70-8fbc-42ba-55fc-a3fd11b58724-7a800465 {
    grid-area: 2 / 1 / 3 / 3;
  }

  #w-node-d47673fa-c4bb-58b8-7542-c16ec338e46b-7a800465, #w-node-_22abe2ff-3da3-0818-17d8-058c4a5192d2-7a800465, #w-node-_93ddc628-a16c-1443-0d93-4dd970636276-7a800465, #w-node-f9757d23-e471-62ea-178b-496f0d6249fb-7a800465 {
    grid-column-start: 1;
  }

  #w-node-cea4b765-5424-6d43-9894-e87eeb364861-eb364828 {
    grid-area: 4 / 1 / 5 / 2;
  }

  #w-node-d67eb5af-71ce-c994-22fc-09239c8f9c6a-9c8f9c4a {
    justify-self: start;
  }
}

@media screen and (max-width: 479px) {
  #w-node-e1ca7f9c-1a9a-87a7-6a3d-d9acd56bcb41-7a800465 {
    grid-column: 1 / 4;
    align-self: center;
  }

  #w-node-_9c2b6fc6-02d6-6067-7fb5-0ec4bec01d7d-7a800465 {
    grid-column-start: 2;
  }

  #w-node-d47673fa-c4bb-58b8-7542-c16ec338e45d-7a800465 {
    grid-column: span 2 / span 2;
  }

  #w-node-d47673fa-c4bb-58b8-7542-c16ec338e465-7a800465 {
    justify-self: end;
  }

  #w-node-_22abe2ff-3da3-0818-17d8-058c4a5192c6-7a800465 {
    grid-column: span 2 / span 2;
  }

  #w-node-_22abe2ff-3da3-0818-17d8-058c4a5192ce-7a800465 {
    justify-self: end;
  }

  #w-node-_93ddc628-a16c-1443-0d93-4dd97063626a-7a800465 {
    grid-column: span 2 / span 2;
  }

  #w-node-_93ddc628-a16c-1443-0d93-4dd970636272-7a800465 {
    justify-self: end;
  }

  #w-node-f9757d23-e471-62ea-178b-496f0d6249ef-7a800465 {
    grid-column: span 2 / span 2;
  }

  #w-node-f9757d23-e471-62ea-178b-496f0d6249f7-7a800465 {
    justify-self: end;
  }

  #w-node-cea4b765-5424-6d43-9894-e87eeb36482d-eb364828 {
    grid-area: 1 / 1 / 2 / 3;
  }

  #w-node-cea4b765-5424-6d43-9894-e87eeb364843-eb364828 {
    grid-column-start: 1;
  }

  #w-node-cea4b765-5424-6d43-9894-e87eeb36485a-eb364828 {
    grid-area: 3 / 1 / 4 / 4;
  }
}

