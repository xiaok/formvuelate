/**
  * formvuelate v3.8.1
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Formvuelate = {}, global.Vue));
}(this, (function (exports, vue) { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var KEY = 'fvl_';
  var IS_SCHEMA_WIZARD = "".concat(KEY, "isSchemaWizard");
  var PARENT_SCHEMA_EXISTS = "".concat(KEY, "parentSchemaExists");
  var INJECTED_SCHEMA = "".concat(KEY, "injectedSchema");
  var SCHEMA_MODEL_PATH = "".concat(KEY, "schemaModelPath");
  var FORM_MODEL = "".concat(KEY, "formModel");
  var FIND_NESTED_FORM_MODEL_PROP = "".concat(KEY, "findNestedFormModelProp");
  var UPDATE_FORM_MODEL = "".concat(KEY, "updateFormModel");
  var DELETE_FORM_MODEL_PROP = "".concat(KEY, "deleteFormModelProp");
  var LOOKUP_PARSE_SUB_SCHEMA_FORMS = "".concat(KEY, "parseSubSchemaForms");
  var INJECTED_LOCAL_COMPONENTS = "".concat(KEY, "injectedLocalComponents");

  var constants = /*#__PURE__*/Object.freeze({
    __proto__: null,
    IS_SCHEMA_WIZARD: IS_SCHEMA_WIZARD,
    PARENT_SCHEMA_EXISTS: PARENT_SCHEMA_EXISTS,
    INJECTED_SCHEMA: INJECTED_SCHEMA,
    SCHEMA_MODEL_PATH: SCHEMA_MODEL_PATH,
    FORM_MODEL: FORM_MODEL,
    FIND_NESTED_FORM_MODEL_PROP: FIND_NESTED_FORM_MODEL_PROP,
    UPDATE_FORM_MODEL: UPDATE_FORM_MODEL,
    DELETE_FORM_MODEL_PROP: DELETE_FORM_MODEL_PROP,
    LOOKUP_PARSE_SUB_SCHEMA_FORMS: LOOKUP_PARSE_SUB_SCHEMA_FORMS,
    INJECTED_LOCAL_COMPONENTS: INJECTED_LOCAL_COMPONENTS
  });

  function useUniqueID() {
    var UUID = Math.floor(Math.random() * 1000000000);
    var UUIDBindings = new Map();

    function getID(model) {
      if (UUIDBindings.has(model)) {
        return UUIDBindings.get(model);
      } else {
        UUID++;
        UUIDBindings.set(model, UUID);
        return UUID;
      }
    }

    return {
      UUID: UUID,
      UUIDBindings: UUIDBindings,
      getID: getID
    };
  }

  /**
   * Find the elements in the row that have a schema property
   * @param {Array} row
   * @returns
   */

  var findSchemaElementsInRow = function findSchemaElementsInRow(row) {
    return row.filter(function (el) {
      return el.schema;
    });
  };
  /**
   * Find the elements in the top level row of a schema
   * that are considered "schema" elements, aka. they have a schema prop
   * @param {Array} normalizedSchema
   * @returns
   */


  var findSchemaElements = function findSchemaElements(normalizedSchema) {
    var _iterator = _createForOfIteratorHelper(normalizedSchema),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var row = _step.value;
        var elements = findSchemaElementsInRow(row);
        if (elements.length) return elements;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return [];
  };
  /**
   * Traverse a schema recursively and find the schema element
   * that matches the given model
   * @param {String} model
   * @param {Array} normalizedSchema
   * @returns
   */


  var findElementInSchema = function findElementInSchema(model, normalizedSchema) {
    var schemaElements = findSchemaElements(normalizedSchema);

    var isCorrectElement = function isCorrectElement(el) {
      return (el === null || el === void 0 ? void 0 : el.model) === model;
    };

    if (!schemaElements.length) {
      return null;
    }

    var _iterator2 = _createForOfIteratorHelper(schemaElements),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var el = _step2.value;
        if (isCorrectElement(el)) return el; // Check the subschemas recursively

        var subElement = findElementInSchema(model, normalizeSchema(el.schema));
        if (isCorrectElement(subElement)) return subElement;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return null;
  };
  /**
   * Parse a user given schema into FVL internal format
   * @param {Array|Object} schema
   * @returns
   */


  var normalizeSchema = function normalizeSchema(schema) {
    var arraySchema = Array.isArray(schema) ? schema : Object.keys(schema).map(function (model) {
      return _objectSpread2(_objectSpread2({}, schema[model]), {}, {
        model: model
      });
    });
    return arraySchema.map(function (field) {
      return Array.isArray(field) ? field : [field];
    });
  };
  function useParsedSchema(refSchema) {
    var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var _useUniqueID = useUniqueID(),
        getID = _useUniqueID.getID;

    var replaceSubSchemaForms = vue.inject(LOOKUP_PARSE_SUB_SCHEMA_FORMS, null);
    var parsedSchema = vue.computed(function () {
      var schema = vue.unref(refSchema);
      var normalized = normalizeSchema(schema);

      if (model) {
        /**
         * If the model is provided, it means a SchemaForm is trying to find
         * a subschema in the main schema that corresponds to its "model" in the
         * use provided schema. We dig into the sub schemas to find it and normalize it
         * before setting it as the returned parsed schema
         */
        var element = findElementInSchema(model, normalized);

        if (element) {
          normalized = normalizeSchema(element.schema);
        }
      }

      normalized = normalized.map(function (fieldGroup) {
        return fieldGroup.map(function (field) {
          var fieldCopy = _objectSpread2({}, field);

          return _objectSpread2(_objectSpread2({}, fieldCopy), {}, {
            uuid: getID(field.model)
          });
        });
      });
      if (!replaceSubSchemaForms) return normalized;
      /**
       * If LookupPlugin has injected a plugin-enhanced version of SchemaForm
       * through `lookupSubSchemas` function, calls the remap function in case the
       * LookupPlugin is not actually being used.
       *
       * Ex: SchemaFormFactory.e2e.js "works with a blank plugin configuration and locally defined components"
       */

      return replaceSubSchemaForms.remapSubSchemaForms(normalized, replaceSubSchemaForms.SchemaFormWithPlugins);
    });
    return {
      parsedSchema: parsedSchema
    };
  }

  var script$3 = {
    name: 'SchemaField',
    props: {
      field: {
        type: Object,
        required: true
      },
      sharedConfig: {
        type: Object,
        default: () => ({})
      },
      preventModelCleanupOnSchemaChange: {
        type: Boolean,
        default: false
      }
    },
    setup (props) {
      const binds = vue.computed(() => {
        return props.field.schema
          ? {
            // For sub SchemaForm elements
            ...props.field,
            nestedSchemaModel: props.field.model
          }
          : { ...props.sharedConfig, ...props.field }
      });

      const formModel = vue.inject(FORM_MODEL, {});
      const path = vue.inject(SCHEMA_MODEL_PATH, null);
      const findNestedFormModelProp = vue.inject(FIND_NESTED_FORM_MODEL_PROP);

      const fieldValue = vue.computed(() => {
        if (path) {
          return findNestedFormModelProp(formModel, path)[props.field.model]
        }

        return formModel.value[props.field.model]
      });

      const updateFormModel = vue.inject(UPDATE_FORM_MODEL);
      const deleteFormModelProperty = vue.inject(DELETE_FORM_MODEL_PROP);

      const update = (value) => {
        updateFormModel(formModel, props.field.model, value, path);
      };

      const schemaCondition = vue.computed(() => {
        const condition = props.field.condition;
        if (!condition || typeof condition !== 'function') return true

        return condition(formModel.value)
      });

      // Possible local components injected by user from SchemaFormFactory
      const locals = vue.inject(INJECTED_LOCAL_COMPONENTS, {});
      const component = vue.computed(() => {
        return locals[props.field.component] || props.field.component
      });

      vue.watch(schemaCondition, shouldDisplay => {
        if (shouldDisplay) return
        if (props.preventModelCleanupOnSchemaChange) return

        deleteFormModelProperty(formModel, props.field.model, path);
      });

      return {
        binds,
        fieldValue,
        update,
        schemaCondition,
        component
      }
    }
  };

  function render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return ($setup.schemaCondition)
      ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($setup.component), vue.mergeProps({ key: 0 }, $setup.binds, {
          modelValue: $setup.fieldValue,
          "onUpdate:modelValue": $setup.update,
          class: "schema-col"
        }), null, 16 /* FULL_PROPS */, ["modelValue", "onUpdate:modelValue"]))
      : vue.createCommentVNode("v-if", true)
  }

  script$3.render = render$3;
  script$3.__file = "packages/formvuelate/src/SchemaField.vue";

  var script$2 = {
    name: 'SchemaRow',
    components: { SchemaField: script$3 },

    props: {
      row: {
        type: Array,
        required: true
      },
      schemaRowClasses: {
        type: [String, Object, Array],
        default: null
      }
    },

    setup (props) {
      const formModel = vue.inject(FORM_MODEL, {});

      const rowHasVisibleElements = vue.computed(() => {
        for (const field of props.row) {
          // If a field doesnt have a condition it guarantees itll be rendered
          if (!field.condition) return true

          // If a field condition is true, it will be rendered
          if (typeof condition !== 'function' && field.condition(formModel.value) === true) return true
        }

        return false
      });

      return {
        rowHasVisibleElements
      }
    }
  };

  function render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_SchemaField = vue.resolveComponent("SchemaField");

    return ($setup.rowHasVisibleElements)
      ? (vue.openBlock(), vue.createBlock("div", {
          key: 0,
          class: ['schema-row', $props.schemaRowClasses]
        }, [
          (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.row, (field) => {
            return (vue.openBlock(), vue.createBlock(_component_SchemaField, vue.mergeProps({
              key: field.model,
              field: field
            }, _ctx.$attrs, { class: "schema-col" }), null, 16 /* FULL_PROPS */, ["field"]))
          }), 128 /* KEYED_FRAGMENT */))
        ], 2 /* CLASS */))
      : vue.createCommentVNode("v-if", true)
  }

  script$2.render = render$2;
  script$2.__file = "packages/formvuelate/src/SchemaRow.vue";

  function useParentSchema() {
    var isChildOfWizard = vue.inject(IS_SCHEMA_WIZARD, false);
    var hasParentSchema = vue.inject(PARENT_SCHEMA_EXISTS, false);

    if (!hasParentSchema) {
      vue.provide(PARENT_SCHEMA_EXISTS, true);
    }

    var behaveLikeParentSchema = vue.computed(function () {
      return !isChildOfWizard && !hasParentSchema;
    });
    return {
      behaveLikeParentSchema: behaveLikeParentSchema,
      hasParentSchema: hasParentSchema,
      isChildOfWizard: isChildOfWizard
    };
  }

  function useInjectedSchema(props, behaveLikeParentSchema) {
    var _toRefs = vue.toRefs(props),
        schema = _toRefs.schema;

    var injectedSchema = vue.inject(INJECTED_SCHEMA, false);

    if (behaveLikeParentSchema) {
      // Only the top level schema form should inject the schema
      // That way we dont have to worry about injecting the prop down into
      // sub schemas
      vue.provide(INJECTED_SCHEMA, schema);
      injectedSchema = schema;
    }

    if (props.nestedSchemaModel) {
      // If the nestedSchemaModel prop is set it means this
      // component is a subschema, and we need to inform descendants
      // of the "path" for the model. ex. "info.family.parents"
      var path = vue.inject(SCHEMA_MODEL_PATH, '');
      var currentPath = path ? "".concat(path, ".").concat(props.nestedSchemaModel) : props.nestedSchemaModel;
      vue.provide(SCHEMA_MODEL_PATH, currentPath);
    }

    return {
      schema: injectedSchema
    };
  }

  /**
   * Find a key inside an object, or create it if it doesn't exist
   * @param {Object} model
   * @param {String} key
   * @returns
   */

  var findOrCreateProp = function findOrCreateProp(model, key) {
    if (!model[key]) {
      model[key] = {};
    }

    return model[key];
  };
  var findNestedFormModelProp = function findNestedFormModelProp(formModel, path) {
    var keys = path.split('.');
    var nestedProp = findOrCreateProp(formModel.value, keys[0]);

    for (var i = 1; i < keys.length; i++) {
      nestedProp = findOrCreateProp(nestedProp, keys[i]);
    }

    return nestedProp;
  };
  var updateFormModel = function updateFormModel(formModel, prop, value) {
    var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    if (!path) {
      formModel.value[prop] = value;
      return;
    }

    findNestedFormModelProp(formModel, path)[prop] = value;
  };
  /**
   * Delete a property in the form's model
   * @param {Ref} formModel
   * @param {String} prop
   * @param {String} path
   */

  var deleteFormModelProperty = function deleteFormModelProperty(formModel, prop, path) {
    if (!path) {
      delete formModel.value[prop];
      return;
    }

    var nested = findNestedFormModelProp(formModel, path);
    delete nested[prop]; // Check the parent to ensure that we dont leave empty objects behind

    var pathArray = path.split('.');
    var parentProp = pathArray.pop();
    var nestedParent = findPropertyForPath(pathArray.join('.'), formModel.value);
    if (nestedParent && !Object.keys(nestedParent[parentProp]).length) delete nestedParent[parentProp];
  };
  /**
   * Execute a function on each of the non-schema elements in a schema
   * @param {Ref|Object} schema
   * @param {Function} fn - Function to execute with each element
   * @param {String} path - Dot notation path of the formModel tree
   */

  var forEachSchemaElement = function forEachSchemaElement(schema, fn) {
    var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    // Normalization is necessary here because FVL only normalizes
    // the top level of each nested SchemaForm component and we need to traverse
    // the whole tree
    var normalizedSchema = normalizeSchema(vue.unref(schema));

    var _iterator = _createForOfIteratorHelper(normalizedSchema),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var row = _step.value;
        var rowPath = path;

        var _iterator2 = _createForOfIteratorHelper(row),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var el = _step2.value;

            if (el.schema) {
              rowPath = rowPath === '' ? el.model : "".concat(rowPath, ".").concat(el.model);
              forEachSchemaElement(el.schema, fn, rowPath);
            }

            fn(el, rowPath);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };
  /**
   * https://stackoverflow.com/questions/6393943/convert-a-javascript-string-in-dot-notation-into-an-object-reference
   * @param {String} path - The path plus the property ex. "nested.firstName" NOT "nested" by itself
   * @param {Object} object
   * @returns {*} property value
   */

  var findPropertyForPath = function findPropertyForPath(path, object) {
    return path.split('.').reduce(function (step, index) {
      return step[index];
    }, object);
  };
  /**
   * Execute a user defined function for each element in a form model object
   * @param {Object|Ref} formModel
   * @param {Function} fn
   * @param {String} path
   */

  var forEachPropInModel = function forEachPropInModel(formModel, fn) {
    var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var rawModel = vue.unref(formModel);

    for (var prop in rawModel) {
      var value = rawModel[prop];

      if (_typeof(value) === 'object' && value !== null) {
        path = path === '' ? prop : "".concat(path, ".").concat(prop);
        return forEachPropInModel(value, fn, path);
      }

      fn(prop, value, path);
    }
  };

  function useFormModel(props, parsedSchema) {
    var formModel = vue.inject(FORM_MODEL, {});
    var hasParentSchema = vue.inject(PARENT_SCHEMA_EXISTS, false);

    var cleanupModelChanges = function cleanupModelChanges(schema, oldSchema) {
      if (props.preventModelCleanupOnSchemaChange) return;
      forEachPropInModel(formModel, function (model, value, path) {
        var existsInSchema = false;
        forEachSchemaElement(schema, function (el) {
          if (el.model === model) {
            existsInSchema = true;
          }
        }, path);
        if (existsInSchema) return;
        deleteFormModelProperty(formModel, model, path);
      });
    };
    /**
     * Loop the schema and check for `default`. If found, pre-populate the formModel
     * This should only execute on top level SchemaForm, as it will recurse the schema itself
     */


    if (!hasParentSchema) {
      forEachSchemaElement(parsedSchema, function (el, path) {
        if (!('default' in el)) return;
        updateFormModel(formModel, el.model, el.default, path);
      });
      vue.watch(parsedSchema, cleanupModelChanges);
    }
  }

  var script$1 = {
    name: 'SchemaForm',
    components: { SchemaRow: script$2 },
    props: {
      schema: {
        type: [Object, Array],
        required: true,
        validator (schema) {
          if (!Array.isArray(schema)) return true
          if (schema.length === 0) return true

          return schema.filter(field => !Array.isArray(field) && (!field.model && !field.schema)).length === 0
        }
      },
      sharedConfig: {
        type: Object,
        default: () => ({})
      },
      preventModelCleanupOnSchemaChange: {
        type: Boolean,
        default: false
      },
      nestedSchemaModel: {
        type: String,
        default: ''
      },
      schemaRowClasses: {
        type: [String, Object, Array],
        default: null
      },
      useCustomFormWrapper: {
        type: Boolean,
        default: false
      },
      debug: { type: Boolean, default: false }
    },
    emits: ['submit', 'update:modelValue'],
    setup (props, { emit, attrs }) {
      const { behaveLikeParentSchema, hasParentSchema } = useParentSchema();

      const { schema } = useInjectedSchema(props, behaveLikeParentSchema);
      const { parsedSchema } = useParsedSchema(schema, attrs.model);

      useFormModel(props, parsedSchema);

      const formBinds = vue.computed(() => {
        if (hasParentSchema && !props.useCustomFormWrapper) return {}

        return {
          onSubmit: event => {
            event.preventDefault();
            emit('submit', event);
          }
        }
      });

      const slotBinds = vue.computed(() => {
        return {}
      });

      return {
        behaveLikeParentSchema,
        parsedSchema,
        hasParentSchema,
        formBinds,
        slotBinds
      }
    }
  };

  const _hoisted_1 = { key: 1 };

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_SchemaRow = vue.resolveComponent("SchemaRow");

    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($setup.behaveLikeParentSchema && !$props.useCustomFormWrapper ? 'form' : 'div'), $setup.formBinds, {
      default: vue.withCtx(() => [
        ($setup.behaveLikeParentSchema)
          ? vue.renderSlot(_ctx.$slots, "beforeForm", vue.mergeProps({ key: 0 }, $setup.slotBinds))
          : vue.createCommentVNode("v-if", true),
        (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($setup.parsedSchema, (row, index) => {
          return (vue.openBlock(), vue.createBlock(_component_SchemaRow, {
            key: index,
            row: row,
            schemaRowClasses: $props.schemaRowClasses,
            sharedConfig: $props.sharedConfig,
            preventModelCleanupOnSchemaChange: $props.preventModelCleanupOnSchemaChange
          }, null, 8 /* PROPS */, ["row", "schemaRowClasses", "sharedConfig", "preventModelCleanupOnSchemaChange"]))
        }), 128 /* KEYED_FRAGMENT */)),
        ($props.debug)
          ? (vue.openBlock(), vue.createBlock("pre", _hoisted_1, vue.toDisplayString($setup.parsedSchema), 1 /* TEXT */))
          : vue.createCommentVNode("v-if", true),
        ($setup.behaveLikeParentSchema)
          ? vue.renderSlot(_ctx.$slots, "afterForm", vue.mergeProps({ key: 2 }, $setup.slotBinds))
          : vue.createCommentVNode("v-if", true)
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */))
  }

  script$1.render = render$1;
  script$1.__file = "packages/formvuelate/src/SchemaForm.vue";

  var script = {
    name: 'SchemaWizard',
    components: { SchemaForm: script$1 },
    props: {
      schema: {
        type: Array,
        required: true
      },
      step: {
        type: Number,
        required: true,
        default: 0
      }
    },
    emits: ['submit'],
    setup (props) {
      vue.provide(IS_SCHEMA_WIZARD, true);

      const currentSchema = vue.computed(() => {
        return props.schema[props.step]
      });

      return { currentSchema }
    }
  };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_SchemaForm = vue.resolveComponent("SchemaForm");

    return (vue.openBlock(), vue.createBlock("form", {
      onSubmit: _cache[1] || (_cache[1] = vue.withModifiers($event => (_ctx.$emit('submit', $event)), ["prevent"]))
    }, [
      vue.renderSlot(_ctx.$slots, "beforeForm"),
      vue.createVNode(_component_SchemaForm, {
        schema: $setup.currentSchema,
        preventModelCleanupOnSchemaChange: ""
      }, null, 8 /* PROPS */, ["schema"]),
      vue.renderSlot(_ctx.$slots, "afterForm")
    ], 32 /* HYDRATE_EVENTS */))
  }

  script.render = render;
  script.__file = "packages/formvuelate/src/SchemaWizard.vue";

  /**
   * Returns true if the passed value is an object
   * @param {*} obj
   * @returns {boolean}
   */
  function isObject(obj) {
    return obj !== null && !!obj && _typeof(obj) === 'object' && !Array.isArray(obj);
  }

  function SchemaFormFactory() {
    var plugins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var components = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    // Copy the original SchemaForm setup
    var originalSetup = script$1.setup;

    var schemaFormProps = _objectSpread2({}, script$1.props);

    function extendSchemaFormProps(newProps) {
      if (!isObject(newProps)) {
        if (process.env && process.env.NODE_ENV !== 'production') {
          console.warn('FormVueLate: extendSchemaFormProps can only receive a Vue props object');
        }

        return;
      }

      Object.assign(schemaFormProps, newProps);
    }

    plugins.forEach(function (plugin) {
      if (plugin.extend) {
        plugin.extend({
          extendSchemaFormProps: extendSchemaFormProps
        });
      }
    });

    function setup(props, context) {
      // Call the original setup and preserve its results
      var baseSchemaFormReturns = originalSetup(props, context);

      if (components) {
        // If user defined local components to be used inside the SchemaForm
        // injected them so that SchemaField can use them if declared
        if (!vue.inject(INJECTED_LOCAL_COMPONENTS, null)) {
          vue.provide(INJECTED_LOCAL_COMPONENTS, components);
        }
      }

      if (!plugins.length) return baseSchemaFormReturns;else {
        // Apply plugins on the data returned
        // by the original SchemaForm
        return plugins.reduce(function (schemaFormReturns, plugin) {
          return plugin(schemaFormReturns, props, context);
        }, baseSchemaFormReturns);
      }
    }

    return _objectSpread2(_objectSpread2({}, script$1), {}, {
      props: schemaFormProps,
      components: _objectSpread2(_objectSpread2({}, components), script$1.components),
      name: 'SchemaFormWithPlugins',
      // Return a customized setup function with plugins
      // as the new SchemaForm setup
      setup: setup
    });
  }

  function useSchemaForm() {
    var initialFormValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var formModel = vue.isRef(initialFormValue) ? initialFormValue : vue.ref(initialFormValue);
    vue.provide(UPDATE_FORM_MODEL, updateFormModel);
    vue.provide(DELETE_FORM_MODEL_PROP, deleteFormModelProperty);
    vue.provide(FIND_NESTED_FORM_MODEL_PROP, findNestedFormModelProp);
    vue.provide(FORM_MODEL, formModel);
    /**
     * Update the form model manually providing a path to the model
     * @param {String} modelPath
     * @param {*} value
     */

    var _updateFormModel = function _updateFormModel(modelPath, value) {
      if (typeof modelPath !== 'string') throw new Error('path for updateFormModel should be a string separated by dots (.)');
      var prop = modelPath.includes('.') ? modelPath.split('.').pop() : modelPath;
      updateFormModel(formModel, prop, value, modelPath.split('.').slice(0, -1).join('.'));
    };

    return {
      formModel: formModel,
      updateFormModel: _updateFormModel
    };
  }

  /**
   * A helper function to make creating plugins easier
   * @param plugin The plugin function or object
   */
  function definePlugin(plugin) {
    // function plugin
    if (typeof plugin === 'function') {
      return plugin;
    } // plugin with advanced options


    var pluginFn = plugin.setup;

    if ('extend' in plugin) {
      pluginFn.extend = plugin.extend;
    }

    return pluginFn;
  }

  exports.SchemaForm = script$1;
  exports.SchemaFormFactory = SchemaFormFactory;
  exports.SchemaWizard = script;
  exports.constants = constants;
  exports['default'] = script$1;
  exports.definePlugin = definePlugin;
  exports.useSchemaForm = useSchemaForm;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
