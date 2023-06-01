import Link from "next/link";

const Form = ({ post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>Dodaj swój własny przepis!</span>
      </h1>
      <p className='desc text-left max-w-md'>
        Dzięki temu formularzowi możesz sprawnie i szybko pochwalić się ulubionym przepisem z innymi!
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Podaj nazwę dania
          </span>
          <input
            value={post.nazwa}
            onChange={(e) => setPost({ ...post, nazwa: e.target.value })}
            type='text'
            placeholder='Wpisz tutaj nazwę dania'
            required
            className='form_input'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Dodaj składniki
          </span>

          <textarea
            value={post.skladniki}
            onChange={(e) => setPost({ ...post, skladniki: e.target.value })}
            placeholder='Wpisz tutaj składniki potrzebne do wykonania przepisu'
            required
            className='form_textarea '
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Wprowadź instrukcje
          </span>

          <textarea
            value={post.instrukcje}
            onChange={(e) => setPost({ ...post, instrukcje: e.target.value })}
            placeholder='Napisz krok po kroku jak stworzyć twoje danie'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Podaj liczbę porcji
          </span>
          <input
            value={post.liczbaPorcji}
            onChange={(e) => setPost({ ...post, liczbaPorcji: e.target.value })}
            type='text'
            placeholder='Na ile porcji przygotowane jest danie?'
            required
            className='form_input'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Podaj czas przygotowania
          </span>
          <input
            value={post.czasPrzygotowania}
            onChange={(e) => setPost({ ...post, czasPrzygotowania: e.target.value })}
            type='text'
            placeholder='Ile minut zajmuje stworzenie dania?'
            required
            className='form_input'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Podaj zdjęcie dania
          </span>
          <input
            value={post.zdj}
            onChange={(e) => setPost({ ...post, zdj: e.target.value })}
            type='text'
            placeholder='Wklej tu link do zdjęcia dania'
            required
            className='form_input'
          />
        </label>
        

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Anuluj
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? "Dodawanie" : "Dodaj"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
