# -*- coding: utf-8 -*-
"""allergy_script

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1A5Ni8xqha40ZFPj_LbrweJ05K0SMLEsi
"""

pip install requests

pip install json

import requests
import json

headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Accept-Encoding': 'gzip,deflate',
  'user_key': 'only_for_dev_or_pro',
  'key_type': '3scale'
}
refnum = "0028400084048"
resp = requests.get('https://api.upcitemdb.com/prod/trial/lookup?upc=0028400084048', headers=headers)

data = json.loads(resp.text)
items = data['items']

import re
ingredients = []
for item in items:
    description = item['description']
    # Split the description by comma, '(', or ')' to extract the ingredients
    item_ingredients = [ingredient.strip() for ingredient in re.split(',|\(|\)', description)]
    ingredients.extend(item_ingredients)

# Print the extracted ingredients
ingredients = [x.lower() for x in ingredients]
ingredients = set(ingredients)
print(ingredients)

gluten_allergy = ['wheat flour', 'wheat starch', 'wheat bran', 'wheat germ', 'wheat protein isolate', 'barley malt', 'barley flour', 'barley extract', 'barley malt vinegar', 'rye flour', 'rye bread', 'rye extract', 'rye malt', 'Triticale', 'Semolina', 'Bulgur', 'milk', 'malt vinegar', 'malt extract', 'malt syrup', 'Hydrolyzed wheat protein', 'maltodextrin']
gluten_allergy = [x.lower() for x in gluten_allergy]
gluten_allergy = set(gluten_allergy)
milk_allergy = ['Lactose', 'milk powder', 'condensed milk', 'evaporated milk', 'buttermilk', 'cheddar', 'mozzarella', 'feta', 'Parmesan', 'Butter', 'clarified butter (ghee)', 'Heavy cream', 'light cream', 'whipped cream', 'sour cream', 'Ice cream', 'gelato', 'sherbet', 'Whey casein', 'whey powder', 'caseinates', 'lactose', 'cakes', 'cookies', 'pastries', 'bread', 'whey']
milk_allergy = [x.lower() for x in milk_allergy]
milk_allergy = set(milk_allergy)
tree_nut_allergy = ['Almonds', 'Brazil nuts', 'Cashews', 'Hazelnuts (also known as filberts)', 'Macadamia nuts', 'Pecans', 'Pistachios', 'Walnuts', 'Pine nuts', 'Chestnuts']
tree_nut_allergy = [x.lower() for x in tree_nut_allergy]
tree_nut_allergy = set(tree_nut_allergy)
shell_fish_allergy = ['Shrimp', 'Lobster', 'Crab', 'Crayfish', 'Prawns', 'Langoustines', 'Clams', 'Mussels', 'Oysters', 'Scallops', 'Squid (calamari)', 'Octopus', 'Snails (escargot)', 'Abalone']
shell_fish_allergy = [x.lower() for x in shell_fish_allergy]
shell_fish_allergy = set(shell_fish_allergy)

def check_allergies(ingredients,gluten_allergy,milk_allergy,tree_nut_allergy,shell_fish_allergy):
    allergies = set()

    if ingredients.intersection(gluten_allergy):
        allergies.add("Gluten")

    if ingredients.intersection(milk_allergy):
        allergies.add("Milk")

    if ingredients.intersection(tree_nut_allergy):
        #print(ingredients.intersection(tree_nut_allergy))
        allergies.add("Tree Nuts")

    if ingredients.intersection(shell_fish_allergy):
        allergies.add("Shellfish")

    return allergies

print(check_allergies(ingredients,gluten_allergy,milk_allergy,tree_nut_allergy,shell_fish_allergy))