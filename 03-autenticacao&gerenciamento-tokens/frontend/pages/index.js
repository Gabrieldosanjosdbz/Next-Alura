import {useState} from 'react';
import { useRouter } from 'next/router';

export default function HomeScreen() {
  const router = useRouter()
  const [values, setValues] = useState({
    usuario: 'omariosouto',
    senha: 'safepassword',
  });

  function handleChange(event){
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    setValues((currentValues) => ({...currentValues, [fieldName]: fieldValue}))
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(event) => {
        event.preventDefault();

        router.push('/auth-page-ssr')
        // router.push('/auth-page-static')
      }}>
        <input
          placeholder="Usuário" name="usuario"
          values={values.usuario}
          onChange={handleChange}
        />
        <input
          placeholder="Senha" name="senha" type="password"
          values={values.senha}
          onChange={handleChange}
        />
        {/* <pre>
          {JSON.stringify(values, null, 2)}
        </pre> */}
        <div>
          <button>
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
