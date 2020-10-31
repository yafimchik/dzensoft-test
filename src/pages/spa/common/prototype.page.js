export default class Page {
  constructor(renderer, Router, routes = []) {
    this.rootRouter = new Router();
    this.initRoutes(routes);
    this.renderer.renderPage();
  }

  initRoutes(routes) {
    this.rootRouter.addRoutes(routes);
    return this;
  }

  initTemplate(template = '', context = {}) {
    this.template = template;
    this.context = context;
    return this;
  }

  renderPage() {
    this.renderer.renderPage(this.template, this.context);
  }
}
