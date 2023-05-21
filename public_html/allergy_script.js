const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Accept-Encoding': 'gzip,deflate',
  'user_key': 'only_for_dev_or_pro',
  'key_type': '3scale'
};

const refnum = "0028400084048"; //change this to the variable

fetch('https://api.upcitemdb.com/prod/trial/lookup?upc=' + refnum, {
  method: 'GET',
  headers: headers
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data
    console.log(data);
  })
  .catch(error => {
    // Handle the error
    console.error(error);
  });


//parsing
const data = JSON.parse(resp.text);
const items = data.items;


//ingred
let ingredients = [];
for (let item of items) {
  let description = item['description'];
  //Split the description by comma, '(', or ')' to extract the ingredients
  let itemIngredients = description.split(/,|\(|\)/).map(ingredient => ingredient.trim());
  ingredients.push(...itemIngredients);
}

//Print the extracted ingredients
ingredients = ingredients.map(x => x.toLowerCase());
ingredients = [...new Set(ingredients)];
console.log(ingredients);


//allergies
let gluten_allergy = ['wheat flour', 'wheat starch', 'wheat bran', 'wheat germ', 'wheat protein isolate', 'barley malt', 'barley flour', 'barley extract', 'barley malt vinegar', 'rye flour', 'rye bread', 'rye extract', 'rye malt', 'Triticale', 'Semolina', 'Bulgur', 'milk', 'malt vinegar', 'malt extract', 'malt syrup', 'Hydrolyzed wheat protein', 'maltodextrin'];
gluten_allergy = gluten_allergy.map(x => x.toLowerCase());
gluten_allergy = new Set(gluten_allergy);

let milk_allergy = ['Lactose', 'milk powder', 'condensed milk', 'evaporated milk', 'buttermilk', 'cheddar', 'mozzarella', 'feta', 'Parmesan', 'Butter', 'clarified butter (ghee)', 'Heavy cream', 'light cream', 'whipped cream', 'sour cream', 'Ice cream', 'gelato', 'sherbet', 'Whey casein', 'whey powder', 'caseinates', 'lactose', 'cakes', 'cookies', 'pastries', 'bread', 'whey'];
milk_allergy = milk_allergy.map(x => x.toLowerCase());
milk_allergy = new Set(milk_allergy);

let tree_nut_allergy = ['Almonds', 'Brazil nuts', 'Cashews', 'Hazelnuts (also known as filberts)', 'Macadamia nuts', 'Pecans', 'Pistachios', 'Walnuts', 'Pine nuts', 'Chestnuts'];
tree_nut_allergy = tree_nut_allergy.map(x => x.toLowerCase());
tree_nut_allergy = new Set(tree_nut_allergy);

let shell_fish_allergy = ['Shrimp', 'Lobster', 'Crab', 'Crayfish', 'Prawns', 'Langoustines', 'Clams', 'Mussels', 'Oysters', 'Scallops', 'Squid (calamari)', 'Octopus', 'Snails (escargot)', 'Abalone'];
shell_fish_allergy = shell_fish_allergy.map(x => x.toLowerCase());
shell_fish_allergy = new Set(shell_fish_allergy);

//check allergy function
function checkAllergies(ingredients, glutenAllergy, milkAllergy, treeNutAllergy, shellFishAllergy) {
  let allergies = new Set();

  if (ingredients.some(ingredient => glutenAllergy.has(ingredient))) {
    allergies.add("Gluten");
  }

  if (ingredients.some(ingredient => milkAllergy.has(ingredient))) {
    allergies.add("Milk");
  }

  if (ingredients.some(ingredient => treeNutAllergy.has(ingredient))) {
    allergies.add("Tree Nuts");
  }

  if (ingredients.some(ingredient => shellFishAllergy.has(ingredient))) {
    allergies.add("Shellfish");
  }

  return allergies;
}

console.log(checkAllergies(ingredients, gluten_allergy, milk_allergy, tree_nut_allergy, shell_fish_allergy));