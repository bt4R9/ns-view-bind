(function(ns) {

    var viewBind = function() {};

    no.inherit(viewBind, ns.View, {
        /**
         * Переопределяем метод инициализации view, чтобы
         * подписаться на htmlinit и htmldestroy
         *
         * @private
         */
        _init: function() {
            ns.View.prototype._init.apply(this, arguments);

            this.on('ns-view-htmlinit', this.__initBindings);
            this.on('ns-view-htmldestroy', this.__destroyBindings);

            this._bindigs = {};
        },

        /**
         * Биндит модель view
         *
         * @param {HTMLElement} node Нода с class=ns-view-bind
         * @param {string} event событие на которое подписываем модель
         * @param {string} model подписываемая модель
         * @param {string} module модуль yate
         * @param {string} mode мод yate
         *
         * @private
         */
        __bind: function(node, event, model, module, mode) {
            var that = this;
            this._bindigs[event] = {
                callback: function() {
                    node.innerHTML = yr.run(module, that._getViewTree({}), mode);
                },
                model: model
            };

            this.getModel(model).on(event, this._bindigs[event].callback);
        },

        /**
         * Находит и парсит бандинги, определенные в разметки.
         *
         * @fires View.__bind
         * @private
         */
        __initBindings: function() {
            var bindings = this.node.getElementsByClassName('ns-view-bind');

            for (var i = 0, l = bindings.length; i < l; i += 1) {
                var binding = bindings[i];

                var dataBind = binding.getAttribute('data-bind').split(':');
                var dataMode = binding.getAttribute('data-mode').split(':');

                var model = dataBind[0];
                var jpath = dataBind[1];
                var module;
                var mode;

                if (dataMode.length > 1) {
                    module = dataMode[0];
                    mode = dataMode[1];
                } else {
                    module = 'main';
                    mode = dataMode[0];
                }

                var event = 'ns-model-changed.' + jpath;

                this.__bind(binding, event, model, module, mode);
            }
        },

        /**
         * Уничтожает созданные биндинги
         * @private
         */
        __destroyBindings: function() {
            for (var event in this._bindigs) {
                var bind = this._bindigs[event];
                var model = bind.model;
                var callback = bind.callback;
                this.getModel(model).off(event, callback);
            }

            this._bindigs = {};
        }
     });

     ns.ViewBind = viewBind;

})(ns);
