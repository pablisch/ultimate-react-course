import { useState } from "react"
import AccordianItem from './AccordianItem';

function Accordian({ data }) {

  const [curOpen, setCurOpen] = useState(null);

  return (
    <div className='accordion'>
      {data.map((el, index) => (
        <AccordianItem
          curOpen={curOpen}
          setCurOpen={setCurOpen}
          key={index}
          num={index}
          title={el.title}
        >{ curOpen === index && <div className="content-box">{el.text}</div>}</AccordianItem>
      ))}
    </div>
  );
}

export default Accordian;
