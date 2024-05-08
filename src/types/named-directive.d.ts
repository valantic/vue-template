import { Directive } from 'vue';

type NamedDirective = Directive & {
  name: string;
};
