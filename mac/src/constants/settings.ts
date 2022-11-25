import { ISettings } from '~/interfaces';
import { remote, app } from 'electron';

export const DEFAULT_SEARCH_ENGINES = [
  {
    name: 'DuckDuckGo',
    url: 'https://duckduckgo.com/?q=%s',
    keywordsUrl: '',
    keyword: 'duckduckgo.com',
    icon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACT1BMVEUAAAD/gFXfWjbeWTPfWDTeWDTeWDPfYDXfWDPeWTT/bUngWDPfWTPfWDPjWTfeWTTjWzPeWTTeWDPkelzrnojvr53ywLLibEvxuKj77en66OPyvq/urJrrm4XgYj/ws6P88/HvsqHjdFbfYT/jclP65uHywrThaUjmgmf88e/rmoTlfmLxuKnxvK7tpZLibk/mhWruqZf88e7////3187haEfpk3v43NX88u/rmoPgZELywbPgY0H1zsP88/DmgWX43NT87+zgZ0XvsaDoj3bf5e7Gz+D2+PvW3em2wtjks6nwt6fN1eT9+ffgZUP0yr/5+vzv8vehsM3H0OHrnonywLNkfaxRbqL3+ftVcaSKncDxuqvurZuntdB+k7r+/v/eWjPmdinumx3wnxvlcyrojXT//vb/99P/87z2v1r0rRb8ywz90gr6xQ7ha0v//vj+5nP90w/90Qr1shXpgyXeWzP+42X90AvxphnzqRjypxnsjSLhZi/+42T3uRLuq5n//O/2uyL0rxbriSLsjiHwoRr7yg3iaC7niW/icFHiZy7zrBf5whD3uhLumR3jdlf66uXqlH3zxrrYXDTdWTPso4/d8da136bq9uX99fPeXDjcWTSkhzxquEa4dznlf2PB5LRlvEZmvUeHyXNuvlVouUh7qkKohTzmg2ffXjv+/fzG5rpas0ZkvEajiDz54NrQ68dftU1atEZit06npl+ApUKrgjvzx7vp9uV3xFy24Kj4/Pb55N/eWTXdeVfus6H77+v44Nr44Nn54tz76uYtKC1GAAAAEnRSTlMABkeVv9nzGJbxB4L0xy7jLfK6UobZAAACRklEQVQ4y4VT9XsTQRC9aKMEJsnFrb0kTbDSoUWKF5eixa24HO4Eihco7i6Lu7u35Q/jbu/2uLQfH/PTzs7bmdk3bzhOM4PRZLZYrRazyWjgOlqJzQ5en5/n/T4v2G0l7cIOpysQDIUj0VgsGgmHggGX01H03B1PJFOloFppKpkoc+uSdPII6UwWdJbNpAVPZ+29pzyXh67duvfo+ReSz5V71BwOt5CrAOhViYi9BQ1RkRPcSh/OeDovXVRVVfdB7NuvP0PE0nEnLeBK1Mj+gIFIbdBghsgkXHIRWyBJ+xuCqg0dxjpNBmwSf/ZgrewNxxEjR8nx0WPGshSpoN3AGSFE/z8Ox7MUE+oYHyEwciZvmDoTESdNpvEpU6tZirDXxJmnRei5HnH6jJkyYNbsOQwQ8Zk5iz9Kz3MR582nGRZgPSxsWLR4CUDUb+GsfIwClrIOli1fsXLValFc0yBRwVs1wFolvG79BlGyjZs2b5G54rtoJaCSAraK27bv2FnYpdzJJcw+pUlQiNwtNuqGKjfJvgl7KGDvPnF/4cDBQ41Nh9VvMqLgiNLE0ebCseNNJ042M6IkqlMUUKcATukqUKq1YcFpCjijkxUdljzuDPXPUoA8+nPn9eNmgoELePHSZbxy9dr1Gzep6NJlTr3k4BbeJnfu3rv/gJCHRZKTRPtIEi08fvKUkGeEPCfkRZFoFdnXZOHlK0Jev3n77j35UCx7dXFqP376/OUr4rfvP362Wxy2er9aWtvaWlt+d1y9/y/vv9f/DzYRmYvARwKBAAAAAElFTkSuQmCC',
  },
  {
    name: 'Ecosia',
    url: 'https://www.ecosia.org/search?q=%s',
    keywordsUrl: '',
    keyword: 'ecosia.org',
    icon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAylJREFUOI1Nk01sVFUYhp9z7r1zO1NK25ShtkxmSqE0VisWf0KbatkQ0USnEhPiwh+SGgkkLowQ6EKKWGgTNi4ICxtQMNFEMG1iMBqURKNMgtYwtKkUq20tFFoYxjudmc7ce+5xgdZ+2zfPu3m/R7Ds9P44oGOoYg9uoQ2IACaaG1jWMDJwDNNMiCODS4xYgg90gqFP4nk7/a1dyOZWCFffD527MDYMX5+CRecCwtr6X4lYgnEv6ujGLeKNwzjeON/+keTjiTBKCxrLVxBfH+Op2jD68+OIy0NTWKV14sgghu7uBJMPdHXjDrGnj/6fL1NMvc71tM25+QaigRlGnRzvX5tjau4W255/CSPtVIjZa+097U1nhD4Qh0VH03uexO2zdP+imSpGsKTHm2suEK89Q8EvI6dWEJJTmIEXWBs7idnzMixmn5Yo9yjtO/hLC1p/qCCjwqw0XJ4ovcGW8DdkvBqUH8IWPp6Oks0P8fdCAv+ZLvAKb0vcQhvNm/ny+gwNpkQIjRQeu+pPYwnNWKYJV5sAGMJDimrS6S/QjY+DKrZItFrtV0boqBxgQ/Aeed8iaqeIhS4hhKZ5ZRJLuBS1yW+ZjdhGDuVeRVeWAyIi0WitIWQoDj/4Hg+HZpnIV7MnOcBsPgZA0EzRO/4Wxye3c2pyF8l0C4YGwJdI4yZz09glLVhinptuGbZUjOVqmMnHsKXDuZmdjGZrcVSQT+ceQ5mPIu7eBpiWBEouyl+/Y1XVc7wz2o/jBZFoTOFTai6QV2Us+JqQ9JBocn6OhppnYeRHMAOJ+zPm04p3z8rTsw77hq8SswMoLVgXvIMpFFeyayiVLvOuxyt1EQ5tfgS644C5VuJrKK/az4l9vNpUz7FNDzFRcMn6HqPZKq4srEbrAr8XinSti3KorQX94UEwjU+QYvLfV34RDP8jQlWvsbufW8EKvhr/k5FUGuVrNlSUsW19HfW2RA/0IKaTCQi0ir7BZTJ1d4L291LI9PFkp2RTB6yqASnh3h0YuQTffwYloRN47BZHl8n0v87bQShwCwdRbgdaPQBCIEQKI/ATpr0XA0Tv0BLzDxefVnicNn0wAAAAAElFTkSuQmCC',
  },
  {
    name: 'Glowstery',
    url: 'https://glowstery.com/search?q=%s',
    keywordsUrl: 'https://glowstery.com/search?q=hi%s',
    keyword: 'glowstery.com',
    icon:
      'data:image/png;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iNDlweCIgaGVpZ2h0PSI1NHB4IiB2aWV3Qm94PSIwIDAgNDggNTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8dGl0bGU+R3JvdXAgMTQ8L3RpdGxlPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IHgxPSIyMy41ODExMDQzJSIgeTE9IjguMzM0NjE3NyUiIHgyPSI3Ni41MDI4OTE4JSIgeTI9Ijc0Ljk4OTM1NzMlIiBpZD0ibGluZWFyR3JhZGllbnQtMSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiM2N0E3M0EiIG9mZnNldD0iMCIvPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMDBBRUYwIiBvZmZzZXQ9IjEiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxnIGlkPSJHcm91cC0xNCIgdHJhbnNmb3JtPSJtYXRyaXgoMC45OTk5NjMsIDAsIDAsIDAuOTk5OTYzLCAwLjQyNjM0MSwgMC4zNzE3MDQpIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxwYXRoIGQ9Ik00NS44MTQyMjMzLDQ0LjA5Njk4MzEgQzQzLjU3OTY5OTMsMzkuMDMzMDg0OSA0My4xOTUxNzQzLDM0Ljc0MjYxMTYgNDMuMTM0OTA0LDMzLjA1Njc1NjMgTDQzLjEzNDkwNCwxOS4xODU3NjM4IEM0My4xMzQ5MDQsOC41ODkzODkzOSAzNC4zNzUyMDgzLC04LjE3MTI0MTQ2ZS0xNCAyMy41NzAyMzc2LC04LjE3MTI0MTQ2ZS0xNCBDMTIuNzY0MDYxNSwtOC4xNzEyNDE0NmUtMTQgNC4wMDQwNjQ0OCw4LjU4OTM4OTM5IDQuMDA0MDY0NDgsMTkuMTg1NzYzOCBMNC4wMDQwNjQ0OCwzMy4yNTcyNzM4IEMzLjkyMDI4ODY3LDM1LjA3MDY3NjUgMy40ODEyMTkwMiwzOS4yMzAyODU3IDEuMzMzNDg0MzYsNDQuMDk2OTgzMSBDLTEuNTU0MzcwNDUsNTAuNjM2NTcwMiAwLjgzNTA0ODM5NSw0OS44NTc0MTYyIDIuOTc1ODUxOTYsNDkuMzE5MTg0OCBDNS4xMTYwNTI4Miw0OC43ODMzNjU2IDkuODk1Nzk0NTYsNDYuNjgzMjA3NyAxMS4zODkyOTQzLDQ5LjI3MDYzODQgQzEyLjg4MTU4ODcsNTEuODU2NTYxNCAxNC4xMjY3NzQ2LDU0LjEwMjk2MTQgMTcuNjExMzA2MSw1Mi42MzgxMjc3IEMyMS4wOTYxMzg5LDUxLjE3NDgwMTYgMjIuNzM4MjA1MSw1MC42ODY2MjQyIDIzLjIzNTczNyw1MC42ODY2MjQyIEwyMy45MTIyNzIsNTAuNjg2NjI0MiBDMjQuNDA5NTAyNSw1MC42ODY2MjQyIDI2LjA1MjE3MTUsNTEuMTc0ODAxNiAyOS41MzY0MDE2LDUyLjYzODEyNzcgQzMzLjAyMTIzNDQsNTQuMTAyOTYxNCAzNC4yNjYxMTg5LDUxLjg1NjU2MTQgMzUuNzU5MzE3Myw0OS4yNzA2Mzg0IEMzNy4yNTE5MTMxLDQ2LjY4MzIwNzcgNDIuMDMxMzUzNSw0OC43ODMzNjU2IDQ0LjE3MjE1Nyw0OS4zMTkxODQ4IEM0Ni4zMTI2NTkyLDQ5Ljg1NzQxNjIgNDguNzAxMTc0LDUwLjYzNjU3MDIgNDUuODE0MjIzMyw0NC4wOTY5ODMxIiBpZD0iRmlsbC0zIiBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50LTEpIi8+CiAgICA8cGF0aCBkPSJNMjMuNjAwODQ1NCw4LjgzMTM4NTYgQzI4Ljg2Mjk2OTgsOC44MzEzODU2IDMzLjE3MTE0MTgsMTMuMTA4Nzg1IDMzLjE3MTE0MTgsMTguNDAxNjgyIEMzMy4xNzExNDE4LDIwLjQ5NDIyMjcgMzIuNDk0MTQzMywyMi40MzI5MDAxIDMxLjM1NTU1NSwyNC4wMDIzMDU2IEwzMS4zNTU1NTUsMjQuMDAyMzA1NiBMMzYuMDAyMjI2MiwyOC42Nzk3NDk1IEMzNi42MTc2Nzk0LDI5LjI2NDQzIDM2LjYxNzY3OTQsMzAuMjQ5MTU1MSAzNi4wMDIyMjYyLDMwLjgzMzgzNTYgQzM1LjcyNTI3MjMsMzEuMTQxNTYyMSAzNS4yOTQ0NTUxLDMxLjI5NTQyNTQgMzQuOTI1MTgzMiwzMS4yOTU0MjU0IEMzNC41NTU5MTE0LDMxLjI5NTQyNTQgMzQuMTU1ODY2OCwzMS4xNDE1NjIxIDMzLjg0ODE0MDIsMzAuODMzODM1NiBMMzMuODQ4MTQwMiwzMC44MzM4MzU2IEwyOS4yMDE0NjksMjYuMTU2MzkxNyBDMjcuNjMyMDYzNSwyNy4yOTQ5OCAyNS42OTMzODYxLDI3Ljk3MTk3ODQgMjMuNjAwODQ1NCwyNy45NzE5Nzg0IEMxOC4zMzg3MjEsMjcuOTcxOTc4NCAxNC4wMzA1NDg5LDIzLjY5NDU3OTEgMTQuMDMwNTQ4OSwxOC40MDE2ODIgQzE0LjAzMDU0ODksMTMuMTM5NTU3NiAxOC4zMzg3MjEsOC44MzEzODU2IDIzLjYwMDg0NTQsOC44MzEzODU2IFogTTIzLjU3MDA3MjcsMTEuOTM5NDI0IEMyMC4wMDA0NDQ1LDExLjkzOTQyNCAxNy4wNzcwNDIsMTQuODMyMDUzOCAxNy4wNzcwNDIsMTguNDMyNDU0NyBDMTcuMDc3MDQyLDIyLjAwMjA4MjkgMTkuOTY5NjcxOCwyNC45MjU0ODU0IDIzLjU3MDA3MjcsMjQuOTI1NDg1NCBDMjcuMTcwNDczNiwyNC45MjU0ODU0IDMwLjA5Mzg3NiwyMi4wMDIwODI5IDMwLjA5Mzg3NiwxOC40MDE2ODIgQzMwLjA5Mzg3NiwxNC44MzIwNTM4IDI3LjEzOTcwMDksMTEuOTM5NDI0IDIzLjU3MDA3MjcsMTEuOTM5NDI0IFoiIGlkPSJDb21iaW5lZC1TaGFwZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuNSIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIi8+CiAgPC9nPgo8L3N2Zz4=',
  },
];

export const DEFAULT_SETTINGS: ISettings = {
  theme: 'wexond-light',
  darkContents: false,
  shield: true,
  multrin: true,
  animations: true,
  bookmarksBar: false,
  suggestions: true,
  themeAuto: true,
  searchEngines: DEFAULT_SEARCH_ENGINES,
  searchEngine: 0,
  startupBehavior: {
    type: 'empty',
  },
  warnOnQuit: false,
  version: 2,
  downloadsDialog: false,
  downloadsPath: remote
    ? remote.app.getPath('downloads')
    : app
    ? app.getPath('downloads')
    : '',
  doNotTrack: true,
  topBarVariant: 'default',
};