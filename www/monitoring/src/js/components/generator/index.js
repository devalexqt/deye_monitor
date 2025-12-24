import { LitElement, css, html, unsafeCSS } from 'lit'
import style from "./index.css?inline"// with { type: 'text' };
import {repeat} from 'lit/directives/repeat.js'
import colors_inverter from "../../inverter_colors.json"

export class Generatorlement extends LitElement {
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
//     "voltage_phase_A": 0.5,
//     "voltage_phase_B": 0.5,
//     "voltage_phase_C": 0.2,
//     "power_phase_A": 0,
//     "power_phase_B": 0,
//     "power_phase_C": 0,
//     "power_total": 0
// }
var total_power=0 // sum of all powers3

if(this.devices.find(id=>id==this.data.id)){
    this.load_obj[this.data.id]={}
        this.load_obj[this.data.id]={
            power:this.data?.generator[`power_total`]||0,
            percent:(100*(this.data?.generator[`power_total`]/1000)/this.total_power).toFixed(1)||0,
           }
 }//if

//calculate total power
 for(const [id,value] of Object.entries(this.load_obj)){
    total_power+=this.load_obj[id].power/1000
 }//for

 var total_percent=total_power*100/(this.total_power/1000)

    return html`
      <div class="wrapper" >
        ${repeat(Object.keys(this.load_obj),id=>id,(id,index)=>html`
                <div class="load" style="--width:${this.load_obj[id].percent}%;--color-bg-pv:${colors_inverter[id]};"><span>${this.load_obj[id].power}kW</span></div>       
            `)}
            <div class="total-text">Generator: ${total_percent.toFixed(1)}%, ${total_power.toFixed(3)} kW</div> 
      </div>
    `
  }
}

window.customElements.define('m-generator', Generatorlement)
