import AccordianItem from './AccordianItem';

function Accordian({ data }) {
  console.log('faqs in Acc:', data);

  return (
    <div className='accordian'>
      {data.map((el, index) => (
        <AccordianItem
          key={index}
          num={index}
          title={el.title}
          text={el.text}
        />
      ))}
    </div>
  );
}

export default Accordian;
