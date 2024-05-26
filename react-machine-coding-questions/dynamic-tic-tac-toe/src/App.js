import Game from "./components/Game";
import Text from "./components/common/Text";
function App() {
  return (
    <div className="flex justify-center p-3 flex-col">
      <Text classes="font-bold text-cyan-400 text-2xl text-center my-3" text='TIC TAC TOE' variant="p"/> 
      <Game/>
    </div>
  );
}

export default App;
