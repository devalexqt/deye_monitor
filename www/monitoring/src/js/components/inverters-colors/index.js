import { LitElement, css, html, unsafeCSS } from 'lit'
import style from "./index.css?inline"// with { type: 'text' };
import {repeat} from 'lit/directives/repeat.js'
import colors_inverter from "../../inverter_colors.json"

export class InvertersColorslement extends LitElement {
  static get properties() {
    return {
      index: { type: Number },
    }
  }

    //styling
    static get styles(){
      return [
        css`${unsafeCSS(style)}`,
    ]
    }

  constructor() {
    super()
  }

  firstUpdated(){
    // console.log(">>component ready, devices:",this.devices)

  }//first updated

  render() {
    const colors=[]
    for(const [key,value] of Object.entries(colors_inverter)){
        colors.push({id:key,color:value})
    }
    return html`
      <div class="wrapper" >
        ${repeat(colors,c=>c.id,(item,index)=>html`
                <div class="item">
                    <div class="color" style="--color:${item.color};"></div>
                    <div class="name">${item.id}</div>       
                </item>
            `)}
      </div>
    `
  }
}

window.customElements.define('m-invertor-colors', InvertersColorslement)
