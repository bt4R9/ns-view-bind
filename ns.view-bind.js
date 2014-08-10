(function(ns) {

    var viewBind = function() {};

    no.inherit(viewBind, ns.View, {
        _init: function() {
            ns.View.prototype._init.apply(this, arguments);

            this.on('ns-view-htmlinit', this._bind);
            this.on('ns-view-htmldestroy', this._unbind);

        },
        _bind: function() {
            var binders = this.node.querySelectorAll('.ns-view-bind');
            var that = this;
            var bindings = this.bindings = {};

            Array.prototype.slice.call(binders).forEach(function(bind) {

                var dataBind = bind.getAttribute('data-bind').split(':');
                var dataMode = bind.getAttribute('data-mode');

                var model = dataBind[0];
                var jpath = dataBind[1];

                var event = 'ns-model-changed.' + jpath;
                var callback = function() {
                    var json = {
                        models: {}
                    };
                    json.models[model] = {};
                    json.models[model][model] =  that.getModel('message').getData();
                    json.models[model].status = 'ok';

                    var html = yr.run('main', json, dataMode);
                    bind.innerHTML = html;
                };

                that.getModel(model).on(event, callback);

                bindings[event] = {
                    model: model,
                    callback: callback
                }
            });
        },
        _unbind: function() {
            var bindings = this.bindings;
            for (var event in bindings) {
                var model = bindings[event].model;
                var callback = bindings[event].callback;

                this.getModel(model).off(event, callback);
            }
        }
    });

    ns.ViewBind = viewBind;

})(ns);
