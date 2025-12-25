import { LitElement, css, html, unsafeCSS } from 'lit'
import style from "./index.css?inline"// with { type: 'text' };
import {repeat} from 'lit/directives/repeat.js'
import colors_inverter from "../../inverter_colors.json"

export class Loadlement extends LitElement {
  static get properties() {
    return {
      data: { type: Object },
      devices: { type: Object },
      total_power:{type: Number,attribute:"total-power"},

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
    this.devices=[]
    this.data = {}
    this.total_power=1000//set total poer of all inverters
    this.load_obj={}//object to hold PVs data
  }

  firstUpdated(){
    // console.log(">>component ready, devices:",this.devices)

  }//first updated





  render() {
    // console.log(">>>devices:",this.devices)


////////////////// Create  list for all devices
// {
//     "voltage_phase_A": 239.9,
//     "voltage_phase_B": 239.8,
//     "voltage_phase_C": 238.8,
//     "current_phase_A": 0,
//     "current_phase_B": 0,
//     "current_phase_C": 0,
//     "power_phase_A": 572,
//     "power_phase_B": 407,
//     "power_phase_C": 439,
//     "power_total": 1418,
//     "power_total_VA": 1418,
//     "frequency": 50
// }
var total_power=0 // sum of all powers3

if(this.devices.find(id=>id==this.data.id)){
    this.load_obj[this.data.id]={}
        this.load_obj[this.data.id]={
            power:this.data?.load[`power_total`]||0,
            percent:100*(this.data?.load[`power_total`])/this.total_power||0,
           }
 }//if

//  console.log(">>>>>this.load_obj:",this.load_obj)

//calculate total power
 for(const [id,value] of Object.entries(this.load_obj)){
    total_power+=this.load_obj[id].power/1000
 }//for

 var total_percent=total_power*100/(this.total_power/1000)

    return html`
      <div class="wrapper" >
        ${repeat(Object.keys(this.load_obj),id=>id,(id,index)=>html`
                <div class="load" style="--width:${this.load_obj[id].percent}%;--color-bg-pv:${colors_inverter[id]};"><span>${this.load_obj[id].power}W</span></div>       
            `)}
            <div class="total-text">Load: ${total_percent.toFixed(1)}%, ${total_power.toFixed(3)} kW</div> 
      </div>
    `
  }
}

window.customElements.define('m-load', Loadlement)
