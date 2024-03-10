"use client";

import { CardGallery } from "@/components/ui/CardGallery";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [pokemon, setPokemon] = useState<String[]>([""]);

  const formSchema = z.object({
    pokemon: z.string().min(2, {
      message: "Pokemon must be at least 2 characters.",
    }),
  });

  function ProfileForm() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        pokemon: "",
      },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
      setPokemon([...pokemon, values.pokemon]);
      console.log(pokemon);
    }
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="pokemon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pokemon Name</FormLabel>
                <FormControl>
                  <Input placeholder="ENTER A FUCKING POKEMON" {...field} />
                </FormControl>
                <FormDescription>Enter a Fucking Pokemon Name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Fucking Submit that Shit</Button>
        </form>
      </Form>
    );
  }

  return (
    <>
      <div className="p-10">
        <ProfileForm />
      </div>

      <div className="p-15">
        <CardGallery />
      </div>
    </>
  );
}
