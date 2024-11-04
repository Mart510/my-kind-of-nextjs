import { Outfit } from 'next/font/google'

// component imports
import PopularCruises from "./_components/Cruisescards";
import MyAdventures from "./_components/adventureCards";


export default function Home() {
  return (
    <div className="max-w-full">
      <main className="items-center w-full px-24 pt-12">
        <MyAdventures/>
        <PopularCruises/>
      </main>
    </div>
  );
}
