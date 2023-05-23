import { memo } from "brace-jsx";
import { Suspense } from "brace-jsx/controls";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/home/Hero";
import Content from "./components/home/Content";

export const Loader = memo(function() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#000'
    }}>
    <h2 animate={{
      keyframes: [
      {opacity: '1'},
      {opacity: '0.4'},
      {opacity: '1'},
      ],
      options: {
        duration: 1000,
        iterations: Infinity,
        fill: 'forwards'
      }
    }}>• • •</h2>
    </div>
    )
})

const Home = async () => {
  const { default: Content } = await import("./components/home/Content");
  return <Content key="Home" />
}

function App() {
  return (
    <div key="4848">
      <Header name="BraceJs"/>
        <Hero key="hero" />
        <Content />
       {/*<Suspense fallback={<Loader key='loader' />} debounce={4000}>
        <Home key="home"/>
       </Suspense>*/}
       <Footer />
    </div>
  );
}

export default App;
