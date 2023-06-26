var svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M32,72H95.06a8,8,0,0,1,7.15,4.42l51.58,103.16a8,8,0,0,0,7.15,4.42H224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="18"/><line x1="152" y1="72" x2="224" y2="72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="18"/></svg>`

var svg2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect
width="256" height="256" fill="none"/><line x1="96" y1="64" x2="216" y2="64"
fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
stroke-width="16"/><line x1="96" y1="128" x2="216" y2="128" fill="none"
stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
stroke-width="16"/><line x1="96" y1="192" x2="216" y2="192" fill="none"
stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
stroke-width="16"/><line x1="40" y1="64" x2="56" y2="64" fill="none"
stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
stroke-width="16"/><line x1="40" y1="128" x2="56" y2="128" fill="none"
stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
stroke-width="16"/><line x1="40" y1="192" x2="56" y2="192" fill="none"
stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
stroke-width="16"/></svg>`

export function Menu1({ className }) {
  return (<span class={className} bind:html={svg} />)
}
export function Menu2({ className }) {
  return (<span class={className} bind:html={svg2} />)
}