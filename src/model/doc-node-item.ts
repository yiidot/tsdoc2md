export class BaseItem {
    kind: string = "";
  }
  
  export class DocNodeTitle extends BaseItem {
    content: string = "";
  }
  
  export class DocNodeParameter extends BaseItem {
      name: string = "";
      type: string = "";
      description: string = "";
    }
  
    export class DocNodeReturns extends BaseItem {
      content: string = "";
    }
    export class DocNodeExample extends BaseItem {
      content: string = "";
    }