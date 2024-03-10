import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

function maketUppercaseFirst(words: String) {
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export async function CardGallery() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/charizard");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Pokemon Does Not Exist", error);
  }
  //keeping this outside the try catch for error stuff I can find a way to simplify this because in the try catch, the data name is not recognized
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/charizard");
  const data = await response.json();
  const pokemonName = maketUppercaseFirst(data.name);
  const pokemonImage = data.sprites.other["official-artwork"].front_default;
  const pokemonImageShiny = data.sprites.other["official-artwork"].front_shiny;
  const pokemonType = data.types[0].type.name;
  const pokemonSecondType = data.types[1]?.type.name;
  const pokemonID = data.id;
  return (
    <Card className=" ">
      <CardHeader>
        <CardTitle>Fuck yeah it&apos;s a {pokemonName}</CardTitle>
        <CardDescription className="font-bold">
          Its&apos;s a FUCKING {pokemonType} {pokemonSecondType} type
        </CardDescription>
      </CardHeader>
      <CardContent className="grid-cols-2	">
        <div className="grid mx-auto grid-cols-2">
          <div>
            <img
              src={pokemonImage}
              alt="This is a Pokemon"
              width={150}
              height={150}
            />
            Non Shiny and Shit
          </div>
          <div>
            <img
              src={pokemonImageShiny}
              alt="This is a Pokemon"
              width={150}
              height={150}
            />
            Shiny Version and Shit
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p>This is Pokemon number fucking {pokemonID}</p>
      </CardFooter>
    </Card>
  );
}