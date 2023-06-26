var svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect
width="256" height="256" fill="none"/><path
d="M79.93,211.11a96,96,0,1,0-35-35h0L32.42,213.46a8,8,0,0,0,10.12,10.12l37.39-12.47Z"
fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
stroke-width="16"/></svg>`

var svgFill = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256
256"><rect width="256" height="256" fill="none"/><path
d="M232,64V192a16,16,0,0,1-16,16H82.5L50.42,236.11a.69.69,0,0,1-.13.11A15.89,15.89,0,0,1,40,240a16.05,16.05,0,0,1-6.79-1.52A15.84,15.84,0,0,1,24,224V64A16,16,0,0,1,40,48H216A16,16,0,0,1,232,64Z"/></svg>`

export function ChatCircle({ className }) {
  return (<span class={className} bind:html={svg} />)
}

export function ChatFill({ className }) {
  return (<span class={className} bind:html={svgFill} />)
}