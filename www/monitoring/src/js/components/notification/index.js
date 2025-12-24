import { LitElement, css, html, unsafeCSS } from 'lit'
import style from "./index.css?inline"// with { type: 'text' };
import sound_low_bat_path from "@sounds/low_battery_voltage.webm" with {type:"path"}

export class Notificationlement extends LitElement {
  static get properties() {
    return {
      enabled: { type: Boolean },
      value:{type: Number},
      low_value:{type: Number,attribute:"low-value"},
      interval:{type: Number},
      audio:{type:String},

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
    this.value=100// current value
    this.low_value=10//set low value, 10%
    this.enabled=true//object to hold PVs data
    this.interval=10//seconds
    this.audio=""
  }

  firstUpdated(){
    // console.log(">>component ready, devices:",this.devices)
    const audio = new Audio(this.audio||sound_low_bat_path)

    setInterval(()=>{
        if(this.enabled&&this.value<this.low_value){
            audio.play()
        }
    },this.interval*1000)
  }//first updated




//FIXME: complete notification
  render() {

    return html`
      <div class="wrapper" >
        <input id="enable-notification" type="checkbox" checked @change=${e=>{this.enabled=e.target.checked;this.requestUpdate()}}></input>
        <label for="enable-notification">${this.enabled?"🔊":"🔇"}</label>
      </div>
    `
  }
}

window.customElements.define('m-notification', Notificationlement)
