import renderer from './renderer';
import sharedService from './shared.service';

class Component {
  constructor() {
    this.renderer = renderer;
    this.sharedResources = sharedService;
    this.html = '';
    this.context = {};
    this.init();
  }

  init() {
    return this;
  }

  afterRender() {
    return this;
  }

  render(html = this.html, context = this.context) {
    this.renderer.renderComponent(html, context);
    this.afterRender();
  }

  destroy() {
    return this;
  }
}

export default Component;
