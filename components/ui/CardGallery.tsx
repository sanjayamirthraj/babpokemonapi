import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function maketUppercaseFirst(words: String) {
  return words.charAt(0).toUpperCase() + words.slice(1);
}

type CardProps = React.ComponentProps<typeof Card>;

export async function CardGallery({
  stringList,
}: CardProps & { stringList: string[] }) {
  const cards = await Promise.all(
    stringList.map(async (pokemon) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      const data = await response.json();
      const pokemonName = maketUppercaseFirst(data.name);
      const pokemonImage = data.sprites.other["official-artwork"].front_default;
      const pokemonImageShiny =
        data.sprites.other["official-artwork"].front_shiny;
      const pokemonType = data.types[0].type.name;
      const pokemonSecondType = data.types[1]?.type.name;
      const pokemonID = data.id;
      return (
        <div
          key={pokemon}
          className=" p-3 grid grid-cols-1 mx-auto place-items-center"
        >
          <Card key={pokemon}>
            <CardHeader>
              <CardTitle>{pokemonName}</CardTitle>
              <CardDescription className="font-bold">
                Its&apos;s a {pokemonType} {pokemonSecondType} type
              </CardDescription>
            </CardHeader>
            <CardContent className="grid-cols-2	">
              <div className="grid mx-auto grid-cols-2">
                <div className="p-10">
                  <img
                    src={pokemonImage}
                    alt="This is a Pokemon"
                    width={150}
                    height={150}
                  />
                  Non Shiny Version
                </div>
                <div className="p-10">
                  <img
                    src={pokemonImageShiny}
                    alt="This is a Pokemon"
                    width={150}
                    height={150}
                  />
                  Shiny Version
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p>This is Pokemon number {pokemonID}</p>
            </CardFooter>
          </Card>
        </div>
      );
    })
  );

  return <div className="m-15">{cards}</div>;
}
