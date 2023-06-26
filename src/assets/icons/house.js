const svg =  (`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect
width="256" height="256" fill="none"/><path
d="M133.38,34.08a8,8,0,0,0-10.77,0l-80,75.54A8,8,0,0,0,40,115.54V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V115.54a8,8,0,0,0-2.62-5.92Z"
fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
stroke-width="16"/></svg>`);

export default function House ({ className }) {
  return (<span class={className} bind:html={svg} />)
}