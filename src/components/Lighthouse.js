import { createData } from "brace-jsx"

const isOn = createData(false)

function Bulb() {
  const handleClick = () => {
    isOn.update(state => !state);
  };
  
  const sunMoonSet = {
    keyframes: [
      {opacity: 0},
      {transform: 'translateY(1000px)', opacity: 0},
      {transform: 'translateY(-20px)', opacity: 1},
      {transform: 'translateY(0)', opacity: 1},
      ],
    options: {
      duration: 1000,
      easing: 'ease-in-out',
      fill: "forwards"
    }
  }
 
  return (
    <div className="flex flex-col items-center justify-center h-screen transition-all duration-200"
    style:background-color={isOn() ? "#121212" : "#feec066e"}
    style:margin="0"
    >
      <div
        className={`toggle-switch ${isOn() ? "toggle-switch-on" : "toggle-switch-off"}`}
        click$={handleClick}
      >
        <div className="toggle-switch-slider" />
      </div>
      <div className="mt-9" animate={sunMoonSet} style:opacity="0">
        <span
          className={`text-8xl animate-bounce duration-500 bi ${!isOn() ? "bi-sun" : "bi-moon"}`}
          class:is-on={isOn() ? true : "is-off"}
        />
      </div>
    </div>
  );
}

export default Bulb;
