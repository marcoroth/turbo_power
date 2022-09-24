<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.png">
    <img src="assets/hero.png" height="340px">
  </picture>
</p>

<h1 align="center">TurboPower</h1>

<p align="center">
  <a href="https://github.com/marcoroth/turbo_power">
    <img src="https://github.com/marcoroth/turbo_power/actions/workflows/tests.yml/badge.svg">
  </a>
  <a href="https://www.npmjs.com/package/turbo_power">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/turbo_power?logo=npm&color=38C160">
  </a>

  <a href="https://www.npmjs.com/package/turbo_power">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/turbo_power?logo=npm&color=38C160">
  </a>
  <a href="https://bundlephobia.com/package/turbo_power">
    <img alt="NPM Bundle Size" src="https://img.shields.io/bundlephobia/minzip/turbo_power?label=bundle%20size&logo=npm">
  </a>
</p>

## Getting Started

`turbo_power` is a power-pack for Turbo Streams. It provides Turbo Streams with a bunch of new actions and additionally adds the `morph` action from [`turbo-morph`](https://github.com/marcoroth/turbo-morph) and the `invoke` action from [`turbo_ready`](https://github.com/hopsoft/turbo_ready).

**Note:** Requires Turbo **7.2+**

## Getting Started

```bash
yarn add turbo_power
```

```diff
// application.js
import * as Turbo from '@hotwired/turbo'

+import TurboPower from 'turbo_power'
+TurboPower.initialize(Turbo.StreamActions)
```

## Getting Started with Rails

Checkout the instructions in the [`turbo_power-rails`](https://github.com/marcoroth/turbo_power-rails) repo.

## Custom Actions

### Actions from `turbo_ready`

* [`turbo_stream.invoke(method, *args, selector: nil, camelize: true, id: nil)`](https://github.com/hopsoft/turbo_ready)

### Actions from `turbo-morph`

* [`turbo_stream.morph(target, html = nil, **attributes, &block)`](https://github.com/marcoroth/turbo-morph)

### DOM Actions

* `turbo_stream.graft(target, parent, **attributes)`
* `turbo_stream.inner_html(target, html = nil, **attributes, &block)`
* `turbo_stream.insert_adjacent_html(target, html = nil, position: 'beforeend', **attributes, &block)`
* `turbo_stream.insert_adjacent_text(target, text, position: 'beforebegin', **attributes)`
* `turbo_stream.morph(target, html = nil, **attribtues, &block)`
* `turbo_stream.outer_html(target, html = nil, **attributes, &block)`
* `turbo_stream.text_content(target, text, **attributes)`
* `turbo_stream.set_meta(name, content)`


### Attribute Actions

* `turbo_stream.add_css_class(target, classes, **attributes)`
* `turbo_stream.remove_attribute(target, attribute, **attributes)`
* `turbo_stream.remove_css_class(target, classes, **attributes)`
* `turbo_stream.set_attribute(target, attribute, value, **attributes)`
* `turbo_stream.set_dataset_attribute(target, attribute, value, **attributes)`
* `turbo_stream.set_property(target, property, value, **attributes)`
* `turbo_stream.set_style(target, name, value, **attributes)`
* `turbo_stream.set_styles(target, styles, **attributes)`
* `turbo_stream.set_value(target, value, **attributes)`


### Event Actions

* `turbo_stream.dispatch_event(target, name, detail: {}, **attributes)`


### Storage Actions

* `turbo_stream.clear_storage(type, **attributes)`
* `turbo_stream.clear_local_storage(**attributes)`
* `turbo_stream.clear_session_storage(**attributes)`
* `turbo_stream.remove_storage_item(key, type, **attributes)`
* `turbo_stream.remove_local_storage_item(key, **attributes)`
* `turbo_stream.remove_session_storage_item(key, **attributes)`
* `turbo_stream.set_storage_item(key, value, type, **attributes)`
* `turbo_stream.set_local_storage_item(key, value, **attributes)`
* `turbo_stream.set_session_storage_item(key, value, **attributes)`


### Browser Actions

* `turbo_stream.redirect_to(url, action_name = nil, **attributes)`
* `turbo_stream.reload(**attributes)`
* `turbo_stream.scroll_into_view(target, inline = "nearest")`
* `turbo_stream.set_cookie(cookie, **attributes)`
* `turbo_stream.set_cookie_item(key, value, **attributes)`
* `turbo_stream.set_focus(target, **attributes)`
* `turbo_stream.set_title(title, **attributes)`


### Browser History Actions

* `turbo_stream.history_go(delta, **attributes)`
* `turbo_stream.push_state(url, title = nil, state = nil, **attributes)`
* `turbo_stream.replace_state(url, title = nil, state = nil, **attributes)`


### Debug Actions

* `turbo_stream.console_log(message, level = :log, **attributes)`
* `turbo_stream.console_table(data, columns, **attributes)`

### Notification Actions

* `turbo_stream.notification(title, options, **attributes)`


### Turbo Frame Actions

* `turbo_stream.reload_turbo_frame(frame_id, **attributes)`
* `turbo_stream.set_turbo_frame_src(frame_id, src, **attributes)`

## Previous Art

TurboPower is heavily inspired by [CableReady](https://github.com/stimulusreflex/cable_ready) and it's operations. This library aims to bring the same level of operation-diversity to Turbo Streams.

## Acknowledgments

`turbo_power` is [MIT-licensed](LICENSE) open-source software from [Marco Roth](https://github.com/marcoroth).

`turbo_ready` is [MIT-licensed](https://github.com/hopsoft/turbo_ready/blob/main/MIT-LICENSE) open-source software from [Nate Hopkins](https://github.com/hopsoft).

`turbo-morph` is [MIT-licensed](https://github.com/marcoroth/turbo-morph/blob/master/LICENSE) open-source software from [Marco Roth](https://github.com/marcoroth).

Turbo is [MIT-licensed](https://github.com/hotwired/turbo/blob/main/MIT-LICENSE) open-source software from [Basecamp](https://basecamp.com/).
