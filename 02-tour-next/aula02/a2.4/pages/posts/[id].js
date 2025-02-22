import NextLink from 'next/link';
import { Box, Text } from '@skynexui/components';
import { useRouter } from 'next/router';

// dica dos paths estáticos
export async function getStaticPaths() {
  // const dadosDaAPI = await fetch('https://fakeapi-omariosouto.vercel.app/api/posts')
  //   .then((res) => res.json());

  // const paths = dadosDaAPI.posts.map((postAtual) => {
  //   return { params: { id: `${postAtual.id}` } };
  // })

  return {
    // paths: paths,
    paths: [],
    // caso fallback seja false, ele só renderiza as rotas que estão dentro de Path (getStaticProps)
    // caso esteja true, ele renderiza rotas que vem dinamicamente da url, porém do lado cliente (bom para colocar mensagem de loading). Depois ele salva em cache e as entrega na proxima vez como estática 
    // caso esteja blocking, ele renderiza rotas que vem dinamicamente da url, mas do lado do servidor, ou seja, já entra a pagina pronta (melhor para CEO) 
    fallback: true // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  console.log(`Gerou! ${id}`);
  
  const dadosDaAPI = await fetch(`https://fakeapi-omariosouto.vercel.app/api/posts/${id}`)
  .then((res) => res.json());
  const post = dadosDaAPI;
  // const post = dados.posts.find((currentPost) => {
  //   if(currentPost.id === id) {
  //     return true;
  //   }
  //   return false;
  // })


  return {
    props: {
      id: post.id,
      title: post.title,
      date: post.date,
      content: post.content,
    }, 
    revalidate: 60, //a cada 60 segundos, ele refaz novamente o getStaticProps para ver se teve alguma alteração
  }
}

export default function PostByIdScreen(props) {
  const router = useRouter();
  const post = {
    title: props.title,
    date: props.date,
    content: props.content,
  };

  if(router.isFallback) {
    return 'Essa página não existe, ainda!!';
  }

  return (
    <Box
      styleSheet={{
        flexDirection: 'column',
        margin: '32px auto',
        maxWidth: '700px',
        paddingHorizontal: '16px',
      }}
    >
      {/* Cabeçalho */}
      <Text
        variant="heading2"
        tag="h1"
        styleSheet={{ color: '#F9703E', justifyContent: 'center', lineHeight: '1.2' }}
      >
        {post.title}
      </Text>
      <Text styleSheet={{ color: '#F9703E', justifyContent: 'center', borderBottom: '1px solid #F9703E', paddingVertical: '16px', marginVertical: '16px' }}>
        {post.date}
      </Text>

      {/* Área de Conteudo */}
      <Box
        styleSheet={{
          flexDirection: 'column',
        }}
      >
        <Text>
          {post.content}
        </Text>

        {post.video && <iframe style={{ marginTop: '32px', minHeight: '400px' }} src={post.video} /> }
      </Box>


      {/* Rodapé */}
      <Box
        styleSheet={{
          marginTop: '16px',
          paddingVertical: '16px',
          borderTop: '1px solid #F9703E',
          color: '#F9703E',
        }}
      >
        <NextLink href="/" passHref>
          <Text tag="a" styleSheet={{ hover: { textDecoration: 'underline' } }}>
            Voltar para a home
          </Text>
        </NextLink>
      </Box>
    </Box>
  )
}
