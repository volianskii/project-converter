import '../style/style.scss';
import img from '../images/1.png';
import img2 from '../images/boat.svg';

type AppProps = {
  name: string;
}

export const App = ({ name }: AppProps) => {
  return (
    <div>
      <h1>React TypeScript WebPack starter {name}</h1>
      <img src={img} alt="people" />
      <img src={img2} alt="boat" />
    </div>
  )
}
