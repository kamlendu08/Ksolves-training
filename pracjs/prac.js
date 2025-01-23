let arr = [1, 2, 2, 3, 4];
let a = arr.at(0);
console.log(a);
arr.pop();
console.log(arr);
let s = "string";
let obj = { name: "kamlendu Bala", age: 23 };
class User {
  constructor(name, age) {
    this.name = name,
      this.age = age
  }
  render(user) {
    console.log(`name of user is ${this.name} and age is ${this.age}`);

  }
  update(name, age) {
    this.age = age;
    this.name = name;
    let user = { name, age };
    this.render(user);
  }
}


let u1 = new User("bala", 24);
u1.render();


let data = {
  name: "aksd",
  age: 32,
  add: "dsklfasdlkfjlsdkfjsdkl"
}

data = JSON.stringify(data);
console.log(data);
data = JSON.parse(data);
console.log(data);


fetch("https://jsonplaceholder.typicode.com/todos/1").
  then(res => res.json()).then(res => console.log(res));

























