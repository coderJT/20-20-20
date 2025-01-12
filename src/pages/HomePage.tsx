import { Link } from "react-router-dom";

function HomePage() {

  return (
    <>
        <div className="w-screen h-300 flex items-center justify-center gap-5 h-screen flex-col bg-green-400">
          <p className="text-5xl font-bold text-red-600">
            20-20-20
          </p>
          <p className="text-lg font-medium text-red-600">( An app to prevent eye strain )</p>
          <Link to="/timer">
            <button className="bg-red-600 text-white px-5 py-2 rounded-lg" >Timer</button>
          </Link>
          <Link to="/settings">
            <button className="bg-red-600 text-white px-5 py-2 rounded-lg" >Settings</button>
          </Link>
        </div>
    </>
  )
}

export default HomePage;
