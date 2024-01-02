import { Directive } from 'vue';

type CustomDirective = Directive & {
  name: string;
}
