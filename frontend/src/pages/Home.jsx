import Header from "../Components/Header";
import Animate from "../animate";

function Home() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-950 dark:text-white">
      <Header />

      {/* CONTENT AREA */}
      <div>
        <Animate />
      </div>
    </div>
  );
}

export default Home;
