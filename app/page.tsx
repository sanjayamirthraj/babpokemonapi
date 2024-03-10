"use client";

import { CardGallery } from "@/components/ui/CardGallery";
import Image from "next/image";
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
import { Card } from "@/components/ui/card";
import { LampDemo } from "@/components/lamp";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function Home() {
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
      console.log(values.pokemon);
    }
    return (
      <div className="flex flex-col items-center justify-between p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="pokemon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Pokemon Name(This does not work yet, need to learn dynamic
                    Data Fetching)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="ENTER A POKEMON" {...field} />
                  </FormControl>
                  <FormDescription>Enter a Pokemon Name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit"> Submit that Rn</Button>
          </form>
        </Form>
      </div>
    );
  }

  return <CardGallery />;
}
