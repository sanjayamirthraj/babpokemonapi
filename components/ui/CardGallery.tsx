import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

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
      const pokemonSprite = data.sprites.front_default;
      const pokemonAbility = data.abilities[0].ability.name;
      const pokemonHealthStats = data.stats[0].base_stat;
      const pokemonAttackStats = data.stats[1].base_stat;
      const pokemonDefenseStats = data.stats[2].base_stat;
      const pokemonSpattackStats = data.stats[3].base_stat;
      const pokemonSpDefenseStats = data.stats[4].base_stat;
      const pokemonSpeedStats = data.stats[5].base_stat;
      return (
        <div
          key={pokemon}
          className=" p-3 grid grid-cols-1 mx-auto place-items-center"
        >
          <Card key={pokemon}>
            <CardHeader>
              <CardTitle>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">{pokemonName}</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{pokemonName}</AlertDialogTitle>
                      <AlertDialogDescription className="grid grid-col-3">
                        <img src={pokemonSprite} alt="sprite of pokemon"></img>
                        <p>
                          <b>Height:</b> {data.height} Meters or Feet idk
                        </p>
                        <p>
                          <b>Ability:</b> {maketUppercaseFirst(pokemonAbility)}
                        </p>
                        <p>
                          <b>Base Stats:</b>
                        </p>
                        <ul>
                          <li>Health: {pokemonHealthStats}</li>
                          <li>Attack: {pokemonAttackStats}</li>
                          <li>Defense: {pokemonDefenseStats}</li>
                          <li>Sp. Attack: {pokemonSpattackStats}</li>
                          <li>Sp. Defense: {pokemonSpDefenseStats}</li>
                          <li>Speed: {pokemonSpeedStats}</li>
                        </ul>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Close</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardTitle>
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
