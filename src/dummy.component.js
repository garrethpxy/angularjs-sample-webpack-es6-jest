import angular from "angular"
import template from "./dummy.html"

import './dummy.component.scss'

class DummyController {

  /* @ngInject */
  constructor() {
    this.name = "Sam123";
    this.isOn = false;
  }

  turnOn () {
    this.isOn = true;
  }
}

const component = {
  controller: DummyController,
  template
}

export default angular.module("app.dummy", [])
  .component("dummyComponent", component)
  .name
