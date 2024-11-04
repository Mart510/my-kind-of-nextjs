import Image from "next/image";
import MyAdventures from "./_components/adventureCards";
import PopularCruises from "./_components/Cruisescards";

// component imports


export default function Home() {
  return (
    <div className="max-w-full">
      <main className="items-center w-full px-24 pt-12">
        <MyAdventures/>
        <PopularCruises/>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
