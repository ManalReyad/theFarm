export class ListColumn {
  field!: string;
  value?: any;
  objectName?: string;
  isObject?: boolean = false;
  header!: string;
  width?: number;
  hide?: boolean = false;
  isStatus?: boolean = false;
  statusClass?: string = "";
  headerCustomStyle?: string = "";
  statusBadgeField?: string = "";
  stopSort?: boolean = false;
  sortField?: string = "";
  isDate?: boolean = false;
  isIndex?: boolean = false;
  isToggle?: boolean = false;
  isTime?: boolean = false;
  isOrder?: boolean = false;
  icon?: boolean = false;
  isColor?: boolean = false;
  isCurrancy?: boolean = false;
  isProjectType?: boolean = false;
  iconTooltip?: string;
  minWidth?: number;
  toolTip?: any;
  coloredCol?: boolean = false; 
  percentage?: boolean = false;
  public constructor(init?: Partial<ListColumn>) {
      Object.assign(this, init);
  }
}
