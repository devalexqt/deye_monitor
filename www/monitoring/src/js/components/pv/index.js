import { LitElement, css, html, unsafeCSS } from 'lit'
import style from "./index.css?inline"// with { type: 'text' };
import {repeat} from 'lit/directives/repeat.js'
import colors_inverter from "../../inverter_colors.json"

export class PVElement extends LitElement {
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
    this.pv_obj={}//object to hold PVs data
  }

  firstUpdated(){
    // console.log(">>component ready, devices:",this.devices)

  }//first updated




// pv:
// current_PV1:0.4
// current_PV3:0
// current_PV4:0
// power_PV1:143
// power_PV2:265
// power_PV3:0
// power_PV4:0
// voltage_PV1:339.2
// voltage_PV2:305.3
// voltage_PV3:0
// voltage_PV4:0
  render() {
    // console.log(">>>devices:",this.devices)


////////////////// Create PVX list for all devices
// {
//     "master-id": {
//         "PV1": {
//             "power": 0,
//             "percent": "0.00"
//         },
//         "PV2": {
//             "power": 0,
//             "percent": "0.00"
//         },
//         "PV3": {
//             "power": 0,
//             "percent": "0.00"
//         },
//         "PV4": {
//             "power": 0,
//             "percent": "0.00"
//         }
//     },
//     "charger-id": {
//         "PV1": {
//             "power": 0,
//             "percent": "0.00"
//         },
//         "PV2": {
//             "power": 0,
//             "percent": "0.00"
//         },
//         "PV3": {
//             "power": 0,
//             "percent": "0.00"
//         },
//         "PV4": {
//             "power": 0,
//             "percent": "0.00"
//         }
//     },
//     "garazh-id": {
//         "PV1": {
//             "power": 0,
//             "percent": "0.00"
//         },
//         "PV2": {
//             "power": 14,
//             "percent": "0.04"
//         },
//         "PV3": {
//             "power": 0,
//             "percent": "0.00"
//         },
//         "PV4": {
//             "power": 0,
//             "percent": "0.00"
//         }
//     },
//     "pchelnik-id": {
//         "PV1": {
//             "power": 0,
//             "percent": "0.00"
//         },
//         "PV2": {
//             "power": 0,
//             "percent": "0.00"
//         },
//         "PV3": {
//             "power": 0,
//             "percent": "0.00"
//         },
//         "PV4": {
//             "power": 0,
//             "percent": "0.00"
//         }
//     }
// }
if(this.devices.find(id=>id==this.data.id)){
    this.pv_obj[this.data.id]={}
    for(const PV of ["PV1","PV2","PV3","PV4"]){
        this.pv_obj[this.data.id][PV]={
            power:this.data?.pv[`power_${PV}`]||0,
            percent:(100*(this.data?.pv[`power_${PV}`]/1000)/this.total_power).toFixed(1)||0,
           }
    }//for pv
    }//if

    //FIXME: also dosplay total poer of all inverters
//calculate total power
var total_power=0
 for(const [id,value] of Object.entries(this.pv_obj)){
    for(const PV of ["PV1","PV2","PV3","PV4"]){
        total_power+=this.pv_obj[id][PV].power
    }//for
 }//for

 var total_percent=total_power*100/(this.total_power/1000)

    return html`
      <div class="wrapper" >
        ${repeat(Object.keys(this.pv_obj),id=>id,(id,index)=>html`
                <div class="pv pv1" style="--width:${this.pv_obj[id]["PV1"].percent}%;--color-bg-pv:${colors_inverter[id]};"><div>PV1:</div><div>${this.pv_obj[id]["PV1"].power}kW</div></div>       
                <div class="pv pv2" style="--width:${this.pv_obj[id]["PV2"].percent}%;--color-bg-pv:${colors_inverter[id]};"><div>PV2:</div><div>${this.pv_obj[id]["PV2"].power}kW</div></div>                   
            `)}
            <div class="total-text">Solar: ${total_percent.toFixed(1)}%, ${total_power.toFixed(3)} kW</div> 
      </div>
    `
  }
}

window.customElements.define('m-pv', PVElement)
