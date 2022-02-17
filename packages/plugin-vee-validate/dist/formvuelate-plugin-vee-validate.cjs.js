/**
  * plugin-vee-validate v3.8.1
  */
'use strict';

var vue = require('vue');
var veeValidate = require('vee-validate');
var formvuelate = require('formvuelate');

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

/**
 * For a Schema, find the elements in each of the rows and remap the element with the given function
 * @param {Array} schema
 * @param {Function} fn
 *
 * @returns {Array}
 */

var mapElementsInSchema = function mapElementsInSchema(schema, fn) {
  return schema.map(function (row) {
    return row.map(function (el) {
      return fn(el);
    });
  });
};
/**
 * Maps the validation state to props
 */


function defaultMapProps(validation) {
  return {
    validation: validation
  };
}

var VEE_VALIDATE_FVL_FORM_KEY = 'vee-validate-fvl-form-context';
function VeeValidatePlugin(opts) {
  // Maps the validation state exposed by vee-validate to components
  var mapProps = opts && opts.mapProps || defaultMapProps;

  function veeValidatePlugin(baseReturns, props) {
    // Take the parsed schema from SchemaForm setup returns
    var parsedSchema = baseReturns.parsedSchema,
        formBinds = baseReturns.formBinds; // Get additional properties not defined on the `SchemaForm` derivatives

    var _ref = vue.getCurrentInstance() || {
      attrs: {}
    },
        formAttrs = _ref.attrs; // try to retrieve vee-validate form from the root schema if possible


    var formContext = vue.inject(VEE_VALIDATE_FVL_FORM_KEY, undefined);

    if (!formContext) {
      // if non-existent create one and provide it for nested schemas
      formContext = veeValidate.useForm({
        validationSchema: props.validationSchema ? vue.computed(function () {
          return props.validationSchema;
        }) : undefined,
        initialErrors: formAttrs['initial-errors'] || formAttrs.initialErrors,
        initialTouched: formAttrs['initial-touched'] || formAttrs.initialTouched
      });
      vue.provide(VEE_VALIDATE_FVL_FORM_KEY, formContext);
    }

    var _formContext = formContext,
        handleSubmit = _formContext.handleSubmit;

    function mapField(el) {
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      // Handles nested schemas
      // doesn't treat nested forms as fields
      // instead goes over their fields and maps them recursively
      if (el.schema) {
        path = path ? "".concat(path, ".").concat(el.model) : el.model; // Make sure we only deal with schema arrays and not nested objects

        var schemaArray = Array.isArray(el.schema) ? el.schema : Object.keys(el.schema).map(function (model) {
          return _objectSpread2({
            model: model
          }, el.schema[model]);
        });
        return _objectSpread2(_objectSpread2({}, el), {}, {
          schema: schemaArray.map(function (nestedField) {
            return mapField(nestedField, path);
          })
        });
      }

      var constructField = function constructField(field) {
        return _objectSpread2(_objectSpread2({}, field), {}, {
          _veeValidateConfig: {
            mapProps: mapProps,
            path: path
          },
          component: withField(field)
        });
      };

      if (Array.isArray(el)) {
        return el.map(constructField);
      }

      return constructField(el);
    } // Map components in schema to enhanced versions with `useField`


    var formSchemaWithVeeValidate = vue.computed(function () {
      return mapElementsInSchema(parsedSchema.value, mapField);
    }); // override the submit function with one that triggers validation

    var formSubmit = formBinds.value.onSubmit;
    var onSubmit = handleSubmit(function (_, _ref2) {
      var evt = _ref2.evt;
      formSubmit(evt);
    });
    return _objectSpread2(_objectSpread2({}, baseReturns), {}, {
      formBinds: vue.computed(function () {
        return _objectSpread2(_objectSpread2({}, baseReturns.formBinds.value), {}, {
          onSubmit: onSubmit
        });
      }),
      slotBinds: vue.computed(function () {
        return _objectSpread2(_objectSpread2({}, baseReturns.slotBinds.value), {}, {
          validation: {
            errors: formContext.errors.value,
            values: formContext.values,
            isSubmitting: formContext.isSubmitting.value,
            submitCount: formContext.submitCount.value,
            meta: formContext.meta.value
          }
        });
      }),
      parsedSchema: formSchemaWithVeeValidate
    });
  } // extends the schema form props


  var extend = function extend(_ref3) {
    var extendSchemaFormProps = _ref3.extendSchemaFormProps;
    extendSchemaFormProps({
      validationSchema: {
        type: Object,
        default: undefined
      }
    });
  };

  return formvuelate.definePlugin({
    setup: veeValidatePlugin,
    extend: extend
  });
} // Used to track if a component was already marked
// very important to avoid re-creating components when re-rendering

var COMPONENT_LOOKUP = new Map();

function withField(el) {
  var Comp = el.component;

  if (COMPONENT_LOOKUP.has(Comp)) {
    return COMPONENT_LOOKUP.get(Comp);
  }

  var wrappedComponent = vue.markRaw({
    name: 'withFieldWrapper',
    props: {
      label: {
        type: String,
        default: undefined
      },
      modelValue: {
        type: null,
        default: undefined
      },
      validations: {
        type: [String, Object, Function],
        default: undefined
      },
      _veeValidateConfig: {
        type: Object,
        required: true
      }
    },
    setup: function setup(props, _ref4) {
      var attrs = _ref4.attrs;
      var _props$_veeValidateCo = props._veeValidateConfig,
          path = _props$_veeValidateCo.path,
          mapProps = _props$_veeValidateCo.mapProps;

      var _toRefs = vue.toRefs(props),
          validations = _toRefs.validations,
          modelValue = _toRefs.modelValue;

      var initialValue = modelValue ? modelValue.value : undefined; // Build a fully qualified field name using dot notation for nested fields
      // ex: user.name

      var name = path ? "".concat(path, ".").concat(attrs.model) : attrs.model;
      var label = vue.computed(function () {
        return props.label;
      });

      var _useField = veeValidate.useField(name, validations, {
        initialValue: initialValue,
        label: label
      }),
          value = _useField.value,
          errorMessage = _useField.errorMessage,
          meta = _useField.meta,
          setTouched = _useField.setTouched,
          errors = _useField.errors,
          validate = _useField.validate,
          handleChange = _useField.handleChange;

      if (modelValue) {
        vue.watch(modelValue, function (val) {
          value.value = val;
        });
      }

      var localComponents = vue.inject(formvuelate.constants.INJECTED_LOCAL_COMPONENTS, {});
      var resolvedComponent = resolveComponent(Comp, localComponents);
      return function renderWithField() {
        return vue.h(resolvedComponent, _objectSpread2(_objectSpread2(_objectSpread2({}, props), attrs), mapProps({
          errorMessage: vue.unref(errorMessage),
          errors: vue.unref(errors),
          meta: meta,
          setTouched: setTouched,
          validate: validate,
          handleChange: handleChange
        }, el)));
      };
    }
  }); // Assign it to the cache to avoid re-creating it

  COMPONENT_LOOKUP.set(Comp, wrappedComponent);
  return wrappedComponent;
}
/**
 * Resolves the component definition by checking the local injection first then trying the vue dynamic resolve algorithm.
 * @param {*} component The component object or name
 * @param {*} localComponents The injected components lookup from SchemaFormFactory
 */


function resolveComponent(component, localComponents) {
  if (localComponents && typeof component === 'string' && component in localComponents) {
    return localComponents[component];
  }

  return vue.resolveDynamicComponent(component);
}

module.exports = VeeValidatePlugin;
