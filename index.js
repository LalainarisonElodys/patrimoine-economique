import { readFile, writeFile } from "./data/index.js";
import Patrimoine from "./models/Patrimoine.js";
import Personne from "./models/Personne.js";
//import Flux from "./models/possessions/Flux.js";
import Possession from "./models/possessions/Possession.js";
const john = new Personne("John Doe");
/*
const macBookPro = new Possession(john, "MacBook Pro", 4000000, new Date("2023-12-25"), null, 5);
const salaire = new Flux(john,"Alternance",500_000,new Date("2023-1-1"),null,null,1);
const traindevie = new Flux(john,"Survie",-300_000,new Date("2023-1-1"),null,null,2)
*/
const Possessions = [
  new Possession(john, "MacBook Pro", 4000000,"2024-08-09",null,5), 
  new Possession(john,"Alternance",900000,"2024-08-09",null,null,1),
  new Possession(john,"Survie",-350000,"2024-08-09",null,null,2),
];//[macBookPro,salaire,traindevie];

export const valeur=[
  { "model": "Personne", "data": { "nom": john } },
  { "model": "Patrimoine","data": { "nom": john}, possessions: Possessions}
]

export const johnPatrimoine  = new Patrimoine(john, Possessions);

/*
johnPatrimoine.addPossession(macBookPro);
johnPatrimoine.addPossession(salaire);
johnPatrimoine.addPossession(traindevie);

/*
function save(personne, patrimoine, possessions) {
  const file = []
  file.push({
    model: "Personne",
    data: personne
  })
  file.push({
    model: "Patrimoine",
    data: patrimoine
  })
  return writeFile("./fileManager/data.json", file)

}
function read() {
  return readFile("./fileManager/data.json")
}

export {save, read}
*/

console.log(Math.round(johnPatrimoine.getValeur("2024-08-09")));

writeFile("./data/data.json", valeur)
.then(data => console.log(data))
.catch(function(err) {console.log(err);
})