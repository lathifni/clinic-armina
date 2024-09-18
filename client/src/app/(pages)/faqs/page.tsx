import { NextPage } from "next";

interface Props {}

const Faqs: NextPage<Props> = ({}) => {
  return (
    
    <section className="container py-16 space-y-4">
      <header className="border-b font-bold text-2xl">
        <h2>FAQs</h2>
      </header>
      <section className="space-y-2">
        <details className="text-lg space-y-2">
          <summary className="before:content=[''] font-bold cursor-pointer after:content-['>'] after:font-medium after:transition-transform after:duration-300 flex justify-between items-center w-full open:after:rotate-90">
            Lorem ipsum dolor sit amet consectetur. Adipiscing cras ullamcorper
            elementum in neque in in quis
          </summary>
          <p>
            Lorem ipsum dolor sit amet consectetur. Eget aliquam laoreet
            scelerisque feugiat viverra tellus massa sollicitudin convallis.
            Proin faucibus in arcu cras vitae. Rutrum nibh nec in tempor id arcu
            massa tincidunt in. Ultricies risus tristique diam nibh dolor enim
            cursus tellus. Posuere ornare maecenas id integer natoque. Pulvinar
            commodo mauris sagittis morbi et adipiscing magna metus. Arcu
            egestas viverra orci nec mollis leo nunc tellus. Varius aliquet
            egestas sit in augue. Leo rhoncus lobortis tristique mi nibh. Purus
            pharetra iaculis cursus vel. Amet condimentum pellentesque mattis
            adipiscing vivamus.
          </p>
        </details>
      </section>
    </section>
  );
};

export default Faqs;
