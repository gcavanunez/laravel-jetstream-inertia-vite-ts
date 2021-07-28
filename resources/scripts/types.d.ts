import { AxiosInstance } from "axios";
import { DefineComponent, Plugin } from "vue";
import route from "ziggy-js";
import _ from "lodash";

declare module "@inertiajs/inertia-vue3" {
  interface SetupOptions {
    el: string | Element;
    app: DefineComponent;
    props: object;
    plugin: Plugin;
  }

  interface InertiaOptions {
    resolve: (name: string) => DefineComponent;
    setup: (options: SetupOptions) => void;
  }

  // export const createInertiaApp: (options: InertiaOptions) => void;
}
declare global {
  interface Window {
    axios: AxiosInstance;
    route: typeof route;
    _: typeof _;
  }
}
