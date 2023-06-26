const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="108" cy="100" r="60" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="16"/><path d="M24,200c20.55-24.45,49.56-40,84-40s63.45,15.55,84,40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="216" cy="136" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="216" y1="120" x2="216" y2="108" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="202.14" y1="128" x2="191.75" y2="122" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="202.14" y1="144" x2="191.75" y2="150" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="216" y1="152" x2="216" y2="164" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="229.86" y1="144" x2="240.25" y2="150" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="229.86" y1="128" x2="240.25" y2="122" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`
var svg2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect
width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96"
fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
stroke-width="16"/><circle cx="128" cy="120" r="40" fill="none"
stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
stroke-width="16"/><path d="M63.8,199.37a72,72,0,0,1,128.4,0" fill="none"
stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
stroke-width="16"/></svg>`
var svg3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="128" cy="96" r="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M32,216c19.37-33.47,54.55-56,96-56s76.63,22.53,96,56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`


export function UserCircle ({ className }) {
  return (<span class={className} bind:html={svg2} />)
}

export function User ({ className }) {
  return (<span class={className} bind:html={svg3} />)
}

export default function UserGear ({ className }) {
  return (<span class={className} bind:html={svg} />)
}
