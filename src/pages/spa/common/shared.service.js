class SharedService {
  constructor(initValues = {}) {
    this.values = initValues;
  }

  getByKey(key) {
    return this.values[key];
  }

  setByKey(key, value) {
    this.values[key] = value;
    return value;
  }

  clearAll() {
    this.values = {};
  }
}

const sharedService = new SharedService();

export default sharedService;
