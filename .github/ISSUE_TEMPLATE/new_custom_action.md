---
name: New Custom Action
about: Suggest a custom action which we should consider to implement
title: 'Implement [action name] action'
labels: new custom action
---

**Action signature:**
```ruby
turbo_stream.[action_name](targets, [arguments], **attributes)
```

**Example Turbo Stream Element:**
```html
<turbo-stream action="[action_name]" targets=".items" [arguments]></turbo-stream>
```

**Action content:**
```js
target.[action_name]([arguments])
```

**Reference:**
* [add links to implementation details/docs/additional details]
