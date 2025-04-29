export interface IMenuItem {
    icon: any;
    label: string;
    route?: string;
    click?: () => void;
  }