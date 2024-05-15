import { json } from "stream/consumers";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { resolve } from "path";


interface Recipe {
  title: string,
  image: string,
  time: number,
  description: string,
  vegan: boolean,
  id: string
}

async function getRecipes(): Promise<Recipe[]>{
  const result = await fetch(`http://localhost:3001/recipes`)

  // delay response
  await new Promise((resolve) => setTimeout(resolve, 3000))

  return result.json()
}

export default async function Home() {
  const recipes = await getRecipes()

  return (
    <main>
        <div className="grid grid-cols-3 gap-8">
          {recipes.map(recipes => (
            <Card key={recipes.id} className="flex flex-col justify-between">
              <CardHeader className="flex-row gap-4 items-center">
                <Avatar>
                  <AvatarImage src={`/img/${recipes.image}`} alt="recipe img"/>
                  <AvatarFallback>
                    {recipes.title.slice(0,2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{recipes.title}</CardTitle>
                  <CardDescription>{recipes.time} mins to cook.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>{recipes.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button>View Recipe</Button>
                {recipes.vegan && <Badge variant="secondary">vegan!!</Badge>}
              </CardFooter>
            </Card>
            ))}
        </div>
    </main>
  );
}
