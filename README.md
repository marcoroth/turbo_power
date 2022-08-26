# TurboPack

`turbo_pack` is a powerpack for Turbo Streams. It provides Turbo Streams with a bunch of new actions and additionally adds the `morph` action from [`turbo-morph`](https://github.com/marcoroth/turbo-morph) and the `invoke` action from [`turbo_ready`](https://github.com/hopsoft/turbo_ready).

**Note:** Requires Turbo **7.2+**

## Getting Started

```bash
yarn add turbo_pack
```

```diff
// application.js
import * as Turbo from '@hotwired/turbo'

+import TurboPack from 'turbo_pack'
+TurboPack.initialize(Turbo.StreamActions)
```

## Previous Art

TurboPack is heavily inspired by [CableReady](https://github.com/stimulusreflex/cable_ready) and it's operations. This library aims to bring the same level of operation-diversity to Turbo Streams.

## Acknowledgments

`turbo_pack` is [MIT-licensed](LICENSE) open-source software from [Marco Roth](https://github.com/marcoroth).

`turbo_ready` is [MIT-licensed](https://github.com/hopsoft/turbo_ready/blob/main/MIT-LICENSE) open-source software from [Nate Hopkins](https://github.com/hopsoft).

`turbo-morph` is [MIT-licensed](https://github.com/marcoroth/turbo-morph/blob/master/LICENSE) open-source software from [Marco Roth](https://github.com/marcoroth).

Turbo is [MIT-licensed](https://github.com/hotwired/turbo/blob/main/MIT-LICENSE) open-source software from [Basecamp](https://basecamp.com/).
