
import "@components/battery/index.js"
import "@components/pv/index.js"
import "@components/load/index.js"
import "@components/generator/index.js"
import "@components/grid/index.js"
import "@components/inverters-colors/index.js"

window.addEventListener("load",async ()=>{
    console.log(">>>window loaded!!!")

    const elem_fullscreen_btn=document.body.querySelector("#fullscreen")
        elem_fullscreen_btn.addEventListener("click",showFullScreen)
})//onload

async function showFullScreen(e){
    console.log(">>>try: showFullScreen...",document.fullscreenElement)
   if (!document.fullscreenElement) {
        // Enter Fullscreen
        document.documentElement.requestFullscreen({navigationUI:"hide"}).catch((err) => {
          alert(`Error attempting to enable fullscreen: ${err.message}`)
        })
      } else {
        // Exit Fullscreen
        document.exitFullscreen()
      }
}//showFullScreen

// 1. Point to your Express/Python SSE endpoint
const evtSource = new EventSource("/api/sse")

// 2. Listen for generic messages
evtSource.onmessage = (event) => {
    // Data usually arrives as a JSON string
    const data = JSON.parse(event.data)
    // console.log("SSE message:", data)
    
    if(data.type=="live-stats"&& data.id=="master-id"){
        display_bms(data)

    }
    if(data.type=="live-stats"){
        display_pv(data)
        display_load(data)
        display_generator(data)
        display_gid(data)    
    }
    


}

// 3. Handle Errors (like the server going offline)
evtSource.onerror = (err) => {
    console.error("EventSource failed:", err);
    // The browser will automatically try to reconnect after a few seconds
}

function display_bms(data){
    const elem=document.body.querySelector("m-battery")
            elem.data=data
    const elem_date=document.body.querySelector("#update-date")
        elem_date.removeAttribute("wait","")
        elem_date.innerHTML=`Latest update: ${new Date(data.ctime).toLocaleTimeString()}`
        if(Math.abs(new Date()-new Date(data.ctime))>60000){elem_date.setAttribute("old-date","")}else{elem_date.removeAttribute("old-date")}

}//display_bms

function display_pv(data){
    const elem=document.body.querySelector("m-pv")
            elem.data=data
}//display_bms

function display_load(data){
    const elem=document.body.querySelector("m-load")
            elem.data=data
}//display_bms

function display_generator(data){
    const elem=document.body.querySelector("m-generator")
            elem.data=data
}//display_bms

function display_gid(data){
    const elem=document.body.querySelector("m-grid")
            elem.data=data
}//display_bms