// pages/index.tsx
import { trpc } from "@/utils/trpc";

const Home = () => {
  const { data } = trpc.hello.useQuery({text:"Client !!!"});
  const videoGames = trpc.getAllVideoGames.useQuery();
  const logToServer = trpc.logToServer.useMutation();
  
  return (
    <div>
      <h1>{data?data.greeting:"Loading..."}</h1>
      <button onClick={()=> logToServer.mutate({text:"budi"})}>Touch Me</button>
      <h1>Video Games List</h1>
      <ul>
      <ul>
        {videoGames.data?.map((game) => (
          <li key={game.id}>
            {game.title} - High Score: {game.high_score}
          </li>
        ))}
      </ul>
      </ul>
    </div>
  );
};



export default Home;