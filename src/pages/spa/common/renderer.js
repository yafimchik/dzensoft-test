import { compile } from 'handlebars';

class Renderer {
  constructor(componentQuery = 'main.component') {
    this.componentContainer = document.querySelector(componentQuery);
    if (!this.componentContainer) throw new Error('component container does not exist');
  }

  renderComponent(template = '', context = {}) {
    const handlebarsTemplate = compile(template);
    const html = handlebarsTemplate(context);

    this.componentContainer.innerHTML = html;
    return context;
  }

  removeComponent() {
    this.componentContainer.innerHTML = '';
    return true;
  }
}

const renderer = new Renderer('main.component');

export default renderer;
