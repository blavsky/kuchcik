import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Odkrywaj i udostępniaj
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> NAJLEPSZE PRZEPISY </span>
    </h1>
    <p className='desc text-center'>
      Kuchcik to strona od fanatyka kulinariów dla fanatyków kulinariów. Odkrywaj nowe przepisy, zapisuj własne, a przede wszystkim - jedz ze smakiem!
    </p>

    <Feed />
  </section>
);

export default Home;
