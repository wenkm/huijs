class MyPromise {
  constructor(executor) {
    this.initData()
    this.initBind()
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  initData() {
    this.promiseResult = null;
    this.promiseStatus = 'fulled';
  }

  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }

  resolve(value) {
    this.promiseResult = value;
    this.promiseStatus = 'success'
  }

  reject(value) {
    this.promiseResult = value;
    this.promiseStatus = 'error'
  }
}
