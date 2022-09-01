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
  searchEngine: 1,
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
