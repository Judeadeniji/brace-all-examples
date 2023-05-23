import { DynamicView } from "brace-jsx"

export default function Grids() {
    function updateItemSize(entry) {
    const containerHeight = entry.contentRect.height;
    const itemHeight = 30; // Assume item height is fixed at 30px
    const numItems = Math.floor(containerHeight / itemHeight);
    document.documentElement.style.setProperty('--num-items', numItems);
  }

  function handler(resizableDiv) {
    DynamicView(resizableDiv, updateItemSize);
  }

  return (
 <div class="dropdown" bind:this={handler}>
  <button>Dropdown Button</button>
  <ul class="dropdown-menu">
    <li>Option 1</li>
    <li>Option 2</li>
    <li>Option 3</li>
    <li>Option 4</li>
    <li>Option 5</li>
    <li>Option 6</li>
    <li>Option 7</li>
    <li>Option 8</li>
    <li>Option 9</li>
    <li>Option 10</li>
    <li>Option 11</li>
    <li>Option 12</li>
  </ul>
</div>
  )
}


 