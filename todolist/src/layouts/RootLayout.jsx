import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <header>
        <h1>Todo</h1>
      </header>
      <main>
        <Outlet /> 
      </main>
    </div>
  );
}

export default RootLayout;
