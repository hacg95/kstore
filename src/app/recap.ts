const username: string = "__hacg__";

const sum = (a: number, b: number) => {
  return a+b;
}
sum(3,7);

class Person {
  age: number;
  lastName: string;

  constructor(age: number, lastName: string){
    this.age = age;
    this.lastName = lastName;
  }
}

const Harold = new Person(26, "Carrillo")

class Pet {
  constructor(public name: string, public animal: string) {}
}

const Molly = new Pet("Molly", "Cat")
