import{r as t,h as e,g as s}from"./p-a9ce478c.js";import"./p-303a9197.js";import{C as i,T as o}from"./p-256c3418.js";var n=function(t,e,s,i){var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};const r=class{constructor(e){t(this,e),this.componentSlot="",this.columns=1,this.layout=null}componentWillLoad(){this.columns=this.__host.children.length,Array.from(this.__host.children).forEach((t=>{"style"===t.tagName.toLowerCase()&&this.columns--})),this.componentSlot=this.__host.innerHTML;let t=this.__host.querySelector("style");t?(this.__host.innerHTML=t.outerHTML,this.componentSlot=this.componentSlot.replace(t.outerHTML,"")):this.__host.innerHTML=""}render(){return this.__host.isConnected?e("psk-grid",{innerHTML:this.componentSlot,columns:this.columns,layout:this.layout}):null}get __host(){return s(this)}};n([i()],r.prototype,"__host",void 0),n([o({isMandatory:!0,propertyType:"string",description:["This attribute will set the layout for the components inside the grid, according to the number of columns.",'Example: <psk-grid columns="3" layout="xs=[12,12,12] s=[6,6,12] m=[3,3,6] l=[3,4,5]" xl=[3,4,5]>',"There are 5 possible breakpoints, according to Bootstrap documentation: xs, s, m, l and xl. For each breakpoint you want to use, the number of the values must be the same with the number of the columns, otherwise, the breakpoint will be ignored.",'Each breakpoint will be written in the following manner: breakpoint=[value1, value2,... valueN], where N is the number of columns and the value accepts numbers between 0 and 12 included, or the string "auto".',"If a value is 0, then the element for that column will be hidden. If a value is auto, it will have no bootstrap class and will inherit the design.","If any other value is set, the breakpoint will be ignored even if it has the same number of columns."],defaultValue:"null"})],r.prototype,"layout",void 0);export{r as psk_form_row}