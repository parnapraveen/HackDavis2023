const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Accept-Encoding': 'gzip,deflate',
  'user_key': 'only_for_dev_or_pro',
  'key_type': '3scale'
};

const refnum = "0028400084048";

fetch('https://api.upcitemdb.com/prod/trial/lookup?upc=' +refnum, { headers, mode: 'no-cors' })
  .then(response => response.json())
  .then(data => {
    const items = data.items;
    const re = /,|\(|\)/;
    const ingredients = [];

    items.forEach(item => {
      const description = item.description;
      const itemIngredients = description.split(re).map(ingredient => ingredient.trim());
      ingredients.push(...itemIngredients);
    });

    const lowercaseIngredients = ingredients.map(ingredient => ingredient.toLowerCase());
    const uniqueIngredients = [...new Set(lowercaseIngredients)];
    console.log(uniqueIngredients);

    const glutenAllergy = ['wheat flour', 'wheat starch', 'wheat bran', 'wheat germ', 'wheat protein isolate', 'barley malt', 'barley flour', 'barley extract', 'barley malt vinegar', 'rye flour', 'rye bread', 'rye extract', 'rye malt', 'Triticale', 'Semolina', 'Bulgur', 'milk', 'malt vinegar', 'malt extract', 'malt syrup', 'Hydrolyzed wheat protein', 'maltodextrin'].map(x => x.toLowerCase());
    const milkAllergy = ['Lactose', 'milk powder', 'condensed milk', 'evaporated milk', 'buttermilk', 'cheddar', 'mozzarella', 'feta', 'Parmesan', 'Butter', 'clarified butter (ghee)', 'Heavy cream', 'light cream', 'whipped cream', 'sour cream', 'Ice cream', 'gelato', 'sherbet', 'Whey casein', 'whey powder', 'caseinates', 'lactose', 'cakes', 'cookies', 'pastries', 'bread', 'whey'].map(x => x.toLowerCase());
    const treeNutAllergy = ['Almonds', 'Brazil nuts', 'Cashews', 'Hazelnuts (also known as filberts)', 'Macadamia nuts', 'Pecans', 'Pistachios', 'Walnuts', 'Pine nuts', 'Chestnuts'].map(x => x.toLowerCase());
    const shellfishAllergy = ['Shrimp', 'Lobster', 'Crab', 'Crayfish', 'Prawns', 'Langoustines', 'Clams', 'Mussels', 'Oysters', 'Scallops', 'Squid (calamari)', 'Octopus', 'Snails (escargot)', 'Abalone'].map(x => x.toLowerCase());

    function checkAllergies(ingredients, glutenAllergy, milkAllergy, treeNutAllergy, shellfishAllergy) {
      const allergies = new Set();

      if (ingredients.some(ingredient => glutenAllergy.includes(ingredient))) {
        allergies.add("Gluten");
      }

      if (ingredients.some(ingredient => milkAllergy.includes(ingredient))) {
        allergies.add("Milk");
      }

      if (ingredients.some(ingredient => treeNutAllergy.includes(ingredient))) {
        allergies.add("Tree Nuts");
      }

      if (ingredients.some(ingredient => shellfishAllergy.includes(ingredient))) {
        allergies.add("Shell Fish");
      }

      return allergies;
    }
  })