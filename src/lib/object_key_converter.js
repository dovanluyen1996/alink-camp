export default class ObjectKeyConverter {
  static snakeToCamel(obj) {
    if (!obj) return obj;
    const converted = {};
    switch (typeof obj) {
    case 'object':
      if (Array.isArray(obj)) {
        const arrayData = [];
        obj.forEach((data) => {
          arrayData.push(this.snakeToCamel(data));
        });
        return arrayData;
      }
      if (Object.prototype.toString.call(obj) === '[object File]') {
        return obj;
      }
      Object.keys(obj).forEach((key) => {
        const camelKey = key.replace(/([_][a-z])/ig, $1 => $1.toUpperCase().replace('_', ''));
        const value = this.snakeToCamel(obj[key]);
        converted[camelKey] = value;
      });
      return converted;
    default:
      return obj;
    }
  }

  static camelToSnake(obj) {
    if (!obj) return obj;
    const converted = {};
    switch (typeof obj) {
    case 'object':
      if (Array.isArray(obj)) {
        const arrayData = [];
        obj.forEach((data) => {
          arrayData.push(this.camelToSnake(data));
        });
        return arrayData;
      }
      if (Object.prototype.toString.call(obj) === '[object File]') {
        return obj;
      }
      Object.keys(obj).forEach((key) => {
        const snakeKey = key.replace(/[A-Z]/g, $1 => `_${$1.toLowerCase()}`);
        const value = this.camelToSnake(obj[key]);
        converted[snakeKey] = value;
      });
      return converted;
    default:
      return obj;
    }
  }
}
