class Router {
  constructor(routes = [], root = '') {
    this.routes = [];
    this.root = root;
    if (routes.length) {
      this.initRoutes(routes);
    }
  }

  initRoutes(routes = []) {
    this.routes = [];
    this.addRoutes(routes);
  }

  addRoutes(routes = []) {
    routes.forEach((routeItem) => {
      const { path, route } = routeItem;
      this.add(path, route);
    });
  }

  add(path, route) {
    const routeByPath = this.routes.find((routeItem) => path === routeItem.path);
    if (routeByPath) {
      routeByPath.route = route;
    } else {
      this.routes.push({ path, route });
    }
    return this;
  }

  remove(path) {
    if (!path) return this;

    const routeIndex = this.routes.findIndex((route) => route.path === path);
    if (routeIndex === -1) return this;

    this.routes.splice(routeIndex, 1);
    return this;
  }

  clearAll() {
    this.routes = [];
    return this;
  }

  navigate(fullPath = window.location.pathname) {
    if (this.currentPath !== fullPath) {
      this.currentPath = fullPath;
    }

    const NextComponent = this.findComponent(fullPath);
    if (NextComponent) {
      this.curComponent.destroy();
      this.curComponent = new NextComponent();
      this.curComponent.render();
    } else {
      throw new Error('can not find a component');
    }

    return this;
  }

  findComponent(pathOrSteps = []) {
    const steps = (typeof (pathOrSteps) === 'string') ? Router.toSteps(pathOrSteps) : pathOrSteps;

    let firstStep = this.root;
    if (steps.length) {
      firstStep = steps.shift();
    } else {
      return this.findComponent(firstStep);
    }

    const firstRoute = this.routes.find((route) => route.path === firstStep);

    if (!firstRoute) {
      return null;
    }

    if (firstRoute.route instanceof Router) {
      return firstRoute.findComponent([...steps]);
    }
    return firstRoute.route;
  }

  static toSteps(fullPath = '') {
    const steps = fullPath.split('/');
    steps.filter((step) => step !== '');
    return steps;
  }
}

export default Router;
