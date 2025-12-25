import { LitElement, css, html, unsafeCSS } from 'lit'
import style from "./index.css?inline"// with { type: 'text' };
import {repeat} from 'lit/directives/repeat.js'
import colors_inverter from "../../inverter_colors.json"

export class Gridlement extends LitElement {
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
//     "grid_voltage_phase_A": 0,
//     "grid_voltage_phase_B": 0,
//     "grid_voltage_phase_C": 0,
//     "gird_voltage_phase_AB": 0,
//     "gird_voltage_phase_BC": 0,
//     "gird_voltage_phase_AC": 0,
//     "gird_power_phase_A": 0,
//     "gird_power_phase_B": 0,
//     "gird_power_phase_C": 0,
//     "gird_power_total": 0,
//     "gtid_power_total_inside": 0,
//     "frequency": 0,
//     "grid_side_inner_current_phase_A": 0,
//     "grid_side_inner_current_phase_B": 0,
//     "grid_side_inner_current_phase_C": 0.02,
//     "grid_out_current_A": 0.03,
//     "grid_out_current_B": 0.05,
//     "grid_out_current_C": 0.15,
//     "grid_out_power_phase_A": 0,
//     "grid_out_power_phase_B": 0,
//     "grid_out_power_phase_C": 0,
//     "grid_out_power_total": 0,
//     "grid_out_power_total_VA": 0,
//     "grid_power_factor": 65535,
//     "gird_power_phase_A_2": 0,
//     "gird_power_phase_B_2": 0,
//     "gird_power_phase_C_2": 0,
//     "gird_power_total_2": 0
// }
var total_power=0 // sum of all powers3

if(this.devices.find(id=>id==this.data.id)){
    this.load_obj[this.data.id]={}
        this.load_obj[this.data.id]={
            power:this.data?.grid[`gird_power_total`]||0,
            percent:(100*(this.data?.generator[`gird_power_total`]/1000)/this.total_power).toFixed(1)||0,
           }
 }//if

//calculate total power
 for(const [id,value] of Object.entries(this.load_obj)){
    total_power+=this.load_obj[id].power/1000
 }//for

 var total_percent=total_power*100/(this.total_power)

    return html`
      <div class="wrapper" >
        ${repeat(Object.keys(this.load_obj),id=>id,(id,index)=>html`
                <div class="load" style="--width:${this.load_obj[id].percent}%;--color-bg-pv:${colors_inverter[id]};"><span>${this.load_obj[id].power}W</span></div>       
            `)}
            <div class="total-text">Grid: ${total_percent.toFixed(1)}%, ${(total_power/1000).toFixed(3)} kW</div> 
      </div>
    `
  }
}

window.customElements.define('m-grid', Gridlement)
