import { LitElement, css, html, unsafeCSS } from 'lit'
import style from "./index.css?inline"// with { type: 'text' };
import "../notification/index.js"


export class BatteryElement extends LitElement {
  static get properties() {
    return {
      data: { type: Object },
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
    this.data = {}
  }

  firstUpdated(){
    // console.log(">>battery component ready!")
  }//first updated



      // "bms_sum": {
    //     "max_charge_voltage": 53.25,
    //     "max_discharge_voltage": 45,
    //     "max_charge_current": 1300,
    //     "max_discharge_current": 1980,
    //     "capacity": 80,
    //     "voltage": 50.1,
    //     "current": 109,
    //     "temparature": 16.7,
    //     "battery_alarm_position": 0,
    //     "battery_fault_location": 0,
    //     "battery_symbol": 0,
    //     "battery_type": 12,
    //     "battery_SOH": 0
    // },
  render() {

    const bms=this.data?.bms_sum||{}
    const power=bms.voltage&&bms.current?(bms.voltage*bms.current/1000).toFixed(3):"--"

    // <div class="battery-capacity" ></div>
    return html`
      <div class="wrapper" style="--soc:${bms.capacity||0}%;" ?discharging=${power<0} ?bat_low=${bms.capacity<30} ?bat_critical=${bms.capacity<10}>
        <div class="total-text">Batt: ${bms.capacity|"--"}%, ${power}kW, 🌡${bms.temparature|"--"}℃ <m-notification low-value=10 .value=${bms.capacity||0} interval=60></m-notification></div>
        
      </div>
    `
  }
}

window.customElements.define('m-battery', BatteryElement)
