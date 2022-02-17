/**
  * plugin-lookup v3.8.1
  */
import { computed, provide, unref } from 'vue';
import { constants } from 'formvuelate';

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

var extendedSchemaForm;
/**
 * Signal ParsedSchema to replace all instances of subschema `SchemaForm` components
 * with the SchemaFormWithPlugins component
 * @param {Object} SchemaFormWithPlugins
 */

var lookupSubSchemas = function lookupSubSchemas(SchemaFormWithPlugins) {
  provide(constants.LOOKUP_PARSE_SUB_SCHEMA_FORMS, {
    SchemaFormWithPlugins: SchemaFormWithPlugins,
    remapSubSchemaForms: remapSubSchemaForms
  });
  extendedSchemaForm = SchemaFormWithPlugins;
};

var remapSubSchemaForms = function remapSubSchemaForms(refSchema, extendedSchemaForm) {
  var schema = unref(refSchema);
  return mapElementsInSchema(schema, function (field) {
    if (extendedSchemaForm && field.component && (field.component === 'SchemaForm' || field.component.name === 'SchemaForm')) {
      field.component = extendedSchemaForm;
    }

    return field;
  });
};
/**
 * LookupPlugin
 * @param {Object} configuration
 * @param {Object|Function} configuration.mapComponents - Key value pair of component mapping or a function that returns it
 * @param {Object|Function} configuration.mapProps - Key value pair of prop mapping or a function that returns it
 * @param {Boolean} configuration.preserveMappedProps
 *
 * @returns {Function}
 */


function LookupPlugin() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$mapComponents = _ref.mapComponents,
      mapComponents = _ref$mapComponents === void 0 ? {} : _ref$mapComponents,
      _ref$mapProps = _ref.mapProps,
      mapProps = _ref$mapProps === void 0 ? null : _ref$mapProps,
      _ref$preserveMappedPr = _ref.preserveMappedProps,
      preserveMappedProps = _ref$preserveMappedPr === void 0 ? false : _ref$preserveMappedPr;

  return function (baseReturns) {
    var parsedSchema = baseReturns.parsedSchema;
    var replacedSchema = computed(function () {
      var schemaWithRemappedProps = mapProperties(parsedSchema.value, mapProps, {
        preserveMappedProps: preserveMappedProps
      });
      var schemaWithMappedComps = mapComps(schemaWithRemappedProps, mapComponents);
      if (!extendedSchemaForm) return schemaWithMappedComps;
      return remapSubSchemaForms(schemaWithMappedComps, extendedSchemaForm);
    });
    return _objectSpread2(_objectSpread2({}, baseReturns), {}, {
      parsedSchema: replacedSchema
    });
  };
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
 * Remap components in a schema
 * @param {Array} schema - The schema
 * @param {Object|Function} mapComponents
 *
* @returns {Array}
 */

var mapComps = function mapComps(schema, mapComponents) {
  function mapSchemaElement(el) {
    var newKey = mapComponents[el.component]; // recursively exhaust all sub schemas

    if (el.schema) {
      var schemaArray = Array.isArray(el.schema) ? el.schema : Object.keys(el.schema).map(function (model) {
        return _objectSpread2({
          model: model
        }, el.schema[model]);
      });
      return _objectSpread2(_objectSpread2({}, el), {}, {
        component: mapComponents[el.component] || el.component,
        schema: schemaArray.map(mapSchemaElement)
      });
    }

    if (!newKey) return _objectSpread2({}, el);
    return _objectSpread2(_objectSpread2({}, el), {}, {
      component: mapComponents[el.component]
    });
  }

  return mapElementsInSchema(schema, mapSchemaElement);
};
/**
 * Remap properties in a schema
 * @param {Array} schema - The schema
 * @param {Function|Object} mapProps - A key pair value object or function that returns it
 *
 * @returns {Array}
 */


var mapProperties = function mapProperties(schema, mapProps) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!mapProps || !['object', 'function'].includes(_typeof(mapProps))) return schema;

  if (typeof mapProps === 'function') {
    return mapPropertiesWithUserFunction(schema, mapProps, config);
  }

  var schemaCopy;

  var _loop = function _loop(prop) {
    schemaCopy = mapElementsInSchema(schema, function (el) {
      return replacePropInElement(el, prop, mapProps[prop], config);
    });
  };

  for (var prop in mapProps) {
    _loop(prop);
  }

  return schemaCopy;
};
/**
 * Remap properties using a user defined function
 * @param {Array} schema
 * @param {Function} fn
 *
 * @returns {Array} - Parsed schema
 */


var mapPropertiesWithUserFunction = function mapPropertiesWithUserFunction(schema, fn) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var mapPropsForElement = function mapPropsForElement(el, fn) {
    var map = fn(el);

    for (var prop in map) {
      el = replacePropInElement(el, prop, map[prop], config);
    }

    return el;
  };

  return mapElementsInSchema(schema, function (el) {
    return mapPropsForElement(el, fn);
  });
};
/**
 *
 * @param {Object} el - The element to replace props in
 * @param {String} prop - The prop to replace or fn to pick the prop
 * @param {String|Function|Boolean} replacement - The replacement for the prop, a function that returns it or the boolean "false" to delete it
 * @param {Object} [config={}]
 * @param {Boolean} [config.preserveMappedProps=false]
 *
 * @returns {Object} - The replaced element
 */


var replacePropInElement = function replacePropInElement(el, prop, replacement) {
  var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref2$preserveMappedP = _ref2.preserveMappedProps,
      preserveMappedProps = _ref2$preserveMappedP === void 0 ? false : _ref2$preserveMappedP;

  var propReplacement = replacement;

  if (typeof replacement === 'function') {
    // If replacement is a function, call it to get
    // the prop to be replaced. If its falsey, then return
    // the element as is
    propReplacement = replacement(el);
    if (!propReplacement) return el;
  }

  if (!(prop in el)) {
    if (process.env && process.env.NODE_ENV !== 'production') {
      console.warn("LookupPlugin: property \"".concat(prop, "\" not found in"), el);
    } // Return the el without replacing


    return el;
  }

  var originalValue = el[prop];

  var elementCopy = _objectSpread2({}, el);

  if (propReplacement === false || !preserveMappedProps) {
    delete elementCopy[prop];
  }

  if (propReplacement === false) {
    return elementCopy;
  }

  elementCopy[propReplacement] = originalValue;
  return elementCopy;
};

export { LookupPlugin as default, lookupSubSchemas, mapElementsInSchema };
