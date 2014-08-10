Биндинги для noscript (прототип)
================================

Перед запуском примера
----------------------
```sh
npm i
make
```

Идея
----
```js
ns.Model.define('model', {
  params: {
    id: null
  }
};

ns.Model.get('model', { id: 1 }).setData({
  property: 'a'
});

ns.View.define('view', {
  models: ['model']
}, ns.ViewBind);
```

```html
match .view ns-view-content {
  "static content"
  <div class="ns-view-bind" data-bind="model:property" data-mode="model-property">
    apply / model-property
  </div>
}

match / model-property {
  model = model('model')
  model.property
}
```

```js
ns.Model.get('model', { id: 1}).set('.property', 'b');
```
